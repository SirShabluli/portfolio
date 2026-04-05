"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WipeText({
  children,
  className,
  style,
  as: Tag = "h2",
  duration = 0.9,
  stagger = 0.12,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const split = new SplitType(el, { types: "lines" });

    // Wrap each line in overflow:hidden so the clip doesn't bleed between lines
    split.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 20%",
        scrub: 0.6,
      },
    });

    split.lines.forEach((line, i) => {
      tl.fromTo(
        line,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", ease: "power3.inOut", duration: 1 },
        i * stagger
      );
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
