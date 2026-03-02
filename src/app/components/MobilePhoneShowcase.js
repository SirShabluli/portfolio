"use client";
import Image from "next/image";
import TextBlock from "./TextBlock";
import { useEffect, useRef, useState } from "react";

function Indicator({ steps, activeStep, textColor, bgColor, scrollRef }) {
  const canGoLeft = activeStep > 0;
  const canGoRight = activeStep < steps.length - 1;

  const scrollTo = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const pageWidth = el.offsetWidth;
    el.scrollTo({ left: index * pageWidth, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <button
        onClick={() => canGoLeft && scrollTo(activeStep - 1)}
        className="w-8 h-8 flex items-center justify-center  border transition-opacity duration-300"
        style={{
          color: textColor,
          opacity: canGoLeft ? 1 : 0,
          borderColor: textColor,
          background: "none",
          cursor: canGoLeft ? "pointer" : "default",
        }}
      >
        ←
      </button>
      <span
        className="text-xs font-bold tracking-widest uppercase px-4 py-2"
        style={{
          backgroundColor: textColor,
          color: bgColor,
        }}
      >
        {steps[activeStep]}
      </span>
      <button
        onClick={() => canGoRight && scrollTo(activeStep + 1)}
        className="w-8 h-8 flex items-center justify-center border transition-opacity duration-300"
        style={{
          color: textColor,
          opacity: canGoRight ? 1 : 0,
          borderColor: textColor,
          background: "none",
          cursor: canGoRight ? "pointer" : "default",
        }}
      >
        →
      </button>
    </div>
  );
}

export default function MobilePhoneShowcase({
  section,
  bgColor = "#23577A",
  textColor = "#ffffff",
}) {
  const scrollRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [section.challenge.label, section.screenName || "screen", section.solution.label];

  useEffect(() => {
    const el = scrollRef.current;
    const pageWidth = el.offsetWidth;

    // Start at the screen (index 1 = middle)
    el.scrollLeft = pageWidth;

    const handleScroll = () => {
      const step = Math.round(el.scrollLeft / el.offsetWidth);
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

      <Indicator
        steps={steps}
        activeStep={activeStep}
        textColor={textColor}
        bgColor={bgColor}
        scrollRef={scrollRef}
      />
    </div>
  );
}
