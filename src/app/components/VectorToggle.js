"use client";
import Image from "next/image";

export default function VectorToggle({
  isDark,
  lightSrc = "/images/vegas/light-icon.svg",
  darkSrc = "/images/vegas/dark-icon.svg",
  glowColor = "#ED174B",
  width = 300,
  height = 300,
  delay = 0,
}) {
  return (
    <div
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
          transition: `opacity ${isDark ? "0.15s" : "0.8s"} ease-in-out`,
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
          transition: isDark
            ? `opacity 0.8s ease-in-out ${delay}s, filter 0.8s ease-in-out ${delay}s`
            : "opacity 0.15s ease-in-out, filter 0.15s ease-in-out",
          filter: isDark
            ? `drop-shadow(0 0 1px ${glowColor}) drop-shadow(0 0 15px ${glowColor})`
            : "none",
        }}
      />
    </div>
  );
}
