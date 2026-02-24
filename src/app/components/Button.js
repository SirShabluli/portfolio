export default function Button({
  children,
  size = "medium",
  variant = "filled",
  color = "#000000",
  onClick,
  className = "",
  style = {},
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center transition-all hover:opacity-80 duration-200 cursor-pointer";

  const sizeStyles = {
    small: "px-4 py-2 text-sm font-bold",
    medium: "px-6 py-3 text-base font-bold",
    large: "px-8 py-4 text-lg font-bold",
  };

  const variantColor = {
    filled: {
      backgroundColor: color,
      color: "var(--bg, #fff)",
      borderColor: color,
    },
    outline: {
      backgroundColor: "transparent",
      color: color,
      borderColor: color,
    },
    ghost: { backgroundColor: "transparent", color: color },
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variant !== "ghost" ? "border" : ""} ${className}`}
      style={{ ...variantColor[variant], ...style }}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
