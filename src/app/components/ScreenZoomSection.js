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
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5, // smoother scrub
          ease: "none",
        },
      });

      // zoom out + move to side - smoother with ease
      tl.fromTo(
        imageRef.current,
        { scale: 1.3, x: "0" },
        { scale: 0.7, x: "-25%", duration: 1, ease: "power2.inOut" },
      );

      // text fades in
      tl.fromTo(
        textRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-black overflow-visible"
    >
      {/* Image Grid */}
      <div className="absolute inset-0 grid grid-cols-12 gap-8 mx-auto h-full items-center px-8">
        <div ref={imageRef} className="col-start-3 col-span-8">
          <Image
            src={imageSrc}
            alt={alt}
            width={1920}
            height={1080}
            className="w-full rounded-xl"
          />
        </div>
      </div>

      {/* Text Grid */}
      <div className="absolute inset-0 grid grid-cols-12 gap-8 mx-auto h-full items-center px-8 pointer-events-none">
        <div
          ref={textRef}
          className="col-span-3 col-start-9 text-white pointer-events-auto"
        >
          {title && <h2 className="text-4xl font-bold mb-4">{title}</h2>}
          {description && (
            <p className="text-gray-400 text-lg">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
