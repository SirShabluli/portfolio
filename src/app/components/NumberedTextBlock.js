"use client";

export default function NumberedTextBlock({
  number,
  title,
  children,
  className = "",
}) {
  return (
    <div className={`grid grid-cols-3 items-center gap-6 ${className}`}>
      <span className="text-[6rem] lg:text-[11.875rem] font-raleway font-medium leading-none col-span-1 tabular-nums">
        {number}
      </span>
      <div className="flex flex-col justify-center col-span-2">
        {title && <span className="text-xl lg:text-2xl font-light italic">{title}</span>}
        {children && (
          <p className="mt-2 text-sm lg:text-xs font-medium leading-[150%] lg:leading-[130%] whitespace-pre-line">
            {children}
          </p>
        )}
      </div>
    </div>
  );
}
