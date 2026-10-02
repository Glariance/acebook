import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, type FormEvent } from "react";
import { gsap } from "gsap";
import { ArrowRight, ArrowUpRight, Check, NotebookPen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import GetStartedButton from "@/components/GetStartedButton";
import { SocialRail, ContactRail } from "@/components/SideRails";
import HeroBookSlider from "@/components/HeroBookSlider";
import BookFormatsSection from "@/components/BookFormatsSection";
import ServicesSection from "@/components/ServicesSection";
import TiltedBookShowcase from "@/components/TiltedBookShowcase";
import DecoCircle from "@/components/DecoCircle";
import heroBg from "@/assets/hero-banner.jpg";
import booksCollage from "@/assets/books-collage.jpg";
import bookFeature from "@/assets/book-cover-feature.jpg";
import { initScrollReveal } from "@/lib/gsap-scroll-reveal";
import ChatWithUsButton from "@/components/ChatWithUsButton";
import HeroQuickForm from "@/components/HeroQuickForm";
import { collectInquiryFormErrors, formDataFromEvent } from "@/lib/form-fields";
import { useInquirySubmit } from "@/hooks/useInquirySubmit";
import { showFormErrorToast } from "@/lib/form-toast";
import { buildCanonicalHref } from "@/lib/routeMeta";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "Publish Your Book & Book Marketing Services | Ace Book Publishers";
    const description =
      "Publish and promote your book with Ace Book Publishers. Get professional Book Publishing and Book Marketing services, from editing and design to launch.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: buildCanonicalHref("/") },
      ],
      links: [{ rel: "canonical", href: buildCanonicalHref("/") }],
    };
  },
  component: Home,
});

const processSteps = [
  {
    n: "01",
    t: "Research and Creating Online",
    d: "We conduct in-depth research and develop a detailed outline as the foundation for our outline process. Once an order is placed, our team collaborates closely with clients to fully understand their plot, premise, and concept.",
  },
  {
    n: "02",
    t: "Content Creation From Scratch",
    d: "After you approve our well-researched outline, we will start the content creation procedure. Our talented writers compose your first draft with creativity and precision, and we send drafts for your input or approval.",
  },
  {
    n: "03",
    t: "Review, Edit, and Proofread",
    d: "Ace Book Publishers uses multiple rounds of evaluation, editing, and proofreading to improve your written work. Our specialized staff keeps you updated on content changes during the editing procedure.",
  },
  {
    n: "04",
    t: "Formatting, Design, and Typesetting",
    d: "We format your manuscript quickly after careful editing, proofing, and approval. Our team adds fonts, graphics, front and back covers to ensure a professional outcome.",
  },
];

const whyChooseBullets = [
  "Publication on Multiple Platforms.",
  "Affordable Pricing",
  "Round-the-clock customer service.",
  "Reliable Post-Publication Assistance",
  "Flexible Revisions",
  "Industry-Standard Formatting",
];

const editingBullets = [
  "We fix typos, punctuation mistakes, and syntax errors",
  "Structural feedback on plot, pacing, character development, and narrative arc.",
  "We smooth out clunky sentences",
  "Catch remaining mistakes, punctuation glitches, and layout errors.",
];

function Home() {
  const root = useRef<HTMLDivElement>(null);
  const { submit, isSubmitting } = useInquirySubmit({ formSource: "home_hero" });

  const handleHeroSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-stagger]", { y: 30, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.1 });
      initScrollReveal(root.current);
    }, root);
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="min-h-dvh bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative">
        <SocialRail />
        <ContactRail />
        <div className="relative overflow-hidden rounded-b-[2.5rem]">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={1030}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[oklch(0.16_0.005_60/0.38)]" />
          <DecoCircle variant="glow" banner className="absolute -left-16 -top-10 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />
          <DecoCircle variant="glow" banner className="absolute right-10 top-20 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          <DecoCircle variant="glow" banner centerX className="absolute bottom-0 left-1/2 h-56 w-56 rounded-full bg-brand/20 blur-3xl md:h-72 md:w-72" />
          <DecoCircle variant="ring" banner className="absolute -bottom-10 left-[6%] h-36 w-36 rounded-full border-[16px] border-brand opacity-55 md:h-48 md:w-48 md:border-[20px]" />
          <DecoCircle variant="ring" banner className="absolute right-[14%] top-[15%] h-28 w-28 rounded-full border-[12px] border-white/30 opacity-70 md:h-40 md:w-40 md:border-[16px]" />
          <DecoCircle variant="ring" banner className="absolute -right-8 bottom-[28%] h-32 w-32 rounded-full border-[14px] border-brand opacity-45 md:h-44 md:w-44 md:border-[18px]" />
          <DecoCircle variant="solid" banner className="absolute bottom-[20%] left-[32%] h-14 w-14 rounded-full bg-brand/50 md:h-20 md:w-20" />
          <DecoCircle variant="solid" banner className="absolute left-[10%] top-[38%] h-10 w-10 rounded-full bg-brand/65 md:h-14 md:w-14" />
          <DecoCircle variant="solid" banner className="absolute right-[28%] bottom-[12%] h-8 w-8 rounded-full bg-white/20 md:h-12 md:w-12" />
          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:px-10 sm:pt-40 md:pb-28 md:pt-48">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
            <div className="text-white md:pr-2 lg:pr-4">
              <h1 data-hero-stagger className="text-3xl font-black leading-[1.08] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Your Dream Book Begins Here
              </h1>
              <p data-hero-stagger className="body-copy-light mt-4 max-w-xl text-sm text-white/85 sm:mt-5 sm:text-base md:max-w-xl">
                As readers sift through countless generic titles, our book publishing services present your original work with high quality editing, designing and formatting. Our team guides independent authors with clarity and care. We take the confusion out of the process so you can publish with confidence.
              </p>
              <p data-hero-stagger className="body-copy-light mt-3 max-w-xl text-sm text-white/85 sm:text-base md:max-w-xl">
                Schedule a free consultation today to discuss your book publishing goals.
              </p>
              <div data-hero-stagger className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                <GetStartedButton />
                <ChatWithUsButton className="btn-white" />
              </div>
            </div>
            <form
              data-inquiry-form
              method="post"
              noValidate
              data-hero-stagger
              onSubmit={handleHeroSubmit}
              className="w-full max-w-sm self-start rounded-2xl border border-white/30 bg-white/15 p-5 shadow-2xl backdrop-blur-md sm:max-w-md md:ml-auto md:p-6"
            >
              <h3 className="text-xl font-extrabold leading-tight text-white md:text-2xl">
                Start Your Publishing Journey
              </h3>
              <div className="mt-4 space-y-2.5">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <input name="name" placeholder="Your Name*" className="hero-field" disabled={isSubmitting} />
                  <input name="phone" type="tel" placeholder="Phone*" className="hero-field" disabled={isSubmitting} />
                </div>
                <input name="email" type="email" placeholder="Email*" className="hero-field" disabled={isSubmitting} />
                <input name="service" placeholder="Service" className="hero-field" disabled={isSubmitting} />
              </div>
              <label className="mt-3 flex items-center gap-2.5 text-[11px] leading-relaxed text-white/90 sm:text-xs">
                <input type="checkbox" name="terms" className="size-3.5 shrink-0 accent-brand" disabled={isSubmitting} />
                <span>By Clicking This Checkbox, You Agree To Our Privacy Policy &amp; Terms And Conditions.</span>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 flex w-full items-center justify-between rounded-md bg-brand px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span>{isSubmitting ? "Sending…" : "Get Started"}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-brand">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </form>
            </div>
            <HeroBookSlider />
          </div>
        </div>
      </section>

      {/* Inline contact bar */}
      <div className="relative z-10 bg-cream">
        <div className="relative z-10 mx-auto max-w-5xl -translate-y-1/2 px-4 sm:px-6">
          <HeroQuickForm formSource="home_inline_bar" />
        </div>
      </div>

      <BookFormatsSection />

      {/* ABOUT — Best Book Publishers */}
      <section className="relative overflow-hidden bg-cream-deep py-20">
        <DecoCircle variant="solid" className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-brand" />
        <DecoCircle variant="ring" className="absolute right-0 top-10 h-48 w-48 rounded-full border-[20px] border-brand opacity-70" />
        <DecoCircle variant="solid" className="absolute -right-12 bottom-10 h-40 w-40 rounded-full bg-brand opacity-90" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p data-reveal className="section-eyebrow">We Are The Best Book Publishers</p>
          <h2 data-reveal className="section-title mt-3">
            Eliminate Errors With Our Book Editing Experts
          </h2>
          <p data-reveal className="body-copy mx-auto mt-5 max-w-2xl">
            Hidden typos, awkward sentences, or uneven pacing can sidetrack even great stories. Our editing team carefully checks your draft to fix mistakes, improve the flow, and make sure your writing is ready for publishing. We refine your prose while protecting your unique authorial voice. Get your free sample edit and see how we revamp your drafts.
          </p>
          <ul data-reveal className="mx-auto mt-5 max-w-xl space-y-2 text-left text-sm">
            {editingBullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {b}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-6 flex flex-wrap justify-center gap-3">
            <GetStartedButton />
            <ChatWithUsButton />
          </div>
        </div>
      </section>

      {/* BEST BOOK MARKETING COMPANY */}
      <section className="relative overflow-hidden bg-white py-16">
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p data-reveal className="section-eyebrow">The Best Book Marketing Company</p>
          <h2 data-reveal className="section-title mt-3">Why Your Story Is Safe with Us</h2>
          <p data-reveal className="body-copy mx-auto mt-5 max-w-2xl">
            When you share your draft with us, you are placing your trust, your hard work, and your ideas in our hands. We take that responsibility seriously. Our publishing process is built on strict confidentiality, author-first ownership, and complete professional integrity.
          </p>
          <p data-reveal className="body-copy mx-auto mt-4 max-w-2xl">
            Protect your story with our trusted publishing team.
          </p>
          <div data-reveal className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact-us" className="btn-primary">Contact Us <ArrowUpRight className="h-4 w-4" /></Link>
            <ChatWithUsButton />
          </div>
        </div>
      </section>

      {/* TAKE A STEP */}
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 data-reveal className="section-title">Take a Step Toward Success!</h2>
          <p data-reveal className="body-copy mx-auto mt-3 max-w-xl">
            Get answers to all your inquiries from our support team today.
          </p>
          <div data-reveal className="mt-6 flex flex-wrap justify-center gap-3">
            <GetStartedButton />
            <ChatWithUsButton />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative overflow-hidden bg-white py-20">
        <DecoCircle variant="ring" className="absolute -left-16 top-1/3 h-40 w-40 rounded-full border-[18px] border-brand opacity-60" />
        <DecoCircle variant="solid" className="absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-brand opacity-90" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div data-reveal className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl border-2 border-brand" />
            <img src={bookFeature} alt="Book cover" className="relative rounded-2xl shadow-xl" loading="lazy" />
          </div>
          <div data-reveal>
            <p className="section-eyebrow">Why Choose Us?</p>
            <h2 className="mt-2 section-title">We Have Everything Your Book Needs</h2>
            <p className="body-copy mt-4">
              Telling a fantastic story is only one part of creating a successful book; it also requires expert editing, eye-catching book cover design, smart formatting, and effective marketing. Our team provide entire self publishing services in one place, so you can focus on writing.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {whyChooseBullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {b}
                </li>
              ))}
            </ul>
            <p className="body-copy mt-4">
              Take the next step with a publishing team that supports you 24/7.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GetStartedButton />
              <Link to="/about-us" className="btn-outline">Discover More <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUR RECENT PROJECTS */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p data-reveal className="section-eyebrow">Portfolio</p>
          <h2 data-reveal className="mt-2 section-title">Our Recent Projects</h2>
          <p data-reveal className="body-copy mx-auto mt-3 max-w-2xl">
            Check out our latest work to see why we&apos;re one of the famous book publishers. Our team covers many genres for diverse sectors. We consistently produce high-quality material for you, whether we&apos;re writing engaging stories or performing extensive research.
          </p>
        </div>
        <div className="relative mt-8 w-full overflow-hidden leading-none">
          <img
            src={booksCollage}
            alt="Our works"
            className="block min-h-[260px] w-full object-cover object-center sm:min-h-[320px] md:min-h-[380px]"
            loading="lazy"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[24%] bg-gradient-to-r from-white via-cream/80 to-transparent sm:w-[20%]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[24%] bg-gradient-to-l from-white via-cream/80 to-transparent sm:w-[20%]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream via-cream/90 to-transparent"
          />
        </div>
        <div className="relative z-10 mx-auto -mt-2 max-w-7xl px-4 pt-4 text-center sm:px-6">
          <Link to="/portfolio" className="btn-primary">View All Works <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p data-reveal className="section-eyebrow">Working With</p>
          <h2 data-reveal className="mt-2 section-title">Inside Look At Our Publishing Process</h2>
          <p data-reveal className="body-copy mx-auto mt-3 max-w-2xl">
            Get a glimpse at how our skilled editors, designers, formatter, illustrators, spend days and night to publish your dream book.
          </p>
          <div data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <article key={s.n} className="rounded-xl border border-border/80 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <span className="process-step-icon">
                    <NotebookPen className="h-6 w-6" strokeWidth={2.25} />
                  </span>
                  <span className="process-step-number">{s.n}</span>
                </div>
                <h3 className="mt-4 font-bold">{s.t}</h3>
                <p className="body-copy mt-1">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK WRITING SERVICES */}
      <section className="relative overflow-hidden bg-cream py-20">
        <DecoCircle variant="ring" className="absolute -left-16 top-8 h-44 w-44 rounded-full border-[18px] border-brand opacity-60 md:h-52 md:w-52 md:border-[22px]" />
        <DecoCircle variant="solid" className="absolute left-[8%] bottom-12 h-16 w-16 rounded-full bg-brand/70 md:h-24 md:w-24" />
        <DecoCircle variant="ring" className="absolute -right-12 top-1/4 h-36 w-36 rounded-full border-[14px] border-brand opacity-50 md:h-48 md:w-48 md:border-[18px]" />
        <DecoCircle variant="solid" className="absolute -right-16 bottom-6 h-48 w-48 rounded-full bg-brand opacity-85 md:h-56 md:w-56" />
        <DecoCircle variant="solid" className="absolute right-[38%] top-6 h-10 w-10 rounded-full bg-brand/45 md:h-14 md:w-14" />
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:min-h-[580px]">
          <div data-reveal className="max-w-xl py-4 lg:max-w-lg lg:py-8 xl:max-w-xl">
            <p className="section-eyebrow">Get Your Children Book Published Today</p>
            <h2 className="section-title mt-2">What&apos;s Included in Our Children&apos;s Book Publishing Services</h2>
            <p className="body-copy mt-4 max-w-md">
              Publishing children&apos;s books needs special attention to reading levels, clear visuals, and correct file setup. We offer a full publishing service made just for picture books and kids&apos; stories. We take care of the formatting, illustrations, cover design, and editing work so your book catches the eye of kids, parents, teachers, and librarians.
            </p>
            <ul className="mt-4 max-w-md space-y-2 text-sm">
              {[
                "Child-centric text & age-appropriate editing",
                "Illustration coordination & page layout",
                "Kid-friendly print & digital setup",
                "Global retail & marketplace setup",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact-us" className="btn-primary">Contact Us <ArrowUpRight className="h-4 w-4" /></Link>
              <ChatWithUsButton />
            </div>
          </div>
        </div>
        <div data-reveal className="pointer-events-none relative mt-10 h-[360px] overflow-visible sm:mt-12 sm:h-[440px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[55%] xl:w-1/2">
          <TiltedBookShowcase />
        </div>
      </section>

      <ServicesSection />

      <CtaBanner />
      <Testimonials />
      <Footer />
    </div>
  );
}
