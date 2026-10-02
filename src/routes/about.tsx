import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /about → /about-us */
export const Route = createFileRoute("/about")({
  beforeLoad: () => {
    throw redirect({ to: "/about-us", replace: true });
  },
});
