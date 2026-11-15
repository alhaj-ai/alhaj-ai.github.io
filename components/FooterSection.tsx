"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

export function FooterSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.links.email}`;
    }
  };

  return (
    <footer id="contact" className="relative z-10 bg-surface/50 py-14 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                {PROFILE.availability}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
                Building Reliable LLM & Agent Systems? Let&apos;s Talk.
              </h2>
              <p className="mt-2 text-sm text-muted">
                Available for remote AI Engineering, LLM Fine-Tuning, Multi-Agent Infrastructure, and Applied ML roles.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PROFILE.links.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Send Email
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3.5 py-2.5 font-mono text-xs font-medium text-ink transition-colors hover:border-accent/50"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                    {PROFILE.links.email}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js &amp; Tailwind CSS. Hosted on GitHub Pages.
          </p>

          <div className="flex items-center gap-5">
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-ink"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-ink"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={PROFILE.links.x}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-ink"
            >
              X (@mod_alhaj)
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
