"use client";
import Image from "next/image";
import { useRef } from "react";
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
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

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
        0.5, // starts at 50% of timeline
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[150vh] bg-black overflow-visible"
    >
      {/* Sticky container - stays visible during scroll */}
      <div className="sticky top-0 h-screen">
        {/* Image Layer */}
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

        {/* Text Layer - separate grid */}
        <div className="absolute inset-0 grid grid-cols-12 gap-8 mx-auto items-center px-8 pointer-events-none">
          <div
            ref={textRef}
            className="col-span-3 col-start-9 text-white pointer-events-auto"
          >
            {title && <h2 className="text-4xl font-bold mb-4">{title}</h2>}
            {description && (
              <p className="text-gray-400 text-lg">{description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
