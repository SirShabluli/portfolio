import PhoneShowcase from "./components/PhoneShowcase";
import Image from "next/image";
import AIProcess from "./components/AIProcess";
import TypographySection from "./components/TypographySection";
import ColorPalette from "./components/ColorPalette";
import GlassCard from "./components/GlassCard";
import {
  catProjectSteps,
  netflixTypography,
  netflixColors,
} from "../data/projectData";
import Lauryl from "./components/Lauryl";

export default function Home() {
  // Debug flags - set to true/false to toggle
  const showOutlines = false;
  const showMarkers = false;

  const outline = showOutlines ? "outline outline-1 outline-red-500" : "";

  // Configuration for each section
  const sections = [
    { xPosition: 0, rotation: 0, screenIndex: 2 },
    { xPosition: -25, rotation: Math.PI * 0.15, screenIndex: 0 },
    { xPosition: 0, rotation: Math.PI * 0, screenIndex: 4 },
    { xPosition: 0, rotation: Math.PI * -2, screenIndex: 1 },
    { xPosition: 25, rotation: Math.PI * 0, screenIndex: 3 },
  ];

  return (
    <>
      {/* Hero section - outside of PhoneShowcase */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <h1 className="text-6xl font-bold tracking-tighter italic">
          EYAL.WORKS
        </h1>
        <p className="mt-4 text-gray-400 font-light">
          Something creative is loading from India..
        </p>
        <a
          href="https://www.linkedin.com/in/eyal-mo"
          target="_blank"
          rel="noreferrer"
          className="z-2 mt-6 underline text-sm"
        >
          Here&apos;s a link to my LinkedIn
        </a>
        <Lauryl topText="Award Winner" bottomText="Best Design 2024" />
      </section>

      <PhoneShowcase
        sections={sections}
        showOutlines={showOutlines}
        showMarkers={showMarkers}
      >
        <section className="section-1">
          <div className="grid md:grid-cols-8 lg:grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-4 md:col-span-3 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            >
              <h2 data-animate="2">Merging Private Spaces</h2>
              <p data-animate="2">
                This represents the &quot;Co-watching&quot; goal of the
                app.{" "}
              </p>
              <p data-animate="2">
                {" "}
                it acknowledges the long-term potential of a relationship. It
                moves the focus from a digital &quot;hit&quot; to a real-world
                outcome: the eventual transition from two separate apartments to
                one shared living room.
              </p>
            </div>
            <div
              className={`col-span-4 phone-pocket md:col-span-4 md:col-start-5 ${outline}`}
            ></div>
            <div
              className={`col-span-4 md:col-span-3 md:col-start-9 ${outline} flex flex-col gap-4 justify-center`}
            >
              <span
                data-animate="1"
                data-animation="slide-left"
                className="mt-10 flex items-center quote"
              >
                &ldquo;might be your first step towards a new couch&ldquo;
              </span>
            </div>
          </div>
        </section>
        <section className="section-2">
          <div className="grid grid-cols-12 gap-10 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-4 md:col-span-4 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            ></div>
            <div
              className={`col-span-4 md:col-span-3 md:col-start-6 ${outline} flex flex-col justify-center`}
            >
              <span
                data-animate="1"
                data-animation="slide-left"
                className="quote"
              >
                "Some things shouldn&apos;t be dealt with alone..."
              </span>
            </div>
            <div
              className={`col-span-4 md:col-span-3 md:col-start-9 ${outline} flex flex-col justify-center gap-4`}
            >
              <h2 data-animate="2">Empathy in Loneliness</h2>

              <p data-animate="2">
                The "Empty State" is the most vulnerable moment for a user on a
                dating app. The Deep Dive: When a user sees "No Chats," they
                often feel a sense of rejection. To counter this, I illustrated
                a messy, empty pizza box with crumbs and a half-finished glass
                of wine. This scene is intentionally "unpolished" to mirror the
                reality of a solo night in. By changing the CTA (Call to Action)
                from a standard "Start Browsing" to "Find Someone to Clean Up
                With,"
              </p>
              <p data-animate="2">
                I used humor to validate the user&apos;s experience. It tells
                the user that the app "gets" the messiness of being single and
                positions the platform as a partner in finding someone to share
                those raw, uncurated moments with.
              </p>
            </div>
          </div>
        </section>
        <section className="section-3">
          <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-4 md:col-span-3 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            >
              <p data-animate="2">
                I drew inspiration from the iconic Netflix Profile Selection
                screen—the first thing millions of people see when they turn on
                their TV
              </p>
              <Image
                data-animate="2"
                src="/images/WhosWatching.png"
                alt="Netflix Who's Watching screen"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <h3 data-animate="2">Here</h3>
            </div>
            <div
              className={`col-span-4 md:col-span-4 phone-pocket md:col-start-5 ${outline} flex items-center justify-center`}
            ></div>
            <div
              className={`col-span-4 md:col-span-3 md:col-start-9 ${outline} flex flex-col gap-4 justify-center`}
            >
              <h2 data-animate="2">Sharing is Caring</h2>
              <p data-animate="2">
                The challenge was to design a screen that encourages users to
                invite friends without feeling like &quot;spam.&quot;
              </p>
              <span
                data-animate="1"
                data-animation="slide-left"
                className=" flex items-center quote"
              >
                &ldquo;Spread the word, not always sharing is spoiling&ldquo;
              </span>
              <p data-animate="2">
                By mimicking the Netflix startup UI, I eliminated the
                &quot;learning curve&quot; for the user. They already know what
                to do on this screen before they even read the text. It
                transforms a marketing goal (user acquisition) into a seamless
                part of the product's DNA
              </p>
            </div>
          </div>
        </section>
        <section className="section-4">
          <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-4 md:col-span-3 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            >
              <p data-animate="2">
                Technical errors and verification loops are high-friction points
                that lead to app abandonment. I chose to address this through
                the literal interpretation of a common dating term:
              </p>
              <h3 data-animate="2">Catfish</h3>
              <Lauryl data-animate="3" topText="Intended" bottomText="PUN" />
              <p data-animate="2">
                By illustrating a grumpy cat wearing a fish hat, the app takes a
                self-deprecating tone. This "wink" at the user transforms a
                moment of potential anger ("Why won&apos;t it verify me?") into
                a moment of levity. It humanizes the technology, suggesting that
                the error might be a "fishy" mistake on the system&apos;s part
                rather than a failure of the user, making them much more likely
                to try again.
              </p>
            </div>
            <div
              className={`col-span-4 md:col-span-4 md:col-start-5 phone-pocket ${outline}`}
            ></div>
            <div
              className={`pt-50 col-span-4 md:col-span-3 md:col-start-9 ${outline} flex flex-col gap-4`}
            >
              <h2 data-animate="2">Defusing Frustration</h2>
              <p data-animate="2">
                Using a &quot;Pun&quot; as a tool for de-escalation.
              </p>
              <span
                data-animate="1"
                data-animation="slide-left"
                className="mt-10 flex items-center quote"
              >
                &ldquo;Something smells fishy, but it might just be our
                mistake&ldquo;
              </span>
            </div>
          </div>
        </section>
        <section className="section-5 ">
          <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen">
            <div
              className={`col-span-4 md:col-span-3 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            >
              <span
                data-animate="1"
                data-animation="slide-left"
                className="mt-10 flex items-center quote"
              >
                &ldquo;The upgrade that makes everything fall into place&ldquo;
              </span>
            </div>
            <div
              className={`col-span-4 md:col-span-3 md:col-start-5 ${outline} flex flex-col justify-center gap-4`}
            >
              <h2 data-animate="2">Premium Comfort</h2>
              <p data-animate="2">
                Premium services often feel cold or overly "techy". To keep the
                warm, illustrated feel of the app, I chose a Golden Chaise
                Lounge to represent the upgrade.
              </p>
              <p data-animate="2">
                If the app is about the "living room experience," the premium
                version should be the ultimate piece of furniture. It's an
                expansion of the basic couch—offering more comfort, more
                features, and a touch of luxury without losing the "homey" vibe.
              </p>
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
      <TypographySection data={netflixTypography} />
      <ColorPalette colors={netflixColors} />
      <AIProcess data={catProjectSteps} />
      {/* Phone showcase with all sections */}
    </>
  );
}
