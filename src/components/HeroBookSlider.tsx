import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import book1 from "@/assets/1.png";
import book2 from "@/assets/2.png";
import book3 from "@/assets/3.png";
import book4 from "@/assets/4.png";
import book5 from "@/assets/5.png";

const books = [
  { src: book1, alt: "Trauma book cover" },
  { src: book2, alt: "Prophetic Understanding book cover" },
  { src: book3, alt: "The Poker Princess book cover" },
  { src: book4, alt: "Cowboy Girl's Memoir book cover" },
  { src: book5, alt: "Innovation book cover" },
];

export default function HeroBookSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: true,
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
    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);
    return () => window.clearInterval(interval);
  }, [emblaApi]);

  return (
    <div data-hero-stagger className="mt-8 flex w-fit max-w-full items-center gap-2 md:mt-10">
      <div className="min-w-0 overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-2.5">
          {books.map((book) => (
            <div
              key={book.alt}
              className="w-[5.25rem] shrink-0 sm:w-[6rem] md:w-[7rem] lg:w-[7.75rem]"
            >
              <img
                src={book.src}
                alt={book.alt}
                className="aspect-[3/4] w-full rounded-sm object-cover object-center shadow-md ring-1 ring-white/10"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-1.5">
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next books"
          className="grid h-8 w-8 place-items-center rounded-md bg-brand text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous books"
          className="grid h-8 w-8 place-items-center rounded-md border border-white/80 bg-transparent text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
