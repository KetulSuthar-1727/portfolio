import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { profile } from "../data/content";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const roles = ["Full-Stack Developer", "Problem Solver", "Building Scalable Applications"] as const;

function Meteors({ count = 18 }: { count?: number }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 3.5 + Math.random() * 3.5,
        size: 0.5 + Math.random() * 1.1,
      })),
    [count]
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((m) => (
        <motion.span
          key={m.id}
          className="absolute top-[-10%] h-px rounded-full bg-gradient-to-r from-white via-cyan-200 to-transparent"
          style={{
            left: `${m.left}%`,
            width: `${60 * m.size}px`,
            filter: "drop-shadow(0 0 6px rgba(148,211,255,0.65))",
            rotate: "35deg",
            transformOrigin: "left center",
          }}
          initial={{ x: 0, y: -40, opacity: 0 }}
          animate={{ x: [0, 340], y: [-40, 420], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            repeatDelay: 4 + Math.random() * 6,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveRole((current) => (current + 1) % roles.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden scroll-mt-24 bg-[#05070b]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.95),rgba(5,7,11,1)_48%),linear-gradient(to_bottom,#05070b_0%,#070b12_55%,#05070b_100%)]" />

      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(100deg,#60a5fa_0%,#22d3ee_8%,#a78bfa_16%,#22d3ee_24%,#60a5fa_32%)",
            backgroundSize: "220% 220%",
            filter: "blur(48px)",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(100deg,#60a5fa_0%,#22d3ee_25%,#a78bfa_50%,#22d3ee_75%,#60a5fa_100%)",
            filter: "blur(48px)",
          }}
        />
      )}

      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] [mask-image:radial-gradient(circle_at_center,black_0%,transparent_55%)]"
          style={{
            backgroundImage:
              "conic-gradient(from 0deg, transparent 0%, #38bdf8 8%, transparent 18%, transparent 50%, #a78bfa 58%, transparent 68%, transparent 100%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      ) : null}

      <div className="absolute inset-0 bg-grid opacity-[0.08] [mask-image:radial-gradient(circle_at_50%_36%,black_0%,transparent_78%)]" />
      <div className="absolute inset-0 noise-layer opacity-[0.14]" />

      {!shouldReduceMotion ? <Meteors count={16} /> : null}

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05070b] via-[#05070b]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#05070b] via-[#05070b]/88 to-transparent" />

      <motion.div
        variants={container}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="show"
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 pb-24 pt-28 sm:px-8 sm:pt-32"
      >
        <div className="max-w-5xl">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] sm:text-sm text-text-muted backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_0_8px_rgba(138,227,212,0.08)]" />
            Turning ideas into shipped products
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 max-w-5xl font-display text-[clamp(3.2rem,11vw,8.5rem)] font-semibold leading-[0.88] tracking-tight text-[#F6F8FC] text-balance"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-2xl font-display text-base font-medium tracking-tight text-text sm:text-xl"
          >
            <span className="bg-gradient-to-r from-slate-100 via-cyan-200 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(96,165,250,0.12)]">
              Software Engineer
            </span>
          </motion.p>

          <motion.div variants={item} className="mt-3 h-9 sm:h-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={roles[activeRole]}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl font-display text-base font-medium tracking-tight sm:text-xl"
              >
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(96,165,250,0.18)]">
                  {roles[activeRole]}
                </span>
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg"
          >
            I build scalable, high-performance web applications and enjoy turning complex problems
            into clean, practical solutions.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToProjects();
              }}
              className="group inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(56,189,248,0.95),rgba(37,99,235,0.92),rgba(99,102,241,0.9))] px-6 py-3.5 text-sm font-medium text-white shadow-[0_18px_50px_rgba(37,99,235,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(56,189,248,0.35)]"
            >
              <span className="drop-shadow-[0_0_18px_rgba(255,255,255,0.16)]">View My Work</span>
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/5 px-6 py-3.5 text-sm font-medium text-text transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/[0.35] hover:bg-white/[0.08] hover:text-white hover:shadow-[0_18px_40px_rgba(0,0,0,0.24)]"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { label: "Stack", value: "React · Next.js · TypeScript" },
              { label: "Focus", value: "Clean code, real impact" },
              { label: "Base", value: profile.location },
            ].map((entry) => (
              <motion.div
                key={entry.label}
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/[0.06] hover:shadow-[0_16px_40px_rgba(56,189,248,0.12)]"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 transition-colors group-hover:text-cyan-200">
                  {entry.label}
                </p>
                <p className="mt-2 text-sm text-white/90 transition-colors group-hover:text-white">
                  {entry.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-faint sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-text-faint/80">
          Scroll
        </span>
        <div className="flex h-12 w-6 justify-center rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-sm">
          <motion.div
            aria-hidden="true"
            className="h-2.5 w-1.5 rounded-full bg-gradient-to-b from-cyan-300 to-blue-500 shadow-[0_0_18px_rgba(96,165,250,0.45)]"
            animate={shouldReduceMotion ? { y: 0, opacity: 0.8 } : { y: [0, 14, 0], opacity: [0.45, 1, 0.45] }}
            transition={shouldReduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
