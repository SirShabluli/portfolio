import React, { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

const GridContainer = ({
  rows = 3,
  cols = 3,
  layers = 1,
  distance = 11,
  spacing = 0.2,
  gutters = { row: 0.2, col: 0.2, layer: 0.2 },
  position = [0, 0, 0],
  children,
  debug = false,
  opacity = 1.0, // ← הוסף את זה
}) => {
  const { camera, viewport, size } = useThree();

  const groupRef = useRef();

  // חישוב viewport לVercel
  const gridBounds = useMemo(() => {
    const aspect = size.width / size.height;
    const fov = camera.fov * (Math.PI / 180);

    let height = 2 * Math.tan(fov / 2) * distance;
    let width = height * aspect;

    // הגבלת גדלים
    height = Math.max(8, Math.min(height, 20));
    width = Math.max(12, Math.min(width, 30));

    const depth = layers > 1 ? Math.min(width, height) * 0.3 : 0;

    return {
      width,
      height,
      depth,
      totalWidth: width,
      totalHeight: height,
      totalDepth: depth,
    };
  }, [camera.fov, size.width, size.height, distance, layers]);

  // תמיכה לאחור בspacing
  const finalGutters = useMemo(() => {
    if (gutters && typeof gutters === "object") {
      return {
        row: gutters.row || 0,
        col: gutters.col || 0,
        layer: gutters.layer || 0,
      };
    }
    return {
      row: spacing,
      col: spacing,
      layer: spacing,
    };
  }, [gutters, spacing]);

  // חישוב גודל תא
  const cellDimensions = useMemo(() => {
    const cellWidth = (gridBounds.width - finalGutters.col * (cols - 1)) / cols;
    const cellHeight =
      (gridBounds.height - finalGutters.row * (rows - 1)) / rows;
    const cellDepth =
      layers > 1
        ? (gridBounds.depth - finalGutters.layer * (layers - 1)) / layers
        : 0;

    // וידוא שהתאים לא קטנים מדי
    const minCellSize = 0.5;
    const finalCellWidth = Math.max(cellWidth, minCellSize);
    const finalCellHeight = Math.max(cellHeight, minCellSize);

    return {
      width: finalCellWidth,
      height: finalCellHeight,
      depth: cellDepth,
    };
  }, [gridBounds, rows, cols, layers, finalGutters]);

  // חישוב מיקום גריד
  const getGridPosition = useMemo(() => {
    return (row, col, layer = 0) => {
      const startX = -gridBounds.width / 2 + cellDimensions.width / 2;
      const startY = gridBounds.height / 2 - cellDimensions.height / 2;
      const startZ =
        layers > 1 ? -gridBounds.depth / 2 + cellDimensions.depth / 2 : 0;

      const x = startX + col * (cellDimensions.width + finalGutters.col);
      const y = startY - row * (cellDimensions.height + finalGutters.row);
      const z = startZ + layer * (cellDimensions.depth + finalGutters.layer);

      return [position[0] + x, position[1] + y, position[2] + z];
    };
  }, [gridBounds, cellDimensions, rows, cols, layers, finalGutters, position]);

  // גודל תא עבור spans
  const getCellSize = useMemo(() => {
    return (spanRows = 1, spanCols = 1, spanLayers = 1) => {
      const width =
        spanCols * cellDimensions.width + (spanCols - 1) * finalGutters.col;
      const height =
        spanRows * cellDimensions.height + (spanRows - 1) * finalGutters.row;
      const depth =
        spanLayers * cellDimensions.depth +
        (spanLayers - 1) * finalGutters.layer;

      return { width, height, depth };
    };
  }, [cellDimensions, finalGutters]);

  // מיקום עבור spans
  const getSpanPosition = useMemo(() => {
    return (
      row,
      col,
      layer = 0,
      spanRows = 1,
      spanCols = 1,
      spanLayers = 1
    ) => {
      const basePosition = getGridPosition(row, col, layer);
      const offsetX =
        ((spanCols - 1) * (cellDimensions.width + finalGutters.col)) / 2;
      const offsetY =
        -((spanRows - 1) * (cellDimensions.height + finalGutters.row)) / 2;
      const offsetZ =
        ((spanLayers - 1) * (cellDimensions.depth + finalGutters.layer)) / 2;

      return [
        basePosition[0] + offsetX,
        basePosition[1] + offsetY,
        basePosition[2] + offsetZ,
      ];
    };
  }, [getGridPosition, cellDimensions, finalGutters]);

  const gridContext = {
    getGridPosition,
    getCellSize,
    getSpanPosition,
    cellDimensions,
    gridBounds,
    gutters: finalGutters,
    rows,
    cols,
    layers,
  };

  return (
    <group ref={groupRef} position={position}>
      {/* גריד דיבוג */}
      {debug && (
        <group>
          {/* מסגרת הגריד הכללית */}
          <lineSegments>
            <edgesGeometry
              args={[
                new THREE.PlaneGeometry(gridBounds.width, gridBounds.height),
              ]}
            />
            <lineBasicMaterial color="#00ff00" opacity={0.8} transparent />
          </lineSegments>

          {/* קווי חלוקה אופקיים */}
          {Array.from({ length: rows + 1 }, (_, i) => {
            const y =
              gridBounds.height / 2 -
              i * (cellDimensions.height + finalGutters.row);
            return (
              <mesh key={`h-${i}`} position={[0, y, 0.01]}>
                <planeGeometry args={[gridBounds.width, 0.02]} />
                <meshBasicMaterial color="#00ff00" opacity={0.6} transparent />
              </mesh>
            );
          })}

          {/* קווי חלוקה אנכיים */}
          {Array.from({ length: cols + 1 }, (_, i) => {
            const x =
              -gridBounds.width / 2 +
              i * (cellDimensions.width + finalGutters.col);
            const isMainColumn = i % 3 === 0;
            return (
              <mesh key={`v-${i}`} position={[x, 0, 0.01]}>
                <planeGeometry
                  args={[isMainColumn ? 0.04 : 0.02, gridBounds.height]}
                />
                <meshBasicMaterial
                  color={isMainColumn ? "#00ff00" : "#008800"}
                  opacity={isMainColumn ? 0.8 : 0.5}
                  transparent
                />
              </mesh>
            );
          })}

          {/* מספרי עמודות */}
          {Array.from({ length: cols }, (_, i) => {
            const x =
              -gridBounds.width / 2 +
              i * (cellDimensions.width + finalGutters.col) +
              cellDimensions.width / 2;
            return (
              <Text
                key={`col-num-${i}`}
                position={[x, -gridBounds.height / 2 - 0.8, 0.01]}
                fontSize={0.4}
                color="#00ff00"
                anchorX="center"
                anchorY="middle"
              >
                {i}
              </Text>
            );
          })}

          {/* מספרי שורות */}
          {Array.from({ length: rows }, (_, i) => {
            const y =
              gridBounds.height / 2 -
              i * (cellDimensions.height + finalGutters.row) -
              cellDimensions.height / 2;
            return (
              <Text
                key={`row-num-${i}`}
                position={[-gridBounds.width / 2 - 0.8, y, 0.01]}
                fontSize={0.4}
                color="#00ff00"
                anchorX="center"
                anchorY="middle"
              >
                {i}
              </Text>
            );
          })}

          {/* ✨ חדש: ויזואליזציה של gutters */}
          <group>
            {/* gutters אנכיים (בין עמודות) */}
            {Array.from({ length: cols - 1 }, (_, i) => {
              const x =
                -gridBounds.width / 2 +
                (i + 1) * (cellDimensions.width + finalGutters.col) -
                finalGutters.col / 2;
              return (
                <mesh key={`vgutter-${i}`} position={[x, 0, 0.005]}>
                  <planeGeometry args={[finalGutters.col, gridBounds.height]} />
                  <meshBasicMaterial
                    color="#00ff00"
                    opacity={0.3}
                    transparent
                  />
                </mesh>
              );
            })}

            {/* gutters אופקיים (בין שורות) */}
            {Array.from({ length: rows - 1 }, (_, i) => {
              const y =
                gridBounds.height / 2 -
                (i + 1) * (cellDimensions.height + finalGutters.row) +
                finalGutters.row / 2;
              return (
                <mesh key={`hgutter-${i}`} position={[0, y, 0.005]}>
                  <planeGeometry args={[gridBounds.width, finalGutters.row]} />
                  <meshBasicMaterial
                    color="#00ff00"
                    opacity={0.3}
                    transparent
                  />
                </mesh>
              );
            })}
          </group>
        </group>
      )}

      {/* רנדור הchildren */}
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (
          child.type &&
          (child.type.name === "GridItem" ||
            child.type.displayName === "GridItem")
        ) {
          return React.cloneElement(child, { gridContext });
        }

        return child;
      })}
    </group>
  );
};

export default GridContainer;
