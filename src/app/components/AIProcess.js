"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StepSection from "./StepSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AIProcess({ data }) {
  const mainRef = useRef(null);
  const mobileRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray(".step-container");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: `+=${data.length * 30}%`,
          pin: true,
          scrub: 2,
        },
      });

      steps.forEach((step, i) => {
        const textSide = step.querySelector(".text-side");
        const imageSide = step.querySelector(".image-side");

        // הגדרות התחלה
        if (i === 0) {
          // שלב ראשון - גלוי לגמרי
          gsap.set(step, { zIndex: 10 });
          gsap.set(textSide, { opacity: 1, y: 0 });
          gsap.set(imageSide, { opacity: 1 });
        } else if (i === 3) {
          // שלב 4 - wipe, מתחיל עם clipPath סגור על ה-wrapper בלבד
          const imageWrapper = imageSide.querySelector(".image-wrapper");
          gsap.set(step, { zIndex: 1 });
          gsap.set(textSide, { opacity: 0, y: 50 });
          gsap.set(imageSide, { opacity: 1 });
          gsap.set(imageWrapper, { clipPath: "inset(0% 0% 0% 100%)" });
        } else {
          // שלבים 2 ו-3 - fade, מתחילים שקופים
          gsap.set(step, { zIndex: 1 });
          gsap.set(textSide, { opacity: 0, y: 50 });
          gsap.set(imageSide, { opacity: 0 });
        }

        // מעבר לשלב הבא
        if (i < steps.length - 1) {
          const nextStep = steps[i + 1];
          const nextText = nextStep.querySelector(".text-side");
          const nextImage = nextStep.querySelector(".image-side");

          // טקסט נוכחי יוצא
          tl.to(textSide, { opacity: 0, duration: 0.5 });

          // Container הבא עולה למעלה
          tl.set(nextStep, { zIndex: 20 + i });

          // טקסט חדש נכנס
          if (i === 1) {
            // מעבר 2→3: טקסט ותמונה ביחד
            tl.fromTo(nextText, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 });
            tl.to(imageSide, { opacity: 0, duration: 0.8 }, "<");
            tl.fromTo(
              nextImage,
              { opacity: 0 },
              { opacity: 1, duration: 0.8 },
              "<",
            );
          } else if (i === 2) {
            // מעבר 3→4: טקסט ותמונה (wipe) ביחד
            const nextImageWrapper = nextImage.querySelector(".image-wrapper");
            tl.fromTo(nextText, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 });
            tl.to(imageSide, { opacity: 0, duration: 0.8 }, "<");
            tl.fromTo(
              nextImageWrapper,
              { clipPath: "inset(0% 0% 0% 100%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "power2.inOut",
              },
              "<",
            );
          } else {
            // מעבר 1→2: טקסט ותמונה ביחד
            tl.fromTo(nextText, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
            tl.to(imageSide, { opacity: 0, duration: 0.5 }, "<");
            tl.fromTo(
              nextImage,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 },
              "<",
            );
          }

          // אנימציות תמונה - אחרי הטקסט (חוץ מ-2→3 ו-3→4)
          if (i === 1 || i === 2) {
            // כבר טופל למעלה
          }

          // אנימציית ציטוטים לשלב האחרון
          if (i === 2) {
            const floatingQuotes = nextStep.querySelectorAll(".floating-quote");
            if (floatingQuotes.length > 0) {
              tl.fromTo(
                floatingQuotes,
                {
                  scale: 0,
                  rotation: -15,
                  opacity: 0,
                },
                {
                  scale: 1,
                  rotation: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "back.out(1.7)",
                  stagger: 0.15,
                },
                "-=0.3",
              );
            }
          }
        }
      });
    },
    { scope: mainRef, dependencies: [data] },
  );

  // Mobile: draw the SVG line + reveal each step when line reaches it
  useGSAP(
    () => {
      if (!lineRef.current || !mobileRef.current) return;

      const line = lineRef.current;
      const length = line.getTotalLength();

      // Start fully invisible
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

      // Draw line scrubbed to scroll (once: true = no reverse)
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: mobileRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          once: true,
        },
      });

      // Each step fades in when it hits the center of the viewport
      const steps = mobileRef.current.querySelectorAll(".mobile-step");
      gsap.set(steps, { opacity: 0, scale: 0 });
      steps.forEach((step) => {
        gsap.to(step, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: step,
            start: "top center",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: mobileRef, dependencies: [data] },
  );

  return (
    <>
      {/* Mobile timeline — vertical scroll, no pin */}
      <section
        ref={mobileRef}
        className="md:hidden bg-black text-white relative py-24 px-4"
      >
        {/* SVG line — drawn by GSAP as you scroll */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <line
            ref={lineRef}
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Steps */}
        {data.map((step, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={step.id}
              className="mobile-step relative mb-32 last:mb-0 grid grid-cols-4 gap-x-3 px-6"
            >
              {/* Photo full width */}
              <div className="col-span-4 relative z-10 bg-black p-2 mb-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
              </div>
              {/* Text below, alternates alignment */}
              <div
                className={`col-span-2 justify-start px-2 text-left ${isLeft ? "col-start-1" : "col-start-3"}`}
              >
                <span className=" text-sm font-medium opacity-50 uppercase tracking-widest">
                  Step {step.id}
                </span>
                <h3 className="text-base font-bold mt-1">{step.title}</h3>
                <p className="text-sm font-medium opacity-70 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Desktop — existing pinned version */}
      <section
        ref={mainRef}
        className="hidden md:flex relative justify- h-screen overflow-hidden bg-black"
      >
        {data.map((step, index) => (
          <StepSection key={step.id} step={step} index={index} />
        ))}
      </section>
    </>
  );
}
