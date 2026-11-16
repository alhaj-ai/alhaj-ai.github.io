"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Boxes, BrainCircuit, GitBranch, Orbit } from "lucide-react";

type ScenePreset = "llm" | "rag" | "agents";

interface PresetMeta {
  label: string;
  tag: string;
  camZ: number;
  camY: number;
  steps: string[];
  legend: { color: string; text: string }[];
}

const PRESET_CONFIG: Record<ScenePreset, PresetMeta> = {
  llm: {
    label: "LLM + Harness",
    tag: "Weights Core · SHA-256 Ledger Guards",
    camZ: 6.3,
    camY: 0.3,
    steps: [
      "1. Local Weights (PyTorch)",
      "2. Schema Check (Pydantic)",
      "3. SHA-256 Checkpoint",
      "4. Shadow Test & Apply",
    ],
    legend: [
      { color: "#10b981", text: "Transformer Core" },
      { color: "#e8bd5e", text: "SHA-256 Checkpoints" },
      { color: "#ef6c57", text: "Lease & Schema Guard" },
    ],
  },
  rag: {
    label: "Hybrid RAG Vectors",
    tag: "Tenant Qdrant Space · CrossEncoder Top-K",
    camZ: 6.1,
    camY: 0.85,
    steps: [
      "1. Chunks (1k / 200 overlap)",
      "2. Tenant Qdrant Filter",
      "3. CrossEncoder Re-rank",
      "4. Cited Page Numbers",
    ],
    legend: [
      { color: "#38bdf8", text: "Chunk Vectors" },
      { color: "#e8bd5e", text: "Query & Top-K Hits" },
      { color: "#10b981", text: "Tenant Isolation Cage" },
    ],
  },
  agents: {
    label: "Multi-Agent Graph",
    tag: "Planner -> Searcher -> Writer -> Critic",
    camZ: 6.4,
    camY: 0.55,
    steps: [
      "1. Planner (AR/EN)",
      "2. Parallel Search",
      "3. Draft Writer",
      "4. Critic (Max 3 Loops)",
    ],
    legend: [
      { color: "#e8bd5e", text: "Planner & Packet" },
      { color: "#38bdf8", text: "Parallel Retrieval" },
      { color: "#ef6c57", text: "Critic Review Gate" },
    ],
  },
};

const PRESET_ICONS: Record<ScenePreset, typeof BrainCircuit> = {
  llm: BrainCircuit,
  rag: Boxes,
  agents: GitBranch,
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
  grad.addColorStop(0.65, "rgba(56, 189, 248, 0.25)");
  grad.addColorStop(1, "rgba(16, 185, 129, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function seedRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function NeuralHarness3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const presetRef = useRef<ScenePreset>("llm");
  const [preset, setPreset] = useState<ScenePreset>("llm");
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

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      geometries.push(g);
      return g;
    };
    const trackMat = <T extends THREE.Material>(m: T): T => {
      materials.push(m);
      return m;
    };

    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
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
    camera.position.set(0, 0.3, 6.3);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.78);
    const keyLight = new THREE.DirectionalLight(0x10b981, 2.1);
    keyLight.position.set(4, 5, 5);
    const warmLight = new THREE.DirectionalLight(0xe8bd5e, 1.35);
    warmLight.position.set(-4, 3, -3);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.45);
    rimLight.position.set(-5, -3, 3);
    const corePointLight = new THREE.PointLight(0x10b981, 3.0, 9);
    scene.add(ambientLight, keyLight, warmLight, rimLight, corePointLight);

    const rand = seedRandom(4219);
    const sprite = createGlowSpriteTexture();

    // =========================================================================
    // GROUP 1: LLM Weights Core + SHA-256 Execution Harness Rings
    // =========================================================================
    const llmGroup = new THREE.Group();
    scene.add(llmGroup);

    const coreMesh = new THREE.Mesh(
      trackGeo(new THREE.IcosahedronGeometry(1.02, 2)),
      trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x0b1215,
          metalness: 0.84,
          roughness: 0.18,
          emissive: 0x065f46,
          emissiveIntensity: 0.65,
          flatShading: true,
        })
      )
    );
    llmGroup.add(coreMesh);

    const latticeMesh = new THREE.Mesh(
      trackGeo(new THREE.IcosahedronGeometry(1.14, 1)),
      trackMat(
        new THREE.MeshBasicMaterial({
          color: 0x10b981,
          wireframe: true,
          transparent: true,
          opacity: 0.75,
        })
      )
    );
    llmGroup.add(latticeMesh);

    // Inner token attention halo
    const ring1 = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(1.68, 0.022, 16, 128)),
      trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xe8bd5e,
          emissive: 0xd97706,
          emissiveIntensity: 0.5,
          metalness: 0.65,
          roughness: 0.25,
        })
      )
    );
    ring1.rotation.set(0.55, 0.2, 0.15);

    const checkpointGeo = trackGeo(new THREE.OctahedronGeometry(0.105, 0));
    const checkpointMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xfef08a }));
    [
      [1.68, 0, 0],
      [-1.68, 0, 0],
      [0, 1.68, 0],
      [0, -1.68, 0],
    ].forEach(([x, y, z]) => {
      const node = new THREE.Mesh(checkpointGeo, checkpointMat);
      node.position.set(x, y, z);
      ring1.add(node);
    });
    llmGroup.add(ring1);

    // Schema & lease boundary guard ring
    const ring2 = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(2.08, 0.016, 16, 128)),
      trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xef6c57,
          emissive: 0xb84f45,
          emissiveIntensity: 0.55,
          metalness: 0.7,
          roughness: 0.25,
          transparent: true,
          opacity: 0.9,
        })
      )
    );
    ring2.rotation.set(-0.74, 0.48, 0.35);
    const guardSatA = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.14, 0.14, 0.14)),
      trackMat(new THREE.MeshBasicMaterial({ color: 0xfda4af }))
    );
    guardSatA.position.set(0, 2.08, 0);
    const guardSatB = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.14, 0.14, 0.14)),
      trackMat(new THREE.MeshBasicMaterial({ color: 0xfda4af }))
    );
    guardSatB.position.set(0, -2.08, 0);
    ring2.add(guardSatA, guardSatB);
    llmGroup.add(ring2);

    // Outer telemetry ticks
    const tickCount = 96;
    const tickPos = new Float32Array(tickCount * 3);
    for (let i = 0; i < tickCount; i += 1) {
      const theta = (i / tickCount) * Math.PI * 2;
      tickPos[i * 3] = Math.cos(theta) * 2.48;
      tickPos[i * 3 + 1] = Math.sin(theta) * 2.48;
      tickPos[i * 3 + 2] = 0;
    }
    const tickGeo = trackGeo(new THREE.BufferGeometry());
    tickGeo.setAttribute("position", new THREE.BufferAttribute(tickPos, 3));
    const tickRing = new THREE.Points(
      tickGeo,
      trackMat(
        new THREE.PointsMaterial({
          color: 0x94a3b8,
          size: 0.04,
          transparent: true,
          opacity: 0.8,
        })
      )
    );
    tickRing.rotation.set(0.32, -0.5, 0);
    llmGroup.add(tickRing);

    // =========================================================================
    // GROUP 2: Hybrid RAG 3D Vector Store (Tenant Cage + Chunks + Query Rays)
    // =========================================================================
    const ragGroup = new THREE.Group();
    ragGroup.visible = false;
    scene.add(ragGroup);

    // Tenant Isolation Wireframe Box (Qdrant Collection boundary)
    const cageGeo = trackGeo(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.2, 2.35, 3.2)));
    const cageMat = trackMat(
      new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.55,
      })
    );
    ragGroup.add(new THREE.LineSegments(cageGeo, cageMat));

    // Semantic Cluster Chunks (3 clusters inside tenant box)
    const clusterCenters = [
      new THREE.Vector3(-0.75, -0.25, -0.55),
      new THREE.Vector3(0.8, 0.15, -0.4),
      new THREE.Vector3(0.05, -0.45, 0.72),
    ];
    const chunkCoords: THREE.Vector3[] = [];
    const chunkPositions = new Float32Array(210 * 3);
    const chunkColors = new Float32Array(210 * 3);
    const blueCol = new THREE.Color(0x38bdf8);
    const tealCol = new THREE.Color(0x2dd4bf);
    const goldCol = new THREE.Color(0xe8bd5e);

    for (let i = 0; i < 210; i += 1) {
      const center = clusterCenters[i % clusterCenters.length];
      const vx = center.x + (rand() - 0.5) * 1.15;
      const vy = center.y + (rand() - 0.5) * 0.95;
      const vz = center.z + (rand() - 0.5) * 1.15;
      chunkPositions[i * 3] = vx;
      chunkPositions[i * 3 + 1] = vy;
      chunkPositions[i * 3 + 2] = vz;
      chunkCoords.push(new THREE.Vector3(vx, vy, vz));

      const col = i < 12 ? goldCol : i % 2 === 0 ? blueCol : tealCol;
      chunkColors[i * 3] = col.r;
      chunkColors[i * 3 + 1] = col.g;
      chunkColors[i * 3 + 2] = col.b;
    }

    const chunkGeo = trackGeo(new THREE.BufferGeometry());
    chunkGeo.setAttribute("position", new THREE.BufferAttribute(chunkPositions, 3));
    chunkGeo.setAttribute("color", new THREE.BufferAttribute(chunkColors, 3));
    const chunkCloud = new THREE.Points(
      chunkGeo,
      trackMat(
        new THREE.PointsMaterial({
          map: sprite || undefined,
          size: 0.15,
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      )
    );
    ragGroup.add(chunkCloud);

    // Query Anchor Node & Top-K CrossEncoder Retrieval Rays
    const queryOrigin = new THREE.Vector3(0, 1.02, 0.95);
    const queryAnchor = new THREE.Mesh(
      trackGeo(new THREE.OctahedronGeometry(0.18, 0)),
      trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xe8bd5e,
          emissive: 0xf59e0b,
          emissiveIntensity: 0.85,
        })
      )
    );
    queryAnchor.position.copy(queryOrigin);
    ragGroup.add(queryAnchor);

    // Connect query node to top-10 closest / highlighted vector chunks
    const topKIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const rayPositions = new Float32Array(topKIndices.length * 6);
    topKIndices.forEach((chunkIdx, row) => {
      const target = chunkCoords[chunkIdx];
      rayPositions[row * 6] = queryOrigin.x;
      rayPositions[row * 6 + 1] = queryOrigin.y;
      rayPositions[row * 6 + 2] = queryOrigin.z;
      rayPositions[row * 6 + 3] = target.x;
      rayPositions[row * 6 + 4] = target.y;
      rayPositions[row * 6 + 5] = target.z;
    });
    const rayGeo = trackGeo(new THREE.BufferGeometry());
    rayGeo.setAttribute("position", new THREE.BufferAttribute(rayPositions, 3));
    const rayLines = new THREE.LineSegments(
      rayGeo,
      trackMat(
        new THREE.LineBasicMaterial({
          color: 0xe8bd5e,
          transparent: true,
          opacity: 0.82,
        })
      )
    );
    ragGroup.add(rayLines);

    // CrossEncoder horizontal scan ring sweeping through chunks
    const ragScanRing = new THREE.Mesh(
      trackGeo(new THREE.RingGeometry(0.25, 1.55, 48)),
      trackMat(
        new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.22,
        })
      )
    );
    ragScanRing.rotation.x = Math.PI / 2;
    ragGroup.add(ragScanRing);

    // =========================================================================
    // GROUP 3: Multi-Agent StateGraph (Planner -> Searcher -> Writer -> Critic)
    // =========================================================================
    const agentsGroup = new THREE.Group();
    agentsGroup.visible = false;
    scene.add(agentsGroup);

    const agentWaypoints = [
      new THREE.Vector3(-1.65, 0.45, 0.4), // Planner
      new THREE.Vector3(0, 0.75, -1.45), // Searcher
      new THREE.Vector3(1.65, 0.2, 0.4), // Writer
      new THREE.Vector3(0, -0.55, 1.4), // Critic Gate
    ];
    const agentColors = [0xe8bd5e, 0x38bdf8, 0x10b981, 0xef6c57];
    const agentMaterials: THREE.MeshStandardMaterial[] = [];

    agentWaypoints.forEach((pos, idx) => {
      const mat = trackMat(
        new THREE.MeshStandardMaterial({
          color: agentColors[idx],
          emissive: agentColors[idx],
          emissiveIntensity: 0.45,
          metalness: 0.5,
          roughness: 0.25,
        })
      );
      agentMaterials.push(mat);

      const hub = new THREE.Mesh(trackGeo(new THREE.IcosahedronGeometry(0.32, 1)), mat);
      hub.position.copy(pos);

      const halo = new THREE.Mesh(
        trackGeo(new THREE.TorusGeometry(0.46, 0.014, 12, 48)),
        trackMat(
          new THREE.MeshBasicMaterial({
            color: agentColors[idx],
            transparent: true,
            opacity: 0.65,
          })
        )
      );
      halo.rotation.x = Math.PI / 2.4;
      hub.add(halo);
      agentsGroup.add(hub);
    });

    // Cycle edges connecting 0->1->2->3->0
    const edgeCoords: number[] = [];
    for (let i = 0; i < agentWaypoints.length; i += 1) {
      const a = agentWaypoints[i];
      const b = agentWaypoints[(i + 1) % agentWaypoints.length];
      edgeCoords.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    // Critic <-> Planner shortcut feedback line
    edgeCoords.push(
      agentWaypoints[3].x,
      agentWaypoints[3].y,
      agentWaypoints[3].z,
      agentWaypoints[0].x,
      agentWaypoints[0].y,
      agentWaypoints[0].z
    );
    const agentEdgeGeo = trackGeo(new THREE.BufferGeometry());
    agentEdgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgeCoords, 3));
    agentsGroup.add(
      new THREE.LineSegments(
        agentEdgeGeo,
        trackMat(
          new THREE.LineBasicMaterial({
            color: 0x94a3b8,
            transparent: true,
            opacity: 0.72,
          })
        )
      )
    );

    // Animated execution state packet traveling around the agent loop
    const packetMesh = new THREE.Mesh(
      trackGeo(new THREE.SphereGeometry(0.11, 16, 16)),
      trackMat(new THREE.MeshBasicMaterial({ color: 0xffffff }))
    );
    agentsGroup.add(packetMesh);

    // =========================================================================
    // Ambient Background Neural Lattice Particles
    // =========================================================================
    const bgCount = 140;
    const bgPos = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i += 1) {
      const r = 2.9 + rand() * 2.4;
      const phi = Math.acos(2 * rand() - 1);
      const theta = rand() * Math.PI * 2;
      bgPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      bgPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      bgPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const bgGeo = trackGeo(new THREE.BufferGeometry());
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
    const bgParticles = new THREE.Points(
      bgGeo,
      trackMat(
        new THREE.PointsMaterial({
          map: sprite || undefined,
          color: 0xffffff,
          size: 0.1,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      )
    );
    scene.add(bgParticles);

    // Interaction & Orbit state
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
        dragRotY += (e.clientX - lastX) * 0.007;
        dragRotX += (e.clientY - lastY) * 0.007;
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
      const mode = presetRef.current;
      const cfg = PRESET_CONFIG[mode];

      llmGroup.visible = mode === "llm";
      ragGroup.visible = mode === "rag";
      agentsGroup.visible = mode === "agents";

      camera.position.z += (cfg.camZ - camera.position.z) * 0.07;
      camera.position.y += (cfg.camY + -pointerY * 0.35 - camera.position.y) * 0.07;
      camera.position.x += (pointerX * 0.45 - camera.position.x) * 0.07;
      camera.lookAt(0, 0, 0);

      if (!reducedMotion) {
        if (mode === "llm") {
          coreMesh.rotation.y = elapsed * 0.28 + dragRotY;
          coreMesh.rotation.x = Math.sin(elapsed * 0.35) * 0.14 + dragRotX;
          latticeMesh.rotation.y = -elapsed * 0.18 + dragRotY;
          latticeMesh.rotation.x = Math.cos(elapsed * 0.25) * 0.1 + dragRotX;
          ring1.rotation.z += 0.008;
          ring1.rotation.y = elapsed * 0.2 + dragRotY * 0.6;
          ring2.rotation.z -= 0.0065;
          ring2.rotation.x = -0.74 + Math.sin(elapsed * 0.3) * 0.12 + dragRotX * 0.5;
          tickRing.rotation.z += 0.002;
        } else if (mode === "rag") {
          ragGroup.rotation.y = elapsed * 0.22 + dragRotY;
          ragGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08 + dragRotX * 0.5;
          queryAnchor.rotation.y = elapsed * 1.4;
          ragScanRing.position.y = Math.sin(elapsed * 1.35) * 0.9;
        } else {
          agentsGroup.rotation.y = elapsed * 0.18 + dragRotY;
          agentsGroup.rotation.x = 0.16 + dragRotX * 0.5;
          const cycle = (elapsed * 0.55) % agentWaypoints.length;
          const idxA = Math.floor(cycle);
          const idxB = (idxA + 1) % agentWaypoints.length;
          const t = cycle - idxA;
          packetMesh.position.lerpVectors(agentWaypoints[idxA], agentWaypoints[idxB], t);
          agentMaterials.forEach((mat, i) => {
            mat.emissiveIntensity = i === idxA || i === idxB ? 1.1 : 0.35;
          });
        }

        bgParticles.rotation.y = elapsed * 0.05;
        bgParticles.rotation.x = pointerY * 0.08;
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
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      sprite?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const currentMeta = PRESET_CONFIG[preset];

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-[var(--ink)] bg-[#070b10] text-[#f5f0e1] shadow-xl">
      {/* Top Telemetry Bar */}
      <div className="flex items-center justify-between border-b border-white/15 bg-[#0c1219] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e8bd5e]" aria-hidden="true" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#f5f0e1]">
            3D Architecture · LLM, Hybrid RAG &amp; Agent Loops
          </span>
        </div>
        <span className="hidden font-mono text-[11px] text-[#9aa8b8] sm:inline">
          Drag to orbit · Switch modes below
        </span>
      </div>

      {/* Interactive WebGL Viewport */}
      <div
        ref={containerRef}
        className="relative h-[380px] w-full cursor-grab touch-pan-y active:cursor-grabbing sm:h-[430px]"
        aria-label="Interactive 3D view of LLM weights, Hybrid RAG vector chunks, and multi-agent loops"
      >
        {/* Corner Reticles */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#10b981]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[#e8bd5e]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-14 left-3 h-4 w-4 border-b-2 border-l-2 border-[#e8bd5e]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-14 right-3 h-4 w-4 border-b-2 border-r-2 border-[#10b981]"
        />

        {/* Active Stage Pill */}
        <span className="pointer-events-none absolute left-5 top-4 rounded border border-[#e8bd5e]/40 bg-[#e8bd5e] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#1f2937]">
          {currentMeta.label}
        </span>

        {/* Color Legend Pills (top-right) */}
        <div className="pointer-events-none absolute right-5 top-4 hidden flex-col items-end gap-1.5 sm:flex">
          {currentMeta.legend.map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-1.5 rounded bg-[#0c1219]/85 px-2.5 py-1 font-mono text-[10px] text-[#e5e7eb] ring-1 ring-white/15 backdrop-blur-sm"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              {item.text}
            </span>
          ))}
        </div>

        {/* Pipeline Step Strip (bottom overlay) */}
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-center gap-2">
          {currentMeta.steps.map((stepText) => (
            <span
              key={stepText}
              className="rounded border border-white/15 bg-[#0c1219]/85 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#f3ecd8] backdrop-blur-sm"
            >
              {stepText}
            </span>
          ))}
        </div>

        {webglFailed && (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#090e14] p-6 text-center">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[#10b981]/40 bg-[#10b981]/10">
              <Orbit className="h-14 w-14 animate-spin text-[#10b981]" style={{ animationDuration: "18s" }} />
              <BrainCircuit className="absolute h-7 w-7 text-[#e8bd5e]" />
            </div>
            <p className="mt-4 font-mono text-xs text-[#cbd5e1]">
              {currentMeta.label} · {currentMeta.tag}
            </p>
          </div>
        )}
      </div>

      {/* Mode Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 bg-[#0c1219] px-4 py-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="3D architecture views">
          {(Object.keys(PRESET_CONFIG) as ScenePreset[]).map((key) => {
            const active = preset === key;
            const Icon = PRESET_ICONS[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => setPreset(key)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-bold transition-transform active:scale-95 ${
                  active
                    ? "bg-[#e8bd5e] text-[#111827] shadow-sm"
                    : "border border-white/25 bg-[#111923] text-[#e2e8f0] hover:border-[#e8bd5e]/60 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {PRESET_CONFIG[key].label}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[11px] font-semibold text-[#6ee7b7]">
          {currentMeta.tag}
        </span>
      </div>
    </div>
  );
}
