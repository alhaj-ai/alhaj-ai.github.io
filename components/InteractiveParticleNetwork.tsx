"use client";

import { useEffect, useRef } from "react";

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
  phase: number;
  color: string;
}

export function InteractiveParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let width = 0;
    let height = 0;
    let rafId = 0;

    const pointer = { x: 0, y: 0, active: false };

    const getPalette = () => {
      const dark = document.documentElement.classList.contains("dark");
      return dark
        ? ["#b7ff4a", "#9a6bff", "#f5f7ef"]
        : ["#b84f45", "#55799a", "#29384a"];
    };

    let palette = getPalette();

    const makeParticles = (w: number, h: number): ParticleNode[] => {
      const count = w < 640 ? 28 : 48;
      return Array.from({ length: count }, (_, idx) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        radius: 2 + Math.random() * 2.1,
        depth: 0.72 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        color: palette[idx % palette.length],
      }));
    };

    let particles: ParticleNode[] = [];

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = makeParticles(width, height);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const maxDist = width < 640 ? 120 : 168;

      if (!reducedMotion) {
        for (const p of particles) {
          p.x += p.vx * p.depth;
          p.y += p.vy * p.depth;

          if (p.x < 12 || p.x > width - 12) p.vx *= -1;
          if (p.y < 12 || p.y > height - 12) p.vy *= -1;

          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 180 && dist > 1) {
              const force = ((180 - dist) / 180) * 0.035;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          // Clamp velocity gently so constellation remains graceful
          const speed = Math.hypot(p.vx, p.vy);
          if (speed > 0.9) {
            p.vx = (p.vx / speed) * 0.9;
            p.vy = (p.vy / speed) * 0.9;
          }
        }
      }

      // Edges
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = i % 3 === 0 ? a.color : b.color;
            ctx.globalAlpha = (1 - dist / maxDist) * 0.42;
            ctx.lineWidth = 1.05;
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const pDist = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (pDist < maxDist * 1.1) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = palette[0];
            ctx.globalAlpha = (1 - pDist / (maxDist * 1.1)) * 0.55;
            ctx.lineWidth = 1.25;
            ctx.stroke();
          }
        }
      }

      // Glowing Constellation Nodes
      for (const p of particles) {
        const wave = reducedMotion ? 0 : Math.sin(time * 0.002 + p.phase) * 0.14;
        const r = Math.max(1.8, p.radius * p.depth * (1 + wave));

        // Soft halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.12;
        ctx.fill();

        // Crisp node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.88;
        ctx.fill();

        // Tiny bright center dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 0.42, 0, Math.PI * 2);
        ctx.fillStyle = "#fffaf0";
        ctx.globalAlpha = 0.85;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      draw(time);
      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const observer = new MutationObserver(() => {
      palette = getPalette();
      particles.forEach((p, idx) => {
        p.color = palette[idx % palette.length];
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(rafId);
      if (reducedMotion) {
        draw(performance.now());
      } else {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.parentElement?.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.parentElement?.addEventListener("pointerleave", handlePointerLeave);
    motionQuery.addEventListener("change", onMotionChange);

    if (reducedMotion) {
      draw(performance.now());
    } else {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("pointermove", handlePointerMove);
      canvas.parentElement?.removeEventListener("pointerleave", handlePointerLeave);
      motionQuery.removeEventListener("change", onMotionChange);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-[6%] right-0 z-[1] h-[88%] w-full opacity-95 mix-blend-multiply dark:mix-blend-screen md:w-[62%]"
    />
  );
}
