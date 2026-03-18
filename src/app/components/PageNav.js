"use client";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    id: "hero",
    label: "Overview",
    subs: [],
  },
  {
    id: "full-experience",
    label: "Full Experience",
    subs: [],
  },
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
      { id: "composition", label: "The Composition" },
      { id: "mind-map", label: "Mind Map" },
      { id: "composition-focus", label: "Composition Focus" },
      { id: "ai-insights", label: "AI Insights" },
      { id: "atmosphere", label: "Emotional Atmosphere" },
      { id: "design-modularity", label: "Design for Modularity" },
    ],
  },
  {
    id: "design-system",
    label: "Design System",
    subs: [],
  },
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

function SubList({ subs, activeId, scrollTo, isOpen }) {
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
        height: height,
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
              fontSize: "0.625rem",
              fontWeight: 400,
              color: "white",
              opacity: activeId === sub.id ? 0.8 : 0.3,
            }}
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

  useEffect(() => {
    const visible = new Map();

    const pickActive = () => {
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
        for (const entry of entries) {
          visible.set(entry.target.id, entry);
        }
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Gradient fade behind the nav */}
      <div
        className="fixed left-0 top-0 h-full z-40 hidden lg:block pointer-events-none"
        style={{
          width: "19rem",
          background: "linear-gradient(to right, #000000 0%, transparent 100%)",
        }}
      />
      <nav
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 hidden lg:flex"
        style={{ fontFamily: "var(--font-raleway)" }}
      >
        {SECTIONS.map((section) => {
          const isParentActive = activeParentId === section.id;
          return (
            <div key={section.id} className="flex flex-col gap-1">
              <button
                onClick={() => scrollTo(section.id)}
                className="text-left cursor-pointer transition-opacity duration-200"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "white",
                  opacity: isParentActive ? 0.8 : 0.3,
                }}
              >
                {section.label}
              </button>

              {section.subs.length > 0 && (
                <SubList
                  subs={section.subs}
                  activeId={activeId}
                  scrollTo={scrollTo}
                  isOpen={isParentActive}
                />
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
