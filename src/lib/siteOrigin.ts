/**
 * Canonical URLs, sitemap, and Open Graph image URLs must use the live origin.
 * Set `VITE_SITE_URL` in `.env.production` when it differs from the default.
 */
const DEFAULT_PRODUCTION_ORIGIN = "https://acebookpublishers.com";

export const DEFAULT_OG_IMAGE_PATH = "/og.jpg";

export function getSiteOrigin(): string {
  const raw = import.meta.env.VITE_SITE_URL?.trim();
  if (raw) {
    try {
      const u = new URL(raw.includes("://") ? raw : `https://${raw}`);
      return `${u.protocol}//${u.host}`;
    } catch {
      /* use defaults below */
    }
  }
  if (import.meta.env.PROD) return DEFAULT_PRODUCTION_ORIGIN;
  if (typeof window !== "undefined") return window.location.origin;
  return DEFAULT_PRODUCTION_ORIGIN;
}

function pathPrefixBase(): string {
  const baseRaw = import.meta.env.BASE_URL || "/";
  return baseRaw === "/" ? "" : baseRaw.replace(/\/$/, "");
}

export function absoluteSiteUrl(pathname: string): string {
  const origin = getSiteOrigin();
  const base = pathPrefixBase();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${origin}${base}${path}`;
}

export function defaultOgImageUrl(): string {
  return `${getSiteOrigin()}${pathPrefixBase()}${DEFAULT_OG_IMAGE_PATH}`;
}
