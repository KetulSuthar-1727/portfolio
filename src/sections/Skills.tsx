import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-ink-soft scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills"
          description="A cleaner view of the tools I actually use, without the terminal-style clutter."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border border-border/80 bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-surface/80 hover:shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-text">{group.label}</span>
                <span className="h-2 w-2 rounded-full bg-teal/70 transition-all duration-300 group-hover:scale-125" />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border-soft bg-ink/70 px-3 py-1 text-[13px] text-text-muted transition-all duration-300 group-hover:border-border/80 group-hover:text-text"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
