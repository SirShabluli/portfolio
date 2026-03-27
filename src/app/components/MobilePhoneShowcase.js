"use client";
import Image from "next/image";
import TextBlock from "./TextBlock";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Indicator({ steps, activeStep, textColor, bgColor, swiperRef }) {
  const canGoLeft = activeStep > 0;
  const canGoRight = activeStep < steps.length - 1;

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <button
        onClick={() => swiperRef?.slidePrev()}
        className="w-8 h-8 flex items-center justify-center border transition-opacity duration-300"
        style={{
          color: textColor,
          opacity: canGoLeft ? 1 : 0,
          borderColor: textColor,
          background: "none",
          cursor: canGoLeft ? "pointer" : "default",
        }}
      >
        ←
      </button>
      <span
        className="text-xs font-bold tracking-widest uppercase px-4 py-2"
        style={{
          backgroundColor: textColor,
          color: bgColor,
        }}
      >
        {steps[activeStep]}
      </span>
      <button
        onClick={() => swiperRef?.slideNext()}
        className="w-8 h-8 flex items-center justify-center border transition-opacity duration-300"
        style={{
          color: textColor,
          opacity: canGoRight ? 1 : 0,
          borderColor: textColor,
          background: "none",
          cursor: canGoRight ? "pointer" : "default",
        }}
      >
        →
      </button>
    </div>
  );
}

export default function MobilePhoneShowcase({
  section,
  bgColor = "#23577A",
  textColor = "#ffffff",
}) {
  const [activeStep, setActiveStep] = useState(1);
  const [swiperRef, setSwiperRef] = useState(null);

  const steps = [
    section.challenge.label,
    section.screenName || "screen",
    section.solution.label,
  ];

  return (
    <div className="flex flex-col" style={{ backgroundColor: bgColor }}>
      <Swiper
        direction="horizontal"
        initialSlide={1}
        touchAngle={30}
        speed={400}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
        style={{ width: "100%", color: textColor }}
      >
        {/* Slide 1 - Challenge */}
        <SwiperSlide>
          <div className="w-screen flex flex-col justify-center h-screen px-8 pt-16 gap-6">
            <TextBlock
              label={section.challenge.label}
              title={section.challenge.title}
            >
              {section.challenge.body}
            </TextBlock>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Phone */}
        <SwiperSlide>
          <div className="w-screen flex items-end justify-center h-screen">
            {section.screenSrc && (
              <Image
                src={section.screenSrc}
                alt={`Screen ${section.id}`}
                width={400}
                height={800}
                className="w-[80vw] h-auto"
              />
            )}
          </div>
        </SwiperSlide>

        {/* Slide 3 - Solution */}
        <SwiperSlide>
          <div className="w-screen flex flex-col justify-center h-screen px-8 pt-16 gap-6">
            <TextBlock
              label={section.solution.label}
              title={section.solution.title}
            >
              {section.solution.body}
            </TextBlock>
          </div>
        </SwiperSlide>
      </Swiper>

      <Indicator
        steps={steps}
        activeStep={activeStep}
        textColor={textColor}
        bgColor={bgColor}
        swiperRef={swiperRef}
      />
    </div>
  );
}
