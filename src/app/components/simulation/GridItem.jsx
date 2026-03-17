// src/components/compositions/GridLayout/GridItem.jsx - ללא console.log
import React from "react";

const GridItem = ({
  row,
  col,
  layer = 0,
  spanRows = 1,
  spanCols = 1,
  spanLayers = 1,
  fillContainer = true,
  children,
  gridContext,
  debug = false,
}) => {
  // וידוא שיש gridContext
  if (!gridContext) {
    return <group>{children}</group>;
  }

  // קבל את המיקום והגודל מהגריד
  const position = gridContext.getSpanPosition(
    row,
    col,
    layer,
    spanRows,
    spanCols,
    spanLayers
  );

  const cellSize = gridContext.getCellSize(spanRows, spanCols, spanLayers);

  // העבר את גודל התא לכל הילדים
  const childrenWithCellInfo = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    // זיהוי TypographyItem
    const isTypographyItem =
      child.type?.name === "TypographyItem" ||
      child.type?.displayName === "TypographyItem" ||
      (typeof child.type === "function" &&
        child.type.toString().includes("TypographyItem"));

    if (isTypographyItem) {
      return React.cloneElement(child, {
        ...child.props,
        cellSize: cellSize,
        cellPosition: position, // ← Add the actual grid position
        fitToCell: fillContainer,
      });
    }

    // זיהוי TextInput
    const isTextInput =
      child.type?.name === "TextInput" ||
      child.type?.displayName === "TextInput";

    if (isTextInput) {
      return React.cloneElement(child, {
        ...child.props,
        key: "stable-textinput",
        cellSize: cellSize,
        fitToCell: fillContainer,
        enableScroll: true,
      });
    }

    // זיהוי TextInput
    const isTextInputFull =
      child.type?.name === "TextInput" ||
      child.type?.displayName === "TextInput" ||
      (typeof child.type === "function" &&
        child.type.toString().includes("TextInput"));

    if (isTextInputFull) {
      return React.cloneElement(child, {
        ...child.props,
        cellSize: cellSize,
        fitToCell: fillContainer,
        enableScroll: true,
      });
    }

    // זיהוי Wrappers
    const isWrapper =
      child.type?.name === "TypewriterWrapper" ||
      child.type?.displayName === "TypewriterWrapper" ||
      child.type?.name === "ShakeWrapper" ||
      child.type?.displayName === "ShakeWrapper";

    if (isWrapper) {
      // עבור Wrappers, צריך לעבד את הילדים הפנימיים
      const wrappedChildren = React.Children.map(
        child.props.children,
        (wrappedChild) => {
          if (!React.isValidElement(wrappedChild)) return wrappedChild;

          const isNestedTypographyItem =
            wrappedChild.type?.name === "TypographyItem" ||
            wrappedChild.type?.displayName === "TypographyItem" ||
            (typeof wrappedChild.type === "function" &&
              wrappedChild.type.toString().includes("TypographyItem"));

          if (isNestedTypographyItem) {
            return React.cloneElement(wrappedChild, {
              ...wrappedChild.props,
              cellSize: cellSize,
              fitToCell: fillContainer,
            });
          }

          // רקורסיה עבור wrappers מקוננים
          const isNestedWrapper =
            wrappedChild.type?.name === "TypewriterWrapper" ||
            wrappedChild.type?.displayName === "TypewriterWrapper" ||
            wrappedChild.type?.name === "ShakeWrapper" ||
            wrappedChild.type?.displayName === "ShakeWrapper";

          if (isNestedWrapper) {
            const deeplyNestedChildren = React.Children.map(
              wrappedChild.props.children,
              (deepChild) => {
                if (!React.isValidElement(deepChild)) return deepChild;

                const isDeepTypographyItem =
                  deepChild.type?.name === "TypographyItem" ||
                  deepChild.type?.displayName === "TypographyItem" ||
                  (typeof deepChild.type === "function" &&
                    deepChild.type.toString().includes("TypographyItem"));

                if (isDeepTypographyItem) {
                  return React.cloneElement(deepChild, {
                    ...deepChild.props,
                    cellSize: cellSize,
                    fitToCell: fillContainer,
                  });
                }

                return deepChild;
              }
            );

            return React.cloneElement(wrappedChild, {
              ...wrappedChild.props,
              children: deeplyNestedChildren,
            });
          }

          return wrappedChild;
        }
      );

      return React.cloneElement(child, {
        ...child.props,
        children: wrappedChildren,
      });
    }

    // עבור mesh עם geometry
    if (fillContainer && child.type === "mesh" && child.props.children) {
      const props = { ...child.props };

      const updatedChildren = React.Children.map(
        child.props.children,
        (grandchild) => {
          if (React.isValidElement(grandchild)) {
            if (grandchild.type?.name === "boxGeometry") {
              return React.cloneElement(grandchild, {
                args: [
                  cellSize.width * 0.9,
                  cellSize.height * 0.9,
                  cellSize.depth * 0.9 || 0.1,
                ],
              });
            }
            if (grandchild.type?.name === "planeGeometry") {
              return React.cloneElement(grandchild, {
                args: [cellSize.width * 0.9, cellSize.height * 0.9],
              });
            }
            if (grandchild.type?.name === "sphereGeometry") {
              const radius = Math.min(cellSize.width, cellSize.height) * 0.4;
              return React.cloneElement(grandchild, {
                args: [radius],
              });
            }
            if (grandchild.type?.name === "cylinderGeometry") {
              const radius = Math.min(cellSize.width, cellSize.height) * 0.3;
              return React.cloneElement(grandchild, {
                args: [radius, radius, cellSize.height * 0.8],
              });
            }
          }
          return grandchild;
        }
      );

      props.children = updatedChildren;
      props.cellSize = cellSize;
      props.cellPosition = position;

      return React.cloneElement(child, props);
    }

    // עבור כל שאר הרכיבים
    return React.cloneElement(child, {
      ...child.props,
      cellSize: cellSize,
      cellPosition: position,
      fillContainer: fillContainer,
    });
  });

  return (
    <group position={position}>
      {/* דיבוג - מסגרת התא */}
      {debug && (
        <mesh>
          <boxGeometry
            args={[cellSize.width, cellSize.height, cellSize.depth || 0.1]}
          />
          <meshBasicMaterial
            color="#ff0000"
            transparent
            opacity={0.3}
            wireframe={true}
          />
        </mesh>
      )}

      {/* הילדים עם המידע על התא */}
      {childrenWithCellInfo}
    </group>
  );
};

GridItem.displayName = "GridItem";

export default GridItem;
