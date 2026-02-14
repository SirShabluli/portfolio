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
        <span className="text-xs font-medium opacity-50 ">{label}</span>
      )}
      {title && <span className="text-2xl font-medium  ">{title}</span>}
      {children && (
        <p
          className="mt-2 text-xs font-medium leading-[130%] whitespace-pre-line"
          style={{ maxWidth }}
        >
          {children}
        </p>
      )}
    </div>
  );
}
