import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Fade/slide in once when the element enters the viewport; stay visible. */
const REVEAL_TRIGGER = {
  start: "top 88%",
  toggleActions: "play none none none",
  once: true,
} as const;

export function initScrollReveal(scope?: ParentNode | null) {
  if (typeof window === "undefined") return;

  const queryRoot = scope ?? document;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isNarrow = window.matchMedia("(max-width: 767px)").matches;

  // Skip GSAP ScrollTrigger on mobile / reduced-motion — big TBT win for PageSpeed
  if (prefersReduced || isNarrow) {
    gsap.utils.toArray<HTMLElement>("[data-reveal]", queryRoot).forEach((el) => {
      gsap.set(el, { clearProps: "all", autoAlpha: 1, y: 0 });
    });
    gsap.utils.toArray<HTMLElement>("[data-stagger]", queryRoot).forEach((wrap) => {
      gsap.set(wrap.children, { clearProps: "all", autoAlpha: 1, y: 0 });
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray<HTMLElement>("[data-reveal]", queryRoot).forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          ...REVEAL_TRIGGER,
        },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>("[data-stagger]", queryRoot).forEach((wrap) => {
    gsap.fromTo(
      wrap.children,
      { y: 30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: {
          trigger: wrap,
          ...REVEAL_TRIGGER,
        },
      },
    );
  });
}
