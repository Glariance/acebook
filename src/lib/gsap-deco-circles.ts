import { gsap } from "gsap";

const animated = new WeakSet<HTMLElement>();

export function initDecoCircleAnimations(scope?: ParentNode | null) {
  if (typeof window === "undefined") return () => {};

  const queryRoot = scope ?? document;
  const circles = gsap.utils
    .toArray<HTMLElement>("[data-deco-circle]", queryRoot)
    .filter((el) => !animated.has(el));

  if (!circles.length) return () => {};

  const ctx = gsap.context(() => {
    circles.forEach((el, i) => {
      animated.add(el);

      const variant = el.dataset.decoCircle || "solid";
      const centeredY = el.hasAttribute("data-deco-center-y");
      const centeredX = el.hasAttribute("data-deco-center-x");
      const isBanner = el.hasAttribute("data-deco-banner");
      const seed = i + 1;
      const amp = isBanner ? 1.5 : 1;

      gsap.set(el, {
        force3D: true,
        ...(centeredY ? { yPercent: -50 } : {}),
        ...(centeredX ? { xPercent: -50 } : {}),
      });

      const float = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });
      const ampX = (28 + (seed % 4) * 14) * amp;
      const ampY = (22 + (seed % 3) * 12) * amp;
      const dur = 3.2 + (seed % 5) * 0.7;

      float
        .to(el, { x: ampX, y: -ampY, duration: dur })
        .to(el, { x: -ampX * 0.7, y: ampY * 0.85, duration: dur * 1.1 })
        .to(el, { x: ampX * 0.35, y: ampY * 0.4, duration: dur * 0.9 })
        .to(el, { x: 0, y: 0, duration: dur });

      if (variant === "ring") {
        gsap.to(el, {
          rotation: seed % 2 === 0 ? "+=360" : "-=360",
          duration: isBanner ? 8 + (seed % 3) * 2 : 10 + (seed % 3) * 3,
          ease: "none",
          repeat: -1,
        });
        gsap.to(el, {
          scale: isBanner ? 1.22 : 1.18,
          duration: 2.8 + (seed % 3) * 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      } else if (variant === "glow") {
        gsap.to(el, {
          scale: isBanner ? 1.45 : 1.35,
          opacity: isBanner ? 0.32 : 0.24,
          duration: 3.5 + (seed % 4),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      } else {
        gsap.to(el, {
          rotation: seed % 2 === 0 ? 30 : -30,
          duration: 4 + (seed % 3),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(el, {
          scale: isBanner ? 1.28 : 1.2,
          duration: 2.4 + (seed % 4) * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });
  }, scope ?? undefined);

  return () => {
    ctx.revert();
    circles.forEach((el) => animated.delete(el));
  };
}
