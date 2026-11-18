"use client";

import { type FormEvent, useState } from "react";
import { ArrowUpRight, Check, Copy, GitFork, Linkedin, Mail, Phone, ShieldCheck, Twitter } from "lucide-react";
import { PROFILE, VERIFIED_METRICS } from "@/lib/portfolio-data";

export function NotebookAboutAndContact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.links.email}`;
    }
  };

  const handleComposeMail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || "Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nReply Email: ${senderEmail}\n\n${message}`
    );
    window.location.href = `mailto:${PROFILE.links.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* 06 // Engineering Identity (About) */}
      <section
        id="about"
        className="grid border-b-2 border-[var(--ink)] lg:grid-cols-[0.82fr_1.18fr]"
      >
        <div className="relative flex flex-col justify-between overflow-hidden border-b-2 border-[var(--ink)] bg-[#ded4bd] p-8 dark:bg-[#0c110d] sm:p-12 lg:border-b-0 lg:border-r-2">
          <div className="relative z-10 rounded-xl border-2 border-dashed border-[var(--ink)] bg-[var(--paper-card)] p-6 shadow-[5px_6px_0_rgba(41,56,74,0.14)]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--red-ink)]">
              MOHAMMED AL-HAJ // PROFILE
            </span>
            <h3 className="mt-2 font-hand text-4xl font-bold text-[var(--ink)]">
              {PROFILE.name}
            </h3>
            <p className="font-mono text-xs font-bold text-[var(--blue-ink)]">
              {PROFILE.availability}
            </p>

            <div className="mt-6 space-y-3 border-t border-dashed border-[var(--border-ink)] pt-4">
              {VERIFIED_METRICS.map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-hand text-lg font-bold text-[var(--ink-soft)]">
                    {m.label}
                  </span>
                  <span className="font-mono font-bold text-[var(--red-ink)]">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 inline-block w-fit -rotate-2 border-2 border-[var(--ink)] bg-[var(--mustard)] px-4 py-2 font-hand text-lg font-bold text-[#26374a] shadow-[4px_5px_0_rgba(41,56,74,0.18)]">
            <ShieldCheck className="mr-1.5 inline h-4 w-4" aria-hidden="true" />
            CI-VERIFIED · 14 REPOSITORIES
          </div>
        </div>

        <div className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:px-14">
          <p className="nb-eyebrow">
            <span className="nb-num">07</span>
            <span>About Mohammed</span>
          </p>
          <h2 className="mt-4 font-hand text-5xl font-bold leading-[0.86] tracking-tight text-[var(--ink)] sm:text-6xl">
            I like systems
            <br />
            you can <span className="text-[var(--red-ink)]">verify.</span>
          </h2>

          <div className="mt-6 max-w-2xl space-y-4 font-hand text-xl leading-[1.45] text-[var(--ink-soft)]">
            {PROFILE.aboutParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {["PYTHON", "PYTORCH", "FASTAPI", "QDRANT", "LANGGRAPH", "NEXT.JS", "DOCKER"].map(
              (item) => (
                <span key={item} className="nb-chip">
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* 08 // Start a Conversation */}
      <section
        id="contact"
        className="grid gap-10 border-b-2 border-[var(--ink)] bg-[rgba(239,224,190,0.38)] px-5 py-20 dark:bg-transparent sm:px-10 md:px-[6.5vw] lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
      >
        <div>
          <p className="nb-eyebrow">
            <span className="nb-num">08</span>
            <span>Get In Touch</span>
          </p>
          <h2 className="mt-4 font-hand text-5xl font-bold leading-[0.86] tracking-tight text-[var(--ink)] sm:text-6xl">
            Have a system
            <br />
            to <span className="text-[var(--red-ink)]">ship?</span>
          </h2>
          <p className="mt-5 max-w-md font-hand text-xl leading-[1.45] text-[var(--ink-soft)]">
            Available for remote AI engineering, LLM fine-tuning, agent reliability, and RAG backends.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE.links.email}`}
              className="inline-flex items-center gap-2 border-b-2 border-[var(--ink)] pb-1 font-hand text-2xl font-bold text-[var(--ink)] hover:text-[var(--red-ink)]"
            >
              <span>Email me directly</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 rounded border border-dashed border-[var(--ink)] bg-[var(--paper-card)] px-3 py-1.5 font-mono text-xs font-bold text-[var(--ink)] hover:bg-[var(--mustard)]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[var(--red-ink)]" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  {PROFILE.links.email}
                </>
              )}
            </button>

            <a
              href={`tel:${PROFILE.phone}`}
              className="inline-flex items-center gap-1.5 rounded border border-dashed border-[var(--ink)] bg-[var(--paper-card)] px-3 py-1.5 font-mono text-xs font-bold text-[var(--ink)] hover:bg-[var(--mustard)]"
            >
              <Phone className="h-3.5 w-3.5 text-[var(--red-ink)]" aria-hidden="true" />
              {PROFILE.phone}
            </a>
          </div>

          <div className="mt-6 font-mono text-xs text-[var(--muted)]">
            <span>⌖ {PROFILE.location}</span>
          </div>
        </div>

        <form
          onSubmit={handleComposeMail}
          className="grid border-t-2 border-[var(--ink)] sm:grid-cols-2"
        >
          <label className="border-b border-[var(--border-ink)] py-4 sm:border-r sm:pr-4">
            <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--ink-soft)]">
              Your Name
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className="mt-1.5 w-full bg-transparent font-hand text-xl text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
            />
          </label>

          <label className="border-b border-[var(--border-ink)] py-4 sm:pl-4">
            <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--ink-soft)]">
              Work Email
            </span>
            <input
              type="email"
              required
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="jane@company.com"
              className="mt-1.5 w-full bg-transparent font-hand text-xl text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
            />
          </label>

          <label className="border-b border-[var(--border-ink)] py-4 sm:col-span-2">
            <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--ink-soft)]">
              Project or Role
            </span>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share details about the role, codebase, or goal..."
              className="mt-1.5 w-full resize-y bg-transparent font-hand text-xl text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
            />
          </label>

          <button type="submit" className="nb-primary-btn mt-5 w-full justify-between sm:col-span-2">
            <span>{submitted ? "Opening email draft..." : "Send message via email"}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </section>

      {/* Bold Mustard-Gold Architectural Footer (Signature closing band) */}
      <footer className="bg-[var(--footer-gold)] px-5 pb-8 pt-20 text-[#29384a] sm:px-10 md:px-[6.5vw] dark:text-[#071006]">
        <p className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest">
          <span>09</span>
          <span>LET&apos;S BUILD RELIABLE AI ✎</span>
        </p>

        <h2 className="mt-5 font-hand text-6xl font-bold leading-[0.88] tracking-tight sm:text-7xl lg:text-[7.5rem]">
          Looking for an AI engineer?
          <br />
          <a
            href={`mailto:${PROFILE.links.email}`}
            className="inline-flex items-center gap-3 border-b-4 border-current pb-1 transition-opacity hover:opacity-80"
          >
            Let&apos;s talk.
            <ArrowUpRight className="h-[0.75em] w-[0.75em]" aria-hidden="true" />
          </a>
        </h2>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[rgba(41,56,74,0.45)] pt-5 font-mono text-xs font-bold sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {PROFILE.name.toUpperCase()}</span>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={PROFILE.links.x}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <Twitter className="h-3.5 w-3.5" aria-hidden="true" />
              X (@mod_alhaj)
            </a>
            <a
              href={`mailto:${PROFILE.links.email}`}
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
