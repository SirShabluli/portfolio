import Image from "next/image";

export default function ImageStack({
  images,
  currentIndex,
  stackConfig,
  imageClassName = "",
}) {
  const { showPrevious, stackDepth = 0, previousOpacity = [], previousScale = [], offset = { x: 0, y: 0 } } = stackConfig || {};

  // Calculate which images to show in the stack
  const visibleImages = [];

  // Add previous images (oldest first for proper z-index layering)
  if (showPrevious && currentIndex > 0) {
    const startIndex = Math.max(0, currentIndex - stackDepth);
    for (let i = startIndex; i < currentIndex; i++) {
      const depthFromCurrent = currentIndex - i;
      const opacityIndex = depthFromCurrent - 1;
      visibleImages.push({
        src: images[i],
        opacity: previousOpacity[opacityIndex] ?? 0.3,
        scale: previousScale[opacityIndex] ?? 0.95,
        offsetX: offset.x * depthFromCurrent,
        offsetY: offset.y * depthFromCurrent,
        zIndex: 10 - depthFromCurrent,
        isCurrent: false,
      });
    }
  }

  // Add current image (on top)
  visibleImages.push({
    src: images[currentIndex],
    opacity: 1,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    zIndex: 10,
    isCurrent: true,
  });

  return (
    <div className="image-stack relative">
      {visibleImages.map((img, idx) => (
        <div
          key={`${img.src}-${idx}`}
          className={`image-layer ${img.isCurrent ? "image-layer--current" : ""}`}
          style={{
            position: img.isCurrent ? "relative" : "absolute",
            inset: img.isCurrent ? undefined : 0,
            zIndex: img.zIndex,
            opacity: img.opacity,
            transform: `translate(${img.offsetX}px, ${img.offsetY}px) scale(${img.scale})`,
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src={img.src}
            width={1000}
            height={1000}
            className={`w-full h-auto shadow-2xl rounded-sm border border-white/5 ${
              img.isCurrent ? imageClassName : ""
            }`}
            alt={`Step ${currentIndex + 1}${!img.isCurrent ? " (previous)" : ""}`}
          />
        </div>
      ))}
    </div>
  );
}
