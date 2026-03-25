"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 px-6 pt-8 pb-8 pointer-events-none"
      style={{
        background: "linear-gradient(to bottom, black 0%, transparent 80%)",
      }}
    >
      <div className="flex items-center justify-between pointer-events-auto">
        <Link href="/" className="text-lg font-bold uppercase text-white">
          Eyal Mordechai
        </Link>
        <button
          className="flex justify-center flex-col gap-1.5 cursor-pointer"
          aria-label="Menu"
        >
          <span className="block w-6 h-px bg-white" />
          <span className="block w-6 h-px bg-white" />
          <span className="block w-4 h-px bg-white" />
        </button>
      </div>
    </div>
  );
}
