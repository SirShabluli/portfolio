"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LETTERS = ["E", "y", "a", "l"];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    // Only show on the first visit of the session
    if (sessionStorage.getItem("loaded")) return;
    sessionStorage.setItem("loaded", "1");

    setVisible(true);

    const letters = lettersRef.current.filter(Boolean);
    gsap.set(letters, { clipPath: "inset(0 100% 0 0)" });

    // Animate letters in immediately
    gsap.to(letters, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.08,
    });

    // Wait for BOTH: 1.5s minimum AND window load (all assets)
    let windowLoaded = document.readyState === "complete";
    let minElapsed = false;
    let dismissed = false;

    const tryDismiss = () => {
      if (dismissed || !windowLoaded || !minElapsed) return;
      dismissed = true;
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setVisible(false),
      });
    };

    const onLoad = () => {
      windowLoaded = true;
      tryDismiss();
    };

    if (!windowLoaded) window.addEventListener("load", onLoad);

    const timer = setTimeout(() => {
      minElapsed = true;
      tryDismiss();
    }, 1500);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-200 bg-black flex items-center justify-center pointer-events-auto"
    >
      <div className="flex">
        {LETTERS.map((char, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="display text-white"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
