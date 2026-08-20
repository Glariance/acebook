import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import {
  installDevConsoleFilters,
  installExtensionNoiseFilters,
  installInquiryFormGuard,
} from "@/lib/client-bootstrap";
import { routeTree } from "./routeTree.gen";

if (typeof document !== "undefined") {
  installInquiryFormGuard();
  installDevConsoleFilters();
  installExtensionNoiseFilters();
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const basepath = (import.meta.env.BASE_URL || "/")
    .replace(/\/$/, "")
    .replace(/^\.$/, "");

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...(basepath ? { basepath } : {}),
  });

  return router;
};
