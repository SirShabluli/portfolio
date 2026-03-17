// ScatteredLayout.jsx - גרסה מתוקנת
import React, { useMemo, useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import GridContainer from "./GridContainer";
import GridItem from "./GridItem";
import { getFont } from "./fonts";

const ScatteredLayout = ({
  scatteredWords = [],
  frozenWords = [],
  opacity = 0.2, // ← וודא שזה כאן
  headerText = "",
  style = { textColor: "#ffffff" },
  showGrid = false,
  wordCount = 30,
  animationSpeed = 1.0,
  spreadRadiusX = 25,
  spreadRadiusY = 20,
  spreadRadiusZ = 10,
  minFontSize = 0.4,
  maxFontSize = 1.2,
}) => {
  if (
    (!scatteredWords || scatteredWords.length === 0) &&
    (!frozenWords || frozenWords.length === 0)
  ) {
    return (
      <GridContainer debug={showGrid}>
        <GridItem row={4} col={4} spanRows={2} spanCols={4}>
          <Text
            fontSize={1.0}
            color="#888888"
            anchorX="center"
            anchorY="middle"
          >
            אין מילים להצגה
          </Text>
        </GridItem>
      </GridContainer>
    );
  }

  const stableWords = useMemo(() => {
    const wordsToUse =
      frozenWords.length > 0
        ? frozenWords
        : scatteredWords.length > 0
        ? scatteredWords
        : [];
    return wordsToUse.map((word, i) => `${word}-${i}`);
  }, [frozenWords, scatteredWords]);

  // ★ יצירת מילים כפולות עם מיקומים קבועים
  const duplicatedWords = useMemo(() => {
    if (stableWords.length === 0) return [];

    const result = Array.from({ length: wordCount }, (_, i) => ({
      id: `word-${i}`,
      text: stableWords[i % stableWords.length].split("-")[0],
      position: [
        (Math.random() - 0.5) * spreadRadiusX, // x
        (Math.random() - 0.5) * spreadRadiusY, // y
        (Math.random() - 0.5) * spreadRadiusZ, // z
      ],
      opacityOffset: Math.random() * Math.PI * 2,
      fontSize: minFontSize + Math.random() * (maxFontSize - minFontSize),
    }));

    return result;
  }, [stableWords, wordCount]);

  const textRefs = useRef([]);

  // ★ אנימציית opacity
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * animationSpeed;

    duplicatedWords.forEach((word, index) => {
      const ref = textRefs.current[index];
      if (ref?.current && ref.current.material) {
        const newOpacity =
          0.0 + 0.6 * Math.max(0, Math.sin(time + word.opacityOffset));
        const finalOpacity = newOpacity * opacity;
        ref.current.material.opacity = finalOpacity;
      }
    });
  });

  return (
    <Suspense fallback={null}>
      <GridContainer
        rows={10}
        cols={12}
        distance={10}
        gutters={{ row: 0.3, col: 0.4 }}
        debug={showGrid}
      >
        <GridItem row={1} col={0} spanRows={8} spanCols={12}>
          <group>
            {duplicatedWords.map((word, index) => (
              <Text
                key={word.id}
                ref={(el) => (textRefs.current[index] = { current: el })}
                position={word.position}
                fontSize={word.fontSize}
                color={style.textColor}
                font={getFont("server-medium", true)}
                anchorX="center"
                anchorY="middle"
                transparent
                opacity={opacity}
              >
                {word.text}
              </Text>
            ))}
          </group>
        </GridItem>
      </GridContainer>
    </Suspense>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.frozenWords) ===
      JSON.stringify(nextProps.frozenWords) &&
    JSON.stringify(prevProps.scatteredWords) ===
      JSON.stringify(nextProps.scatteredWords) &&
    prevProps.opacity === nextProps.opacity &&
    prevProps.wordCount === nextProps.wordCount
  );
};

export default React.memo(ScatteredLayout, areEqual);
