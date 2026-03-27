"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/" },
  { label: "Resume", href: "/resumé" },
  { label: "Contact", href: "/contact" },
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
            className="fixed text-center inset-0 z-40 flex flex-col justify-start pt-35 px-8"
            style={{ backgroundColor: "black" }}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-6">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + i * 0.07,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white  font-medium leading-[1] text-5xl"
                    // style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4">
              <div className="flex w-full justify-between px-20 pb-4">
                {[
                  { href: "https://linkedin.com/in/eyalmordechai", external: true, d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { href: "https://wa.me/972500000000", external: true, d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" },
                  { href: "mailto:eyal@example.com", external: false, d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" },
                ].map(({ href, external, d }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (LINKS.length + i) * 0.07, duration: 0.3, ease: "easeOut" }}
                  >
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
                      <path d={d} />
                    </svg>
                  </motion.a>
                ))}
              </div>
              <p className="text-sm text-white opacity-40">
                © {new Date().getFullYear()} Eyal Mordechai. All rights
                reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
