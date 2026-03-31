"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { Canvas, useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { TextureLoader } from "three";

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

// Individual card — loads texture, springs to hover target
function Card({ index, imageSrc, hovered, onPointerOver, onPointerOut }) {
  const texture = useLoader(TextureLoader, imageSrc);
  const sc = SCATTER[index];
  const isHovered = hovered === index;
  const anyHovered = hovered !== -1;

  // Spring: slow + heavy feel. Tension=low → lazy. Friction=high → no overshoot.
  const { pos, rot, opacity } = useSpring({
    pos: isHovered ? [0, 0, 1] : sc.pos,
    rot: isHovered ? [0, 0, 0] : sc.rot,
    opacity: isHovered ? 1 : anyHovered ? 0 : 1,
    config: { mass: 3, tension: 100, friction: 32 },
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
      <planeGeometry args={[W, H]} />
      <animated.meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        // meshBasicMaterial ignores lights → faster than meshStandardMaterial
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
