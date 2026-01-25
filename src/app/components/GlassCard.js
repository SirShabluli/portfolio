import Image from "next/image";

export default function GlassCard({
  imageSrc,
  alt = "Project Image",
  width = "w-full",
  aspectRatio = "aspect-square md:aspect-video",
}) {
  return (
    <div className="relative group p-[px] rounded-lg overflow-hidden">
      {/* מסגרת דקה (Border) שנותנת עומק לזכוכית */}
      <div className="absolute inset-0 bg-white/10 rounded-[25px]" />

      {/* הקונטיינר המרכזי עם ה-Blur וה-Radius */}
      <div className="relative bg-white/5 backdrop-blur-[4px]  overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:bg-white/10">
        {/* שכבת הלבן העדינה (0/0 לבן עם שקיפות) */}
        <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />

        {/* התמונה בפנים */}
        <div className={`relative ${width} ${aspectRatio}`}>
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover transition-transform"
          />
        </div>
      </div>
    </div>
  );
}
