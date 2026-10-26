import { useEffect, useMemo, useState } from "react";
import book1 from "@/assets/1.jpg";
import book2 from "@/assets/2.jpg";
import book3 from "@/assets/3.jpg";
import book4 from "@/assets/4.jpg";
import book5 from "@/assets/5.jpg";
import book6 from "@/assets/6.jpg";
import { cn } from "@/lib/utils";

/** Row order: Cleopatra → Spanish World → Widow → Treasures → Warrior → Destination Moon */
const covers = [book4, book5, book3, book6, book1, book2];

type TiltedBookShowcaseProps = {
  variant?: "home" | "ghostwriting";
};

function BookTile({ src, variant }: { src: string; variant: "home" | "ghostwriting" }) {
  const isGhostwriting = variant === "ghostwriting";

  if (!isGhostwriting) {
    return (
      <img
        src={src}
        alt=""
        width={222}
        height={265}
        decoding="async"
        className="aspect-[222/265] w-full min-w-[52px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)] mix-blend-lighten sm:min-w-[58px] md:min-w-[64px] lg:min-w-[72px] xl:min-w-[78px]"
        loading="lazy"
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={222}
      height={265}
      decoding="async"
      className="aspect-[222/265] w-full min-w-[64px] object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.28)] sm:min-w-[80px] md:min-w-[90px] lg:min-w-[98px] xl:min-w-[106px]"
      loading="lazy"
    />
  );
}

export default function TiltedBookShowcase({ variant = "home" }: TiltedBookShowcaseProps) {
  const isGhostwriting = variant === "ghostwriting";
  const [tileCount, setTileCount] = useState(8);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setTileCount(mq.matches ? 18 : 8);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const gridItems = useMemo(
    () => Array.from({ length: tileCount }, (_, i) => covers[i % covers.length]),
    [tileCount],
  );

  return (
    <div
      className={
        isGhostwriting
          ? "relative h-full min-h-[320px] w-full overflow-hidden sm:min-h-[420px] sm:overflow-visible md:min-h-[500px] lg:min-h-[540px]"
          : "relative h-full min-h-[280px] w-full overflow-hidden sm:min-h-[360px] sm:overflow-visible md:min-h-[440px] lg:min-h-0 lg:overflow-visible"
      }
    >
      <div
        className={
          isGhostwriting
            ? "absolute inset-y-0 left-0 flex w-[240%] items-center justify-start pr-[30%] sm:w-[230%] sm:pr-[32%] md:w-[220%] md:pr-[34%] lg:w-[210%] lg:pr-[36%]"
            : "absolute inset-y-0 -left-[12%] right-0 flex w-[240%] items-center justify-end sm:w-[220%] md:w-[205%] lg:-left-[8%] lg:w-[195%] xl:w-[185%]"
        }
      >
        <div
          className={cn(
            "grid w-full grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8",
            isGhostwriting
              ? "origin-left gap-1.5 -rotate-[18deg] sm:gap-2 md:gap-2.5"
              : "gap-2 -rotate-[14deg] sm:gap-2.5 md:gap-3",
          )}
        >
          {gridItems.map((src, i) => (
            <BookTile key={i} src={src} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  );
}
