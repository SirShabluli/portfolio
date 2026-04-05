"use client";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Overview", subs: [] },
  { id: "full-experience", label: "Full Experience", subs: [] },
  {
    id: "research",
    label: "Research & Discovery",
    subs: [
      { id: "the-challenge", label: "The Challenge" },
      { id: "understanding", label: "Understanding the Space" },
    ],
  },
  {
    id: "key-features",
    label: "Key Features",
    subs: [
      { id: "writing-experience", label: "Writing Experience" },
      { id: "mind-map", label: "Navigating the Mind Map" },
      { id: "ai-insights", label: "AI-Generated Insights" },
      { id: "atmosphere", label: "Emotional Atmosphere" },
    ],
  },
  { id: "design-system", label: "Design System", subs: [] },
  {
    id: "reception",
    label: "Reception & Impact",
    subs: [
      { id: "presentation", label: "Presentation" },
      { id: "what-i-learned", label: "What I Learned" },
      { id: "do-differently", label: "What I'd Do Differently" },
      { id: "future", label: "Future Potential" },
    ],
  },
];

const ALL_IDS = SECTIONS.flatMap((s) => [s.id, ...s.subs.map((sub) => sub.id)]);

function findParent(activeId) {
  for (const section of SECTIONS) {
    if (section.id === activeId) return section.id;
    if (section.subs.some((sub) => sub.id === activeId)) return section.id;
  }
  return null;
}

function SubList({ subs, activeId, hoveredId, scrollTo, isOpen }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(isOpen ? ref.current.scrollHeight : 0);
    }
  }, [isOpen, subs.length]);

  return (
    <div
      style={{
        overflow: "hidden",
        height,
        transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div ref={ref} className="flex flex-col gap-0.5 pt-0.5" style={{ paddingLeft: "0.625rem" }}>
        {subs.map((sub) => (
          <button
            key={sub.id}
            onClick={() => scrollTo(sub.id)}
            className="text-left cursor-pointer transition-opacity duration-200"
            style={{
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "white",
              opacity: activeId === sub.id || hoveredId === sub.id ? 0.8 : 0.3,
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
            onMouseLeave={(e) => e.currentTarget.style.opacity = activeId === sub.id ? 0.8 : 0.3}
          >
            {sub.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PageNav() {
  const [activeId, setActiveId] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState(null);
  const scrollingRef = useRef(false);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    const visible = new Map();

    const pickActive = () => {
      if (scrollingRef.current) return;
      let topmost = null;
      let topmostTop = Infinity;
      for (const [id, entry] of visible.entries()) {
        if (entry.isIntersecting && entry.boundingClientRect.top < topmostTop) {
          topmostTop = entry.boundingClientRect.top;
          topmost = id;
        }
      }
      if (topmost) setActiveId(topmost);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry);
        pickActive();
      },
      { threshold: 0.2 },
    );

    for (const id of ALL_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const activeParentId = findParent(activeId);

  const scrollTo = (id) => {
    scrollingRef.current = true;
    setActiveId(id);
    window.dispatchEvent(new CustomEvent("lenis-scroll-to", { detail: id }));
    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      scrollingRef.current = false;
    }, 1500);
  };

  const getIsOpen = (sectionId) => activeParentId === sectionId;

  return (
    <>
      <div
        className="fixed left-0 top-0 h-full z-40 hidden lg:block pointer-events-none"
        style={{ width: "19rem", background: "linear-gradient(to right, #000000 0%, transparent 100%)" }}
      />
      <nav
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 hidden lg:flex"
        style={{ fontFamily: "var(--font-raleway)" }}
      >
        {SECTIONS.map((section) => {
          const isParentActive = activeParentId === section.id;
          const isOpen = getIsOpen(section.id);
          return (
            <div
              key={section.id}
              className="flex flex-col gap-1"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <button
                onClick={() => scrollTo(section.id)}
                className="text-left cursor-pointer transition-opacity duration-200"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "white",
                  opacity: isParentActive || hoveredSection === section.id ? 0.8 : 0.3,
                }}
              >
                {section.label}
              </button>

              {section.subs.length > 0 && (
                <SubList
                  subs={section.subs}
                  activeId={activeId}
                  hoveredId={null}
                  scrollTo={scrollTo}
                  isOpen={isOpen}
                />
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
