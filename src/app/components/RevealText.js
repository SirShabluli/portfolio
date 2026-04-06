"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// trigger prop: if provided, animation fires when trigger becomes true (no scroll needed)
// without trigger prop: original scroll-based behavior
export default function RevealText({
  children,
  className,
  style,
  trigger,
  duration = 1.6,
  stagger = 0.02,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const split = new SplitType(ref.current, { types: "words,chars" });

    split.words.forEach((word) => {
      word.style.whiteSpace = "nowrap";
    });

    if (trigger !== undefined) {
      // Prop-driven mode — reset and replay when trigger flips to true
      gsap.set(split.chars, { opacity: 0, x: 20 });
      if (trigger) {
        gsap.to(split.chars, {
          opacity: 1,
          x: 0,
          stagger,
          duration,
          ease: "power2.out",
          delay: 0.3,
        });
      }
    } else {
      // Scroll-driven mode — original behavior
      gsap.from(split.chars, {
        opacity: 0,
        x: 20,
        stagger,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });
    }

    return () => split.revert();
  }, [trigger]);

  return (
    <p ref={ref} className={className} style={style}>
      {children}
    </p>
  );
}
