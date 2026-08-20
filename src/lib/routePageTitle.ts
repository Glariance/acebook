import { serviceMenuLinks } from "@/data/services-menu";

const INDEXABLE_ROUTES = new Set([
  "/",
  "/about",
  "/contact",
  "/services",
  "/portfolio",
  "/testimonials",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-policy",
  ...serviceMenuLinks.map((s) => `/services/${s.slug}`),
]);

const NOINDEX_ROUTES = new Set(["/thank-you", "/inquiry-details"]);

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
    "/about": "About",
    "/contact": "Contact",
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
  const service = serviceMenuLinks.find((s) => `/services/${s.slug}` === normalized);
  if (service) return service.label;
  if (normalized.startsWith("/inquiry-details/")) return "Inquiry Record";
  return "Page Not Found";
}

export function buildDocumentTitle(pathname: string): string {
  const normalized = normalizeRoutePathname(pathname);
  const label = routePageLabel(normalized);
  if (normalized === "/") {
    return "Ace Book Publishers — Trusted Self-Publishing Platform for Authors";
  }
  return `${label} — Ace Book Publishers`;
}
