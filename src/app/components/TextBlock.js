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
      {label && (
        <span className="text-[0.9rem] italic opacity-50 leading-tight">
          {label}
        </span>
      )}
      {title && (
        <span className="text-[1.4rem] font-bold leading-tight mt-0.2">
          {title}
        </span>
      )}
      {children && (
        <p className="mt-3" style={{ maxWidth }}>
          {children}
        </p>
      )}
    </div>
  );
}
