"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Button from "./Button";
import { Canvas, useLoader, extend, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { TextureLoader } from "three";
import { shaderMaterial } from "@react-three/drei";

const PROJECTS = [
  {
    name: "Netflix Dating",
    href: "/netflixdating",
    image: "/images/main/netflixhero.png",
    description:
      "A dating app concept built inside the Netflix universe — matching users by taste, not swipes.",
    role: "UI Design & Illustration",
    year: "2025",
    skills: "Adobe Illustrator · Figma · Illustration",
  },
  {
    name: "I'll Think About it Later",
    href: "/pagmar",
    image: "/images/pagmar/pagmarfallback.png",
    description:
      "A productivity tool that turns procrastination into a structured, guilt-free workflow.",
    role: "Research, Design & Fullstack Development",
    year: "2025",
    skills: "ReactJs · Three.js · AI Integration · UX Research",
  },
  {
    name: "Men's Toilet",
    href: "/toilet",
    image: "/images/main/toiletbg.png",
    description:
      "A playful social experiment exploring the unspoken rules of men's restroom etiquette.",
    role: "Design & Frontend Development",
    year: "2024",
    skills: "Adobe Illustrator · Figma · HTML · CSS · Javascript",
  },
  {
    name: "What Happens in Vegas",
    href: "/vegas",
    image: "/images/main/vegashome.png",
    description:
      "An immersive travel experience concept capturing the energy and excess of Las Vegas.",
    role: "UI Design & Illustration",
    year: "2025",
    skills: "Adobe Illustrator · Figma · Illustration",
  },
];

// ─── PAPER SHADER ─────────────────────────────────────────────────────────────
const PaperMaterial = shaderMaterial(
  { uTexture: null, uOpacity: 1.0, uTexAspect: 1.0, uCardAspect: 1.0 },

  // ── VERTEX SHADER ──
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  // ── FRAGMENT SHADER ──
  `
    uniform sampler2D uTexture;
    uniform float uOpacity;
    uniform float uTexAspect;
    uniform float uCardAspect;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv - 0.5;
      float imgAspect = uTexAspect;
      float cardAspect = uCardAspect;
      if (imgAspect > cardAspect) {
        uv.x *= cardAspect / imgAspect;
      } else {
        uv.y *= imgAspect / cardAspect;
      }
      uv += 0.5;
      vec4 color = texture2D(uTexture, uv);
      color.a *= uOpacity;
      gl_FragColor = color;
    }
  `,
);

extend({ PaperMaterial });

// ─── CIRCLE LAYOUT ────────────────────────────────────────────────────────────
const RADIUS = 3.5;
const N = PROJECTS.length;

const CARD_W = 2.0;
const CARD_H = CARD_W * 1.5;
const CARD_DEPTH = 0.02;

function getCardTransform(index) {
  const angle = (index / N) * Math.PI * 2;
  const x = Math.sin(angle) * RADIUS;
  const z = -Math.cos(angle) * RADIUS;
  return { pos: [x, 0, z], rot: [0, angle, 0] };
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ index, imageSrc }) {
  const texture = useLoader(TextureLoader, imageSrc);
  const { pos, rot } = getCardTransform(index);

  const W = CARD_W;
  const H = CARD_H;

  return (
    <group position={pos} rotation={rot}>
      <mesh>
        <boxGeometry args={[W, H, CARD_DEPTH]} />
        <meshBasicMaterial
          attach="material-0"
          color="#1a1a1a"
          toneMapped={false}
        />
        <meshBasicMaterial
          attach="material-1"
          color="#1a1a1a"
          toneMapped={false}
        />
        <meshBasicMaterial
          attach="material-2"
          color="#1a1a1a"
          toneMapped={false}
        />
        <meshBasicMaterial
          attach="material-3"
          color="#1a1a1a"
          toneMapped={false}
        />
        <paperMaterial
          attach="material-4"
          uTexture={texture}
          uTexAspect={
            texture.image ? texture.image.width / texture.image.height : 1
          }
          uCardAspect={W / H}
          transparent
          toneMapped={false}
        />
        <paperMaterial
          attach="material-5"
          uTexture={texture}
          uTexAspect={
            texture.image ? texture.image.width / texture.image.height : 1
          }
          uCardAspect={W / H}
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ─── CAMERA RIG ───────────────────────────────────────────────────────────────
// Smoothly lerps the camera Z between normal (10) and zoomed-out (18).
function CameraRig({ zoomedOut }) {
  useFrame((state) => {
    const targetZ = zoomedOut ? 25 : 10;
    const targetY = zoomedOut ? 3 : 0;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
  });
  return null;
}

// ─── RING GROUP ───────────────────────────────────────────────────────────────
// rotation is a continuous value (never wraps) — no jump on loop.
// When zoomedOut: auto-spins. When not: spring-driven to rotation target.
function RingGroup({ rotation, zoomedOut, onExitSnap }) {
  const groupRef = useRef();

  const [{ ringRot }, api] = useSpring(() => ({
    ringRot: rotation,
    config: { mass: 3, tension: 90, friction: 34 },
  }));

  // Scroll: animate to new rotation target
  useEffect(() => {
    if (!zoomedOut) {
      api.start({ ringRot: rotation });
    }
  }, [rotation, api]);

  // Exit About: snap to nearest card from current spin position
  useEffect(() => {
    if (!zoomedOut && groupRef.current) {
      const cur = groupRef.current.rotation.y;
      const STEP = (Math.PI * 2) / N;
      const nearestStep = Math.round(-cur / STEP);
      api.set({ ringRot: cur });
      api.start({ ringRot: -nearestStep * STEP });
      onExitSnap(((nearestStep % N) + N) % N);
    }
  }, [zoomedOut]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (zoomedOut) {
      groupRef.current.rotation.y -= delta * 0.4;
    } else {
      groupRef.current.rotation.y = ringRot.get();
    }
  });

  return (
    <group ref={groupRef}>
      {PROJECTS.map((p, i) => (
        <Card key={i} index={i} imageSrc={p.image} />
      ))}
    </group>
  );
}

// ─── ABOUT PHOTO PLANE ────────────────────────────────────────────────────────
function AboutPlane({ visible }) {
  const texture = useLoader(TextureLoader, "/images/main/yaaniani.png");
  const meshRef = useRef();

  const [{ opacity }, api] = useSpring(() => ({
    opacity: 0,
    config: { mass: 1, tension: 60, friction: 40 },
  }));

  useEffect(() => {
    if (visible) {
      const id = setTimeout(
        () =>
          api.start({
            opacity: 1,
            config: { mass: 1, tension: 30, friction: 40 },
          }),
        150,
      );
      return () => clearTimeout(id);
    } else {
      api.start({
        opacity: 0,
        config: { mass: 1, tension: 100, friction: 30 },
      });
    }
  }, [visible, api]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.material.opacity = opacity.get();
  });

  const aspect = texture.image ? texture.image.width / texture.image.height : 1;
  const h = 22;
  const w = h * aspect;

  return (
    <mesh ref={meshRef} position={[0, 4, -8]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

// ─── KEYBOARD PLANE ───────────────────────────────────────────────────────────
function KeyboardPlane({ visible }) {
  const texture = useLoader(TextureLoader, "/images/main/keyboard.png");
  const meshRef = useRef();

  const [{ opacity }, api] = useSpring(() => ({
    opacity: 0,
    config: { mass: 1, tension: 60, friction: 40 },
  }));

  useEffect(() => {
    if (visible) {
      const id = setTimeout(
        () =>
          api.start({
            opacity: 1,
            config: { mass: 1, tension: 30, friction: 40 },
          }),
        150,
      );
      return () => clearTimeout(id);
    } else {
      api.start({
        opacity: 0,
        config: { mass: 1, tension: 100, friction: 30 },
      });
    }
  }, [visible, api]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.material.opacity = opacity.get();
  });

  const aspect = texture.image ? texture.image.width / texture.image.height : 1;
  const w = 18;
  const h = w / aspect;

  return (
    <mesh ref={meshRef} position={[0, -6, -4]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

// ─── SCENE ────────────────────────────────────────────────────────────────────
function Scene({ rotation, zoomedOut, onExitSnap }) {
  return (
    <Suspense fallback={null}>
      <CameraRig zoomedOut={zoomedOut} />
      <RingGroup
        rotation={rotation}
        zoomedOut={zoomedOut}
        onExitSnap={onExitSnap}
      />
      <AboutPlane visible={zoomedOut} />
      <KeyboardPlane visible={zoomedOut} />
    </Suspense>
  );
}

// ─── DESKTOP CANVAS ───────────────────────────────────────────────────────────
export default function DesktopCanvas() {
  // steps is a continuous integer — never wraps, so ring never jumps
  const [steps, setSteps] = useState(0);
  const [aboutActive, setAboutActive] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [displayedActive, setDisplayedActive] = useState(0);

  const STEP = (Math.PI * 2) / N;
  const rotation = -steps * STEP;
  // active index for UI highlight
  const active = ((steps % N) + N) % N;

  // Hide panel on scroll, then after 1s update content + show
  const panelTimerRef = useRef(null);
  useEffect(() => {
    clearTimeout(panelTimerRef.current);
    // Use a two-step timeout: immediately queue a hide, then show after 1s
    panelTimerRef.current = setTimeout(() => {
      setDisplayedActive(active);
      setPanelVisible(true);
    }, 1000);
    // Defer the hide to next tick so it's not synchronous in the effect body
    const hideId = setTimeout(() => setPanelVisible(false), 0);
    return () => {
      clearTimeout(panelTimerRef.current);
      clearTimeout(hideId);
    };
  }, [active]);

  const containerRef = useRef();
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let acc = 0;
    const onWheel = (e) => {
      e.preventDefault();
      acc += e.deltaY;
      if (acc > 80) {
        setSteps((s) => s + 1);
        acc = 0;
      } else if (acc < -80) {
        setSteps((s) => s - 1);
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
        camera={{ position: [0, 0, 10], fov: 40 }}
        frameloop="always"
      >
        <Scene
          rotation={rotation}
          zoomedOut={aboutActive}
          onExitSnap={setSteps}
        />
      </Canvas>

      {/* About button — top center */}
      <div className="absolute top-8 p-10 left-0 right-0 z-10 flex justify-center">
        <button
          className="font-medium transition-all duration-300 cursor-pointer"
          style={{
            fontFamily: "var(--font-raleway)",
            fontSize: aboutActive ? "1.5rem" : "1rem",
            opacity: aboutActive ? 1 : 0.3,
            letterSpacing: aboutActive ? "-0.02em" : "0",
          }}
          onClick={() => setAboutActive((v) => !v)}
        >
          About
        </button>
      </div>

      {/* Project info panel — left of active card */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-10 flex flex-col items-start gap-6 w-72 transition-opacity duration-500 px-8 py-10 rounded-sm"
        style={{
          left: "10%",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.95) 80%, rgba(0,0,0,0.1) 100%)",
          opacity: aboutActive || !panelVisible ? 0 : 1,
          pointerEvents: aboutActive || !panelVisible ? "none" : "auto",
        }}
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs opacity-40 tracking-widest uppercase">
            0{displayedActive + 1}
          </p>
          <h2 className="section-title font-medium leading-tight">
            {PROJECTS[displayedActive].name}
          </h2>
          <p className="text-sm font-medium opacity-60 leading-relaxed">
            {PROJECTS[displayedActive].description}
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Role", value: PROJECTS[displayedActive].role },
              { label: "Year", value: PROJECTS[displayedActive].year },
              { label: "Skills", value: PROJECTS[displayedActive].skills },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-row gap-2.5">
                <span className="text-xs font-medium italic opacity-40">
                  {label}
                </span>
                <span className="text-xs font-medium opacity-80">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <Link href={PROJECTS[displayedActive].href}>
          <Button variant="filled" color="white" size="small">
            View Study Case →
          </Button>
        </Link>
      </div>

      {/* About — grid overlay */}
      <div
        className="absolute inset-0 z-10 grid grid-cols-12 gap-4 px-10 pointer-events-none transition-opacity duration-500"
        style={{ opacity: aboutActive ? 1 : 0 }}
      >
        {/* Left panel: bio + experience — cols 1–3 */}
        <div className="col-span-3 flex col-start-2 flex-col justify-center gap-8 pointer-events-auto">
          <div className="flex flex-col gap-2">
            <p
              className="text-xs opacity-40 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              About me
            </p>
            <h2
              className="text-5xl font-medium leading-tight"
              style={{
                fontFamily: "var(--font-raleway)",
                letterSpacing: "-0.02em",
              }}
            >
              Eyal Mordechai
            </h2>
            <p
              className="text-sm opacity-60 leading-relaxed mt-1"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Visual & interaction designer blending code and craft — building
              experiences that feel as good as they look.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p
              className="text-xs opacity-40 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Experience
            </p>
            {[
              {
                year: "2025",
                role: "Graduation Project",
                place: "Shenkar — HIT",
              },
              { year: "2024", role: "UI/UX Designer", place: "Freelance" },
              { year: "2023", role: "Frontend Developer", place: "Freelance" },
            ].map(({ year, role, place }) => (
              <div
                key={year + role}
                className="flex flex-row gap-3 items-start"
              >
                <span
                  className="text-xs opacity-30 w-8 shrink-0"
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  {year}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-xs font-medium opacity-80"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {role}
                  </span>
                  <span
                    className="text-xs opacity-40 italic"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {place}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center — 3D scene takes cols 4–9, leave empty */}
        <div className="col-span-6 pointer-events-none" />

        {/* Right panel: skills + education — cols 10–12 */}
        <div className="col-span-3 col-start-10 flex flex-col justify-center gap-8 pointer-events-auto">
          <div className="flex flex-col gap-3">
            <p
              className="text-xs opacity-40 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Design
            </p>
            {["Figma", "Adobe Illustrator", "Framer", "Motion Design"].map(
              (s) => (
                <span
                  key={s}
                  className="text-xs font-medium opacity-80"
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  {s}
                </span>
              ),
            )}
          </div>
          <div className="flex flex-col gap-3">
            <p
              className="text-xs opacity-40 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Development
            </p>
            {["React / Next.js", "Three.js / R3F", "GSAP", "Tailwind CSS"].map(
              (s) => (
                <span
                  key={s}
                  className="text-xs font-medium opacity-80"
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  {s}
                </span>
              ),
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p
              className="text-xs opacity-40 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Education
            </p>
            <span
              className="text-xs font-medium opacity-80"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Visual Communication Design
            </span>
            <span
              className="text-xs opacity-40 italic"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Shenkar — HIT, 2022–2025
            </span>
          </div>
        </div>
      </div>

      {/* Project name list — horizontal row at bottom */}
      <div
        className="absolute bottom-10 left-0 right-0 z-10 flex flex-row justify-center gap-12 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: aboutActive ? 0 : 1,
          pointerEvents: aboutActive ? "none" : "auto",
        }}
      >
        {PROJECTS.map((p, i) => (
          <Link
            key={i}
            href={p.href}
            className="group flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
            onMouseEnter={() => setSteps(i)}
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
