#!/usr/bin/env node
/**
 * Lightweight SessionStart update checker for zaymuel/skills.
 *
 * Compares the local package.json version against the latest published version
 * on GitHub (with a short timeout so offline sessions are never delayed).
 *
 * Output modes:
 *   Default (Antigravity hooks.json): emits JSON {"injectSteps": [...]} or {}
 *   --plain (Claude Code hooks.json): emits plain notice text to stdout or nothing
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const plainMode = process.argv.includes("--plain");

const REMOTE_PACKAGE_URL =
  "https://raw.githubusercontent.com/zaymuel/skills/master/package.json";
const REPO_URL = "https://github.com/zaymuel/skills";
const TIMEOUT_MS = 3000;

function compareSemver(a, b) {
  const pa = a.replace(/^v/, "").split("-")[0].split(".").map(Number);
  const pb = b.replace(/^v/, "").split("-")[0].split(".").map(Number);
  for (let i = 0; i < 3; i += 1) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function emitEmpty() {
  if (!plainMode) {
    process.stdout.write("{}\n");
  }
}

function emitNotice(localVersion, remoteVersion) {
  const message =
    `An update is available for zaymuel/skills (local v${localVersion} -> latest v${remoteVersion}). ` +
    `Let the user know and ask if they would like to update their installed skills from ${REPO_URL}.`;

  if (plainMode) {
    process.stdout.write(`[zaymuel/skills update] ${message}\n`);
  } else {
    const payload = {
      injectSteps: [
        {
          systemMessage: {
            systemMessage: message,
          },
        },
      ],
    };
    process.stdout.write(`${JSON.stringify(payload)}\n`);
  }
}

async function main() {
  try {
    const localPkg = JSON.parse(
      fs.readFileSync(path.join(repoRoot, "package.json"), "utf8")
    );
    const localVersion = localPkg.version || "0.0.0";

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(REMOTE_PACKAGE_URL, {
      signal: controller.signal,
      headers: { "User-Agent": "zaymuel-skills-update-check" },
    });
    clearTimeout(timer);

    if (!response.ok) {
      emitEmpty();
      return;
    }

    const remotePkg = await response.json();
    const remoteVersion = remotePkg.version || localVersion;

    if (compareSemver(remoteVersion, localVersion) > 0) {
      emitNotice(localVersion, remoteVersion);
    } else {
      emitEmpty();
    }
  } catch {
    // Offline, timeout, or restricted network: fail silently without blocking session startup.
    emitEmpty();
  }
}

main();
