export default function Button({
  children,
  size = "medium",
  variant = "primary",
  font = "raleway", // ברירת מחדל: raleway
  onClick,
  className = "",
  ...props
}) {
  // Base styles שחלים על כל הכפתורים
  const baseStyles =
    "inline-flex items-center justify-center transition-all duration-200 ";

  // Size variants
  const sizeStyles = {
    small: "px-4 py-2 text-sm  font-bold",
    medium: "px-6 py-3 text-base font-bold",
    large: "px-8 py-4 text-lg",
  };

  // Font variants
  const fontStyles = {
    raleway: "font-raleway",
    netflix: "font-netflix",
    netflixBold: "font-netflix font-bold",
    cinzel: "font-cinzel",
    sans: "font-sans",
    mono: "font-mono",
  };

  // Color/Style variants
  const variantStyles = {
    primary:
      "bg-black text-lg text-white font-bold hover:bg-black hover:scale-105",
    secondary:
      "bg-black text-white border border-white hover:bg-white hover:text-black",
    outline:
      "bg-transparent text-white border border-white hover:bg-white hover:text-black",
    unselected:
      "bg-white/40 text-black hover:bg-white hover:text-black hover:border-white",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${fontStyles[font]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
