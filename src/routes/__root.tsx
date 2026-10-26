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
        { title: "Publish Your Book & Book Marketing Services | Ace Book Publishers" },
        {
          name: "description",
          content:
            "Publish and promote your book with Ace Book Publishers. Get professional Book Publishing and Book Marketing services, from editing and design to launch.",
        },
        {
          property: "og:title",
          content: "Publish Your Book & Book Marketing Services | Ace Book Publishers",
        },
        {
          property: "og:description",
          content:
            "Publish and promote your book with Ace Book Publishers. Get professional Book Publishing and Book Marketing services, from editing and design to launch.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        /* Square ABP mark (48×48+) — Google ignores wide logos like logo.png */
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192x192.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
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

const POPPINS_CSS =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";

const GTM_ID = "GTM-PTRVN96P";

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* Non-blocking Poppins: inject after first paint so LCP is not blocked */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function l(){var e=document.createElement('link');e.rel='stylesheet';e.href=${JSON.stringify(POPPINS_CSS)};document.head.appendChild(e)}if(document.readyState==='complete')setTimeout(l,0);else window.addEventListener('load',function(){setTimeout(l,0)},{once:true})})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={POPPINS_CSS} />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.addEventListener('submit',function(e){var f=e.target;if(f&&f.matches&&f.matches('form[data-inquiry-form]'))e.preventDefault();},true);",
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
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
