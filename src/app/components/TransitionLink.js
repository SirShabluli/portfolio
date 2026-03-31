"use client";
import { useTransition } from "../context/TransitionContext";

export default function TransitionLink({ href, children, className, style, onMouseEnter, onClick }) {
  const { navigate } = useTransition();

  const handleClick = (e) => {
    // Let external links, modifier keys, and same-page anchors pass through
    if (
      !href ||
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("#") ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      onClick?.(e);
      return;
    }
    e.preventDefault();
    onClick?.(e);
    navigate(href);
  };

  return (
    <a
      href={href}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
