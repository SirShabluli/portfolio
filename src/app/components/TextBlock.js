"use client";

export default function TextBlock({ label, title, children, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <span className="text-[0.9rem] italic opacity-50 leading-tight">
          {label}
        </span>
      )}
      {title && (
        <span className="text-[1.5rem] font-bold leading-tight mt-0.5">
          {title}
        </span>
      )}
      {children && <p className="mt-4">{children}</p>}
    </div>
  );
}
