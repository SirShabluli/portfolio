"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScreenZoomSection({
  imageSrc,
  title,
  description,
  alt = "Screen",
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      // התמונה מתחילה גדולה ומתקרבת, ואז מתרחקת זזה לצד
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=10%",
          end: "+=150%",
          pin: true,
          scrub: 2,
        },
      });

      // zoom out + move to side
      tl.fromTo(
        imageRef.current,
        { scale: 1.3, x: "0" },
        { scale: 0.6, x: "-25%", duration: 1 },
      );

      // text fades in
      tl.fromTo(
        textRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5 },
        "-=0.3",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-black overflow-visible "
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Image */}
        <div ref={imageRef} className="w-full max-w-5xl px-8">
          <Image
            src={imageSrc}
            alt={alt}
            width={1920}
            height={1080}
            className="w-full rounded-xl"
          />
        </div>
      </div>

      {/* Text - on the right */}
      <div
        ref={textRef}
        className="absolute right-8 top-1/2 -translate-y-1/2 max-w-md text-white"
      >
        {title && <h2 className="text-4xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-gray-400 text-lg">{description}</p>}
      </div>
    </section>
  );
}
