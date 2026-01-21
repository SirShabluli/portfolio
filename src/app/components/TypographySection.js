"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Button from "./Button";

export default function TypographySection({ data }) {
  // Hardcoded alphabet, numbers, and symbols - same for all fonts
  const alphabet =
    "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz";
  const numbers = "0123456789";
  const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  const contentRef = useRef(null);
  const descriptionRef = useRef(null);
  // State לניהול הפונט הנבחר
  const [selectedFont, setSelectedFont] = useState(data.fonts[0]);

  // פונקציה לשינוי הפונט
  const changeFont = (font) => {
    const tl = gsap.timeline();
    // 1. אנימציית יציאה - כל אחד בסגנון שלו
    tl.to(contentRef.current, {
      opacity: 0,
      filter: "blur(15px)", // הטקסט מיטשטש
      scale: 0.98, // מתכווץ טיפה
      duration: 0.7,
      ease: "power2.in",
    })
      .to(
        descriptionRef.current,
        {
          opacity: 0,
          x: -20, // התיאור בורח שמאלה
          duration: 0.3,
          ease: "power2.in",
        },
        "<",
      ) // מתחיל יחד עם הטקסט

      // 2. שינוי ה-State באמצע
      .call(() => setSelectedFont(font))

      // 3. אנימציית כניסה - חזרה לחיים
      .to(contentRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)", // נותן קפיצה קטנה בסוף
      })
      .fromTo(
        descriptionRef.current,
        { opacity: 0, x: 20 }, // מתחיל מימין
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3", // מתחיל קצת לפני שהטקסט מסיים (Overlap)
      );
  };

  return (
    <section className="grid grid-cols-12 w-full min-h-screen bg-black text-white py-24 px-12 gap-y-12">
      {/* כותרת הסקשן בצד שמאל (עמודות 1-3) */}
      <div className="col-span-2 col-start-1">
        <h3 className="text-sm font-medium tracking-tight">Typography</h3>
      </div>

      {/* תוכן הפונט (עמודות 4-12) */}
      <div className="col-span-6 col-start-4 space-y-12">
        {/* תוויות הפונט (Badges) - דינמיות מה-data */}
        <div className="flex gap-2">
          {data.fonts.map((font) => (
            <Button
              key={font.id}
              variant={selectedFont.id === font.id ? "outline" : "unselected"}
              onClick={() => changeFont(font)}
            >
              {font.name} {font.weightName}
            </Button>
          ))}
        </div>

        {/* תצוגת האותיות - כאן קורה הקסם הוויזואלי */}
        <div
          className="space-y-2 max-w-4xl min-h-85 text-[2.875rem] justify-center leading-[1.28] overflow-hidden"
          style={{
            fontFamily: selectedFont.fontFamily,
            fontWeight: selectedFont.weight,
          }}
          ref={contentRef}
        >
          <div className="tracking-tight wrap-break-word">{alphabet}</div>
          <div className="tracking-tighter">{numbers}</div>
          <div className="opacity-80 break-all">{symbols}</div>
        </div>

        {/* תיאור הפונט בתחתית */}
        <div className="space-y-1 mt-4 max-w-l ">
          <div ref={descriptionRef}>
            {/* <h4 className="text-lg font-bold">
              {selectedFont.name} - {selectedFont.weightName}
            </h4> */}
            <p className="text-xs opacity-60 leading-relaxed font-light">
              {selectedFont.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
