"use client";
import { useState } from "react";
import Button from "./Button";

const TABS = [
  {
    id: "mouse",
    label: "Mouse Support",
    content: (
      <p className="col-span-4 lg:col-span-4 lg:col-start-1 text-sm font-medium leading-relaxed opacity-80">
        Mouse input would make the system accessible to a wider audience.
        Keyboard-only navigation comes from gaming—adding mouse opens it up. It
        also enables more complex menus and cleaner screens. As features grow,
        keyboard shortcuts become limiting. Mouse feels essential for continued
        development.
      </p>
    ),
  },
  {
    id: "vr",
    label: "VR Experience",
    content: (
      <p className="col-span-4 lg:col-span-4 lg:col-start-1 text-sm font-medium leading-relaxed opacity-80">
        There&apos;s massive potential in immersion. VR lets users step fully
        into their world—disconnecting from the outside to enter a trance-like
        state of writing, thinking, feeling. The question isn&apos;t if, but
        how: hand tracking, virtual keyboards, voice input—each worth exploring.
      </p>
    ),
  },
  {
    id: "search",
    label: "Organization & Search",
    content: (
      <p className="col-span-4 lg:col-span-4 lg:col-start-1 text-sm font-medium leading-relaxed opacity-80">
        Some users want structure. Chronological sorting, thematic clustering,
        keyword search—all valid. But the real potential is in AI-guided
        exploration: asking questions that surface insights from everything
        you&apos;ve written, spatial areas that reorganize around your query,
        letting you read past entries and discover answers yourself. Not
        input-output—guided reflection.
        <br />
        <br />
        The goal: stay in the world. Compositions rearrange, maybe in a long
        scroll, maybe side-by-side, maybe in a spatial area containing answers.
        The system helps you organize thoughts, not replace them.
      </p>
    ),
  },
  {
    id: "visual",
    label: "Visual & 3D Elements",
    content: (
      <p className="col-span-4 lg:col-span-4 lg:col-start-1 text-sm font-medium leading-relaxed opacity-80">
        As AI advances, generated images and 3D objects could appear in the
        space—mood boards, environmental elements that shift as you write,
        worlds that build around you over time. It&apos;s early to define
        specifics, but the direction is clear: make the experience more
        personal, immersive, emotional. Performance and execution need research,
        but the potential is there.
      </p>
    ),
  },
  {
    id: "therapy",
    label: "Therapeutic Use",
    content: (
      <p className="col-span-4 lg:col-span-4 lg:col-start-1 text-sm font-medium leading-relaxed opacity-80">
        Beyond personal use, there&apos;s potential as a therapeutic tool.
        Imagine shared access between therapist and patient—the therapist
        exploring the patient&apos;s spatial world, seeing patterns, avoided
        topics, emotional shifts that traditional notes can&apos;t capture. Not
        retelling—direct observation of the inner landscape.
      </p>
    ),
  },
];

export default function TabPages() {
  const [active, setActive] = useState(TABS[0].id);
  const activeTab = TABS.find((t) => t.id === active);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Tab bar */}
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

      {/* Content panel — 12-col grid */}
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-x-3 gap-y-8 w-full">
        {activeTab.content}
        <div className="col-span-4 lg:col-span-6 lg:col-start-6 aspect-video bg-white/5 rounded-sm" />
      </div>
    </div>
  );
}
