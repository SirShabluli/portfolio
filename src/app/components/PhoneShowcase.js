"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Mobile from "./Mobile";
import { useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PhoneShowcase({
  children,
  sections = [],
  showOutlines = false,
  showMarkers = true,
}) {
  const mainRef = useRef(null);
  const phoneRef = useRef(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const [splineApp, setSplineApp] = useState(null);

  const outline = showOutlines ? "outline outline-1 outline-red-500" : "";

  useGSAP(
    () => {
      if (!splineApp) return;
      const phoneModel = splineApp.findObjectByName("Mobile");
      if (phoneModel) phoneModel.scale.set(5, 5, 5);

      let currentScreen = 0;

      // Animate each section
      const animateSection = (
        sectionClass,
        xVwValue,
        rotationY = 0,
        screenIndex = 0,
      ) => {
        // Timeline for phone movement and rotation only (with scrub)
        const phoneTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionClass,
            start: "top center",
            end: "center center",
            scrub: 1,
            markers: showMarkers,
          },
        });

        phoneTl.to(phoneRef.current, { x: `${xVwValue}vw`, duration: 3 });

        if (phoneModel) {
          phoneTl.to(phoneModel.rotation, { y: rotationY, duration: 5 }, 0);
        }

        // Screen index change
        if (splineApp) {
          ScrollTrigger.create({
            trigger: sectionClass,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              splineApp.setVariable("screenIndex", screenIndex);
            },
            onEnterBack: () => {
              splineApp.setVariable("screenIndex", screenIndex);
            },
            markers: showMarkers,
          });
        }

        // Text animations - based on data-animate attribute
        const section = document.querySelector(sectionClass);
        if (section) {
          const animatedElements = section.querySelectorAll("[data-animate]");

          // מיון לפי הערך של data-animate
          const sorted = Array.from(animatedElements).sort((a, b) => {
            return Number(a.dataset.animate) - Number(b.dataset.animate);
          });

          // קיבוץ לפי מספר (אלמנטים עם אותו מספר יופיעו יחד)
          const groups = {};
          sorted.forEach((el) => {
            const order = el.dataset.animate;
            if (!groups[order]) groups[order] = [];
            groups[order].push(el);
          });

          const textTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionClass,
              start: "top top+=100",
              toggleActions: "play none none reverse",
              markers: showMarkers,
            },
          });

          // אנימציה לפי סדר הקבוצות
          Object.keys(groups)
            .sort((a, b) => Number(a) - Number(b))
            .forEach((order, i) => {
              const elements = groups[order];
              // קבוצה ראשונה מתחילה ב-0, השאר עם חפיפה קטנה
              const position = i === 0 ? 0 : "-=0.3";
              textTl.from(
                elements,
                { y: 20, opacity: 0, duration: 0.6 },
                position,
              );
            });
        }
      };

      // Animate all sections based on the sections array
      sections.forEach((config, index) => {
        animateSection(
          `.section-${index + 1}`,
          config.xPosition || 0,
          config.rotation || 0,
          config.screenIndex || 0,
        );
      });
    },
    { scope: mainRef, dependencies: [splineApp, sections] },
  );

  return (
    <main
      ref={mainRef}
      className="relative bg-black text-white overflow-visible"
    >
      {/* Mobile wrapper - sticky */}
      <div
        id="mobile-wrapper"
        className="sticky top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-50 overflow-visible"
      >
        <div ref={phoneRef} className="flex items-center justify-center">
          <Mobile onSplineLoad={setSplineApp} screenIndex={activeScreen} />
        </div>
      </div>

      {/* Children sections */}
      <div className="relative" style={{ marginTop: "-100vh" }}>
        {children}
      </div>
    </main>
  );
}
