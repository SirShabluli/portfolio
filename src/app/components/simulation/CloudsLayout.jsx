// src/components/Layouts/CloudsLayout.jsx
import React, { useMemo } from "react";
import { getFont } from "./fonts";
import { Text } from "@react-three/drei";
import GridContainer from "./GridContainer";
import EntityCloud from "./EntityCloud";

const CloudsLayout = React.memo(
  ({
    headerText = "מחשבות מתפזרות",
    showGrid = false,
    cloudData = [],
    frozenCloudData = [], // ← נתונים קפואים לקומפוזיציה
    opacity = 0.2, // ← הוסף את זה
  }) => {
    // נשתמש בנתונים הקפואים אם יש, אחרת בנתונים הרגילים
    const cloudsToUse = useMemo(() => {
      return frozenCloudData.length > 0 ? frozenCloudData : cloudData;
    }, [frozenCloudData, cloudData]);

    // חישוב מספר העננים (1-3) בהתאם לעומק הנתונים
    const calculateCloudCount = (data) => {
      if (!data || data.length === 0) return 1;

      // לוגיקה לקביעת מספר עננים:
      // 1-2 אלמנטים = ענן אחד
      // 3-5 אלמנטים = שני עננים
      // 6+ אלמנטים = שלושה עננים
      if (data.length <= 2) return 1;
      if (data.length <= 5) return 2;
      9;
      return 3;
    };

    const cloudCount = useMemo(() => {
      return calculateCloudCount(cloudsToUse);
    }, [cloudsToUse]);

    // חלוקת הנתונים בין העננים
    const divideCloudsData = useMemo(() => {
      if (!cloudsToUse || cloudsToUse.length === 0) {
        return [
          {
            centerEntity: "מחשבות",
            emotionWords: ["רגש", "תחושה", "מצב רוח"],
          },
        ];
      }

      if (cloudCount === 1) {
        // ענן אחד - כל הנתונים
        return [
          {
            centerEntity: cloudsToUse[0]?.centerEntity || "מחשבות",
            emotionWords: cloudsToUse
              .flatMap((cloud) => [
                ...(cloud.emotionWords || []),
                ...(cloud.connectedWords || []),
              ])
              .slice(0, 8),
          },
        ];
      }

      if (cloudCount === 2) {
        // שני עננים - חלק לשניים
        const mid = Math.ceil(cloudsToUse.length / 2);
        return [
          {
            centerEntity: cloudsToUse[0]?.centerEntity || "מחשבות א'",
            emotionWords: cloudsToUse
              .slice(0, mid)
              .flatMap((cloud) => [
                ...(cloud.emotionWords || []),
                ...(cloud.connectedWords || []),
              ])
              .slice(0, 6),
          },
          {
            centerEntity: cloudsToUse[mid]?.centerEntity || "מחשבות ב'",
            emotionWords: cloudsToUse
              .slice(mid)
              .flatMap((cloud) => [
                ...(cloud.emotionWords || []),
                ...(cloud.connectedWords || []),
              ])
              .slice(0, 6),
          },
        ];
      }

      // שלושה עננים - חלק לשלושה
      const third = Math.ceil(cloudsToUse.length / 3);
      return [
        {
          centerEntity: cloudsToUse[0]?.centerEntity || "מחשבות א'",
          emotionWords: cloudsToUse
            .slice(0, third)
            .flatMap((cloud) => [
              ...(cloud.emotionWords || []),
              ...(cloud.connectedWords || []),
            ])
            .slice(0, 5),
        },
        {
          centerEntity: cloudsToUse[third]?.centerEntity || "מחשבות ב'",
          emotionWords: cloudsToUse
            .slice(third, third * 2)
            .flatMap((cloud) => [
              ...(cloud.emotionWords || []),
              ...(cloud.connectedWords || []),
            ])
            .slice(0, 5),
        },
        {
          centerEntity: cloudsToUse[third * 2]?.centerEntity || "מחשבות ג'",
          emotionWords: cloudsToUse
            .slice(third * 2)
            .flatMap((cloud) => [
              ...(cloud.emotionWords || []),
              ...(cloud.connectedWords || []),
            ])
            .slice(0, 5),
        },
      ];
    }, [cloudsToUse, cloudCount]);

    // מיקומים לעננים בהתאם למספרם
    const getCloudPositions = (count) => {
      switch (count) {
        case 1:
          return [[0, 0, 0]]; // במרכז
        case 2:
          return [
            [-8, 2, 0],
            [8, -2, 0],
          ]; // שמאל וימין
        case 3:
          return [
            [-10, 3, 0],
            [0, -4, 0],
            [10, 2, 0],
          ]; // משולש
        default:
          return [[0, 0, 0]];
      }
    };

    const cloudPositions = getCloudPositions(cloudCount);

    return (
      <GridContainer
        rows={10}
        cols={12}
        distance={10}
        gutters={{ row: 0.3, col: 0.4 }}
        debug={showGrid}
        opacity={opacity} // ← הוסף את זה
      >
        {/* העננים */}
        {divideCloudsData.map((cloudInfo, index) => (
          <group key={`cloud-${index}`} position={cloudPositions[index]}>
            <EntityCloud
              centerEntity={cloudInfo.centerEntity}
              emotionWords={cloudInfo.emotionWords}
              position={[0, 0, 0]}
              cloudRadius={4 + index * 0.5} // רדיוס מעט שונה לכל ענן
              centerFontSize={1.2 - index * 0.1} // גודל מעט שונה
              emotionFontSize={0.6 - index * 0.05}
              centerColor="#ffffff"
              emotionColor="#dddddd"
              opacity={opacity} // ← הוסף את זה
              animationType="floating" // תנועה עדינה
              animationSpeed={1.0 + index * 0.2} // מהירות מעט שונה
              ellipseRatioX={1.5 - index * 0.1}
              ellipseRatioY={0.9 + index * 0.1}
              font={getFont("server-medium", true)}
            />
          </group>
        ))}

        {/* מידע דיבוג */}
        {showGrid && (
          <group position={[0, -8, 0]}>
            <Text
              fontSize={0.4}
              color="#666666"
              anchorX="center"
              anchorY="middle"
              material-opacity={opacity}
              material-transparent={true}
            >
              {`${cloudCount} עננים | ${cloudsToUse.length} קבוצות נתונים`}
            </Text>
          </group>
        )}
      </GridContainer>
    );
  }
);

CloudsLayout.displayName = "CloudsLayout";

const areEqual = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.frozenCloudData) ===
      JSON.stringify(nextProps.frozenCloudData) &&
    prevProps.opacity === nextProps.opacity &&
    prevProps.headerText === nextProps.headerText
  );
};

export default React.memo(CloudsLayout, areEqual);
