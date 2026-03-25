"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Button from "./components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

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
    bg: "#23577A",
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

export default function Home() {
  const [current, setCurrent] = useState(0);
  const contentRef = useRef(null);

  const slide = SLIDES[current];

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white select-none">
      {/* Swiper carousel */}
      <Swiper
        modules={[Mousewheel]}
        direction="vertical"
        loop
        speed={500}
        touchRatio={1.5}
        mousewheel={{ sensitivity: 1 }}
        className="absolute inset-0 w-full h-full"
        onTouchEnd={(swiper) => swiper.slideToClosest()}
        onSlideChangeTransitionEnd={(swiper) => setCurrent(swiper.realIndex)}
      >
        {SLIDES.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-full" style={{ backgroundColor: s.bg }}>
              {s.bgImage && (
                <Image
                  src={s.bgImage}
                  alt=""
                  fill
                  className="object-cover opacity-100 pointer-events-none"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
        <h1
          className={`w-full text-5xl font-medium flex justify-center leading-[1.1] ${slide.titleClass ?? ""}`}
        >
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
            <span className="text-xs font-medium italic opacity-40">
              Skills
            </span>
            <span className="text-xs font-medium opacity-80">
              {slide.skills}
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
