import Image from "next/image";

export default function StepSection({ step, index }) {
  return (
    <div
      className={`step-container step-container-${index} absolute inset-0 grid grid-cols-12 h-screen w-full items-start gap-8 px-12 text-white ${index === 0 ? "bg-black" : ""}`}
      data-step={index}
    >
      <div
        className={`text-side text-side-${index} col-start-2 col-span-3 flex flex-col items-start justify-start pt-24 z-50`}
      >
        <span className="text-[0.9rem] italic opacity-50 leading-tight">
          Step {step.id}
        </span>
        <h2 className="text-[1.4rem] font-bold leading-tight mt-0.5">
          {step.title}
        </h2>
        <p className="mt-3 max-w-sm">{step.description}</p>
        <p className="mt-4 opacity-40 italic font-light text-left min-h-12">
          {step.subCaption ? `"${step.subCaption}"` : "\u00A0"}
        </p>
      </div>

      <div
        className={`image-side image-side-${index} col-end-10 col-span-4 h-full flex flex-col justify-center relative`}
      >
        <div className="relative">
          {/* Image with clipPath animation */}
          <div className="image-wrapper">
            <Image
              src={step.image}
              width={1000}
              height={1000}
              className={`w-full h-auto shadow-2xl rounded-sm border border-white/5 ${step.imageClassName || ""}`}
              alt={step.title}
            />
          </div>

          {/* Floating quotes - outside clipPath wrapper */}
          {step.quotes && step.quotes.length > 0 && (
            <>
              <div className="floating-quote absolute -top-16 -right-32 opacity-0 max-w-48">
                <p className="text-sm italic">
                  &ldquo;{step.quotes[0]?.text}&rdquo;
                </p>
                <p className="text-xs opacity-50 mt-1">
                  — {step.quotes[0]?.author}
                </p>
              </div>
              {step.quotes[1] && (
                <div className="floating-quote absolute -bottom-20 -left-40 opacity-0 max-w-52">
                  <p className="text-sm italic">
                    &ldquo;{step.quotes[1]?.text}&rdquo;
                  </p>
                  <p className="text-xs opacity-50 mt-1">
                    — {step.quotes[1]?.author}
                  </p>
                </div>
              )}
              {step.quotes[2] && (
                <div className="floating-quote absolute top-1/2 -right-48 opacity-0 max-w-44">
                  <p className="text-sm italic">
                    &ldquo;{step.quotes[2]?.text}&rdquo;
                  </p>
                  <p className="text-xs opacity-50 mt-1">
                    — {step.quotes[2]?.author}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
