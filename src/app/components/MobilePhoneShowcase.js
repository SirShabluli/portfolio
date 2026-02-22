"use client";
import Image from "next/image";
import TextBlock from "./TextBlock";
import { useEffect, useRef } from "react";

export default function MobilePhoneShowcase({
  section,
  bgColor = "#23577A",
  textColor = "#ffffff",
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = window.innerWidth;
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-scroll flex"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}
    >
      {/* Page 1 - Challenge */}
      <div
        className="w-screen flex-shrink-0 grid grid-cols-4 gap-3 min-h-screen px-3 py-16"
        style={{ backgroundColor: bgColor }}
      >
        <div className="col-span-4 flex flex-col justify-center gap-6">
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
      </div>

      {/* Page 2 - Phone */}
      <div
        className="w-screen flex-shrink-0 grid grid-cols-4 gap-3 min-h-screen px-3 py-16"
        style={{ backgroundColor: bgColor }}
      >
        <div className="p-5 col-span-4 flex items-center justify-center">
          {section.screenSrc && (
            <Image
              src={section.screenSrc}
              alt={`Screen ${section.id}`}
              width={400}
              height={800}
              className="w-full h-auto"
            />
          )}
        </div>
      </div>

      {/* Page 3 - Solution */}
      <div
        className="w-screen flex-shrink-0 grid grid-cols-4 gap-3 min-h-screen px-3 py-16"
        style={{ backgroundColor: bgColor }}
      >
        <div className="col-span-4 flex flex-col justify-center gap-6">
          <TextBlock
            label={section.solution.label}
            title={section.solution.title}
          >
            {section.solution.body}
          </TextBlock>
        </div>
      </div>
    </div>
  );
}
