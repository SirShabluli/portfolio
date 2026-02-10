"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScroll({ children }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(
    () => {
      const scrollElement = scrollRef.current;
      const totalWidth = scrollElement.scrollWidth - window.innerWidth;

      gsap.to(scrollElement, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={scrollRef} className="flex h-screen">
        {children}
      </div>
    </div>
  );
}
