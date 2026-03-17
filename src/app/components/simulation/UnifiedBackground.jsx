// src/components/effects/UnifiedBackground.jsx - רק gradient + wave
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const UnifiedBackground = ({
  // ★ צבעים - ניתנים לשינוי חיצוני
  topColor = "#0a0a1a",
  middleColor = "#1a1a3a",
  bottomColor = "#2a2a5a",
  intensity = 0.3,

  // ★ הגדרות אנימציה - רק wave
  speed = 0.15,
  scale = 1.2,
  layers = 5,
  waveAmplitude = 1.0,
  brightness = 1.0,

  // ★ הגדרות מעבר הדרגתי - מהיר יותר
  transitionDuration = 0.3,
  enableTransitions = true,
  transitionEasing = "easeInOutCubic",
}) => {
  const meshRef = useRef();
  const materialRef = useRef();

  // ★ מצב לניהול מעברים
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStartTime, setTransitionStartTime] = useState(0);
  const [previousProps, setPreviousProps] = useState({});
  const [currentProps, setCurrentProps] = useState({
    topColor,
    middleColor,
    bottomColor,
    intensity,
    speed,
    scale,
    layers,
    waveAmplitude,
    brightness,
  });

  // ★ פונקציות easing
  const easingFunctions = {
    linear: (t) => t,
    easeIn: (t) => t * t * t,
    easeOut: (t) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeInOutCubic: (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  // ★ פונקציה להתחלת מעבר - תיקון לטוגל מהיר
  const startTransition = useCallback(
    (newProps) => {
      if (!enableTransitions) {
        setCurrentProps(newProps);
        return;
      }

      // ★ תיקון: אם כבר במעבר, נעצור אותו ונתחיל חדש
      if (isTransitioning) {
        setIsTransitioning(false);
      }

      setPreviousProps({ ...currentProps });
      setIsTransitioning(true);
      setTransitionStartTime(performance.now());

      setTimeout(() => {
        setCurrentProps(newProps);
        setIsTransitioning(false);
      }, transitionDuration * 1000);
    },
    [currentProps, enableTransitions, transitionDuration, isTransitioning]
  );

  // ★ מעקב אחר שינויים בפרופס וביצוע מעבר
  useEffect(() => {
    const newProps = {
      topColor,
      middleColor,
      bottomColor,
      intensity,
      speed,
      scale,
      layers,
      waveAmplitude,
      brightness,
    };

    // בדיקה האם משהו השתנה
    const hasChanged = Object.keys(newProps).some(
      (key) => newProps[key] !== currentProps[key]
    );

    // ★ תיקון: אפשר מעבר גם אם כבר במעבר (לטוגל מהיר)
    if (hasChanged) {
      startTransition(newProps);
    }
  }, [
    topColor,
    middleColor,
    bottomColor,
    intensity,
    speed,
    scale,
    layers,
    waveAmplitude,
    brightness,
    startTransition,
    currentProps,
    isTransitioning,
  ]);

  // ★ פונקציה לחישוב ערכים במעבר
  const getInterpolatedValue = useCallback((oldValue, newValue, progress) => {
    if (typeof oldValue === "string" && oldValue.startsWith("#")) {
      // אינטרפולציה של צבעים
      const oldColor = new THREE.Color(oldValue);
      const newColor = new THREE.Color(newValue);
      return oldColor.clone().lerp(newColor, progress);
    } else if (typeof oldValue === "number") {
      // אינטרפולציה של מספרים
      return oldValue + (newValue - oldValue) * progress;
    }
    return newValue;
  }, []);

  // ★ שיידר gradient עם wave בלבד
  const createShaderMaterial = useCallback(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speed: { value: currentProps.speed },
        scale: { value: currentProps.scale },
        layers: { value: currentProps.layers },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        topColor: { value: new THREE.Color(currentProps.topColor) },
        middleColor: { value: new THREE.Color(currentProps.middleColor) },
        bottomColor: { value: new THREE.Color(currentProps.bottomColor) },
        colorIntensity: { value: currentProps.intensity },
        waveAmplitude: { value: currentProps.waveAmplitude },
        brightness: { value: currentProps.brightness },
        transitionProgress: { value: 0 },
        isTransitioning: { value: isTransitioning },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float speed;
        uniform float scale;
        uniform int layers;
        uniform vec2 resolution;
        uniform vec3 topColor;
        uniform vec3 middleColor;
        uniform vec3 bottomColor;
        uniform float colorIntensity;
        uniform float waveAmplitude;
        uniform float brightness;
        uniform float transitionProgress;
        uniform bool isTransitioning;
        varying vec2 vUv;
        
        vec3 hash(vec3 p) {
          p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));
          p = -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
          return p;
        }
        
        float noise(in vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          vec3 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)), 
                            dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
                       mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)), 
                            dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
                  mix(mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)), 
                            dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
                       mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)), 
                            dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
        }
        
        void main() {
          vec2 uv = (vUv * resolution.xy - 0.5 * resolution.xy) / resolution.y;
          float t = time * speed;
          
          // רק wave - ללא קפיצות
          uv = uv * scale;
          
          float h = noise(vec3(uv * 2.0, t));
          
          // הלופ המקורי שלך - עם תיקון חלקות
          for (int n = 1; n < 10; n++) {
            if (n >= layers) break;
            float i = float(n);
            uv -= vec2(0.7 / i * sin(i * uv.y + i + t * 5.0 + h * i) + 0.8, 0.4 / i * sin(uv.x + 4.0 - i + h + t * 5.0 + 0.3 * i) + 1.6);
          }
          
          uv -= vec2(1.2 * sin(uv.x + t + h) + 1.8, 0.4 * sin(uv.y + t + 0.3 * h) + 1.6);
          
          // ★ צבעי wave חלקים - כמו המקור
          float wave1 = sin(uv.x * 3.0 + t * speed * 5.0) * 0.5 + 0.5;
          float wave2 = sin(uv.y * 4.0 + t * speed * 3.0) * 0.5 + 0.5;
          vec3 finalColor = mix(mix(bottomColor, middleColor, wave1), topColor, wave2);
          
          finalColor *= colorIntensity;
          
          // ★ אפקט מעבר חלק אם נדרש
          if (isTransitioning) {
            finalColor = mix(finalColor, finalColor * 1.05, sin(transitionProgress * 3.14159) * 0.1);
          }
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    });
  }, [currentProps, isTransitioning]);

  // ★ עדכון אנימציה ומעברים
  useFrame(({ clock }) => {
    if (materialRef.current) {
      const smoothTime = clock.getElapsedTime();
      materialRef.current.uniforms.time.value = smoothTime;

      if (isTransitioning && materialRef.current.uniforms.transitionProgress) {
        const elapsed = (performance.now() - transitionStartTime) / 1000;
        const progress = Math.min(elapsed / transitionDuration, 1);
        const easingFunction =
          easingFunctions[transitionEasing] || easingFunctions.easeInOutCubic;
        const easedProgress = easingFunction(progress);

        materialRef.current.uniforms.transitionProgress.value = easedProgress;
        materialRef.current.uniforms.isTransitioning.value = isTransitioning;

        // עדכון צבעים
        if (materialRef.current.uniforms.topColor) {
          const interpolatedTopColor = getInterpolatedValue(
            previousProps.topColor,
            topColor,
            easedProgress
          );
          if (interpolatedTopColor instanceof THREE.Color) {
            materialRef.current.uniforms.topColor.value = interpolatedTopColor;
          } else {
            materialRef.current.uniforms.topColor.value = new THREE.Color(
              interpolatedTopColor
            );
          }
        }

        if (materialRef.current.uniforms.middleColor) {
          const interpolatedMiddleColor = getInterpolatedValue(
            previousProps.middleColor,
            middleColor,
            easedProgress
          );
          if (interpolatedMiddleColor instanceof THREE.Color) {
            materialRef.current.uniforms.middleColor.value =
              interpolatedMiddleColor;
          } else {
            materialRef.current.uniforms.middleColor.value = new THREE.Color(
              interpolatedMiddleColor
            );
          }
        }

        if (materialRef.current.uniforms.bottomColor) {
          const interpolatedBottomColor = getInterpolatedValue(
            previousProps.bottomColor,
            bottomColor,
            easedProgress
          );
          if (interpolatedBottomColor instanceof THREE.Color) {
            materialRef.current.uniforms.bottomColor.value =
              interpolatedBottomColor;
          } else {
            materialRef.current.uniforms.bottomColor.value = new THREE.Color(
              interpolatedBottomColor
            );
          }
        }

        // עדכון intensity
        const interpolatedIntensity = getInterpolatedValue(
          previousProps.intensity || 0.3,
          intensity,
          easedProgress
        );
        if (materialRef.current.uniforms.colorIntensity) {
          materialRef.current.uniforms.colorIntensity.value =
            interpolatedIntensity;
        }
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 60, 40]} />
      <primitive
        ref={materialRef}
        object={createShaderMaterial()}
        attach="material"
      />
    </mesh>
  );
};

export default UnifiedBackground;
