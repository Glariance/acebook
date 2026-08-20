import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { LEGAL_CONTACT } from "@/constants/contact";

export { LEGAL_CONTACT };

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-heading text-xl font-bold text-ink md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">{children}</div>
    </section>
  );
}

export function LegalSubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">{children}</div>
    </div>
  );
}

type LegalPageShellProps = {
  title: string;
  crumb?: string;
  lastUpdated: string;
  formSource?: string;
  children: ReactNode;
};

export default function LegalPageShell({
  title,
  crumb,
  lastUpdated,
  formSource = "legal_page",
  children,
}: LegalPageShellProps) {
  return (
    <div className="min-h-dvh bg-cream">
      <Navbar />
      <PageHero title={title} crumb={crumb ?? title} formSource={formSource} />
      <main className="px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border/40 md:p-10">{children}</div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Questions?{" "}
            <Link to="/contact" className="font-semibold text-brand hover:underline">
              Contact us
            </Link>{" "}
            or email{" "}
            <a href={`mailto:${LEGAL_CONTACT.email}`} className="font-semibold text-brand hover:underline">
              {LEGAL_CONTACT.email}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
