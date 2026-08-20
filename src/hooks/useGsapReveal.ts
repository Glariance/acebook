import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { initScrollReveal } from "@/lib/gsap-scroll-reveal";

export function useGsapReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      initScrollReveal(ref.current);
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}
