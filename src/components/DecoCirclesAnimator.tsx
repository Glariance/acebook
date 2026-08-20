import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { initDecoCircleAnimations } from "@/lib/gsap-deco-circles";
import { useMounted } from "@/hooks/useMounted";

export default function DecoCirclesAnimator() {
  const { pathname } = useLocation();
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;

    let cleanup = () => {};
    let cancelled = false;
    let frameId = 0;
    let attempts = 0;

    const start = () => {
      if (cancelled) return;

      if (!document.querySelector("[data-deco-circle]")) {
        if (attempts < 24) {
          attempts += 1;
          frameId = requestAnimationFrame(start);
        }
        return;
      }

      cleanup = initDecoCircleAnimations();
    };

    frameId = requestAnimationFrame(start);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      cleanup();
    };
  }, [pathname, mounted]);

  return null;
}
