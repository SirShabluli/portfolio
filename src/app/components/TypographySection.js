"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Button from "./Button";

export default function TypographySection({
  data,
  bgColor = "black",
  textColor = "white",
}) {
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
      duration: 0.4,
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
        ease: "power2.out",
      })
      .fromTo(
        descriptionRef.current,
        { opacity: 0, x: 20 }, // מתחיל מימין
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3", // מתחיל קצת לפני שהטקסט מסיים (Overlap)
      );
  };

  return (
    <section
      className="grid grid-cols-4 lg:grid-cols-12 w-full min-h-screen py-16 lg:py-24 px-3 lg:px-12 gap-x-3 gap-y-8 lg:gap-y-12 transition-colors duration-500"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* כותרת הסקשן בצד שמאל (עמודות 1-3) */}
      <div className="col-span-4 lg:col-span-3 lg:col-start-1 flex flex-col gap-4">
        <span className="text-5xl font-medium tracking-tight">Typography</span>
        <p className="hidden lg:flex lg:mt-2 font-medium tracking-tight max-w-[66%]">
          I decided to go with easy going vibe, i had to mix the good and feel
          while not in the exchange of readablity
        </p>
      </div>

      {/* תוכן הפונט (עמודות 4-12) */}
      <div className="col-span-4 lg:col-span-5 lg:col-start-6 lg:mt-7 space-y-6">
        {/* תוויות הפונט (Badges) - דינמיות מה-data */}
        <div className="flex gap-2">
          {data.fonts.map((font) => {
            const isSelected = selectedFont.id === font.id;
            return (
              <Button
                key={font.id}
                variant={isSelected ? "filled" : "outline"}
                color={textColor}
                style={isSelected ? { color: bgColor } : {}}
                onClick={() => !isSelected && changeFont(font)}
                size="small"
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = textColor + "33";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {font.name} {font.weightName}
              </Button>
            );
          })}
        </div>

        {/* תצוגת האותיות - כאן קורה הקסם הוויזואלי */}
        <div
          className="space-y-2 max-w-4xl min-h-85 text-4xl lg:text-5xl justify-center leading-[1.28] overflow-hidden"
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
        <div className=" space-y-1 mt-2 lg:max-w-[40%]">
          <div ref={descriptionRef}>
            <span className="text-xl lg:text-lg">{selectedFont.name}</span>
            <p className=" text-sm lg:text-xs leading-relaxed font-light">
              {selectedFont.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
