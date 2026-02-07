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
    { xPosition: 25, rotation: Math.PI * 0.0, screenIndex: 12 },
    { xPosition: -25, rotation: Math.PI * 0, screenIndex: 13 },
    { xPosition: 0, rotation: Math.PI * 0, screenIndex: 14 },
    { xPosition: 25, rotation: Math.PI * 2, screenIndex: 15 },
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
                <TextBlock
                  label="the challenge"
                  title="Making Organization Feel Clinical"
                >
                  In this app's universe, everything is medical. If users
                  organize their Vegas trips into collections, what's the
                  medical equivalent? Where do you store your "prescriptions"?
                </TextBlock>
              </span>
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
              className={`col-span-3 md:col-span-2 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
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
