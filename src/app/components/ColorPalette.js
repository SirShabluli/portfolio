"use client";
import { useRef } from "react";
import gsap from "gsap";

export default function ColorPalette({ colors }) {
  const containerRef = useRef(null);

  return (
    <section className="grid grid-cols-12 w-full bg-black text-white py-24 px-12 items-start">
      {/* כותרת וטקסט בצד שמאל */}
      <div className="col-span-3 space-y-8">
        <h3 className="text-2xl font-medium">Colour</h3>
        <p className="text-sm opacity-60 max-w-[180px] leading-relaxed">
          Keeping the same theme of Netflix while adding warmth and prestige
        </p>
      </div>

      {/* קונטיינר הסטריפים - עמודות 4-12 */}
      <div
        ref={containerRef}
        className="col-span-8 flex h-[40vh] gap-2 items-stretch"
      >
        {colors.map((color) => (
          <ColorStrip key={color.id} color={color} />
        ))}
      </div>
    </section>
  );
}

function ColorStrip({ color }) {
  const contentRef = useRef(null);
  const stripRef = useRef(null);

  const onEnter = () => {
    // ביטול אנימציות קודמות
    gsap.killTweensOf([stripRef.current, contentRef.current]);

    // הרחבת הסטריפ
    gsap.to(stripRef.current, {
      flexGrow: 4,
      duration: 0.6,
      ease: "power2.out",
    });
    // הצגת התוכן רק אחרי שהסטריפ סיים להתרחב
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.6,
      ease: "linear",
    });
  };

  const onLeave = () => {
    // ביטול אנימציות קודמות
    gsap.killTweensOf([stripRef.current, contentRef.current]);

    // החזרה למצב רגיל
    gsap.to(stripRef.current, {
      flexGrow: 1,
      duration: 0.4,
      ease: "linear",
    });
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.1,
    });
  };

  return (
    <div
      ref={stripRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative flex-grow cursor-pointer transition-all overflow-hidden "
      style={{ backgroundColor: color.hex }}
    >
      {/* פרטי הצבע שמופיעים ב-Hover */}
      <div
        ref={contentRef}
        className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 translate-y-4"
        style={{ color: color.textColor }}
      >
        <span className="text-lg font-bold uppercase">{color.name}</span>
        <p className="text-xs opacity-80 mt-2 max-w-30">{color.description}</p>
        <div className="mt-8 space-y-1 font-mono text-[10px] uppercase tracking-widest">
          <p>HEX: {color.hex}</p>
          {/* כאן אפשר להוסיף RGB וכו' */}
        </div>
      </div>
    </div>
  );
}
