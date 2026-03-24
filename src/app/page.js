"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Button from "./components/Button";

const SLIDES = [
  {
    bg: "#1a1a2e",
    image: "/images/netflix-dating/NetflixLogo.svg",
    imageClass: "px-5 w-full h-auto mb-0", // per-slide image styling
    title: "Dating",
    titleClass: "text-red-500 -mt-5", // per-slide title color/style
    description:
      "Illustration concept for a dating app where taste in shows becomes personality.",
    role: "UI Design & Illustration",
    year: "2025",
    skills: "Adobe Illustrator - Figma - Illustration",
  },
  {
    bg: "#16213e",
    image: null,
    imageClass: "",
    title: "I'll Think About it Later",
    titleClass: "",
    description:
      "Non-linear journaling tool powered by AI. Your thoughts become an explorable 3D world.",
    role: "Research, Design & Fullstack Development",
    year: "2025",
    skills: "ReactJs - Three.js - AI Integration - UX Research",
  },
  {
    bg: "#0f3460",
    image: null,
    imageClass: "",
    title: "MEN'S TOILET",
    titleClass: "",
    description:
      "Web game teaching bathroom etiquette with humor, code, and interactive challenges.",
    role: "Design & Frontend Development",
    year: "2024",
    skills: "Adobe Illustrator - Figma - HTML - CSS - Javascript",
  },
  {
    bg: "#533483",
    image: null,
    imageClass: "",
    title: "Vegas Therapy",
    titleClass: "",
    description:
      "Illustration concept for a dating app where taste in shows becomes personality.",
    role: "Adobe Illustrator - Figma - Illustration",
    year: "2025",
    skills: "Adobe Illustrator - Figma - Illustration",
  },
];

// Tape: [clone of last, ...real slides, clone of first]
// Real slides start at index 1
const TAPE = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

export default function Home() {
  // offset starts at 1 (first real slide)
  const [offset, setOffset] = useState(1);
  const [animated, setAnimated] = useState(true);
  const dragStartY = useRef(null);
  const isTransitioning = useRef(false);

  // real slide index for content (offset 1 = slide 0)
  const current = (offset - 1 + SLIDES.length) % SLIDES.length;

  const goTo = useCallback((newOffset) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimated(true);
    setOffset(newOffset);
  }, []);

  const next = useCallback(() => goTo(offset + 1), [offset, goTo]);
  const prev = useCallback(() => goTo(offset - 1), [offset, goTo]);

  // After transition ends, snap silently if on a clone
  const onTransitionEnd = () => {
    isTransitioning.current = false;
    if (offset === 0) {
      // was on clone-of-last, snap to real last
      setAnimated(false);
      setOffset(SLIDES.length);
    } else if (offset === TAPE.length - 1) {
      // was on clone-of-first, snap to real first
      setAnimated(false);
      setOffset(1);
    }
  };

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
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white select-none">
      {/* Vertical sliding carousel — drag target */}
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {TAPE.map((slide, i) => (
          <div
            key={i}
            onTransitionEnd={i === offset ? onTransitionEnd : undefined}
            className="absolute inset-0"
            style={{
              backgroundColor: slide.bg,
              transform: `translateY(${(i - offset) * 100}%)`,
              transition: animated ? "transform 700ms ease-in-out" : "none",
            }}
          />
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
          <span className="text-lg font-bold uppercase">Eyal Mordechai</span>
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
            onClick={() => {
              setAnimated(true);
              setOffset(i + 1);
            }}
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
        {SLIDES[current].image && (
          <Image
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            width={600}
            height={600}
            className={SLIDES[current].imageClass}
          />
        )}
        <h1
          className={`w-full text-5xl font-medium flex justify-center leading-[1.1] ${SLIDES[current].titleClass}`}
        >
          {SLIDES[current].title}
        </h1>
        <p className="font-sm opacity-80 max-w-xs font-medium leading-[140%] w-full">
          {SLIDES[current].description}
        </p>
        <div className="flex flex-col px-5 gap-2 text-white w-full">
          <div className="flex flex-row justify-start gap-2.5">
            <span className="text-xs font-medium italic opacity-40">Role</span>
            <span className="text-xs font-medium opacity-80">
              {SLIDES[current].role}
            </span>
          </div>
          <div className="flex justify-start flex-row gap-2.5">
            <span className="text-xs font-medium italic opacity-40">Year</span>
            <span className="text-xs font-medium opacity-80">
              {SLIDES[current].year}
            </span>
          </div>
          <div className="flex justify-start flex-row gap-2.5">
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
