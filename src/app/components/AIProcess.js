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
          end: `+=${data.length * 30}%`,
          pin: true,
          scrub: 2,
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
          // שלב 4 - wipe, מתחיל עם clipPath סגור על ה-wrapper בלבד
          const imageWrapper = imageSide.querySelector(".image-wrapper");
          gsap.set(step, { zIndex: 1 });
          gsap.set(textSide, { opacity: 0, y: 50 });
          gsap.set(imageSide, { opacity: 1 });
          gsap.set(imageWrapper, { clipPath: "inset(0% 0% 0% 100%)" });
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
            tl.fromTo(nextText, { opacity: 0 }, { opacity: 1, duration: 0.1 });
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
            tl.fromTo(nextText, { opacity: 0 }, { opacity: 1, duration: 0.1 });
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
            tl.fromTo(nextText, { opacity: 0 }, { opacity: 1, duration: 0.5 });
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
                  duration: 0.4,
                  ease: "back.out(1.7)",
                  stagger: 0.15,
                },
                "-=0.3"
              );
            }
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
