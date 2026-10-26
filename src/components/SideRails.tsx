import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Facebook, Instagram, Mail, Phone, Star } from "lucide-react";
import {
  SITE_EMAIL,
  SITE_FACEBOOK_URL,
  SITE_INSTAGRAM_URL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_TRUSTPILOT_URL,
} from "@/constants/contact";
import { collectInquiryFormErrors, formDataFromEvent } from "@/lib/form-fields";
import { useInquirySubmit } from "@/hooks/useInquirySubmit";
import { showFormErrorToast } from "@/lib/form-toast";

export function SocialRail() {
  const items = [
    { Icon: Facebook, href: SITE_FACEBOOK_URL, label: "Facebook" },
    { Icon: Instagram, href: SITE_INSTAGRAM_URL, label: "Instagram" },
    { Icon: Star, href: SITE_TRUSTPILOT_URL, label: "Trustpilot reviews" },
  ];
  return (
    <div className="pointer-events-auto fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
      {items.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid h-12 w-12 place-items-center rounded-r-md bg-brand text-white transition hover:bg-brand-deep"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

function RailHoverLink({
  href,
  label,
  text,
  Icon,
}: {
  href: string;
  label: string;
  text: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="group flex items-stretch overflow-hidden rounded-l-md">
      <a
        href={href}
        className="flex h-12 max-w-0 items-center overflow-hidden whitespace-nowrap rounded-l-md bg-brand text-sm font-semibold text-white transition-[max-width,padding] duration-300 ease-in-out group-hover:max-w-56 group-hover:px-3"
      >
        {text}
      </a>
      <a
        href={href}
        aria-label={label}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-l-md bg-brand text-white transition hover:bg-brand-deep"
      >
        <Icon className="h-5 w-5" />
      </a>
    </div>
  );
}

export function ContactRail() {
  const [open, setOpen] = useState(false);
  const { submit, isSubmitting } = useInquirySubmit({ formSource: "side_rail" });

  const input =
    "w-full rounded-md bg-brand-soft px-3 py-2.5 text-sm text-white placeholder:text-white/80 outline-none transition focus:bg-white focus:text-ink focus:placeholder:text-muted-foreground disabled:opacity-70";

  return (
    <div className="pointer-events-auto fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex">
      <RailHoverLink
        href={`mailto:${SITE_EMAIL}`}
        label="Email us"
        text={SITE_EMAIL}
        Icon={Mail}
      />
      <RailHoverLink
        href={`tel:${SITE_PHONE_TEL}`}
        label="Call us"
        text={SITE_PHONE_DISPLAY}
        Icon={Phone}
      />

      <div className={`flex items-stretch overflow-hidden ${open ? "rounded-l-md" : ""}`}>
        <div
          className={`overflow-hidden bg-brand transition-[width] duration-300 ease-in-out ${
            open ? "w-64" : "w-0"
          }`}
          aria-hidden={!open}
        >
          <form
            data-inquiry-form
            method="post"
            noValidate
            className="w-64 p-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const errors = collectInquiryFormErrors(form);
              if (errors.length) {
                await showFormErrorToast(errors);
                return;
              }
              const data = formDataFromEvent(form);
              const ok = await submit(data);
              if (ok) {
                form.reset();
                setOpen(false);
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-bold leading-snug text-white">Start Your Publishing Journey</p>
            <div className="mt-3 grid gap-2">
              <input name="name" className={input} placeholder="Your Name*" disabled={isSubmitting} />
              <input name="phone" type="tel" className={input} placeholder="Phone*" disabled={isSubmitting} />
              <input name="email" type="email" className={input} placeholder="Email*" disabled={isSubmitting} />
              <input name="service" className={input} placeholder="Service" disabled={isSubmitting} />
            </div>
            <label className="mt-3 flex items-start gap-2 text-[10px] leading-relaxed text-white/85">
              <input type="checkbox" name="terms" className="mt-0.5" disabled={isSubmitting} />
              <span>By clicking this checkbox, you agree to our Privacy Policy &amp; Terms and Conditions.</span>
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 flex w-full items-center justify-between rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending…" : "Get Started"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close get started form" : "Open get started form"}
          className={`flex w-12 shrink-0 items-center justify-center self-stretch px-2 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-brand-deep ${
            open ? "bg-brand-deep" : "bg-brand h-32 rounded-l-md"
          }`}
          style={{ writingMode: "vertical-lr" }}
        >
          Let&apos;s Get Started
        </button>
      </div>
    </div>
  );
}
