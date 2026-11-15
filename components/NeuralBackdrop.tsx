"use client";

import { useEffect, useRef } from "react";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

export function NeuralBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 32 : 58;
    const maxDist = isMobile ? 115 : 145;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const getPalette = () => {
      const dark = document.documentElement.classList.contains("dark");
      return dark
        ? ["16, 185, 129", "56, 189, 248", "228, 228, 231"]
        : ["5, 150, 105", "14, 116, 144", "63, 63, 70"];
    };

    let palette = getPalette();

    const nodes: NodePoint[] = Array.from({ length: nodeCount }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.36,
      vy: (Math.random() - 0.5) * 0.36,
      r: Math.random() * 1.4 + 0.8,
      color: palette[idx % palette.length],
    }));

    const syncTheme = () => {
      palette = getPalette();
      nodes.forEach((n, idx) => {
        n.color = palette[idx % palette.length];
      });
    };

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    let rafId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        if (!reducedMotion) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${a.color}, 0.45)`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.color}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      if (!reducedMotion && !document.hidden) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    draw();

    const onVisibility = () => {
      if (!document.hidden && !reducedMotion) {
        window.cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}
