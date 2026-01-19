import Image from "next/image";

export default function StepSection({ step }) {
  return (
    <div className="step-container grid grid-cols-12 h-screen w-full items-center gap-8 px-12 bg-black text-white">
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
      <div className="image-side col-end-10 col-span-4 flex flex-col justify-center border-2">
        <Image
          src={step.image}
          width={1000}
          height={1000}
          className={`w-full h-auto shadow-2xl rounded-sm border border-white/5 ${step.imageClassName || ""}`}
          alt={step.title}
        />

        {/* הצגה מותנית של הכיתוב מתחת לתמונה */}
        {step.subCaption && (
          <div className="w-full mt-8">
            <p className="leading-relaxed opacity-40 italic font-light text-left">
              "{step.subCaption}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
