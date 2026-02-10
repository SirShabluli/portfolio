"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhoneShowcase from "../components/PhoneShowcase";
import Image from "next/image";
import AIProcess from "../components/AIProcess";
import TypographySection from "../components/TypographySection";
import ColorPalette from "../components/ColorPalette";
import {
  catProjectSteps,
  vegasTypography,
  vegasLightColors,
  vegasDarkColors,
} from "../../data/projectData";
import Lauryl from "../components/Lauryl";
import HorizontalScroll from "../components/HorizontalScroll";
import TextBlock from "../components/TextBlock";
import VectorToggle from "../components/VectorToggle";

export default function VegasPage() {
  const [isDark, setIsDark] = useState(false);
  const phoneImagesRef = useRef(null);
  const largeImagesRef = useRef(null);
  const longPressTimer = useRef(null);

  // Debug flags - set to true/false to toggle
  const showOutlines = false;
  const showMarkers = false;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!phoneImagesRef.current) return;

    const images =
      phoneImagesRef.current.querySelectorAll(".phone-inspiration");
    gsap.set(images, { opacity: 0, y: 40 });
    gsap.to(images, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: phoneImagesRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });

    // Sticker effect for large inspiration images
    if (largeImagesRef.current) {
      const largeImages =
        largeImagesRef.current.querySelectorAll(".large-inspiration");
      gsap.set(largeImages, { opacity: 0, scale: 0, rotation: -15 });
      gsap.to(largeImages, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "back.out(2.5)",
        stagger: 0.13,

        scrollTrigger: {
          trigger: largeImagesRef.current,
          start: "top center",
          toggleActions: "play none none reset",
        },
      });
    }
  }, []);

  const outline = showOutlines ? "outline outline-1 outline-red-500" : "";

  const longPressHandlers = {
    onMouseDown: () => {
      longPressTimer.current = setTimeout(() => {
        setIsDark((prev) => !prev);
      }, 500);
    },
    onMouseUp: () => clearTimeout(longPressTimer.current),
    onMouseLeave: () => clearTimeout(longPressTimer.current),
  };

  // Configuration for each section
  const sections = [
    { xPosition: 0, rotation: 0, screenIndex: 11 },
    { xPosition: 0, rotation: Math.PI * 0.0, screenIndex: 12 },
    { xPosition: 0, rotation: Math.PI * 0, screenIndex: 13 },
    { xPosition: -25, rotation: Math.PI * 0, screenIndex: 14 },
    { xPosition: 25, rotation: Math.PI * 2, screenIndex: 15 },
  ];

  return (
    <>
      {/* Project Intro Section */}
      <section className="bg-[#23577A] px-8 min-h-screen text-white flex items-center justify-center">
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto items-center relative z-10">
          {/* Logo */}
          <div className="col-span-6 col-start-4 flex flex-col gap-7 justify-center items-center">
            <Image
              src="/images/netflix-dating/NetflixLogo.svg"
              alt="Project preview"
              width={600}
              height={1200}
              className="w-full h-auto"
            />
            <h2 className="text-6xl text-white -mt-5">Retreat</h2>
          </div>
          {/* Description + Metadata */}
          <div className="col-span-6 col-start-4 flex flex-col text-left gap-1 mt-20 opacity-90">
            <p className="text-lg font-medium text-white text-left">
              A travel app for Vegas—disguised as a medical wellness platform.
              Complete with prescription language, clinical UI, and neon sins
              glowing beneath the sterile surface.
            </p>
            <div className="flex flex-row gap-10 mt-10 text-left w-full">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium tracking-wider opacity-60">
                  role
                </p>
                <p className="text-sm font-medium text-white">
                  UI Design & Illustration
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium tracking-wider opacity-60">
                  Course
                </p>
                <p className="text-sm text-white font-medium leading-tight">
                  &quot;Your Cart is Empty&quot; - Digital Product Illustration
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium tracking-wider opacity-60">
                  Year
                </p>
                <p className="text-sm font-medium text-white leading-tight">
                  2025 (4th year, parallel to graduation project)
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium tracking-wider opacity-60">
                  Duration
                </p>
                <p className="text-sm text-white font-medium leading-tight">
                  1 month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Title Section before PhoneShowcase */}
      <section className="min-h-screen bg-[#23577A] flex items-center justify-center">
        <h1 className="display text-white">The Product</h1>
      </section>

      <PhoneShowcase
        sections={sections}
        showOutlines={true}
        showMarkers={showMarkers}
        bgColor="#23577A"
      >
        <section className="section-1">
          <div className="grid md:grid-cols-8 lg:grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-4 md:col-span-2 ${outline} md:col-start-2 flex flex-col justify-center gap-9`}
            >
              <span data-animate="2" data-animation="fade">
                <TextBlock label="the challenge" title="First Impression">
                  How do I immediately signal that this is a Vegas app wrapped
                  in medical language - without explaining it explicitly? If it
                  looks too medical, users won't get the joke. If it's too
                  obvious, there's no tension.
                </TextBlock>
              </span>
              <span data-animate="3" data-animation="fade">
                <TextBlock label="My Solution" title="obvious connection">
                  {`A man using an inhaler - a medical device, a health moment, routine treatment. But his thought bubble explodes with Vegas: neon dice, slot machines,  martini glasses, cannabis. The contrast is instant and absurd.

The image says: medical treatment.
 The thought bubble says: Vegas addiction. 
The copy reveals: satire.`}
                </TextBlock>
              </span>
            </div>
            <div
              className={`col-span-4 phone-pocket md:col-span-4 md:col-start-5 ${outline}`}
            ></div>
            <div
              className={`col-span-4 md:col-span-2 md:col-start-9 ${outline} flex flex-col gap-4 justify-center`}
            >
              <span
                data-animate="1"
                data-animation="fade"
                className="mt-10 flex items-center text-2xl line-height-1.4"
              >
                explore scientifically proven sins, selected by top doctors in
                Vegas refined through years of irresponsible research.
              </span>
            </div>
          </div>
        </section>
        <section className="section-2">
          <div className="grid grid-cols-12 gap-10 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-2 md:col-span-2 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            >
              <span data-animate="2" data-animation="fade">
                <TextBlock
                  label="the challenge"
                  title="Making Organization Feel Clinical"
                >
                  In this app's universe, everything is medical. If users
                  organize their Vegas trips into collections, what's the
                  medical equivalent? Where do you store your "prescriptions"?
                </TextBlock>
              </span>
              <span
                data-animate="1"
                data-animation="fade"
                className="mt-1 flex items-center text-2xl line-height-1.4"
              >
                organize favorite destinations, tips, and itineraries into
                customizable collections, making it easy to plan future trips
              </span>
            </div>
            <div
              className={`col-span-4 md:col-span-3 md:col-start-6 ${outline} flex flex-col justify-center`}
            ></div>
            <div
              className={`col-span-2 md:col-span-2 md:col-start-9 ${outline} flex flex-col justify-center gap-4`}
            >
              <span data-animate="4" data-animation="fade">
                <TextBlock
                  label="My Solution"
                  title="Medicine Cabinet as Collection System"
                >
                  {`A hand placing a new bottle on a medicine shelf. Clean, organized,  like a pharmacy cabinet. The bottles look clinical - clean labels,  medical colors, orderly arrangement. But inside each bottle: dark backgrounds with neon Vegas sins glowing.  Dice, cards, cocktails trapped in prescription containers.

The duality: medical organization on the surface, Vegas chaos contained within."`}
                </TextBlock>
              </span>
              {/* <Image
                data-animate="3"
                src="/images/tableafternight.png"
                alt="Empty State Screen"
                width={800}
                height={600}
                className="w-full h-auto my-5"
              /> */}
              {/* <p data-animate="2">
                I used humor to validate the user&apos;s experience. It tells
                the user that the app "gets" the messiness of being single and
                positions the platform as a partner in finding someone to share
                those raw, uncurated moments with.
              </p> */}
            </div>
          </div>
        </section>
        <section className="section-3">
          <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-3 md:col-span-2 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            >
              <span data-animate="2" data-animation="fade">
                <TextBlock
                  label="the challenge"
                  title="Ratings, But Make It Vegas"
                >
                  {`In the Vegas-as-medicine metaphor, what are "ratings"?  What do users leave behind after trying their "prescription"?`}
                </TextBlock>
                <span
                  data-animate="1"
                  data-animation="fade"
                  className="mt-5 flex items-center text-lg"
                >
                  "Share what worked, what stung a little, and where the side
                  effects were totally worth it. From miracle cures to
                  questionable detours— your notes might just save someone a
                  headache."
                </span>
              </span>
            </div>
            <div
              className={`col-span-4 md:col-span-4 phone-pocket md:col-start-5 ${outline} flex items-center justify-center`}
            ></div>
            <div
              className={`col-span-3 md:col-span-2 md:col-start-10 ${outline} flex flex-col gap-8 justify-center`}
            >
              <span data-animate="4" data-animation="fade">
                <TextBlock
                  label="My Solution"
                  title="floating through side effects"
                >
                  {`A man leaping forward in the clean medical interface. Behind him: a glowing trail of neon stars - Vegas memories, past experiences, side effects documented.

Reviews become your Vegas constellation - a trail others can follow.`}
                </TextBlock>
              </span>
              <Image
                data-animate="4"
                src="/images/netflix-dating/WhosWatching.png"
                alt="Netflix Who's Watching screen"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
        <section className="section-4">
          <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-4 md:col-span-4 md:col-start-5 phone-pocket ${outline}`}
            ></div>
            <div
              className={`col-span-3 md:col-span-2 md:col-start-6 ${outline} flex flex-col justify-center gap-5`}
            >
              <span data-animate="4" data-animation="fade">
                <TextBlock label="The Challenge" title="empty state">
                  {`in a medical app about Vegas sins, emptiness isn't cute—it's
                  unsettling. How do I make the absence of "treatments" feel
                  like something's missing from your life?`}
                </TextBlock>
              </span>
              <span
                data-animate="1"
                data-animation="fade"
                className="mt-5 flex items-center text-lg"
              >
                An empty cabinet might not seem urgent, until it is. Small
                actions today can prevent bigger issues tomorrow.
              </span>
            </div>
            <div
              className={`pt-50 col-span-3 md:col-span-2 md:col-start-10 ${outline} items-center flex flex-col gap-4`}
            >
              <span data-animate="4" data-animation="fade">
                <TextBlock label="My Solution" title="Stripping Away the Life">
                  I removed the vibrant color palette that fills the rest of the
                  app. What's left: muted tones, sterile shelves, absence. Three
                  simple lines form a sad face on the empty shelf -minimal, but
                  enough to give the scene life and convey the feeling.
                </TextBlock>
              </span>

              <Lauryl
                data-animate="4"
                data-animation="sticker"
                topText="Intended"
                bottomText="PUN"
              />
            </div>
          </div>
        </section>
        <section className="section-5 ">
          <div className="bg-black grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen">
            <div
              className={`col-span-4 md:col-span-3 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            >
              <span
                data-animate="1"
                data-animation="fade"
                className="mt-10 flex items-center quote"
              >
                &ldquo;The upgrade that makes everything fall into place&ldquo;
              </span>
            </div>
            <div
              className={`col-span-3 md:col-span-2 md:col-start-5 ${outline} flex flex-col justify-center gap-4`}
            >
              <span data-animate="2" data-animation="fade">
                <TextBlock
                  label="the challenge"
                  title="Gamification in the Medical Metaphor"
                >
                  Travel apps use badges to encourage exploration—miles
                  traveled, countries visited, generic achievements. In a
                  Vegas-as-medicine app, what does "progression" mean? How do I
                  turn gamification into something that fits the metaphor?
                </TextBlock>
              </span>
              <span data-animate="4" data-animation="fade">
                <TextBlock
                  label="My Solution"
                  title="From Patient to Expert Junkie"
                >
                  {`The more destinations you explore, the more "experienced" you become— not with travel, but with substances.`}
                </TextBlock>
              </span>
            </div>
            <div
              className={`pt-50 phone-pocket col-span-4 md:col-span-4 md:col-start-8 ${outline} flex flex-col gap-4`}
            >
              <h2></h2>
            </div>
          </div>
        </section>
        <section></section>
      </PhoneShowcase>

      {/* Inspiration Images - Phone references */}
      <section className="bg-[#E4EBFF] py-12 px-12" ref={phoneImagesRef}>
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-2 col-start-2 flex flex-col gap-4 min-h-screen">
            <span className="text-5xl font-medium tracking-tight text-[#23577A]">
              Inspiration
            </span>
            <TextBlock label="" title="" className="text-[#23577A]">
              I studied wellness apps—Calm, Headspace, medical tracking apps.
              Clean interfaces. Soft blues and whites. Gentle icons. Sterile
              language. Everything designed to create trust, safety, clinical
              authority. This became the wrapper—the medical disguise that makes
              Vegas feel prescribed, legitimate, doctor-approved.
            </TextBlock>
          </div>
          <div className="col-span-2 col-start-6 phone-inspiration">
            <Image
              src="/images/vegas/mfp.png"
              alt="Inspiration 1"
              width={600}
              height={1066}
              className="w-full h-auto"
            />
          </div>
          <div className="col-span-2 phone-inspiration">
            <Image
              src="/images/vegas/oralb.jpg"
              alt="Inspiration 2"
              width={600}
              height={1066}
              className="w-full h-auto"
            />
          </div>
          <div className="col-span-2 phone-inspiration">
            <Image
              src="/images/vegas/waterllama.png"
              alt="Inspiration 3"
              width={600}
              height={1066}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Inspiration Images - Scattered */}
      <section
        className="bg-black relative overflow-hidden grid grid-cols-12 items-center"
        style={{ height: "110vh" }}
        ref={largeImagesRef}
      >
        <div className="col-span-2 col-start-2 z-20">
          <TextBlock label="" title="" className="text-white">
            The visual world of Vegas at night—neon signs, slot machines, casino
            floors, fountain shows. Raw energy captured in light and color.
            These references shaped the dark mode palette and the sense of
            excess that lives beneath the clinical surface.
          </TextBlock>
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "55%",
            rotate: "-4deg",
            top: "-5%",
            left: "-3%",
            zIndex: 1,
          }}
        >
          <Image
            src="/images/vegas/casinonight.jpg"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "50%",
            rotate: "3deg",
            top: "-2%",
            right: "-5%",
            zIndex: 2,
          }}
        >
          <Image
            src="/images/vegas/neoncasino.webp"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "48%",
            rotate: "6deg",
            bottom: "-5%",
            left: "-2%",
            zIndex: 3,
          }}
        >
          <Image
            src="/images/vegas/saussy.jpg"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "52%",
            rotate: "-2deg",
            top: "15%",
            left: "22%",
            zIndex: 4,
          }}
        >
          <Image
            src="/images/vegas/slot.jpg"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "50%",
            rotate: "4deg",
            bottom: "-3%",
            right: "-4%",
            zIndex: 5,
          }}
        >
          <Image
            src="/images/vegas/mc-casino.jpeg"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "45%",
            rotate: "-5deg",
            top: "2%",
            left: "25%",
            zIndex: 6,
          }}
        >
          <Image
            src="/images/vegas/seahouse.jpg"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "53%",
            rotate: "2deg",
            bottom: "5%",
            left: "20%",
            zIndex: 7,
          }}
        >
          <Image
            src="/images/vegas/vegasnight1.jpg"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "48%",
            rotate: "-3deg",
            top: "10%",
            right: "0%",
            zIndex: 8,
          }}
        >
          <Image
            src="/images/vegas/vegassign.png"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "46%",
            rotate: "5deg",
            top: "40%",
            right: "18%",
            zIndex: 9,
          }}
        >
          <Image
            src="/images/vegas/casino leds.png"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
        <div
          className="large-inspiration absolute rounded-lg overflow-hidden"
          style={{
            width: "42%",
            rotate: "-4deg",
            bottom: "8%",
            left: "5%",
            zIndex: 10,
          }}
        >
          <Image
            src="/images/vegas/fountain.png"
            alt="Inspiration"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Screen Section with Zoom */}

      {/* Dual Visual Language Section */}
      <section
        className="min-h-[120vh] pb-20 relative overflow-hidden flex items-center justify-center transition-colors duration-500"
        style={{ backgroundColor: isDark ? "#000000" : "#E4EBFF" }}
        {...longPressHandlers}
      >
        {/* Center: Title + Toggle */}
        <div className="flex flex-col items-center gap-6 z-10">
          <h1
            className="text-7xl font-medium transition-colors duration-500"
            style={
              isDark
                ? {
                    WebkitTextStroke: "1px #ED174B",
                    WebkitTextFillColor: "#FEDCBB",
                    filter:
                      "drop-shadow(0 0 8px #ED174B) drop-shadow(0 0 25px #ED174B)",
                  }
                : { color: "#23577A", filter: "none" }
            }
          >
            Dual Visual Language
          </h1>
          {/* <button
            onClick={() => setIsDark(!isDark)}
            className={`px-4 py-2 rounded-full text-sm font-medium tracking-wider transition-all duration-300 ${
              isDark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {isDark ? "Light" : "Dark"}
          </button> */}
        </div>

        {/* Scattered SVG pairs */}
        {/* Pill - top left */}
        <div
          className="absolute"
          style={{ top: "12%", left: "8%", width: 90, height: 90 }}
        >
          <VectorToggle
            isDark={isDark}
            onToggle={() => setIsDark(!isDark)}
            lightSrc="/images/vegas/toggles/pilllight.svg"
            darkSrc="/images/vegas/toggles/pilldark.svg"
            glowColor="#ED174B"
            width={90}
            height={90}
            delay={0.3}
          />
        </div>

        {/* Syringe - top right */}
        <div
          className="absolute"
          style={{
            top: "40%",
            right: "10%",
            width: 100,
            height: 100,
            transform: "rotate(-160deg)",
          }}
        >
          <VectorToggle
            isDark={isDark}
            onToggle={() => setIsDark(!isDark)}
            lightSrc="/images/vegas/toggles/syringelight.svg"
            darkSrc="/images/vegas/toggles/syringedark.svg"
            glowColor="#ED174B"
            width={200}
            height={200}
            delay={0.5}
          />
        </div>

        {/* Star - bottom left (green) */}
        <div
          className="absolute"
          style={{ bottom: "30%", left: "15%", width: 80, height: 80 }}
        >
          <VectorToggle
            isDark={isDark}
            onToggle={() => setIsDark(!isDark)}
            lightSrc="/images/vegas/toggles/starlight.svg"
            darkSrc="/images/vegas/toggles/stardark.svg"
            glowColor="#ED174B"
            width={80}
            height={80}
            delay={0.7}
          />
        </div>

        {/* Pill - bottom right (rotated) */}
        <div
          className="absolute"
          style={{
            bottom: "10%",
            right: "8%",
            width: 75,
            height: 75,
            transform: "rotate(25deg)",
          }}
        >
          <VectorToggle
            isDark={isDark}
            onToggle={() => setIsDark(!isDark)}
            lightSrc="/images/vegas/toggles/pilllight.svg"
            darkSrc="/images/vegas/toggles/pilldark.svg"
            glowColor="#ED174B"
            width={75}
            height={75}
            delay={0.9}
          />
        </div>

        {/* Star - top center-right (blue) */}
        <div
          className="absolute"
          style={{ top: "8%", right: "35%", width: 60, height: 60 }}
        >
          <VectorToggle
            isDark={isDark}
            onToggle={() => setIsDark(!isDark)}
            lightSrc="/images/vegas/toggles/starlight.svg"
            darkSrc="/images/vegas/toggles/stardark-blue.svg"
            glowColor="#296CB5"
            width={60}
            height={60}
            delay={0.4}
          />
        </div>

        {/* Syringe - bottom center-left */}
        <div
          className="absolute"
          style={{
            bottom: "8%",
            left: "35%",
            width: 70,
            height: 70,
            transform: "rotate(-15deg)",
          }}
        >
          <VectorToggle
            isDark={isDark}
            onToggle={() => setIsDark(!isDark)}
            lightSrc="/images/vegas/toggles/syringelight.svg"
            darkSrc="/images/vegas/toggles/syringedark.svg"
            glowColor="#ED174B"
            width={70}
            height={70}
            delay={0.6}
          />
        </div>
      </section>

      <section {...longPressHandlers}>
        <HorizontalScroll>
          <div
            className="min-w-screen w-screen h-screen flex items-center justify-center shrink-0 transition-colors duration-500 relative overflow-hidden"
            style={{ backgroundColor: isDark ? "#000000" : "#23577A" }}
          >
            <h1
              className="display transition-all duration-500 z-10"
              style={
                isDark
                  ? {
                      WebkitTextStroke: "1px #ED174B",
                      WebkitTextFillColor: "#FEDCBB",
                      filter:
                        "drop-shadow(0 0 8px #ED174B) drop-shadow(0 0 25px #ED174B)",
                    }
                  : { color: "white", filter: "none" }
              }
            >
              Design System
            </h1>
            {/* Dark-only scattered icons */}
            <div
              className="absolute transition-opacity duration-700"
              style={{ top: "15%", left: "12%", opacity: isDark ? 1 : 0 }}
            >
              <VectorToggle
                isDark={isDark}
                onToggle={() => setIsDark(!isDark)}
                lightSrc="/images/vegas/toggles/pilllight.svg"
                darkSrc="/images/vegas/toggles/cigar.svg"
                glowColor="#ED174B"
                width={100}
                height={100}
                delay={0.2}
              />
            </div>
            <div
              className="absolute transition-opacity duration-700"
              style={{
                bottom: "20%",
                right: "10%",
                opacity: isDark ? 1 : 0,
                transform: "",
              }}
            >
              <VectorToggle
                isDark={isDark}
                onToggle={() => setIsDark(!isDark)}
                lightSrc="/images/vegas/toggles/syringelight.svg"
                darkSrc="/images/vegas/toggles/powder.svg"
                glowColor="##ED174B"
                width={80}
                height={80}
                delay={0.4}
              />
            </div>
            <div
              className="absolute transition-opacity duration-700"
              style={{ top: "10%", right: "20%", opacity: isDark ? 1 : 0 }}
            >
              <VectorToggle
                isDark={isDark}
                onToggle={() => setIsDark(!isDark)}
                lightSrc="/images/vegas/toggles/starlight.svg"
                darkSrc="/images/vegas/toggles/stardark-pink.svg"
                glowColor="#ED174B"
                width={50}
                height={50}
                delay={0.6}
              />
            </div>
          </div>
          <div className="min-w-screen w-screen h-screen shrink-0">
            <TypographySection
              data={vegasTypography}
              bgColor={isDark ? "#000000" : "#E4EBFF"}
              textColor={isDark ? "#FEDCBB" : "#000000"}
              isDark={isDark}
            />
          </div>
          <div className="min-w-screen w-screen h-screen shrink-0">
            <ColorPalette
              colors={isDark ? vegasDarkColors : vegasLightColors}
              isDark={isDark}
              description="A dual palette — clinical calm meets neon chaos"
              darkTextStyle={{ fillColor: "#FEDCBB", strokeColor: "#ED174B" }}
              onToggle={() => setIsDark(!isDark)}
              lightBgColor="#23577A"
              lightTextColor="white"
            />
          </div>
        </HorizontalScroll>
      </section>

      <section
        className="min-h-screen bg-[#23577A] flex items-center justify-center"
        {...longPressHandlers}
      >
        <h1 className="display text-white">Reception</h1>
      </section>
      <section></section>
      {/* Phone showcase with all sections */}
    </>
  );
}
