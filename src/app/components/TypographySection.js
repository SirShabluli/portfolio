export default function TypographySection({ data }) {
  return (
    <section className="grid grid-cols-12 w-full bg-black text-white py-24 px-12 gap-y-12">
      {/* כותרת הסקשן בצד שמאל (עמודות 1-3) */}
      <div className="col-span-2 col-start-1">
        <h3 className="text-sm font-medium tracking-tight">Typography</h3>
      </div>

      {/* תוכן הפונט (עמודות 4-12) */}
      <div className="col-span-6 space-y-12">
        {/* תוויות הפונט (Badges) */}
        <div className="flex gap-2">
          <span className="bg-white text-black px-4 py-1 text-sm font-bold uppercase">
            {data.fontName}
          </span>
          <span className="bg-[#333] text-white px-4 py-1 text-sm font-bold uppercase opacity-50">
            {data.fontWeight}
          </span>
        </div>

        {/* תצוגת האותיות - כאן קורה הקסם הוויזואלי */}
        <div className="space-y-4 max-w-4xl font-netflix text-[2.85rem] leading-[1.28] font-bold">
          <div className="tracking-tight break-words">{data.alphabet}</div>
          <div className="tracking-tighter">{data.numbers}</div>
          <div className="opacity-80 break-all">{data.symbols}</div>
        </div>

        {/* תיאור הפונט בתחתית */}
        <div className="space-y-2 mt-16 pt-8 border-t border-white/10 max-w-xs">
          <h4 className="text-lg font-bold">{data.fontName}</h4>
          <p className="text-sm opacity-60 leading-relaxed font-light">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
