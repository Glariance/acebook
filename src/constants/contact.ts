export const SITE_COMPANY = "Ace Book Publishers";
export const SITE_EMAIL = "info@acebookpublishers.com";
export const SITE_PHONE_DISPLAY = "(212)-784-6769";
export const SITE_PHONE_TEL = "+12127846769";
export const SITE_ADDRESS_LINE1 = "100 Church Street 8th floor";
export const SITE_ADDRESS_LINE2 = "Manhattan, NY, 10007";
export const SITE_ADDRESS_FULL = `${SITE_ADDRESS_LINE1}, ${SITE_ADDRESS_LINE2}`;

export const SITE_TRUSTPILOT_URL = "https://www.trustpilot.com/review/acebookpublishers.com";
export const SITE_FACEBOOK_URL = "https://www.facebook.com/AceBookPublishersOfficial/";
export const SITE_INSTAGRAM_URL = "https://www.instagram.com/acebookpublishers/";

/** @deprecated Use SITE_* constants directly */
export const LEGAL_CONTACT = {
  email: SITE_EMAIL,
  phoneDisplay: SITE_PHONE_DISPLAY,
  phoneTel: SITE_PHONE_TEL,
  address: SITE_ADDRESS_FULL,
  company: SITE_COMPANY,
} as const;

export const SITE_SOCIAL_LINKS = [
  { label: "Facebook", href: SITE_FACEBOOK_URL },
  { label: "Instagram", href: SITE_INSTAGRAM_URL },
  { label: "Trustpilot", href: SITE_TRUSTPILOT_URL },
] as const;
