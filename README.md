# 🛠️ zaymuel/skills

[![skills.sh](https://skills.sh/b/zaymuel/skills)](https://skills.sh/zaymuel/skills)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A general-use collection of modular AI agent skills (`SKILL.md`) that work across **Claude Code**, **OpenAI Codex**, **Gemini CLI**, **Google Antigravity**, **Cursor**, and any compatible coding agent. 🚀

## 📑 Contents

* ⭐ [Top 3 Recommended Skills](#-top-3-recommended-skills): My personal recommendation if you're stranded on a desert island and only have space for 3 skills.
* 🧠 [Included Skills](#-included-skills): Overview of all 11 skills under `skills/`.
* 📦 [Installation](#-installation): Setup commands for `npx skills` and all major coding agents.
* ❓ [Common Questions](#-common-questions): Design discussions and links to each skill's full rationale in `docs/`.
* 📁 [Repository Structure](#-repository-structure): Directory layout of the plugin manifest, skills, and reference guides.
* 📄 [License & Attribution](#-license--attribution): MIT license details and community credits.

---

## ⭐ Top 3 Recommended Skills

Pick my personal favourites:

1. 🕵️ **[`anti-prompt-injection`](docs/anti-prompt-injection.md)** (**Security**): Shields your agent from hidden instructions/AI traps hidden inside documents and web pages.
2. 🗂️ **[`workspace-enforcer`](docs/workspace-enforcer.md)** (**TODO Checklist & Project Architecture Organization**): Enforces TODO-First task tracking alongside clean root layout, and a structured `docs/00_architecture_and_decisions.md` blueprint so projects stay organized across long sessions and model switches.
3. 🔄 **[`stumble-learning`](docs/stumble-learning.md)** (**Self-Debugging & Rule Distillation**): Turns bugs, failed commands, and user corrections into sanitized error logs and permanent rules so your agent learns from stumbles and stops repeating the same mistakes.

---

## 🧠 Included Skills

All skills live under [`skills/`](skills/) as self-contained folders with a `SKILL.md` specification, paired with human-friendly guides under [`docs/`](docs/):

| Skill (`SKILL.md`) | Category | Summary | Guide |
| :--- | :--- | :--- | :---: |
| 🕵️ **[`anti-prompt-injection`](skills/anti-prompt-injection/SKILL.md)** | Security & Input Guardrail | Scans uploaded PDFs, documents, notebooks, and external web content for hidden text, obfuscated instructions, indirect prompt injection payloads, and unsafe remote file downloads before executing user tasks. | [📖 Docs](docs/anti-prompt-injection.md) |
| 💻 **[`terminal-enforcer`](skills/terminal-enforcer/SKILL.md)** | Command & Pipeline Safety | Enforces read-only Git and PowerShell inspection allowlists, explicit user authorization gates for Python script execution (restricting inline `python -c` to 1-2 trivial lines), and strict tool separation (never mixing Git and PowerShell on the same command line via `\|`, `;`, `&&`, or `\|\|`, and forbidding unquoted parenthesized subqueries). | [📖 Docs](docs/terminal-enforcer.md) |
| 🗂️ **[`workspace-enforcer`](skills/workspace-enforcer/SKILL.md)** | Repository Hygiene & Architecture | Enforces clean root directory structure, sequential single-file draft quarantine (`01_<topic>.py`), path anonymization (`C:\Users\username\...`), `.gitignore` privacy (no personal folders or local paths), Git index protection, 2-level hierarchical response reporting, `TODO.md`-first tracking, the 5-section architecture blueprint (`docs/00_architecture_and_decisions.md`), `GLOSSARY.md` purity, author voice preservation (no em-dashes), and chat-native questions (`❓ **Q1**`). | [📖 Docs](docs/workspace-enforcer.md) |
| 🔄 **[`stumble-learning`](skills/stumble-learning/SKILL.md)** | Self-Improvement & Error Distillation | Cross-repo 2-layer error-to-rule workflow. Asks to bootstrap an empirical incident ledger (`docs/agents/errors.md`) and operational contract (`AGENTS.md`) on the first failure, logs sanitized summaries with exact locations, classifies root causes by structural taxonomy (`PATH-ENV`, `MISSING-DEP`, `API-CONTRACT`, `TEST-ISOLATION`, `DOC-BOUNDARY`, `TOOLCHAIN`), and proposes verified fixes for user-approved rules. | [📖 Docs](docs/stumble-learning.md) |
| 🧹 **[`code-maintainability-formatter`](skills/code-maintainability-formatter/SKILL.md)** | Code & LaTeX Quality | Guides agents to write code and technical manuscripts that natively conform to formatter and linter standards from the first draft (including dedicated reference guides for [Python PEP 8 / `autopep8`](skills/code-maintainability-formatter/references/python.md) and [LaTeX `latexindent` / `chktex`](skills/code-maintainability-formatter/references/latex.md)), paired with high-signal "why" and "what" comments. | [📖 Docs](docs/code-maintainability-formatter.md) |
| 🗺️ **[`map-crafting`](skills/map-crafting/SKILL.md)** | Geospatial & Cartographic Design | Cartographic standards for thematic, choropleth, facility-location, and bivariate maps: composable layer pipelines, metric projected CRS, domain filtering (`NaN` masking with neutral gray rendering), colorblind-safe palettes with high-contrast hydrography, distribution-aware binning, non-overlapping two-zone legends, and test output isolation. | [📖 Docs](docs/map-crafting.md) |
| 📄 **[`paper-analysis-questions`](skills/paper-analysis-questions/SKILL.md)** | Research & Literature Review | Generates 6-9 progressive, high-rigor critical analysis questions from academic papers and technical reports across five analytical axes: metric limits, conceptual distinctions, methodological/statistical critique, causal mechanisms behind counterintuitive findings, and applied trade-offs. | [📖 Docs](docs/paper-analysis-questions.md) |
| 🔥 **[`grilling`](skills/grilling/SKILL.md)** | Design Interviews (`/grill-me`) | Stress-tests plans and decisions through chat-native frontier rounds (`❓ **Q1**` / `➡️` recommendations), looking up codebase facts automatically and connecting settled decisions to `domain-modeling` and `handoff`. | [📖 Docs](docs/grilling.md) |
| 🤝 **[`handoff`](skills/handoff/SKILL.md)** | Session Continuity | Compacts long conversations into kebab-case `handoff-<topic>.md` transfer briefs with redacted secrets, suggested skills, link-only chat summaries, and confirmation-gated cleanup once merged. | [📖 Docs](docs/handoff.md) |
| 🧪 **[`tdd`](skills/tdd/SKILL.md)** | Test-Driven Development | Drives test-first development in vertical red-to-green slices at pre-agreed public seams with Cartesian coverage for simultaneous options, plus dedicated [good/bad test examples](skills/tdd/tests.md) and [mocking guidelines](skills/tdd/mocking.md). | [📖 Docs](docs/tdd.md) |
| 🧩 **[`domain-modeling`](skills/domain-modeling/SKILL.md)** | Ubiquitous Language & ADRs | Actively sharpens project terminology inline in `GLOSSARY.md` (free of implementation details) and records ADRs in `docs/adr/` only for hard-to-reverse, non-obvious trade-offs. | [📖 Docs](docs/domain-modeling.md) |

---

## 📦 Installation

### ⚡ Universal Installer (`npx skills`)

Install all editable skills directly into your project:

```bash
npx skills@latest add zaymuel/skills
```

✅ If it succeeds, jump straight into [Common Questions](#-common-questions) to explore the design trade-offs behind each skill :)

🎯 To pick only specific skills to install, browse [skills.sh/zaymuel/skills](https://www.skills.sh/zaymuel/skills).


> [!TIP]
> If `npx skills` doesn't work in your environment, try the direct agent prompt, copy-and-paste selected skills, or the per-agent setup guide on the [installation guide](docs/INSTALL.md). It also covers the `SessionStart` update-check hook setup (including Codex `/hooks` approval).

---

## ❓ Common Questions

Critical design questions probing each skill's core trade-off, with answers in [`docs/`](docs/):

1. 🕵️ **[`anti-prompt-injection`](skills/anti-prompt-injection/SKILL.md)**: *Why compare a document's extracted text layer against its visual rendering and halt to quote suspicious strings in an inert code block, rather than silently stripping hidden instructions and continuing?* -> [Read Answer](docs/anti-prompt-injection.md#-common-questions--design-rationale)
2. 💻 **[`terminal-enforcer`](skills/terminal-enforcer/SKILL.md)**: *If chaining shell commands with `;` or piping `git` into PowerShell reduces turn count, why forbid cross-binary pipelines and require separate parallel tool calls alongside a 1-2 line cap on `python -c`?* -> [Read Answer](docs/terminal-enforcer.md#-common-questions--design-rationale)
3. 🗂️ **[`workspace-enforcer`](skills/workspace-enforcer/SKILL.md)**:
   * **Clean Root & Drafts**: *Why keep the project root strictly clean while quarantining exploratory scripts into single sequential files (`01_<topic>.py`) edited in place?* -> [Read Answer](docs/workspace-enforcer.md#clean-root-and-single-file-drafts)
   * **Privacy**: *Why pair mandatory path anonymization (`C:\Users\username\...`) with placing personal and local maintainer exclusions in `.git/info/exclude` instead of `.gitignore`?* -> [Read Answer](docs/workspace-enforcer.md#privacy-via-path-anonymization-and-local-git-excludes)
4. 🔄 **[`stumble-learning`](skills/stumble-learning/SKILL.md)**: *Why separate `errors.md` from `AGENTS.md` behind a verification gate instead of appending fixes directly to the global prompt?* -> [Read Answer](docs/stumble-learning.md#-common-questions--design-rationale)
5. 🧹 **[`code-maintainability-formatter`](skills/code-maintainability-formatter/SKILL.md)**: *When writing Python with an aggressive `autopep8 -aa` mindset, why must ORM filter expressions intentionally violate `E711` (`x == None` with `# noqa: E711`), and why pair "why" comments with structural "what" comments on nested data?* -> [Read Answer](docs/code-maintainability-formatter.md#-common-questions--design-rationale)
6. 🗺️ **[`map-crafting`](skills/map-crafting/SKILL.md)**: *Why does `map-crafting` mark ineligible spatial data as `NaN`/`None` instead of assuming `0`, and how does it prevent distorted bins and visual misinterpretation?* -> [Read Answer](docs/map-crafting.md#-common-questions--design-rationale)
7. 📄 **[`paper-analysis-questions`](skills/paper-analysis-questions/SKILL.md)**: *Why do closed-form dichotomies and cross-paper tension prompts produce deeper technical critiques than open-ended section summaries?* -> [Read Answer](docs/paper-analysis-questions.md#-common-questions--design-rationale)
8. 🔥 **[`grilling`](skills/grilling/SKILL.md)**: *Why ask the entire decision frontier in chat-native rounds with recommended answers instead of asking one question at a time or using UI popup buttons?* -> [Read Answer](docs/grilling.md#-common-questions--design-rationale)
9. 🤝 **[`handoff`](skills/handoff/SKILL.md)**: *Why require kebab-case topic filenames and confirmation-gated cleanup instead of reusing one generic `handoff.md` or silently deleting consumed handoffs?* -> [Read Answer](docs/handoff.md#-common-questions--design-rationale)
10. 🧩 **[`domain-modeling`](skills/domain-modeling/SKILL.md)**: *Why keep `GLOSSARY.md` completely devoid of implementation details and gate ADRs behind three strict criteria?* -> [Read Answer](docs/domain-modeling.md#-common-questions--design-rationale)
11. 🧪 **[`tdd`](skills/tdd/SKILL.md)**: *Why work in vertical slices at pre-agreed public seams instead of writing all tests first (horizontal slicing) against internal helpers?* -> [Read Answer](docs/tdd.md#-common-questions--design-rationale)

---

## 📁 Repository Structure

```text
zaymuel/skills/
├── .antigravity-plugin/                            <-- Google Antigravity plugin manifest
├── .claude-plugin/                                 <-- Claude Code plugin & marketplace manifests
├── .codex-plugin/                                  <-- OpenAI Codex plugin manifest
├── .github/workflows/                              <-- Release version-sync GitHub Action
├── LICENSE                                         <-- MIT License
├── README.md                                       <-- Installation guide & skill catalog
├── package.json                                    <-- Package metadata & maintenance scripts
├── hooks.json                                      <-- Antigravity SessionStart update-check hook
├── hooks/                                          <-- Claude Code SessionStart update-check hook
├── scripts/                                        <-- Version sync & update-check helper scripts
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

* 💡 **Skill Repository Structure & Cross-Agent Packaging Inspiration**: Inspired by [anthropics/skills](https://github.com/anthropics/skills), [mattpocock/skills](https://github.com/mattpocock/skills), and [affaan-m/ECC](https://github.com/affaan-m/ECC). I also personally recommend them!
* ✨ **Original Custom Skills**: Copyright (c) 2026 [zaymuel](https://github.com/zaymuel) (`terminal-enforcer`, `workspace-enforcer`, `stumble-learning`, `code-maintainability-formatter`, `map-crafting`, `paper-analysis-questions`).
* 🔧 **Adapted & Modified Community Skills** (modifications Copyright (c) 2026 [zaymuel](https://github.com/zaymuel)):
  * **Matt Pocock** ([`mattpocock/skills`](https://github.com/mattpocock/skills), `v1.3.2`, MIT License):
    * [`domain-modeling`](skills/domain-modeling/CREDITS.md)
    * [`grilling`](skills/grilling/CREDITS.md)
    * [`handoff`](skills/handoff/CREDITS.md)
    * [`tdd`](skills/tdd/CREDITS.md)
  * **Yaklang** ([`yaklang/hack-skills`](https://github.com/yaklang/hack-skills), MIT License):
    * [`anti-prompt-injection`](skills/anti-prompt-injection/CREDITS.md) (adapted and inverted from [`llm-prompt-injection`](https://www.skills.sh/yaklang/hack-skills/llm-prompt-injection))
