import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { achievements, profile } from "../data/content";

const stats = [
  { label: "months of production experience", value: "6+" },
  { label: "DSA problems solved", value: "170+" },
  { label: "LeetCode contest rating", value: "1560" },
  { label: "reusable components shipped", value: "20+" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="About" title="A systems mindset, applied to the browser." />

        <div className="grid md:grid-cols-5 gap-12 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 space-y-5 text-text-muted leading-relaxed text-base sm:text-lg"
          >
            <p>
              I'm a software engineer based in {profile.location}, currently building production
              features at Seaflux Technologies. My day-to-day lives across the stack — Next.js and
              TypeScript on the front, Node.js and REST APIs on the back, AWS holding it together.
            </p>
            <p>
              Before any of that was a job, it was 170+ solved problems on LeetCode and a Computer
              Science degree spent in data structures, operating systems and low-level design. That's
              the part that doesn't show up in a demo, but shows up in how the code is structured.
            </p>
            <p>
              I care about the details that make software feel finished: load times, empty states,
              the exact easing on a hover. This site is built the same way I build everything else —
              React, TypeScript, and nothing left unpolished.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 grid grid-cols-2 gap-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/80 bg-surface/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:bg-surface/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                <div className="font-display text-2xl sm:text-3xl font-semibold text-text">
                  {s.value}
                </div>
                <div className="mt-1.5 text-xs text-text-muted leading-snug">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 rounded-2xl border border-border-soft bg-surface/40 px-6 py-5"
          >
            {achievements.map((a) => (
              <p key={a.label} className="text-sm text-text-muted">
                <span className="font-mono text-teal">✓ {a.label}</span> - {a.detail}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
