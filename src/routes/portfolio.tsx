import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { initScrollReveal } from "@/lib/gsap-scroll-reveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Ace Book Publishers" },
      { name: "description", content: "Selected book covers, illustrations, author websites, video trailers and audiobooks by Ace Book Publishers." },
      { property: "og:title", content: "Portfolio — Ace Book Publishers" },
      { property: "og:description", content: "A showcase of recent author projects." },
    ],
  }),
  component: Portfolio,
});

const tabs = ["All", "Book Cover Design", "Book Illustration", "Author Website Design", "Video Book Trailer", "Audio Books"];
const titles = [
  { t: "The Widow", s: "The Bestselling Thriller", a: "by Martin Bates", from: "#7a1f1f", to: "#1a0808" },
  { t: "Cleopatra", s: "", a: "Gerry Winston", from: "#1a2540", to: "#0a0e1f" },
  { t: "Destination Moon", s: "", a: "Jane H. Doe", from: "#8a3a1f", to: "#3a0f08" },
  { t: "Warrior", s: "", a: "Gerry Winston", from: "#a02818", to: "#1a0a08" },
  { t: "The Spanish World", s: "", a: "Drew Adam", from: "#2a8aa0", to: "#a05a2a" },
  { t: "Treasures Underneath", s: "", a: "Gerry Winston", from: "#1a4a6a", to: "#0a1a2a" },
];

function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState("All");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      initScrollReveal(root.current);
    }, root);
    return () => ctx.revert();
  }, [tab]);

  const grid = Array.from({ length: 16 }).map((_, i) => titles[i % titles.length]);

  return (
    <div ref={root} className="min-h-dvh">
      <Navbar />
      <PageHero title="Portfolio" crumb="Portfolio" />
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 data-reveal className="section-title">Portfolio</h2>
          <div data-reveal className="mt-6 flex flex-wrap justify-center gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-md border px-4 py-2 text-xs font-medium transition ${tab === t ? "border-brand bg-brand text-white" : "border-border bg-cream text-foreground hover:border-brand"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div data-reveal className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {grid.map((b, i) => (
              <article key={i} className="group relative aspect-[3/4] overflow-hidden rounded-md shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
                <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${b.from}, ${b.to})` }} />
                <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-80">{b.s}</p>
                    <h3 className="mt-1 font-serif text-2xl font-black leading-tight">{b.t}</h3>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest opacity-80">{b.a}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            <button aria-label="Previous" className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white"><ChevronLeft className="h-4 w-4" /></button>
            {[1, 2, 3].map((n) => (
              <button key={n} className={`h-9 w-9 rounded-md text-sm font-semibold ${n === 1 ? "bg-brand text-white" : "bg-cream"}`}>{n}</button>
            ))}
            <button aria-label="Next" className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
      <CtaBanner />
      <Testimonials />
      <Footer />
    </div>
  );
}
