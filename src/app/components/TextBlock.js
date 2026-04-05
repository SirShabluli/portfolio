"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function TextBlock({
  label,
  title,
  children,
  className = "",
  maxWidth = "100%",
}) {
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
        },
      });

      // 1. Title: blur in
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, filter: "blur(12px)", y: 6 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          0,
        );
      }

      // 2. Label: reveal from bottom (clip)
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 14 },
          { opacity: 0.5, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.1",
        );
      }

      // 3. Body: word-by-word scatter
      if (bodyRef.current) {
        const split = new SplitType(bodyRef.current, { types: "words" });
        tl.from(
          split.words,
          {
            opacity: 0,
            y: 10,
            stagger: 0.015,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={`flex flex-col ${className}`}>
      {label && (
        <span
          ref={labelRef}
          className="text-sm mb-1 font-regular opacity-50 lg:mb-1 lg:text-sm"
          style={{ opacity: 0 }}
        >
          {label}
        </span>
      )}
      {title && (
        <span
          ref={titleRef}
          className="text-2xl font-medium italic lg:text-xl"
          style={{ opacity: 0 }}
        >
          {title}
        </span>
      )}
      {children && (
        <p
          ref={bodyRef}
          className="mt-2 leading-[140%] text-sm font-medium lg:leading-[190%] whitespace-pre-line lg:text-sm"
          style={{ maxWidth }}
        >
          {children}
        </p>
      )}
    </div>
  );
}
