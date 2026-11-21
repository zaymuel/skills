# 🛠️ zaymuel/skills

A general-use collection of modular AI agent skills (`SKILL.md`) that work across **Claude Code**, **OpenAI Codex**, **Gemini CLI**, **Google Antigravity**, **Cursor**, and any compatible coding agent. 🚀

## 📑 Contents

* [Included Skills](#-included-skills): Overview of all 7 skills under `skills/`.
* [Installation](#-installation): Setup commands for `npx skills` and all major coding agents.
* [Common Questions](#-common-questions): Design discussions and links to each skill's full rationale in `docs/`.
* [Repository Structure](#-repository-structure): Directory layout of the plugin manifest, skills, and reference guides.
* [License & Attribution](#-license--attribution): MIT license details and community credits.

---

## 🧠 Included Skills

All skills live under [`skills/`](skills/) as self-contained folders with a `SKILL.md` specification, paired with human-friendly guides under [`docs/`](docs/):

| Skill (`SKILL.md`) | Category | Summary | Guide |
| :--- | :--- | :--- | :---: |
| 🕵️ **[`anti-prompt-injection`](skills/anti-prompt-injection/SKILL.md)** | Security & Input Guardrail | Scans uploaded PDFs, documents, notebooks, and external web content for hidden text, obfuscated instructions, indirect prompt injection payloads, and unsafe remote file downloads before executing user tasks. | [📖 Docs](docs/anti-prompt-injection.md) |
| 💻 **[`terminal-enforcer`](skills/terminal-enforcer/SKILL.md)** | Command & Pipeline Safety | Enforces read-only Git and PowerShell inspection allowlists, explicit user authorization gates for Python script execution (restricting inline `python -c` to 1-2 trivial lines), and strict tool separation (never mixing Git and PowerShell on the same command line via `\|`, `;`, `&&`, or `\|\|`, and forbidding unquoted parenthesized subqueries). | [📖 Docs](docs/terminal-enforcer.md) |
| 🗂️ **[`workspace-enforcer`](skills/workspace-enforcer/SKILL.md)** | Repository Hygiene & Architecture | Enforces clean root directory structure, sequential single-file draft quarantine (`01_<topic>.py`), path anonymization (`C:\Users\username\...`), `.gitignore` privacy (no personal folders or local paths), Git index protection, 2-level hierarchical response reporting, `TODO.md`-first tracking, the 5-section architecture blueprint (`docs/00_architecture_and_decisions.md`), `GLOSSARY.md` purity, author voice preservation (no em-dashes), and chat-native questions (`❓ **Q1**`). | [📖 Docs](docs/workspace-enforcer.md) |
| 🔄 **[`continuous-learning`](skills/continuous-learning/SKILL.md)** | Self-Improvement & Error Distillation | Cross-repo 2-layer error-to-rule workflow. Auto-bootstraps an empirical incident ledger (`docs/agents/errors.md`) and operational contract (`AGENTS.md`) on the first failure, classifies root causes by structural taxonomy (`PATH-ENV`, `MISSING-DEP`, `API-CONTRACT`, `TEST-ISOLATION`, `DOC-BOUNDARY`, `TOOLCHAIN`), and distills verified fixes into permanent rules. | [📖 Docs](docs/continuous-learning.md) |
| 🧹 **[`code-maintainability-formatter`](skills/code-maintainability-formatter/SKILL.md)** | Code & LaTeX Quality | Guides agents to write code and technical manuscripts that natively conform to formatter and linter standards from the first draft (including dedicated reference guides for [Python PEP 8 / `autopep8`](skills/code-maintainability-formatter/references/python.md) and [LaTeX `latexindent` / `chktex`](skills/code-maintainability-formatter/references/latex.md)), paired with high-signal "why" and "what" comments. | [📖 Docs](docs/code-maintainability-formatter.md) |
| 🗺️ **[`map-crafting`](skills/map-crafting/SKILL.md)** | Geospatial & Cartographic Design | Cartographic standards for thematic, choropleth, facility-location, and bivariate maps: composable layer pipelines, metric projected CRS, domain filtering (`NaN` masking with neutral gray rendering), colorblind-safe palettes with high-contrast hydrography, distribution-aware binning, non-overlapping two-zone legends, and test output isolation. | [📖 Docs](docs/map-crafting.md) |
| 📄 **[`paper-analysis-questions`](skills/paper-analysis-questions/SKILL.md)** | Research & Literature Review | Generates 6-9 progressive, high-rigor critical analysis questions from academic papers and technical reports across five analytical axes: metric limits, conceptual distinctions, methodological/statistical critique, causal mechanisms behind counterintuitive findings, and applied trade-offs. | [📖 Docs](docs/paper-analysis-questions.md) |

> [!TIP]
> ✅ **Standout Feature: TODO-First Task Tracking (`TODO.md`)**
> One of the highest-impact workflows in [`workspace-enforcer`](docs/workspace-enforcer.md) is **TODO-First Tracking**. Before modifying a single line of code, the agent logs every request, bugfix, or multi-step feature as a pending `- [ ]` item in root `TODO.md` (with 2-space indented subtasks for multi-step work) and checks it off `[X]` upon completion. In practice, this turns `TODO.md` into a live, zero-friction audit trail that prevents dropped requirements across long conversations, makes switching models or agents seamless, and automatically prunes completed items from staging checklists.

---

## 📦 Installation

You can install the entire skill suite or pick individual skill folders for your preferred AI coding agent.

### 💬 Option 0: Ask Your Agent to Install the Whole of It (Easiest)

Paste a prompt with this repository's link directly into your AI coding agent:

```text
Install the skills from https://github.com/zaymuel/skills into my skills directory.
```

If it succeeds, jump straight into [Common Questions](#-common-questions) to explore the design trade-offs behind each skill :)

> [!WARNING]
> If your agent cannot install it automatically, use the copy-and-paste steps below or fall back to Options 1-4.

### 📋 Installing Selected Skills Only (Copy & Paste)

Want only specific modules, or using an agent that cannot fetch GitHub URLs directly? Install any individual skill in 3 steps:

1. **Access the skill**: Open the skill's `SKILL.md` link from the [Included Skills](#-included-skills) table above (for example, [`continuous-learning/SKILL.md`](skills/continuous-learning/SKILL.md)).
2. **Copy the raw file**: Click GitHub's **Copy raw file** button (or copy the full `SKILL.md` text, including the YAML frontmatter between `---`).
3. **Paste into your agent**: Paste the copied content into your agent chat:

```text
Save this as a skill in my skills directory:

<paste SKILL.md content here>
```

*(If a skill includes a `references/` folder, such as [`code-maintainability-formatter`](skills/code-maintainability-formatter/SKILL.md), repeat the same steps for any reference files you need.)*

### ⚡ Option 1: Universal Installer (`npx skills`)

Copy editable skill folders directly into your global or project configuration for any supported agent:

```bash
npx skills@latest add zaymuel/skills
```

### 🤖 Option 2: Claude Code

**Via Plugin Marketplace (Recommended):**

```bash
/plugin marketplace add https://github.com/zaymuel/skills
/plugin install zaymuel-skills@zaymuel-skills
```

**Manual Installation (Global or Project Scope):**

Clone this repository and copy the desired skill folders into `~/.claude/skills/` (global) or `.claude/skills/` (project-scoped):

```bash
git clone https://github.com/zaymuel/skills.git temp-skills
mkdir -p ~/.claude/skills
cp -r temp-skills/skills/* ~/.claude/skills/
rm -rf temp-skills
```

### 🧠 Option 3: OpenAI Codex (Codex CLI)

**Via Plugin Marketplace:**

```bash
codex plugin marketplace add zaymuel/skills
codex plugin add zaymuel-skills@zaymuel
```

**Manual Installation:**

Copy the skills into your global Codex skills directory (`~/.codex/skills/`) or into your project's `skills/` directory (or point `CODEX_SKILLS_DIR` to the cloned `skills/` folder):

```bash
git clone https://github.com/zaymuel/skills.git temp-skills
mkdir -p ~/.codex/skills
cp -r temp-skills/skills/* ~/.codex/skills/
rm -rf temp-skills
```

### 💎 Option 4: Gemini CLI & Google Antigravity

**Via Gemini CLI:**

```bash
gemini skills install https://github.com/zaymuel/skills.git
```

**Manual Plugin Installation (Google Antigravity / Gemini CLI):**

Clone directly into your user plugins directory (`~/.gemini/config/plugins/zaymuel-skills` on macOS/Linux, or `C:\Users\username\.gemini\config\plugins\zaymuel-skills` on Windows, replacing `username` with your Windows username):

```powershell
git clone https://github.com/zaymuel/skills.git "C:\Users\username\.gemini\config\plugins\zaymuel-skills"
```

---

## ❓ Common Questions

Critical design questions probing each skill's core trade-off, with answers in [`docs/`](docs/):

1. 🕵️ **[`anti-prompt-injection`](skills/anti-prompt-injection/SKILL.md)**: *Why compare a document's extracted text layer against its visual rendering and halt to quote suspicious strings in an inert code block, rather than silently stripping hidden instructions and continuing?* -> [Read Answer](docs/anti-prompt-injection.md#-common-questions--design-rationale)
2. 💻 **[`terminal-enforcer`](skills/terminal-enforcer/SKILL.md)**: *If chaining shell commands with `;` or piping `git` into PowerShell reduces turn count, why forbid cross-binary pipelines and require separate parallel tool calls alongside a 1-2 line cap on `python -c`?* -> [Read Answer](docs/terminal-enforcer.md#-common-questions--design-rationale)
3. 🗂️ **[`workspace-enforcer`](skills/workspace-enforcer/SKILL.md)**:
   * **Clean Root & Drafts**: *Why keep the project root strictly clean while quarantining exploratory scripts into single sequential files (`01_<topic>.py`) edited in place?* -> [Read Answer](docs/workspace-enforcer.md#clean-root-and-single-file-drafts)
   * **Privacy**: *Why pair mandatory path anonymization (`C:\Users\username\...`) with placing personal and local maintainer exclusions in `.git/info/exclude` instead of `.gitignore`?* -> [Read Answer](docs/workspace-enforcer.md#privacy-via-path-anonymization-and-local-git-excludes)
4. 🔄 **[`continuous-learning`](skills/continuous-learning/SKILL.md)**: *Why split self-improvement into an empirical error ledger (`errors.md`) and a separate operational contract (`AGENTS.md`) gated by a verification check, rather than appending every bug fix directly to the global system prompt?* -> [Read Answer](docs/continuous-learning.md#-common-questions--design-rationale)
5. 🧹 **[`code-maintainability-formatter`](skills/code-maintainability-formatter/SKILL.md)**: *When writing Python with an aggressive `autopep8 -aa` mindset, why must ORM filter expressions intentionally violate `E711` (`x == None` with `# noqa: E711`), and why pair "why" comments with structural "what" comments on nested data?* -> [Read Answer](docs/code-maintainability-formatter.md#-common-questions--design-rationale)
6. 🗺️ **[`map-crafting`](skills/map-crafting/SKILL.md)**: *Why does `map-crafting` mark ineligible spatial data as `NaN`/`None` instead of assuming `0`, and how does it prevent distorted bins and visual misinterpretation?* -> [Read Answer](docs/map-crafting.md#-common-questions--design-rationale)
7. 📄 **[`paper-analysis-questions`](skills/paper-analysis-questions/SKILL.md)**: *Why do closed-form dichotomies and cross-paper tension prompts produce deeper technical critiques than open-ended section summaries?* -> [Read Answer](docs/paper-analysis-questions.md#-common-questions--design-rationale)

---

## 📁 Repository Structure

```text
zaymuel/skills/
├── .antigravity-plugin/                            <-- Google Antigravity plugin manifest
├── .claude-plugin/                                 <-- Claude Code plugin & marketplace manifests
├── .codex-plugin/                                  <-- OpenAI Codex plugin manifest
├── LICENSE                                         <-- MIT License
├── README.md                                       <-- Installation guide & skill catalog
├── package.json                                    <-- Package metadata for skill installers
├── plugin.json                                     <-- Plugin manifest for agent marketplaces
├── docs/                                           <-- Per-skill documentation & architecture guides
└── skills/
    └── <skill-name>/
        ├── SKILL.md                                <-- Skill specification & instructions
        ├── CREDITS.md                              <-- Optional source attribution
        └── references/                             <-- Optional language & domain reference guides
```

---

## 📄 License & Attribution

This project is licensed under the [MIT License](LICENSE).

* 🛡️ **Anti-Prompt Injection Taxonomy ([`anti-prompt-injection/CREDITS.md`](skills/anti-prompt-injection/CREDITS.md))**: Adapted and inverted into a defensive guardrail skill from [yaklang/hack-skills](https://github.com/yaklang/hack-skills) ([`llm-prompt-injection`](https://www.skills.sh/yaklang/hack-skills/llm-prompt-injection), MIT License).
* 💡 **Skill Repository Structure & Cross-Agent Packaging Inspiration**: Inspired by [anthropics/skills](https://github.com/anthropics/skills), [mattpocock/skills](https://github.com/mattpocock/skills), and [affaan-m/ECC](https://github.com/affaan-m/ECC).
* ✨ **Custom Skills & Modifications**: Copyright (c) 2026 [zaymuel](https://github.com/zaymuel).
