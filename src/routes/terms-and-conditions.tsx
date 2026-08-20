import { createFileRoute, Link } from "@tanstack/react-router";
import LegalPageShell, { LEGAL_CONTACT, LegalSection, LegalSubSection } from "@/components/legal/LegalPageShell";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Ace Book Publishers" },
      {
        name: "description",
        content: "Terms and conditions for using Ace Book Publishers website and publishing services.",
      },
      { property: "og:title", content: "Terms and Conditions — Ace Book Publishers" },
    ],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  const { email, phoneDisplay, phoneTel, company } = LEGAL_CONTACT;

  return (
    <LegalPageShell title="Terms and Conditions" crumb="Terms & Conditions" lastUpdated="April 1, 2026" formSource="terms_page">
      <section className="mb-10 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p>
          Your use of this website and our services constitutes your agreement to these terms and conditions. If you do not
          agree, please do not use this website or our services.
        </p>
        <p>
          If you are under the legal age of consent in your jurisdiction, you may not use this website or purchase our
          services. By submitting an order or payment, you confirm that you have read, understood, and agree to be bound by
          these terms.
        </p>
      </section>

      <LegalSection title="Definitions">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-ink">&quot;Website&quot;</strong> means all online content on Ace Book Publishers web pages.
          </li>
          <li>
            <strong className="text-ink">&quot;Customer,&quot; &quot;You,&quot; or &quot;Your&quot;</strong> means you and anyone submitting an order on
            your behalf.
          </li>
          <li>
            <strong className="text-ink">&quot;Company,&quot; &quot;We,&quot; or &quot;Our&quot;</strong> means {company}, operating in accordance with
            applicable laws in the United States.
          </li>
          <li>
            <strong className="text-ink">&quot;Product&quot; or &quot;Services&quot;</strong> means publishing, ghostwriting, editing, design,
            marketing, and related services provided by us.
          </li>
          <li>
            <strong className="text-ink">&quot;Order&quot;</strong> means a request to purchase services made via phone, email, chat, or
            website forms, confirmed by payment or written agreement.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Our Services">
        <p>
          By submitting an order and/or payment, you purchase services for your use in accordance with the agreed scope. You
          are responsible for reviewing project requirements, timelines, and deliverables before confirming your order. Service
          specifics may be outlined in proposals, invoices, or written agreements.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          Unless otherwise agreed in writing, creative work remains the property of {company} until full payment is received.
          Upon full payment, ownership of deliverables transfers to you as defined in your service agreement. You represent
          that materials you provide do not infringe third-party rights.
        </p>
      </LegalSection>

      <LegalSection title="Payments and Revisions">
        <p>
          Fees, milestones, and revision limits are defined in your order or proposal. Additional work outside the agreed scope
          may incur extra charges. Timely feedback helps us meet delivery schedules; delays caused by the client may affect
          timelines.
        </p>
      </LegalSection>

      <LegalSection title="Refund Policy">
        <p>
          Refunds are governed by our separate{" "}
          <Link to="/refund-policy" className="text-brand hover:underline">
            Refund Policy
          </Link>
          . Please review it carefully before placing an order.
        </p>
      </LegalSection>

      <LegalSection title="Email and Mobile Phone Policy">
        <LegalSubSection title="Consent">
          <p>
            By providing your email address and/or mobile number, you consent to receive communications related to your
            inquiry, project updates, service delivery, and promotional messages where permitted by law.
          </p>
        </LegalSubSection>
        <LegalSubSection title="Carrier charges">
          <p>Standard messaging and data rates may apply. Contact your mobile carrier for details.</p>
        </LegalSubSection>
        <LegalSubSection title="Unsubscribe">
          <p>
            Click unsubscribe in our emails or reply STOP to SMS messages to opt out. You may also contact{" "}
            <a href={`mailto:${email}`} className="text-brand hover:underline">
              {email}
            </a>
            .
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, {company} shall not be liable for indirect, incidental, special, or
          consequential damages arising from use of our website or services. Our total liability for any claim shall not exceed
          the amount paid for the specific service giving rise to the claim.
        </p>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <p>
          We may update these Terms and Conditions at any time. Changes take effect when posted on this page. Continued use of
          our website or services after changes constitutes acceptance of the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          For questions about these Terms and Conditions, contact us at{" "}
          <a href={`mailto:${email}`} className="text-brand hover:underline">
            {email}
          </a>
          ,{" "}
          <a href={`tel:${phoneTel}`} className="text-brand hover:underline">
            {phoneDisplay}
          </a>
          , or via our{" "}
          <Link to="/contact" className="text-brand hover:underline">
            Contact
          </Link>{" "}
          page.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
