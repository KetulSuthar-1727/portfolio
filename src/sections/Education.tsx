import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { education } from "../data/content";

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Education" title="Education" />

        <div className="space-y-5">
          {education.map((ed, i) => (
            <motion.div
              key={ed.school}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface/50 px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-surface/80 hover:shadow-[0_18px_50px_rgba(0,0,0,0.2)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6 sm:gap-y-2"
            >
              <div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-text">{ed.school}</h3>
                <p className="text-text-muted text-sm mt-1">{ed.degree}</p>
                <p className="text-text-faint text-xs mt-1">{ed.location}</p>
              </div>
              <div className="w-full text-left sm:ml-auto sm:w-auto sm:text-right">
                <span className="font-mono text-xs text-teal block">
                  {ed.start} — {ed.end}
                </span>
                {ed.detail && <span className="text-sm text-text mt-1 block">{ed.detail}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
