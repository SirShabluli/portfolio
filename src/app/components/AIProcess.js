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
      // 1. תופסים את כל השלבים
      const steps = gsap.utils.toArray(".step-container");

      // 2. יוצרים טיימליין שמחובר לגלילה
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          // ככל שיש יותר שלבים, הגלילה תהיה ארוכה יותר (כדי שיהיה זמן להתרשם)
          end: `+=${data.length * 100}%`,
          pin: true, // נועץ את כל הסקשן למסך
          scrub: 1, // מחבר את האנימציה ישירות לגלגלת
        },
      });

      // 3. מריצים את האנימציה על כל שלב
      steps.forEach((step, i) => {
        if (i === 0) {
          // השלב הראשון מופיע מיד
          gsap.set(step, { opacity: 1 });
        } else {
          // שאר השלבים נכנסים ב-Fade In
          tl.to(step, {
            opacity: 1,
            duration: 0, // משך הזמן היחסי בתוך הגלילה
            ease: "power2.inOut",
          });
        }

        // אם זה לא השלב האחרון, נעלים את הטקסט או את כל השלב לפני שהבא נכנס
        if (i < steps.length - 1) {
          tl.to(step, { opacity: 0, duration: 0.5 }, "+=0.5");
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
