import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-ink-soft scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A mix of production systems and self-directed builds."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className={`group relative flex flex-col rounded-2xl border border-border/80 bg-surface/50 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber/30 hover:bg-surface/80 hover:shadow-[0_22px_60px_rgba(0,0,0,0.22)] ${
                project.featured ? "md:col-span-1" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-text transition-colors group-hover:text-amber">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  {project.links?.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} — ${link.label}`}
                      className="rounded-full border border-border-soft p-2 text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:text-teal"
                    >
                      {link.label.toLowerCase().includes("github") ? (
                        <FiGithub size={16} />
                      ) : (
                        <FiArrowUpRight size={16} />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <p className="text-text-muted text-sm mb-5">{project.description}</p>

              <ul className="space-y-2 mb-6 flex-1">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="flex gap-2.5 text-[14px] text-text-muted leading-relaxed">
                    <span className="text-teal font-mono mt-0.5 shrink-0">·</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border-soft">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border-soft bg-ink/70 px-2.5 py-1 font-mono text-[11px] text-text-faint transition-colors group-hover:text-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
