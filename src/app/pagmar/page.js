"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import PageGrid from "../components/PageGrid";
import TextBlock from "../components/TextBlock";
import ImageCarousel from "../components/ImageCarousel";
import MindMapSVG from "../components/MindMapSVG";
import { LAYOUTS } from "../components/simulation/ConstellationCanvas";
import Button from "../components/Button";
import ConfigBackground from "../components/ConfigBackground";
import TypographySection from "../components/TypographySection";
import HorizontalScroll from "../components/HorizontalScroll";
import BiDiMockup from "../components/BiDiMockup";
import TabPages from "../components/TabPages";
import ClickToPlay from "../components/ClickToPlay";
import ScrollDissolve from "../components/ScrollDissolve";
import RevealText from "../components/RevealText";
import LearnedTabs from "../components/LearnedTabs";

const ConstellationCanvas = dynamic(
  () => import("../components/simulation/ConstellationCanvas"),
  { ssr: false },
);

function KeyCap({ label, topText, bottomText, size = "medium" }) {
  const sizes = {
    small: {
      width: "3rem",
      height: "1.6rem",
      fontSize: "11px",
      padding: "3px",
    },
    medium: {
      width: "3.8rem",
      height: "2.2rem",
      fontSize: "14px",
      padding: "7px",
    },
    square: {
      width: "3.5rem",
      height: "3.5rem",
      fontSize: "14px",
      padding: "7px",
    },
    large: {
      width: "7rem",
      height: "3.5rem",
      fontSize: "18px",
      padding: "6px",
    },
  };
  const s = sizes[size];
  const labelStyle = {
    fontFamily: "'NarkissYairMono-Regular', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: s.fontSize,
    color: "#ffffff",
    textAlign: "center",
    whiteSpace: "nowrap",
    lineHeight: 1.1,
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 0.5,
      }}
    >
      {topText && (
        <div style={{ ...labelStyle, marginBottom: "5px" }}>{topText}</div>
      )}
      <div
        style={{
          width: s.width,
          height: s.height,
          padding: s.padding,
          background: "rgba(0,0,0,0.2)",
          border: "2px solid #ffffff",
          borderRadius: "8px",
          color: "#ffffff",
          fontFamily: "'NarkissYairMono-Regular', 'Segoe UI', sans-serif",
          fontSize: s.fontSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        {label}
      </div>
      {bottomText && (
        <div style={{ ...labelStyle, marginTop: "5px" }}>{bottomText}</div>
      )}
    </div>
  );
}

const MOODS = [
  {
    id: "night",
    label: "Night",
    description:
      "Stars drift slowly above, deep silence broken only by distant wind",
    video: "/videos/pagmar/starsBackground.mp4",
  },
  {
    id: "fire",
    label: "Fire",
    description: "Sparks rise upward, warm crackling sounds",
    video: "/videos/pagmar/fireBackground.mp4",
  },
  {
    id: "rain",
    label: "Rain",
    description:
      "Droplets fall steadily, soft patter filling the space around you",
    video: "/videos/pagmar/rainBackground.mp4",
  },
  {
    id: "dream",
    label: "Dream",
    description:
      "Gentle waves of light, slow breathing rhythm, weightless stillness",
    video: "/videos/pagmar/dreamBackground.mp4",
  },
  {
    id: "underwater",
    label: "Underwater",
    description:
      "Particles drift like bubbles, muffled low tones, suspended in depth",
    video: "/videos/pagmar/underwaterBackground.mp4",
  },
];

export default function PagmarPage() {
  const [activeLayoutId, setActiveLayoutId] = useState("tunnel");
  const activeLayout = LAYOUTS.find((l) => l.id === activeLayoutId);
  const [activeMood, setActiveMood] = useState("night");
  const [moodVisible, setMoodVisible] = useState(true);

  function switchMood(id) {
    if (id === activeMood) return;
    setMoodVisible(false);
    setTimeout(() => {
      setActiveMood(id);
      setMoodVisible(true);
    }, 400);
  }

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-screen flex items-end overflow-hidden"
      >
        {/* Background photo — swap src when ready */}
        <div className="absolute inset-0 z-0">
          {/* <Image src="/images/pagmar/hero-bg.jpg" alt="" fill className="object-cover" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        <PageGrid className="relative z-10 gap-8 w-full px-6 lg:px-12 pb-20 lg:pb-28">
          {/* Main title placeholder */}
          <div className="lg:col-start-4 col-span-4 lg:col-span-8">
            <h1 className="text-[4rem] lg:text-8xl font-bold leading-[1.2] tracking-tight">
              I'll Think About it Later
            </h1>
          </div>
          {/* Smaller title */}
          <div className="col-span-4 lg:col-start-4 lg:col-span-12 mt-32 lg:mt-0">
            <p className="text-xs lg:text-2xl font-medium tracking-widest uppercase opacity-50 mb-4">
              A new AI integrated journaling experience
            </p>
          </div>

          {/* Description + Metadata stacked */}
          <div className="col-span-4 lg:col-span-8 lg:col-start-4 mt-4 lg:mt-8 flex flex-col gap-6">
            <p className="text-sm lg:text-base  font-medium opacity-80 leading-[160%] max-w-lg">
              A system that transforms how you write — spatially, emotionally,
              guided by questions that help you go deeper. Your thoughts become
              an explorable 3D world, revealing patterns and connections you
              couldn't see before.
            </p>
            <div className="flex flex-wrap gap-6 lg:gap-10">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium tracking-wider uppercase opacity-50">
                  Role
                </p>
                <p className="text-sm font-medium">UX/UI Design, Development</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium tracking-wider uppercase opacity-50">
                  Course
                </p>
                <p className="text-sm font-medium">Final Project</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium tracking-wider uppercase opacity-50">
                  Year
                </p>
                <p className="text-sm font-medium">2025</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium tracking-wider uppercase opacity-50">
                  Duration
                </p>
                <p className="text-sm font-medium">3 months</p>
              </div>
            </div>
          </div>
        </PageGrid>
      </section>

      {/* The Full Experience */}
      <section
        id="full-experience"
        className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8"
      >
        <PageGrid className="gap-8 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            The Full Experience
          </p>
          {/* Video placeholder — replace src when ready */}
          <div className="col-span-4 lg:col-span-10 lg:col-start-2 aspect-video bg-white/5 rounded-sm overflow-hidden">
            {/* <video src="/images/pagmar/demo.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" /> */}
          </div>
        </PageGrid>
      </section>

      {/* Research and Discovery */}
      <section
        id="research"
        className="w-screen h-screen flex items-center justify-center bg-black"
      >
        <h2 className="display text-center text-white">
          Research &amp; Discovery
        </h2>
      </section>

      {/* The Challenge */}
      <section
        id="the-challenge"
        className="bg-black py-16 lg:py-24 px-6 lg:px-12 justify-center"
      >
        <PageGrid className="gap-12 items-center">
          <div className="col-span-4 lg:col-span-3 lg:col-start-3 flex flex-col gap-4">
            <h3 className="text-4xl font-semibold">The Challenge</h3>
            <p className="text-sm font-medium opacity-100 leading-[160%]">
              Traditional journaling treats thoughts like a document:
              chronological, linear, one entry after another. But thinking isn't
              like that. You lose your thread, want to branch off, need to add
              context to something earlier—and the format fights you. It's hard
              to start, harder to sustain.
            </p>
          </div>
          <div className="col-span-4 lg:col-span-5 lg:col-start-7 flex flex-col gap-4">
            <Image
              src="/images/pagmar/dayone.webp"
              alt="Day One"
              width={800}
              height={800}
              className="w-full h-auto rounded-sm"
            />
            <Image
              src="/images/pagmar/journal.png"
              alt="Journal"
              width={800}
              height={800}
              className="w-3/4 h-auto rounded-sm self-end"
            />
          </div>
        </PageGrid>
      </section>

      {/* Anecdotes */}
      <section
        id="understanding"
        className="bg-black py-16 lg:py-24 px-6 lg:px-12"
      >
        <PageGrid className="gap-y-12 gap-x-8 items-start">
          <div className="col-span-4 lg:col-span-5 lg:col-start-3 flex flex-col gap-4">
            <h3 className="text-4xl lg:py-24 font-semibold">
              Understanding the Space
            </h3>
          </div>
          {/* Anecdotes in a row */}
          <div className="col-span-4 lg:col-span-2 lg:col-start-3">
            <TextBlock
              label="Anecdote #1"
              title="Thoughts are spatial, not linear"
              className="text-white"
            >
              Thoughts branch and loop back. Linear writing forces one thread,
              abandons others. Memory clusters in space, not time.
            </TextBlock>
          </div>
          <div className="col-span-4 lg:col-span-2 lg:col-start-6">
            <TextBlock
              label="Anecdote #2"
              title="Navigation should feel like wandering, not searching"
              className="text-white"
            >
              Chronological order can't capture branching thoughts. There's a
              magic to wandering.
            </TextBlock>
          </div>
          <div className="col-span-4 lg:col-span-2 lg:col-start-9">
            <TextBlock
              label="Anecdote #3"
              title="Emotion shapes memory more than words do"
              className="text-white"
            >
              Atmosphere unlocks emotion. The system senses mood—night, fire,
              rain, calm—or you choose. Memory is feeling, not text.
            </TextBlock>
          </div>

          {/* Closing paragraph right */}
          <div className="col-span-4 lg:col-span-8 lg:col-start-3 flex items-center h-full">
            <RevealText className="text-base lg:py-24 lg:text-5xl font-regular opacity-60 leading-[130%]">
              what if journaling wasn't about capturing thoughts in order, but
              creating a space where they could exist, connect, and reveal
              themselves over time?
            </RevealText>
          </div>
          <div className="col-span-4 lg:col-span-4 lg:col-start-3 flex flex-col gap-4 mt-10">
            <h3 className="text-4xl font-semibold">The Solution</h3>
            <p className="text-sm font-medium opacity-100 leading-[160%]">
              A system that turns journaling into a spatial, AI-guided
              experience. You write. The atmosphere responds. The question
              vanishes after you answer, leaving only your thoughts. You can
              continue the flow, branch into new questions, or revisit earlier
              threads. Over time, a 3D world emerges - a spatial map of your
              inner landscape, where every composition is a place you can
              explore.
            </p>
          </div>
        </PageGrid>
      </section>
      <section
        id="key-features"
        className="w-screen h-screen flex items-center justify-center bg-black"
      >
        <h2 className="display text-center text-white">Key Features</h2>
      </section>
      {/* Feature #1 - The Writing Experience */}
      <section
        id="writing-experience"
        className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-30"
      >
        <PageGrid className="gap-10 w-full px-6 lg:px-12">
          <p className="col-span-4 font-medium lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl lg:my-20">
            Feature #1 — The Writing Experience
          </p>
          <div className="col-span-4 lg:col-span-3 lg:col-start-3">
            <TextBlock
              label="The Challenge"
              title="Losing Your Thread"
              className="text-white"
            >
              Writing intuitively means sometimes losing your thread. You get
              stuck or circle without clarity.
            </TextBlock>
          </div>
          <div className="col-span-4 lg:col-span-3 lg:col-start-7">
            <TextBlock
              label="My Solution"
              title="Real-Time Guidance"
              className="text-white"
            >
              Words from your writing float faintly in the background. When
              you're stuck, press Tab — they come forward. Choose one, receive a
              question that helps you go deeper.
            </TextBlock>
          </div>
          <div
            className="col-span-4 lg:col-span-10 lg:col-start-2 flex flex-col lg:mt-20"
            style={{ gap: 15 }}
          >
            <ClickToPlay
              src="/videos/pagmar/select word.mp4"
              className="bg-white/5 rounded-sm overflow-hidden"
              style={{ aspectRatio: "1755/1080" }}
            />
            <p className="text-sm font-medium leading-[160%] opacity-40 lg:pl-[10%]">
              Write freely. Stuck? Tab → choose word → get question. Question
              vanishes, thoughts remain.
            </p>
          </div>
        </PageGrid>
      </section>
      {/* The Composition */}
      <section
        id="composition"
        className="w-full min-h-screen font-medium bg-black flex flex-col justify-center py-16 lg:py-24 gap-8"
      >
        <PageGrid className="gap-y-8 lg:gap-y-30 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            The Composition
          </p>
          <div className="col-span-4 lg:col-span-3 lg:col-start-3">
            <TextBlock
              label="The Challenge"
              title="UI that Distracts"
              className="text-white"
            >
              I experimented with how questions should appear — pulsing,
              shaking, bold. Every variation pulled focus. The animations
              distracted from writing itself.
            </TextBlock>
          </div>
          <div className="col-span-4 lg:col-span-12">
            <ImageCarousel
              imgHeight="50vh"
              images={[
                "/images/pagmar/carousel1.png",
                "/images/pagmar/carousel2.png",
                "/images/pagmar/carousel3.png",
                "/images/pagmar/carousel4.png",
                "/images/pagmar/carousel5.png",
              ]}
            />
          </div>

          <div className="col-span-4 lg:col-span-3 lg:col-start-3">
            <TextBlock
              label="My Solution"
              title="Minimal Composition"
              className="text-white"
            >
              I stripped it down to something familiar: a journal page. Date,
              time, a small question at the top — then space. Just text and a
              blinking cursor that says "just write."
            </TextBlock>
          </div>
          <ScrollDissolve
            before="/images/pagmar/noScroll.png"
            after="/images/pagmar/noScrollActual.png"
            alt="Minimal composition"
            className="col-span-4 lg:col-span-9 lg:col-start-3 rounded-sm overflow-hidden"
            style={{ border: "0.5px solid rgba(255,255,255,0.2)" }}
          />
          <div className="col-span-4 lg:col-span-3 lg:col-start-3 flex items-center">
            <TextBlock
              label="New Challenge Arised"
              title="Long Entries Need Room"
              className="text-white"
            >
              The initial layout worked for short entries. But what happens when
              users write longer reflections requiring scroll? Words floating on
              top and bottom would obstruct vertical movement, breaking the
              flow.
            </TextBlock>
          </div>
          <div
            className="col-span-4 lg:col-span-6 lg:col-start-6 rounded-sm overflow-hidden"
            style={{ border: "0.5px solid rgba(255,255,255,0.2)" }}
          >
            <Image
              src="/images/pagmar/overlap.png"
              alt="Overlap"
              width={1600}
              height={900}
              className="w-full h-auto"
            />
          </div>
          <div className="col-span-4 lg:col-span-3 lg:col-start-3 flex flex-col gap-12">
            <TextBlock
              label="New Solution"
              title="Keep Vertical Space Clear"
              className="text-white"
            >
              I moved all floating words to the sides only, keeping the top and
              bottom clear. Vertical space stays unobstructed for seamless
              scrolling.
            </TextBlock>
          </div>
          <ScrollDissolve
            before="/images/pagmar/withScroll.png"
            after="/images/pagmar/withScrollActual.png"
            alt="Keeping vertical space clean"
            className="col-span-4 lg:col-span-9 lg:col-start-3 rounded-sm overflow-hidden"
            style={{ border: "0.5px solid rgba(255,255,255,0.2)" }}
          />
        </PageGrid>
      </section>
      {/* Feature #2 - Navigating the Mind Map */}
      <section id="mind-map" className="w-full bg-black pt-16 lg:pt-24">
        <PageGrid className="w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            Feature #2 — Navigating the Mind Map
          </p>
        </PageGrid>
      </section>
      {/* Mapping Non-Linear Thought */}
      <section className="w-full bg-black py-16 lg:py-24">
        <PageGrid className="gap-y-8 lg:gap-y-12 w-full px-6 lg:px-12">
          <div className="col-span-4 lg:col-span-3 lg:col-start-3">
            <TextBlock
              label="The Challenge"
              title="Mapping Non-Linear Thought"
              className="text-white"
            >
              Thoughts are messy — they branch, scatter, reconnect. Traditional
              navigation (breadcrumbs, trees, nodes) can't handle that.
            </TextBlock>
          </div>
          <div className="col-span-4 lg:col-span-12">
            <MindMapSVG />
          </div>
          {/* <p className="col-span-4 lg:col-span-10 lg:col-start-3 lg:mt-12 text-xs">
            Rigid structure couldn't capture how thoughts actually connect
          </p> */}
        </PageGrid>
      </section>

      {/* My Solution — Free Movement in 3D Space */}
      <section className="w-full bg-black py-16 lg:py-24">
        <PageGrid className="gap-y-8 lg:gap-y-20 w-full px-6 lg:px-12">
          <div className="col-span-4 lg:col-span-3 lg:col-start-3">
            <TextBlock
              label="My Solution"
              title="Free Movement in 3D Space"
              className="text-white"
            >
              Navigation is spatial. Move with arrows/W/S, Enter to step inside,
              Esc to explore. Compositions arrange organically—a new way to
              navigate.
            </TextBlock>
          </div>
          {/* Keyboard controls diagram */}
          <div className="col-span-4 lg:col-span-5 lg:col-start-7 flex items-center">
            <div className="flex items-end gap-6">
              {/* Esc */}
              <KeyCap label="Esc" size="large" bottomText="explore mode" />
              {/* Enter */}
              <KeyCap label="Return" size="large" bottomText="enter note" />
              {/* W / S column */}
              <div className="flex flex-col items-center gap-1">
                <KeyCap label="W" size="medium" topText="zoom in" />
                <KeyCap label="S" size="medium" bottomText="zoom out" />
              </div>
              {/* Arrow cluster */}
              <div className="flex flex-col items-center gap-1">
                <KeyCap label="↑" size="medium" />
                <div className="flex gap-1">
                  <KeyCap label="←" size="medium" />
                  <KeyCap label="↓" size="medium" bottomText="move" />
                  <KeyCap label="→" size="medium" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-span-4 lg:col-span-10 lg:col-start-2 flex flex-col"
            style={{ gap: 20 }}
          >
            <ClickToPlay
              src="/videos/pagmar/Navigation.mp4"
              className="bg-white/5 rounded-sm overflow-hidden"
              style={{ aspectRatio: "1722/1080" }}
            />
            <p className="text-xs font-medium leading-[160%] opacity-50 lg:pl-[10%]">
              Move with arrows, zoom with W/S, Enter to step inside, Esc to
              explore. No mouse—just spatial wandering.
            </p>
          </div>
        </PageGrid>
      </section>
      <section
        id="composition-focus"
        className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8"
      >
        <PageGrid className="gap-y-8 lg:gap-y-22 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            Composition Focus
          </p>
          <div className="col-span-4 lg:col-span-3 lg:col-start-3">
            <TextBlock
              label="The Challenge"
              title="Focus vs Richness"
              className="text-white"
            >
              A rich 3D world is great for exploring. But when writing, it
              becomes distracting noise.
            </TextBlock>
          </div>
          <div
            className="col-span-4 lg:col-span-10 lg:col-start-2 flex flex-col"
            style={{ gap: 20 }}
          >
            <ClickToPlay
              src="/videos/pagmar/toggleshort.mp4"
              className="bg-white/5 rounded-sm overflow-hidden"
              style={{ aspectRatio: "1722/1080" }}
            />
            <p className="text-xs opacity-50 font-mono lg:pl-[10%]">
              Enter: world disappears. Esc: world returns. Focus ↔ exploration.
            </p>
          </div>
          <div className="col-span-4 lg:col-span-3 lg:col-start-3">
            <TextBlock
              label="My Solution"
              title="Context-Aware Visibility"
              className="text-white"
            >
              Enter: everything disappears, only writing remains. Esc: world
              returns. Richness for exploring, clarity for writing.
            </TextBlock>
          </div>
        </PageGrid>
      </section>

      {/* Feature #3 - AI-Generated Insights */}
      <section
        id="ai-insights"
        className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8"
      >
        <PageGrid className="gap-y-8 lg:gap-y-12 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl lg:py-24  font-medium">
            Feature #3 — AI-Generated Insights
          </p>
          <div className="col-span-4 lg:col-span-3 lg:col-start-3">
            <TextBlock
              label="The Challenge"
              title="Making Sense of Volume"
              className="text-white"
            >
              Not everything you write carries equal weight. Some moments matter
              more. Some words hold emotional charge. But in the flow, it's hard
              to see which ones.
            </TextBlock>
          </div>
          <div className="col-span-4 lg:col-span-3 lg:col-start-7">
            <TextBlock
              label="My Solution"
              title="AI as Your Second Voice"
              className="text-white"
            >
              As you write, AI extracts insights and arranges them in the 3D
              space.
            </TextBlock>
          </div>

          {/* Canvas — left 8 cols */}
          <div
            className="col-span-4 lg:col-span-7 lg:col-start-3"
            style={{ height: "560px" }}
          >
            <ConstellationCanvas activeId={activeLayoutId} />
          </div>

          {/* Description + buttons — right 3 cols */}
          <div className="col-span-4 lg:col-span-2 lg:col-start-10 flex flex-col justify-between gap-8 py-4">
            <TextBlock
              label={activeLayout.label}
              title={activeLayout.title}
              className="text-white"
            >
              {activeLayout.description}
            </TextBlock>
            <div className="flex flex-col gap-3">
              {["clouds", "tunnel", "scattered"]
                .map((id) => LAYOUTS.find((l) => l.id === id))
                .map((l) => (
                  <Button
                    key={l.id}
                    variant={activeLayoutId === l.id ? "filled" : "outline"}
                    color="#ffffff"
                    size="small"
                    onClick={() => setActiveLayoutId(l.id)}
                    style={activeLayoutId === l.id ? { color: "#000000" } : {}}
                  >
                    {l.label}
                  </Button>
                ))}
            </div>
          </div>
        </PageGrid>
      </section>

      {/* Feature #4 - Emotional Atmosphere */}
      <section
        id="atmosphere"
        className="relative w-full min-h-screen flex flex-col justify-center py-16 lg:pb-40 gap-8 overflow-hidden"
      >
        {/* Background video */}
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: moodVisible ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <video
            key={activeMood}
            src={MOODS.find((m) => m.id === activeMood)?.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <PageGrid className="relative z-10 gap-y-8 lg:gap-y-22 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:py-14 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            Feature #4 — Emotional Atmosphere
          </p>

          {/* Two text blocks stacked */}
          <div className="col-span-4 lg:col-span-3 lg:col-start-3 flex flex-col gap-12">
            <TextBlock
              label="The Challenge"
              title="Creating Presence Without Distraction"
              className="text-white"
            >
              Sound and particles can unlock emotion in ways text can't. The
              challenge: creating atmospheres that adapt to your
              writing—comforting, energizing, reflective—without overwhelming.
            </TextBlock>
            <TextBlock
              label="My Solution"
              title="Adaptive Soundscapes and Live Particle Design"
              className="text-white"
            >
              The AI analyzes your writing for emotional tone — anger, love,
              sadness — and adapts the atmosphere accordingly. Five moods
              emerge: Night, Fire, Rain, Calm, and Underwater.
            </TextBlock>
          </div>

          {/* Mood switcher */}
          <div className="col-span-4 lg:col-span-4 lg:col-start-7 flex flex-col self-stretch">
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <Button
                  key={m.id}
                  variant={activeMood === m.id ? "filled" : "outline"}
                  color="#ffffff"
                  size="small"
                  onClick={() => switchMood(m.id)}
                  style={activeMood === m.id ? { color: "#000000" } : {}}
                >
                  {m.label}
                </Button>
              ))}
            </div>
            <div className="flex-1 flex items-center">
              <p
                style={{
                  fontFamily: "var(--font-raleway)",
                  fontSize: "34px",
                  fontWeight: 400,
                  color: "white",
                  lineHeight: 1.3,
                  opacity: 0.5,
                }}
              >
                {MOODS.find((m) => m.id === activeMood)?.description}
              </p>
            </div>
          </div>
        </PageGrid>
      </section>
      <section
        id="design-modularity"
        className="relative w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8"
      >
        <ConfigBackground />
        <PageGrid className="gap-y-8 lg:gap-y-12 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:py-24  lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            Building Tools to Build Faster
          </p>
          {/* Text blocks — left */}
          <div className="col-span-4 lg:col-span-3 lg:col-start-3 flex flex-col gap-20 justify-center">
            <TextBlock
              label="The Challenge"
              title="Iterating on Complex JSON"
              className="text-white"
            >
              Particles have dozens of parameters. Tweaking JSON directly meant:
              change value, refresh, check, repeat. Painfully slow.
            </TextBlock>
            <TextBlock
              label="My Solution"
              title="Live Design Tool"
              className="text-white"
            >
              Live sliders, instant feedback. Found the feel, exported to JSON.
              Hours became minutes.
            </TextBlock>
          </div>

          <ClickToPlay
            src="/videos/pagmar/workshop.mp4"
            className="col-span-4 lg:col-span-7 lg:col-start-7 bg-white/5 rounded-sm overflow-hidden"
            style={{
              aspectRatio: "2277/1080",
              border: "0.5px solid rgba(255,255,255,0.2)",
            }}
          />
        </PageGrid>
      </section>

      {/* Design System — horizontal scroll */}
      <HorizontalScroll id="design-system">
        {/* Slide 1: big title */}
        <div className="min-w-screen w-screen h-screen shrink-0 bg-black flex justify-center items-center px-6 lg:px-12">
          <p className="text-[clamp(3rem,10vw,9rem)] font-light  leading-none tracking-tight text-white">
            Design system
          </p>
        </div>

        {/* Slide 2: Typography */}
        <div className="min-w-screen w-screen h-screen shrink-0">
          <TypographySection
            bgColor="black"
            textColor="white"
            showHebrew
            data={{
              fonts: [
                {
                  id: "masada-book",
                  name: "Masada",
                  weightName: "Book",
                  fontFamily: "'Masada', serif",
                  weight: 400,
                  description:
                    "Used for user-generated content — journal entries, insights, emotional words. Its serif warmth marks what belongs to the person.",
                },
                {
                  id: "masada-bold",
                  name: "Masada",
                  weightName: "Bold",
                  fontFamily: "'Masada', serif",
                  weight: 700,
                  description:
                    "The bold weight is used sparingly for emphasis within content — key insights, selected words, emotional peaks.",
                },
                {
                  id: "narkiss-mono",
                  name: "Narkiss Yair Mono",
                  weightName: "Regular",
                  fontFamily: "'NarkissYairMono', monospace",
                  weight: 400,
                  description:
                    "Used for all interface elements — labels, buttons, navigation, metadata. Its monospaced neutrality signals utility, not authorship.",
                },
              ],
            }}
          />
        </div>
        {/* Slide 3: Pixel Perfect */}
        <div className="min-w-screen w-screen h-screen shrink-0 bg-black flex items-start pt-16 lg:pt-24 px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-x-3 gap-y-8 w-full">
            {/* Title */}
            <div className="col-span-12 lg:col-span-10 lg:col-start-3">
              <p className="text-xs lg:text-5xl text-white">
                Pixel Perfect in a 3D Space
              </p>
            </div>

            {/* Text blocks */}
            <div className="col-span-4 lg:col-span-3 lg:col-start-3">
              <TextBlock
                label="The Challenge"
                title="Pixel-Perfect in 3D Space"
                className="text-white"
              >
                Figma designs worked in 2D. 3D was different. How to maintain
                precision with X, Y, Z coordinates?
              </TextBlock>
            </div>
            <div className="col-span-4 lg:col-span-3 lg:col-start-7">
              <TextBlock
                label="My Solution"
                title="Grid-Based Positioning"
                className="text-white"
              >
                3D grid system: Figma layouts → Three.js coordinates. Invisible
                structure keeps infinite space organized.
              </TextBlock>
            </div>

            {/* Two photos stacked */}
            <div className="col-span-4 lg:col-span-8 lg:col-start-3 flex flex-row gap-4">
              <div
                className="rounded-sm overflow-hidden"
                style={{ border: "0.5px solid rgba(255,255,255,0.2)" }}
              >
                <Image
                  src="/images/pagmar/3dgrid.jpg"
                  alt="3D grid system"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div
                className="rounded-sm overflow-hidden"
                style={{ border: "0.5px solid rgba(255,255,255,0.2)" }}
              >
                <Image
                  src="/images/pagmar/3dgridInSpace.jpg"
                  alt="3D grid in space"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Slide 4: Bidirectional Design */}
        <div className="min-w-screen w-screen h-screen shrink-0 bg-black flex items-start pt-16 lg:pt-24 px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-x-3 gap-y-8 w-full">
            {/* Title */}
            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
              <p className="text-xs lg:text-5xl text-white">
                Bidirectional Design
              </p>
            </div>

            {/* Text blocks */}
            <div className="col-span-4 lg:col-span-3 lg:col-start-2 flex flex-col gap-8">
              <TextBlock
                label="The Challenge"
                title="Hebrew reads right, English reads left"
                className="text-white"
              >
                Hebrew reads right-to-left. English reads left-to-right. Layouts
                needed to work naturally in both directions without compromising
                readability or hierarchy.
              </TextBlock>
              <TextBlock
                label="My Solution"
                title="One grid, two directions"
                className="text-white"
              >
                Designed both versions in Figma. The grid system mirrors
                bidirectionally—text, navigation, floating words all flip
                naturally.
              </TextBlock>
            </div>

            {/* Composition mockup + toggle */}
            <div className="col-span-4 lg:col-span-6 lg:col-start-6 flex flex-col gap-4">
              <BiDiMockup />
            </div>
          </div>
        </div>
      </HorizontalScroll>

      {/* Reception and Impact */}
      <section
        id="reception"
        className="w-screen h-screen flex items-center justify-center bg-black"
      >
        <h2 className="display text-center text-white">Reception and Impact</h2>
      </section>
      <section
        id="presentation"
        className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8"
      >
        <PageGrid className="gap-y-8 lg:gap-y-12 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            Presentation
          </p>
          <p className="col-span-4 lg:col-span-5 lg:col-start-3 text-sm font-medium leading-[160%] opacity-80">
            I presented Social Simulation as my graduation project at Bezalel —
            my first React project after months of intensive learning. The
            system was complex, so I ran extensive playtests to understand how
            it was perceived externally.
          </p>
          <div className="col-span-4 lg:col-span-7 lg:col-start-4 aspect-video bg-white/5 rounded-sm" />
        </PageGrid>
      </section>
      <section
        id="what-i-learned"
        className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8"
      >
        <PageGrid className="gap-y-8 lg:gap-y-12 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            What I Learned
          </p>
          <div className="min-h-[50rem] col-span-4 lg:col-span-10 lg:col-start-3">
            <LearnedTabs />
          </div>
          <div className="col-span-4 lg:col-span-7 lg:col-start-3 flex flex-col gap-4">
            <TextBlock
              label="Insight #4"
              title="About Myself"
              className="text-white"
            >
              I&apos;m stubborn. Hours debugging bring immense satisfaction when
              solved.
            </TextBlock>
            <RevealText className="text-base lg:text-5xl font-regular opacity-60 leading-[130%]">
              I realized I could build complex things alone; research, design,
              code in parallel under pressure.
            </RevealText>
          </div>

          <TextBlock
            label="Insight #5"
            title="About AI"
            className="mt-30 text-white col-span-4 lg:col-span-3 lg:col-start-3"
          >
            GPT opened infinite possibilities. Learned: precise prompts, manage
            tokens, watch costs. People differ—some want flow, others structure.
            AI always surprises.
          </TextBlock>
        </PageGrid>
      </section>
      <section
        id="do-differently"
        className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8"
      >
        <PageGrid className="gap-y-8 lg:gap-y-12 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            What I Would do differently
          </p>{" "}
          <TextBlock
            label=" #1"
            title="Code Architecture"
            className="text-white col-span-4 lg:col-span-3 lg:col-start-3"
          >
            Delete unused code sooner. Avoid god components through better
            separation. Under pressure, prompts evolved inconsistently -
            should've researched upfront, not iterated blindly.
          </TextBlock>
          <TextBlock
            label="#2"
            title="Focus Over Options"
            className="text-white col-span-4 lg:col-span-3 lg:col-start-3"
          >
            Less is more. With infinite AI possibilities, it's easy to get lost.
            I'd stay more focused on the overarching goal, prioritize
            ruthlessly, and eliminate features earlier.
          </TextBlock>
          <TextBlock
            label="Insight #3"
            title="Testing & Onboarding"
            className="text-white col-span-4 lg:col-span-3 lg:col-start-3"
          >
            I'd run more playtests across different demographics to optimize
            clarity. Maybe add an on-demand help button—contextual guidance at
            every stage, so if you're stuck, help appears without breaking flow.
          </TextBlock>
        </PageGrid>
      </section>
      <section
        id="future"
        className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8"
      >
        <PageGrid className="gap-y-8 lg:gap-y-12 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl font-medium">
            Future Potential
          </p>
          <p className="col-span-4 lg:col-span-5 lg:col-start-3 text-sm font-medium leading-[160%] opacity-80">
            This is just the beginning. Social Simulation proves the concept —
            non-linear journaling in 3D space, AI as a guide not a replacement,
            spatial navigation that feels natural. But the real potential lies
            in what comes next.
          </p>
          <div className="col-span-4 lg:col-span-10 lg:col-start-3">
            <TabPages />
          </div>
        </PageGrid>
      </section>
    </main>
  );
}
