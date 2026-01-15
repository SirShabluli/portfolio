"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Mobile from "./components/Mobile";
import { useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef(null);
  const phoneRef = useRef(null);
  const [activeScreen, setActiveScreen] = useState(0);
  // הוספת State כדי להחזיק את האובייקט של Spline
  const [splineApp, setSplineApp] = useState(null);

  // Debug flags - set to true/false to toggle
  const showOutlines = false; // Change to false to hide red outlines
  const showMarkers = false; // Change to false to hide GSAP markers

  // Helper function to conditionally add outline classes
  const outline = showOutlines ? "outline outline-1 outline-red-500" : "";

  useGSAP(
    () => {
      if (!splineApp) return;
      const phoneModel = splineApp.findObjectByName("Mobile");
      if (phoneModel) phoneModel.scale.set(4, 4, 4);

      // 1. נעיצה בלבד - זה גורם לטלפון להישאר תקוע למסך לאורך כל הדרך
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "bottom top",
        pin: "#mobile-wrapper",
        pinSpacing: false,
        markers: showMarkers,
      });

      // פונקציית עזר קטנה כדי שלא תכתוב את אותו קוד 5 פעמים
      const animateSection = (sectionClass, xPercentValue, rotationY = 0) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionClass,
            start: "top center",
            end: "center center",
            scrub: 1,
            markers: showMarkers,
          },
        });

        tl.to(phoneRef.current, { xPercent: xPercentValue, duration: 3 });

        if (phoneModel) {
          // כאן אנחנו מוסיפים את הסיבוב שרצית, הוא יסתיים בדיוק כשהתנועה מסתיימת
          tl.to(phoneModel.rotation, { y: rotationY, duration: 5 }, 0);
        }

        // Text animations - animate text elements within this section
        const section = document.querySelector(sectionClass);
        if (section) {
          const quotes = section.querySelectorAll(".quote");
          const headings = section.querySelectorAll("h2, h3");
          const paragraphs = section.querySelectorAll("p");

          // Animate quotes - slide in from right after phone settles
          quotes.forEach((quote) => {
            tl.from(quote, { x: 100, opacity: 0, duration: 5 }, "-=1");
          });

          // Animate headings - fade and slide from top
          headings.forEach((heading) => {
            tl.from(heading, { y: 50, opacity: 0, duration: 0.8 }, "-=0.8");
          });

          // Animate paragraphs - subtle fade in
          paragraphs.forEach((paragraph) => {
            tl.from(paragraph, { y: 30, opacity: 0, duration: 0.8 }, "-=0.6");
          });
        }
      };

      // 2. הפעלת האנימציות לכל סקשן בנפרד
      animateSection(".section-1", 0, 0);
      animateSection(".section-2", -25, Math.PI * 0.15); // סיבוב רבע סיבוב
      animateSection(".section-3", 0, Math.PI * 0); // חזרה למרכז וחצי סיבוב
      animateSection(".section-4", 0, Math.PI * -2);
      animateSection(".section-5", 25, Math.PI * 0); // סיבוב שלם
    },
    { scope: mainRef, dependencies: [splineApp] }
  );

  return (
    <main
      ref={mainRef}
      className="relative bg-black text-white overflow-visible flex flex-col gap-40"
    >
      {/* העברת פונקציית הטעינה לקומפוננטה */}

      <div
        id="mobile-wrapper"
        className="fixed flex items-center justify-center inset-0 pointer-events-none z-50 overflow-visible"
      >
        <div
          ref={phoneRef}
          className="min-w-screen flex items-center justify-center"
        >
          <Mobile onSplineLoad={setSplineApp} screenIndex={activeScreen} />
        </div>
      </div>
      <section className="flex min-h-screen flex-col items-center justify-center">
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
      </section>
      <section className="section-1">
        <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
          <div
            className={`col-span-4 md:col-span-3 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
          >
            <p>
              This represents the "Co-watching" goal of the app. it acknowledges
              the long-term potential of a relationship. It moves the focus from
              a digital "hit" to a real-world outcome: the eventual transition
              from two separate apartments to one shared living room.
            </p>
          </div>
          <div
            className={`col-span-4 phone-pocket md:col-span-4 md:col-start-5 ${outline}`}
          ></div>
          <div
            className={`col-span-4 md:col-span-3 md:col-start-9 ${outline} flex flex-col gap-4 justify-center`}
          >
            <span className="mt-10 flex items-center quote">
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
            <span className="quote">
              “Some things shouldn&apos;t be dealt with alone...”
            </span>
          </div>
          <div
            className={`col-span-4 md:col-span-3 md:col-start-9 ${outline} flex flex-col justify-center gap-4`}
          >
            <h2>Empathy in Loneliness</h2>

            <p>
              The "Empty State" is the most vulnerable moment for a user on a
              dating app. The Deep Dive: When a user sees "No Chats," they often
              feel a sense of rejection. To counter this, I illustrated a messy,
              empty pizza box with crumbs and a half-finished glass of wine.
              This scene is intentionally "unpolished" to mirror the reality of
              a solo night in. By changing the CTA (Call to Action) from a
              standard "Start Browsing" to "Find Someone to Clean Up With," I
              used humor to validate the user&apos;s experience. It tells the
              user that the app "gets" the messiness of being single and
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
            <p>
              I drew inspiration from the iconic Netflix Profile Selection
              screen—the first thing millions of people see when they turn on
              their TV
            </p>
            <h3>Here</h3>
          </div>
          <div
            className={`col-span-4 md:col-span-4 phone-pocket md:col-start-5 ${outline} flex items-center justify-center`}
          ></div>
          <div
            className={`col-span-4 md:col-span-3 md:col-start-9 ${outline} flex flex-col gap-4 justify-center`}
          >
            <h2>Sharing is Caring</h2>
            <p>
              The challenge was to design a screen that encourages users to
              invite friends without feeling like &quot;spam.&quot;
            </p>
            <span className=" flex items-center quote">
              &ldquo;Spread the word, not always sharing is spoiling&ldquo;
            </span>
            <p>
              By mimicking the Netflix startup UI, I eliminated the
              &quot;learning curve&quot; for the user. They already know what to
              do on this screen before they even read the text. It transforms a
              marketing goal (user acquisition) into a seamless part of the
              product’s DNA
            </p>
          </div>
        </div>
      </section>
      <section className="section-4">
        <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
          <div
            className={`col-span-4 md:col-span-3 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
          >
            <p>
              Technical errors and verification loops are high-friction points
              that lead to app abandonment. I chose to address this through the
              literal interpretation of a common dating term:
            </p>
            <h3>Catfish</h3>
            <p>
              By illustrating a grumpy cat wearing a fish hat, the app takes a
              self-deprecating tone. This "wink" at the user transforms a moment
              of potential anger ("Why won&apos;t it verify me?") into a moment
              of levity. It humanizes the technology, suggesting that the error
              might be a "fishy" mistake on the system&apos;s part rather than a
              failure of the user, making them much more likely to try again.
            </p>
          </div>
          <div
            className={`col-span-4 md:col-span-4 md:col-start-5 phone-pocket ${outline}`}
          ></div>
          <div
            className={`pt-50 col-span-4 md:col-span-3 md:col-start-9 ${outline} flex flex-col gap-4`}
          >
            <h2>Defusing Frustration</h2>
            <p>Using a &quot;Pun&quot; as a tool for de-escalation.</p>
            <span className="mt-10 flex items-center quote">
              &ldquo;Something smells fishy, but it might just be our
              mistake&ldquo;
            </span>
          </div>
        </div>
      </section>
      <section className="section-5">
        <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
          <div
            className={`col-span-4 md:col-span-3 ${outline} md:col-start-2 flex flex-col justify-center gap-5`}
          >
            <span className="mt-10 flex items-center quote">
              &ldquo;The upgrade that makes everything fall into place&ldquo;
            </span>
          </div>
          <div
            className={`col-span-4 md:col-span-3 md:col-start-5 ${outline} flex flex-col justify-center gap-4`}
          >
            <h2>Premium Comfort</h2>
            <p>
              Premium services often feel cold or overly "techy". To keep the
              warm, illustrated feel of the app, I chose a Golden Chaise Lounge
              to represent the upgrade.
            </p>
            <p>
              If the app is about the "living room experience," the premium
              version should be the ultimate piece of furniture. It’s an
              expansion of the basic couch—offering more comfort, more features,
              and a touch of luxury without losing the "homey" vibe.
            </p>
          </div>
          <div
            className={`pt-50 phone-pocket col-span-4 md:col-span-4 md:col-start-8 ${outline} flex flex-col gap-4`}
          >
            <h2></h2>
          </div>
        </div>
      </section>
    </main>
  );
}
