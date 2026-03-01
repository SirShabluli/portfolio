"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function ColorPalette({
  colors,
  isDark = true,
  description,
  darkTextStyle,
  onToggle,
  lightBgColor,
  lightTextColor,
}) {
  const containerRef = useRef(null);
  const [activeColorId, setActiveColorId] = useState(null);

  const hasDarkStyle = isDark && darkTextStyle;

  return (
    <section
      className={`w-full h-full transition-colors duration-500 ${
        isDark ? "text-white" : lightTextColor ? "" : "text-black"
      }`}
      style={{
        backgroundColor: isDark ? "#000000" : lightBgColor || "#FFFFFF",
        ...(!isDark && lightTextColor ? { color: lightTextColor } : {}),
      }}
    >
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-12 h-full py-24 px-12 items-start justify-center">
        <div className="col-span-3 space-y-8">
          <span
            className="text-[46px] font-medium"
            style={
              hasDarkStyle
                ? {
                    WebkitTextStroke: `1px ${darkTextStyle.strokeColor}`,
                    WebkitTextFillColor: darkTextStyle.fillColor,
                  }
                : {}
            }
          >
            Colour
          </span>
          <p
            className="text-sm w-[70%] leading-relaxed"
            style={hasDarkStyle ? { color: darkTextStyle.fillColor } : {}}
          >
            {description ||
              "Keeping the same theme of Netflix while adding warmth and prestige"}
          </p>
        </div>

        <div
          ref={containerRef}
          className="col-span-7 col-start-5 flex h-full gap-2 justify-center items-stretch"
        >
          {colors.map((color) => (
            <ColorStrip
              key={color.id}
              color={color}
              isDark={isDark}
              isActive={activeColorId === color.id}
              onClick={() =>
                setActiveColorId(activeColorId === color.id ? null : color.id)
              }
              isMobile={false}
            />
          ))}
        </div>
      </div>

      {/* Mobile layout - stacked, always open */}
      <div className="flex md:hidden flex-col py-12 px-6">
        <span
          className="text-[36px] font-medium"
          style={
            hasDarkStyle
              ? {
                  WebkitTextStroke: `1px ${darkTextStyle.strokeColor}`,
                  WebkitTextFillColor: darkTextStyle.fillColor,
                }
              : {}
          }
        >
          Colour
        </span>
        <p
          className="text-sm leading-relaxed mb-4"
          style={hasDarkStyle ? { color: darkTextStyle.fillColor } : {}}
        >
          {description ||
            "Keeping the same theme of Netflix while adding warmth and prestige"}
        </p>
        {colors.map((color) => (
          <ColorStrip
            key={color.id}
            color={color}
            isDark={isDark}
            isActive={true}
            onClick={() => {}}
            isMobile={true}
          />
        ))}
      </div>
    </section>
  );
}

function ColorStrip({ color, isDark, isActive, onClick, isMobile }) {
  const contentRef = useRef(null);
  const stripRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    gsap.killTweensOf([stripRef.current, contentRef.current]);

    if (isActive) {
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
      gsap.to(stripRef.current, {
        flexGrow: 1.5,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, { opacity: 0, y: 0, duration: 0.0 });
    } else {
      gsap.to(stripRef.current, {
        flexGrow: 1,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, { opacity: 0, y: 0, duration: 0.0 });
    }
  }, [isActive, isHovered, isMobile]);

  if (isMobile) {
    return (
      <div
        className="relative overflow-hidden "
        style={{
          backgroundColor: color.hex,
          minHeight: "10px",
          ...(color.border
            ? {
                border: `1px solid rgba(${isDark ? "255, 255, 255" : "0, 0, 0"}, 0.5)`,
              }
            : {}),
        }}
      >
        <div
          className="p-5 flex flex-col justify-end h-full"
          style={{ color: color.textColor }}
        >
          <span className="text-md font-bold uppercase">{color.name}</span>
          <p className="text-xs opacity-80 mt-1">{color.description}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest mt-3">
            HEX: {color.hex}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={stripRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative flex-grow cursor-pointer overflow-hidden"
      style={{
        backgroundColor: color.hex,
        ...(color.border
          ? {
              border: `1px solid rgba(${isDark ? "255, 255, 255" : "0, 0, 0"}, 0.5)`,
            }
          : {}),
      }}
    >
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
