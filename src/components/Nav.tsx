import { useEffect, useState } from "react";
import { navItems, profile } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";

export default function Nav() {
  const active = useActiveSection(navItems.map((n) => n.id));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/72 backdrop-blur-xl border-b border-border/80" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center gap-3 text-sm text-text"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-surface/70 font-display text-[12px] font-semibold tracking-[0.2em] text-text transition-transform duration-300 group-hover:-translate-y-0.5">
            KS
          </span>
          <span className="hidden sm:block">
            <span className="font-display font-semibold tracking-tight">Ketul Suthar</span>
          </span>
        </a>

        {/* desktop nav */}
        <ul className="hidden md:flex items-center gap-1 text-[13px]">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={handleClick}
                className={`px-3 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 ${
                  active === item.id
                    ? "bg-surface/80 text-text shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                    : "text-text-muted hover:bg-surface/40 hover:text-text"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center rounded-full border border-border/80 bg-surface/40 px-4 py-2 text-[13px] text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-amber/50 hover:bg-surface/70"
          >
            resume.pdf
          </a>
        </div>

        {/* mobile toggle */}
        <button
          className="md:hidden text-text p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`h-px bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-ink/95 backdrop-blur-xl border-b border-border px-5 pb-5 pt-1">
          <ul className="flex flex-col text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={handleClick}
                  className={`block w-full text-left py-3 border-b border-border-soft transition-colors ${
                    active === item.id ? "text-text" : "text-text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resumeUrl}
            download
            className="mt-4 block text-center rounded-full border border-border/80 bg-surface/40 px-4 py-3 text-sm text-text transition-all duration-200"
          >
            Download resume.pdf
          </a>
        </div>
      )}
    </header>
  );
}
