// src/utils/cameraAnimations.js
import * as THREE from "three";

export const animateToPosition = (
  camera,
  orbitControlsRef,
  targetCameraPos,
  targetLookAt,
  onComplete
) => {
  console.log("🎬 animateToPosition started", { onComplete: !!onComplete });
  const startPos = camera.position.clone();
  const startLookAt =
    orbitControlsRef?.current?.target?.clone() || camera.position.clone();
  const duration = 1500;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    camera.position.lerpVectors(
      startPos,
      new THREE.Vector3(...targetCameraPos),
      eased
    );
    if (orbitControlsRef?.current) {
      orbitControlsRef.current.target.lerpVectors(
        startLookAt,
        new THREE.Vector3(...targetLookAt),
        eased
      );
      orbitControlsRef.current.update();
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      console.log("🎬 Animation finished, calling onComplete", {
        onComplete: !!onComplete,
      });
      onComplete();
    }
  };

  animate();
};

export const getClosestComposition = (camera, compositions) => {
  if (!camera || compositions.length === 0) return null;

  let closest = null;
  let minDistance = Infinity;

  compositions.forEach((comp) => {
    // 🚫 דלג על קומפוזיציות ביניים
    if (comp.isIntermediate) return;

    const distance = camera.position.distanceTo(
      new THREE.Vector3(...comp.position)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closest = { ...comp, distance };
    }
  });

  return closest;
};

export const isCompositionInView = (
  camera,
  composition,
  maxAngleDegrees = 30
) => {
  if (!camera || !composition) return false;

  // המרת מעלות לרדיאנים
  const maxAngleRadians = (maxAngleDegrees * Math.PI) / 180;

  // וקטור כיוון המצלמה (לאן היא מסתכלת)
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  // וקטור מהמצלמה לקומפוזיציה
  const toComposition = new THREE.Vector3(...composition.position)
    .sub(camera.position)
    .normalize();

  // חישוב הזווית ביניהם
  const angle = cameraDirection.angleTo(toComposition);

  // האם הזווית קטנה מהמקסימום?
  return angle <= maxAngleRadians;
};
