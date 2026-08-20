import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REVEAL_TRIGGER = {
  start: "top 85%",
  end: "bottom 15%",
  toggleActions: "play reverse play reverse",
} as const;

/** Slide in on enter, slide out when the section leaves the viewport. */
export function initScrollReveal(scope?: ParentNode | null) {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);
  const queryRoot = scope ?? document;

  gsap.utils.toArray<HTMLElement>("[data-reveal]", queryRoot).forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
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
        scrollTrigger: {
          trigger: wrap,
          ...REVEAL_TRIGGER,
        },
      },
    );
  });
}
