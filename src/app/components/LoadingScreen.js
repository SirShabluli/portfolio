"use client";
import { useEffect, useRef, useState } from "react";
import { useTransition } from "../context/TransitionContext";

export default function LoadingScreen() {
  const { isLoading } = useTransition();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  // Duration the bar takes to go 0 → 85% (the remaining 15% waits for signalReady)
  const FILL_DURATION = 800; // ms

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(0);
      startTimeRef.current = performance.now();

      const tick = (now) => {
        const elapsed = now - startTimeRef.current;
        // Ease to 85%, then hold until page signals ready
        const t = Math.min(elapsed / FILL_DURATION, 1);
        const eased = t < 1 ? 1 - Math.pow(1 - t, 3) : 1; // ease-out cubic
        setProgress(eased * 85);
        if (t < 1) animFrameRef.current = requestAnimationFrame(tick);
      };

      animFrameRef.current = requestAnimationFrame(tick);
    } else {
      // Page is ready — shoot to 100% then fade out
      cancelAnimationFrame(animFrameRef.current);
      setProgress(100);
      const hide = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(hide);
    }

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black pointer-events-auto"
      style={{
        opacity: !isLoading && progress === 100 ? 0 : 1,
        transition: !isLoading ? "opacity 0.4s ease" : "none",
      }}
    >
      {/* Progress bar — thin line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
        <div
          className="h-full bg-white"
          style={{
            width: `${progress}%`,
            transition:
              progress === 100
                ? "width 0.25s ease-out"
                : "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
