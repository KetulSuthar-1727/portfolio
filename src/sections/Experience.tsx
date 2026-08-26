import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        <div className="relative">
          {/* the spine */}
          <div className="absolute left-[7px] top-2 bottom-2 hidden w-px bg-border sm:block" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative sm:pl-10"
              >
                <span className="absolute left-0 top-1.5 hidden sm:flex h-3.5 w-3.5 items-center justify-center">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-amber bg-ink" />
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-text">
                    {exp.role} <span className="text-text-muted font-normal">· {exp.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-teal whitespace-nowrap">
                    {exp.start} — {exp.end}
                  </span>
                </div>
                <p className="text-sm text-text-faint mb-4">{exp.location}</p>

                <ul className="space-y-2.5">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="flex gap-3 text-text-muted text-[15px] leading-relaxed">
                      <span className="text-amber font-mono mt-0.5 shrink-0">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
