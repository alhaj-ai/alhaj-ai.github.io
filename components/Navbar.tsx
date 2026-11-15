"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, Terminal, X } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#architecture", label: "Architecture" },
  { href: "#projects", label: "Systems" },
  { href: "#credentials", label: "Credentials" },
  { href: "#skills", label: "Stack" },
];

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const root = document.documentElement;
    if (saved === "light") {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    const root = document.documentElement;
    if (nextDark) {
      root.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
    setIsDark(nextDark);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a
          href="#"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-ink transition-opacity hover:opacity-85"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
            <Terminal className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>{PROFILE.name}</span>
          <span className="hidden font-mono text-xs text-muted sm:inline">@{PROFILE.handle}</span>
        </a>

        <nav aria-label="Primary Navigation" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-ink"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-slate-950 transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:text-ink md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-border bg-surface px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-1.5 text-sm font-medium text-muted hover:bg-surface-elevated hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-slate-950"
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
