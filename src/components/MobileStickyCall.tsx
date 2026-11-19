import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouterState } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/constants/contact";

export default function MobileStickyCall() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname.startsWith("/inquiry-details")) return null;

  return createPortal(
    <a
      href={`tel:${SITE_PHONE_TEL}`}
      className="fixed bottom-4 left-4 z-[60] inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:hidden motion-reduce:transition-none"
      aria-label={`Call us at ${SITE_PHONE_DISPLAY}`}
    >
      <Phone className="h-4 w-4" aria-hidden />
      Call
    </a>,
    document.body,
  );
}
