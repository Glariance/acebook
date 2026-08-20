/**
 * Runs build:deploy with VITE_BASE set in Node (avoids Git Bash path conversion
 * that turns `/directory/acebook/` into `D:/.../directory/acebook/`).
 *
 * Usage: node scripts/run-deploy-with-base.mjs /directory/acebook/
 */
import { spawnSync } from "node:child_process";

const baseArg = process.argv[2]?.trim();
if (!baseArg) {
  console.error("Usage: node scripts/run-deploy-with-base.mjs /directory/acebook/");
  process.exit(1);
}

const withLeading = baseArg.startsWith("/") ? baseArg : `/${baseArg}`;
const viteBase = withLeading.endsWith("/") ? withLeading : `${withLeading}/`;

const env = { ...process.env, VITE_BASE: viteBase };
console.info(`[run-deploy-with-base] VITE_BASE=${viteBase}`);

const result = spawnSync("npm", ["run", "build:deploy"], {
  stdio: "inherit",
  env,
  shell: true,
});

process.exit(result.status ?? 1);
