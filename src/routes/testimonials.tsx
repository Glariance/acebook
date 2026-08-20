import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { initScrollReveal } from "@/lib/gsap-scroll-reveal";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import { SITE_TRUSTPILOT_URL } from "@/constants/contact";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Ace Book Publishers" },
      { name: "description", content: "Read what authors say about partnering with Ace Book Publishers." },
      { property: "og:title", content: "Testimonials — Ace Book Publishers" },
      { property: "og:description", content: "Authentic reviews from our clients." },
    ],
  }),
  component: TestimonialsPage,
});

const all = [
  "Arilano Doe", "Emma Collins", "James Anderson", "Olivia Bennett",
  "William Carter", "Daniel Walker", "Sophia Mitchell", "Lucas Parker",
  "Amelia Turner", "Charlotte Harris",
];

const quote = "When scoping the project, I feel truly heard to where I think they understand the business just as well as any of us running it. They are able to take that into suggestions beyond.";

function TestimonialsPage() {
  const root = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      initScrollReveal(root.current);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-dvh">
      <Navbar />
      <PageHero title="Testimonials" crumb="Testimonials" />
      <section className="border-b border-border/60 bg-white py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 text-center sm:px-6">
          <p className="text-sm text-muted-foreground">See what authors say about us on Trustpilot</p>
          <a
            href={SITE_TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-9 shrink-0 !px-4 !py-0 text-sm leading-none"
          >
            View Trustpilot Reviews
          </a>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div data-reveal className="grid gap-5 md:grid-cols-2">
            {all.map((name) => (
              <article key={name} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
                <header className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/15 font-bold text-brand">
                    {name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-bold">{name}</h4>
                    <p className="text-xs text-muted-foreground">Customer</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    4.9
                    <div className="flex text-brand">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}</div>
                  </div>
                </header>
                <p className="mt-4 body-copy">&ldquo;{quote}&rdquo;</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            <button aria-label="Previous" onClick={() => setPage((p) => Math.max(1, p - 1))} className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white"><ChevronLeft className="h-4 w-4" /></button>
            {[1, 2, 3].map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`h-9 w-9 rounded-md text-sm font-semibold ${page === n ? "bg-brand text-white" : "bg-cream"}`}>{n}</button>
            ))}
            <button aria-label="Next" onClick={() => setPage((p) => Math.min(3, p + 1))} className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
      <CtaBanner />
      <Testimonials />
      <Footer />
    </div>
  );
}
