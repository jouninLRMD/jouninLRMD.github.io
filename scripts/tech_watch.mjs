#!/usr/bin/env node
/**
 * Tech-watch agent.
 *
 * Runs `npm outdated` + `npm audit` and writes a summary to
 * `public/tech-status.json`. The site reads this file at build time and
 * renders a small "Stack health" widget in the footer, so visitors can see
 * when the stack was last audited and whether anything needs attention.
 *
 * Scheduled weekly via .github/workflows/tech-watch.yml; also runnable
 * locally with `node scripts/tech_watch.mjs`.
 */

import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

/** Run a command that may exit non-zero (npm outdated/audit do by design)
 *  and return its stdout as a string regardless. */
function runAllowFail(cmd) {
  try {
    return execSync(cmd, { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (err) {
    return err.stdout?.toString() ?? "";
  }
}

function safeParse(json, fallback) {
  if (!json || !json.trim()) return fallback;
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

const outdatedRaw = runAllowFail("npm outdated --json --long");
const outdated = safeParse(outdatedRaw, {});

const auditRaw = runAllowFail("npm audit --json");
const audit = safeParse(auditRaw, {});

const vulnSummary = audit?.metadata?.vulnerabilities ?? {
  info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: 0,
};

const outdatedList = Object.entries(outdated).map(([name, info]) => ({
  name,
  current: info.current ?? null,
  wanted: info.wanted ?? null,
  latest: info.latest ?? null,
  type: info.type ?? null,
  homepage: info.homepage ?? null,
}));

const majorBehind = outdatedList.filter((p) => {
  if (!p.current || !p.latest) return false;
  const cur = Number(p.current.split(".")[0]);
  const lat = Number(p.latest.split(".")[0]);
  return Number.isFinite(cur) && Number.isFinite(lat) && lat > cur;
}).length;

const status = {
  generated_at: new Date().toISOString(),
  node: process.version,
  outdated_count: outdatedList.length,
  major_behind: majorBehind,
  vulnerabilities: vulnSummary,
  outdated: outdatedList,
  // Overall health: green if everything is current and no vulns, amber if
  // minor/patch updates or low vulns only, red if major behind or high+ vulns.
  health:
    vulnSummary.critical > 0 || vulnSummary.high > 0 || majorBehind > 0
      ? "red"
      : outdatedList.length > 0 || vulnSummary.moderate > 0 || vulnSummary.low > 0
      ? "amber"
      : "green",
};

const outPath = resolve(repoRoot, "public", "tech-status.json");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(status, null, 2) + "\n", "utf8");

console.log(
  `tech-watch: ${status.health.toUpperCase()} — ${status.outdated_count} outdated, ` +
  `${status.major_behind} major behind, ${status.vulnerabilities.total ?? 0} vulnerabilities`,
);
