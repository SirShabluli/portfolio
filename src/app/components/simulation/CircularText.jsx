// src/components/text/CircularText.jsx
import React, { useRef, useMemo, useEffect, Suspense } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getFont } from "./fonts";

const CircularText = ({ position = [0, 0, 0], ...otherProps }) => {
  const {
    text = "טקסט מסתובב על עיגול",
    radius = 3,
    fontSize = 0.4,
    color = "#ff4444",
    font = getFont("server-medium", true),
    speed = 0.5, // מהירות הסיבוב (0 = לא מסתובב)
    direction = "auto", // ← שינוי: "auto" | 1 | -1
    startAngle = 0, // זווית התחלה (ברדיאנים)
    spacing = 0.8, // מרווח בין אותיות (מכפיל)
    outlineWidth = 0.0,
    outlineColor = "#000000",
    clockwise = "auto", // ← שינוי: "auto" | true | false
    tunnelMode = false,
    letterTilt = 0.5,
    opacity = 1.0, // ← added
    ...restProps
  } = otherProps;

  if (!text || typeof text !== "string") {
    return null;
  }

  const stablePosition = useMemo(
    () => position,
    [position[0], position[1], position[2]]
  );
  const groupRef = useRef();

  const prevPosition = useRef(position);

  useEffect(() => {
    prevPosition.current = position;
  }, [position]);

  // זיהוי עברית
  const isHebrew = /[\u0590-\u05FF]/.test(text);

  // קביעת כיוון אוטומטי
  const finalDirection = direction === "auto" ? (isHebrew ? -1 : 1) : direction;
  const finalClockwise = clockwise === "auto" ? isHebrew : clockwise;

  // פונקציה לחישוב גודל אופטימלי
  const calculateOptimalLayout = useMemo(() => {
    if (!text || text.length === 0) return { fontSize, spacing };

    const textLength = text.length;
    const targetAngle = Math.PI * 1.6; // 80% מהעיגול (נשאיר מקום נושם)

    // חישוב spacing אידיאלי
    const optimalSpacing = targetAngle / textLength;

    // חישוב fontSize אידיאלי (יחסית לradius ולspacing)
    const calculatedFontSize = Math.min(
      optimalSpacing * radius * 0.6, // יחס בסיסי
      fontSize * 1.5, // לא יותר מפי 1.5 מהמקורי
      1.2 // גבול עליון מוחלט
    );

    // גבול תחתון לקריאות
    const finalFontSize = Math.max(calculatedFontSize, 0.4);

    return {
      fontSize: finalFontSize,
      spacing: (optimalSpacing * radius) / finalFontSize, // תיקון יחסי
    };
  }, [text, radius, fontSize]);

  // חישוב מיקומי האותיות על העיגול
  const letterPositions = useMemo(() => {
    if (!text) return [];

    const letters = isHebrew
      ? String(text).split("").reverse()
      : String(text).split("");
    const totalLetters = letters.length;

    // חישוב הזווית הכוללת שהטקסט יתפוס על העיגול
    const fontSizeFactor = 0.8 + (fontSize - 0.4) * 0.3; // ככל שהפונט גדול, factor גדול יותר
    const totalAngle =
      (totalLetters * spacing * fontSize * fontSizeFactor) / radius;

    // זווית בין כל אות
    const angleStep = totalAngle / totalLetters;

    return letters.map((letter, index) => {
      // חישוב הזווית של כל אות
      let angle = startAngle;

      if (finalClockwise) {
        angle += index * angleStep;
      } else {
        angle -= index * angleStep;
      }

      // חישוב המיקום על העיגול
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // חישוב הסיבוב של האות עצמה (כדי שתצביע החוצה מהעיגול)
      let rotation = finalClockwise ? angle + Math.PI / 2 : angle - Math.PI / 2;

      return {
        letter,
        position: [x, y, 0],
        rotation: [0, 0, rotation],
        index,
      };
    });
  }, [
    text,
    radius,
    fontSize,
    spacing,
    startAngle,
    finalClockwise,
    tunnelMode,
    letterTilt,
    isHebrew,
  ]);

  // אנימציית סיבוב: עדכון כל 6 פריימים (~10fps)
  const frameCountRef = useRef(0);
  useFrame(({ clock }) => {
    if (groupRef.current && speed !== 0) {
      frameCountRef.current++;
      if (frameCountRef.current % 1 !== 0) return; // כל 6 פריימים = ~10fps
      groupRef.current.rotation.z =
        clock.getElapsedTime() * speed * finalDirection;
    }
  });

  if (!text || text.length === 0) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <group ref={groupRef} position={stablePosition}>
        {/* האותיות */}
        {letterPositions.map(({ letter, position, rotation, index }) => (
          <group key={index} position={position} rotation={rotation}>
            <Text
              fontSize={fontSize}
              color={color}
              font={font}
              anchorX="center"
              anchorY="middle"
              outlineWidth={outlineWidth}
              outlineColor={outlineColor}
              material-opacity={opacity}
              material-transparent={true}
            >
              {letter}
            </Text>
          </group>
        ))}
      </group>
    </Suspense>
  );
};

CircularText.displayName = "CircularText";

export default React.memo(CircularText, (prevProps, nextProps) => {
  return (
    prevProps.text === nextProps.text &&
    JSON.stringify(prevProps.position) === JSON.stringify(nextProps.position)
  );
});
