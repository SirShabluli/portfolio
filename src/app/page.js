import gsap from "gsap";
import Link from "next/link";
import Mobile from "./components/Mobile";

export default function Home() {
  return (
    <>
      <main className="relative bg-black text-white overflow-visible">
        <Mobile />

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
        <section>
          <div className="grid grid-cols-12 gap-8 flex justify-center my-20 min-h-screen ">
            <div className="col-span-4 md:col-span-3 outline outline-1 outline-red-500 md:col-start-2 flex flex-col justify-center gap-5">
              <p>
                Technical errors and verification loops are high-friction points
                that lead to app abandonment. I chose to address this through
                the literal interpretation of a common dating term:
              </p>
              <h3>Catfish</h3>
              <p>
                By illustrating a grumpy cat wearing a fish hat, the app takes a
                self-deprecating tone. This "wink" at the user transforms a
                moment of potential anger ("Why won't it verify me?") into a
                moment of levity. It humanizes the technology, suggesting that
                the error might be a "fishy" mistake on the system's part rather
                than a failure of the user, making them much more likely to try
                again.
              </p>
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-5 outline outline-1 outline-red-500">
              MIDDLE
            </div>
            <div className="col-span-4 md:col-span-3 md:col-start-9 outline outline-1 outline-red-500 flex flex-col">
              <h2>Defusing Frustration</h2>
              <p>Using a "Pun" as a tool for de-escalation.</p>
              <span className="mt-10 quote">
                &ldquo;Something smells fishy, but it might just be our
                mistake&ldquo;
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
