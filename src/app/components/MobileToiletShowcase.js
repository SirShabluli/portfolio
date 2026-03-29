"use client";
import Image from "next/image";
import TextBlock from "./TextBlock";
import { useState, useEffect, useRef } from "react";

const STEPS = ["Challenge", "Solution"];
const RSG = ["Ready...", "Set...", "Go!"];

function Indicator({ activeStep, setActiveStep }) {
  return (
    <div className="flex items-center justify-center gap-1 py-4 px-4">
      {STEPS.map((label, i) => {
        const isActive = i === activeStep;
        return (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className="text-xs font-bold tracking-widest uppercase px-2 py-2 transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: isActive ? "#000000" : "transparent",
              color: isActive ? "#ffffff" : "#000000",
              border: "1px solid #000000",
              opacity: isActive ? 1 : 0.5,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function MobileToiletShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [rsgIndex, setRsgIndex] = useState(0);
  const [arrowClip, setArrowClip] = useState(0);
  const intervalRef = useRef(null);
  const arrowRaf = useRef(null);
  const arrowStart = useRef(null);
  const isSolution = activeStep === 1;

  useEffect(() => {
    if (!isSolution) return;

    intervalRef.current = setInterval(() => {
      setRsgIndex((i) => (i + 1) % RSG.length);
    }, 400);

    function animateArrow(ts) {
      if (!arrowStart.current) arrowStart.current = ts;
      const elapsed = ts - arrowStart.current;
      const progress = Math.min(elapsed / 3000, 1);
      setArrowClip(progress * 100);
      if (progress < 1) {
        arrowRaf.current = requestAnimationFrame(animateArrow);
      } else {
        arrowStart.current = null;
        setArrowClip(0);
        arrowRaf.current = requestAnimationFrame(animateArrow);
      }
    }
    arrowRaf.current = requestAnimationFrame(animateArrow);

    return () => {
      clearInterval(intervalRef.current);
      cancelAnimationFrame(arrowRaf.current);
      arrowStart.current = null;
    };
  }, [isSolution]);

  return (
    <div className="flex flex-col bg-white" style={{ height: "100svh" }}>
      {/* Visual area — toilet always visible, overlay fades in on solution */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 pt-16">
        {/* Toilet base — always shown */}
        <Image
          src="/images/toilet/Asla.svg"
          alt="Toilet"
          width={280}
          height={280}
          className="w-auto h-full max-h-[50vh] object-contain"
        />

        {/* Solution overlay — fades in */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
          style={{ opacity: isSolution ? 1 : 0, pointerEvents: "none" }}
        >
          {/* Frame */}
          <Image
            src="/images/toilet/frame.svg"
            alt="Frame"
            width={280}
            height={280}
            className="absolute inset-0 w-full h-full object-contain"
          />
          {/* Arrow wipe */}
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
            className="absolute text-white text-5xl"
            style={{
              fontFamily: "var(--font-dokdo)",
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            {RSG[rsgIndex]}
          </span>
        </div>
      </div>

      {/* Text block — swaps based on active step */}
      <div className="px-6 py-6 text-black flex flex-col justify-start min-h-44">
        {activeStep === 0 ? (
          <TextBlock label="The Challenge" title="Cynics Don't Click">
            When people approach embarrassing projects, there&apos;s a natural
            distance. A protective layer of cynicism.
          </TextBlock>
        ) : (
          <TextBlock label="My Solution" title="Countdown to Commitment">
            I created a timed urinal selection game. The countdown creates
            urgency. The timer removes hesitation. Even the most distant,
            skeptical viewer gets pulled in and forgets they&apos;re making
            ridiculous decisions about urinal etiquette.
          </TextBlock>
        )}
      </div>

      <Indicator activeStep={activeStep} setActiveStep={setActiveStep} />
    </div>
  );
}
