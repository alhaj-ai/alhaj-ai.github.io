"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard3D({
  children,
  className = "",
  intensity = 6,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef({ rx: 0, ry: 0, angle: 0 });
  const targetRef = useRef({ rx: 0, ry: 0, angle: 0 });
  const [hovered, setHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ gx: 50, gy: 50, angle: 0 });

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    let rafId = 0;
    const tick = () => {
      const c = currentRef.current;
      const t = targetRef.current;
      c.rx += (t.rx - c.rx) * 0.14;
      c.ry += (t.ry - c.ry) * 0.14;

      const el = cardRef.current;
      if (el) {
        const ty = hovered ? -3 : 0;
        el.style.transform = `perspective(1000px) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg) translate3d(0, ${ty}px, 0)`;
      }

      if (hovered || Math.abs(c.rx) > 0.02 || Math.abs(c.ry) > 0.02) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    if (hovered) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => window.cancelAnimationFrame(rafId);
  }, [hovered]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !window.matchMedia("(pointer: fine)").matches)
    ) {
      return;
    }

    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    targetRef.current.rx = (0.5 - py) * intensity;
    targetRef.current.ry = (px - 0.5) * intensity;

    const rad = Math.atan2(py - 0.5, px - 0.5);
    const angle = (rad * 180) / Math.PI + 90;
    setGlowPos({ gx: px * 100, gy: py * 100, angle });
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    targetRef.current.rx = 0;
    targetRef.current.ry = 0;
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden will-change-transform ${className}`}
    >
      {/* Dynamic cursor-angle perimeter border glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `conic-gradient(from ${glowPos.angle}deg at 50% 50%, rgba(16, 185, 129, 0.55), rgba(56, 189, 248, 0.25), transparent 40%, transparent 75%, rgba(16, 185, 129, 0.4))`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Subtle internal obsidian spotlight sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(460px circle at ${glowPos.gx}% ${glowPos.gy}%, rgb(var(--accent) / 0.11), transparent 65%)`,
        }}
      />

      {children}
    </div>
  );
}
