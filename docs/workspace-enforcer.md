# 🗂️ Workspace Enforcer (`workspace-enforcer`)

| | Quick Links |
| :---: | :--- |
| 🏠 | [Back to README](../README.md) |
| 📄 | [Skill Specification (`SKILL.md`)](../skills/workspace-enforcer/SKILL.md) |

A repository governance skill that keeps codebases clean, portable, private, and well-documented across every AI-assisted engineering session.

---

## 🎯 When It Activates

This skill activates at the start of any coding, scripting, debugging, refactoring, or documentation task inside a tracked repository.

---

## 🧹 Core Governance Pillars

### 1. Workspace Quarantine & Directory Hygiene

All temporary scripts, probes, and scratch explorations are strictly quarantined inside `python-drafts/` (or `<language>-drafts/`) to keep the project root clean:

* 📁 **Clean Root Layout**: Reserves the project root strictly for permanent repository files (`README.md`, `requirements.txt`, `pyproject.toml`, tracked configs), while placing production modules in `scripts/` (or `src/`) and formal test suites in `tests/`.
* 🔢 **Sequential Single-File Drafts**: Exploratory scripts follow sequential naming (`01_<topic>.py`, `02_<topic>.py`) and are edited in place across iterations without spawning duplicate variants (`01a_`, `_v2`, `_backup`), preserving clean diffs and saving tokens.
* 🧹 **Ephemeral Handoff Cleanup**: Treats handoff transfer files (`handoff-*.md`) as temporary artifacts and asks the user for confirmation before removing them once merged into canonical documentation or code.
* 🚧 **Workspace Confinement**: Agents write, compile, and execute code exclusively inside the active project working directory, never in `/tmp`, `%TEMP%`, or hidden agent state folders.

### 2. Privacy, Anonymization & Git Safety

* 🕵️ **Mandatory Path Anonymization & Configuration Isolation**: Personal user profile paths are strictly forbidden in tests, docs, sample commands, and code (enforcing generic placeholders like `C:\Users\username\...` or `/home/username/...`), while machine-specific roots are isolated into untracked config files (`.env`, `settings.local.json`).
* 🙈 **`.gitignore` Privacy**: Personal folders, user-identifying directory names, local machine paths, and personal global-ignore setup commands are forbidden in tracked `.gitignore` files. Personal or local maintainer exclusions belong in `~/.gitignore_global` or `.git/info/exclude`.
* 🔒 **Security-First Git Staging & Review**: Autonomous Git write operations (`git commit`, `git add`, `git restore --staged`, `git reset`) are strictly forbidden. By default, the user reviews, stages, and commits all changes manually.

### 3. Workflow & Tooling Discipline

* ✅ **TODO-First Task Tracking (`TODO.md`)**: Every instruction, bugfix, or feature is logged as a pending item (`- [ ]`) in root `TODO.md` before modifying code (using 2-space indented subtasks for multi-step requests) and marked `[X]` upon completion. Selecting items from an in-document staging list automatically consumes and prunes them.
* 🛠️ **Canonical Entry Points & Modular Shell Commands**: Agents use native CLI entry points (`main.py`, `pytest`, official scripts) instead of throwaway wrapper runners, and keep Git and PowerShell strictly separate (never combining them on the same command line via `|`, `;`, `&&`, or `||`).
* 📋 **Hierarchical Link & Nested Summary Reporting**: Chat responses for created or modified files use a strict 2-level Markdown list (clickable file link on Level 1, 2-space indented change bullets on Level 2) without quoting or echoing file contents in chat.
* 📖 **Canonical Specifications Only**: Agents never probe internal session transcripts or telemetry logs (`transcript.jsonl`, `.system_generated/`) to infer rules, relying strictly on tracked docs (`AGENTS.md`, `docs/`, ADRs) and global skills.

### 4. Documentation Blueprint & Communication Standards

* 📐 **Canonical Architecture Blueprint (`docs/00_architecture_and_decisions.md`)**: Structures primary architecture docs into five distilled sections: Project Overview, Data Inventory, Consolidated Architectural Decision Matrix (`D1`..`Dn`), Module & Test Status Matrix, and an Annotated Repository Directory Tree.
* 📚 **Glossary Purity (`GLOSSARY.md`)**: Reserves `GLOSSARY.md` strictly for pure domain concepts, terminology definitions, abbreviations, and cross-references, keeping pipeline callouts and implementation details in architecture docs.
* ✍️ **Fresh Disk Read & Author Voice Preservation**: Always re-reads source files from disk before merging or editing, and preserves the author's punctuation style without introducing em-dashes.
* 💾 **Persistent Codification of Chat Decisions**: Immediately records architectural decisions, methodological clarifications, and domain terminology resolved in chat into their canonical repository docs (`docs/00_...`, `docs/01_...`, `GLOSSARY.md`, or ADRs).
* ❓ **Chat-Native Questions**: Asks clarifying or design questions directly in chat using numbered emoji prompts (`❓ **Q1**` / `➡️ <recommendation>`) instead of interactive UI question buttons.
* 📊 **Mermaid Diagrams for Complexity**: Uses native Mermaid fenced blocks (`flowchart`, `sequenceDiagram`, `stateDiagram-v2`, `erDiagram`, etc.) whenever workflows or architectures outgrow raw text or plain tables.
* 🔄 **Automatic Error-to-Rule Trigger**: Routes command failures, unexpected exceptions, and user corrections directly to [`stumble-learning`](stumble-learning.md).

---

## ❓ Common Questions & Design Rationale

### Clean Root and Single-File Drafts

*Why keep the project root strictly clean while quarantining exploratory scripts into single sequential files (`01_<topic>.py`) edited in place?*

1. **Keeping the Project Root Navigable**: Reserving the root strictly for permanent repository files (`README.md`, `pyproject.toml`, tracked configs) prevents throwaway probes from cluttering directory listings, risking accidental Git commits, or confusing automated tooling.
2. **Preventing Draft Proliferation and Token Bloat**: Without single-file discipline inside `python-drafts/`, agents frequently spawn `01a_test.py`, `01_test_v2.py`, and `01_test_backup.py` across debugging iterations. Editing `01_<topic>.py` in place preserves a linear Git/editor diff history, keeps scratch work organized by topic, and avoids re-reading redundant script variants into the context window.

### Privacy via Path Anonymization and Local Git Excludes

*Why pair mandatory path anonymization (`C:\Users\username\...`) with placing personal and local maintainer exclusions in `.git/info/exclude` instead of `.gitignore`?*

1. **Closing Both Halves of Personal Metadata Leakage**: Anonymizing paths across tests, docs, and code prevents leaking your OS username (`C:\Users\<actual_user>\...`), while keeping personal folders and local machine paths out of the tracked `.gitignore` prevents leaking private directory names or local folder taxonomy through repository metadata.
2. **Avoiding Downstream Agent Confusion**: Because `.gitignore` is committed and published, listing local maintainer files (`AGENTS.md`, `TODO.md`, `.agents/`) there exposes internal workflow clutter. Placing personal or maintainer exclusions in `.git/info/exclude` (or `~/.gitignore_global`) gives identical local Git-ignore behavior while keeping the published `.gitignore` strictly generic.
