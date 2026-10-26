import DecoCircle from "@/components/DecoCircle";
import heroBg from "@/assets/hero-books.jpg";
import HeroQuickForm from "@/components/HeroQuickForm";

type PageHeroProps = {
  title: string;
  crumb: string;
  formSource?: string;
};

export default function PageHero({ title, crumb, formSource = "page_hero" }: PageHeroProps) {
  return (
    <section className="relative z-0">
      <div className="relative z-0 overflow-hidden rounded-b-[1.75rem] sm:rounded-b-[2.5rem]">
        <img
          src={heroBg}
          alt=""
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[oklch(0.16_0.005_60/0.78)]" />
        <DecoCircle variant="glow" banner className="absolute -left-12 top-8 hidden h-48 w-48 rounded-full bg-brand/25 blur-3xl md:block" />
        <DecoCircle variant="glow" banner className="absolute -right-10 bottom-0 hidden h-56 w-56 rounded-full bg-brand/20 blur-3xl md:block" />
        <DecoCircle variant="ring" banner centerY className="absolute -left-16 top-1/2 hidden h-40 w-40 rounded-full border-[18px] border-brand opacity-30 md:block" />
        <DecoCircle variant="ring" banner className="absolute -right-20 top-10 hidden h-48 w-48 rounded-full border-[20px] border-brand opacity-30 md:block" />
        <DecoCircle variant="ring" banner className="absolute bottom-8 left-[20%] hidden h-24 w-24 rounded-full border-[12px] border-white/25 opacity-30 md:block md:h-32 md:w-32 md:border-[14px]" />
        <DecoCircle variant="solid" banner className="absolute right-[18%] top-[42%] hidden h-12 w-12 rounded-full bg-brand/35 md:block md:h-16 md:w-16" />
        <div className="relative z-0 mx-auto max-w-6xl px-4 pb-20 pt-28 text-center text-white sm:px-6 sm:pb-24 sm:pt-32 md:pb-32 md:pt-40">
          <h1 className="text-[1.85rem] font-black leading-tight sm:text-4xl md:text-6xl">{title}</h1>
          <p className="mt-3 text-xs text-white/80 sm:text-sm">
            <a href="/" className="hover:text-brand">Home</a> <span className="px-1.5 text-brand">›</span> {crumb}
          </p>
        </div>
      </div>
      <div className="relative z-10 mx-auto -mt-4 max-w-5xl px-4 pb-4 sm:-mt-8 sm:px-6 sm:pb-0">
        <HeroQuickForm formSource={formSource} />
      </div>
    </section>
  );
}
