"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 px-6 pt-4 pb-5 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      >
        <div className="flex items-center justify-between pointer-events-auto">
          <Link href="/" className="text-lg font-bold uppercase text-white">
            Eyal Mordechai
          </Link>
          <button
            className="flex justify-center flex-col gap-1.25 cursor-pointer relative z-60 bg-white p-2.5"
            aria-label="Menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            <motion.span
              className="block w-5 bg-black origin-center"
              style={{ height: "2px" }}
              animate={isOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 bg-black"
              style={{ height: "2px" }}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 bg-black origin-center"
              style={{ height: "2px" }}
              animate={isOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ backgroundColor: "black" }}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-8">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white uppercase font-bold"
                    style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
