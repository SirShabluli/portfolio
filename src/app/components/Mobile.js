"use client";
import Spline from "@splinetool/react-spline";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Mobile() {
  const sectionRef = useRef(null);

  // הפונקציה הזו רצה ברגע שהמודל נטען בדפדפן
  function onLoad(splineApp) {
    gsap.registerPlugin(ScrollTrigger);

    // 1. מציאת האובייקט לפי השם שנתת לו בתוך ספליין
    const obj = splineApp.findObjectByName("Mobile");

    if (obj) {
      // 2. יצירת האנימציה
      gsap.to(obj.rotation, {
        y: (130 * Math.PI) / 3, // סיבוב של 130 מעלות
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2, // מספר גבוה יותר (כמו 1 או 2) נותן תחושה "חלקה" ופחות נוקשה
        },
      });
    }
  }

  return (
    <section ref={sectionRef} className="h-screen w-full">
      {/* הקישור שהעתקת מספליין הולך לכאן */}
      <Spline
        scene="https://prod.spline.design/y370lu4mUtbuPWMr/scene.splinecode"
        onLoad={onLoad}
      />
    </section>
  );
}
export default Mobile;
