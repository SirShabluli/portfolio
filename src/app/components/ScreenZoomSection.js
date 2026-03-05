"use client";
import Image from "next/image";
import { useRef, useState, useEffect, Children } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScreenZoomSection({
  imageSrc,
  title,
  description,
  alt = "Screen",
  children,
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const childArray = Children.toArray(children);

  useGSAP(
    () => {
      // אנימציה בלי pin - קורה תוך כדי גלילה רגילה
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // zoom out + move to side while scrolling through
      tl.fromTo(
        imageRef.current,
        { scale: 1.3, x: "0" },
        { scale: 0.7, x: "-25%", ease: "none" },
      );

      // text fades in
      tl.fromTo(
        textRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, ease: "none" },
        0.2, // starts at 50% of timeline
      );
    },
    { scope: sectionRef },
  );

  return (
    <>
      {/* Mobile layout — static image on top, horizontal text scroll below */}
      <section className="md:hidden bg-black text-white flex flex-col">
        {/* Static screen image */}
        <div className="flex items-center justify-center px-6 pt-16 pb-4">
          <Image
            src={imageSrc}
            alt={alt}
            width={1920}
            height={1080}
            className="w-full rounded-xl"
          />
        </div>

        {/* Horizontal scroll pages */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-scroll flex"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
          }}
          onScroll={() => {
            const el = scrollRef.current;
            if (!el) return;
            setActiveStep(Math.round(el.scrollLeft / el.offsetWidth));
          }}
        >
          {childArray.map((child, i) => (
            <div
              key={i}
              className="w-screen shrink-0 flex flex-col justify-start px-8 py-12 gap-6"
              style={{ scrollSnapAlign: "start" }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Indicator */}
        {(() => {
          const labels = ["The Challenge", "My Solution"];
          const canGoLeft = activeStep > 0;
          const canGoRight = activeStep < childArray.length - 1;
          const scrollTo = (i) => scrollRef.current?.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: "smooth" });
          return (
            <div className="flex items-center justify-center gap-3 py-4">
              <button
                onClick={() => canGoLeft && scrollTo(activeStep - 1)}
                className="w-8 h-8 flex items-center justify-center border transition-opacity duration-300"
                style={{ color: "#ffffff", opacity: canGoLeft ? 1 : 0, borderColor: "#ffffff", background: "none", cursor: canGoLeft ? "pointer" : "default" }}
              >←</button>
              <span
                className="text-xs font-bold tracking-widest uppercase px-4 py-2"
                style={{ backgroundColor: "#ffffff", color: "#000000" }}
              >
                {labels[activeStep] ?? `${activeStep + 1}`}
              </span>
              <button
                onClick={() => canGoRight && scrollTo(activeStep + 1)}
                className="w-8 h-8 flex items-center justify-center border transition-opacity duration-300"
                style={{ color: "#ffffff", opacity: canGoRight ? 1 : 0, borderColor: "#ffffff", background: "none", cursor: canGoRight ? "pointer" : "default" }}
              >→</button>
            </div>
          );
        })()}
      </section>

      {/* Desktop layout — zoom animation */}
      <section
        ref={sectionRef}
        className="hidden md:block relative h-[150vh] bg-black overflow-visible"
      >
        <div className="sticky top-0 h-screen">
          <div className="absolute inset-0 grid grid-cols-12 gap-8 mx-auto items-center px-8">
            <div ref={imageRef} className="col-start-3 col-span-8">
              <Image
                src={imageSrc}
                alt={alt}
                width={1920}
                height={1080}
                className="w-full rounded-xl"
              />
            </div>
          </div>
          <div className="absolute inset-0 grid grid-cols-12 gap-8 mx-auto items-center px-8 pointer-events-none">
            <div
              ref={textRef}
              className="col-span-3 col-start-9 text-white pointer-events-auto flex flex-col gap-8"
            >
              {children ? (
                children
              ) : (
                <>
                  {title && <h2 className="text-4xl font-bold mb-4">{title}</h2>}
                  {description && <p className="text-gray-400 text-lg">{description}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
