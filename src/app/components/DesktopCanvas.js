"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "./Button";
import { Canvas, useLoader, extend, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { TextureLoader, VideoTexture } from "three";
import { shaderMaterial, useProgress } from "@react-three/drei";
import { PROJECTS } from "../../data/projectData";
import RevealText from "./RevealText";

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

    float roundedBox(vec2 uv, float radius) {
      vec2 q = abs(uv - 0.5) - (0.5 - radius);
      return length(max(q, 0.0)) - radius;
    }

    void main() {
      // Rounded corner mask
      float r = 0.01;
      float d = roundedBox(vUv, r);
      if (d > 0.0) discard;

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
// Cards are placed evenly around a circle of radius RADIUS.
// N = number of projects — all angle math derives from this automatically.
// To add/remove a card: just edit PROJECTS above. Nothing else needs changing.
const RADIUS = 3.5;
const N = PROJECTS.length;

const CARD_W = 2.0;
const CARD_H = CARD_W * 1.5; // portrait ratio
const CARD_DEPTH = 0.02; // thin so it looks like a physical card

// Returns 3D position + Y rotation for card at `index`.
// Card 0 → angle 0 → z = -RADIUS (directly in front of camera).
// Each card is spaced (360/N)° further clockwise around the ring.
function getCardTransform(index) {
  const angle = (index / N) * Math.PI * 2; // evenly distribute around full circle
  const x = -Math.sin(angle) * RADIUS;
  const z = Math.cos(angle) * RADIUS;
  return { pos: [x, 0, z], rot: [0, angle, 0] }; // rotate card to face inward (toward center)
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
// A thin box with 6 faces:
//   material-0..3 → right, left, top, bottom edges → dark fill
//   material-4    → front face → project image via PaperMaterial shader (cover-fit)
//   material-5    → back face  → same image (faces away, not normally visible)
function Card({
  index,
  imageSrc,
  videoSrc,
  isActive,
  href,
  zoomedOut,
  onZoomedClick,
}) {
  const imageTexture = useLoader(TextureLoader, imageSrc);
  const videoTextureRef = useRef(null);

  const videoElRef = useRef(null);
  if (videoSrc && !videoTextureRef.current) {
    const vid = document.createElement("video");
    vid.src = videoSrc;
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.play();
    vid.addEventListener("canplay", () => {
      window.dispatchEvent(new Event("video-card-ready"));
    }, { once: true });
    videoElRef.current = vid;
    videoTextureRef.current = new VideoTexture(vid);
  }

  const texture = videoTextureRef.current ?? imageTexture;
  const videoEl = videoElRef.current;
  const texAspect = videoSrc
    ? videoEl && videoEl.videoWidth
      ? videoEl.videoWidth / videoEl.videoHeight
      : 16 / 9
    : imageTexture.image
      ? imageTexture.image.width / imageTexture.image.height
      : 1;

  const { pos, rot } = getCardTransform(index);
  const router = useRouter();
  const W = CARD_W;
  const H = CARD_H;

  const handleClick = () => {
    if (zoomedOut) onZoomedClick();
    else if (isActive) router.push(href);
  };

  return (
    <group position={pos} rotation={rot}>
      <mesh onClick={handleClick}>
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
          uTexAspect={texAspect}
          uCardAspect={W / H}
          transparent
          toneMapped={false}
        />
        <paperMaterial
          attach="material-5"
          uTexture={texture}
          uTexAspect={texAspect}
          uCardAspect={W / H}
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ─── CAMERA RIG ───────────────────────────────────────────────────────────────
// Runs every frame and lerps camera position toward a target.
// Normal mode:      z=10, y=0  → close up, eye-level
// About/zoomed-out: z=25, y=3  → pulled back and slightly above the scene
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
// Holds all cards and rotates as one group around the Y axis.
//
// SCROLLING:
//   - `steps` (in DesktopCanvas) increments/decrements by 1 on each scroll tick.
//   - `rotation = -steps * (2π/N)` — one step = one card slot.
//   - The spring animates toward each new target, giving it the springy feel.
//   - `steps` is never reset or modded — it's always a growing/shrinking integer
//     so the spring never sees a sudden value jump when looping past card 0.
//
// ABOUT MODE:
//   - zoomedOut=true → auto-spin takes over (delta * 0.4 per frame).
//   - zoomedOut=false → read the raw current Y rotation, round to the nearest
//     card slot, snap the spring there, and sync `steps` back in the parent.
function RingGroup({ rotation, zoomedOut, onExitSnap, active, onZoomedClick }) {
  const groupRef = useRef();

  // Spring drives the ring Y rotation — mass/tension/friction control the feel.
  const [{ ringRot }, api] = useSpring(() => ({
    ringRot: rotation,
    config: { mass: 3, tension: 90, friction: 34 },
  }));

  // New scroll step arrived → animate spring to new rotation target.
  // Skipped during About mode so auto-spin isn't fighting the spring.
  useEffect(() => {
    if (!zoomedOut) {
      api.start({ ringRot: rotation });
    }
  }, [rotation, api]);

  // Exiting About mode → snap ring to nearest card and sync parent steps.
  useEffect(() => {
    if (!zoomedOut && groupRef.current) {
      const cur = groupRef.current.rotation.y;
      const STEP = (Math.PI * 2) / N;
      const nearestStep = Math.round(cur / STEP);
      api.set({ ringRot: cur }); // start spring from current pos
      api.start({ ringRot: nearestStep * STEP }); // animate to nearest card slot
      onExitSnap(((nearestStep % N) + N) % N); // tell parent which card is active
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
        <Card
          key={i}
          index={i}
          imageSrc={p.image}
          videoSrc={p.video}
          isActive={i === active}
          href={p.href}
          zoomedOut={zoomedOut}
          onZoomedClick={onZoomedClick}
        />
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

// ─── PROGRESS TRACKER ─────────────────────────────────────────────────────────
// Fires a custom event when all Three.js assets are loaded (progress = 100).
function ProgressTracker() {
  const { progress } = useProgress();
  const fired = useRef(false);
  useEffect(() => {
    if (progress === 100 && !fired.current) {
      fired.current = true;
      window.dispatchEvent(new Event("three-loaded"));
    }
  }, [progress]);
  return null;
}

// ─── SCENE ────────────────────────────────────────────────────────────────────
function Scene({ rotation, zoomedOut, onExitSnap, active, onZoomedClick }) {
  return (
    <Suspense fallback={null}>
      <ProgressTracker />
      <CameraRig zoomedOut={zoomedOut} />
      <RingGroup
        rotation={rotation}
        zoomedOut={zoomedOut}
        onExitSnap={onExitSnap}
        active={active}
        onZoomedClick={onZoomedClick}
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
  const rotation = steps * STEP;
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
          active={active}
          onZoomedClick={() => setAboutActive(false)}
        />
      </Canvas>

      {/* About button — top center */}
      <div className="absolute top-8 p-10 left-0 right-0 z-10 flex justify-center">
        <button
          className="font-medium transition-all duration-300 cursor-pointer"
          style={{
            fontSize: aboutActive ? "1.5rem" : "1rem",
            opacity: aboutActive ? 1 : 0.3,
            letterSpacing: aboutActive ? "-0.02em" : "0",
          }}
          onClick={() => setAboutActive((v) => !v)}
        >
          About
        </button>
      </div>

      {/* Project info panel — grid overlay */}
      <div
        className="absolute inset-0 z-10 grid grid-cols-12 gap-4 pointer-events-none transition-opacity duration-500"
        style={{ opacity: aboutActive || !panelVisible ? 0 : 1 }}
      >
        {/* Panel content — cols 1–3 */}
        <div
          className={`col-span-4 col-start-1 flex flex-col justify-center gap-10 h-screen items-start pl-[8.33vw] pr-15 ${aboutActive || !panelVisible ? "pointer-events-none" : "pointer-events-auto"}`}
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div className="flex flex-col gap-10">
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
                  <span className="text-xs font-medium opacity-80">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Link href={PROJECTS[displayedActive].href}>
            <Button variant="filled" color="white" size="small">
              View Study Case
            </Button>
          </Link>
        </div>

        {/* Rest of grid — transparent */}
        <div className="col-span-8 pointer-events-none" />
      </div>

      {/* About — grid overlay */}
      <div
        className="absolute inset-0 z-10 grid grid-cols-12 gap-4 px-3 pointer-events-none transition-opacity duration-500 items-center"
        style={{ opacity: aboutActive ? 1 : 0 }}
      >
        {/* Left panel: bio + experience — cols 1–3 */}
        <div
          className={`col-span-4 flex col-start-1 flex-col justify-between px-20 self-stretch py-20 ${aboutActive ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {/* Top: bio */}
          <div className="flex flex-col gap-2 mt-20">
            <h2 className="text-5xl uppercase font-bold leading-tight">
              Eyal Mordechai
            </h2>
            <p className="text-xl opacity-80 font-medium">
              Creative Developer with a Product Mindset
            </p>
            <RevealText
              className="text-3xl font-medium italic opacity-60 leading-relaxed mt-10"
              trigger={aboutActive}
              duration={1}
            >
              I build interactive experiences and scalable products, merging
              design thinking with React, 3D, and modern web development.
            </RevealText>
          </div>

          {/* Bottom: core focus + education */}
          <div className="flex flex-col gap-6 mt-10">
            <div className="flex flex-col gap-3">
              <p className="text-xs opacity-40 tracking-widest uppercase">
                Core Focus
              </p>
              {[
                "Interactive Product Development",
                "Motion & UX-driven Interfaces",
                "Creative Technology",
              ].map((s) => (
                <span key={s} className="text-xs font-medium opacity-80">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs opacity-40 tracking-widest uppercase">
                Design & Product Thinking
              </p>
              {[
                "UX / Interaction Design",
                "Prototyping",
                "Systems thinking",
              ].map((s) => (
                <span key={s} className="text-xs font-medium opacity-80">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs opacity-40 tracking-widest uppercase">
                Education
              </p>
              <span className="text-xs font-medium opacity-80">
                B.Des, Visual Communication
              </span>
              <span className="text-xs opacity-40 italic">
                Bezalel Academy, 2021–2025
              </span>
            </div>
          </div>
        </div>

        {/* Right panel — absolute right, vertically centered */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 right-20 flex flex-col gap-6 ${aboutActive ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {[
            {
              label: "Creative Stack",
              items: [
                "Three.js / React Three Fiber",
                "GSAP / Framer Motion",
                "WebGL",
                "Spline 3D",
              ],
            },
            {
              label: "Product Stack",
              items: [
                "React / Next.js",
                "Tailwind CSS",
                "REST APIs",
                "Component Architecture",
              ],
            },
            {
              label: "Design",
              items: ["Figma", "Adobe Suite"],
            },
          ].map(({ label, items }) => (
            <div key={label} className="flex flex-col gap-2">
              <p className="text-xs opacity-40 tracking-widest uppercase">
                {label}
              </p>
              {items.map((s) => (
                <span key={s} className="text-xs font-medium opacity-80">
                  {s}
                </span>
              ))}
            </div>
          ))}
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
