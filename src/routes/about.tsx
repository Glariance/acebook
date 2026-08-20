import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initScrollReveal } from "@/lib/gsap-scroll-reveal";
import ChatWithUsButton from "@/components/ChatWithUsButton";
import { ArrowUpRight, BookOpen, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import GetStartedButton from "@/components/GetStartedButton";
import DecoCircle from "@/components/DecoCircle";
import aboutVoiceImage from "@/assets/Your Voice-Our Words Your Ideas Can Be Your Next Bestseller!.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ace Book Publishers" },
      { name: "description", content: "Learn about Ace Book Publishers — our story, process and why authors trust us to publish their work." },
      { property: "og:title", content: "About — Ace Book Publishers" },
      { property: "og:description", content: "Our story, process, and the team behind Ace Book Publishers." },
    ],
  }),
  component: About,
});

const stats = [
  { n: "12+", l: "Years of experience" },
  { n: "18k", l: "Books Written" },
  { n: "450+", l: "Books Internationally Acclaimed" },
  { n: "750+", l: "Native Writers" },
];

const steps = [
  { n: "01", t: "Order Placement", d: "Tell us what you need, and we get started on bringing your vision to life." },
  { n: "02", t: "Creating Outline", d: "We draw out a plan based on your requirements to ensure we're on the same page." },
  { n: "03", t: "Seeking Your Approval", d: "We value your opinion! Before proceeding, we make changes in light of your feedback." },
  { n: "04", t: "Fast Delivery", d: "Once approved, we quickly deliver your project, making sure it reaches you in no time." },
];

function About() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      initScrollReveal(root.current);
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.counter || "0");
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-dvh">
      <Navbar />
      <PageHero title="About" crumb="About" />

      {/* Voice section */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_520px] lg:grid-cols-[1fr_560px]">
          <div data-reveal>
            <p className="section-eyebrow">About Us</p>
            <h2 className="mt-2 section-title">Your Voice—Our Words<br />Your Ideas Can Be Your<br />Next Bestseller!</h2>
            <div className="body-copy mt-5 space-y-4">
              <p>At Ace Book Publishers, we partner with authors at every stage of the publishing journey. From the first spark of an idea to a polished, market-ready book, our team is committed to elevating your voice with care, craft and strategy.</p>
              <p>Our editors, designers and marketers bring decades of combined experience helping debut and established authors find their readers across genres and formats.</p>
              <p>Whether you're writing memoir, fiction, business or children's books, we tailor every engagement to your goals and timeline — so the experience feels as personal as the story you're telling.</p>
            </div>
          </div>
          <div data-reveal className="relative w-full max-w-xl justify-self-center drop-shadow-[0_24px_48px_rgba(0,0,0,0.25)] sm:max-w-2xl md:max-w-none md:justify-self-end">
            <img
              src={aboutVoiceImage}
              alt="Your voice, our words — your ideas can be your next bestseller"
              className="block h-auto w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-cream-deep py-20">
        <DecoCircle variant="solid" className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand opacity-90" />
        <DecoCircle variant="ring" className="absolute -right-12 top-10 h-48 w-48 rounded-full border-[20px] border-brand opacity-70" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div data-reveal>
              <p className="section-eyebrow">Let Our</p>
              <h2 className="mt-2 section-title">Check out Our In-Depth<br />Process!</h2>
            </div>
            <p data-reveal className="body-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div data-reveal className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <p className="text-3xl font-black text-brand md:text-4xl" data-counter={s.n.replace(/\D/g, "")} data-suffix={s.n.replace(/[\d.]/g, "")}>{s.n}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <GetStartedButton />
            <ChatWithUsButton />
          </div>
        </div>
      </section>

      {/* Video preview */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div data-reveal className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
            <div className="absolute inset-0 grid place-items-center">
              <button aria-label="Play preview" className="grid h-16 w-16 place-items-center rounded-full bg-white/90 transition hover:scale-110"><Play className="h-7 w-7 text-brand" /></button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/80">When something falls from the sky… everyone believes</div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div data-reveal>
              <p className="section-eyebrow">Get Your</p>
              <h2 className="mt-2 section-title">Check out Our In-Depth<br />Process!</h2>
            </div>
            <p data-reveal className="body-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div data-reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <article key={s.n} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-brand text-white"><BookOpen className="h-5 w-5" /></span>
                  <span className="text-2xl font-black text-brand">{s.n}</span>
                </div>
                <h3 className="mt-4 font-bold">{s.t}</h3>
                <p className="body-copy mt-1">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
      <Testimonials />
      <Footer />
    </div>
  );
}
