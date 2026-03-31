"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { Canvas, useLoader, useFrame, extend } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { TextureLoader } from "three";
import { shaderMaterial } from "@react-three/drei";

const PROJECTS = [
  {
    name: "Netflix Dating",
    href: "/netflixdating",
    image: "/images/main/netflixhero.png",
  },
  {
    name: "I'll Think About it Later",
    href: "/pagmar",
    image: "/images/pagmar/pagmarfallback.png",
  },
  { name: "Men's Toilet", href: "/toilet", image: "/images/main/toiletbg.png" },
  {
    name: "What Happens in Vegas",
    href: "/vegas",
    image: "/images/main/vegashome.png",
  },
];

// ─── PAPER SHADER ─────────────────────────────────────────────────────────────
// Vertex shader bends the mesh along Z → paper ripple feel.
// Fragment shader just samples the texture + applies opacity.
const PaperMaterial = shaderMaterial(
  { uTexture: null, uOpacity: 1.0, uTime: 0.0 },

  // ── VERTEX SHADER ──
  `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 2.5 + uTime * 0.5) * 0.06;
      pos.z += sin(pos.y * 3.0 + uTime * 0.4) * 0.05;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,

  // ── FRAGMENT SHADER ──
  `
    uniform sampler2D uTexture;
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      color.a *= uOpacity;
      gl_FragColor = color;
    }
  `
);

extend({ PaperMaterial });

// ─── COVERFLOW LAYOUT ─────────────────────────────────────────────────────────
// Given an index and the active index, compute where this card should sit.
// offset = how many steps away from active (e.g. -1, 0, +1, +2)
// Active card  → center (x=2, z=0), no rotation
// Side cards   → fanned out: offset * 3 on X, pushed back on Z, rotated on Y
function getCoverflowTarget(index, active) {
  const offset = index - active;
  const isActive = offset === 0;
  return {
    // x: active card centered at 0, side cards spread by 3 units
    pos: [offset * 3, 0, isActive ? 0 : -Math.abs(offset) * 1.5],
    // Y rotation: side cards angle away from camera (±0.7 rad ≈ 40°)
    rot: [0, isActive ? 0 : -offset * 0.7, 0],
    // Active full opacity, immediate neighbors dimmed, further ones nearly invisible
    opacity: isActive ? 1 : Math.max(0, 1 - Math.abs(offset) * 0.5),
  };
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ index, imageSrc, active }) {
  const texture = useLoader(TextureLoader, imageSrc);
  const matRef = useRef();

  const target = getCoverflowTarget(index, active);

  const { pos, rot, opacity } = useSpring({
    pos: target.pos,
    rot: target.rot,
    opacity: target.opacity,
    config: { mass: 3, tension: 90, friction: 34 },
  });

  // Write uTime + uOpacity to shader every frame
  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uTime = state.clock.elapsedTime;
    matRef.current.uOpacity = opacity.get();
  });

  const aspect = texture.image
    ? texture.image.height / texture.image.width
    : 9 / 16;
  const W = 2.8;
  const H = W * aspect;

  return (
    <animated.mesh position={pos} rotation={rot}>
      {/* 32×32 segments needed for smooth vertex-wave ripple */}
      <planeGeometry args={[W, H, 32, 32]} />
      <paperMaterial
        ref={matRef}
        uTexture={texture}
        transparent
        toneMapped={false}
      />
    </animated.mesh>
  );
}

// ─── SCENE ────────────────────────────────────────────────────────────────────
function Scene({ active }) {
  return (
    <Suspense fallback={null}>
      {PROJECTS.map((p, i) => (
        <Card key={i} index={i} imageSrc={p.image} active={active} />
      ))}
    </Suspense>
  );
}

// ─── DESKTOP CANVAS ───────────────────────────────────────────────────────────
export default function DesktopCanvas() {
  // active = which project is front-and-center (0–3)
  const [active, setActive] = useState(0);

  // Scroll on the canvas area → cycle active card
  const containerRef = useRef();
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let acc = 0;
    const onWheel = (e) => {
      e.preventDefault();
      acc += e.deltaY;
      // Require 80px of scroll to advance one step → avoids accidental skips
      if (acc > 80) {
        setActive((a) => Math.min(a + 1, PROJECTS.length - 1));
        acc = 0;
      } else if (acc < -80) {
        setActive((a) => Math.max(a - 1, 0));
        acc = 0;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:flex w-screen h-screen relative bg-black text-white overflow-hidden"
    >
      {/* R3F Canvas */}
      <Canvas
        style={{ position: "absolute", inset: 0 }}
        camera={{ position: [0, 0, 7], fov: 50 }}
        frameloop="always"
      >
        <Scene active={active} />
      </Canvas>

      {/* Project name list — horizontal row at bottom */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex flex-row justify-center gap-12 pointer-events-none">
        {PROJECTS.map((p, i) => (
          <Link
            key={i}
            href={p.href}
            className="group flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
            onMouseEnter={() => setActive(i)}
          >
            <span
              className="text-xs font-medium opacity-30 transition-opacity duration-300 group-hover:opacity-70"
            >
              0{i + 1}
            </span>
            <span
              className="font-medium transition-all duration-300 leading-tight text-center"
              style={{
                fontSize: active === i ? "1.5rem" : "1rem",
                opacity: active === i ? 1 : 0.3,
                fontFamily: "var(--font-raleway)",
                letterSpacing: active === i ? "-0.02em" : "0",
              }}
            >
              {p.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
