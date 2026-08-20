import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getInquiryReturnPath } from "@/hooks/useInquirySubmit";

function sanitizeReturnPath(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value === "/thank-you") {
    return getInquiryReturnPath();
  }
  return value;
}

export const Route = createFileRoute("/thank-you")({
  validateSearch: (search: Record<string, unknown>) => ({
    from: typeof search.from === "string" ? search.from : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Thank You — Ace Book Publishers" },
      { name: "description", content: "Thank you for contacting Ace Book Publishers. Our team will be in touch shortly." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const navigate = useNavigate();
  const { from } = Route.useSearch();
  const returnPath = sanitizeReturnPath(from);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate({ href: returnPath });
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [navigate, returnPath]);

  return (
    <div className="min-h-dvh bg-cream">
      <Navbar />
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-24 sm:px-6">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] ring-1 ring-border/50 md:p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand">
            <CheckCircle2 className="h-9 w-9" strokeWidth={2} />
          </div>
          <h1 className="mt-6 section-title text-3xl md:text-4xl">Thank You!</h1>
          <p className="body-copy mx-auto mt-4 max-w-md">
            Your message has been received. A member of our team will reach out within 24 hours to discuss your publishing goals.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Redirecting you back shortly…
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => navigate({ href: returnPath })} className="btn-primary">
              Continue <ArrowUpRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => navigate({ to: "/" })} className="btn-outline">
              Back to Home <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
