"use client";

export default function NumberedTextBlock({
  number,
  title,
  children,
  className = "",
}) {
  return (
    <div
      className={`grid grid-cols-4 lg:grid-cols-3 items-center  lg:gap-6 ${className}`}
    >
      <span className="col-span-1 text-9xl lg:text-[11.875rem] font-raleway font-medium leading-none tabular-nums">
        {number}
      </span>
      <div className="col-span-3 lg:col-span-2 flex flex-col justify-center">
        {title && (
          <span className="text-xl lg:text-2xl font-light italic">{title}</span>
        )}
        {children && (
          <p className="mt-2 text-sm lg:text-xs font-medium leading-[150%] lg:leading-[130%] whitespace-pre-line">
            {children}
          </p>
        )}
      </div>
    </div>
  );
}
