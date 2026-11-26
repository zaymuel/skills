#!/usr/bin/env node
/**
 * Generates a machine-readable llms.txt index at the repository root from
 * skills/<name>/SKILL.md frontmatter and docs/<name>.md links.
 *
 * Usage:
 *   node scripts/generate-llms-txt.mjs           # Generates/updates llms.txt
 *   node scripts/generate-llms-txt.mjs --check   # Exits non-zero if llms.txt is out of date
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const skillsDir = path.join(repoRoot, "skills");
const docsDir = path.join(repoRoot, "docs");
const outputPath = path.join(repoRoot, "llms.txt");

const REPO_BLOB_BASE = "https://github.com/zaymuel/skills/blob/master";
const REPO_RAW_BASE = "https://raw.githubusercontent.com/zaymuel/skills/master";

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const lines = match[1].split(/\r?\n/);
  const result = { metadata: {} };
  let currentKey = null;
  let inMetadata = false;
  let foldedLines = [];

  function flushFolded() {
    if (currentKey && foldedLines.length > 0) {
      result[currentKey] = foldedLines.join(" ").trim();
      foldedLines = [];
      currentKey = null;
    }
  }

  for (const line of lines) {
    if (inMetadata && /^\s{2,}\S/.test(line)) {
      const m = line.trim().match(/^([^:]+):\s*(.*)$/);
      if (m) result.metadata[m[1].trim()] = m[2].trim();
      continue;
    }

    if (currentKey && /^\s{2,}\S/.test(line)) {
      foldedLines.push(line.trim());
      continue;
    }

    flushFolded();
    inMetadata = false;

    const top = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!top) continue;

    const [, key, rawVal] = top;
    if (key === "metadata" && rawVal === "") {
      inMetadata = true;
    } else if (rawVal === ">-" || rawVal === ">" || rawVal === "|") {
      currentKey = key;
      foldedLines = [];
    } else {
      result[key] = rawVal.replace(/^["']|["']$/g, "").trim();
    }
  }
  flushFolded();

  return result;
}

function buildLlmsTxt() {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "package.json"), "utf8")
  );

  const skillFolders = fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const lines = [
    `# zaymuel/skills (v${pkg.version})`,
    "",
    `> ${pkg.description}`,
    "",
    "Install all skills: `npx skills@latest add zaymuel/skills`",
    "Browse individual skills: https://www.skills.sh/zaymuel/skills",
    `Repository: https://github.com/zaymuel/skills`,
    "",
    "## Docs",
    "",
    `- [README](${REPO_BLOB_BASE}/README.md): Overview, top 3 recommendations, skill table, and common questions.`,
    `- [Installation Guide](${REPO_BLOB_BASE}/docs/INSTALL.md): Setup instructions for npx skills, direct prompts, copy-paste, Claude Code, Codex, Gemini CLI, Google Antigravity, and SessionStart hooks.`,
    "",
    "## Skills",
    "",
  ];

  for (const folder of skillFolders) {
    const skillMdPath = path.join(skillsDir, folder, "SKILL.md");
    if (!fs.existsSync(skillMdPath)) continue;

    const fm = parseFrontmatter(fs.readFileSync(skillMdPath, "utf8"));
    const name = fm.name || folder;
    const desc = fm.description || "";
    const category = fm.metadata?.category || "";
    const tags = fm.metadata?.tags || "";
    const hasDoc = fs.existsSync(path.join(docsDir, `${folder}.md`));

    const metaParts = [];
    if (category) metaParts.push(`category: ${category}`);
    if (tags) metaParts.push(`tags: ${tags}`);
    const metaSuffix = metaParts.length ? ` [${metaParts.join(" | ")}]` : "";

    lines.push(`- [${name}](${REPO_RAW_BASE}/skills/${folder}/SKILL.md): ${desc}${metaSuffix}`);
    if (hasDoc) {
      lines.push(`  - Guide: ${REPO_BLOB_BASE}/docs/${folder}.md`);
    }
  }

  return `${lines.join("\n")}\n`;
}

const checkOnly = process.argv.includes("--check");
const generated = buildLlmsTxt();

if (checkOnly) {
  if (!fs.existsSync(outputPath)) {
    console.error("llms.txt is missing. Run `npm run generate-llms`.");
    process.exit(1);
  }
  const existing = fs.readFileSync(outputPath, "utf8");
  if (existing !== generated) {
    console.error("llms.txt is out of date. Run `npm run generate-llms`.");
    process.exit(1);
  }
  console.log("llms.txt is up to date.");
} else {
  fs.writeFileSync(outputPath, generated, "utf8");
  console.log("Generated llms.txt.");
}
