"use client";
import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

function Mobile({ onSplineLoad }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Spline
        scene="https://prod.spline.design/y370lu4mUtbuPWMr/scene.splinecode"
        onLoad={(app) => onSplineLoad(app)}
      />
    </div>
  );
}

export default Mobile;
