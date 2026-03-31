"use client";
import { useState, useRef, Suspense } from "react";
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

// Resting positions in 3D world space.
// pos: [x, y, z]  — x=left/right, y=up/down, z=closer(+)/further(-)
// rot: [x, y, z]  — rotation in radians. ~0.1 ≈ 6°, ~0.2 ≈ 11°
// ← TWEAK these to reposition cards →
const SCATTER = [
  { pos: [0.2, 0.5, 0.0], rot: [0, 0.28, -0.12] },
  { pos: [3.0, -0.8, -0.5], rot: [0, -0.1, 0.15] },
  { pos: [1.8, 1.2, -2.0], rot: [0, 0.12, -0.2] },
  { pos: [3.5, 0.2, -3.5], rot: [0, -0.08, 0.25] },
];

// ─── PAPER SHADER ─────────────────────────────────────────────────────────────
// Custom GLSL shader that adds animated film grain over the image.
// uniforms (values passed from JS to the GPU every frame):
//   uTexture — the project screenshot
//   uOpacity — animated opacity (from react-spring)
//   uTime    — elapsed time in seconds (drives the animated grain)
//   uGrain   — grain intensity (0 = off, 1 = heavy)
const PaperMaterial = shaderMaterial(
  // Default uniform values
  { uTexture: null, uOpacity: 1.0, uTime: 0.0 },

  // ── VERTEX SHADER ──────────────────────────────────────────────────────────
  // Displaces each vertex along Z with sine waves → the whole mesh ripples like paper
  `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Two overlapping waves along X and Y axes
      // amplitude 0.06 = how much it bends (in Three.js units)
      // frequency 2.5/3.0 = how many waves across the card
      // speed 0.5/0.4 = how fast it ripples
      pos.z += sin(pos.x * 2.5 + uTime * 0.5) * 0.06;
      pos.z += sin(pos.y * 3.0 + uTime * 0.4) * 0.05;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,

  // ── FRAGMENT SHADER ────────────────────────────────────────────────────────
  // Just samples the texture + applies opacity. Ripple is all in the vertex shader.
  `
    uniform sampler2D uTexture;
    uniform float uOpacity;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(uTexture, vUv);
      color.a *= uOpacity;
      gl_FragColor = color;
    }
  `,
);

// Register the custom material so R3F knows about it as <paperMaterial />
extend({ PaperMaterial });

// ─── CARD ─────────────────────────────────────────────────────────────────────
// Individual card — loads texture, springs to hover target, film-grain shader
function Card({ index, imageSrc, hovered, onPointerOver, onPointerOut }) {
  const texture = useLoader(TextureLoader, imageSrc);
  const sc = SCATTER[index];
  const isHovered = hovered === index;
  const anyHovered = hovered !== -1;

  // Ref to the custom shader material so we can write uniforms every frame
  const matRef = useRef();

  // Spring: slow + heavy feel. Tension=low → lazy. Friction=high → no overshoot.
  // opacity is a spring value — we read it imperatively in useFrame below
  const { pos, rot, opacity } = useSpring({
    pos: isHovered ? [0, 0, 1] : sc.pos,
    rot: isHovered ? [0, 0, 0] : sc.rot,
    opacity: isHovered ? 1 : anyHovered ? 0 : 1,
    config: { mass: 3, tension: 100, friction: 32 },
  });

  // Update shader uniforms every frame:
  // uTime  → animated grain noise
  // uOpacity → read from the spring value directly (opacity.get() returns current number)
  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uTime = state.clock.elapsedTime;
    matRef.current.uOpacity = opacity.get();
  });

  const aspect = texture.image
    ? texture.image.height / texture.image.width
    : 9 / 16;
  const W = 2.8; // ← card width in Three.js units
  const H = W * aspect;

  return (
    <animated.mesh
      position={pos}
      rotation={rot}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* 32x32 segments → enough verts for smooth ripple waves */}
      <planeGeometry args={[W, H, 32, 32]} />
      {/*
        paperMaterial — our custom GLSL shader (see PaperMaterial above).
        uTexture: the screenshot image
        uOpacity: set imperatively via useFrame (spring value can't be passed as JSX prop)
        uGrain:   film-grain strength (0 = off, 1 = heavy)
        transparent: needed so uOpacity alpha works correctly
      */}
      <paperMaterial
        ref={matRef}
        uTexture={texture}
        transparent
        toneMapped={false}
      />
    </animated.mesh>
  );
}

// Scene — just lights + cards, no expensive post-processing
function Scene({ hovered, setHovered }) {
  return (
    <Suspense fallback={null}>
      {PROJECTS.map((p, i) => (
        <Card
          key={i}
          index={i}
          imageSrc={p.image}
          hovered={hovered}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(i);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(-1);
          }}
        />
      ))}
    </Suspense>
  );
}

export default function DesktopCanvas() {
  const [hovered, setHovered] = useState(-1);

  return (
    <div className="hidden lg:flex w-screen h-screen relative bg-black text-white overflow-hidden">
      {/* R3F Canvas — camera at z=7, looking at origin */}
      <Canvas
        style={{ position: "absolute", inset: 0 }}
        camera={{ position: [0, 0, 7], fov: 50 }}
        // frameloop="demand" — only renders when something changes, saves GPU when idle
        frameloop="always"
      >
        <Scene hovered={hovered} setHovered={setHovered} />
      </Canvas>

      {/* HTML name list on top of canvas */}
      <div className="relative z-10 flex flex-col justify-center pl-20 gap-4 h-full pointer-events-none">
        <p className="text-xs font-medium tracking-widest uppercase opacity-30 mb-6">
          Selected Works
        </p>
        {PROJECTS.map((p, i) => (
          <Link
            key={i}
            href={p.href}
            className="group flex items-baseline gap-4 cursor-pointer pointer-events-auto"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(-1)}
          >
            <span
              className="text-xs font-medium opacity-30 transition-opacity duration-300 group-hover:opacity-70"
              style={{ minWidth: "1.5rem" }}
            >
              0{i + 1}
            </span>
            <span
              className="font-medium transition-all duration-300 leading-tight"
              style={{
                fontSize: hovered === i ? "3.5rem" : "2rem",
                opacity: hovered === -1 ? 0.85 : hovered === i ? 1 : 0.2,
                fontFamily: "var(--font-raleway)",
                letterSpacing: hovered === i ? "-0.02em" : "0",
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
