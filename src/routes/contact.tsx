import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /contact → /contact-us */
export const Route = createFileRoute("/contact")({
  beforeLoad: () => {
    throw redirect({ to: "/contact-us", replace: true });
  },
});
