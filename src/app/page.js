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
          <div className="grid grid-cols-12 gap-4 flex justify-center">
            <div className="col-span-4 md:col-span-3 outline outline-1 outline-red-500 md:col-start-2">
              LEFT CONTENT
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-5 outline outline-1 outline-red-500">
              MIDDLE
            </div>
            <div className="col-span-4 md:col-span-3 md:col-start-9 outline outline-1 outline-red-500 quote">
              RIGHT CONTENT
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
