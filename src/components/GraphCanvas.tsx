import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * The page's signature element: a drifting node graph with occasional
 * BFS-style traversal pulses running along its edges. A quiet nod to
 * graph algorithms / DSA rather than a decorative particle field —
 * edges only pulse along real shortest paths between two random nodes.
 */
export default function GraphCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    let raf = 0;
    let mouse = { x: -9999, y: -9999 };

    // active traversal pulse: sequence of node indices + progress
    let pulse: { path: number[]; t: number; speed: number } | null = null;
    let pulseTimer = 0;

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGraph();
    }

    function buildGraph() {
      const count = Math.max(16, Math.round((width * height) / 42000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 1.2,
      }));

      edges = [];
      const maxDist = Math.min(width, height) * 0.22;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) edges.push([i, j]);
        }
      }
    }

    // adjacency for BFS pulses
    function adjacency() {
      const map = new Map<number, number[]>();
      edges.forEach(([a, b]) => {
        if (!map.has(a)) map.set(a, []);
        if (!map.has(b)) map.set(b, []);
        map.get(a)!.push(b);
        map.get(b)!.push(a);
      });
      return map;
    }

    function shortestPath(start: number, end: number): number[] {
      const adj = adjacency();
      const visited = new Set([start]);
      const prev = new Map<number, number>();
      const queue = [start];
      while (queue.length) {
        const cur = queue.shift()!;
        if (cur === end) break;
        for (const next of adj.get(cur) ?? []) {
          if (!visited.has(next)) {
            visited.add(next);
            prev.set(next, cur);
            queue.push(next);
          }
        }
      }
      if (!visited.has(end)) return [start];
      const path = [end];
      let cur = end;
      while (cur !== start) {
        cur = prev.get(cur)!;
        path.unshift(cur);
      }
      return path;
    }

    function startPulse() {
      if (nodes.length < 4) return;
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      let tries = 0;
      while (b === a && tries < 5) {
        b = Math.floor(Math.random() * nodes.length);
        tries++;
      }
      const path = shortestPath(a, b);
      if (path.length > 1) {
        pulse = { path, t: 0, speed: 0.012 };
      }
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // edges
      ctx!.lineWidth = 1;
      edges.forEach(([i, j]) => {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(width, height) * 0.22;
        const alpha = Math.max(0, 1 - d / maxDist) * 0.16;
        ctx!.strokeStyle = `rgba(141, 149, 166, ${alpha})`;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      });

      // pulse along shortest path
      if (pulse) {
        const { path, t } = pulse;
        const segCount = path.length - 1;
        const segT = t * segCount;
        const segIdx = Math.min(Math.floor(segT), segCount - 1);
        const localT = segT - segIdx;
        const a = nodes[path[segIdx]];
        const b = nodes[path[segIdx + 1]];
        if (a && b) {
          const px = a.x + (b.x - a.x) * localT;
          const py = a.y + (b.y - a.y) * localT;

          // lit trail behind the pulse head
          ctx!.strokeStyle = "rgba(242, 169, 59, 0.55)";
          ctx!.lineWidth = 1.4;
          ctx!.beginPath();
          for (let k = 0; k <= segIdx; k++) {
            const n = nodes[path[k]];
            if (k === 0) ctx!.moveTo(n.x, n.y);
            else ctx!.lineTo(n.x, n.y);
          }
          ctx!.lineTo(px, py);
          ctx!.stroke();

          // pulse head
          const grad = ctx!.createRadialGradient(px, py, 0, px, py, 10);
          grad.addColorStop(0, "rgba(242, 169, 59, 0.9)");
          grad.addColorStop(1, "rgba(242, 169, 59, 0)");
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(px, py, 10, 0, Math.PI * 2);
          ctx!.fill();
        }

        pulse.t += pulse.speed;
        if (pulse.t >= 1) pulse = null;
      }

      // nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const near = distToMouse < 90;

        ctx!.beginPath();
        ctx!.fillStyle = near ? "rgba(79, 209, 197, 0.9)" : "rgba(237, 239, 243, 0.35)";
        ctx!.arc(n.x, n.y, near ? n.r + 1.2 : n.r, 0, Math.PI * 2);
        ctx!.fill();
      });

      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    if (!prefersReducedMotion) {
      draw();
      pulseTimer = window.setInterval(() => {
        if (!pulse) startPulse();
      }, 2600);
      // kick off the first pulse shortly after mount
      const initial = window.setTimeout(startPulse, 900);
      return () => {
        cancelAnimationFrame(raf);
        window.clearInterval(pulseTimer);
        window.clearTimeout(initial);
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
      };
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
