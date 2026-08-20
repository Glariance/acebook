import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, BookOpen, X } from "lucide-react";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { collectInquiryFormErrors, formDataFromEvent } from "@/lib/form-fields";
import { useInquirySubmit } from "@/hooks/useInquirySubmit";
import { showFormErrorToast } from "@/lib/form-toast";

const services = [
  "Ghostwriting",
  "Book Editing",
  "Book Publishing",
  "Book Marketing",
  "Cover Design",
  "Other",
];

const fieldClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20";

type InquiryFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function InquiryFormDialog({ open, onOpenChange }: InquiryFormDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const { submit, isSubmitting } = useInquirySubmit({
    formSource: "inquiry_modal",
    onSuccess: () => onOpenChange(false),
  });

  const prefersReducedMotion = useCallback(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const setOpenStartState = useCallback(() => {
    if (!panelRef.current) return;
    if (prefersReducedMotion()) return;
    gsap.killTweensOf([panelRef.current, overlayRef.current]);
    gsap.set(panelRef.current, { scale: 0.72, autoAlpha: 0, y: 48, transformOrigin: "center center" });
    if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 0 });
  }, [prefersReducedMotion]);

  const animateOpen = useCallback(() => {
    if (!panelRef.current) return;
    if (prefersReducedMotion()) {
      gsap.set(panelRef.current, { clearProps: "all" });
      if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 1 });
      return;
    }
    setOpenStartState();
    gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.28, ease: "power2.out" });
    gsap.to(panelRef.current, {
      scale: 1,
      autoAlpha: 1,
      y: 0,
      duration: 0.72,
      ease: "back.out(1.8)",
    });
  }, [prefersReducedMotion, setOpenStartState]);

  const animateClose = useCallback(
    (done: () => void) => {
      if (prefersReducedMotion() || !panelRef.current) {
        done();
        return;
      }
      isAnimating.current = true;
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.22, ease: "power2.in" });
      gsap.to(panelRef.current, {
        scale: 0.78,
        autoAlpha: 0,
        y: 36,
        duration: 0.48,
        ease: "back.in(2)",
        onComplete: () => {
          isAnimating.current = false;
          done();
        },
      });
    },
    [prefersReducedMotion],
  );

  const requestClose = useCallback(() => {
    if (isAnimating.current) return;
    animateClose(() => onOpenChange(false));
  }, [animateClose, onOpenChange]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next) {
        onOpenChange(true);
        return;
      }
      requestClose();
    },
    [onOpenChange, requestClose],
  );

  const panelRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (node && open) setOpenStartState();
    },
    [open, setOpenStartState],
  );

  const overlayRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      overlayRef.current = node;
      if (node && open && !prefersReducedMotion()) gsap.set(node, { autoAlpha: 0 });
    },
    [open, prefersReducedMotion],
  );

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let frameId = 0;
    const run = () => {
      if (cancelled) return;
      if (!panelRef.current) {
        frameId = window.requestAnimationFrame(run);
        return;
      }
      animateOpen();
    };
    frameId = window.requestAnimationFrame(run);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      if (panelRef.current) gsap.killTweensOf(panelRef.current);
      if (overlayRef.current) gsap.killTweensOf(overlayRef.current);
    };
  }, [open, animateOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errors = collectInquiryFormErrors(form);
    if (errors.length) {
      await showFormErrorToast(errors);
      return;
    }
    const data = formDataFromEvent(form);
    const ok = await submit(data);
    if (ok) form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay ref={overlayRefCallback} className="!animate-none data-[state=open]:!fade-in-0 data-[state=closed]:!fade-out-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-0 border-0 bg-transparent p-0 shadow-none outline-none sm:max-w-lg",
            "!animate-none",
          )}
          onPointerDownOutside={(e) => {
            e.preventDefault();
            requestClose();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            requestClose();
          }}
        >
          <div ref={panelRefCallback} className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative bg-brand px-6 pb-9 pt-6 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" aria-hidden />
              <div className="pointer-events-none absolute -bottom-14 left-4 h-28 w-28 rounded-full bg-brand-deep/50" aria-hidden />
              <div className="relative flex items-start gap-3.5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="pr-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/75">Free Consultation</p>
                  <h2 className="mt-1 text-xl font-black leading-tight sm:text-2xl">Start Your Publishing Journey</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                    Share your idea with us — our team will respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative -mt-4 rounded-t-2xl bg-white px-6 pb-6 pt-5">
              <form data-inquiry-form method="post" noValidate onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="name" className={fieldClass} placeholder="Your Name*" disabled={isSubmitting} />
                  <input name="phone" type="tel" className={fieldClass} placeholder="Phone*" disabled={isSubmitting} />
                </div>
                <input name="email" type="email" className={fieldClass} placeholder="Email Address*" disabled={isSubmitting} />
                <select
                  name="service"
                  defaultValue=""
                  disabled={isSubmitting}
                  className={cn(fieldClass, "text-muted-foreground [&:valid]:text-ink")}
                >
                  <option value="" disabled>
                    Select a Service
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  rows={3}
                  disabled={isSubmitting}
                  className={cn(fieldClass, "resize-none")}
                  placeholder="Tell us about your book project..."
                />
                <label className="flex items-start gap-2.5 text-[11px] leading-relaxed text-muted-foreground">
                  <input type="checkbox" name="terms" className="mt-0.5 size-3.5 shrink-0 accent-brand" disabled={isSubmitting} />
                  <span>
                    By submitting this form, you agree to our Privacy Policy &amp; Terms and Conditions.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary mt-1 w-full justify-center sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending…" : "Get Started"} <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <DialogPrimitive.Close
            onClick={(e) => {
              e.preventDefault();
              requestClose();
            }}
            className="absolute right-4 top-4 z-10 rounded-sm text-white opacity-90 transition-opacity hover:opacity-100 focus:outline-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
