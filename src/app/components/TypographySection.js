"use client";
import { useState } from "react";
import Button from "./Button";

export default function TypographySection({ data }) {
  // Hardcoded alphabet, numbers, and symbols - same for all fonts
  const alphabet =
    "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz";
  const numbers = "0123456789";
  const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  // State לניהול הפונט הנבחר
  const [selectedFont, setSelectedFont] = useState(data.fonts[0]);

  // פונקציה לשינוי הפונט
  const changeFont = (font) => {
    setSelectedFont(font);
  };

  return (
    <section className="grid grid-cols-12 w-full bg-black text-white py-24 px-12 gap-y-12">
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
          className="space-y-2 max-w-4xl text-[2.875rem] leading-[1.28]"
          style={{
            fontFamily: selectedFont.fontFamily,
            fontWeight: selectedFont.weight,
          }}
        >
          <div className="tracking-tight break-words">{alphabet}</div>
          <div className="tracking-tighter">{numbers}</div>
          <div className="opacity-80 break-all">{symbols}</div>
        </div>

        {/* תיאור הפונט בתחתית */}
        <div className="space-y-2 mt-2 pt-8 border-t border-white/10 max-w-xs">
          <h4 className="text-lg font-bold">
            {selectedFont.name} - {selectedFont.weightName}
          </h4>
          <p className="text-sm opacity-60 leading-relaxed font-light">
            {selectedFont.description}
          </p>
        </div>
      </div>
    </section>
  );
}
