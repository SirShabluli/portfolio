import Image from "next/image";

export default function Lauryl({
  topText = "Award Winner",
  bottomText = "Best Design 2024",
  scale = 1,
  ...props
}) {
  const leafWidth = Math.round(40 * scale);
  const leafHeight = Math.round(24 * scale);
  const topFontSize = 1.2 * scale;
  const bottomFontSize = 1.5 * scale;

  return (
    <div className="flex items-center gap-0" {...props}>
      {/* SVG שמאל */}
      <div className="flex-shrink-0">
        <Image
          src="/images/shared/laurylLeaf.svg"
          alt="lauryl"
          width={leafWidth}
          height={leafHeight}
        />
      </div>

      {/* טקסטים באמצע */}
      <div className="flex flex-col gap-0 items-center font-cinzel">
        <span style={{ fontSize: `${topFontSize}rem` }}>
          {topText}
        </span>
        <span className="font-medium -mt-2" style={{ fontSize: `${bottomFontSize}rem` }}>
          {bottomText}
        </span>
      </div>

      {/* SVG ימין - מראה */}
      <div className="flex-shrink-0 -scale-x-100">
        <Image
          src="/images/shared/laurylLeaf.svg"
          alt="lauryl"
          width={leafWidth}
          height={leafHeight}
        />
      </div>
    </div>
  );
}
