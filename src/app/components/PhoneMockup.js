"use client";
import Image from "next/image";

export default function PhoneMockup({
  screenSrc,
  alt = "Phone screen",
  className = "",
}) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "473/964" }}>
      {/* Screen image - behind the frame */}
      {screenSrc && (
        <div className="absolute inset-[5.5%] top-[2.5%] bottom-[2.5%] rounded-[10%] overflow-hidden">
          <Image src={screenSrc} alt={alt} fill className="object-cover" />
        </div>
      )}

      {/* Phone frame - on top */}
      <Image
        src="/images/shared/iphoneMockup.png"
        alt="Phone frame"
        fill
        className="object-contain pointer-events-none"
      />
    </div>
  );
}
