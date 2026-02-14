"use client";
import Image from "next/image";

export default function DayNightToggle({ isDark, onToggle, scale = 1 }) {
  return (
    <button
      onClick={onToggle}
      style={{ transform: `scale(${scale})` }}
      className={`relative w-20 h-10 rounded-full transition-colors duration-500 origin-center ${
        isDark
          ? "bg-black border border-[#CCDEE2] shadow-[0_0_0_1px_#2B6CB5,inset_0_0_0_1px_#2B6CB5]"
          : "bg-[#23577A] border border-transparent shadow-[0_0_0_1px_transparent,inset_0_0_0_1px_transparent]"
      }`}
    >
      {/* Sun icon (visible in light mode, opposite side of knob) */}
      <Image
        src="/images/vegas/toggleButton/sun.svg"
        alt="Sun"
        width={24}
        height={24}
        className={`absolute top-1/2 -translate-y-1/2 right-1.5 transition-opacity duration-500 ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Moon icon (visible in dark mode, opposite side of knob) */}
      <Image
        src="/images/vegas/toggleButton/moon.svg"
        alt="Moon"
        width={24}
        height={24}
        className={`absolute top-1/2 -translate-y-1/2 left-1.5 transition-opacity duration-500 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Knob */}
      <span
        className={`absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full transition-all duration-200 flex items-center justify-center ${
          isDark
            ? "left-11 bg-black border border-[#FEDCBB] shadow-[0_0_0_1px_#EC2426,inset_0_0_0_1px_#EC2426]"
            : "left-1.5 bg-white border border-transparent shadow-none"
        }`}
      >
        <span
          className={`w-5 h-5 rounded-full transition-all duration-500 flex items-center justify-center ${
            isDark
              ? "bg-black border border-[#FEDCBB] shadow-[0_0_0_1px_#EC2426,inset_0_0_0_1px_#EC2426]"
              : "bg-white border border-transparent"
          }`}
        >
          <span
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              isDark
                ? "bg-black border border-[#FEDCBB] shadow-[0_0_0_1px_#EC2426,inset_0_0_0_1px_#EC2426]"
                : "bg-white border border-transparent"
            }`}
          />
        </span>
      </span>
    </button>
  );
}
