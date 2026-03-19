"use client";
import { useEffect, useRef } from "react";

const CX = 1400;
const CY = 700;

// Radial helper — angle in degrees, radius
const polar = (cx, cy, angle, r, jitterX = 0, jitterY = 0) => ({
  x: Math.round(cx + r * Math.cos((angle * Math.PI) / 180) + jitterX),
  y: Math.round(cy + r * Math.sin((angle * Math.PI) / 180) + jitterY),
});

// Root
const root = { id: "e0", label: "Entry", x: CX, y: CY, type: "entry" };

// L1 — 7 questions spread around root
const l1angles = [0, 50, 105, 155, 210, 265, 315];
const l1r = 190;
const l1q = l1angles.map((a, i) => ({
  id: `q${i + 1}`,
  label: "Question",
  type: "question",
  ...polar(CX, CY, a, l1r, (i % 3) * 10 - 10, (i % 2) * 15 - 8),
}));

// L2 — exactly 1 entry per L1 question
let eCount = 1;
const l2entries = [];
const l2map = {};

l1q.forEach((q, i) => {
  const baseAngle = Math.atan2(q.y - CY, q.x - CX) * (180 / Math.PI);
  const id = `e${eCount++}`;
  l2map[q.id] = [id];
  l2entries.push({
    id,
    label: "Entry",
    type: "entry",
    ...polar(q.x, q.y, baseAngle, 140, (i % 3) * 8 - 8, (i % 2) * 12 - 6),
  });
});

// L3 — 2-3 questions per L2 entry
let qCount = l1q.length + 1;
const l3questions = [];
const l3map = {};

l2entries.forEach((entry, idx) => {
  const count = idx % 3 === 1 ? 3 : 2;
  const baseAngle = Math.atan2(entry.y - CY, entry.x - CX) * (180 / Math.PI);
  l3map[entry.id] = [];
  for (let i = 0; i < count; i++) {
    const spread =
      count === 2 ? (i === 0 ? -28 : 28) : i === 0 ? -42 : i === 1 ? 0 : 42;
    const id = `q${qCount++}`;
    l3questions.push({
      id,
      label: "Question",
      type: "question",
      ...polar(
        entry.x,
        entry.y,
        baseAngle + spread,
        195,
        i * 8 - 5,
        i * 10 - 8,
      ),
    });
    l3map[entry.id].push(id);
  }
});

// L4 — exactly 1 entry per L3 question
const l4entries = [];
const l4map = {};

l3questions.forEach((q, idx) => {
  const baseAngle = Math.atan2(q.y - CY, q.x - CX) * (180 / Math.PI);
  const id = `e${eCount++}`;
  l4map[q.id] = [id];
  l4entries.push({
    id,
    label: "Entry",
    type: "entry",
    ...polar(q.x, q.y, baseAngle, 175, (idx % 3) * 6 - 6, (idx % 2) * 8 - 4),
  });
});

const NODES = [root, ...l1q, ...l2entries, ...l3questions, ...l4entries];

const EDGES = [
  ...l1q.map((q) => [root.id, q.id]),
  ...l1q.flatMap((q) => l2map[q.id].map((child) => [q.id, child])),
  ...l2entries.flatMap((e) =>
    (l3map[e.id] || []).map((child) => [e.id, child]),
  ),
  ...l3questions.flatMap((q) =>
    (l4map[q.id] || []).map((child) => [q.id, child]),
  ),
];

// Build adjacency map for outward traversal
const childrenOf = {};
EDGES.forEach(([from, to]) => {
  if (!childrenOf[from]) childrenOf[from] = [];
  childrenOf[from].push(to);
});

// Build independent linear chains: root → q → e → q → e ...
// Each leaf path from root is one sequence
const BRANCH_SEQUENCES = [];

function buildChains(nodeId, chain) {
  const children = childrenOf[nodeId] || [];
  if (children.length === 0) {
    BRANCH_SEQUENCES.push([...chain]);
    return;
  }
  children.forEach((child) => {
    buildChains(child, [...chain, child]);
  });
}
buildChains(root.id, [root.id]);

export default function MindMapSVG() {
  const svgRef = useRef(null);
  const timeoutsRef = useRef([]);
  const hasAnimated = useRef(false);
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reset = () => {
      // Clear any in-flight timeouts
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      const lines = svg.querySelectorAll("line[data-edge]");
      const nodes = svg.querySelectorAll("[data-node]");

      lines.forEach((l) => {
        l.style.transition = "none";
        const len = l.getTotalLength?.() ?? 120;
        l.style.strokeDasharray = len;
        l.style.strokeDashoffset = len;
      });
      nodes.forEach((n) => {
        n.style.transition = "none";
        n.style.opacity = 0;
      });
    };

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      reset();

      const lineDur = 250;
      const nodeDur = 100;
      const shownNodes = new Set();
      const shownEdges = new Set();

      const after = (fn, delay) => {
        const id = setTimeout(fn, delay);
        timeoutsRef.current.push(id);
      };

      const showNode = (id, at) => {
        if (shownNodes.has(id)) return;
        shownNodes.add(id);
        after(() => {
          const el = svg.querySelector(`[data-node="${id}"]`);
          if (el) {
            el.style.transition = `opacity ${nodeDur}ms ease`;
            el.style.opacity = 1;
          }
        }, at);
      };

      const drawEdge = (from, to, at) => {
        const key = `${from}-${to}`;
        if (shownEdges.has(key)) return;
        shownEdges.add(key);
        after(() => {
          const el = svg.querySelector(`line[data-edge="${key}"]`);
          if (el) {
            el.style.transition = `stroke-dashoffset ${lineDur}ms ease`;
            el.style.strokeDashoffset = 0;
          }
        }, at);
      };

      showNode(root.id, 0);

      BRANCH_SEQUENCES.forEach((chain, bi) => {
        const streamStart = bi * 120;
        let t = streamStart + nodeDur;

        for (let i = 1; i < chain.length; i++) {
          const from = chain[i - 1];
          const to = chain[i];
          drawEdge(from, to, t);
          t += lineDur;
          showNode(to, t);
          t += nodeDur;
        }
      });
    };

    // Initial hidden state
    reset();

    const onScroll = () => {
      const rect = svg.getBoundingClientRect();
      if (!hasAnimated.current && rect.top < window.innerHeight * 0.8) {
        animate();
      }
      if (hasAnimated.current && (rect.bottom < 0 || rect.top > window.innerHeight)) {
        hasAnimated.current = false;
        reset();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        viewBox="0 0 2800 1400"
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        {EDGES.map(([from, to]) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          if (!a || !b) return null;
          return (
            <line
              key={`${from}-${to}`}
              data-edge={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(255,255,255,0.60)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          );
        })}
        {NODES.map((node) => (
          <g key={node.id} data-node={node.id}>
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              stroke="black"
              strokeWidth={16}
              strokeLinejoin="round"
              paintOrder="stroke"
              fill={node.type === "entry" ? "white" : "rgba(255,255,255,0.90)"}
              fontSize={node.id === "e0" ? 72 : node.type === "entry" ? 44 : 44}
              fontFamily="'Reenie Beanie', cursive"
              fontWeight={node.type === "entry" ? 600 : 400}
              letterSpacing="0.05em"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </>
  );
}
