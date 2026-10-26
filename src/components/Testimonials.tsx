import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import DecoCircle from "@/components/DecoCircle";

const reviews = [
  {
    name: "Arilano Doe",
    role: "Customer",
    quote:
      "Worth every penny—Ace Book Publishers caught structural plot holes I was totally blind to. I hired them for professional development and copy editor for my 85,000-word sci-fi novel, and it was the single best investment of my publishing budget.",
  },
  {
    name: "John Rick",
    role: "Customer",
    quote:
      "Don't design your own cover, hire these guys instead. I initially tried making my own cover, but my Amazon ad impressions were sitting at a dismal 0.2% CTR. I hired Ace Book Publishers and they made the perfect cover for my book.",
  },
  {
    name: "Koa Nash",
    role: "Customer",
    quote:
      "The matte texture feels premium in hand with zero smudge issues. Page margins, headers, and drop caps aligned perfectly across double-page spreads. Ace Book Publishers nailed my children's book printing.",
  },
  {
    name: "August Lee",
    role: "Customer",
    quote:
      "I used to spend days tweaking Word margins, fighting orphaned lines, and dealing with broken table of contents links on Kindle. For my latest novel, I worked with Ace Book Publishers and it saved my time and on top of that, the team quality of work is amazing.",
  },
];

function Card({ r }: { r: typeof reviews[number] }) {
  return (
    <article className="h-full rounded-xl bg-white p-5 shadow-[0_10px_30px_-15px_rgb(0_0_0/0.15)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgb(0_0_0/0.2)]">
      <header className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/15 text-brand font-bold">
          {r.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate font-bold">{r.name}</h4>
          <p className="text-xs text-muted-foreground">{r.role}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
          4.9
          <div className="flex text-brand">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
        </div>
      </header>
      <p className="mt-4 body-copy">&ldquo;{r.quote}&rdquo;</p>
    </article>
  );
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    duration: 35,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
    },
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => window.clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-cream-deep py-12 sm:py-16">
      <DecoCircle variant="solid" className="absolute -left-16 top-0 hidden h-40 w-40 rounded-full bg-brand opacity-30 md:block" />
      <DecoCircle variant="ring" className="absolute -right-20 bottom-10 hidden h-56 w-56 rounded-full border-[24px] border-brand opacity-30 md:block" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <p className="section-eyebrow">What Our Clients Are Saying</p>
            <h2 className="mt-2 section-title">Client Reviews</h2>
            <p className="body-copy mt-3 max-w-xl">
              We have been serving clients around the globe. Our next success story might be yours.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous"
              className="grid h-9 w-9 place-items-center rounded-md bg-brand-soft text-white transition hover:bg-brand"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next"
              className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white transition hover:bg-brand-deep"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-5">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="min-w-0 shrink-0 basis-full md:basis-[calc(50%-0.625rem)]"
              >
                <Card r={r} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
