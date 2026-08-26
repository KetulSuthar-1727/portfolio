import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiCode } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { profile } from "../data/content";

type Status = "idle" | "sending" | "success" | "error";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const socialLinks = [
  { label: "GitHub", href: profile.social.github, icon: FiGithub },
  { label: "LinkedIn", href: profile.social.linkedin, icon: FiLinkedin },
  { label: "LeetCode", href: profile.social.leetcode, icon: FiCode },
  { label: "Email", href: profile.social.email, icon: FiMail },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(
        "Contact form isn't configured yet — add your EmailJS keys to .env (see README)."
      );
      return;
    }

    const form = e.currentTarget;
    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong sending that — try again, or email me directly.");
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-ink-soft scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk"
          description="Have a role, a project, or just a question? Send it straight to my inbox —"
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* left: direct info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <p className="text-text-muted leading-relaxed mb-8">
              I'm currently open to full-time software engineering opportunities. Whether that's
              a role, a freelance build, or a technical question — my inbox is the fastest way to
              reach me.
            </p>

            <div className="space-y-3 mb-8">
              <a
                href={profile.social.email}
                className="group flex items-center gap-3 text-text transition-colors hover:text-amber"
              >
                <span className="font-mono text-xs text-text-faint w-16 shrink-0">email</span>
                <span className="border-b border-border-soft transition-colors group-hover:border-amber">
                  {profile.email}
                </span>
              </a>
              <div className="flex items-center gap-3 text-text">
                <span className="font-mono text-xs text-text-faint w-16 shrink-0">phone</span>
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-text">
                <span className="font-mono text-xs text-text-faint w-16 shrink-0">base</span>
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-border/80 p-3 text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:text-teal"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* right: form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" htmlFor="from_name">
                  <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="input"
                  />
                </Field>
                <Field label="Email" htmlFor="reply_to">
                  <input
                    id="reply_to"
                    name="reply_to"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Subject" htmlFor="subject">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Role, project, or question"
                  className="input"
                />
              </Field>

              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me a bit about what you have in mind…"
                  className="input resize-none"
                />
              </Field>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-amber px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(142,176,255,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "success" && (
                <p className="text-teal text-sm font-mono">
                  ✓ Sent — thanks! I'll get back to you soon.
                </p>
              )}
              {status === "error" && <p className="text-amber text-sm">{errorMsg}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-mono text-xs text-text-faint">
        {label}
      </label>
      {children}
    </div>
  );
}
