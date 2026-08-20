/**
 * Prepares a flat static deploy folder from the Vite/TanStack Start build.
 *
 * Upload the contents of `dist/deploy/` to your site folder
 * (e.g. public_html/directory/acebook/). PHP endpoints should sit alongside.
 *
 * For subdirectory deploys:
 *   VITE_BASE=/directory/acebook/ npm run build:deploy
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const clientDir = join(root, "dist", "client");
const deployDir = join(root, "dist", "deploy");

function fail(message) {
  console.error(`[prepare-static-deploy] ${message}`);
  process.exit(1);
}

function resolveRewriteBase() {
  let raw = (process.env.VITE_BASE || "/").trim() || "/";
  raw = raw.replace(/\\/g, "/");
  // Git Bash may turn `/directory/...` into `D:/.../directory/...` or `/D:/.../directory/...`
  const nested = raw.match(/(\/directory\/.*)$/i);
  if (nested) raw = nested[1];
  if (raw === "/") return "/";
  const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

if (!existsSync(clientDir)) {
  fail(`Missing ${clientDir}. Run \`npm run build\` first.`);
}

const indexHtml = join(clientDir, "index.html");
const shellHtml = join(clientDir, "_shell.html");

if (!existsSync(indexHtml) && existsSync(shellHtml)) {
  cpSync(shellHtml, indexHtml);
  console.info("[prepare-static-deploy] Copied _shell.html → index.html");
}

if (!existsSync(indexHtml)) {
  fail(
    "No index.html (or _shell.html) in dist/client. Enable SPA mode in vite.config.ts and rebuild.",
  );
}

rmSync(deployDir, { recursive: true, force: true });
mkdirSync(deployDir, { recursive: true });

for (const name of readdirSync(clientDir)) {
  const from = join(clientDir, name);
  const to = join(deployDir, name);
  cpSync(from, to, { recursive: true });
}

const rewriteBase = resolveRewriteBase();
const htaccessPath = join(deployDir, ".htaccess");
let htaccess = existsSync(htaccessPath)
  ? readFileSync(htaccessPath, "utf8")
  : `DirectoryIndex index.html\n`;

if (htaccess.includes("RewriteBase ")) {
  htaccess = htaccess.replace(/RewriteBase\s+\S+/g, `RewriteBase ${rewriteBase}`);
} else if (htaccess.includes("RewriteEngine On")) {
  htaccess = htaccess.replace(
    "RewriteEngine On",
    `RewriteEngine On\n  RewriteBase ${rewriteBase}`,
  );
} else {
  htaccess = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase ${rewriteBase}
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>

DirectoryIndex index.html
` + htaccess;
}

writeFileSync(htaccessPath, htaccess, "utf8");

const listing = readdirSync(deployDir)
  .map((name) => {
    const isDir = statSync(join(deployDir, name)).isDirectory();
    return `  ${isDir ? "dir " : "file"} ${name}`;
  })
  .join("\n");

console.info(`[prepare-static-deploy] Ready: dist/deploy/`);
console.info(`[prepare-static-deploy] RewriteBase: ${rewriteBase}`);
console.info(listing);
console.info(
  "\nUpload EVERYTHING inside dist/deploy/ into /directory/acebook/ on the server.",
);
