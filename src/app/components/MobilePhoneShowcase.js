"use client";
import Image from "next/image";
import TextBlock from "./TextBlock";
import { useEffect, useRef, useState } from "react";

function Indicator({ steps, activeStep, textColor }) {
  return (
    <div className="flex items-center justify-center gap-6 py-4">
      {steps.map((label, i) => (
        <span
          key={i}
          className="text-xs font-bold tracking-widest uppercase transition-all duration-300"
          style={{ color: textColor, opacity: activeStep === i ? 1 : 0.3 }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export default function MobilePhoneShowcase({
  section,
  bgColor = "#23577A",
  textColor = "#ffffff",
}) {
  const scrollRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [section.challenge.label, "screen", section.solution.label];

  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      const step = Math.round(el.scrollLeft / window.innerWidth);
      setActiveStep(step);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col" style={{ backgroundColor: bgColor }}>
      <div
        ref={scrollRef}
        className="w-full overflow-x-scroll flex"
        style={{
          color: textColor,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {/* Page 1 - Challenge */}
        <div
          className="w-screen shrink-0 flex flex-col justify-center h-screen px-8 pt-16 gap-6"
          style={{ scrollSnapAlign: "start" }}
        >
          {section.quote && (
            <p className="quote" style={{ color: textColor }}>
              &ldquo;{section.quote}&rdquo;
            </p>
          )}
          <TextBlock
            label={section.challenge.label}
            title={section.challenge.title}
          >
            {section.challenge.body}
          </TextBlock>
        </div>

        {/* Page 2 - Phone */}
        <div
          className="w-screen shrink-0 flex items-end justify-center h-screen"
          style={{ scrollSnapAlign: "start" }}
        >
          {section.screenSrc && (
            <Image
              src={section.screenSrc}
              alt={`Screen ${section.id}`}
              width={400}
              height={800}
              className="w-[80vw] h-auto"
            />
          )}
        </div>

        {/* Page 3 - Solution */}
        <div
          className="w-screen shrink-0 flex flex-col justify-center h-screen px-8 pt-16 gap-6"
          style={{ scrollSnapAlign: "start" }}
        >
          <TextBlock
            label={section.solution.label}
            title={section.solution.title}
          >
            {section.solution.body}
          </TextBlock>
        </div>
      </div>

      <Indicator steps={steps} activeStep={activeStep} textColor={textColor} />
    </div>
  );
}
