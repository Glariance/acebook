import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import servicesBg from "@/assets/nfadlsf.png";
import servicesDeco from "@/assets/bdgnaufw.png";
import ServicesAccordion from "@/components/ServicesAccordion";

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <img
        src={servicesBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-cream/25" />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] z-0 h-[min(72vw,540px)] w-[min(72vw,540px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-95 sm:top-[55%] md:h-[min(58vw,500px)] md:w-[min(58vw,500px)]"
      >
        <img
          src={servicesDeco}
          alt=""
          className="h-[calc(100%+4rem)] w-full object-contain object-center animate-formats-bg-float"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p data-reveal className="section-eyebrow">Explore our Affordable Service Packages</p>
            <h2 data-reveal className="section-title mt-2">Our Services</h2>
            <p data-reveal className="body-copy mt-3 max-w-xl">
              Experience quality features and services up to trendy markets without sacrificing quality. Find the ideal solution tailored to your needs today.
            </p>
          </div>
          <Link to="/services" data-reveal className="btn-primary">
            View All Services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div data-reveal className="mt-8">
          <ServicesAccordion />
        </div>
      </div>
    </section>
  );
}
