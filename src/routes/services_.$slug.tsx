import { createFileRoute, notFound } from "@tanstack/react-router";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceDetailContent, serviceMetaDescriptions } from "@/data/service-detail-content";
import {
  serviceMenuLinks,
  type ServiceSlug,
} from "@/data/services-menu";

export const Route = createFileRoute("/services_/$slug")({
  beforeLoad: ({ params }) => {
    const service = serviceMenuLinks.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
  },
  head: ({ params }) => {
    const service = serviceMenuLinks.find((s) => s.slug === params.slug);
    const title = service?.label ?? "Service";
    const slug = params.slug as ServiceSlug;
    return {
      meta: [
        { title: `${title} — Ace Book Publishers` },
        {
          name: "description",
          content: serviceMetaDescriptions[slug] ?? `${title} from Ace Book Publishers.`,
        },
        { property: "og:title", content: `${title} — Ace Book Publishers` },
        {
          property: "og:description",
          content: serviceMetaDescriptions[slug] ?? `${title} from Ace Book Publishers.`,
        },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const content = getServiceDetailContent(slug as ServiceSlug);

  return <ServiceDetailPage content={content} />;
}
