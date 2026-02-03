"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function PathSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrolled = windowHeight - rect.top;
      const total = sectionHeight + windowHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      path.style.strokeDashoffset = pathLength * (1 - progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh] w-[50vw] px-10 bg-black"
    >
      {/* SVG Path */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full overflow-visible">
        <path
          ref={pathRef}
          d="M 0 0 V 3000"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Content */}
      <div className="flex flex-col gap-[50vh] pt-0 relative">
        {/* טקסט */}
        <div className="z-10 bg-black p-4 self-center max-w-sm">
          <h2 className="text-lg text-white">
            “Sleepy tabby cat on a couch, paws hanging down, warm evening light,
            cozy illustrated style”
          </h2>
        </div>

        {/* תמונה */}
        <div className="z-10 self-center w-1/3 w-64 h-80  relative">
          <Image
            src="/images/catFrame1.png"
            fill
            className="object-cover border-20 border-black"
            alt="Scene 1"
          />
        </div>

        {/* פס שמעליו כיתוב ותמונה */}
        <div className="relative z-10 self-center flex flex-col items-center">
          <p className="uppercase text-xs tracking-tighter opacity-60 mb-2 text-white">
            Scene 02: The Transformation
          </p>
          <div className="w-64 h-80 relative">
            <Image
              src="/images/catFrame2.png"
              fill
              className="object-cover"
              alt="Scene 2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
