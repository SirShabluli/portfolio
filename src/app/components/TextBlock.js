"use client";

export default function TextBlock({
  label,
  title,
  children,
  className = "",
  maxWidth = "100%", // אפשר להעביר max-w-[70%] וכו'
}) {
  return (
    <div className={`flex flex-col   ${className}`}>
      {label && (
        <span className="text-sm font-medium opacity-50 lg:text-xs">
          {label}
        </span>
      )}
      {title && (
        <span className="text-2xl font-light italic lg:text-xl">{title}</span>
      )}
      {children && (
        <p
          className="mt-2 leading-[150%] text-sm font-medium lg:leading-[130%] whitespace-pre-line lg:text-xs"
          style={{ maxWidth }}
        >
          {children}
        </p>
      )}
    </div>
  );
}
