import { useEffect, useRef, useState } from "react";
import "./cursorCat.css";

type Sprite = readonly [number, number];

const spriteSets: Record<string, readonly Sprite[]> = {
  idle: [[-3, -3]], alert: [[-7, -3]], scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]], scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]], scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]], sleeping: [[-2, 0], [-2, -1]], N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]], E: [[-3, 0], [-3, -1]], SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]], SW: [[-5, -3], [-6, -1]], W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

function canUseCursorCat() {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 768 && window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * React lifecycle wrapper for the original oneko.js animation logic.
 * Original script and bundled sprite: https://github.com/adryd325/oneko.js (MIT).
 */
export default function CursorCat() {
  const catRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(canUseCursorCat);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateAvailability = () => setEnabled(canUseCursorCat());
    finePointer.addEventListener("change", updateAvailability);
    reducedMotion.addEventListener("change", updateAvailability);
    window.addEventListener("resize", updateAvailability, { passive: true });
    return () => {
      finePointer.removeEventListener("change", updateAvailability);
      reducedMotion.removeEventListener("change", updateAvailability);
      window.removeEventListener("resize", updateAvailability);
    };
  }, []);

  useEffect(() => {
    const cat = catRef.current;
    if (!enabled || !cat) return;

    let animationFrame = 0;
    let lastFrameTimestamp = 0;
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: keyof typeof spriteSets | null = null;
    let idleAnimationFrame = 0;

    const setSprite = (name: keyof typeof spriteSets, frame: number) => {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      cat.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    };
    const resetIdleAnimation = () => {
      idleAnimation = null;
      idleAnimationFrame = 0;
    };
    const idle = () => {
      idleTime += 1;
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
        const availableIdleAnimations: (keyof typeof spriteSets)[] = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
        if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");
        idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
      }
      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    };
    const frame = () => {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
      if (distance < 10 || distance < 48) {
        idle();
        return;
      }
      resetIdleAnimation();
      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7) - 1;
        return;
      }
      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction as keyof typeof spriteSets, frameCount);
      nekoPosX -= (diffX / distance) * 10;
      nekoPosY -= (diffY / distance) * 10;
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
      cat.style.left = `${nekoPosX - 16}px`;
      cat.style.top = `${nekoPosY - 16}px`;
    };
    const onMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };
    const animate = (timestamp: number) => {
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      animationFrame = requestAnimationFrame(animate);
    };
    setSprite("idle", 0);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animationFrame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={catRef} className="cursor-cat" aria-hidden="true" />;
}
