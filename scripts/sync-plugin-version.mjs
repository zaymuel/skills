#!/usr/bin/env node
/**
 * Synchronizes or bumps the version field across package.json,
 * .antigravity-plugin/plugin.json, .claude-plugin/plugin.json,
 * .claude-plugin/marketplace.json, and .codex-plugin/plugin.json.
 *
 * Usage:
 *   node scripts/sync-plugin-version.mjs                 # Syncs package.json version to all manifests
 *   node scripts/sync-plugin-version.mjs --set 1.2.0     # Sets version everywhere to 1.2.0
 *   node scripts/sync-plugin-version.mjs --bump minor    # Bumps minor (1.0.2 -> 1.1.0) and syncs all
 *   node scripts/sync-plugin-version.mjs --bump patch    # Bumps patch (1.0.2 -> 1.0.3) and syncs all
 *   node scripts/sync-plugin-version.mjs --bump major    # Bumps major (1.0.2 -> 2.0.0) and syncs all
 *   node scripts/sync-plugin-version.mjs --check         # Exits non-zero if any manifest is out of sync
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const MANIFEST_PATHS = [
  "package.json",
  ".antigravity-plugin/plugin.json",
  ".claude-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  ".codex-plugin/plugin.json",
];

function readJson(relPath) {
  const fullPath = path.join(repoRoot, relPath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function writeJson(relPath, data) {
  const fullPath = path.join(repoRoot, relPath);
  fs.writeFileSync(fullPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function bumpSemver(current, level) {
  const [major, minor, patch] = current
    .replace(/^v/, "")
    .split("-")[0]
    .split(".")
    .map(Number);

  if (level === "major") return `${major + 1}.0.0`;
  if (level === "minor") return `${major}.${minor + 1}.0`;
  if (level === "patch") return `${major}.${minor}.${patch + 1}`;

  console.error(`Invalid bump level: "${level}". Use major, minor, or patch.`);
  process.exit(1);
}

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const setIndex = args.indexOf("--set");
const bumpIndex = args.indexOf("--bump");
const explicitVersion = setIndex !== -1 ? args[setIndex + 1] : null;
const bumpLevel = bumpIndex !== -1 ? args[bumpIndex + 1] : null;

const pkg = readJson("package.json");
let targetVersion = pkg.version;

if (explicitVersion) {
  targetVersion = explicitVersion.replace(/^v/, "");
} else if (bumpLevel) {
  targetVersion = bumpSemver(pkg.version, bumpLevel);
}

if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(targetVersion)) {
  console.error(`Invalid semver version: "${targetVersion}"`);
  process.exit(1);
}

let outOfSync = false;

for (const relPath of MANIFEST_PATHS) {
  const fullPath = path.join(repoRoot, relPath);
  if (!fs.existsSync(fullPath)) continue;

  const data = readJson(relPath);
  if (data.version !== targetVersion) {
    outOfSync = true;
    if (checkOnly) {
      console.error(
        `Version mismatch in ${relPath}: found ${data.version}, expected ${targetVersion}`
      );
    } else {
      data.version = targetVersion;
      writeJson(relPath, data);
      console.log(`Updated ${relPath} -> ${targetVersion}`);
    }
  }
}

if (checkOnly && outOfSync) {
  process.exit(1);
}

if (!outOfSync) {
  console.log(`All manifests are in sync at v${targetVersion}.`);
}
