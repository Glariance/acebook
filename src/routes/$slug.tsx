import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceDetailContent } from "@/data/service-detail-content";
import {
  resolveServiceSlug,
  serviceSlugAliases,
  type ServiceSlug,
} from "@/data/services-menu";
import { buildCanonicalHref, buildMetaDescription, buildOpenGraphTags } from "@/lib/routeMeta";
import { buildDocumentTitle } from "@/lib/routePageTitle";

export const Route = createFileRoute("/$slug")({
  beforeLoad: ({ params }) => {
    const aliasTarget = serviceSlugAliases[params.slug];
    if (aliasTarget) {
      throw redirect({
        to: "/$slug",
        params: { slug: aliasTarget },
        replace: true,
      });
    }
    const serviceSlug = resolveServiceSlug(params.slug);
    if (!serviceSlug) throw notFound();
  },
  head: ({ params }) => {
    const slug = (serviceSlugAliases[params.slug] ?? params.slug) as ServiceSlug;
    const path = `/${slug}`;
    const title = buildDocumentTitle(path);
    const description = buildMetaDescription(path);
    const canonical = buildCanonicalHref(path);
    const og = buildOpenGraphTags(path);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: og.title },
        { property: "og:description", content: og.description },
        { property: "og:url", content: og.url },
        { property: "og:image", content: og.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: og.title },
        { name: "twitter:description", content: og.description },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug: rawSlug } = Route.useParams();
  const slug = (serviceSlugAliases[rawSlug] ?? rawSlug) as ServiceSlug;
  const content = getServiceDetailContent(slug);

  return <ServiceDetailPage content={content} />;
}
