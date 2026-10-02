import { serviceMenuLinks } from "@/data/services-menu";

const INDEXABLE_ROUTES = new Set([
  "/",
  "/about-us",
  "/contact-us",
  "/services",
  "/portfolio",
  "/testimonials",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-policy",
  ...serviceMenuLinks.map((s) => `/${s.slug}`),
]);

const NOINDEX_ROUTES = new Set(["/thank-you", "/inquiry-details"]);

/** Exact document titles for SEO (override the default "Label — Ace Book Publishers" pattern). */
const ROUTE_TITLES: Record<string, string> = {
  "/": "Publish Your Book & Book Marketing Services | Ace Book Publishers",
  "/book-publishing": "Book Publishing Services | Self Publishing a Book",
  "/kdp-publishing": "KDP Book Publishing | Amazon Kindle Direct Publishing",
  "/book-marketing": "Book Marketing Services | Book Marketing Agency",
  "/book-editing": "Best Book Editing Services | Professional Book Editors",
  "/ghostwriting": "Best Ghostwriting Services | Hire a Ghostwriter",
  "/book-cover-design": "Professional Book Cover Design Services | Custom Book Cover",
  "/childrens-book": "Best Children's Book Publishers | Children's Book Services",
  "/christian-book": "Top Christian Book Publishers | Christian Book Publishing Company",
  "/audiobook": "Audiobook Publishing Services | Professional Audiobook Publisher",
};

export function normalizeRoutePathname(pathname: string): string {
  const raw = pathname === "" ? "/" : pathname;
  const withoutQuery = raw.split("?")[0]?.split("#")[0] ?? "/";
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

export function isRegisteredRoute(pathname: string): boolean {
  const normalized = normalizeRoutePathname(pathname);
  if (INDEXABLE_ROUTES.has(normalized)) return true;
  if (NOINDEX_ROUTES.has(normalized)) return true;
  if (normalized.startsWith("/inquiry-details/")) return true;
  return false;
}

export function routePageLabel(pathname: string): string {
  const normalized = normalizeRoutePathname(pathname);
  const labels: Record<string, string> = {
    "/": "Home",
    "/about-us": "About",
    "/contact-us": "Contact",
    "/services": "Services",
    "/portfolio": "Portfolio",
    "/testimonials": "Testimonials",
    "/thank-you": "Thank You",
    "/inquiry-details": "Inquiry Details",
    "/privacy-policy": "Privacy Policy",
    "/terms-and-conditions": "Terms and Conditions",
    "/refund-policy": "Refund Policy",
  };
  if (labels[normalized]) return labels[normalized];
  const service = serviceMenuLinks.find((s) => `/${s.slug}` === normalized);
  if (service) return service.label;
  if (normalized.startsWith("/inquiry-details/")) return "Inquiry Record";
  return "Page Not Found";
}

export function buildDocumentTitle(pathname: string): string {
  const normalized = normalizeRoutePathname(pathname);
  if (ROUTE_TITLES[normalized]) return ROUTE_TITLES[normalized];
  const label = routePageLabel(normalized);
  return `${label} — Ace Book Publishers`;
}
