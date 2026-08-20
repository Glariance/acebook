import { isRegisteredRoute, normalizeRoutePathname, routePageLabel } from "@/lib/routePageTitle";
import { absoluteSiteUrl, defaultOgImageUrl } from "@/lib/siteOrigin";

const DEFAULT_DESCRIPTION =
  "Ace Book Publishers helps authors write, publish, market, and design books that reach global audiences.";

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  "/":
    "Write, publish, market, and design your book with Ace Book Publishers. Trusted by authors worldwide for professional self-publishing support.",
  "/about":
    "Learn about Ace Book Publishers, our team, and how we support authors from manuscript through publication and marketing.",
  "/contact":
    "Contact Ace Book Publishers for a quote or consultation on publishing, editing, design, and marketing services.",
  "/services":
    "Explore Ace Book Publishers services: ghostwriting, editing, cover design, marketing, children's books, audiobooks, and more.",
  "/portfolio":
    "Browse published titles and author success stories from Ace Book Publishers across genres and formats.",
  "/testimonials":
    "Read what authors say about working with Ace Book Publishers on publishing, editing, and book marketing projects.",
  "/privacy-policy":
    "Learn how Ace Book Publishers collects, uses, and protects your personal information when you use our website and services.",
  "/terms-and-conditions":
    "Terms and conditions governing use of the Ace Book Publishers website and our publishing, writing, and marketing services.",
  "/refund-policy":
    "Refund and cancellation policy for Ace Book Publishers publishing, ghostwriting, editing, design, and marketing services.",
  "/services/book-publishing":
    "Amazon self-publishing services including editing, cover design, formatting, multi-platform publishing, paperback printing, and distribution.",
  "/services/kdp-publishing":
    "Amazon KDP publishing services including editing, formatting, cover design, marketing, royalties guidance, and full publishing support.",
  "/services/apple-book-publishing":
    "Apple Book publishing for self-published authors including editing, formatting, cover design, multi-platform distribution, and royalties support.",
  "/services/barnes-publishing":
    "Barnes and Noble ebook publishing services including editing, formatting, proofreading, cover design, multi-platform distribution, and royalties support.",
  "/services/kobo-book-publishing":
    "Kobo book publishing services including formatting, cover design, Kobo account setup, digital and print formats, and marketing support.",
  "/services/book-marketing":
    "Book marketing services including Amazon marketing, social media promotion, SEO, author websites, flipbook trailers, and custom campaigns.",
  "/services/book-editing":
    "Professional book editing services including copy editing, line editing, proofreading, Amazon book editing, and manuscript formatting.",
  "/services/ghostwriting":
    "Professional ghostwriting services including fiction, non-fiction, memoirs, children's books, unlimited revisions, and full ownership rights.",
  "/services/book-cover-design":
    "Creative book cover design services including unique genre-focused covers, hardboard and paperback designs, revisions, and print-ready files.",
  "/services/childrens-book-publishing":
    "Children's book publishing services including editing, illustration, formatting, Amazon publishing, marketing, and full author support.",
  "/services/christian-book-publishing":
    "Christian book publishing services including faith-based writing, Christian children's books, editing, illustration, self and traditional publishing.",
  "/services/audiobook-book-publishing":
    "Audiobook production and publishing coordination for a polished listener experience and distribution.",
};

export function buildMetaDescription(pathname: string): string {
  const normalized = normalizeRoutePathname(pathname);
  return ROUTE_DESCRIPTIONS[normalized] ?? DEFAULT_DESCRIPTION;
}

export function buildCanonicalHref(pathname: string): string {
  const normalized = normalizeRoutePathname(pathname);
  return absoluteSiteUrl(normalized === "/" ? "/" : normalized);
}

export function buildRobotsContent(pathname: string): string | null {
  const normalized = normalizeRoutePathname(pathname);
  if (normalized === "/thank-you" || normalized.startsWith("/inquiry-details")) {
    return "noindex, nofollow";
  }
  if (!isRegisteredRoute(pathname)) return "noindex, nofollow";
  return null;
}

export function buildOpenGraphTags(pathname: string): {
  title: string;
  description: string;
  url: string;
  image: string;
} {
  const normalized = normalizeRoutePathname(pathname);
  const label = routePageLabel(normalized);
  const title =
    normalized === "/"
      ? "Ace Book Publishers — Trusted Self-Publishing Platform for Authors"
      : `${label} — Ace Book Publishers`;
  return {
    title,
    description: buildMetaDescription(normalized),
    url: buildCanonicalHref(normalized),
    image: defaultOgImageUrl(),
  };
}
