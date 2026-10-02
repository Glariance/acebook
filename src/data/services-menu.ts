export const serviceMenuLinks = [
  { label: "Book Publishing", slug: "book-publishing" },
  { label: "KDP Publishing", slug: "kdp-publishing" },
  { label: "Apple Book Publishing", slug: "apple-book-publishing" },
  { label: "Barnes Publishing", slug: "barnes-and-noble-publishing" },
  { label: "Kobo Book Publishing", slug: "kobo-book-publishing" },
  { label: "Book Marketing", slug: "book-marketing" },
  { label: "Book Editing", slug: "book-editing" },
  { label: "Ghostwriting", slug: "ghostwriting" },
  { label: "Book Cover Design", slug: "book-cover-design" },
  { label: "Children's Book Publishing", slug: "childrens-book" },
  { label: "Christian Book Publishing", slug: "christian-book" },
  { label: "Audiobook Book Publishing", slug: "audiobook" },
] as const;

export type ServiceSlug = (typeof serviceMenuLinks)[number]["slug"];

/** Old slugs that should 301 to the current service slug. */
export const serviceSlugAliases: Record<string, ServiceSlug> = {
  "childrens-book-publishing": "childrens-book",
  "christian-book-publishing": "christian-book",
  "audiobook-book-publishing": "audiobook",
  "barnes-publishing": "barnes-and-noble-publishing",
};

export function resolveServiceSlug(slug: string): ServiceSlug | undefined {
  const direct = serviceMenuLinks.find((s) => s.slug === slug);
  if (direct) return direct.slug;
  return serviceSlugAliases[slug];
}

export function servicePath(slug: ServiceSlug) {
  return `/${slug}` as const;
}

export const serviceDescriptions: Record<ServiceSlug, string> = {
  "book-publishing":
    "Self publishing on Amazon, Barnes & Noble, and IngramSpark — editing, cover design, formatting, SEO, and full distribution support.",
  "kdp-publishing":
    "Amazon KDP publishing services — editing, formatting, cover design, marketing, and full Kindle Direct Publishing support.",
  "apple-book-publishing":
    "Apple Book publishing services for self-published authors — editing, formatting, cover design, multi-platform distribution, and full royalties.",
  "barnes-and-noble-publishing":
    "Barnes and Noble ebook publishing services — manuscript editing, formatting, cover design, multi-platform distribution, and full royalties.",
  "kobo-book-publishing":
    "All-inclusive self-publishing for Kobo books and ebooks — formatting, cover design, Kobo setup, and full royalties support.",
  "book-marketing":
    "Boost your book sales with top book marketing services — Amazon marketing, social media, SEO, and proven promotion strategies.",
  "book-editing":
    "Hire top book editors in the USA — professional copy editing, line editing, proofreading, and Amazon-ready manuscript polish.",
  ghostwriting:
    "Best ghostwriting services for books — fiction, non-fiction, memoirs, children's books, and collaborative writing with full ownership rights.",
  "book-cover-design":
    "Creative book cover designs — unique genre-focused covers, hardboard and paperback options, and print-ready files that attract readers.",
  "childrens-book":
    "Leading children's book publishers — storytelling, illustrations, formatting, Amazon publishing, and marketing for kids' books.",
  "christian-book":
    "Top Christian book publishers in the USA — faith-based publishing, Christian children's books, editing, and full publishing support.",
  audiobook:
    "Professional narration, studio production and distribution so your story reaches listeners across major audiobook platforms.",
};
