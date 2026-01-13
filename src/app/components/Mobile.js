"use client";
import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Mobile() {
  const sectionRef = useRef(null);
  const text1Ref = useRef(null); // ← חדש! ref לטקסט
  const text2Ref = useRef(null); // ← חדש! ref לטקסט
  const text3Ref = useRef(null); // ← חדש! ref לטקסט

  const [splineApp, setSplineApp] = useState(null);

  function onLoad(app) {
    setSplineApp(app);
    console.log("✅ Spline loaded!");
  }

  // ← החדש! אנימציה!
  useGSAP(
    () => {
      if (!splineApp) return; // אם Spline עדיין לא נטען - תצא

      console.log("🎬 Setting up animation...");

      // מצא את הטלפון
      const phone = splineApp.findObjectByName("Mobile");

      if (phone) {
        console.log("📱 Found phone!");

        // צור Timeline אחד עם ScrollTrigger משותף
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            pin: true,
            scrub: 2,
            markers: true,
          },
        });

        // הוסף את האנימציות לטיימליין
        // כל המספרים הם "נקודות זמן" בטיימליין (0 = תחילת הסקרול, 1 = סוף הסקרול)

        tl.fromTo(
          phone.rotation,
          { y: 0 },
          {
            y: Math.PI * 2,
            duration: 0.15, // סיבוב Y: 5% → 20%
          },
          0.05 // מתחיל ב-5%
        )
          .fromTo(
            text1Ref.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.05, // טקסט מופיע: 1% → 6%
            },
            0.01 // מתחיל ב-1%
          )
          .to(
            text1Ref.current,
            {
              opacity: 0,
              duration: 0.05, // טקסט נעלם: 20% → 25%
            },
            0.2 // מתחיל ב-20%
          )
          .fromTo(
            phone.rotation,
            { z: 0 },
            {
              z: Math.PI * 0.5,
              duration: 0.2, // סיבוב Z: 20% → 40%
            },
            0.2 // מתחיל ב-20%
          )
          .to(
            phone.scale,
            {
              x: 1.5,
              y: 1.5,
              z: 1.5,
              duration: 0.2, // scale up: 40% → 60%
            },
            0.4 // מתחיל ב-40% (מיד אחרי סיבוב Z)
          )
          .to(
            phone.position,
            {
              z: 200, // מתקרב למסך (ערך חיובי = קדימה)
              duration: 0.2, // זום פנימה: 40% → 60% (במקביל ל-scale!)
            },
            0.4 // מתחיל ב-40% (באותו זמן כמו scale)
          )
          .to({}, { duration: 0.4 }, 0.6); // dummy animation: 60% → 100%

        console.log("✅ Animation set up!");
      } else {
        console.log("❌ Phone not found!");
      }
    },
    { dependencies: [splineApp], scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="h-[300vh] overflow-visible">
      <div className="pointer-events-none inset-0 w-full h-screen overflow-visible">
        <Spline
          scene="https://prod.spline.design/y370lu4mUtbuPWMr/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
      <div
        ref={text1Ref}
        className="absolute top-[20%] left-[10%] text-white text-6xl font-bold opacity-0"
      >
        <h1>Easy to use</h1>
      </div>
      <div
        ref={text2Ref}
        className="absolute top-[20%] right-[10%] text-white text-6xl font-bold opacity-0"
      >
        <h1>Beautiful design</h1>
      </div>
      <div
        ref={text3Ref}
        className="absolute bottom-[20%] left-[50%] -translate-x-1/2 text-white text-6xl font-bold opacity-0"
      >
        Fast performance
      </div>
    </section>
  );
}

export default Mobile;
