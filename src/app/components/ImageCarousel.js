"use client";
import { useRef, useEffect, useState } from "react";

export default function ImageCarousel({
  images = [],
  imgHeight = 320,
  speed = 0.5,
}) {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const offsetRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const halfRef = useRef(0);
  const [ready, setReady] = useState(false);

  const doubled = [...images, ...images];

  // Measure track width after images load
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
      setReady(true);
    };

    const imgs = track.querySelectorAll("img");
    let loaded = 0;
    if (imgs.length === 0) {
      measure();
      return;
    }
    imgs.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === imgs.length) measure();
      } else
        img.addEventListener("load", () => {
          loaded++;
          if (loaded === imgs.length) measure();
        });
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const track = trackRef.current;

    const step = () => {
      if (!isDragging.current) {
        offsetRef.current += speed;
        velocity.current *= 0.92;
      } else {
        offsetRef.current += velocity.current;
      }

      const half = halfRef.current;
      if (offsetRef.current >= half) offsetRef.current -= half;
      if (offsetRef.current < 0) offsetRef.current += half;

      track.style.transform = `translateX(-${offsetRef.current}px)`;
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationRef.current);
  }, [ready, speed]);

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
        style={{ gap: 16, width: "max-content" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {doubled.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className="shrink-0 rounded-sm object-cover pointer-events-none"
            style={{
              height: imgHeight,
              width: "auto",
              border: "0.5px solid rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
