"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RevealText({ children, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const split = new SplitType(ref.current, { types: "chars" });

    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.02,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });

    return () => split.revert();
  }, []);

  return (
    <p ref={ref} className={className} style={style}>
      {children}
    </p>
  );
}
