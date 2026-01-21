import Image from "next/image";

export default function StepSection({ step, index }) {
  return (
    <div
      className={`step-container step-container-${index} absolute inset-0 grid grid-cols-12 h-screen w-full items-center gap-8 px-12 text-white ${index === 0 ? "bg-black" : ""}`}
      data-step={index}
    >
      <div className={`text-side text-side-${index} col-start-2 col-span-3 flex flex-col justify-center`}>
        <span className="text-sm uppercase tracking-widest opacity-40 font-mono">
          Step {step.id}
        </span>
        <h2 className="text-5xl font-bold mt-2 leading-tight">{step.title}</h2>
        <p className="text-xl mt-6 opacity-70 max-w-sm leading-relaxed">
          {step.description}
        </p>
        {/* ... שאר תוכן הטקסט (quotes וכו') */}
      </div>

      <div className={`image-side image-side-${index} col-end-10 col-span-4 flex flex-col justify-center`}>
        <Image
          src={step.image}
          width={1000}
          height={1000}
          className="w-full h-auto shadow-2xl rounded-sm border border-white/5"
          alt={step.title}
        />
        {step.subCaption && (
          <p className="mt-8 opacity-40 italic font-light text-left">
            "{step.subCaption}"
          </p>
        )}
      </div>
    </div>
  );
}
