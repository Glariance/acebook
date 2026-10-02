import { buildDocumentTitle, isRegisteredRoute, normalizeRoutePathname } from "@/lib/routePageTitle";
import { absoluteSiteUrl, defaultOgImageUrl } from "@/lib/siteOrigin";

const DEFAULT_DESCRIPTION =
  "Ace Book Publishers helps authors write, publish, market, and design books that reach global audiences.";

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  "/":
    "Publish and promote your book with Ace Book Publishers. Get professional Book Publishing and Book Marketing services, from editing and design to launch.",
  "/about-us":
    "Learn about Ace Book Publishers, our team, and how we support authors from manuscript through publication and marketing.",
  "/contact-us":
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
  "/book-publishing":
    "Ready to publish your book? Get professional book publishing services and expert guidance to self publish a book from manuscript to publication.",
  "/kdp-publishing":
    "Publish your book on Amazon with professional KDP Book Publishing services. Get expert guidance through Amazon Kindle Direct Publishing from start to launch.",
  "/apple-book-publishing":
    "Apple Book publishing for self-published authors including editing, formatting, cover design, multi-platform distribution, and royalties support.",
  "/barnes-and-noble-publishing":
    "Barnes and Noble ebook publishing services including editing, formatting, proofreading, cover design, multi-platform distribution, and royalties support.",
  "/kobo-book-publishing":
    "Kobo book publishing services including formatting, cover design, Kobo account setup, digital and print formats, and marketing support.",
  "/book-marketing":
    "Ready to reach more readers? Get professional Book Marketing Services from a book marketing agency with strategies designed to promote your book effectively.",
  "/book-editing":
    "Polish your manuscript with professional book editors. Get Best Book Editing Services for clear, engaging, publication-ready writing that reflects your voice.",
  "/ghostwriting":
    "Have a book idea? Get the Best Ghostwriting Services and Hire a Ghostwriter to turn your ideas into a polished manuscript while preserving your voice.",
  "/book-cover-design":
    "Make your book stand out with professional book cover design services. Get a Custom Book Cover created to match your story, genre, audience, and vision.",
  "/childrens-book":
    "Have a children's book idea? Get professional children's book services and expert publishing support from the Best Children's Book Publishers.",
  "/christian-book":
    "Looking for Top Christian Book Publishers? Choose a Christian Book Publishing Company for professional support with editing, design, publishing, and marketing.",
  "/audiobook":
    "Expand your book into audio with professional audiobook publishing services. An experienced Audiobook Publisher can guide you through production and publication.",
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
  return {
    title: buildDocumentTitle(normalized),
    description: buildMetaDescription(normalized),
    url: buildCanonicalHref(normalized),
    image: defaultOgImageUrl(),
  };
}
