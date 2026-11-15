"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cpu, Orbit, Sparkles } from "lucide-react";

type ScenePreset = "core" | "harness" | "topology";

const PRESET_CONFIG: Record<
  ScenePreset,
  { label: string; camZ: number; camY: number; scale: number; speed: number }
> = {
  core: { label: "LLM Core", camZ: 6.2, camY: 0.25, scale: 1.0, speed: 1.0 },
  harness: { label: "Harness Rings", camZ: 5.3, camY: 0.95, scale: 1.1, speed: 1.45 },
  topology: { label: "Vector Lattice", camZ: 7.4, camY: -0.45, scale: 0.92, speed: 0.75 },
};

function createGlowSpriteTexture(): THREE.CanvasTexture | null {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.28, "rgba(16, 185, 129, 0.85)");
  grad.addColorStop(0.65, "rgba(56, 189, 248, 0.22)");
  grad.addColorStop(1, "rgba(16, 185, 129, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function NeuralHarness3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const presetRef = useRef<ScenePreset>("core");
  const [preset, setPreset] = useState<ScenePreset>("core");
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    presetRef.current = preset;
  }, [preset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const testCanvas = document.createElement("canvas");
    const gl =
      testCanvas.getContext("webgl2") ||
      testCanvas.getContext("webgl") ||
      testCanvas.getContext("experimental-webgl");

    if (!gl) {
      setWebglFailed(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
      0.1,
      50
    );
    camera.position.set(0, 0.25, 6.2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    const keyLight = new THREE.DirectionalLight(0x10b981, 2.2);
    keyLight.position.set(4, 5, 5);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-5, -3, 3);
    const corePointLight = new THREE.PointLight(0x10b981, 3.2, 8);
    scene.add(ambientLight, keyLight, rimLight, corePointLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Inner LLM / Weights Core (obsidian carbon icosahedron + glowing lattice)
    const coreGeo = new THREE.IcosahedronGeometry(1.08, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x050507,
      metalness: 0.86,
      roughness: 0.16,
      emissive: 0x064e3b,
      emissiveIntensity: 0.55,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    const latticeGeo = new THREE.IcosahedronGeometry(1.16, 1);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.72,
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    rootGroup.add(latticeMesh);

    // 2. Deterministic Execution Harness Rings (3 gimbal orbits + SHA-256 checkpoint nodes)
    const ring1Geo = new THREE.TorusGeometry(1.66, 0.02, 16, 128);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.6,
      metalness: 0.6,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.set(0.58, 0.22, 0.15);

    const nodeGeo = new THREE.OctahedronGeometry(0.085, 0);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });
    const ring1NodeA = new THREE.Mesh(nodeGeo, nodeMat);
    ring1NodeA.position.set(1.66, 0, 0);
    const ring1NodeB = new THREE.Mesh(nodeGeo, nodeMat);
    ring1NodeB.position.set(-1.66, 0, 0);
    ring1.add(ring1NodeA, ring1NodeB);
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.05, 0.014, 16, 128);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      metalness: 0.7,
      roughness: 0.25,
      transparent: true,
      opacity: 0.85,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.set(-0.72, 0.48, 0.4);
    const ring2NodeA = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0x7dd3fc }));
    ring2NodeA.position.set(0, 2.05, 0);
    ring2.add(ring2NodeA);
    rootGroup.add(ring2);

    // Precision outer telemetry dotted ring
    const tickCount = 96;
    const tickPositions = new Float32Array(tickCount * 3);
    for (let i = 0; i < tickCount; i += 1) {
      const theta = (i / tickCount) * Math.PI * 2;
      tickPositions[i * 3] = Math.cos(theta) * 2.42;
      tickPositions[i * 3 + 1] = Math.sin(theta) * 2.42;
      tickPositions[i * 3 + 2] = 0;
    }
    const tickGeo = new THREE.BufferGeometry();
    tickGeo.setAttribute("position", new THREE.BufferAttribute(tickPositions, 3));
    const tickMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.036,
      transparent: true,
      opacity: 0.72,
    });
    const ring3 = new THREE.Points(tickGeo, tickMat);
    ring3.rotation.set(0.32, -0.5, 0);
    rootGroup.add(ring3);

    // 3. Ambient Vector Embeddings Field
    const particleCount = 190;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const r = 2.6 + Math.random() * 2.8;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const sprite = createGlowSpriteTexture();
    const particleMat = new THREE.PointsMaterial({
      map: sprite || undefined,
      color: 0xffffff,
      size: 0.11,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Theme adaptation (obsidian pitch-black vs architectural light contrast)
    const syncThemeColors = () => {
      const dark = document.documentElement.classList.contains("dark");
      coreMat.color.setHex(dark ? 0x050507 : 0x18181b);
      coreMat.emissiveIntensity = dark ? 0.58 : 0.35;
      tickMat.color.setHex(dark ? 0xe4e4e7 : 0x3f3f46);
      particleMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      particleMat.color.setHex(dark ? 0xffffff : 0x059669);
      particleMat.needsUpdate = true;
    };
    syncThemeColors();

    const themeObserver = new MutationObserver(syncThemeColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Pointer parallax & drag inspection (without blocking scroll)
    let pointerX = 0;
    let pointerY = 0;
    let dragRotX = 0;
    let dragRotY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
      if (dragging) {
        dragRotY += (e.clientX - lastX) * 0.006;
        dragRotX += (e.clientY - lastY) * 0.006;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handlePointerUp = () => {
      dragging = false;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pause animation when scrolled off screen or reduced motion requested
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let rafId = 0;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      const cfg = PRESET_CONFIG[presetRef.current];
      const dtScale = cfg.speed;

      camera.position.z += (cfg.camZ - camera.position.z) * 0.06;
      camera.position.y += (cfg.camY + -pointerY * 0.35 - camera.position.y) * 0.06;
      camera.position.x += (pointerX * 0.45 - camera.position.x) * 0.06;
      camera.lookAt(0, 0, 0);

      const targetScale = cfg.scale;
      rootGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);

      if (!reducedMotion) {
        coreMesh.rotation.y = elapsed * 0.24 * dtScale + dragRotY;
        coreMesh.rotation.x = Math.sin(elapsed * 0.35) * 0.14 + dragRotX;

        latticeMesh.rotation.y = -elapsed * 0.16 * dtScale + dragRotY;
        latticeMesh.rotation.x = Math.cos(elapsed * 0.28) * 0.12 + dragRotX;

        ring1.rotation.z += 0.0085 * dtScale;
        ring1.rotation.y = elapsed * 0.18 * dtScale + dragRotY * 0.6;
        ring2.rotation.z -= 0.0065 * dtScale;
        ring2.rotation.x = -0.72 + Math.sin(elapsed * 0.3) * 0.1 + dragRotX * 0.5;
        ring3.rotation.z += 0.0025 * dtScale;

        particles.rotation.y = elapsed * 0.05 * dtScale;
        particles.rotation.x = pointerY * 0.08;
      }

      renderer.render(scene, camera);
    };

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (isVisible) {
        renderFrame();
      }
    };

    renderFrame();
    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(animate);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);

      coreGeo.dispose();
      coreMat.dispose();
      latticeGeo.dispose();
      latticeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      tickGeo.dispose();
      tickMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      sprite?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/75 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
            Interactive 3D · Execution Harness Core
          </span>
        </div>
        <span className="hidden font-mono text-[11px] text-muted sm:inline">
          Drag to orbit
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative h-[320px] w-full cursor-grab touch-pan-y active:cursor-grabbing sm:h-[360px]"
        aria-label="Interactive 3D visualization of an LLM weights core surrounded by deterministic execution harness rings"
      >
        {webglFailed && (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-surface via-surface-elevated to-canvas p-6 text-center">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-accent/40 bg-accent/10 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
              <Orbit className="h-14 w-14 animate-spin text-accent" style={{ animationDuration: "18s" }} />
              <Cpu className="absolute h-7 w-7 text-ink" />
            </div>
            <p className="mt-4 font-mono text-xs text-muted">
              LLM Core · Deterministic Execution Rings
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/80 bg-surface-elevated/60 px-3 py-2.5">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="3D camera focus presets">
          {(Object.keys(PRESET_CONFIG) as ScenePreset[]).map((key) => {
            const active = preset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setPreset(key)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors ${
                  active
                    ? "bg-accent text-slate-950"
                    : "border border-border bg-surface text-muted hover:text-ink"
                }`}
              >
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                {PRESET_CONFIG[key].label}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[11px] text-accent">SHA-256 · Zero-Drift Guard</span>
      </div>
    </div>
  );
}
