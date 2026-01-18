import Image from "next/image";

export default function StepSection({ step }) {
  return (
    <div className="step-container grid grid-cols-12 h-screen w-full items-center gap-8 px-12">
      {/* צד שמאל: טקסטים - תופס 3 עמודות מתוך 12, מתחיל מעמודה 2 */}
      <div className="text-side col-start-2 col-span-3 flex flex-col justify-center">
        <span className="text-sm uppercase tracking-widest opacity-40 font-mono">
          Step {step.id}
        </span>
        <h2 className="text-5xl font-bold mt-2 leading-tight">{step.title}</h2>
        <p className="text-xl mt-6 opacity-70 max-w-sm leading-relaxed">
          {step.description}
        </p>

        {/* ציטוטים - מופיעים רק אם קיימים */}
        {step.quotes?.length > 0 && (
          <div className="quotes-area mt-12 space-y-6">
            {step.quotes.map((q, index) => (
              <div key={index} className="quote-item relative">
                <p className="italic text-lg text-white/90 font-light">
                  "{q.text}"
                </p>
                <p className="text-xs uppercase tracking-tighter opacity-40 mt-1">
                  — {q.author}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* צד ימין: תמונות - תופס 5 עמודות, מתחיל עמודה 2 מימין */}
      <div className="image-side col-end-11 col-span-5 relative flex flex-col items-center justify-center">
        <div className="relative group">
          <Image
            src={step.image}
            width={1000}
            height={1000}
            className="w-full shadow-2xl rounded-sm border border-white/5"
            alt={step.title}
          />

          {/* הצגה מותנית של הכיתוב מתחת לתמונה */}
          {step.subCaption && (
            <div className="absolute -bottom-16 left-0 right-0">
              <p className="text-[11px] leading-relaxed opacity-40 italic font-light max-w-[300px] mx-auto text-center">
                "{step.subCaption}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
