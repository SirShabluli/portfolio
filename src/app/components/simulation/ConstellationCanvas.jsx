"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ScatteredLayout from "./ScatteredLayout";
import CloudsLayout from "./CloudsLayout";
import TunnelLayout from "./TunnelLayout";
import { animateToPosition } from "./cameraAnimations";

const LAYOUTS = [
  {
    id: "scattered",
    label: "Scattered",
    position: [-20, 0, 0],
    description:
      "Words extracted from the user's text scatter across 3D space. Each word pulses with its own sine-wave opacity rhythm, representing raw unprocessed emotional content before AI analysis.",
    background: {
      topColor: "#0b1d3a",
      middleColor: "#102e4a",
      bottomColor: "#071829",
      intensity: 0.1,
      speed: 0.03,
    },
  },
  {
    id: "clouds",
    label: "Entity Clouds",
    position: [0, 0, 0],
    description:
      "After AI analysis, semantically related words cluster into floating clouds. Each cloud has a central concept with satellite words orbiting it — showing emotional themes side by side.",
    background: {
      topColor: "#2a1440",
      middleColor: "#522a78",
      bottomColor: "#8162a8",
      intensity: 0.65,
      speed: 0.03,
    },
  },
  {
    id: "tunnel",
    label: "Tunnel",
    position: [20, 0, 0],
    description:
      "Key insights are placed on rotating circular rings receding into depth. Longer texts get larger rings. Looking through the tunnel gives a sense of accumulated layered thought.",
    background: {
      topColor: "#c31432",
      middleColor: "#660000",
      bottomColor: "#000000",
      intensity: 0.3,
      speed: 0.03,
    },
  },
];

const SCATTERED_WORDS = [
  "memory",
  "doubt",
  "noise",
  "signal",
  "body",
  "absence",
  "pattern",
  "trace",
  "echo",
  "weight",
];
const CLOUD_DATA = [
  {
    centerEntity: "anxiety",
    emotionWords: ["tension", "pressure", "rush", "freeze", "loop"],
  },
  {
    centerEntity: "calm",
    emotionWords: ["breath", "open", "slow", "ground", "quiet"],
  },
  {
    centerEntity: "memory",
    emotionWords: ["return", "fragment", "blur", "before", "lost"],
  },
];
const INSIGHTS = [
  "the pattern repeats itself",
  "beneath the surface there is more",
  "a question that keeps returning",
  "something left unsaid",
  "the body remembers what the mind forgets",
];

function Scene({ activeId, orbitRef }) {
  const { camera } = useThree();
  const isFirstMount = useRef(true);

  useEffect(() => {
    const target = LAYOUTS.find((l) => l.id === activeId);
    if (!target) return;
    const [tx, ty, tz] = target.position;

    if (isFirstMount.current) {
      camera.position.set(tx, ty, tz + 12);
      camera.lookAt(tx, ty, tz);
      if (orbitRef.current) {
        orbitRef.current.target.set(tx, ty, tz);
        orbitRef.current.update();
      }
      isFirstMount.current = false;
      return;
    }

    animateToPosition(
      camera,
      orbitRef,
      [tx, ty, tz + 12],
      [tx, ty, tz],
      () => {},
    );
  }, [activeId]);

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.5} />
      {activeId === "scattered" && (
        <ScatteredLayout scatteredWords={SCATTERED_WORDS} wordCount={35} opacity={0.75} spreadRadiusX={22} spreadRadiusY={18} spreadRadiusZ={8} />
      )}
      {activeId === "clouds" && (
        <CloudsLayout cloudData={CLOUD_DATA} opacity={0.85} />
      )}
      {activeId === "tunnel" && (
        <TunnelLayout frozenInsights={INSIGHTS} opacity={0.9} spacing={4.5} baseRadius={6.5} />
      )}
    </>
  );
}

export default function ConstellationCanvas() {
  const [activeId, setActiveId] = useState("scattered");
  const orbitRef = useRef();
  const activeLayout = LAYOUTS.find((l) => l.id === activeId);

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{ clearColor: "#000000" }}
      >
        <OrbitControls
          ref={orbitRef}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
        <Scene activeId={activeId} orbitRef={orbitRef} />
      </Canvas>

      {/* Description — top left */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          color: "#fff",
          maxWidth: 280,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "'NarkissYairMono-Regular', 'Segoe UI', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.6,
            opacity: 0.85,
            margin: 0,
            transition: "opacity 0.4s",
          }}
        >
          {activeLayout.description}
        </p>
      </div>

      {/* Nav buttons — bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "12px",
        }}
      >
        {LAYOUTS.map((l) => (
          <button
            key={l.id}
            onClick={() => setActiveId(l.id)}
            style={{
              padding: "8px 20px",
              fontFamily: "'NarkissYairMono-Regular', 'Segoe UI', sans-serif",
              fontSize: "14px",
              background:
                activeId === l.id ? "#ffffff" : "rgba(255,255,255,0.12)",
              color: activeId === l.id ? "#000000" : "#ffffff",
              border: "2px solid rgba(255,255,255,0.6)",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
