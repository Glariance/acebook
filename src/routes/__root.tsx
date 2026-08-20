import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import faviconUrl from "../assets/logo.png?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import DecoCirclesAnimator from "../components/DecoCirclesAnimator";
import ZendeskWidget from "../components/ZendeskWidget";
import RouteHeadSync from "../components/RouteHeadSync";
import MobileStickyCall from "../components/MobileStickyCall";
import { InquiryFormProvider } from "../context/InquiryFormContext";
import { getSiteOrigin } from "../lib/siteOrigin";
import { SITE_EMAIL, SITE_PHONE_TEL } from "../constants/contact";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const origin = getSiteOrigin();
    const organizationLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Ace Book Publishers",
      url: origin,
      logo: `${origin}/logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_PHONE_TEL,
        email: SITE_EMAIL,
        contactType: "customer service",
        areaServed: "US",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "100 Church Street 8th floor",
        addressLocality: "Manhattan",
        addressRegion: "NY",
        postalCode: "10007",
        addressCountry: "US",
      },
    };
    const websiteLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ace Book Publishers",
      url: origin,
    };

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { httpEquiv: "Permissions-Policy", content: "unload=*" },
        { title: "Ace Book Publishers — Trusted Self-Publishing Platform for Authors" },
        { name: "description", content: "Ace Book Publishers helps authors write, publish, market, and design books that reach global audiences." },
        { property: "og:title", content: "Ace Book Publishers" },
        { property: "og:description", content: "Trusted self-publishing platform for authors." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: faviconUrl, type: "image/png" },
        { rel: "apple-touch-icon", href: faviconUrl },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(organizationLd) },
        { type: "application/ld+json", children: JSON.stringify(websiteLd) },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.addEventListener('submit',function(e){var f=e.target;if(f&&f.matches&&f.matches('form[data-inquiry-form]'))e.preventDefault();},true);",
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <InquiryFormProvider>
        <RouteHeadSync />
        <DecoCirclesAnimator />
        <ZendeskWidget />
        <MobileStickyCall />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </InquiryFormProvider>
    </QueryClientProvider>
  );
}
