"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      wheelMultiplier: 2,
      smoothTouch: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Prevent ScrollTrigger from refreshing on mobile browser chrome resize
    // (browser chrome appearing/disappearing changes window.innerHeight)
    ScrollTrigger.config({ ignoreMobileResize: true });

    const handleScrollTo = (e) => {
      const el = document.getElementById(e.detail);
      if (el) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    };
    window.addEventListener("lenis-scroll-to", handleScrollTo);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener("lenis-scroll-to", handleScrollTo);
    };
  }, []);

  return null;
}
