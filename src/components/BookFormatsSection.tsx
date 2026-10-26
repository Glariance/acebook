import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import formatsBg from "@/assets/bdgnaufw-deco.png";
import ebooksImg from "@/assets/ebooks.jpg";
import pictureBooksImg from "@/assets/picture-books.jpg";
import magazinesImg from "@/assets/magazines.jpg";
import bookCoverFeature from "@/assets/book-cover-feature.jpg";

const formats = [
  {
    name: "Marketing Strategies",
    desc: "Promote your ebook to the right audience with our smart book marketing services. We study the market trends to give your ebook a better exposure.",
    image: ebooksImg,
    imageClassName: "scale-[2.15] object-[50%_46%]",
  },
  {
    name: "SEO Services",
    desc: "Get your ebook discovered with our professional SEO services. Our advanced strategies help get higher search rankings so your readers can find you.",
    image: magazinesImg,
  },
  {
    name: "Promotional Campaigns",
    desc: "Enhance your book's presence with our all-in-one promotion campaigns. We handle all marketing activities, including social media, email campaigns, PR, and more.",
    image: pictureBooksImg,
  },
  {
    name: "Analytics and Reporting",
    desc: "Monitor your ebook performance with our analytics and reporting. Get data on sales, ranking, trends and marketing effectiveness to make better decisions.",
    image: bookCoverFeature,
  },
];

export default function BookFormatsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => window.clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-cream py-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[min(38vw,400px)] overflow-hidden opacity-45 md:block"
      >
        <img
          src={formatsBg}
          alt=""
          className="h-[calc(100%+4rem)] w-full object-cover object-left animate-formats-bg-float"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 md:pl-[min(38vw,400px)]">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,280px)_1fr] md:gap-10 lg:gap-12">
          <div data-reveal>
            <h2 className="section-title">We Are Your Trusted Book Marketing Company</h2>
            <p className="body-copy mt-3">
              Market with a self publishing company that handles the details while you write.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                aria-label="Previous format"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                className="grid h-12 w-12 place-items-center rounded-full bg-cream-deep text-brand transition hover:bg-brand-soft hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next format"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div data-reveal className="min-w-0 pt-14 sm:pt-16 [overflow-x:clip] [overflow-y:visible]" ref={emblaRef}>
            <div className="flex touch-pan-y items-stretch gap-4 pb-2 lg:gap-5">
              {formats.map((f) => (
                <article
                  key={f.name}
                  className="flex min-w-0 shrink-0 basis-[78%] sm:basis-[calc(50%-0.5rem)] md:basis-[calc(33.333%-0.84rem)]"
                >
                  <div className="relative flex h-full w-full flex-col overflow-visible rounded-xl bg-white px-4 pb-5 pt-[4.75rem] text-center shadow-md ring-1 ring-black/5 sm:px-5 sm:pb-6 sm:pt-[5.25rem]">
                    <div className="absolute inset-x-4 top-0 -translate-y-1/2 overflow-hidden rounded-2xl shadow-sm sm:inset-x-5">
                      <img
                        src={f.image}
                        alt={f.name}
                        className={cn(
                          "block h-32 w-full rounded-2xl object-cover object-center sm:h-36",
                          f.imageClassName,
                        )}
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-base font-bold">{f.name}</h3>
                    <p className="body-copy mt-2 min-h-[4.875rem]">{f.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
