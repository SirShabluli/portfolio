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
  showMarkers = false,
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

      // Pin the phone wrapper
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top bottom",
        end: "max",
        pin: "#mobile-wrapper",
        pinSpacing: false,
        markers: showMarkers,
      });

      // Show/hide phone based on section-1
      ScrollTrigger.create({
        trigger: ".section-1",
        start: "top top",
        end: "max",
        markers: showMarkers,
        onEnter: () => {
          gsap.to("#mobile-wrapper", { opacity: 1, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to("#mobile-wrapper", { opacity: 0, duration: 0.3 });
        },
      });

      // Animate each section
      const animateSection = (
        sectionClass,
        xVwValue,
        rotationY = 0,
        screenIndex = 0
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

        // Text animations - separate timeline without scrub
        const section = document.querySelector(sectionClass);
        if (section) {
          const quotes = section.querySelectorAll(".quote");
          const headings = section.querySelectorAll("h2, h3");
          const paragraphs = section.querySelectorAll("p");

          const textTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionClass,
              start: "top center",
              toggleActions: "play none none reverse",
              markers: showMarkers,
            },
          });

          quotes.forEach((quote) => {
            textTl.from(quote, { x: -100, opacity: 0, duration: 0.8 }, "-=0.6");
          });

          headings.forEach((heading) => {
            textTl.from(heading, { y: 50, opacity: 0, duration: 0.6 }, "-=0.4");
          });

          paragraphs.forEach((paragraph) => {
            textTl.from(
              paragraph,
              { y: 30, opacity: 0, duration: 0.6 },
              "-=0.4"
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
          config.screenIndex || 0
        );
      });
    },
    { scope: mainRef, dependencies: [splineApp, sections] }
  );

  return (
    <main
      ref={mainRef}
      className="relative bg-black text-white overflow-visible flex flex-col gap-40"
    >
      {/* Mobile wrapper - pinned */}
      <div
        id="mobile-wrapper"
        className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center pointer-events-none z-50 overflow-visible opacity-0"
      >
        <div ref={phoneRef} className="flex items-center justify-center">
          <Mobile onSplineLoad={setSplineApp} screenIndex={activeScreen} />
        </div>
      </div>

      {/* Children sections */}
      {children}
    </main>
  );
}
