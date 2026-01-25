import Image from "next/image";

export default function Lauryl({
  topText = "Award Winner",
  bottomText = "Best Design 2024",
  ...props
}) {
  return (
    <div className="flex items-center gap-0" {...props}>
      {/* SVG שמאל */}
      <div className="flex-shrink-0">
        <Image
          src="/images/laurylLeaf.svg"
          alt="lauryl"
          width={40}
          height={24}
        />
      </div>

      {/* טקסטים באמצע */}
      <div className="flex flex-col gap-0 items-center font-cinzel">
        <span className="" style={{ fontSize: "1.2rem" }}>
          {topText}
        </span>
        <span className="font-medium -mt-2" style={{ fontSize: "1.5rem" }}>
          {bottomText}
        </span>
      </div>

      {/* SVG ימין - מראה */}
      <div className="flex-shrink-0 -scale-x-100">
        <Image
          src="/images/laurylLeaf.svg"
          alt="lauryl"
          width={40}
          height={24}
        />
      </div>
    </div>
  );
}
