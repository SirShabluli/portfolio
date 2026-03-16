"use client";
import Image from "next/image";
import PageGrid from "../components/PageGrid";
import TextBlock from "../components/TextBlock";
import ImageCarousel from "../components/ImageCarousel";
import MindMapSVG from "../components/MindMapSVG";

export default function PagmarPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
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
            <p className="text-sm lg:text-base  font-medium opacity-80 leading-relaxed max-w-lg">
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
      <section className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8">
        <PageGrid className="gap-8 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl">
            The Full Experience
          </p>
          {/* Video placeholder — replace src when ready */}
          <div className="col-span-4 lg:col-span-10 lg:col-start-2 aspect-video bg-white/5 rounded-sm overflow-hidden">
            {/* <video src="/images/pagmar/demo.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" /> */}
          </div>
        </PageGrid>
      </section>

      {/* Research and Discovery */}
      <section className="w-screen h-screen flex items-center justify-center bg-black">
        <h2 className="display text-center text-white">
          Research &amp; Discovery
        </h2>
      </section>

      {/* The Challenge */}
      <section className="bg-black py-16 lg:py-24 px-6 lg:px-12 justify-center">
        <PageGrid className="gap-8 items-center">
          <div className="col-span-4 lg:col-span-3 lg:col-start-3 flex flex-col gap-4">
            <h3 className="text-4xl font-semibold">The Challenge</h3>
            <p className="text-sm font-medium opacity-100 leading-relaxed">
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
      <section className="bg-black py-16 lg:py-24 px-6 lg:px-12">
        <PageGrid className="gap-y-12 gap-x-8 items-start">
          <div className="col-span-4 lg:col-span-3 lg:col-start-3 flex flex-col gap-4">
            <h3 className="text-4xl font-semibold">Understanding the Space</h3>
          </div>
          {/* Anecdotes stacked left */}
          <div className="col-span-4 lg:col-span-4 lg:col-start-3 flex flex-col gap-10">
            <TextBlock
              label="Anecdote #1"
              title="Thoughts are spatial, not linear"
              className="text-white"
            >
              Thoughts branch and loop back. Linear writing forces you to pick
              one thread and abandon the rest. Memory clusters in space, not on
              a timeline.
            </TextBlock>
            <TextBlock
              label="Anecdote #2"
              title="Navigation should feel like wandering, not searching"
              className="text-white"
            >
              Chronological order can't capture branching thoughts. There's a
              magic to wandering.
            </TextBlock>
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
          <div className="col-span-4 lg:col-span-4 lg:col-start-8 flex items-center h-full">
            <p className="text-base lg:text-2xl font-regular opacity-60 leading-relaxed ">
              This led to the question: what if journaling wasn't about
              capturing thoughts in order, but creating a space where they could
              exist, connect, and reveal themselves over time?
            </p>
          </div>
          <div className="col-span-4 lg:col-span-4 lg:col-start-3 flex flex-col gap-4 mt-10">
            <h3 className="text-4xl font-semibold">The Solution</h3>
            <p className="text-sm font-medium opacity-100 leading-relaxed">
              The system turns journaling into a spatial, AI-guided experience.
              You write. The atmosphere responds. The question vanishes after
              you answer, leaving only your thoughts. You can continue the flow,
              branch into new questions, or revisit earlier threads. Over time,
              a 3D world emerges - a spatial map of your inner landscape, where
              every composition is a place you can explore.
            </p>
          </div>
        </PageGrid>
      </section>
      <section className="w-screen h-screen flex items-center justify-center bg-black">
        <h2 className="display text-center text-white">Key Features</h2>
      </section>
      {/* Feature #1 - The Writing Experience */}
      <section className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8">
        <PageGrid className="gap-8 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl">
            Feature #1 — The Writing Experience
          </p>
          {/* Video placeholder — replace src when ready */}
          <div className="col-span-4 lg:col-span-10 lg:col-start-2 aspect-video bg-white/5 rounded-sm overflow-hidden">
            {/* <video src="/images/pagmar/writing.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" /> */}
          </div>
          <p className="col-span-4 lg:col-span-4 lg:col-start-3 text-sm font-medium leading-relaxed opacity-80">
            Write freely. When you're stuck, press <strong>Tab</strong>. Words
            from your writing appear. Type the word you want to select, get a
            question, keep flowing. The question disappears after you answer,
            leaving only your thoughts.
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
        </PageGrid>
      </section>
      {/* The Composition */}
      <section className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8">
        <PageGrid className="gap-y-8 lg:gap-y-12 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl">
            The Composition
          </p>
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
          <div className="col-span-4 lg:col-span-3 lg:col-start-3 flex flex-col gap-12">
            <TextBlock
              label="The Challenge"
              title="UI that Distracts"
              className="text-white"
            >
              I experimented with how questions should appear — pulsing,
              shaking, bold. Every variation pulled focus. The animations
              distracted from writing itself.
            </TextBlock>
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
          {/* Toggle component placeholder */}
          <div className="col-span-4 lg:col-span-10 lg:col-start-2 aspect-video bg-white/5 rounded-sm overflow-hidden">
            {/* toggle component goes here */}
          </div>
          <div className="col-span-4 lg:col-span-3 lg:col-start-3">
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
          <div className="col-span-4 lg:col-span-10 lg:col-start-2">
            <Image
              src="/images/pagmar/overlap.png"
              alt="Overlap"
              width={1600}
              height={900}
              className="w-full h-auto rounded-sm"
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
          {/* Placeholder */}
          <div className="col-span-4 lg:col-span-10 lg:col-start-2 aspect-video bg-white/5 rounded-sm overflow-hidden">
            {/* placeholder */}
          </div>
        </PageGrid>
      </section>
      {/* Feature #2 - Navigating the Mind Map */}
      <section className="w-full min-h-screen bg-black flex flex-col justify-center py-16 lg:py-24 gap-8">
        <PageGrid className="gap-y-8 lg:gap-y-12 w-full px-6 lg:px-12">
          <p className="col-span-4 lg:col-span-10 lg:col-start-3 text-xs lg:text-5xl">
            Feature #2 — Navigating the Mind Map
          </p>
          <div className="col-span-4 lg:col-span-10 lg:col-start-2 aspect-video bg-white/5 rounded-sm overflow-hidden">
            {/* <video src="/images/pagmar/mindmap.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" /> */}
          </div>
          <p className="col-span-4 lg:col-span-4 lg:col-start-3 text-sm font-medium leading-relaxed opacity-80">
            Navigation happens entirely in space. Move with arrow keys (up,
            down, left, right), zoom with <strong>W/S</strong>, approach
            compositions, press <strong>Enter</strong> to step inside. When
            you're in, the rest disappears. Press <strong>Esc</strong> to
            return. No mouse, no clicking — just wandering.
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
        </PageGrid>
      </section>
    </main>
  );
}
