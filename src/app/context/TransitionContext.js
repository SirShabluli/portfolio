"use client";
import { createContext, useContext, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // true on initial load — cleared by first signalReady
  // resolveReady is called by the incoming page when it's ready to be shown
  const resolveReadyRef = useRef(null);

  // Called by TransitionLink — starts loader, navigates, waits for page ready signal
  const navigate = useCallback(
    (href) => {
      if (isLoading) return;
      setIsLoading(true);

      // Give the page a promise it can resolve when ready
      const readyPromise = new Promise((resolve) => {
        resolveReadyRef.current = resolve;
      });

      router.push(href);

      // Wait for page to signal ready, then hide loader
      readyPromise.then(() => {
        // Let the progress bar reach 100% visually before hiding
        setTimeout(() => setIsLoading(false), 300);
      });
    },
    [isLoading, router],
  );

  // Called by usePageReady() inside each page
  const signalReady = useCallback(() => {
    if (resolveReadyRef.current) {
      resolveReadyRef.current();
      resolveReadyRef.current = null;
    }
  }, []);

  return (
    <TransitionContext.Provider value={{ isLoading, navigate, signalReady }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}
