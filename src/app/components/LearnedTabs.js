"use client";
import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import ClickToPlay from "./ClickToPlay";
import Image from "next/image";

const TABS = [
  {
    id: "pressure",
    label: "Building Under Pressure",
    quote: "100 Days",
    content:
      "Pressure reveals what matters. When time is scarce, you stop second-guessing and start deciding. I learned to trust intuition, cut features ruthlessly, and ship quick solutions that worked.",
  },
  {
    id: "technical",
    label: "Technical Challenges",
    content:
      "No Claude Code meant I had to understand my own architecture deeply — tracking every component manually forced clarity. Some concepts, like 3D movement, can't be explained — only shown. I learned to prototype rough, iterate fast, and read tiny reactions.",
    image: "/images/pagmar/exportcode.jpg",
  },
  {
    id: "guides",
    label: "Proper Guiding",
    content:
      "No-mouse navigation (from gaming) confused older users but younger ones adapted quickly. Complex systems need explicit guides — you can't expect people to figure it out. Playtesting taught me: stop and explain directly.",
    video: "/videos/pagmar/modalsshort.mp4",
  },
];

export default function LearnedTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const activeTab = TABS.find((t) => t.id === active);
  const [count, setCount] = useState(100);
  const rafRef = useRef(null);
  const countRef = useRef(100);
  const lastTickRef = useRef(null);

  useEffect(() => {
    if (active !== "pressure") return;
    countRef.current = 30;
    lastTickRef.current = null;
    setCount(30);

    function tick(timestamp) {
      if (!lastTickRef.current) lastTickRef.current = timestamp;
      const elapsed = timestamp - lastTickRef.current;
      if (elapsed >= 1400) {
        // matches heartbeat animation duration
        lastTickRef.current = timestamp;
        countRef.current -= 1;
        if (countRef.current <= 0) countRef.current = 30;
        setCount(countRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Media frame — fixed aspect ratio so all tabs share same height */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-9 aspect-video rounded-sm overflow-hidden relative"
          style={activeTab.video ? { border: "0.5px solid rgba(255,255,255,0.2)" } : {}}
        >
          {activeTab.quote && (
            <p className="heartbeat absolute inset-0 flex items-center justify-center text-9xl font-bold opacity-60">
              {count} Days
            </p>
          )}
          {activeTab.image && (
            <Image
              src={activeTab.image}
              alt=""
              fill
              className="object-contain"
            />
          )}
          {activeTab.video && (
            <ClickToPlay
              src={activeTab.video}
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            />
          )}
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-12">
        <p className="col-span-12 lg:col-span-9 text-sm font-medium leading-[160%] opacity-80 min-h-20">
          {activeTab.content}
        </p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-9 flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              variant={active === tab.id ? "filled" : "outline"}
              color="white"
              size="small"
              onClick={() => setActive(tab.id)}
              style={active === tab.id ? { color: "black" } : {}}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
