import { createFileRoute, Link } from "@tanstack/react-router";
import LegalPageShell, { LEGAL_CONTACT, LegalSection, LegalSubSection } from "@/components/legal/LegalPageShell";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ace Book Publishers" },
      {
        name: "description",
        content: "Read how Ace Book Publishers collects, uses, and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — Ace Book Publishers" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const { email, phoneDisplay, phoneTel } = LEGAL_CONTACT;

  return (
    <LegalPageShell title="Privacy Policy" crumb="Privacy Policy" lastUpdated="April 1, 2026" formSource="privacy_policy">
      <LegalSection title="Introduction">
        <p>
          At Ace Book Publishers, we are committed to protecting your privacy and handling your personal information in a
          safe and responsible manner. This Privacy Policy explains how we collect, use, store, and share information when
          you visit our website, submit inquiry forms, communicate with our team, or use our publishing services.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <LegalSubSection title="Personal information">
          <p>
            When you contact us, request a quote, or place an order, we may collect your name, email address, phone number,
            mailing address, project details, manuscript information, and other details you choose to provide.
          </p>
        </LegalSubSection>
        <LegalSubSection title="Usage and technical data">
          <p>
            We may automatically collect information such as IP address, browser type, device information, pages visited,
            referral URLs, and interactions with our website and communications.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <ul className="list-disc space-y-2 pl-6">
          <li>To respond to inquiries and provide publishing, writing, editing, design, and marketing services.</li>
          <li>To send project updates, service notifications, and promotional communications you have opted into.</li>
          <li>To improve our website, customer experience, and service quality.</li>
          <li>To comply with legal obligations and protect our rights, users, and business.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Sharing Your Information">
        <p>
          We do not sell your personal information. We may share data with trusted service providers who assist with hosting,
          email delivery, payment processing, analytics, or customer support, subject to confidentiality obligations. We may
          also disclose information when required by law or to protect our legal rights.
        </p>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We use reasonable administrative, technical, and organizational safeguards to protect your information. However, no
          method of transmission or storage is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          We retain personal information for as long as needed to fulfill the purposes described in this policy, manage your
          account or project, and comply with legal and contractual requirements.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>
          Depending on your location, you may have the right to access, correct, delete, or restrict processing of your
          personal data. To make a request, contact us at{" "}
          <a href={`mailto:${email}`} className="text-brand hover:underline">
            {email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Consumer Data Safety Measures">
        <p>
          We respect your right to privacy. We do not share your name and contact details with unauthorized third parties.
          Information you provide is used to understand your requirements and improve our services. We follow industry
          standards for consumer data protection.
        </p>
        <p>
          Our representatives are not authorized to collect sensitive payment details over unsolicited channels. Please do not
          share credit card or banking information except through approved payment methods. Project work may be handled by
          qualified production partners under confidentiality agreements.
        </p>
      </LegalSection>

      <LegalSection title="SMS and Email Communications">
        <LegalSubSection title="Opt-in">
          <p>
            By providing your phone number or email and submitting our forms, you may receive project updates, service
            messages, and promotional content in accordance with your preferences and applicable law.
          </p>
        </LegalSubSection>
        <LegalSubSection title="Opt-out">
          <p>
            Reply STOP to any SMS from us to unsubscribe from text messages. Click unsubscribe in our emails or contact{" "}
            <a href={`mailto:${email}`} className="text-brand hover:underline">
              {email}
            </a>{" "}
            to opt out of email communications.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised date. We
          encourage you to review this policy periodically.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          For privacy-related questions, contact Ace Book Publishers at{" "}
          <a href={`mailto:${email}`} className="text-brand hover:underline">
            {email}
          </a>
          ,{" "}
          <a href={`tel:${phoneTel}`} className="text-brand hover:underline">
            {phoneDisplay}
          </a>
          , or through our{" "}
          <Link to="/contact" className="text-brand hover:underline">
            Contact
          </Link>{" "}
          page.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
