"use client";
import { useEffect } from "react";
import { useTransition } from "../context/TransitionContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Call this hook in any page that should control when the loading screen hides.
 *
 * Usage — simple pages (no async loading):
 *   usePageReady();   // fires automatically after paint
 *
 * Usage — pages with async content (e.g. Spline):
 *   const { signalReady } = usePageReady({ manual: true });
 *   // then call signalReady() once your content is loaded
 *
 * Before signalling, it calls ScrollTrigger.refresh() so GSAP always
 * measures a fully-painted layout.
 */
export default function usePageReady({ manual = false } = {}) {
  const ctx = useTransition();

  const signalReady = () => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      ScrollTrigger.refresh();
    }
    ctx?.signalReady();
  };

  useEffect(() => {
    if (manual) return;
    // For simple pages: wait two frames so the DOM is fully painted
    let raf1 = requestAnimationFrame(() => {
      let raf2 = requestAnimationFrame(() => {
        signalReady();
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  return { signalReady };
}
