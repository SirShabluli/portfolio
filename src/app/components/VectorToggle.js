"use client";
import Image from "next/image";

export default function VectorToggle({
  isDark,
  onToggle,
  lightSrc = "/images/vegas/light-icon.svg",
  darkSrc = "/images/vegas/dark-icon.svg",
  glowColor = "#ED174B",
  width = 300,
  height = 300,
}) {
  return (
    <button
      onClick={onToggle}
      className="cursor-pointer"
      style={{ position: "relative", width, height }}
    >
      {/* Light mode icon */}
      <Image
        src={lightSrc}
        alt="Light mode"
        fill
        style={{
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: isDark ? 0 : 1,
          transition: "all 0.5s ease-in-out",
        }}
      />
      {/* Dark mode icon */}
      <Image
        src={darkSrc}
        alt="Dark mode"
        fill
        style={{
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: isDark ? 1 : 0,
          transition: "all 0.5s ease-in-out",
          filter: isDark
            ? `drop-shadow(0 0 5px ${glowColor}) drop-shadow(0 0 15px ${glowColor})`
            : "none",
        }}
      />
    </button>
  );
}
