"use client";
import { useState } from "react";

const LTR = {
  date: "Monday, March 17",
  question: "What's on your mind?",
  body: "The things I write here are mine alone.\nI feel like something shifted today,\nbut I can't quite name it yet.|",
  cursor: "keep writing...",
  words: ["memory", "emotion", "thought", "pain", "joy", "shift", "quiet"],
  nav: ["Map", "Write", "Settings"],
  dir: "ltr",
  align: "left",
  label: "LTR",
};

const RTL = {
  date: "יום שני, 17 במרץ",
  question: "על מה אתה חושב?",
  body: "הדברים שאני כותב כאן הם שלי בלבד.\nמרגיש שמשהו השתנה היום,\nאבל אני לא יכול לנסח את זה עדיין.|",
  cursor: "המשך לכתוב...",
  words: ["זיכרון", "רגש", "מחשבה", "כאב", "שמחה", "שינוי", "שקט"],
  nav: ["מפה", "כתיבה", "הגדרות"],
  dir: "rtl",
  align: "right",
  label: "RTL",
};

// Deterministic word positions — left column and right column, alternating
const WORD_POSITIONS = [
  { side: "left", top: "12%", offset: "2%" },
  { side: "right", top: "22%", offset: "2%" },
  { side: "left", top: "38%", offset: "3%" },
  { side: "right", top: "50%", offset: "1.5%" },
  { side: "left", top: "62%", offset: "1%" },
  { side: "right", top: "74%", offset: "3%" },
  { side: "left", top: "82%", offset: "2.5%" },
];

export default function BiDiMockup() {
  const [isRTL, setIsRTL] = useState(false);
  const data = isRTL ? RTL : LTR;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Toggle row */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsRTL(false)}
          className="cursor-pointer transition-opacity duration-200"
          style={{ opacity: isRTL ? 0.3 : 1 }}
        >
          <span
            className="text-white font-medium tracking-widest uppercase"
            style={{
              fontFamily: "'NarkissYairMono', monospace",
              fontSize: "0.65rem",
            }}
          >
            LTR
          </span>
        </button>

        <button
          onClick={() => setIsRTL((v) => !v)}
          className="relative rounded-full border border-white/25 cursor-pointer flex-shrink-0"
          style={{
            width: "2.4rem",
            height: "1.2rem",
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        >
          <span
            className="absolute rounded-full bg-white transition-all duration-300"
            style={{
              width: "0.85rem",
              height: "0.85rem",
              top: "50%",
              transform: "translateY(-50%)",
              left: isRTL ? "calc(100% - 1rem)" : "0.15rem",
            }}
          />
        </button>

        <button
          onClick={() => setIsRTL(true)}
          className="cursor-pointer transition-opacity duration-200"
          style={{ opacity: isRTL ? 1 : 0.3 }}
        >
          <span
            className="text-white font-medium tracking-widest uppercase"
            style={{
              fontFamily: "'NarkissYairMono', monospace",
              fontSize: "0.65rem",
            }}
          >
            RTL
          </span>
        </button>
      </div>

      {/* Mockup frame */}
      <div
        className="relative w-full rounded-sm overflow-hidden border border-white/10"
        style={{ aspectRatio: "16/9", backgroundColor: "#080808" }}
      >
        {/* ── Floating words (sides only, never center) ── */}
        {WORD_POSITIONS.map((pos, i) => {
          const word = data.words[i] ?? "";
          // In RTL mode, flip which side the word appears on
          const resolvedSide = isRTL
            ? pos.side === "left"
              ? "right"
              : "left"
            : pos.side;
          return (
            <span
              key={i}
              className="absolute pointer-events-none select-none transition-all duration-500"
              style={{
                top: pos.top,
                [resolvedSide]: pos.offset,
                fontFamily: "'Masada', serif",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.1)",
                letterSpacing: "0.04em",
              }}
            >
              {word}
            </span>
          );
        })}

        {/* ── 12×9 grid skeleton — columns + rows as lines ── */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 675"
        >
          {/* Column gutters — 11 vertical lines between 12 cols */}
          {Array.from({ length: 11 }).map((_, i) => {
            const x = ((i + 1) / 12) * 1200;
            return (
              <line
                key={`col-${i}`}
                x1={x}
                y1="0"
                x2={x}
                y2="675"
                stroke="rgba(0,255,100,0.25)"
                strokeWidth="10px"
              />
            );
          })}
          {/* Row gutters — 8 horizontal lines between 9 rows */}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = ((i + 1) / 9) * 675;
            return (
              <line
                key={`row-${i}`}
                x1="0"
                y1={y}
                x2="1200"
                y2={y}
                stroke="rgba(0,255,100,0.25)"
                strokeWidth="10px"
              />
            );
          })}
          {/* Outer border */}
          <rect
            x="0.5"
            y="0.5"
            width="1199"
            height="674"
            fill="none"
            stroke="rgba(0,255,100,0.2)"
            strokeWidth="1"
          />
        </svg>

        {/* ── Sidebar navigation — col 1 (0%–8.33%) ── */}
        <div
          className="absolute top-0 bottom-0 flex flex-col justify-center gap-3 transition-all duration-500"
          style={{
            [isRTL ? "right" : "left"]: "0%",
            width: `${100 / 12}%`,
            alignItems: "center",
            outline: "0.5px solid blue",
          }}
        >
          {data.nav.map((item, i) => (
            <span
              key={i}
              className="transition-all duration-500"
              style={{
                fontFamily: "'NarkissYairMono', monospace",
                fontSize: "0.42rem",
                color:
                  i === 1 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                letterSpacing: "0.06em",
                writingMode: "horizontal-tb",
                outline: "0.5px solid blue ",
              }}
            >
              {item}
            </span>
          ))}

          {/* Active indicator line */}
          <div
            className="transition-all duration-500"
            style={{
              width: "1px",
              height: "1.5rem",
              backgroundColor: "rgba(255,255,255,0.4)",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [isRTL ? "right" : "left"]: isRTL ? "-4px" : "-4px",
            }}
          />
        </div>

        {/* ── Date + Question stacked — LTR: col 2, RTL: col 9, row 1 ── */}
        <div
          className="absolute flex flex-col transition-all duration-500"
          style={{
            left: isRTL ? `${(100 / 12) * 9}%` : `${(100 / 12) * 1}%`,
            right: isRTL ? `${(100 / 12) * 1}%` : `${(100 / 12) * 9}%`,
            top: `${(100 / 9) * 1}%`,
            gap: "0.2rem",
            textAlign: data.align,
            outline: "0.5px solid blue",
          }}
        >
          <p
            style={{
              fontFamily: "'NarkissYairMono', monospace",
              fontSize: "0.45rem",
              color: "rgba(255,255,255,1)",
              letterSpacing: "0.1em",
            }}
          >
            {data.date}
          </p>
          <p
            style={{
              fontFamily: "'NarkissYairMono', monospace",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,1)",
              letterSpacing: "0.08em",
            }}
          >
            {data.question}
          </p>
        </div>

        {/* ── Body text — cols 2–8 LTR / cols 5–11 RTL, vertically centered ── */}
        <div
          className="absolute top-0 bottom-0 flex flex-col justify-center transition-all duration-500"
          style={{
            direction: data.dir,
            textAlign: data.align,
            left: isRTL ? `${(100 / 12) * 1}%` : `${(100 / 12) * 3}%`,
            right: isRTL ? `${(100 / 12) * 3}%` : `${(100 / 12) * 1}%`,
            outline: "0.5px solid blue",
          }}
        >
          {/* Body text — content font */}
          <p
            className="transition-all duration-500"
            style={{
              fontFamily: "'Masada', serif",
              fontWeight: 400,
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
              outline: "0.5px solid blue",
            }}
          >
            {data.body}
          </p>
        </div>

        {/* ── Direction badge — pinned to col 12 edge ── */}
        <div
          className="absolute bottom-2 transition-all duration-500"
          style={{
            [isRTL ? "left" : "right"]: `${100 / 12}%`,
            fontFamily: "'NarkissYairMono', monospace",
            fontSize: "0.42rem",
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.12em",
            outline: "1px solid red",
          }}
        >
          {isRTL ? "← RTL" : "LTR →"}
        </div>
      </div>
    </div>
  );
}
