import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { initScrollReveal } from "@/lib/gsap-scroll-reveal";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  SITE_ADDRESS_LINE1,
  SITE_ADDRESS_LINE2,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/constants/contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import { collectInquiryFormErrors, formDataFromEvent } from "@/lib/form-fields";
import { useInquirySubmit } from "@/hooks/useInquirySubmit";
import { showFormErrorToast } from "@/lib/form-toast";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — Ace Book Publishers" },
      { name: "description", content: "Get in touch with Ace Book Publishers — email, phone, and our Manhattan office address." },
      { property: "og:title", content: "Contact — Ace Book Publishers" },
      { property: "og:description", content: "Get in touch with our publishing team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const { submit, isSubmitting } = useInquirySubmit({ formSource: "contact_page" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      initScrollReveal(root.current);
    }, root);
    return () => ctx.revert();
  }, []);

  const input =
    "w-full rounded-md border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand disabled:opacity-70";

  return (
    <div ref={root} className="min-h-dvh">
      <Navbar />
      <PageHero title="Contact Us" crumb="Contact Us" formSource="contact_hero" />
      <section className="py-12 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_360px]">
          <form
            data-inquiry-form
            method="post"
            noValidate
            data-reveal
            className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border sm:p-6 md:p-8"
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
              if (ok) form.reset();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="first_name" className={input} placeholder="First Name*" disabled={isSubmitting} />
              <input name="last_name" className={input} placeholder="Last Name*" disabled={isSubmitting} />
              <input name="email" type="email" className={`${input} sm:col-span-2`} placeholder="Email*" disabled={isSubmitting} />
              <input name="phone" type="tel" className={`${input} sm:col-span-2`} placeholder="Phone Number*" disabled={isSubmitting} />
              <textarea
                name="message"
                rows={5}
                className={`${input} sm:col-span-2 resize-none`}
                placeholder="Your Comment..."
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full rounded-md bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending…" : "Submit Now"}
            </button>
          </form>
          <aside data-reveal className="rounded-2xl bg-cream p-6 md:p-8">
            <h3 className="text-2xl font-black">Get In Touch</h3>
            <div className="mt-6 space-y-5 text-sm">
              <div>
                <p className="font-bold">Email:</p>
                <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-brand" />{" "}
                  <a href={`mailto:${SITE_EMAIL}`} className="hover:text-brand">
                    {SITE_EMAIL}
                  </a>
                </p>
              </div>
              <hr />
              <div>
                <p className="font-bold">Phone:</p>
                <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-brand" />{" "}
                  <a href={`tel:${SITE_PHONE_TEL}`} className="hover:text-brand">
                    {SITE_PHONE_DISPLAY}
                  </a>
                </p>
              </div>
              <hr />
              <div>
                <p className="font-bold">Address:</p>
                <p className="mt-1 flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {SITE_ADDRESS_LINE1},
                  <br />
                  {SITE_ADDRESS_LINE2}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div data-reveal className="overflow-hidden rounded-2xl">
            <iframe
              title="Office location"
              src="https://www.google.com/maps?q=100+Church+Street+Manhattan+NY&output=embed"
              className="h-[400px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <CtaBanner />
      <Testimonials />
      <Footer />
    </div>
  );
}
