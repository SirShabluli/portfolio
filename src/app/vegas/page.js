import PhoneShowcase from "../components/PhoneShowcase";
import Image from "next/image";
import AIProcess from "../components/AIProcess";
import TypographySection from "../components/TypographySection";
import ColorPalette from "../components/ColorPalette";
import {
  catProjectSteps,
  netflixTypography,
  netflixColors,
} from "../../data/projectData";
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
    { xPosition: 0, rotation: 0, screenIndex: 11 },
    { xPosition: -25, rotation: Math.PI * 0.1, screenIndex: 12 },
    { xPosition: 0, rotation: Math.PI * 0, screenIndex: 13 },
    { xPosition: 0, rotation: Math.PI * -2, screenIndex: 14 },
    { xPosition: 25, rotation: Math.PI * 0, screenIndex: 15 },
  ];

  return (
    <>
      {/* Project Intro Section */}
      <section className="bg-black py-20 px-8 min-h-screen text-white">
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto items-center">
          {/* Left side images */}
          <div className="col-span-3 flex flex-col gap-4">
            <div className="col-span-3 flex flex-col gap-4">
              {" "}
              {/* המעטפת הכללית של כל הבלוק */}
              {/* דוגמה לזוג אחד - תחזור על זה עבור כל נתון */}
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium  tracking-wider opacity-60">
                  role
                </p>
                <p className="text-sm font-medium text-white">
                  UI Design & Illustration
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium  tracking-wider opacity-60">
                  Course
                </p>
                <p className="text-sm text-white font-medium leading-tight">
                  "Your Cart is Empty" - Digital Product Illustration
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium  tracking-wider opacity-60">
                  Year
                </p>
                <p className="text-sm font-medium text-white leading-tight">
                  2025 (4th year, parallel to graduation project)
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium  tracking-wider opacity-60">
                Duartion
              </p>
              <p className="text-sm text-white font-medium leading-tight">
                1 month
              </p>
            </div>
            {/* אפשר להוסיף תמונות כאן */}
          </div>

          {/* Center - Title, Image, Description */}
          <div className="col-span-5 flex flex-col items-center text-center gap-8">
            <Image
              src="/images/netflix-dating/NetflixLogo.svg"
              alt="Project preview"
              width={300}
              height={600}
              className=""
            />
            <h2 className=" text-4xl text-red-500 -mt-5">Dating</h2>
            <h3 className="text-2xl font-medium text-left">
              What if Netflix decided to create a dating app?
            </h3>
            <p className="text-white text-left">
              A fictional dating app where matching happens over shared watch
              lists, not gym selfies. Illustrated UI concept exploring what
              happens when comfort replaces performance.
            </p>
          </div>

          {/* Right side images */}
          <div className="col-span-3 flex flex-col gap-0">
            <Image
              src="/images/netflix-dating/pajama1.svg"
              alt="Project preview"
              width={600}
              height={600}
              className=""
            />
            <Image
              src="/images/netflix-dating/pajama2.svg"
              alt="Project preview"
              width={400}
              height={600}
              className=""
            />
          </div>
        </div>
      </section>

      {/* Title Section before PhoneShowcase */}
      <section className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="display text-white">The Product</h1>
      </section>

      <PhoneShowcase
        sections={sections}
        showOutlines={true}
        showMarkers={showMarkers}
      >
        <section className="section-1">
          <div className="grid md:grid-cols-8 lg:grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-4 md:col-span-2 ${outline} md:col-start-2 flex flex-col justify-center gap-9`}
            >
              <span data-animate="2" data-animation="fade">
                <TextBlock label="the challenge" title="easy connections">
                  In the Netflix world, there are many types of connections. The
                  challenge was to find something that conveys the idea of two
                  different things coming together - staying simple and
                  universal, without relying on niche concepts.
                </TextBlock>
              </span>
              <span data-animate="3" data-animation="fade">
                <TextBlock label="My Solution" title="obvious connection">
                  {`Your couch is perfectly adjusted - the angles, the cushions, the softness.

But when someone new enters the picture, maybe it's worth investing in something that works for both of you.

Two couches side by side: one beige, one red velvet. Different styles, same vibe. It's not about matching perfectly - it's about being comfortable together.`}
                </TextBlock>
              </span>
            </div>
            <div
              className={`col-span-4 phone-pocket md:col-span-4 md:col-start-5 ${outline}`}
            ></div>
            <div
              className={`col-span-4 md:col-span-3 md:col-start-9 ${outline} flex flex-col gap-4 justify-center`}
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
          <div className="grid grid-cols-12 gap-10 flex justify-center my-20 min-h-screen ">
            <div
              className={`col-span-4 md:col-span-4 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            ></div>
            <div
              className={`col-span-4 md:col-span-3 md:col-start-6 ${outline} flex flex-col justify-center`}
            >
              <span data-animate="1" data-animation="fade" className="quote">
                "Some things shouldn&apos;t be dealt with alone..."
              </span>
            </div>
            <div
              className={`col-span-2 md:col-span-2 md:col-start-9 ${outline} flex flex-col justify-center gap-4`}
            >
              <span data-animate="2" data-animation="fade">
                <TextBlock label="the challenge" title="Define 'missing'">
                  The "Empty State" needed to tell the user: "You're missing
                  something that could make your life easier"—and position the
                  app as the solution.
                </TextBlock>
              </span>
              <span data-animate="4" data-animation="fade">
                <TextBlock
                  label="My Solution"
                  title="Solution for a trivial pain"
                >
                  {`I identified the trivial pains of solo Netflix nights and illustrated them honestly.

By showing an empty pizza box and a half-finished glass of wine, I validated the messy reality of watching alone.

The message isn't "you need someone." It's "some things are just easier together."`}
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
                <TextBlock label="the challenge" title="immediate dismissal">
                  {`The "Share the App" screen often feels like a burden. Users feel the app is forcing them to do something they don't want to.

Most people just dismiss it immediately.

How do you make someone pause before closing the window—and maybe act differently?`}
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
              className={`col-span-4 md:col-span-4 phone-pocket md:col-start-5 ${outline} flex items-center justify-center`}
            ></div>
            <div
              className={`col-span-3 md:col-span-2 md:col-start-10 ${outline} flex flex-col gap-8 justify-center`}
            >
              <span data-animate="4" data-animation="fade">
                <TextBlock label="My Solution" title="Irony">
                  {`According to Netflix's rules, account sharing isn't allowed. Yet we all know the profile selection screen—filled with family members, friends, and "definitely not your ex."

I took that familiar restriction and flipped it. This time, Netflix wants you to share.

By mimicking the iconic "Who's Watching?" screen, I created a playful moment of recognition.`}
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
              className={`col-span-3 md:col-span-2 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
            >
              <span data-animate="4" data-animation="fade">
                <TextBlock label="The Challenge" title="Defusing Frustration">
                  {`The "Verification Failed" screen is all about frustration.

It touches on pains people don't speak about - they might feel guilty, worried that their photos don't represent them, or concerned that someone else is using their image.`}
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
              className={`col-span-4 md:col-span-4 md:col-start-5 phone-pocket ${outline}`}
            ></div>
            <div
              className={`pt-50 col-span-3 md:col-span-2 md:col-start-10 ${outline} items-center flex flex-col gap-4`}
            >
              <span data-animate="4" data-animation="fade">
                <TextBlock label="My Solution" title="Empathy in frustration">
                  I turned the colloquial term "Catfish" into the illustration
                  itself: a grumpy cat wearing a fish hat, clearly unimpressed.
                </TextBlock>
              </span>

              <span data-animate="4" data-animation="fade">
                <TextBlock label="" title="">
                  {`This shifts blame from user to app - transforming "Why won't you verify me?" into "How dare you think I'm fake?"

By humanizing the error with humor, the app becomes self-deprecating. Users are more likely to try again.`}
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
          <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen">
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
                  title="Same Same but Different"
                >
                  The premium screen offers users an elevated
                  experience—something they don't have yet. It's about adding
                  what's missing. Premium usually gets a distinct color while
                  staying true to the original brand.
                </TextBlock>
              </span>
              <span data-animate="4" data-animation="fade">
                <TextBlock
                  label="My Solution"
                  title="Solution for a trivial pain"
                >
                  {`Literally an addition: a chaise lounge. An extra piece that upgrades the entire couch.

For the color, I introduced a golden yellow—still warm and inviting, but distinctly premium.

The shift from beige to gold signals luxury without abandoning the cozy aesthetic.

If the app is about the living room experience, premium should be the ultimate piece of furniture. More comfort, more features, more luxury - without losing the homey vibe.`}
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

      {/* Screen Section with Zoom */}

      <HorizontalScroll>
        <div className="min-w-screen w-screen h-screen bg-black flex items-center justify-center flex-shrink-0">
          <h1 className="display text-white">Design System</h1>
        </div>
        <div className="min-w-screen w-screen h-screen flex-shrink-0">
          <TypographySection data={netflixTypography} />
        </div>
        <div className="min-w-screen w-screen h-screen flex-shrink-0">
          <ColorPalette colors={netflixColors} />
        </div>
      </HorizontalScroll>

      <section className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="display text-white">AI as a Blueprint</h1>
      </section>

      <AIProcess data={catProjectSteps} />
      <section className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="display text-white">Reception</h1>
      </section>
      <section></section>
      {/* Phone showcase with all sections */}
    </>
  );
}
