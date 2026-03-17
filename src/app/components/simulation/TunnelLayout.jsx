import React from "react";
import CircularText from "./CircularText";
import GridContainer from "./GridContainer";
import { getFont } from "./fonts";

const STATIC_POSITION = [0, 0, 0];

const TunnelLayout = React.memo(
  ({
    headerText = "טסט מנהרה",
    showGrid = false,
    spacing = 4.5,
    startZ = 0,
    baseRadius = 6.5,

    frozenInsights = [],
    opacity = 1.0, // ← הוסף את זה
  }) => {
    // חישוב מתוחכם יותר
    const calculateRadius = (text) => {
      const textLength = text.length;

      // לוגריתמי - לא יגדל מדי
      const extraRadius = Math.log(textLength + 1) * 0.3;

      return Math.max(baseRadius + extraRadius, 0.8); // מינימום 0.8
    };

    const createCircles = () => {
      const insightsToUse = frozenInsights;

      if (insightsToUse.length === 0) {
        return [];
      }

      const circleArray = [];

      for (let i = 0; i < insightsToUse.length; i++) {
        const insight = insightsToUse[i];
        const textLength = insight.length;

        const radius = calculateRadius(insight);

        // מיקום Z
        const z = i * -spacing + startZ;

        circleArray.push({
          position: [0, 0, z],
          rotation: [0, 0, 0],
          radius: Math.max(radius, 1.5),
          text: insight,
        });
      }

      // מיון מגדול לקטן
      circleArray.sort((a, b) => b.radius - a.radius);

      // עדכון מיקומי Z אחרי המיון
      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].position[2] = i * -spacing + startZ;
      }

      return circleArray;
    };

    const circleData = createCircles();

    return (
      <>
        <GridContainer
          rows={10}
          cols={12}
          distance={10}
          gutters={{ row: 0.3, col: 0.4 }}
          debug={showGrid}
          opacity={opacity}
        >
          {circleData.map((circle, index) => (
            <group
              key={index}
              position={circle.position}
              rotation={circle.rotation}
            >
              {showGrid && (
                <mesh>
                  <ringGeometry
                    args={[circle.radius - 0.1, circle.radius, 32]}
                  />
                  <meshBasicMaterial color="#666666" wireframe />
                </mesh>
              )}
              <CircularText
                text={circle.text}
                position={STATIC_POSITION}
                radius={circle.radius - 0.8}
                fontSize={1.0}
                color="#ffffff"
                speed={0.4}
                font={getFont("server-medium", true)}
                opacity={opacity}
              />
            </group>
          ))}
        </GridContainer>
      </>
    );
  }
);

TunnelLayout.displayName = "TunnelLayout";

const areEqual = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.frozenInsights) ===
      JSON.stringify(nextProps.frozenInsights) &&
    prevProps.opacity === nextProps.opacity
  );
};

export default React.memo(TunnelLayout, areEqual);
