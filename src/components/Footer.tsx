import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Star } from "lucide-react";
import logo from "@/assets/logo.png";
import footerDeco from "@/assets/bdgnaufw-deco.png";
import {
  SITE_ADDRESS_LINE1,
  SITE_ADDRESS_LINE2,
  SITE_EMAIL,
  SITE_FACEBOOK_URL,
  SITE_INSTAGRAM_URL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_TRUSTPILOT_URL,
} from "@/constants/contact";
import { serviceMenuLinks, servicePath } from "@/data/services-menu";

const socialLinks = [
  { href: SITE_FACEBOOK_URL, label: "Facebook", Icon: Facebook },
  { href: SITE_INSTAGRAM_URL, label: "Instagram", Icon: Instagram },
  { href: SITE_TRUSTPILOT_URL, label: "Trustpilot reviews", Icon: Star },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[min(54vw,580px)] overflow-hidden opacity-45 md:block"
      >
        <img
          src={footerDeco}
          alt=""
          className="h-full min-h-[400px] w-full animate-footer-deco-float object-cover object-right"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cream/20 to-cream/85" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img
              src={logo}
              alt="Ace Book Publishers"
              width={160}
              height={48}
              className="h-11 w-auto sm:h-12"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="body-copy mt-5 max-w-xs">
            Welcome to our platform! With our premier book publishing services, your work can effortlessly reach a global audience. Our dedicated team supports you at every stage. Join our community of 1,000,000+ authors.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-md bg-brand text-white transition hover:bg-brand-deep"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm">
            <a
              href={SITE_TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand hover:underline"
            >
              Read our reviews on Trustpilot
            </a>
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Quick links</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about-us", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/testimonials", label: "Testimonials" },
              { to: "/blog/", label: "Blog", external: true },
              { to: "/contact-us", label: "Contact Us" },
            ].map((l) => (
              <li key={l.to} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {"external" in l && l.external ? (
                  <a href={l.to} className="hover:text-brand">
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.to} className="hover:text-brand">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {serviceMenuLinks.map((service) => (
              <li key={service.slug} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <Link to={servicePath(service.slug)} className="hover:text-brand">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold">Contact Us</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              <span>
                {SITE_ADDRESS_LINE1},<br />
                {SITE_ADDRESS_LINE2}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <a href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE_DISPLAY}</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                <Mail className="h-3.5 w-3.5" />
              </span>
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 px-4">
        <div className="mx-auto max-w-6xl rounded-t-lg bg-brand py-4 text-center text-xs text-white shadow-md">
          <div className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span aria-hidden className="opacity-60">
              |
            </span>
            <Link to="/terms-and-conditions" className="hover:underline">
              Terms &amp; Conditions
            </Link>
            <span aria-hidden className="opacity-60">
              |
            </span>
            <Link to="/refund-policy" className="hover:underline">
              Refund Policy
            </Link>
          </div>
          Copyright © 2026 <strong>Ace Book Publishers</strong>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
