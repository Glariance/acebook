import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import GetStartedButton from "@/components/GetStartedButton";
import { ServicesMegaMenuDesktop, ServicesMegaMenuMobile } from "@/components/ServicesMegaMenu";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 48;

const links = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/blog/", label: "Blog", external: true },
  { to: "/contact-us", label: "Contact Us" },
] as const;

type NavLink = (typeof links)[number];

function isExternalLink(link: NavLink): link is NavLink & { external: true } {
  return "external" in link && link.external === true;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    gsap.from("[data-nav]", { y: -20, autoAlpha: 0, duration: 0.7, ease: "power3.out" });
  }, []);

  useEffect(() => {
    setScrolled(false);
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const headerSolid = scrolled || open;

  const navLinkClass = cn(
    "text-sm font-medium transition",
    scrolled
      ? "text-[#E76518] hover:opacity-80 [&.active]:text-[#E76518] [&.active]:underline [&.active]:decoration-[#E76518] [&.active]:decoration-2 [&.active]:underline-offset-8"
      : "text-white/95 drop-shadow-[0_1px_2px_rgb(0_0_0/0.35)] hover:text-brand [&.active]:text-white [&.active]:underline [&.active]:decoration-brand [&.active]:decoration-2 [&.active]:underline-offset-8",
  );

  const dividerClass = scrolled ? "px-2 text-[#E76518]/35" : "px-2 text-white/30";

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[9999]">
        <div className="h-5 w-full bg-brand sm:h-6" />
        <div className="px-3 sm:px-6">
          <header
            data-nav
            className={cn(
              "relative mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-3 py-2 pl-4 pr-2 shadow-lg transition-[background,border-color,box-shadow] duration-300",
              headerSolid
                ? "border border-white/40 bg-white/95 shadow-[0_12px_40px_-10px_rgb(0_0_0/0.2)] ring-1 ring-black/5 backdrop-blur-xl"
                : "border border-white/25 bg-white/10 ring-1 ring-white/15 backdrop-blur-xl",
            )}
            style={
              headerSolid
                ? { background: "rgb(255 255 255 / 0.96)" }
                : {
                    background:
                      "linear-gradient(90deg, rgb(255 255 255 / 0.14) 0%, rgb(255 255 255 / 0.22) 55%, rgb(255 255 255 / 0.14) 100%)",
                  }
            }
          >
            <Link to="/" className="flex shrink-0 items-center">
              <img src={logo} alt="Ace Book Publishers" className="h-10 w-auto sm:h-11" />
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {links.slice(0, 2).map((l, i) => (
                <div key={l.to} className="flex items-center">
                  {i > 0 && <span className={dividerClass}>|</span>}
                  <Link
                    to={l.to}
                    className={navLinkClass}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                </div>
              ))}
              <div className="flex items-center">
                <span className={dividerClass}>|</span>
                <ServicesMegaMenuDesktop scrolled={scrolled} />
              </div>
              {links.slice(2).map((l) => (
                <div key={l.to} className="flex items-center">
                  <span className={dividerClass}>|</span>
                  {isExternalLink(l) ? (
                    <a href={l.to} className={navLinkClass}>
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className={navLinkClass} activeOptions={{ exact: false }}>
                      {l.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <GetStartedButton className="hidden shadow-md sm:inline-flex" />
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full transition md:hidden",
                  scrolled
                    ? "text-[#E76518]"
                    : "text-white drop-shadow-[0_1px_2px_rgb(0_0_0/0.35)]",
                )}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </header>
          {open && (
            <nav
              className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/30 px-4 pb-4 shadow-xl backdrop-blur-xl md:hidden"
              style={{ backgroundColor: "#FDEFE0" }}
            >
              <ul className="flex flex-col gap-2 pt-3">
                {links.slice(0, 2).map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm font-medium text-ink hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <ServicesMegaMenuMobile open scrolled={scrolled} onNavigate={() => setOpen(false)} />
                {links.slice(2).map((l) => (
                  <li key={l.to}>
                    {isExternalLink(l) ? (
                      <a
                        href={l.to}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm font-medium text-ink hover:text-brand"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm font-medium text-ink hover:text-brand"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <GetStartedButton className="mt-2 w-full justify-center" onClick={() => setOpen(false)} />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
