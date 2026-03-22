"use client";
import { useState } from "react";
import Button from "./Button";
import ClickToPlay from "./ClickToPlay";
import Image from "next/image";

const TABS = [
  {
    id: "pressure",
    label: "Building Under Pressure",
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

  return (
    <div className="w-full flex flex-col gap-14">
      <div className="flex flex-wrap gap-2">
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
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-x-3 gap-y-10 lg:min-h-80">
        <p className="col-span-4 lg:col-span-4 text-sm font-medium leading-[160%] opacity-80">
          {activeTab.content}
        </p>
        {activeTab.image && (
          <div
            className="col-span-4 lg:col-span-4 lg:col-start-1 rounded-sm overflow-hidden"
            style={{ border: "0.5px solid rgba(255,255,255,0.2)" }}
          >
            <Image
              src={activeTab.image}
              alt=""
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        )}
        {activeTab.video && (
          <ClickToPlay
            src={activeTab.video}
            className="col-span-4 lg:col-span-7 lg:col-start-1 rounded-sm overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          />
        )}
      </div>
    </div>
  );
}
