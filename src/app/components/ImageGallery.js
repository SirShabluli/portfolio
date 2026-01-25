"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageGallery({
  images = [],
  initialIndex = 0,
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const totalImages = images.length;
  const anglePerItem = 360 / totalImages;
  const radius = 300; // מרחק מהמרכז

  return (
    <div className="h-[600px] flex items-center justify-center" style={{ perspective: "1000px" }}>
      <div
        className="relative w-[200px] h-[400px] transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${-activeIndex * anglePerItem}deg)`,
        }}
      >
        {images.map((img, i) => {
          const angle = i * anglePerItem;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="absolute w-full h-full transition-all duration-500"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt || "carousel item"}
                width={200}
                height={400}
                className={`rounded-xl w-full h-full object-cover transition-all duration-500 ${
                  i === activeIndex ? "scale-110 shadow-2xl" : "scale-90 opacity-70"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
