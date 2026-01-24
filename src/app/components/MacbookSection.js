"use client";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MacbookSection({
  children,
  sections = [],
  showMarkers = false,
  // Reveal animation config
  initialScale = 1.5, // גודל התחלתי (קרוב)
  finalScale = 0.8, // גודל סופי (רגיל)
  offsetY = -0, // כמה להזיז למעלה כשמוגדל (לצורך מרכוז)
  initialRotationX = 0, // סיבוב התחלתי על X
  finalRotationX = 0.1, // סיבוב סופי על X
  initialRotationY = 0, // סיבוב התחלתי על Y
  finalRotationY = 0.3, // סיבוב סופי על Y
  initialRotationZ = 0, // סיבוב התחלתי על Z
  finalRotationZ = 0, // סיבוב סופי על Z
  // Object names in Spline
  cameraName = "Camera",
  modelName = "macBook",
}) {
  const mainRef = useRef(null);
  const macbookRef = useRef(null);
  const [splineApp, setSplineApp] = useState(null);

  useGSAP(
    () => {
      if (!splineApp) return;

      // Find the camera or macbook model for direct manipulation
      const camera = splineApp.findObjectByName(cameraName);
      const macbookModel = splineApp.findObjectByName(modelName);

      // Store initial positions
      const initialCameraZ = camera ? camera.position.z : 0;
      const initialMacbookZ = macbookModel ? macbookModel.position.z : 0;

      // Reveal animation - move camera closer then back (or move macbook forward then back)
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          markers: showMarkers,
        },
      });

      // Animate macbook scale (zoom effect like PhoneShowcase)
      if (macbookModel) {
        // Store original position and rotation
        const originalY = macbookModel.position.y;
        const originalRotX = macbookModel.rotation.x;
        const originalRotY = macbookModel.rotation.y;
        const originalRotZ = macbookModel.rotation.z;

        // Set initial state - big, offset, and rotated
        macbookModel.scale.set(initialScale, initialScale, initialScale);
        macbookModel.position.y = originalY + offsetY;
        macbookModel.rotation.x = originalRotX + initialRotationX;
        macbookModel.rotation.y = originalRotY + initialRotationY;
        macbookModel.rotation.z = originalRotZ + initialRotationZ;

        // Animate scale down
        revealTl.to(macbookModel.scale, {
          x: finalScale,
          y: finalScale,
          z: finalScale,
          duration: 1,
          ease: "power2.out",
        });

        // Move back to original position
        revealTl.to(
          macbookModel.position,
          {
            y: originalY,
            duration: 1,
            ease: "power2.out",
          },
          0,
        );

        // Rotate to final position on all axes
        revealTl.to(
          macbookModel.rotation,
          {
            x: originalRotX + finalRotationX,
            y: originalRotY + finalRotationY,
            z: originalRotZ + finalRotationZ,
            duration: 1,
            ease: "power2.out",
          },
          0,
        );
      } else if (camera) {
        // Fallback: move camera instead
        revealTl.fromTo(
          camera.position,
          { z: initialCameraZ },
          {
            z: initialCameraZ - revealDistance,
            duration: 1,
            ease: "power2.out",
          },
        );
      }

      // Animate sections (if provided)
      sections.forEach((config, index) => {
        const sectionClass = `.macbook-section-${index + 1}`;

        const macbookTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionClass,
            start: "top top",
            end: "center center",
            scrub: 1,
            markers: showMarkers,
            pin: true,
          },
        });

        // Move macbook via Spline position (x, y, z)
        if (macbookModel) {
          if (config.x !== undefined) {
            macbookTl.to(
              macbookModel.position,
              { x: config.x, duration: 3 },
              0,
            );
          }
          if (config.y !== undefined) {
            macbookTl.to(
              macbookModel.position,
              { y: config.y, duration: 3 },
              0,
            );
          }
          if (config.z !== undefined) {
            macbookTl.to(
              macbookModel.position,
              { z: config.z, duration: 3 },
              0,
            );
          }
          // Rotate macbook
          if (config.rotationY !== undefined) {
            macbookTl.to(
              macbookModel.rotation,
              { y: config.rotationY, duration: 3 },
              0,
            );
          }
          if (config.rotationX !== undefined) {
            macbookTl.to(
              macbookModel.rotation,
              { x: config.rotationX, duration: 3 },
              0,
            );
          }
        }

        // Text animations
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
              "-=0.4",
            );
          });
        }
      });
    },
    { scope: mainRef, dependencies: [splineApp, sections] },
  );

  return (
    <main
      ref={mainRef}
      className="relative bg-black text-white overflow-visible"
    >
      {/* Macbook wrapper - sticky like PhoneShowcase */}
      <div
        id="macbook-wrapper"
        className="sticky top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-50 overflow-visible"
      >
        <div
          ref={macbookRef}
          className="w-full h-full flex items-center justify-center origin-center"
        >
          <Spline
            scene="https://prod.spline.design/IW1wscLboXOUn3QJ/scene.splinecode"
            onLoad={(app) => setSplineApp(app)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Children sections - offset by -100vh like PhoneShowcase */}
      {children && (
        <div className="relative" style={{ marginTop: "-100vh" }}>
          {children}
        </div>
      )}
    </main>
  );
}
