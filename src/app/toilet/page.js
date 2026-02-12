"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button";
import TextBlock from "../components/TextBlock";
import HorizontalScroll from "../components/HorizontalScroll";
import TypographySection from "../components/TypographySection";
import ColorPalette from "../components/ColorPalette";
import { toiletTypography, toiletColors } from "../../data/projectData";

export default function Page() {
  const pinSectionRef = useRef(null);
  const challengeRef = useRef(null);
  const solutionRef = useRef(null);
  const overlayRef = useRef(null);
  const readyRef = useRef(null);
  const setRef = useRef(null);
  const goRef = useRef(null);
  const arrowRef = useRef(null);
  const frameContainerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create a timeline for the pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "center center",
          end: "+=80%",
          pin: true,
          scrub: 0.3,
          refreshPriority: 1,
        },
      });

      // Challenge appears at the start
      tl.fromTo(
        challengeRef.current,
        { opacity: 1, y: 0 },
        { opacity: 1, y: 0, duration: 0.4 },
      );

      // Overlay fades in + text turns white
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.15 },
        0.2,
      );
      tl.to(challengeRef.current, { color: "#ffffff", duration: 0.15 }, 0.2);

      // Solution will appear together with Ready-Set-Go (triggered via ScrollTrigger callback)

      // Arrow wipe loop (empties left-to-right, repeats)
      const arrowLoop = gsap.timeline({ repeat: -1, paused: true });
      arrowLoop
        .set(arrowRef.current, { clipPath: "inset(0 0 0 0)" })
        .to(arrowRef.current, {
          clipPath: "inset(0 0 0 100%)",
          duration: 3,
          ease: "linear",
        })
        .set(arrowRef.current, { clipPath: "inset(0 0 0 0)" });

      // Ready-Set-Go: first "Ready" slams in, then instant loop
      const introTl = gsap.timeline({ paused: true });
      introTl
        .fromTo(
          readyRef.current,
          { scale: 0, rotation: -15, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.15,
            ease: "back.out(1.7)",
          },
        )
        .set(readyRef.current, { opacity: 0 }, "+=0.2")
        .set(setRef.current, { opacity: 1 })
        .set(setRef.current, { opacity: 0 }, "+=0.3")
        .set(goRef.current, { opacity: 1 })
        .set(goRef.current, { opacity: 0 }, "+=0.3")
        .call(() => loopTl.play());

      // Instant loop (repeats forever after intro)
      const loopTl = gsap.timeline({ repeat: -1, paused: true });
      loopTl
        .set(readyRef.current, { opacity: 1 })
        .set(readyRef.current, { opacity: 0 }, 0.3)
        .set(setRef.current, { opacity: 1 }, 0.3)
        .set(setRef.current, { opacity: 0 }, 0.6)
        .set(goRef.current, { opacity: 1 }, 0.6)
        .set(goRef.current, { opacity: 0 }, 0.9)
        .set({}, {}, 1.2);

      // Start/stop based on scroll position
      let hasPlayed = false;
      ScrollTrigger.create({
        trigger: pinSectionRef.current,
        start: "top top",
        end: "+=80%",
        onUpdate: (self) => {
          if (self.progress > 0.5) {
            if (!hasPlayed) {
              hasPlayed = true;
              gsap.set(frameContainerRef.current, { opacity: 1 });
              gsap.fromTo(
                solutionRef.current,
                { opacity: 0, color: "#ffffff" },
                { opacity: 1, duration: 0.3 },
              );
              introTl.play();
              arrowLoop.play();
            } else if (!loopTl.isActive() && !introTl.isActive()) {
              loopTl.play();
            }
          } else {
            hasPlayed = false;
            introTl.pause(0);
            loopTl.pause(0);
            arrowLoop.pause(0);
            gsap.set([readyRef.current, setRef.current, goRef.current], {
              opacity: 0,
              scale: 1,
              rotation: 0,
            });
            gsap.set(arrowRef.current, { clipPath: "inset(0 0 0 0)" });
            gsap.set(frameContainerRef.current, { opacity: 0 });
            gsap.set(solutionRef.current, { opacity: 0 });
          }
        },
      });

      // Refresh so HorizontalScroll below recalculates its position
      ScrollTrigger.refresh();
    }, pinSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Project Intro Section */}
      <section className="bg-white px-8 min-h-screen text-black flex items-center justify-center">
        <div className="flex flex-col items-center max-w-7xl mx-auto relative z-10">
          {/* Title */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <span
              className="text-5xl"
              style={{ fontFamily: "var(--font-reenie-beanie)" }}
            >
              A Guide to Proper Etiquette in the
            </span>
            <h1
              className="text-black text-[12rem] tracking-[-0.1em] -mt-15"
              style={{ fontFamily: "var(--font-dokdo)" }}
            >
              Men&apos;s Toilet
            </h1>
            <a
              href="https://sirshabluli.github.io/MensRestrooms/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="small">Visit Site</Button>
            </a>
          </div>
          {/* Description + Metadata */}
          <div className="flex flex-col text-left gap-1 mt-20 opacity-90 max-w-2xl">
            <p className="text-sm font-medium text-black text-left">
              An illustrated guide to the unspoken rules of men&apos;s restroom
              etiquette. A humorous take on social norms through visual
              storytelling and playful UI.
            </p>
            <div className="flex flex-row gap-10 mt-10 text-left w-full">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium tracking-wider opacity-60">
                  role
                </p>
                <p className="text-sm font-medium text-black">
                  UI Design & Illustration
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium tracking-wider opacity-60">
                  Course
                </p>
                <p className="text-sm text-black font-medium leading-tight">
                  &quot;Your Cart is Empty&quot; - Digital Product Illustration
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium tracking-wider opacity-60">
                  Year
                </p>
                <p className="text-sm font-medium text-black leading-tight">
                  2025 (4th year, parallel to graduation project)
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium tracking-wider opacity-60">
                  Duration
                </p>
                <p className="text-sm text-black font-medium leading-tight">
                  1 month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white px-8 min-h-screen text-black flex items-center justify-center">
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto w-full">
          {/* Left - Display title */}
          <h2 className="col-span-4 col-start-2 text-7xl text-black">
            The Rules No One Talks About
          </h2>
          <div className="col-span-3 col-start-2">
            <TextBlock
              label="the idea"
              title="Design and code a one-pager based on an article using basic HTML and CSS."
            >
              I&apos;ve always been drawn to humor—especially topics people
              avoid. Bathroom etiquette is controversial precisely because no
              one wants to talk about it. But that was the appeal. The
              challenge: make it light, humorous, and relatable. We all notice
              these unspoken rules. We all follow (or break) them. But if you
              catch someone at the right moment, they&apos;ll laugh - because
              it&apos;s true. So I chose bathroom rules as my article topic. Not
              despite the awkwardness, but because of it.
            </TextBlock>
          </div>
          {/* Right - Image */}
          <div className="col-span-4  col-start-7 row-span-2 row-start-1 flex items-center justify-center">
            <Image
              src="/images/toilet/speak.svg"
              alt="Toilet illustration"
              width={400}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-12 px-12">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-2 col-start-2 flex flex-col gap-4 min-h-screen">
            <span className="text-5xl font-medium tracking-tight text-black">
              Inspiration
            </span>
            <TextBlock label="" title="" className="text-black">
              I drew inspiration from the walls of public bathrooms. In clubs
              and bathroom stalls, people leave messages - creating layers of
              graffiti and doodles. This allowed me to communicate ideas through
              humor and simple, playful illustrations. How do I capture the
              feeling of drawings on bathroom walls without distracting from the
              actual content?
            </TextBlock>
          </div>
          <div className="col-span-8 col-start-5">
            <Image
              src="/images/toilet/toiletinspo.jpg"
              alt="Inspiration"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      {/* Two TextBlocks Section */}
      <section className="bg-white px-8 min-h-screen text-black flex items-center justify-center">
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto w-full">
          <div className="col-span-3 col-start-2">
            <TextBlock label="the challenge" title="uncomfortably inviting">
              Bathrooms are a topic people avoid. When I first pitched the idea,
              I saw the disgust on my classmates&apos; faces. That&apos;s when I
              knew I had to take on the challenge: turn something awkward into
              something humorous and inviting. Get even the most skeptical,
              embarrassed person to engage with the project through humor and
              lightness.
            </TextBlock>
          </div>
          <div className="col-span-3 col-start-7">
            <TextBlock label="my solution" title="Humor as Permission">
              I decided on a design that felt light and effortless—not trying
              too hard. Lots of humor. Something universal that men could relate
              to and women could use to understand the mysterious world of
              men&apos;s bathrooms. The more I playtested, the more I discovered
              ways to help people disconnect from their hesitation and
              embarrassment for a moment.
            </TextBlock>
          </div>
        </div>
      </section>
      {/* Two TextBlocks Section 2 - Pinned */}
      <section
        ref={pinSectionRef}
        className="bg-white px-8 min-h-screen text-black flex items-center justify-center relative"
      >
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black z-10 pointer-events-none"
          style={{ opacity: 0 }}
        />
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto w-full relative">
          <div
            ref={challengeRef}
            className="z-20 col-span-3 col-start-2 opacity-0 flex items-center"
          >
            <TextBlock label="The Challenge" title="Cynics Don't Click">
              When people approach embarrassing projects, there&apos;s a natural
              distance. A protective layer of cynicism.
            </TextBlock>
          </div>
          <div className="col-span-3 p-5 col-start-5 row-start-1 flex items-center z-2 justify-center">
            <Image
              src="/images/toilet/Asla.svg"
              alt="Asla illustration"
              width={300}
              height={300}
              className="w-auto h-auto"
            />
          </div>
          <div className="col-span-3 col-start-5 row-start-1 z-30 flex flex-col items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              <span
                ref={readyRef}
                className="absolute text-white text-7xl opacity-0"
                style={{ fontFamily: "var(--font-dokdo)" }}
              >
                Ready...
              </span>
              <span
                ref={setRef}
                className="absolute text-white text-7xl opacity-0"
                style={{ fontFamily: "var(--font-dokdo)" }}
              >
                Set...
              </span>
              <span
                ref={goRef}
                className="absolute text-white text-7xl opacity-0"
                style={{ fontFamily: "var(--font-dokdo)" }}
              >
                Go!
              </span>
            </div>
            <div ref={frameContainerRef} className="relative mt-4 opacity-0">
              <Image
                src="/images/toilet/frame.svg"
                alt="Frame"
                width={300}
                height={300}
                className="absolute top-0 left-1/2 -translate-x-1/2 invert"
              />
              <Image
                ref={arrowRef}
                src="/images/toilet/arrough.svg"
                alt="Arrow"
                width={300}
                height={300}
                style={{ clipPath: "inset(0 0 0 0)" }}
              />
            </div>
          </div>
          <div
            ref={solutionRef}
            className="z-20 col-span-3 col-start-9 opacity-0 flex items-center"
          >
            <TextBlock label="My Solution" title="Countdown to Commitment">
              I created a timed urinal selection game. The countdown creates
              urgency. The timer removes hesitation. Even the most distant,
              skeptical viewer gets pulled in and forgets they&apos;re making
              ridiculous decisions about urinal etiquette.{" "}
            </TextBlock>
          </div>
        </div>
      </section>

      {/* Design System - Horizontal Scroll */}
      <section>
        <HorizontalScroll>
          <div className="min-w-screen w-screen h-screen bg-white flex items-center justify-center shrink-0">
            <h1 className="display text-black">Design System</h1>
          </div>
          <div className="min-w-screen w-screen h-screen shrink-0">
            <TypographySection
              data={toiletTypography}
              bgColor="white"
              textColor="black"
            />
          </div>
          <div className="min-w-screen w-screen h-screen shrink-0">
            <ColorPalette colors={toiletColors} isDark={false} />
          </div>
        </HorizontalScroll>
      </section>
    </>
  );
}
