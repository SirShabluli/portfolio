# Portfolio Embed — Handoff for Claude Code

This document tells you exactly what to copy from the `socialSimulation` project into a Next.js portfolio site to embed three interactive 3D canvas demos: **ambient background**, **scattered layout**, **clouds layout**, and **tunnel layout**.

---

## Source project

- Framework: Vite + React 19
- 3D: Three.js `^0.176.0`, `@react-three/fiber ^9.1.2`, `@react-three/drei ^10.0.7`
- Post-processing: `@react-three/postprocessing ^3.0.4`

---

## Step 1 — Install dependencies in the portfolio project

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing
```

---

## Step 2 — Copy these files exactly

The source project lives at `/Users/e.m/Documents/socialSimulation/` on this machine.

Run these commands from the root of the portfolio project to copy everything in one go:

```bash
mkdir -p components/simulation/demos
mkdir -p public/fonts

cp /Users/e.m/Documents/socialSimulation/src/components/effects/UnifiedBackground.jsx components/simulation/UnifiedBackground.jsx
cp /Users/e.m/Documents/socialSimulation/src/components/Layouts/ScatteredLayout.jsx components/simulation/ScatteredLayout.jsx
cp /Users/e.m/Documents/socialSimulation/src/components/Layouts/CloudsLayout.jsx components/simulation/CloudsLayout.jsx
cp /Users/e.m/Documents/socialSimulation/src/components/Layouts/TunnelLayout.jsx components/simulation/TunnelLayout.jsx
cp /Users/e.m/Documents/socialSimulation/src/components/text/EntityCloud.jsx components/simulation/EntityCloud.jsx
cp /Users/e.m/Documents/socialSimulation/src/components/text/CircularText.jsx components/simulation/CircularText.jsx
cp /Users/e.m/Documents/socialSimulation/src/components/compositions/GridLayout/GridContainer.jsx components/simulation/GridContainer.jsx
cp /Users/e.m/Documents/socialSimulation/src/components/compositions/GridLayout/GridItem.jsx components/simulation/GridItem.jsx
cp /Users/e.m/Documents/socialSimulation/src/constants/fonts.js components/simulation/fonts.js

cp /Users/e.m/Documents/socialSimulation/public/fonts/Masada-Bold.otf public/fonts/
cp /Users/e.m/Documents/socialSimulation/public/fonts/Masada-Book.otf public/fonts/
cp /Users/e.m/Documents/socialSimulation/public/fonts/NarkissYairMono-Regular.otf public/fonts/
```

---

## Step 3 — Fix import paths

After copying, update the relative imports inside each file:

**ScatteredLayout.jsx** — change:
```js
import GridContainer from "../compositions/GridLayout/GridContainer";
import GridItem from "../compositions/GridLayout/GridItem";
import { getFont } from "../../constants/fonts";
```
to:
```js
import GridContainer from "./GridContainer";
import GridItem from "./GridItem";
import { getFont } from "./fonts";
```

**CloudsLayout.jsx** — change:
```js
import { getFont } from "../../constants/fonts";
import EntityCloud from "../text/EntityCloud";
import GridContainer from "../compositions/GridLayout/GridContainer";
```
to:
```js
import { getFont } from "./fonts";
import EntityCloud from "./EntityCloud";
import GridContainer from "./GridContainer";
```

**TunnelLayout.jsx** — change:
```js
import CircularText from "../text/CircularText";
import GridContainer from "../compositions/GridLayout/GridContainer";
import { getFont } from "../../constants/fonts";
```
to:
```js
import CircularText from "./CircularText";
import GridContainer from "./GridContainer";
import { getFont } from "./fonts";
```

**EntityCloud.jsx** — change:
```js
import { getFont } from "../../constants/fonts";
```
to:
```js
import { getFont } from "./fonts";
```

**CircularText.jsx** — change:
```js
import { getFont } from "../../constants/fonts";
```
to:
```js
import { getFont } from "./fonts";
```

---

## Step 4 — Font files

Already handled by the `cp` commands in Step 2. The `fonts.js` file references them as `/fonts/Masada-Bold.otf` — Next.js serves `public/` at the root, so this works as-is.

---

## Step 5 — Create the showcase component

Create `components/simulation/SimulationShowcase.jsx` with this structure. Each section has a Canvas with a layout + ambient background, and an HTML overlay for explanation text.

```jsx
"use client"; // Next.js — needed for R3F

import dynamic from "next/dynamic";

// Lazy load to avoid SSR issues and improve page performance
const AmbientDemo = dynamic(() => import("./demos/AmbientDemo"), { ssr: false });
const ScatteredDemo = dynamic(() => import("./demos/ScatteredDemo"), { ssr: false });
const CloudsDemo = dynamic(() => import("./demos/CloudsDemo"), { ssr: false });
const TunnelDemo = dynamic(() => import("./demos/TunnelDemo"), { ssr: false });

export default function SimulationShowcase() {
  return (
    <section>
      <AmbientDemo />
      <ScatteredDemo />
      <CloudsDemo />
      <TunnelDemo />
    </section>
  );
}
```

---

## Step 6 — Create each demo file

### `components/simulation/demos/AmbientDemo.jsx`

Shows the ambient background cycling through themes. The background is a custom GLSL shader rendered on a sphere from the inside (THREE.BackSide). It takes topColor / middleColor / bottomColor / intensity / speed props and smoothly transitions between them.

```jsx
"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import UnifiedBackground from "../UnifiedBackground";

const presets = {
  night:      { topColor: "#0b1d3a", middleColor: "#102e4a", bottomColor: "#071829", intensity: 0.1, speed: 0.03 },
  rain:       { topColor: "#3d5f87", middleColor: "#5d8ab6", bottomColor: "#2e4d6e", intensity: 0.3, speed: 0.03 },
  fire:       { topColor: "#c31432", middleColor: "#660000", bottomColor: "#000000", intensity: 0.3, speed: 0.03 },
  underwater: { topColor: "#162744", middleColor: "#1a3561", bottomColor: "#11203a", intensity: 0.7, speed: 0.03 },
  dream:      { topColor: "#2a1440", middleColor: "#522a78", bottomColor: "#8162a8", intensity: 0.65, speed: 0.03 },
};

export default function AmbientDemo() {
  const [active, setActive] = useState("night");
  const current = presets[active];

  return (
    <div style={{ position: "relative", height: "480px", background: "#000" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <UnifiedBackground
          {...current}
          enableTransitions
          transitionDuration={1.0}
          transitionEasing="easeInOutCubic"
        />
      </Canvas>

      {/* Theme switcher buttons */}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
        {Object.keys(presets).map((name) => (
          <button key={name} onClick={() => setActive(name)}
            style={{ padding: "6px 14px", background: active === name ? "#fff" : "rgba(255,255,255,0.15)", color: active === name ? "#000" : "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
            {name}
          </button>
        ))}
      </div>

      {/* Description overlay */}
      <div style={{ position: "absolute", top: 24, left: 24, color: "#fff", maxWidth: 320 }}>
        <h3>Ambient System</h3>
        <p>Five atmospheric themes — night, rain, fire, underwater, dream — each with its own GLSL wave shader, color palette, and smooth transition. In the live app, themes change automatically based on the emotional tone of what the user types.</p>
      </div>
    </div>
  );
}
```

---

### `components/simulation/demos/ScatteredDemo.jsx`

Words float in 3D space with pulsing opacity. This layout receives an array of words and scatters them across a sphere with random positions, sizes, and opacity animation offsets.

```jsx
"use client";
import { Canvas } from "@react-three/fiber";
import UnifiedBackground from "../UnifiedBackground";
import ScatteredLayout from "../ScatteredLayout";

const words = ["memory", "doubt", "noise", "signal", "body", "absence", "pattern", "trace", "echo", "weight"];

export default function ScatteredDemo() {
  return (
    <div style={{ position: "relative", height: "480px" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <UnifiedBackground topColor="#0b1d3a" middleColor="#102e4a" bottomColor="#071829" intensity={0.1} speed={0.03} />
        <ScatteredLayout
          scatteredWords={words}
          wordCount={40}
          opacity={0.7}
          spreadRadiusX={25}
          spreadRadiusY={20}
          spreadRadiusZ={10}
        />
      </Canvas>

      <div style={{ position: "absolute", top: 24, left: 24, color: "#fff", maxWidth: 320 }}>
        <h3>Scattered Layout</h3>
        <p>Key words extracted from the user's text are scattered across 3D space. Each word pulses independently with sine-wave opacity. This layout represents the raw, unorganized emotional content before the AI processes it.</p>
      </div>
    </div>
  );
}
```

---

### `components/simulation/demos/CloudsDemo.jsx`

Words group into semantic clouds — each cloud has a center entity with satellite words floating around it in an elliptical pattern.

```jsx
"use client";
import { Canvas } from "@react-three/fiber";
import UnifiedBackground from "../UnifiedBackground";
import CloudsLayout from "../CloudsLayout";

const cloudData = [
  { centerEntity: "anxiety",  emotionWords: ["tension", "pressure", "rush", "freeze", "loop"] },
  { centerEntity: "calm",     emotionWords: ["breath", "open", "slow", "ground", "quiet"] },
  { centerEntity: "memory",   emotionWords: ["return", "fragment", "blur", "before", "lost"] },
];

export default function CloudsDemo() {
  return (
    <div style={{ position: "relative", height: "480px" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <UnifiedBackground topColor="#2a1440" middleColor="#522a78" bottomColor="#8162a8" intensity={0.65} speed={0.03} />
        <CloudsLayout cloudData={cloudData} opacity={0.85} />
      </Canvas>

      <div style={{ position: "absolute", top: 24, left: 24, color: "#fff", maxWidth: 320 }}>
        <h3>Entity Clouds</h3>
        <p>After AI analysis, related words cluster into semantic clouds. Each cloud has a central concept with satellite words orbiting it. Multiple clouds appear side-by-side to show emotional themes in parallel.</p>
      </div>
    </div>
  );
}
```

---

### `components/simulation/demos/TunnelDemo.jsx`

Sentences or insights are placed on rotating circles receding into the Z axis — forming a tunnel you look through.

```jsx
"use client";
import { Canvas } from "@react-three/fiber";
import UnifiedBackground from "../UnifiedBackground";
import TunnelLayout from "../TunnelLayout";

const insights = [
  "the pattern repeats itself",
  "beneath the surface there is more",
  "a question that keeps returning",
  "something left unsaid",
  "the body remembers what the mind forgets",
];

export default function TunnelDemo() {
  return (
    <div style={{ position: "relative", height: "480px" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <UnifiedBackground topColor="#c31432" middleColor="#660000" bottomColor="#000000" intensity={0.3} speed={0.03} />
        <TunnelLayout frozenInsights={insights} opacity={0.9} spacing={4.5} baseRadius={6.5} />
      </Canvas>

      <div style={{ position: "absolute", top: 24, left: 24, color: "#fff", maxWidth: 320 }}>
        <h3>Tunnel Layout</h3>
        <p>Key insights extracted by the AI are arranged as circular text rings receding into depth. Longer texts get larger rings. The tunnel creates a sense of depth and layering — as if looking through accumulated thoughts.</p>
      </div>
    </div>
  );
}
```

---

## Keyboard Key UI Style

Use this spec to recreate the keyboard key indicators in the portfolio. No component to copy — build them with plain HTML/CSS.

### Base style (all keys)

```css
background: rgba(0, 0, 0, 0.2);
border: 2px solid #ffffff;
border-radius: 8px;
color: #ffffff;
font-family: 'NarkissYairMono-Regular', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
opacity: 1.0;
display: flex;
align-items: center;
justify-content: center;
user-select: none;
cursor: default;
```

### Sizes

| Name | Width | Height | Font size | Padding |
|---|---|---|---|---|
| small | 3.5rem | 1.8rem | 12px | 3px |
| medium | 4.5rem | 2.5rem | 16px | 8px |
| square | 4rem | 4rem | 16px | 8px |
| large | 8rem | 4rem | 20px | 6px |

### Label text (above or below key)

```css
font-family: 'NarkissYairMono-Regular', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-weight: 400;
font-size: 16px;  /* matches the key's font size */
color: #ffffff;
text-align: center;
white-space: nowrap;
line-height: 1.1;
margin-top: 5px;   /* bottom label */
margin-bottom: 5px; /* top label */
```

### Reusable React component to create inline

```jsx
function KeyCap({ label, topText, bottomText, size = "medium" }) {
  const sizes = {
    small:  { width: "3.5rem", height: "1.8rem", fontSize: "12px", padding: "3px" },
    medium: { width: "4.5rem", height: "2.5rem", fontSize: "16px", padding: "8px" },
    square: { width: "4rem",   height: "4rem",   fontSize: "16px", padding: "8px" },
    large:  { width: "8rem",   height: "4rem",   fontSize: "20px", padding: "6px" },
  };
  const s = sizes[size];
  const labelStyle = {
    fontFamily: "'NarkissYairMono-Regular', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: s.fontSize,
    color: "#ffffff",
    textAlign: "center",
    whiteSpace: "nowrap",
    lineHeight: 1.1,
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {topText && <div style={{ ...labelStyle, marginBottom: "5px" }}>{topText}</div>}
      <div style={{
        width: s.width, height: s.height, padding: s.padding,
        background: "rgba(0,0,0,0.2)",
        border: "2px solid #ffffff",
        borderRadius: "8px",
        color: "#ffffff",
        fontFamily: "'NarkissYairMono-Regular', 'Segoe UI', sans-serif",
        fontSize: s.fontSize,
        display: "flex", alignItems: "center", justifyContent: "center",
        userSelect: "none",
      }}>
        {label}
      </div>
      {bottomText && <div style={{ ...labelStyle, marginTop: "5px" }}>{bottomText}</div>}
    </div>
  );
}
```

### Usage examples

```jsx
<KeyCap label="Esc" size="large" bottomText="explore" />
<KeyCap label="Tab" size="large" bottomText="select word" />
<KeyCap label="Enter" size="large" bottomText="read note" />
<KeyCap label="W" size="medium" topText="forward" />
<KeyCap label="S" size="medium" bottomText="backwards" />
<KeyCap label="↑" size="medium" />
<KeyCap label="↓" size="medium" />
<KeyCap label="←" size="medium" />
<KeyCap label="→" size="medium" />
<KeyCap label="F1" size="square" bottomText="theme" />
```

### Arrow cluster layout

```jsx
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
  <KeyCap label="↑" size="medium" />
  <div style={{ display: "flex", gap: "8px" }}>
    <KeyCap label="←" size="medium" />
    <KeyCap label="↓" size="medium" />
    <KeyCap label="→" size="medium" />
  </div>
  <div style={{ color: "#fff", fontSize: "20px", fontFamily: "'NarkissYairMono-Regular', sans-serif", fontWeight: 400 }}>
    explore
  </div>
</div>
```

### Font loading in Next.js

Add to `app/layout.js` or global CSS:

```css
@font-face {
  font-family: 'NarkissYairMono-Regular';
  src: url('/fonts/NarkissYairMono-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}
```

---

## Multi-Layout Canvas with Camera Navigation

One single Canvas containing all 3 layouts placed at different X positions. A button bar lets the visitor fly the camera between them. This is the recommended approach — one WebGL context, lightest possible, most impressive.

### Also copy this file

```bash
cp /Users/e.m/Documents/socialSimulation/src/utils/cameraAnimations.js components/simulation/cameraAnimations.js
```

No import path changes needed — it only imports from `three`.

---

### How it works

```
3D world:
  x = -20  →  ScatteredLayout
  x =   0  →  CloudsLayout      ← camera starts here
  x =  20  →  TunnelLayout

Camera position: [activeX, 0, 12]
Camera looks at: [activeX, 0, 0]

On button click → animateToPosition() lerps camera smoothly over 1.5s
Background shader transitions its colors at the same time
```

---

### Create `components/simulation/ConstellationCanvas.jsx`

```jsx
"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import UnifiedBackground from "./UnifiedBackground";
import ScatteredLayout from "./ScatteredLayout";
import CloudsLayout from "./CloudsLayout";
import TunnelLayout from "./TunnelLayout";
import { animateToPosition } from "./cameraAnimations";

// ── data ──────────────────────────────────────────────────────────────────────

const LAYOUTS = [
  {
    id: "scattered",
    label: "Scattered",
    position: [-20, 0, 0],
    description: "Words extracted from the user's text scatter across 3D space. Each word pulses with its own sine-wave opacity rhythm, representing raw unprocessed emotional content before AI analysis.",
    background: { topColor: "#0b1d3a", middleColor: "#102e4a", bottomColor: "#071829", intensity: 0.1, speed: 0.03 },
  },
  {
    id: "clouds",
    label: "Entity Clouds",
    position: [0, 0, 0],
    description: "After AI analysis, semantically related words cluster into floating clouds. Each cloud has a central concept with satellite words orbiting it — showing emotional themes side by side.",
    background: { topColor: "#2a1440", middleColor: "#522a78", bottomColor: "#8162a8", intensity: 0.65, speed: 0.03 },
  },
  {
    id: "tunnel",
    label: "Tunnel",
    position: [20, 0, 0],
    description: "Key insights are placed on rotating circular rings receding into depth. Longer texts get larger rings. Looking through the tunnel gives a sense of accumulated layered thought.",
    background: { topColor: "#c31432", middleColor: "#660000", bottomColor: "#000000", intensity: 0.3, speed: 0.03 },
  },
];

const SCATTERED_WORDS = ["memory", "doubt", "noise", "signal", "body", "absence", "pattern", "trace", "echo", "weight"];
const CLOUD_DATA = [
  { centerEntity: "anxiety",  emotionWords: ["tension", "pressure", "rush", "freeze", "loop"] },
  { centerEntity: "calm",     emotionWords: ["breath", "open", "slow", "ground", "quiet"] },
  { centerEntity: "memory",   emotionWords: ["return", "fragment", "blur", "before", "lost"] },
];
const INSIGHTS = [
  "the pattern repeats itself",
  "beneath the surface there is more",
  "a question that keeps returning",
  "something left unsaid",
  "the body remembers what the mind forgets",
];

// ── inner scene (must be inside <Canvas>) ─────────────────────────────────────

function Scene({ activeId, orbitRef, background }) {
  const { camera } = useThree();
  const isFirstMount = useRef(true);

  useEffect(() => {
    const target = LAYOUTS.find(l => l.id === activeId);
    if (!target) return;

    const [tx, ty, tz] = target.position;

    if (isFirstMount.current) {
      // snap on first load, no animation
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
      [tx, ty, tz + 12],  // camera position
      [tx, ty, tz],        // look at
      () => {}
    );
  }, [activeId]);

  return (
    <>
      <UnifiedBackground
        {...background}
        enableTransitions
        transitionDuration={1.0}
        transitionEasing="easeInOutCubic"
      />
      <ambientLight intensity={0.5} />

      <group position={LAYOUTS[0].position}>
        <ScatteredLayout scatteredWords={SCATTERED_WORDS} wordCount={35} opacity={0.75} spreadRadiusX={22} spreadRadiusY={18} spreadRadiusZ={8} />
      </group>

      <group position={LAYOUTS[1].position}>
        <CloudsLayout cloudData={CLOUD_DATA} opacity={0.85} />
      </group>

      <group position={LAYOUTS[2].position}>
        <TunnelLayout frozenInsights={INSIGHTS} opacity={0.9} spacing={4.5} baseRadius={6.5} />
      </group>
    </>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

export default function ConstellationCanvas() {
  const [activeId, setActiveId] = useState("clouds");
  const orbitRef = useRef();
  const activeLayout = LAYOUTS.find(l => l.id === activeId);

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>

      {/* Canvas */}
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <OrbitControls
          ref={orbitRef}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
        <Scene activeId={activeId} orbitRef={orbitRef} background={activeLayout.background} />
      </Canvas>

      {/* Description — top left */}
      <div style={{
        position: "absolute", top: 32, left: 32,
        color: "#fff", maxWidth: 280, pointerEvents: "none",
      }}>
        <p style={{
          fontFamily: "'NarkissYairMono-Regular', 'Segoe UI', sans-serif",
          fontSize: "14px", fontWeight: 400, lineHeight: 1.6,
          opacity: 0.85, margin: 0,
          transition: "opacity 0.4s",
        }}>
          {activeLayout.description}
        </p>
      </div>

      {/* Nav buttons — bottom center */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: "12px",
      }}>
        {LAYOUTS.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveId(l.id)}
            style={{
              padding: "8px 20px",
              fontFamily: "'NarkissYairMono-Regular', 'Segoe UI', sans-serif",
              fontSize: "14px",
              background: activeId === l.id ? "#ffffff" : "rgba(255,255,255,0.12)",
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
```

---

### Add to your portfolio page

In whatever page/component you want to show it:

```jsx
import dynamic from "next/dynamic";

const ConstellationCanvas = dynamic(
  () => import("@/components/simulation/ConstellationCanvas"),
  { ssr: false }
);

export default function ProjectPage() {
  return (
    <main>
      {/* ... other content ... */}
      <ConstellationCanvas />
      {/* ... */}
    </main>
  );
}
```

The `ssr: false` is required — R3F and Three.js cannot run during server-side rendering.

---

## Important notes for Claude Code

1. **SSR**: All canvas components must have `"use client"` at the top, or be loaded with `dynamic(..., { ssr: false })`. R3F cannot run on the server.

2. **Font paths**: `getFont()` returns paths like `/fonts/Masada-Bold.otf`. These are served from `public/fonts/`. The `@react-three/drei` `<Text>` component fetches them at runtime via HTTP. Make sure Next.js is serving the public folder (it does by default).

3. **GridContainer needs Canvas context**: `GridContainer` uses `useThree()` from R3F — it must always be rendered as a descendant of `<Canvas>`. Never render it outside a Canvas.

4. **No contexts needed**: These layout components are self-contained. They do NOT need BackgroundContext, AudioContext, SessionDataContext, CameraContext, CompositionsContext, or any other context from the source project.

5. **No Supabase, no AI, no routing**: None of these demos need backend services.

6. **Performance**: Each Canvas is an independent WebGL context. Don't render more than 3–4 on screen at the same time. Use Intersection Observer or Next.js `dynamic` to mount/unmount canvases as the user scrolls to each section.

7. **Hebrew text**: The font files (Masada) support Hebrew. If you pass Hebrew strings to ScatteredLayout, CloudsLayout, or TunnelLayout they will render correctly. CircularText auto-detects Hebrew and reverses letter order accordingly.

8. **Versions**: The source project uses `three ^0.176.0` and `@react-three/fiber ^9.1.2`. Use matching or newer versions in the portfolio. Do not mix R3F v8 with Three.js v0.176 — they are incompatible.
