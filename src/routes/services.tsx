import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { initScrollReveal } from "@/lib/gsap-scroll-reveal";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import { serviceDescriptions, serviceMenuLinks, servicePath } from "@/data/services-menu";
import writer from "@/assets/writer-portrait.jpg";
import bookFeature from "@/assets/book-cover-feature.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ace Book Publishers" },
      { name: "description", content: "Ghostwriting, editing, book marketing, cover design and audiobook services from Ace Book Publishers." },
      { property: "og:title", content: "Services — Ace Book Publishers" },
      { property: "og:description", content: "Ghostwriting, editing, marketing, cover design, audiobook." },
    ],
  }),
  component: Services,
});

const services = serviceMenuLinks.map((service, index) => ({
  t: service.label,
  d: serviceDescriptions[service.slug],
  img: index % 2 === 0 ? writer : bookFeature,
  reverse: index % 2 === 1,
  slug: servicePath(service.slug),
}));

function Services() {
  const root = useRef<HTMLDivElement>(null);
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
      <PageHero title="Services" crumb="Services" />
      <section className="space-y-16 overflow-x-clip py-20">
        {services.map((s) => (
          <div key={s.t} data-reveal className="relative">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className={`grid items-center gap-10 md:grid-cols-2 ${s.reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
                <div className="relative">
                  <div
                    className={`absolute -top-8 -bottom-8 -z-10 hidden rounded-2xl bg-cream md:block ${
                      s.reverse
                        ? "left-[20%] right-[calc(50%-50vw)]"
                        : "right-[20%] left-[calc(50%-50vw)]"
                    }`}
                  />
                  <div className="relative overflow-hidden rounded-xl shadow-md">
                    <img src={s.img} alt={s.t} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black md:text-3xl">{s.t}</h2>
                  <p className="mt-3 body-copy">{s.d}</p>
                  <Link to={s.slug} className="btn-primary mt-5">Learn More <ArrowUpRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <CtaBanner />
      <Testimonials />
      <Footer />
    </div>
  );
}
