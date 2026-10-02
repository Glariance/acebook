import { createFileRoute, redirect } from "@tanstack/react-router";
import { resolveServiceSlug } from "@/data/services-menu";

/** Legacy /services/:slug → /:slug (including old long slugs). */
export const Route = createFileRoute("/services_/$slug")({
  beforeLoad: ({ params }) => {
    const serviceSlug = resolveServiceSlug(params.slug);
    if (!serviceSlug) {
      throw redirect({ to: "/services" });
    }
    throw redirect({
      to: "/$slug",
      params: { slug: serviceSlug },
      replace: true,
    });
  },
});
