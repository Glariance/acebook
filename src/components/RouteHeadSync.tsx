import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { buildDocumentTitle, normalizeRoutePathname } from "@/lib/routePageTitle";
import { buildCanonicalHref, buildMetaDescription, buildOpenGraphTags, buildRobotsContent } from "@/lib/routeMeta";
import { shouldAutoOpenZendeskWidget, syncZendeskPageContext, forceZendeskPopupBurst } from "@/lib/zendesk";

function upsertMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setRobotsMeta(content: string | null) {
  const existing = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
  if (content == null) {
    existing?.remove();
    return;
  }
  upsertMetaName("robots", content);
}

/** Client-side head sync for SPA navigations (canonical, OG, robots, Zendesk context). */
export default function RouteHeadSync() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const normalized = normalizeRoutePathname(pathname);
    const title = buildDocumentTitle(normalized);
    document.title = title;

    const description = buildMetaDescription(normalized);
    const canonical = buildCanonicalHref(normalized);
    const og = buildOpenGraphTags(normalized);
    const robots = buildRobotsContent(normalized);

    upsertMetaName("description", description);
    upsertCanonical(canonical);
    setRobotsMeta(robots);

    upsertMetaProperty("og:title", og.title);
    upsertMetaProperty("og:description", og.description);
    upsertMetaProperty("og:url", og.url);
    upsertMetaProperty("og:type", "website");
    upsertMetaProperty("og:image", og.image);

    upsertMetaName("twitter:card", "summary_large_image");
    upsertMetaName("twitter:title", og.title);
    upsertMetaName("twitter:description", og.description);
    upsertMetaName("twitter:image", og.image);

    const url = window.location.href;
    syncZendeskPageContext({ title, url });
    if (shouldAutoOpenZendeskWidget(pathname)) {
      forceZendeskPopupBurst();
    }
  }, [pathname]);

  return null;
}
