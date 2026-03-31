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
  `,
);

extend({ PaperMaterial });

// ─── CIRCLE LAYOUT ────────────────────────────────────────────────────────────
// Cards sit on a horizontal ring (like a lazy susan).
// The ring is rotated so the active card always faces the camera (front = -Z).
//
// RADIUS  — how big the circle is (Three.js units). Bigger = more spread out.
// Each card's angle on the ring = (i / N) * 2π, then the whole ring is rotated
// so that the active card's angle lands at the front (angle = 0 = -Z direction).
const RADIUS = 3.5; // ← size of the ring
const N = PROJECTS.length;

// ─── CARD DIMENSIONS ──────────────────────────────────────────────────────────
const CARD_W = 2.8; // ← width in Three.js units
const CARD_DEPTH = 0.02; // ← thickness (edge depth)

function getCircleTarget(index, active) {
  // Angle of this card on the ring (evenly spaced)
  const baseAngle = (index / N) * Math.PI * 2;
  // Rotate ring so active card is at front (subtract active card's angle)
  const activeAngle = (active / N) * Math.PI * 2;
  const angle = baseAngle - activeAngle;

  // Position on the ring: x = sin(angle) * R, z = -cos(angle) * R
  // (z negative = front of scene where camera looks)
  const x = Math.sin(angle) * RADIUS;
  const z = -Math.cos(angle) * RADIUS;

  // Each card faces the center of the circle (tangent to ring)
  // rotY = same angle so card always faces inward toward camera
  const rotY = angle;

  // Active card (angle ≈ 0) is closest → full opacity
  // Cards behind (|angle| > π/2) fade out
  const opacity = Math.max(0, Math.cos(angle) * 0.6 + 0.4);

  return { pos: [x, 0, z], rot: [0, rotY, 0], opacity };
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ index, imageSrc, active }) {
  const texture = useLoader(TextureLoader, imageSrc);
  const matRef = useRef();

  const target = getCircleTarget(index, active);

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
  const W = CARD_W;
  const H = W * aspect;

  return (
    // Group so the image face + side slab move/rotate together
    <animated.group position={pos} rotation={rot}>
      {/* Side slab — box gives the card physical depth, image on front face */}
      <mesh>
        <boxGeometry args={[W, H, CARD_DEPTH]} />
        {/*
          6 materials for the 6 box faces: +x, -x, +y, -y, +z (front), -z (back)
          Front face (+z) gets the paper shader with the image.
          All other faces get a plain dark color.
        */}
        {/* box face order: +x, -x, +y, -y, +z (front), -z (back) */}
        <meshBasicMaterial attach="material-0" color="#1a1a1a" toneMapped={false} />
        <meshBasicMaterial attach="material-1" color="#1a1a1a" toneMapped={false} />
        <meshBasicMaterial attach="material-2" color="#1a1a1a" toneMapped={false} />
        <meshBasicMaterial attach="material-3" color="#1a1a1a" toneMapped={false} />
        <paperMaterial attach="material-4" ref={matRef} uTexture={texture} transparent toneMapped={false} />
        <paperMaterial attach="material-5" uTexture={texture} transparent toneMapped={false} />
      </mesh>
    </animated.group>
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
        camera={{ position: [0, 3, 10], fov: 60 }}
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
            <span className="text-xs font-medium opacity-30 transition-opacity duration-300 group-hover:opacity-70">
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
