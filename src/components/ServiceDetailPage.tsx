import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageSquare, Minus, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { initScrollReveal } from "@/lib/gsap-scroll-reveal";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetailHero from "@/components/ServiceDetailHero";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import TiltedBookShowcase from "@/components/TiltedBookShowcase";
import ChatWithUsButton from "@/components/ChatWithUsButton";
import GetStartedButton from "@/components/GetStartedButton";
import DecoCircle from "@/components/DecoCircle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type ServiceDetailContent = {
  label: string;
  intro: {
    headingLines: string[];
    /** Optional supporting line under the main intro title (smaller than the header). */
    subheading?: string;
    paragraphs: string[];
  };
  about: {
    image: string;
    imageAlt: string;
    heading: string;
    paragraphs: string[];
  };
  procedureSteps: { n: string; icon: LucideIcon; t: string; d: string }[];
  expertise: {
    title: string;
    items: { icon: LucideIcon; t: string; d: string }[];
  };
  highlights: {
    title: string;
    items: { title: string; description: string }[];
  };
  whyUs: {
    heading: string;
    paragraphs: string[];
  };
  benefits: {
    titleLines: string[];
    subtitle: string;
    items: { icon: LucideIcon; t: string; d: string }[];
  };
  maximize: {
    heading: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
    consultationNote: string;
  };
  faqs: { q: string; a: string }[];
  faqAsideText: string;
};

function ServiceCtas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <GetStartedButton />
      <ChatWithUsButton />
    </div>
  );
}

function CtaBannerButtons() {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <Link
        to="/contact"
        className="inline-flex items-center gap-2.5 rounded-lg bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cream"
      >
        Contact Us
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
      <ChatWithUsButton
        className="inline-flex items-center gap-2 rounded-lg border border-white/90 py-1.5 pl-4 pr-1.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
        showIcon
        showArrow={false}
      >
        Chat With Us
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-ink">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </ChatWithUsButton>
    </div>
  );
}

function ServiceFaqSection({
  faqs,
  faqAsideText,
}: {
  faqs: { q: string; a: string }[];
  faqAsideText: string;
}) {
  const [openFaq, setOpenFaq] = useState("item-0");

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p data-reveal className="section-eyebrow text-center">F A Q &apos; S</p>
        <h2 data-reveal className="mt-2 text-center section-title">Frequently Asked Questions</h2>
        <div data-reveal className="mt-10 flex flex-col items-stretch gap-8 md:flex-row md:items-start">
          <div className="min-w-0 flex-1">
            <Accordion
              type="single"
              collapsible
              value={openFaq}
              onValueChange={setOpenFaq}
              className="flex flex-col gap-3"
            >
              {faqs.map((faq, i) => {
                const value = `item-${i}`;
                const isOpen = openFaq === value;

                return (
                  <AccordionItem
                    key={faq.q}
                    value={value}
                    className={cn(
                      "overflow-hidden rounded-xl border border-b-0 shadow-sm transition-colors",
                      isOpen
                        ? "border-brand bg-brand text-white shadow-md"
                        : "border-border/70 bg-white",
                    )}
                  >
                    <AccordionTrigger className="gap-4 px-5 py-4 text-base font-semibold hover:no-underline [&>svg]:hidden">
                      <span className="flex-1 text-left">{faq.q}</span>
                      {isOpen ? (
                        <Minus className="h-5 w-5 shrink-0 text-white" />
                      ) : (
                        <Plus className="h-5 w-5 shrink-0 text-ink" />
                      )}
                    </AccordionTrigger>
                    <AccordionContent
                      className={cn(
                        "px-5 pb-5 text-sm leading-relaxed",
                        isOpen ? "text-white/90" : "body-copy",
                      )}
                    >
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
          <aside className="w-full shrink-0 rounded-xl border border-border/60 bg-cream/40 p-6 text-center shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] md:w-[320px] md:p-8">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-md">
              <MessageSquare className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-lg font-bold">Do You Have More Questions?</h3>
            <p className="body-copy mt-3 text-sm">{faqAsideText}</p>
            <Link to="/contact" className="btn-primary mt-6 w-full justify-center">
              Shoot a Direct Mail <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

type ServiceDetailPageProps = {
  content: ServiceDetailContent;
};

export default function ServiceDetailPage({ content }: ServiceDetailPageProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      initScrollReveal(root.current);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-dvh bg-white">
      <Navbar />
      <ServiceDetailHero title={content.label} crumb={content.label} />

      <section className="relative z-0 -mt-10 bg-white pt-24 pb-16 md:-mt-12 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 data-reveal className="section-title">
            {content.intro.headingLines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          {content.intro.subheading ? (
            <p
              data-reveal
              className="mt-3 text-lg font-semibold text-ink/80 md:text-xl"
            >
              {content.intro.subheading}
            </p>
          ) : null}
          {content.intro.paragraphs.map((paragraph, i) => (
            <p
              key={paragraph}
              data-reveal
              className={cn("body-copy mx-auto max-w-3xl", i === 0 ? "mt-5" : "mt-4")}
            >
              {paragraph}
            </p>
          ))}
          <div data-reveal className="mt-8 flex justify-center">
            <ServiceCtas />
          </div>
        </div>
      </section>

      <section className="relative mt-4 overflow-hidden rounded-t-[2.5rem] bg-cream pt-20 pb-16 md:mt-6 md:pt-24 md:pb-20">
        <DecoCircle
          variant="solid"
          className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-brand md:-right-20 md:-bottom-20 md:h-72 md:w-72"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div data-reveal className="overflow-hidden rounded-2xl">
            <img
              src={content.about.image}
              alt={content.about.imageAlt}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div data-reveal>
            <h2 className="section-title">{content.about.heading}</h2>
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 body-copy">
                {paragraph}
              </p>
            ))}
            <ServiceCtas className="mt-6" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="section-title">Our Work Procedure</h2>
            <ServiceCtas />
          </div>
          <div data-reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {content.procedureSteps.map((step, i) => (
              <article
                key={step.t}
                className={cn(
                  "rounded-xl border border-border/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md",
                  i < 2 ? "lg:col-span-3" : "lg:col-span-2",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="process-step-icon shrink-0">
                      <step.icon className="h-6 w-6" strokeWidth={2.25} />
                    </span>
                    <h3 className="font-bold leading-snug">{step.t}</h3>
                  </div>
                  <span className="process-step-number shrink-0">{step.n}</span>
                </div>
                <p className="body-copy mt-4">{step.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream py-16 md:py-20">
        <DecoCircle
          variant="ring"
          className="absolute -left-28 -top-28 h-80 w-80 rounded-full border-[32px] border-brand opacity-90 md:-left-32 md:-top-32 md:h-96 md:w-96 md:border-[40px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="section-title">{content.expertise.title}</h2>
            <ServiceCtas />
          </div>
          <div data-reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.expertise.items.map((item) => (
              <article
                key={item.t}
                className="rounded-2xl bg-white p-7 text-center shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_-14px_rgba(0,0,0,0.22)]"
              >
                <item.icon className="mx-auto h-10 w-10 text-ink" strokeWidth={1.5} />
                <h3 className="mt-5 text-lg font-bold">{item.t}</h3>
                <p className="body-copy mx-auto mt-3 max-w-xs">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 data-reveal className="section-title">{content.highlights.title}</h2>
          <div data-reveal className="mt-8 space-y-8 text-left">
            {content.highlights.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="body-copy mt-2">{item.description}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-10 flex justify-center">
            <ServiceCtas />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream py-16 md:py-20">
        <DecoCircle
          variant="ring"
          className="absolute -left-28 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border-[36px] border-brand opacity-90 md:-left-32 md:h-[28rem] md:w-[28rem] md:border-[44px]"
        />
        <DecoCircle
          variant="solid"
          className="absolute -right-28 -bottom-24 h-80 w-80 rounded-full bg-brand md:-right-32 md:-bottom-28 md:h-[26rem] md:w-[26rem]"
        />
        <div className="relative grid items-center gap-10 md:grid-cols-2 md:gap-10 lg:gap-12">
          <div data-reveal className="relative min-h-[420px] overflow-x-clip sm:min-h-[500px] lg:min-h-[540px]">
            <TiltedBookShowcase variant="ghostwriting" />
          </div>
          <div data-reveal className="px-4 sm:px-6 md:pr-8 lg:px-10">
            <h2 className="section-title">{content.whyUs.heading}</h2>
            {content.whyUs.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 body-copy first:mt-5 [&+&]:mt-4">
                {paragraph}
              </p>
            ))}
            <ServiceCtas className="mt-8" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-center section-title">
            {content.benefits.titleLines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p data-reveal className="body-copy mx-auto mt-4 max-w-2xl text-center">
            {content.benefits.subtitle}
          </p>
          <div data-reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.benefits.items.map((item) => (
              <article
                key={item.t}
                className="rounded-xl bg-white p-5 text-center shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] ring-1 ring-border/50 transition hover:-translate-y-1 hover:shadow-[0_18px_44px_-14px_rgba(0,0,0,0.22)]"
              >
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand/15 text-brand">
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-3 font-bold text-brand">{item.t}</h3>
                <p className="body-copy mt-2 text-sm">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white">
        <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6">
          <div
            data-reveal
            className="relative -mb-14 overflow-hidden rounded-2xl bg-brand p-8 shadow-[0_24px_56px_-16px_rgba(0,0,0,0.38)] md:-mb-20 md:p-10"
          >
            <div className="grid items-center gap-6 md:grid-cols-2">
              <h3 className="section-title text-white">
                Get Your Free Consultation Today<br />Limited Slots Left!
              </h3>
              <div>
                <p className="text-sm leading-relaxed text-white/90">{content.maximize.consultationNote}</p>
                <CtaBannerButtons />
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-t-[2.5rem] bg-cream pb-16 pt-24 md:pb-20 md:pt-28">
          <DecoCircle
            variant="ring"
            className="absolute -left-28 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border-[36px] border-brand opacity-90 md:-left-32 md:h-[28rem] md:w-[28rem] md:border-[44px]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
            <div data-reveal>
              <h2 className="section-title">{content.maximize.heading}</h2>
              {content.maximize.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 body-copy">
                  {paragraph}
                </p>
              ))}
            </div>
            <div data-reveal className="flex justify-center md:justify-end">
              <img
                src={content.maximize.image}
                alt={content.maximize.imageAlt}
                className="w-full max-w-md object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ServiceFaqSection faqs={content.faqs} faqAsideText={content.faqAsideText} />

      <CtaBanner />
      <Testimonials />
      <Footer />
    </div>
  );
}
