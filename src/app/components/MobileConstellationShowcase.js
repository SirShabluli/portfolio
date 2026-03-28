"use client";
import Image from "next/image";
import TextBlock from "./TextBlock";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SLIDES = [
  {
    id: "clouds",
    label: "Entity Clouds",
    title: "Semantic Clusters",
    body: "After AI analysis, semantically related words cluster into floating clouds. Each cloud has a central concept with satellite words orbiting it — showing emotional themes side by side.",
    gif: "/images/pagmar/constellation-clouds.gif",
  },
  {
    id: "tunnel",
    label: "Tunnel",
    title: "Key Insights",
    body: "Key insights are placed on rotating circular rings receding into depth. Longer texts get larger rings. Looking through the tunnel gives a sense of accumulated layered thought.",
    gif: "/images/pagmar/constellation-tunnel.gif",
  },
  {
    id: "scattered",
    label: "Scattered",
    title: "Raw Input",
    body: "Words appear as they are written — unorganized, raw, filling the space. This is the unprocessed state before AI makes sense of it.",
    gif: "/images/pagmar/constellation-scattered.gif",
  },
];

function Indicator({ slides, activeStep, swiperRef }) {
  return (
    <div className="flex items-center justify-center gap-1 py-4 px-4">
      {slides.map((slide, i) => {
        const isActive = i === activeStep;
        return (
          <button
            key={slide.id}
            onClick={() => swiperRef?.slideTo(i)}
            className="text-xs font-bold tracking-widest uppercase px-2 py-2 transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: isActive ? "#ffffff" : "transparent",
              color: isActive ? "#000000" : "#ffffff",
              border: "1px solid #ffffff",
              opacity: isActive ? 1 : 0.5,
            }}
          >
            {slide.label}
          </button>
        );
      })}
    </div>
  );
}

export default function MobileConstellationShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="flex flex-col bg-black" style={{ height: "100svh" }}>
      <Swiper
        direction="horizontal"
        initialSlide={0}
        touchAngle={30}
        speed={400}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
        style={{ width: "100%", flex: 1, minHeight: 0, color: "#ffffff" }}
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-screen flex flex-col h-full px-8 pt-16 pb-4 gap-6">
              {/* GIF */}
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <Image
                  src={slide.gif}
                  alt={slide.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
              {/* Text */}
              <TextBlock label={slide.label} title={slide.title}>
                {slide.body}
              </TextBlock>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Indicator
        slides={SLIDES}
        activeStep={activeStep}
        swiperRef={swiperRef}
      />
    </div>
  );
}
