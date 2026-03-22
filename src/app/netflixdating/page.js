import PhoneShowcase from "../components/PhoneShowcase";
import Image from "next/image";
import AIProcess from "../components/AIProcess";
import TypographySection from "../components/TypographySection";
import ColorPalette from "../components/ColorPalette";
import {
  catProjectSteps,
  netflixTypography,
  netflixColors,
  netflixSections,
} from "../../data/projectData";
import MobilePhoneShowcase from "../components/MobilePhoneShowcase";
import Lauryl from "../components/Lauryl";
import ScreenZoomSection from "../components/ScreenZoomSection";
import HorizontalScroll from "../components/HorizontalScroll";
import TextBlock from "../components/TextBlock";

export default function NetflixDatingPage() {
  // Debug flags - set to true/false to toggle
  const showOutlines = false;
  const showMarkers = false;

  const outline = showOutlines ? "outline outline-1 outline-red-500" : "";

  // Configuration for each section
  const sections = [
    { xPosition: 0, rotation: 0, screenIndex: 2 },
    { xPosition: -25, rotation: Math.PI * 0.1, screenIndex: 0 },
    { xPosition: 0, rotation: Math.PI * 0, screenIndex: 4 },
    { xPosition: 0, rotation: Math.PI * -2, screenIndex: 1 },
    { xPosition: 25, rotation: Math.PI * 0, screenIndex: 3 },
  ];

  return (
    <>
      {/* Project Intro Section */}
      <section className="px-8 min-h-screen text-white relative overflow-hidden flex items-center justify-center">
        <Image
          src="/images/netflix-dating/pajamaGrid.png"
          alt=""
          fill
          className="object-cover opacity-10 pointer-events-none"
        />
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, black 100%)",
          }}
        />
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12  gap-8 max-w-7xl mx-auto items-center relative z-10">
          {/* Netflix Logo */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-4 flex flex-col gap-7 justify-center items-center mx-10 mt-[50%]">
            <Image
              src="/images/netflix-dating/NetflixLogo.svg"
              alt="Project preview"
              width={600}
              height={1200}
              className="w-full h-auto"
            />
            <h2 className=" text-4xl lg:text-6xl text-red-500 -mt-5">Dating</h2>
          </div>
          {/* Center - Title, Description */}
          <div className="col-span-4  lg:col-span-6 lg:col-start-4 flex flex-col text-left gap-1 mt-20 opacity-90">
            <h3 className="text-xl font-medium text-left"></h3>
            <p className="text-sm lg:text-lg font-medium text-white text-left">
              What if Netflix made a dating app? Illustrated UI exploring
              comfort-based connection over performative attraction.
            </p>
            <div className="flex flex-col lg:flex-row gap-1 mt-10 text-left w-full ">
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
                  "Your Cart is Empty" - Digital Product Illustration
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
      <section className="hidden lg:flex min-h-screen bg-black items-center justify-center">
        <h1 className=" display text-white">The Product</h1>
      </section>

      {/* Mobile Phone Showcase - visible only on mobile */}
      <div className="md:hidden">
        {netflixSections.map((section) => (
          <MobilePhoneShowcase
            key={section.id}
            section={section}
            bgColor="#000000"
            textColor="#ffffff"
          />
        ))}
      </div>

      {/* Desktop Phone Showcase - hidden on mobile */}
      <div className="hidden md:block">
        <PhoneShowcase
          sections={sections}
          showOutlines={true}
          showMarkers={showMarkers}
        >
          <section className="section-1">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
              <div
                className={`lg:col-span-3 ${outline} lg:col-start-2 flex flex-col justify-center gap-9`}
              >
                <span data-animation="fade">
                  <TextBlock label="the challenge" title="easy connections">
                    Netflix has many types of connections. I needed to convey
                    "two different things coming together" simply and
                    universally, without niche concepts.
                  </TextBlock>
                </span>
                <span data-animation="fade">
                  <TextBlock label="My Solution" title="obvious connection">
                    Your couch is perfectly adjusted. But when someone new
                    enters, maybe it's worth investing in something that works
                    for both.
                  </TextBlock>
                </span>
              </div>
              <div
                className={`col-span-4 phone-pocket lg:col-span-4 lg:col-start-5 ${outline}`}
              ></div>
              <div
                className={`col-span-4 lg:col-span-3 lg:col-start-9 ${outline} flex flex-col gap-4 justify-center`}
              >
                <span
                  data-animate="1"
                  data-animation="fade"
                  className="mt-10 flex items-center quote"
                >
                  &ldquo;might be your first step towards a new couch&ldquo;
                </span>
              </div>
            </div>
          </section>
          <section className="section-2">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-10 flex justify-center my-20 min-h-screen ">
              <div
                className={`col-span-4 lg:col-span-4 ${outline} lg:col-start-2 flex flex-col justify-center gap-5`}
              ></div>
              <div
                className={`col-span-4 lg:col-span-3 lg:col-start-6 ${outline} flex flex-col justify-center`}
              >
                <span data-animate="1" data-animation="fade" className="quote">
                  "Some things shouldn&apos;t be dealt with alone..."
                </span>
              </div>
              <div
                className={`col-span-3 lg:col-span-3 lg:col-start-9 ${outline} flex flex-col justify-center gap-4`}
              >
                <span data-animate="2" data-animation="fade">
                  <TextBlock label="the challenge" title="Define 'missing'">
                    The "Empty State" needed to tell the user: "You're missing
                    something that could make your life easier", and position
                    the app as the solution.
                  </TextBlock>
                </span>
                <span data-animate="4" data-animation="fade">
                  <TextBlock
                    label="My Solution"
                    title="Solution for a trivial pain"
                  >
                    Empty pizza box, unfinished wine. Small honest moments from
                    solo nights. Not "you need someone"—just "easier together."
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
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
              <div
                className={`col-span-3 lg:col-span-3 ${outline} lg:col-start-2 flex flex-col justify-center gap-5`}
              >
                <span data-animate="2" data-animation="fade">
                  <TextBlock label="the challenge" title="immediate dismissal">
                    "Share the App" screens feel like a burden. Most dismiss
                    immediately. How do you make someone pause before closing?
                  </TextBlock>
                  <span
                    data-animate="1"
                    data-animation="fade"
                    className="mt-5 flex items-center text-lg"
                  >
                    &ldquo;Something smells fishy, but it might just be our
                    mistake&ldquo;
                  </span>
                </span>
              </div>
              <div
                className={`col-span-4 lg:col-span-4 phone-pocket lg:col-start-5 ${outline} flex items-center justify-center`}
              ></div>
              <div
                className={`col-span-3 lg:col-span-2 lg:col-start-9 ${outline} flex flex-col gap-8 justify-center`}
              >
                <span data-animate="4" data-animation="fade">
                  <TextBlock label="My Solution" title="Irony">
                    Account sharing isn't allowed. Yet everyone knows that
                    profile screen. I flipped it—this time Netflix wants you to
                    share. Playful recognition through familiar UI.
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
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
              <div
                className={`col-span-3 lg:col-span-3 ${outline} lg:col-start-2 flex flex-col justify-center gap-5`}
              >
                <span data-animate="4" data-animation="fade">
                  <TextBlock label="The Challenge" title="Defusing Frustration">
                    "Verification Failed" = frustration. Touches unspoken pains:
                    guilt, photos not representing you, someone using your
                    image.
                  </TextBlock>
                </span>
                <span
                  data-animate="1"
                  data-animation="fade"
                  className="mt-5 flex items-center quote"
                >
                  &ldquo;Something smells fishy, but it might just be our
                  mistake&ldquo;
                </span>
              </div>
              <div
                className={`lg:col-span-4 lg:col-start-5 phone-pocket ${outline}`}
              ></div>
              <div
                className={`pt-50 lg:col-span-3 lg:col-start-9 ${outline} items-start flex flex-col gap-10`}
              >
                <span data-animate="4" data-animation="fade">
                  <TextBlock label="My Solution" title="Empathy in frustration">
                    A grumpy cat in a fish hat. Literally "Catfish."
                  </TextBlock>
                </span>

                <Lauryl
                  data-animate="4"
                  data-animation="sticker"
                  topText="Intended"
                  bottomText="PUN"
                />
                <span data-animate="4" data-animation="fade" className="mb-10">
                  <TextBlock label="" title="">
                    Shifts blame from user to app. "Why won't you verify me?"
                    becomes "How dare you think I'm fake?" Humor makes the app
                    self-deprecating. Users try again.
                  </TextBlock>
                </span>
              </div>
            </div>
          </section>
          <section className="section-5 ">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 flex justify-center my-20 min-h-screen">
              <div
                className={`col-span-4 lg:col-span-3 ${outline} lg:col-start-2 flex flex-col justify-center gap-5`}
              >
                <span
                  data-animate="1"
                  data-animation="fade"
                  className="mt-10 flex items-center quote"
                >
                  &ldquo;The upgrade that makes everything fall into
                  place&ldquo;
                </span>
              </div>
              <div
                className={`col-span-3 lg:col-span-3 lg:col-start-5 ${outline} flex flex-col justify-center gap-4`}
              >
                <span data-animate="2" data-animation="fade">
                  <TextBlock
                    label="the challenge"
                    title="Elevating the Free Experience
"
                  >
                    Premium shows what users don't have yet—elevated experience
                    through distinct color, staying true to the original brand.
                  </TextBlock>
                </span>
                <span data-animate="4" data-animation="fade">
                  <TextBlock label="My Solution" title="Adding Premium Comfort">
                    A chaise lounge - literally an addition that upgrades the
                    couch. Golden yellow instead of beige. Warm, inviting,
                    distinctly premium. More comfort, more luxury—without losing
                    the homey vibe.
                  </TextBlock>
                </span>
              </div>
              <div
                className={`pt-50 phone-pocket lg:col-span-4 lg:col-start-8 ${outline} flex flex-col gap-4`}
              >
                <h2></h2>
              </div>
            </div>
          </section>
          <section></section>
        </PhoneShowcase>
      </div>

      {/* Screen Section with Zoom */}
      <ScreenZoomSection imageSrc="/images/netflix-dating/screen.png">
        <span data-animate="2" data-animation="fade">
          <TextBlock label="the challenge" title="New Format">
            Desktop required rethinking everything. Larger canvas, more detail,
            different mindset. Beyond illustration - I needed to design the
            interface.
          </TextBlock>
        </span>
        <span data-animate="4" data-animation="fade">
          <TextBlock label="My Solution" title="Multiplicity & Variety">
            Larger screen allowed detail—I chose pajamas. Cozy, relatable.
            Repeating patterns: visual richness, variety, familiarity. All kinds
            of people, all kinds of pajamas.
          </TextBlock>
        </span>
      </ScreenZoomSection>
      <section>
        <HorizontalScroll>
          <div className="min-w-screen w-screen overflow-x-hidden h-screen bg-black flex items-center justify-center shrink-0">
            <h1 className="text-8xl flex text-center lg:display text-white">
              Design System
            </h1>
          </div>
          <div className="min-w-screen w-screen h-screen shrink-0">
            <TypographySection data={netflixTypography} />
          </div>
          <div className="min-w-screen w-screen h-screen shrink-0">
            <ColorPalette colors={netflixColors} />
          </div>
        </HorizontalScroll>
      </section>

      <section className="overflow-x-hidden min-h-screen bg-black flex items-end pb-20 justify-center">
        <h1 className=" text-center display text-white">AI as a Blueprint</h1>
      </section>

      <AIProcess data={catProjectSteps} />
      <section className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="display overflow-x-hidden text-white">Reception</h1>
      </section>
      <section></section>
      {/* Phone showcase with all sections */}
    </>
  );
}
