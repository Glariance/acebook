// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const phpTarget = process.env.VITE_PHP_ORIGIN ?? "http://127.0.0.1";
const phpPublicPath = process.env.VITE_PHP_PUBLIC_PATH ?? "/acebook";

/** Subfolder deploy, e.g. `/directory/acebook/` — must end with `/` for Vite. */
function resolveViteBase(): string {
  let raw = process.env.VITE_BASE?.trim();
  if (!raw || raw === "/") return "/";
  raw = raw.replace(/\\/g, "/");
  // Git Bash may turn `/directory/...` into `D:/.../directory/...` or `/D:/.../directory/...`
  const nested = raw.match(/(\/directory\/.*)$/i);
  if (nested) raw = nested[1];
  const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

const viteBase = resolveViteBase();

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static hosting (Apache / shared hosting): generate a client shell as index.html
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index.html",
        crawlLinks: false,
        retryCount: 0,
      },
    },
  },
  vite: {
    base: viteBase,
    server: {
      proxy: {
        "/sendmail.php": {
          target: phpTarget,
          changeOrigin: true,
          rewrite: (path) => `${phpPublicPath}${path}`,
        },
        "/inquiry-details.php": {
          target: phpTarget,
          changeOrigin: true,
          rewrite: (path) => `${phpPublicPath}${path}`,
        },
        "/api/sendmail.php": {
          target: phpTarget,
          changeOrigin: true,
          rewrite: () => `${phpPublicPath}/api/sendmail.php`,
        },
      },
    },
  },
});
