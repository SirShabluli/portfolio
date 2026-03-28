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
        <span className="text-sm font-regular lg:mb-1 lg:text-sm">
          {label}
        </span>
      )}
      {title && (
        <span className="text-2xl font-medium italic lg:text-xl">{title}</span>
      )}
      {children && (
        <p
          className="mt-2 leading-[160%] text-sm font-medium lg:leading-[170%] whitespace-pre-line lg:text-sm"
          style={{ maxWidth }}
        >
          {children}
        </p>
      )}
    </div>
  );
}
