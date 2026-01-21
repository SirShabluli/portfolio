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
        const textSide = mainRef.current.querySelector(`.text-side-${i}`);
        const imageSide = mainRef.current.querySelector(`.image-side-${i}`);

        if (i === 0) {
          // שלב ראשון - גלוי
          gsap.set(step, { zIndex: 10 });
          gsap.set(textSide, { opacity: 1, y: 0 });
          gsap.set(imageSide, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
        } else {
          // שאר השלבים - מוסתרים מאחורי הראשון
          gsap.set(step, { zIndex: 1 });
          gsap.set(textSide, { opacity: 0, y: 50 });
          gsap.set(imageSide, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)" });
        }

        // אם יש שלב בא בתור, נתאר את המעבר אליו
        if (i < steps.length - 1) {
          const nextText = mainRef.current.querySelector(`.text-side-${i + 1}`);
          const nextImage = mainRef.current.querySelector(`.image-side-${i + 1}`);

          // 1. הטקסט הנוכחי יוצא (עולה למעלה ונעלם)
          tl.to(
            textSide,
            {
              opacity: 0,
              y: -50,
              duration: 1,
            },
            "+=0.5",
          ); // השהייה קלה כדי שהמשתמש יספיק לקרוא

          // 2. התמונה הבאה נכנסת (נערמת מעל הנוכחית)
          tl.fromTo(
            nextImage,
            {
              opacity: 1, // היא כבר לא שקופה, היא פשוט חתוכה
              clipPath: "inset(0% 0% 0% 100%)", // מתחילה סגורה מימין
              zIndex: 10 + i, // קומה גבוהה יותר
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.5,
              ease: "power2.inOut",
            },
            "<", // קורה בדיוק כשהטקסט הישן נעלם
          );

          // 3. הטקסט הבא נכנס (עולה מלמטה)
          tl.fromTo(
            nextText,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
            "-=0.5", // מתחיל טיפה לפני שהתמונה מסיימת
          );

          // 4. ניקוי שקט: מכבים את התמונה הישנה מאחורי החדשה
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
