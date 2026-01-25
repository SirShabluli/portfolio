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
          end: `+=${data.length * 100}%`,
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
          gsap.set(imageSide, { opacity: 1 });
        } else if (i === 3) {
          // שלב 4 - wipe, מתחיל עם clipPath סגור
          gsap.set(step, { zIndex: 1 });
          gsap.set(textSide, { opacity: 0, y: 50 });
          gsap.set(imageSide, { opacity: 1, clipPath: "inset(0% 0% 0% 100%)" });
        } else {
          // שלבים 2 ו-3 - fade, מתחילים שקופים בלי clipPath
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
            tl.fromTo(nextText, { opacity: 0 }, { opacity: 1, duration: 0.5 });
            tl.to(imageSide, { opacity: 0, duration: 0.8 }, "<");
            tl.fromTo(
              nextImage,
              { opacity: 0 },
              { opacity: 1, duration: 0.8 },
              "<",
            );
          } else {
            // שאר המעברים: טקסט קודם
            tl.fromTo(nextText, { opacity: 0 }, { opacity: 1, duration: 0.5 });
          }

          // אנימציות תמונה - אחרי הטקסט (חוץ מ-2→3)
          if (i === 0) {
            // מעבר 1→2: fade out + fade in
            tl.to(imageSide, { opacity: 0, duration: 0.5 });
            tl.fromTo(
              nextImage,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 },
              "<0.2",
            );
          } else if (i === 1) {
            // כבר טופל למעלה
          } else if (i === 2) {
            // מעבר 3→4: fade out הישנה במקביל ל-wipe החדשה
            tl.to(imageSide, { opacity: 0, duration: 0.8 });
            tl.fromTo(
              nextImage,
              { opacity: 1, clipPath: "inset(0% 0% 0% 100%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "power2.inOut",
              },
              "<",
            );
          }
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
