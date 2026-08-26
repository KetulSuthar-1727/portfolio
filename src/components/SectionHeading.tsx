import { motion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10 sm:mb-14"
    >
      {eyebrow ? (
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal/20 bg-teal/10 text-teal shadow-[0_0_0_8px_rgba(138,227,212,0.05)]">
            <span className="h-2 w-2 rounded-full bg-teal" />
          </span>
          <span className="inline-flex items-center rounded-full border border-border/80 bg-surface/70 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-text-muted">
            {eyebrow}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-border-soft via-border to-transparent" />
        </div>
      ) : null}
      <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-[#F5F7FB] text-balance sm:text-[2.75rem] sm:leading-[1.02]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
