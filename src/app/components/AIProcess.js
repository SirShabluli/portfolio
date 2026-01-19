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
          end: `+=${data.length * 50}%`,
          pin: true,
          scrub: 1,
        },
      });

      steps.forEach((step, i) => {
        // תופסים את האלמנטים הפנימיים של כל שלב
        const textSide = step.querySelector(".text-side");
        const imageSide = step.querySelector(".image-side");

        if (i === 0) {
          // שלב ראשון מוצג מיד
          gsap.set(step, { opacity: 1 });
          gsap.set(textSide, { opacity: 1, y: 0 });
          gsap.set(imageSide, { clipPath: "inset(0% 0% 0% 0%)" });
        } else {
          // כניסה של שלב חדש:

          // 1. התמונה מופיעה עם wipe effect (מימין לשמאל)
          tl.to(step, { opacity: 1, duration: 0 });
          tl.fromTo(
            imageSide,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 3,
              ease: "power2.inOut",
            },
            "<"
          );

          // 2. הטקסט עושה Fade In ומחליק קצת מלמטה
          tl.from(
            textSide,
            {
              opacity: 0,
              y: 0,
              duration: 2,
              ease: "power2.out",
            },
            "<0.3"
          ); // מתחיל קצת אחרי התמונה
        }

        // יציאה של השלב (לפני שהבא נכנס)
        if (i < steps.length - 1) {
          // הטקסט נעלם ב-Fade Out
          tl.to(
            textSide,
            {
              opacity: 0,
              y: 0,
              duration: 2,
              ease: "power2.in",
            },
            "+=1"
          ); // הדיליי הזה משאיר את השלב "נעול" על המסך לקצת זמן

          // התמונה נעלמת עם wipe effect (משמאל לימין)
          tl.to(
            imageSide,
            {
              clipPath: "inset(0% 0% 0% 100%)",
              duration: 3,
              ease: "power2.inOut",
            },
            "<"
          );

          tl.to(step, { opacity: 0, duration: 0 });
        }
      });
    },
    { scope: mainRef, dependencies: [data] }
  );

  return (
    <section
      ref={mainRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {data.map((step) => (
        <StepSection key={step.id} step={step} />
      ))}
    </section>
  );
}
