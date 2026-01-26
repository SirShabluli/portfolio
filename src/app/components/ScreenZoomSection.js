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
          start: "top top-=10%",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      // zoom out + move to side + move down to center
      tl.fromTo(
        imageRef.current,
        { scale: 2.2, x: "0", y: "0" },
        { scale: 1.2, x: "-30%", y: "20%", duration: 1 },
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
      className="relative h-screen bg-black overflow-hidden"
    >
      <div className="absolute inset-0 flex items-start justify-center">
        {/* Image */}
        <div
          ref={imageRef}
          className="w-full max-w-5xl px-8"
          style={{ transformOrigin: "top center" }}
        >
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
