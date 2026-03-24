"use client";
import { useState, useRef } from "react";
import Button from "./components/Button";

const SLIDES = [
  {
    bg: "#1a1a2e",
    title: "Netflix Dating",
    description:
      "Illustration concept for a dating app where taste in shows becomes personality.",
    role: "UI Design & Illustration",
    year: "2025",
    skills: "Adobe Illustrator - Figma - Illustration",
  },
  {
    bg: "#16213e",
    title: "I’ll Think About it Later",
    description:
      "Non-linear journaling tool powered by AI. Your thoughts become an explorable 3D world.",
    role: "Research, Design & Fullstack Development",
    year: "2025",
    skills: "ReactJs - Three.js - AI Integration - UX Research",
  },
  {
    bg: "#0f3460",
    title: "MEN’S TOILET",
    description:
      "Web game teaching bathroom etiquette with humor, code, and interactive challenges.",
    role: "Design & Frontend Development",
    year: "2024",
    skills: "Adobe Illustrator - Figma - HTML - CSS - Javascript",
  },
  {
    bg: "#533483",
    title: "Vegas Therapy",
    description:
      "Illustration concept for a dating app where taste in shows becomes personality.",
    role: "Adobe Illustrator - Figma - Illustration",
    year: "2025",
    skills: "Adobe Illustrator - Figma - Illustration",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const dragStartY = useRef(null);

  const prev = () => setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((i) => (i + 1) % SLIDES.length);

  const onTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (dragStartY.current === null) return;
    const delta = dragStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    dragStartY.current = null;
  };

  const onMouseDown = (e) => {
    dragStartY.current = e.clientY;
  };
  const onMouseUp = (e) => {
    if (dragStartY.current === null) return;
    const delta = dragStartY.current - e.clientY;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    dragStartY.current = null;
  };

  return (
    <main
      className="relative w-screen h-screen overflow-hidden bg-black text-white select-none cursor-grab active:cursor-grabbing"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {/* Vertical sliding carousel */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-transform duration-700 ease-in-out"
            style={{
              backgroundColor: slide.bg,
              transform: `translateY(${(i - current) * 100}%)`,
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white/10 text-4xl font-bold">
              {slide.label}
            </span>
          </div>
        ))}
      </div>

      {/* Top gradient + nav */}
      <div
        className="absolute top-0 left-0 right-0 z-10 px-6 pt-8 pb-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      >
        <div className="flex items-center justify-between pointer-events-auto">
          <span className="text-lg font-bold  uppercase">Eyal Mordechai</span>
          <button
            className="flex justify-center flex-col gap-1.5 cursor-pointer"
            aria-label="Menu"
          >
            <span className="block w-6 h-px bg-white" />
            <span className="block w-6 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
          </button>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pt-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, black 0%, transparent 100%)",
          paddingBottom: "80px",
        }}
      />

      {/* Vertical dots */}
      <div className="flex flex-col gap-1.5 absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-0.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              height: i === current ? "1.5rem" : "0.5rem",
              backgroundColor:
                i === current ? "white" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Bottom content — title, description, meta, button */}
      <div className="absolute bottom-20 left-0 right-0 z-20 px-6 flex flex-col items-center gap-7 pointer-events-none">
        <h1 className="w-full text-5xl font-medium leading-[1.1]">
          {SLIDES[current].title}
        </h1>
        <p className="font-sm opacity-80 max-w-xs leading-[140%] w-full">
          {SLIDES[current].description}
        </p>
        <div className="flex gap-6 text-white w-full">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium italic opacity-40">Role</span>
            <span className="text-xs font-medium opacity-80">
              {SLIDES[current].role}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium italic opacity-40">Year</span>
            <span className="text-xs font-medium opacity-80">
              {SLIDES[current].year}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium italic opacity-40">
              Skills
            </span>
            <span className="text-xs font-medium opacity-80">
              {SLIDES[current].skills}
            </span>
          </div>
        </div>
        <div className="mt-5 w-full flex justify-center pointer-events-auto">
          <Button
            variant="outline"
            color="white"
            size="small"
            className="text-base! font-medium"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            View Work
          </Button>
        </div>
      </div>
    </main>
  );
}
