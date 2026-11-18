"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

const NAV_ITEMS = [
  { id: "top", label: "Home" },
  { id: "skills", label: "Toolkit" },
  { id: "work", label: "Work" },
  { id: "demos", label: "Demos" },
  { id: "systems", label: "Systems" },
  { id: "credentials", label: "Badges" },
  { id: "journey", label: "Journey" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export function NotebookNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("notebook-theme");
    const root = document.documentElement;
    if (saved === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const targets = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-22% 0px -58% 0px", threshold: [0.05, 0.2, 0.45] }
    );

    targets.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        btnRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (btnRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    const root = document.documentElement;
    if (nextDark) {
      root.classList.add("dark");
      window.localStorage.setItem("notebook-theme", "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem("notebook-theme", "light");
    }
    setIsDark(nextDark);
  };

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--ink)] bg-[var(--paper-nav)] shadow-[0_4px_0_rgba(41,56,74,0.08)] backdrop-blur-md">
      <div className="mx-auto flex h-[78px] max-w-[1380px] items-center justify-between px-4 sm:px-8">
        <a
          href="#top"
          className="font-hand text-2xl font-bold tracking-normal text-[var(--ink)] transition-opacity hover:opacity-80"
        >
          {PROFILE.name}
          <span className="text-[var(--red-ink)]">.</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex xl:gap-6">
          {NAV_ITEMS.slice(1, 8).map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative font-hand text-lg font-semibold transition-colors ${
                  active
                    ? "text-[var(--red-ink)]"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 right-0 h-[3px] bg-[var(--red-ink)] transition-transform ${
                    active ? "scale-x-100 -rotate-1" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to notebook paper theme" : "Switch to dark ink theme"}
            title={isDark ? "Notebook Paper Mode" : "Dark Ink Mode"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper-card)] text-[var(--ink)] transition-transform hover:-translate-y-0.5"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            ref={btnRef}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation drawer" : "Open navigation drawer"}
            aria-expanded={menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[48%_52%_43%_57%] border-2 border-[var(--ink)] bg-[#fbf7ed] text-[var(--ink)] transition-transform hover:rotate-3 dark:bg-[#0d110e]"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Ruled Two-Column Notebook Drawer (Matches reference mobile/quick drawer) */}
      {menuOpen && (
        <div className="relative">
          <button
            type="button"
            aria-label="Close menu backdrop"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-[80px] z-30 bg-[rgba(41,56,74,0.42)] backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio sections"
            className="fixed right-0 top-[80px] z-40 max-h-[calc(100dvh-80px)] w-full max-w-[430px] overflow-y-auto border-b-2 border-l-2 border-[var(--ink)] bg-[#f7f0df] p-5 text-[var(--ink)] shadow-2xl dark:bg-[#090d0a]"
          >
            <div className="mb-3 flex items-center justify-between border-b border-[var(--border-ink)] pb-3 font-mono text-[11px] font-bold uppercase tracking-widest">
              <span className="text-[var(--red-ink)]">Navigate</span>
              <span className="text-[var(--muted)]">Portfolio Sections</span>
            </div>

            <div className="grid grid-cols-2 border-l border-t border-[var(--border-ink)]">
              {NAV_ITEMS.map((item, idx) => {
                const active = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-[64px] items-center justify-between border-b border-r border-[var(--border-ink)] px-3 py-3 font-mono text-xs font-bold uppercase transition-colors ${
                      active
                        ? "bg-[rgba(232,189,94,0.32)] text-[var(--red-ink)] dark:bg-[rgba(183,255,74,0.12)]"
                        : "hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] text-[var(--muted)]">0{idx + 1}</span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--muted)]" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
