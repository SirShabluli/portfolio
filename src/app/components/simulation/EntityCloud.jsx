// src/components/text/EntityCloud.jsx
import React, { useMemo, useRef, Suspense } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { getFont } from "./fonts";

const EntityCloud = React.memo(
  ({
    centerEntity = "COFFEE SHOP",
    emotionWords = ["calm", "relief", "costly", "people", "good noise"],
    position = [0, 0, 0],
    cloudRadius = 4,
    centerFontSize = 1.5,
    emotionFontSize = 0.5,
    centerColor = "#ffffff",
    emotionColor = "#cccccc",
    font = getFont("hebrew-title", true),
    animationType = "floating", // "floating" | "orbiting" | "pulsing"
    animationSpeed = 1.0, // מכפיל מהירות - 0.5 איטי, 2.0 מהיר
    ellipseRatioX = 1.5, // רוחב האליפסה
    ellipseRatioY = 0.4, // גובה האליפסה
    opacity = 1.0,
  }) => {
    const groupRef = useRef();
    const emotionRefs = useRef([]);

    const emotionPositions = useMemo(() => {
      return emotionWords.map((word, index) => {
        // זווית אקראית
        const angle =
          (index / emotionWords.length) * Math.PI * 2 + Math.random() * 0.5;

        // מרחק אקראי מהמרכז
        const distance = cloudRadius * 0.7 + Math.random() * cloudRadius * 0.6;

        // חישוב המיקום
        const x = Math.cos(angle) * distance * ellipseRatioX;
        const y = Math.sin(angle) * distance * ellipseRatioY;
        const z = (Math.random() - 0.5) * 0.5; // עומק קל

        return {
          word,
          position: [x, y, z],
          // גודל אקראי קל
          fontSize: emotionFontSize * (0.8 + Math.random() * 0.4),
          // שקיפות אקראית קלה
          opacity: 0.7 + Math.random() * 0.3,
          // תכונות תנועה ייחודיות לכל מילה
          floatSpeed: 0.5 + Math.random() * 1.0,
          floatRange: 0.2 + Math.random() * 0.3,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
        };
      });
    }, [
      emotionWords.length,
      cloudRadius,
      ellipseRatioX,
      ellipseRatioY,
      emotionFontSize,
    ]);

    // אנימציה לכל המילים
    useFrame(({ clock }) => {
      const time = clock.getElapsedTime();
      const animatedTime = time * animationSpeed;

      // אנימציה למילות הרגש
      emotionRefs.current.forEach((ref, index) => {
        if (ref && emotionPositions[index]) {
          const {
            position: basePos,
            floatSpeed,
            floatRange,
            rotationSpeed,
          } = emotionPositions[index];

          let finalX = basePos[0];
          let finalY = basePos[1];
          let finalZ = basePos[2];

          if (animationType === "floating") {
            // תנועת ריחוף עדינה
            finalX =
              basePos[0] + Math.sin(animatedTime * floatSpeed) * floatRange;
            finalY =
              basePos[1] +
              Math.cos(animatedTime * floatSpeed * 0.7) * floatRange * 0.5;
            finalZ =
              basePos[2] +
              Math.sin(animatedTime * floatSpeed * 1.3) * (floatRange * 0.3);
          } else if (animationType === "orbiting") {
            // כל המילים מסתובבות סביב המרכז (נקודה 0,0,0)
            const orbitAngle = animatedTime * 0.5 + index * 0.8; // מהירות וזווית התחלה
            const radius = Math.sqrt(
              basePos[0] * basePos[0] + basePos[1] * basePos[1]
            );
            finalX = Math.cos(orbitAngle) * radius * ellipseRatioX;
            finalY = Math.sin(orbitAngle) * radius * ellipseRatioY;
            finalZ = basePos[2] + Math.sin(orbitAngle * 0.7) * floatRange * 0.3;
          } else if (animationType === "pulsing") {
            // דוגמה לאנימציה נוספת - שינוי גודל/פולסציה
            const pulse = 1 + Math.sin(animatedTime * 2 + index) * 0.2;
            ref.scale.set(pulse, pulse, pulse);
          } else if (animationType === "orbitingZ") {
            // תנועה כמו אטום - כל מילה במסלול אליפטי שמסתובב על ציר Z
            const orbitAngle = animatedTime * 0.4 + index * 1.2; // סיבוב הבסיסי
            const zRotation = animatedTime * 0.2 + index * 0.8; // סיבוב המסלול על ציר Z

            // המרחק הבסיסי מהמרכז
            const radius = Math.sqrt(
              basePos[0] * basePos[0] + basePos[1] * basePos[1]
            );

            // מיקום על המסלול האליפטי
            const orbitX = Math.cos(orbitAngle) * radius * ellipseRatioX;
            const orbitY = Math.sin(orbitAngle) * radius * ellipseRatioY;

            // סיבוב המסלול על ציר Z
            finalX =
              orbitX * Math.cos(zRotation) - orbitY * Math.sin(zRotation);
            finalY =
              orbitX * Math.sin(zRotation) + orbitY * Math.cos(zRotation);
            finalZ = basePos[2] + Math.sin(orbitAngle * 0.5) * radius * 0.2;
          } else if (animationType === "shake") {
            // רטט מהיר ועצבני כמו במשחקים
            const shakeIntensity = 0.15;
            const shakeSpeed = 20; // רטט סופר מהיר
            finalX += Math.sin(time * shakeSpeed + index * 2) * shakeIntensity;
            finalY +=
              Math.cos(time * shakeSpeed * 1.3 + index * 3) * shakeIntensity;
            finalZ +=
              Math.sin(time * shakeSpeed * 0.7 + index) * shakeIntensity * 0.5;
          } else {
            // ברירת מחדל - אין תנועה
          }

          ref.position.x = finalX;
          ref.position.y = finalY;
          ref.position.z = finalZ;
          // סיבוב עדין
          ref.rotation.z = Math.sin(animatedTime * rotationSpeed) * 0.1;
        }
      });
    });

    return (
      <Suspense fallback={null}>
        <group ref={groupRef} position={position}>
          {/* הישות המרכזית */}
          <Text
            position={[0, 0, 0]}
            fontSize={centerFontSize}
            color={centerColor}
            font={font}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0}
            outlineColor="#000000"
            letterSpacing={0.05}
            fontWeight="bold"
            material-opacity={opacity}
            material-transparent={true}
          >
            {centerEntity}
          </Text>

          {/* מילות הרגש מפוזרות עם תנועה */}
          {emotionPositions?.map(
            ({ word, fontSize, opacity: wordOpacity }, index) => (
              <Text
                key={`emotion-${index}`}
                ref={(el) => (emotionRefs.current[index] = el)}
                fontSize={fontSize}
                color={emotionColor}
                font={font}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0}
                outlineColor="#000000"
                material-opacity={wordOpacity * opacity}
                material-transparent={true}
              >
                {word}
              </Text>
            )
          )}
        </group>
      </Suspense>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.centerEntity === nextProps.centerEntity &&
      JSON.stringify(prevProps.emotionWords) ===
        JSON.stringify(nextProps.emotionWords) &&
      JSON.stringify(prevProps.position) ===
        JSON.stringify(nextProps.position) &&
      prevProps.cloudRadius === nextProps.cloudRadius &&
      prevProps.animationType === nextProps.animationType &&
      prevProps.opacity === nextProps.opacity
    );
  }
);

EntityCloud.displayName = "EntityCloud";

export default EntityCloud;
