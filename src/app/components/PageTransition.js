"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <>
      {children}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="fixed inset-0 z-100 bg-black pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </AnimatePresence>
    </>
  );
}
