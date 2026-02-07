"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function ColorPalette({ colors, isDark = true, description, darkTextStyle, onToggle, lightBgColor, lightTextColor }) {
  const containerRef = useRef(null);
  const [activeColorId, setActiveColorId] = useState(null);

  const hasDarkStyle = isDark && darkTextStyle;

  return (
    <section
      className={`grid grid-cols-12 w-full h-full py-24 px-12 items-start justify-center transition-colors duration-500 ${
        isDark ? "text-white" : (lightTextColor ? "" : "text-black")
      }`}
      style={{
        backgroundColor: isDark ? "#000000" : (lightBgColor || "#FFFFFF"),
        ...((!isDark && lightTextColor) ? { color: lightTextColor } : {}),
      }}
    >
      {/* כותרת וטקסט בצד שמאל */}
      <div className="col-span-3 space-y-8">
        <span
          className="text-[46px] font-medium"
          style={hasDarkStyle ? {
            WebkitTextStroke: `1px ${darkTextStyle.strokeColor}`,
            WebkitTextFillColor: darkTextStyle.fillColor,
          } : {}}
        >
          Colour
        </span>
        <p className="text-sm w-[70%] leading-relaxed" style={hasDarkStyle ? { color: darkTextStyle.fillColor } : {}}>
          {description || "Keeping the same theme of Netflix while adding warmth and prestige"}
        </p>
        {onToggle && (
          <button
            onClick={onToggle}
            className={`px-4 py-2 rounded-full text-sm font-medium tracking-wider transition-all duration-300 ${
              isDark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {isDark ? "Light" : "Dark"}
          </button>
        )}
      </div>

      {/* קונטיינר הסטריפים - עמודות 4-12 */}
      <div
        ref={containerRef}
        className="col-span-7 col-start-5 flex h-full gap-2 justify-center items-stretch"
      >
        {colors.map((color) => (
          <ColorStrip
            key={color.id}
            color={color}
            isActive={activeColorId === color.id}
            onClick={() =>
              setActiveColorId(activeColorId === color.id ? null : color.id)
            }
          />
        ))}
      </div>
    </section>
  );
}

function ColorStrip({ color, isActive, onClick }) {
  const contentRef = useRef(null);
  const stripRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // כל האנימציות במקום אחד - מגיב ל-isActive
  useEffect(() => {
    gsap.killTweensOf([stripRef.current, contentRef.current]);

    if (isActive) {
      // פתוח
      gsap.to(stripRef.current, {
        flexGrow: 4,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        delay: 0.1,
      });
    } else if (isHovered) {
      // Hover בלבד
      gsap.to(stripRef.current, {
        flexGrow: 1.5,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, { opacity: 0, y: 0, duration: 0.0 });
    } else {
      // סגור
      gsap.to(stripRef.current, {
        flexGrow: 1,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, { opacity: 0, y: 0, duration: 0.0 });
    }
  }, [isActive, isHovered]);

  return (
    <div
      ref={stripRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative flex-grow cursor-pointer overflow-hidden"
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
        </div>
      </div>
    </div>
  );
}
