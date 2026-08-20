import DecoCircle from "@/components/DecoCircle";
import { Link } from "@tanstack/react-router";
import heroBg from "@/assets/hero-books.jpg";
import HeroQuickForm from "@/components/HeroQuickForm";

type ServiceDetailHeroProps = {
  title: string;
  crumb: string;
};

export default function ServiceDetailHero({ title, crumb }: ServiceDetailHeroProps) {
  const formSource = `service_${crumb.toLowerCase().replace(/\s+/g, "_")}`;

  return (
    <section className="relative z-10">
      <div className="relative overflow-hidden rounded-b-[2.5rem]">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[oklch(0.16_0.005_60/0.78)]" />
        <DecoCircle variant="glow" banner className="absolute -left-12 top-8 h-48 w-48 rounded-full bg-brand/25 blur-3xl" />
        <DecoCircle variant="glow" banner className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
        <DecoCircle variant="ring" banner centerY className="absolute -left-16 top-1/2 h-40 w-40 rounded-full border-[18px] border-brand opacity-60" />
        <DecoCircle variant="ring" banner className="absolute -right-20 top-10 h-48 w-48 rounded-full border-[20px] border-brand opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-32 text-center text-white sm:px-6 md:pb-32 md:pt-40">
          <h1 className="text-4xl font-black md:text-6xl">{title}</h1>
          <p className="mt-3 text-sm text-white/80">
            <Link to="/" className="hover:text-brand">Home</Link> <span className="px-1.5 text-brand">›</span> {crumb}
          </p>
        </div>
      </div>
      <div className="relative z-20 mx-auto -mt-8 max-w-5xl px-4 pb-2 sm:px-6">
        <HeroQuickForm formSource={formSource} />
      </div>
    </section>
  );
}
