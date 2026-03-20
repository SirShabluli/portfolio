"use client";
import { useState } from "react";
import Image from "next/image";

export default function ScrollDissolve({ before, after, alt, width = 1920, height = 1080, className, style }) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className={`relative select-none cursor-pointer ${className ?? ""}`}
      style={style}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      <Image src={before} alt={alt} width={width} height={height} className="w-full h-auto block" />
      <Image
        src={after}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 w-full h-auto transition-opacity duration-300"
        style={{ opacity: pressed ? 1 : 0 }}
      />
    </div>
  );
}
