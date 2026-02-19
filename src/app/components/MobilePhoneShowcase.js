"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import TextBlock from "./TextBlock";

/**
 * MobilePhoneShowcase
 * Touch-friendly horizontal swipe carousel for small screens.
 * Each "unit" = 3 virtual pages: left (challenge) | center (phone) | right (solution)
 *
 * Props:
 *   section: { id, quote, challenge: { label, title, body }, solution: { label, title, body } }
 *   bgColor: string
 *   textColor: string
 */
export default function MobilePhoneShowcase({
  section,
  bgColor = "#23577A",
  textColor = "#ffffff",
}) {
  const [current, setCurrent] = useState(1); // start on center (phone)
  const startXRef = useRef(null);

  const pages = ["left", "center", "right"];

  const goTo = (index) => {
    if (index < 0 || index >= pages.length) return;
    setCurrent(index);
  };

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (startXRef.current === null) return;
    const delta = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      goTo(delta > 0 ? current + 1 : current - 1);
    }
    startXRef.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {/* Page 1 - Challenge */}
        <div className="w-full flex-shrink-0 grid grid-cols-4 gap-4 min-h-screen px-6 py-16">
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
        <div className="w-full flex-shrink-0 grid grid-cols-4 gap-4 min-h-screen px-6 py-16">
          <div className="col-span-4 flex items-center justify-center">
            <div className="relative w-full">
              <Image
                src="/images/shared/iphoneMockup.png"
                alt="Phone mockup"
                width={400}
                height={800}
                className="w-full h-auto"
              />
              {section.screenSrc && (
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    top: "2.5%",
                    left: "6%",
                    right: "6%",
                    bottom: "2.5%",
                    borderRadius: "10%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={section.screenSrc}
                    alt={`Screen ${section.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page 3 - Solution */}
        <div className="w-full flex-shrink-0 grid grid-cols-4 gap-4 min-h-screen px-6 py-16">
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

      {/* Dot nav */}
      <div className="flex justify-center gap-3 pb-8">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                i === current ? textColor : `${textColor}50`,
              transform: i === current ? "scale(1.4)" : "scale(1)",
            }}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
