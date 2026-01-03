import gsap from "gsap";
import Link from "next/link";
import Mobile from "./components/Mobile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Mobile />
      <h1 className="text-6xl font-bold tracking-tighter italic">EYAL.WORKS</h1>
      <p className="mt-4 text-gray-400 font-light">
        Something creative is loading from India...
      </p>
      <a
        href="https://www.linkedin.com/in/eyal-mo"
        target="_blank"
        rel="noreferrer"
        className="mt-6 underline text-sm"
      >
        Here&apos;s a link to my LinkedIn
      </a>
    </main>
  );
}
