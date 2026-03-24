"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Button from "./components/Button";
import gsap from "gsap";

const SLIDES = [
  {
    bg: "#000000",
    bgImage: "/images/netflix-dating/pajamaGrid.png",
    image: "/images/netflix-dating/NetflixLogo.svg",
    imageClass: "px-5 w-full h-auto mb-0",
    title: "Dating",
    titleClass: "text-red-500 -mt-5",
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
    image: "/images/vegas/vegassign.svg",
    imageClass: "w-full h-auto",
    imageStyle: { height: "220px", objectFit: "contain" },
    title: "Therapy",
    titleClass: "",
    description:
      "Illustration concept for a dating app where taste in shows becomes personality.",
    role: "Adobe Illustrator - Figma - Illustration",
    year: "2025",
    skills: "Adobe Illustrator - Figma - Illustration",
  },
];

// Tape: [clone of last, ...real slides, clone of first]
const TAPE = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

export default function Home() {
  const [offset, setOffset] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [current, setCurrent] = useState(0);
  const dragStartY = useRef(null);
  const isTransitioning = useRef(false);
  const contentRef = useRef(null);
  const directionRef = useRef(1); // 1 = going next (up), -1 = going prev (down)

  const goTo = useCallback((newOffset, dir) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    directionRef.current = dir;

    // Exit animation
    gsap.to(contentRef.current, {
      y: dir * -30,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Update content mid-transition
        const newCurrent = ((newOffset - 1) % SLIDES.length + SLIDES.length) % SLIDES.length;
        setCurrent(newCurrent);
        // Reset position for enter
        gsap.set(contentRef.current, { y: dir * 30, opacity: 0 });
        // Enter animation
        gsap.to(contentRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      },
    });

    setAnimated(true);
    setOffset(newOffset);
  }, []);

  const next = useCallback(() => goTo(offset + 1, 1), [offset, goTo]);
  const prev = useCallback(() => goTo(offset - 1, -1), [offset, goTo]);

  const onTransitionEnd = () => {
    isTransitioning.current = false;
    if (offset === 0) {
      setAnimated(false);
      setOffset(SLIDES.length);
    } else if (offset === TAPE.length - 1) {
      setAnimated(false);
      setOffset(1);
    }
  };

  const onTouchStart = (e) => { dragStartY.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (dragStartY.current === null) return;
    const delta = dragStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    dragStartY.current = null;
  };
  const onMouseDown = (e) => { dragStartY.current = e.clientY; };
  const onMouseUp = (e) => {
    if (dragStartY.current === null) return;
    const delta = dragStartY.current - e.clientY;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    dragStartY.current = null;
  };

  const slide = SLIDES[current];

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
        {TAPE.map((s, i) => (
          <div
            key={i}
            onTransitionEnd={i === offset ? onTransitionEnd : undefined}
            className="absolute inset-0"
            style={{
              backgroundColor: s.bg,
              transform: `translateY(${(i - offset) * 100}%)`,
              transition: animated ? "transform 700ms ease-in-out" : "none",
            }}
          >
            {s.bgImage && (
              <Image
                src={s.bgImage}
                alt=""
                fill
                className="object-cover opacity-10 pointer-events-none"
              />
            )}
          </div>
        ))}
      </div>

      {/* Top gradient + nav */}
      <div
        className="absolute top-0 left-0 right-0 z-10 px-6 pt-8 pb-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, black 0%, transparent 100%)" }}
      >
        <div className="flex items-center justify-between pointer-events-auto">
          <span className="text-lg font-bold uppercase">Eyal Mordechai</span>
          <button className="flex justify-center flex-col gap-1.5 cursor-pointer" aria-label="Menu">
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
              const dir = i > current ? 1 : -1;
              goTo(i + 1, dir);
            }}
            className="w-0.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              height: i === current ? "1.5rem" : "0.5rem",
              backgroundColor: i === current ? "white" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Bottom content — animated via GSAP */}
      <div
        ref={contentRef}
        className="absolute bottom-20 left-0 right-0 z-20 px-6 flex flex-col items-center gap-7 pointer-events-none"
      >
        {slide.image && (
          <Image
            src={slide.image}
            alt={slide.title}
            width={600}
            height={600}
            className={slide.imageClass}
            style={slide.imageStyle}
            priority
          />
        )}
        <h1 className={`w-full text-5xl font-medium flex justify-center leading-[1.1] ${slide.titleClass ?? ""}`}>
          {slide.title}
        </h1>
        <p className="text-sm opacity-80 font-medium leading-[140%] w-full">
          {slide.description}
        </p>
        <div className="flex flex-col px-5 gap-2 text-white w-full">
          <div className="flex flex-row justify-start gap-2.5">
            <span className="text-xs font-medium italic opacity-40">Role</span>
            <span className="text-xs font-medium opacity-80">{slide.role}</span>
          </div>
          <div className="flex flex-row justify-start gap-2.5">
            <span className="text-xs font-medium italic opacity-40">Year</span>
            <span className="text-xs font-medium opacity-80">{slide.year}</span>
          </div>
          <div className="flex flex-row justify-start gap-2.5">
            <span className="text-xs font-medium italic opacity-40">Skills</span>
            <span className="text-xs font-medium opacity-80">{slide.skills}</span>
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
