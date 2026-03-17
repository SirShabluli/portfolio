"use client";
import { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import ScatteredLayout from "./ScatteredLayout";
import CloudsLayout from "./CloudsLayout";
import TunnelLayout from "./TunnelLayout";

// Each layout: position = where the content lives
// cameraPos = where the camera sits to look at it
// lookAt = what the camera points at
const LAYOUTS = [
  {
    id: "scattered",
    label: "Scattered",
    title: "Raw Input",
    position: [0, -20, 0],
    cameraPos: [0, -8, 0],
    lookAt: [0, -20, 0],
    description:
      "Words extracted from the user's text scatter across 3D space. Each word pulses with its own sine-wave opacity rhythm, representing raw unprocessed emotional content before AI analysis.",
  },
  {
    id: "clouds",
    label: "Entity Clouds",
    title: "Semantic Clusters",
    position: [0, 20, 0],
    cameraPos: [0, 8, 0],
    lookAt: [0, 20, 0],
    description:
      "After AI analysis, semantically related words cluster into floating clouds. Each cloud has a central concept with satellite words orbiting it — showing emotional themes side by side.",
  },
  {
    id: "tunnel",
    label: "Tunnel",
    title: "Key Insights",
    position: [0, 0, 0],
    cameraPos: [0, 0, 12],
    lookAt: [0, 0, 0],
    description:
      "Key insights are placed on rotating circular rings receding into depth. Longer texts get larger rings. Looking through the tunnel gives a sense of accumulated layered thought.",
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

// Waypoint queue: when going clouds↔scattered, route via tunnel (center) first
function getWaypoints(fromId, toId) {
  const needsViaTunnel =
    (fromId === "clouds" && toId === "scattered") ||
    (fromId === "scattered" && toId === "clouds");

  const dest = LAYOUTS.find((l) => l.id === toId);
  if (needsViaTunnel) {
    const mid = LAYOUTS.find((l) => l.id === "tunnel");
    return [
      {
        camPos: new THREE.Vector3(...mid.cameraPos),
        lookAt: new THREE.Vector3(...mid.lookAt),
      },
      {
        camPos: new THREE.Vector3(...dest.cameraPos),
        lookAt: new THREE.Vector3(...dest.lookAt),
      },
    ];
  }
  return [
    {
      camPos: new THREE.Vector3(...dest.cameraPos),
      lookAt: new THREE.Vector3(...dest.lookAt),
    },
  ];
}

function Scene({ activeId, orbitRef }) {
  const { camera } = useThree();
  const isFirstMount = useRef(true);
  const prevId = useRef("tunnel");
  const waypointQueue = useRef([]);
  const currentTarget = useRef({
    camPos: new THREE.Vector3(0, 0, 12),
    lookAt: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    const layout = LAYOUTS.find((l) => l.id === activeId);
    if (!layout) return;

    if (isFirstMount.current) {
      camera.position.set(...layout.cameraPos);
      if (orbitRef.current) {
        orbitRef.current.target.set(...layout.lookAt);
        orbitRef.current.update();
      }
      currentTarget.current = {
        camPos: new THREE.Vector3(...layout.cameraPos),
        lookAt: new THREE.Vector3(...layout.lookAt),
      };
      isFirstMount.current = false;
      prevId.current = activeId;
      return;
    }

    waypointQueue.current = getWaypoints(prevId.current, activeId);
    prevId.current = activeId;
  }, [activeId]);

  useFrame((_, delta) => {
    const speed = 20; // units per second

    // Advance to next waypoint when close enough
    if (waypointQueue.current.length > 0) {
      const next = waypointQueue.current[0];
      const distCam = camera.position.distanceTo(next.camPos);
      if (distCam < 0.05) {
        waypointQueue.current.shift();
        currentTarget.current = waypointQueue.current[0] ?? next;
      } else {
        currentTarget.current = next;
      }
    }

    const step = speed * delta;
    const { camPos, lookAt } = currentTarget.current;

    // Move fixed distance per frame (linear)
    if (camera.position.distanceTo(camPos) > 0.01) {
      camera.position.lerp(
        camPos,
        Math.min(step / camera.position.distanceTo(camPos), 1),
      );
    }
    if (orbitRef.current) {
      const tgt = orbitRef.current.target;
      if (tgt.distanceTo(lookAt) > 0.01) {
        tgt.lerp(lookAt, Math.min(step / tgt.distanceTo(lookAt), 1));
      }
      orbitRef.current.update();
    }
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.5} />
      {/* scattered — below, rotated to face camera looking down */}
      <group position={LAYOUTS[0].position} rotation={[-Math.PI / 2, 0, 0]}>
        <ScatteredLayout
          scatteredWords={SCATTERED_WORDS}
          wordCount={35}
          opacity={0.75}
          spreadRadiusX={22}
          spreadRadiusY={18}
          spreadRadiusZ={8}
        />
      </group>
      {/* clouds — above, rotated to face camera looking up */}
      <group position={LAYOUTS[1].position} rotation={[Math.PI / 2, 0, 0]}>
        <CloudsLayout cloudData={CLOUD_DATA} opacity={0.85} />
      </group>
      {/* tunnel — center, no rotation */}
      <group position={LAYOUTS[2].position}>
        <TunnelLayout
          frozenInsights={INSIGHTS}
          opacity={0.9}
          spacing={4.5}
          baseRadius={6.5}
        />
      </group>
    </>
  );
}

export { LAYOUTS };

export default function ConstellationCanvas({ activeId }) {
  const orbitRef = useRef();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{ clearColor: "#000000" }}
        style={{ display: "block" }}
      >
        <OrbitControls
          ref={orbitRef}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
        <Scene activeId={activeId} orbitRef={orbitRef} />
      </Canvas>
    </div>
  );
}
