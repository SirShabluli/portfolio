"use client";

export default function TextBlock({
  label,
  title,
  children,
  className = "",
  maxWidth = "100%", // אפשר להעביר max-w-[70%] וכו'
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <span className="text-sm italic opacity-50 ">{label}</span>}
      {title && <span className="text-2xl font-bold  ">{title}</span>}
      {children && (
        <p
          className="mt-3 text-sm font-medium whitespace-pre-line"
          style={{ maxWidth }}
        >
          {children}
        </p>
      )}
    </div>
  );
}
