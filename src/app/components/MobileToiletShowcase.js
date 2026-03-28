"use client";
import Image from "next/image";
import TextBlock from "./TextBlock";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const STEPS = ["Challenge", "Solution"];
const RSG = ["Ready...", "Set...", "Go!"];

function Indicator({ activeStep, swiperRef }) {
  return (
    <div className="flex items-center justify-center gap-1 py-4 px-4">
      {STEPS.map((label, i) => {
        const isActive = i === activeStep;
        return (
          <button
            key={i}
            onClick={() => swiperRef?.slideTo(i)}
            className="text-xs font-bold tracking-widest uppercase px-2 py-2 transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: isActive ? "#000000" : "transparent",
              color: isActive ? "#ffffff" : "#000000",
              border: "1px solid #000000",
              opacity: isActive ? 1 : 0.8,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function SolutionVisual() {
  const [rsgIndex, setRsgIndex] = useState(0);
  const [arrowClip, setArrowClip] = useState(0); // 0–100 representing inset left %
  const intervalRef = useRef(null);
  const arrowRaf = useRef(null);
  const arrowStart = useRef(null);

  useEffect(() => {
    // Cycle Ready/Set/Go every 400ms
    intervalRef.current = setInterval(() => {
      setRsgIndex((i) => (i + 1) % RSG.length);
    }, 400);

    // Arrow wipe: animate clip-path inset over 3s, then reset
    function animateArrow(ts) {
      if (!arrowStart.current) arrowStart.current = ts;
      const elapsed = ts - arrowStart.current;
      const progress = Math.min(elapsed / 3000, 1);
      setArrowClip(progress * 100);
      if (progress < 1) {
        arrowRaf.current = requestAnimationFrame(animateArrow);
      } else {
        // reset and loop
        arrowStart.current = null;
        setArrowClip(0);
        arrowRaf.current = requestAnimationFrame(animateArrow);
      }
    }
    arrowRaf.current = requestAnimationFrame(animateArrow);

    return () => {
      clearInterval(intervalRef.current);
      cancelAnimationFrame(arrowRaf.current);
    };
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center relative">
      {/* Toilet base */}
      <Image
        src="/images/toilet/Asla.svg"
        alt="Toilet"
        width={280}
        height={280}
        className="w-auto h-full max-h-[45vh] object-contain"
      />
      {/* Frame overlay */}
      <Image
        src="/images/toilet/frame.svg"
        alt="Frame"
        width={280}
        height={280}
        className="absolute inset-0 w-full h-full object-contain"
      />
      {/* Arrow — wipes left to right */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${arrowClip}% 0 0)` }}
      >
        <Image
          src="/images/toilet/arrough.svg"
          alt="Arrow"
          width={280}
          height={280}
          className="w-full h-full object-contain"
        />
      </div>
      {/* Ready / Set / Go */}
      <span
        className="absolute text-white text-5xl pointer-events-none"
        style={{
          fontFamily: "var(--font-dokdo)",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
        }}
      >
        {RSG[rsgIndex]}
      </span>
    </div>
  );
}

export default function MobileToiletShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="flex flex-col bg-white" style={{ height: "100svh" }}>
      <Swiper
        direction="horizontal"
        initialSlide={0}
        touchAngle={30}
        speed={400}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
        style={{ width: "100%", flex: 1, minHeight: 0, color: "#000000" }}
      >
        {/* Slide 1 — Challenge */}
        <SwiperSlide>
          <div className="w-screen h-full flex flex-col px-6 pt-16 pb-6 gap-8">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/images/toilet/Asla.svg"
                alt="Toilet"
                width={280}
                height={280}
                className="w-auto h-full max-h-[45vh] object-contain"
              />
            </div>
            <TextBlock label="The Challenge" title="Cynics Don't Click">
              When people approach embarrassing projects, there&apos;s a natural
              distance. A protective layer of cynicism.
            </TextBlock>
          </div>
        </SwiperSlide>

        {/* Slide 2 — Solution */}
        <SwiperSlide>
          <div className="w-screen h-full flex flex-col px-6 pt-16 pb-6 gap-8">
            <SolutionVisual />
            <TextBlock label="My Solution" title="Countdown to Commitment">
              I created a timed urinal selection game. The countdown creates
              urgency. The timer removes hesitation. Even the most distant,
              skeptical viewer gets pulled in and forgets they&apos;re making
              ridiculous decisions about urinal etiquette.
            </TextBlock>
          </div>
        </SwiperSlide>
      </Swiper>

      <Indicator activeStep={activeStep} swiperRef={swiperRef} />
    </div>
  );
}
