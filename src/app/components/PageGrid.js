export default function PageGrid({ children, className = "" }) {
  return (
    <div
      className={`grid grid-cols-4 lg:grid-cols-12 gap-x-3 lg:gap-x-6 px-3 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
