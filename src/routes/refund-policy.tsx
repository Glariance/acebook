import { createFileRoute, Link } from "@tanstack/react-router";
import LegalPageShell, { LEGAL_CONTACT, LegalSection } from "@/components/legal/LegalPageShell";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Ace Book Publishers" },
      {
        name: "description",
        content: "Refund and cancellation policy for Ace Book Publishers publishing and author services.",
      },
      { property: "og:title", content: "Refund Policy — Ace Book Publishers" },
    ],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  const { email, phoneDisplay, phoneTel, address, company } = LEGAL_CONTACT;

  return (
    <LegalPageShell title="Refund Policy" crumb="Refund Policy" lastUpdated="April 1, 2026" formSource="refund_policy">
      <section className="mb-10 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p>
          At {company}, we are committed to delivering high-quality publishing, writing, editing, design, and marketing
          services. Every project involves professional time and resources. This Refund &amp; Cancellation Policy explains
          when refunds may be available.
        </p>
      </section>

      <LegalSection title="1. Refund Eligibility">
        <p>Refunds depend on project stage and the type of service ordered.</p>
        <h3 className="mt-6 text-lg font-semibold text-ink">Before project initiation</h3>
        <p className="mt-2">
          If a refund is requested before delivery of any initial drafts, concepts, or materials, a full refund minus a 10%
          administrative fee may be issued.
        </p>
        <h3 className="mt-6 text-lg font-semibold text-ink">After initial delivery</h3>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>Within 48 hours of first draft delivery: up to 66% refund (minus 10% processing fee).</li>
          <li>Between 48 and 120 hours after initial delivery: up to 33% refund (minus 10% processing fee).</li>
          <li>
            After 120 hours: refunds are generally not available; we will work with you on revisions or alternative solutions.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Change of Mind">
        <p>
          If you decide not to continue within the first hour of placing your order, you may request a refund. A processing
          fee may apply to cancellations after work has begun.
        </p>
      </LegalSection>

      <LegalSection title="3. After Approval or Revisions">
        <p>
          Once you approve deliverables or request revisions, the project moves forward and refunds are typically no longer
          available for completed portions of work.
        </p>
      </LegalSection>

      <LegalSection title="4. Completed Projects">
        <p>Refunds do not apply once final files, manuscripts, or published materials have been delivered.</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>For publishing services, no refund applies once the book is submitted for publication or distribution.</li>
          <li>For marketing services, refunds are not available once campaigns are launched or materials are distributed.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Incompetent or Late Delivery">
        <p>
          If deliverables do not meet agreed requirements, contact us promptly. We offer revisions to resolve issues. Refunds
          may be considered only after revision options are exhausted and documented evidence supports a material failure on
          our part. Late delivery caused by client delays does not qualify for a refund.
        </p>
      </LegalSection>

      <LegalSection title="6. Combined or Custom Packages">
        <p>
          For bundled services (e.g., writing + publishing + marketing), refunds apply only to portions that have not yet
          started. Completed components are non-refundable.
        </p>
      </LegalSection>

      <LegalSection title="7. Inactive Orders">
        <p>
          If there is no client response or activity for 30 days, an order may be marked inactive and become ineligible for a
          refund. Reactivation may require an additional fee.
        </p>
      </LegalSection>

      <LegalSection title="8. Refund Time Frame">
        <p>
          Refund requests must be submitted within 30 days of delivery unless otherwise stated in your service agreement.
          Requests after that period may not be entertained.
        </p>
      </LegalSection>

      <LegalSection title="9. How to Request a Refund">
        <p>Submit refund requests in writing to our support team:</p>
        <ul className="mt-3 space-y-2">
          <li>
            <strong className="text-ink">Email:</strong>{" "}
            <a href={`mailto:${email}`} className="text-brand hover:underline">
              {email}
            </a>
          </li>
          <li>
            <strong className="text-ink">Phone:</strong>{" "}
            <a href={`tel:${phoneTel}`} className="text-brand hover:underline">
              {phoneDisplay}
            </a>
          </li>
          <li>
            <strong className="text-ink">Address:</strong> {address}
          </li>
        </ul>
        <p className="mt-4">
          Include your order number, reason for the request, and supporting details. Each request is reviewed individually.
        </p>
      </LegalSection>

      <LegalSection title="10. Ownership">
        <p>
          Creative materials remain the property of {company} until full payment is received. Upon full payment, ownership
          transfers as outlined in your service agreement.
        </p>
      </LegalSection>

      <LegalSection title="11. Related Policies">
        <p>
          See also our{" "}
          <Link to="/terms-and-conditions" className="text-brand hover:underline">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-brand hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
