"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function ImageCarousel({ images = [], imgWidth = 500, imgHeight = 320, speed = 0.5 }) {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const offsetRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  const doubled = [...images, ...images];
  const gap = 16;
  const itemWidth = imgWidth + gap;
  const half = itemWidth * images.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      if (!isDragging.current) {
        offsetRef.current += speed;
        velocity.current *= 0.95;
      } else {
        offsetRef.current += velocity.current;
      }

      if (offsetRef.current >= half) offsetRef.current -= half;
      if (offsetRef.current < 0) offsetRef.current += half;

      track.style.transform = `translateX(-${offsetRef.current}px)`;
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationRef.current);
  }, [half, speed]);

  const onPointerDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    velocity.current = 0;
    trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const delta = lastX.current - e.clientX;
    velocity.current = delta;
    offsetRef.current += delta;
    lastX.current = e.clientX;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ height: imgHeight }}
    >
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap, width: "max-content" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 rounded-sm overflow-hidden"
            style={{ width: imgWidth, height: imgHeight }}
          >
            <Image src={src} alt="" fill className="object-cover pointer-events-none" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
