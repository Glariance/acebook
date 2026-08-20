import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { serviceMenuLinks, servicePath } from "@/data/services-menu";

const HOVER_CLOSE_DELAY = 180;
const MENU_WIDTH = "min(100vw - 2rem, 32rem)";

type ServicesMegaMenuDesktopProps = {
  scrolled?: boolean;
};

export function ServicesMegaMenuDesktop({ scrolled = false }: ServicesMegaMenuDesktopProps) {
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const [menuLeft, setMenuLeft] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const setMenuOpen = useCallback((next: boolean) => {
    setOpen(next);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuTop(rect.bottom + 12);
    setMenuLeft(rect.left + rect.width / 2);
  }, []);

  const handleOpen = useCallback(() => {
    clearCloseTimer();
    updatePosition();
    setMenuOpen(true);
  }, [clearCloseTimer, setMenuOpen, updatePosition]);

  const handleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setMenuOpen(false), HOVER_CLOSE_DELAY);
  }, [clearCloseTimer, setMenuOpen]);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  const menuPanel = open ? (
    <div
      className="fixed z-[99999]"
      style={{
        top: menuTop,
        left: menuLeft,
        width: MENU_WIDTH,
        transform: "translateX(-50%)",
      }}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      <div
        className="overflow-hidden rounded-2xl border-2 border-brand/30 shadow-[0_24px_60px_-12px_rgb(0_0_0/0.55)]"
        style={{ backgroundColor: "#FDEFE0" }}
      >
        <div className="bg-brand px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-widest text-white">Our Services</p>
        </div>
        <ul
          className="grid grid-cols-1 gap-0.5 p-2 sm:grid-cols-2"
          style={{ backgroundColor: "#FDEFE0" }}
        >
          {serviceMenuLinks.map((item) => (
            <li key={item.slug}>
              <Link
                to={servicePath(item.slug)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#F0DFCF] hover:text-brand [&.active]:bg-[#EBD4BE] [&.active]:text-brand"
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="border-t border-brand/25 px-4 py-3"
          style={{ backgroundColor: "#FDEFE0" }}
        >
          <Link
            to="/services"
            className="text-xs font-bold text-brand transition hover:text-brand-deep"
          >
            View all services →
          </Link>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) handleClose();
      }}
    >
      <Link
        to="/services"
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium transition",
          scrolled
            ? "text-[#E76518] hover:opacity-80 [&.active]:text-[#E76518] [&.active]:underline [&.active]:decoration-[#E76518] [&.active]:decoration-2 [&.active]:underline-offset-8"
            : "text-white/95 drop-shadow-[0_1px_2px_rgb(0_0_0/0.35)] hover:text-brand [&.active]:text-white [&.active]:underline [&.active]:decoration-brand [&.active]:decoration-2 [&.active]:underline-offset-8",
        )}
        activeOptions={{ exact: false }}
      >
        Services
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
          aria-hidden
        />
      </Link>

      {typeof document !== "undefined" && menuPanel ? createPortal(menuPanel, document.body) : null}
    </div>
  );
}

export function ServicesMegaMenuMobile({
  open,
  scrolled = false,
  onNavigate,
}: {
  open: boolean;
  scrolled?: boolean;
  onNavigate: () => void;
}) {
  return (
    <li>
      <Link
        to="/services"
        onClick={onNavigate}
        className={cn(
          "block py-2 text-sm font-semibold",
          scrolled ? "text-[#E76518]" : "text-white",
        )}
      >
        Services
      </Link>
      {open && (
        <ul
          className="mb-1 ml-3 space-y-0.5 rounded-lg border border-brand/20 p-2"
          style={{ backgroundColor: "#FDEFE0" }}
        >
          {serviceMenuLinks.map((item) => (
            <li key={item.slug}>
              <Link
                to={servicePath(item.slug)}
                onClick={onNavigate}
                className="block rounded-md px-2 py-1.5 text-sm font-medium text-ink transition hover:bg-[#F0DFCF] hover:text-brand"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
