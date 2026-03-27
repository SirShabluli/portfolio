"use client";
import Image from "next/image";
import TextBlock from "./TextBlock";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Indicator({ steps, activeStep, textColor, bgColor, swiperRef }) {
  return (
    <div className="flex items-center justify-center gap-1 py-4 px-4">
      {steps.map((label, i) => {
        const isActive = i === activeStep;
        return (
          <button
            key={i}
            onClick={() => swiperRef?.slideTo(i)}
            className="text-xs font-bold tracking-widest uppercase px-2 py-2 transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: isActive ? textColor : "transparent",
              color: isActive ? bgColor : textColor,
              border: `1px solid ${textColor}`,
              opacity: isActive ? 1 : 0.5,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function MobilePhoneShowcase({
  section,
  bgColor = "#23577A",
  textColor = "#ffffff",
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  const steps = ["Challenge", section.screenNam || "Screen", "Solution"];

  return (
    <div className="flex flex-col h-full " style={{ backgroundColor: bgColor }}>
      <Swiper
        direction="horizontal"
        initialSlide={0}
        touchAngle={30}
        speed={400}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
        style={{ width: "100%", flex: 1, minHeight: 0, color: textColor }}
      >
        {/* Slide 1 - Challenge */}
        <SwiperSlide>
          <div className="w-screen flex flex-col justify-center  h-full px-8 pt-16 gap-6">
            {section.screenName && (
              <h2
                className="text-5xl items-center opacity-70 font-medium italic"
                style={{ color: textColor }}
              >
                {section.screenName}
              </h2>
            )}
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
          <div className="w-screen flex items-end justify-center h-full">
            {section.screenSrc && (
              <Image
                src={section.screenSrc}
                alt={`Screen ${section.id}`}
                width={400}
                height={800}
                className="w-[75vw] h-auto"
              />
            )}
          </div>
        </SwiperSlide>

        {/* Slide 3 - Solution */}
        <SwiperSlide>
          <div className="w-screen flex flex-col justify-center h-full px-8 pt-16 gap-6">
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
