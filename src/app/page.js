"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Parallax } from "swiper/modules";
import "swiper/css";

const SLIDES = [
  {
    bg: "#000000",
    image: "/images/main/netflixSplash.png",
    imageClass: "w-full h-85 object-contain ",
    title: "",
    titleClass: "",
    description:
      "Illustration concept for a dating app where taste in shows becomes personality.",
    role: "UI Design & Illustration",
    year: "2025",
    skills: "Adobe Illustrator - Figma - Illustration",
    href: "/netflixdating",
  },
  {
    bg: "#16213e",
    bgVideo: "/videos/pagmar/pagmarportraitr.mp4",
    bgVideoFallback: "/images/pagmar/pagmarfallback.png",
    bgVignette:
      "radial-gradient(ellipse 100% 90% at 50% 30%, transparent 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.97) 100%)",
    image: null,
    imageClass: "",
    title: "I'll Think About it Later",
    titleClass: "",
    description:
      "Non-linear journaling tool powered by AI. Your thoughts become an explorable 3D world.",
    role: "Research, Design & Fullstack Development",
    year: "2025",
    skills: "ReactJs - Three.js - AI Integration - UX Research",
    href: "/pagmar",
  },
  {
    bg: "#ffffff",
    bgImage: "/images/main/toiletbg.png",
    bgImageOpacity: 1,
    image: null,
    imageClass: "",
    subtitle: "A Guide to Proper Etiquette in the",
    title: "MEN'S TOILET",
    titleClass: "text-center text-black text-8xl font-dokdo leading-[0.85]",
    description:
      "Web game teaching bathroom etiquette with humor, code, and interactive challenges.",
    descriptionClass: "text-black",
    metaClass: "text-black",
    buttonColor: "black",
    role: "Design & Frontend Development",
    year: "2024",
    skills: "Adobe Illustrator - Figma - HTML - CSS - Javascript",
    href: "/toilet",
  },
  {
    bg: "#23577A",
    image: "/images/main/vegasSplash.png",
    imageClass: "w-full h-85 object-contain ",
    title: "",
    titleClass: "",
    description:
      "Illustration concept for a dating app where taste in shows becomes personality.",
    role: "Adobe Illustrator - Figma - Illustration",
    year: "2025",
    skills: "Adobe Illustrator - Figma - Illustration",
    href: "/vegas",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  return (
    <main className="relative w-screen h-screen-dvh overflow-hidden bg-black text-white select-none">
      {/* Swiper carousel */}
      <Swiper
        modules={[Mousewheel, Parallax]}
        direction="vertical"
        loop
        spaceBetween={50}
        parallax
        speed={1200}
        touchRatio={1.5}
        longSwipesRatio={0.1}
        mousewheel={{ sensitivity: 1 }}
        className="absolute inset-0 w-full h-full"
        onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
        onSlideChangeTransitionEnd={(swiper) => setCurrent(swiper.realIndex)}
      >
        {SLIDES.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-full">
              <div
                className="w-full h-full overflow-hidden rounded-3xl"
                style={{ backgroundColor: s.bg }}
              >
                {s.bgImage && (
                  <Image
                    src={s.bgImage}
                    alt=""
                    fill
                    className="pointer-events-none"
                    style={{
                      opacity: s.bgImageOpacity ?? 0.15,
                      objectFit: "cover",
                    }}
                  />
                )}
                {s.bgVideo && (
                  <div className="absolute inset-0">
                    {s.bgVideoFallback && (
                      <Image
                        src={s.bgVideoFallback}
                        alt=""
                        fill
                        priority
                        className="object-cover pointer-events-none"
                      />
                    )}
                    <video
                      src={s.bgVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      poster={s.bgVideoFallback}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: s.bgVignette }}
                    />
                  </div>
                )}
                {/* Slide content */}
                <div className="absolute inset-0 top-16 bottom-10 z-20 flex flex-col px-6 pointer-events-none">
                  {/* Top: image fills remaining space */}
                  <div className="flex-1 flex items-center justify-center w-full min-h-0">
                    {s.image && (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        data-swiper-parallax-y="-120"
                        data-swiper-parallax-scale="0.85"
                        data-swiper-parallax-opacity="0"
                        data-swiper-parallax-duration="1400"
                      >
                        <Image
                          src={s.image}
                          alt={s.title}
                          width={600}
                          height={600}
                          className={s.imageClass}
                          style={s.imageStyle}
                          priority={i === 0}
                        />
                      </div>
                    )}
                  </div>
                  {/* Bottom: text content */}
                  <div className="flex flex-col items-center gap-7 w-full">
                    {s.subtitle && (
                      <p
                        data-swiper-parallax-x="-80"
                        data-swiper-parallax-y="-60"
                        data-swiper-parallax-opacity="0"
                        data-swiper-parallax-duration="1000"
                        className="w-full text-center text-black text-2xl"
                        style={{ fontFamily: "var(--font-reenie-beanie)" }}
                      >
                        {s.subtitle}
                      </p>
                    )}
                    <h1
                      data-swiper-parallax-x="-80"
                      data-swiper-parallax-y="-60"
                      data-swiper-parallax-opacity="0"
                      data-swiper-parallax-duration="1000"
                      className={`w-full text-5xl font-medium flex justify-center ${s.titleClass ?? ""}`}
                    >
                      {s.title}
                    </h1>
                    <p
                      data-swiper-parallax-y="-40"
                      data-swiper-parallax-opacity="0"
                      data-swiper-parallax-duration="800"
                      className={`text-sm px-4 opacity-80 font-medium text-center leading-[140%] w-full ${s.descriptionClass ?? ""}`}
                    >
                      {s.description}
                    </p>
                    <div
                      data-swiper-parallax-y="-20"
                      data-swiper-parallax-opacity="0"
                      data-swiper-parallax-duration="600"
                      className={`flex flex-col px-5 gap-2 w-full ${s.metaClass ?? "text-white"}`}
                    >
                      <div className="flex flex-row justify-start gap-2.5">
                        <span className="text-xs font-medium italic opacity-40">
                          Role
                        </span>
                        <span className="text-xs font-medium opacity-80">
                          {s.role}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start gap-2.5">
                        <span className="text-xs font-medium italic opacity-40">
                          Year
                        </span>
                        <span className="text-xs font-medium opacity-80">
                          {s.year}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start gap-2.5">
                        <span className="text-xs font-medium italic opacity-40">
                          Skills
                        </span>
                        <span className="text-xs font-medium opacity-80">
                          {s.skills}
                        </span>
                      </div>
                    </div>
                    <div
                      data-swiper-parallax-opacity="0"
                      data-swiper-parallax-duration="400"
                      className="w-full flex justify-center pointer-events-auto"
                    >
                      <Link href={s.href}>
                        <Button
                          variant="filled"
                          color={s.buttonColor ?? "white"}
                          size="small"
                          className="text-base! font-medium"
                          style={{ fontFamily: "var(--font-raleway)" }}
                        >
                          View Work
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none z-30"
        style={{
          background: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.4) 100%)",
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
    </main>
  );
}
