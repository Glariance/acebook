import { cn } from "@/lib/utils";

type DecoCircleProps = {
  variant: "glow" | "ring" | "solid";
  banner?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  className?: string;
};

export default function DecoCircle({
  variant,
  banner,
  centerX,
  centerY,
  className,
}: DecoCircleProps) {
  return (
    <div
      data-deco-circle={variant}
      {...(banner ? { "data-deco-banner": true } : {})}
      {...(centerX ? { "data-deco-center-x": true } : {})}
      {...(centerY ? { "data-deco-center-y": true } : {})}
      aria-hidden
      className={cn("pointer-events-none", className)}
    />
  );
}
