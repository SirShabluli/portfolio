"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StepSection from "./StepSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AIProcess({ data }) {
  const mainRef = useRef(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray(".step-container");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: `+=${data.length * 150}%`,
          pin: true,
          scrub: 1,
        },
      });

      steps.forEach((step, i) => {
        const textSide = step.querySelector(".text-side");
        const imageSide = step.querySelector(".image-side");

        if (i === 0) {
          // שלב ראשון - גלוי לגמרי
          gsap.set(step, { zIndex: 10 });
          gsap.set(textSide, { opacity: 1, y: 0 });
          gsap.set(imageSide, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
        } else {
          // שאר השלבים - מוסתרים
          gsap.set(step, { zIndex: 1 });
          gsap.set(textSide, { opacity: 0, y: 50 });
          gsap.set(imageSide, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)" });
        }

        // מעבר לשלב הבא
        if (i < steps.length - 1) {
          const nextStep = steps[i + 1];
          const nextText = nextStep.querySelector(".text-side");
          const nextImage = nextStep.querySelector(".image-side");

          // 1. טקסט נוכחי יוצא למעלה
          tl.to(
            textSide,
            {
              opacity: 0,
              y: -50,
              duration: 1,
            },
            "+=0.5",
          );

          // 2. Container הבא עולה למעלה
          tl.set(nextStep, { zIndex: 20 + i });

          // 3. תמונה חדשה נכנסת עם wipe
          tl.fromTo(
            nextImage,
            { opacity: 1, clipPath: "inset(0% 0% 0% 100%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.5,
              ease: "power2.inOut",
            },
            "<",
          );

          // 4. טקסט חדש נכנס - אחרי שהתמונה סיימה
          tl.fromTo(
            nextText,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
          );

          // 5. מכבים את התמונה הישנה
          tl.set(imageSide, { opacity: 0 });
        }
      });
    },
    { scope: mainRef, dependencies: [data] },
  );

  return (
    <section
      ref={mainRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {data.map((step, index) => (
        <StepSection key={step.id} step={step} index={index} />
      ))}
    </section>
  );
}
