---
name: workspace-enforcer
description: Enforces strict repository hygiene, draft script quarantine, workspace confinement, Git index protection, and TODO-first task tracking. Trigger on any coding, file creation, debugging, or repository management task.
---

# Workspace Enforcer: Repository Hygiene & Review Policy

## When to Use

Activate this skill at the start of any software engineering, scripting, debugging, or documentation task within a tracked repository.

## Core Directives

1. **DIRECTORY STRUCTURE & DRAFT QUARANTINE**
    - Reserve the project root strictly for permanent repository files (`README.md`, `requirements.txt`, `pyproject.toml`, tracked configs).
    - Place production modules in `scripts/` and formal test suites in `tests/`.
    - Quarantine all temporary scripts, scratch probes, debugging snippets, and ad-hoc runners inside `python-drafts/` (or `<language>-drafts/`, creating the directory if absent). Never place temporary files in the project root.
    - **Sequential Draft Naming (One File Per Topic)**: Name exploratory scripts sequentially in `python-drafts/` (`01_<topic>.py`, `02_<topic>.py`), inspecting the directory first to determine the next integer prefix. Edit each topic's file in place across iterations (never spawn duplicate variants such as `01a_`, `_v2`, or `_backup`) to preserve clean diffs and save tokens, incrementing the prefix only for a new topic.
    - **No Uncommitted / Draft References in Canonical Docs & ADRs**: Never reference untracked, gitignored, or uncommitted files (such as `python-drafts/`, scratch scripts, or local-only artifacts) inside ADRs, `README.md`, `GLOSSARY.md`, methodology documents, or other official tracked documentation; references to uncommitted drafts are permitted exclusively inside temporary session handoff files (`handoff-*.md`).
    - **Ephemeral Handoff Cleanup**: Treat handoff files (`handoff-*.md`) as temporary transfer artifacts; once a handoff is applied and merged into canonical documentation or code, notify the user and ask for explicit confirmation before removing the consumed handoff file.

2. **WORKSPACE CONFINEMENT & PATH PORTABILITY**
    - Write, modify, compile, and execute code exclusively within the active project working directory so all artifacts remain visible to the user.
    - Never create or execute files inside hidden agent state folders, system temp directories (`/tmp`, `%TEMP%`), or external user directories (such as `~/.gemini/` or `C:\.gemini\`).
    - Always use relative paths or dynamic path resolution instead of hardcoded absolute paths.
    - **Mandatory Path Anonymization**: Never hardcode personal user profile paths (`C:\Users\<actual_user>\...` or `/home/<actual_user>/...`) in tests, docs, or code. Use generic placeholders (`C:\Users\username\...` or `/home/username/...`).
    - **Configuration Isolation**: Isolate machine-specific roots and environment variables into untracked config files (`.env`, `settings.local.json`) rather than source or test files.
    - **`.gitignore` Privacy**: Keep tracked `.gitignore` files strictly scoped to generic project artifacts; place personal folders, user-identifying names, or machine-specific exclusions in `~/.gitignore_global` or `.git/info/exclude`.

3. **GIT INDEX PROTECTION (USER MANAGES STAGING)**
    - Never autonomously run `git commit`, `git add`, `git restore --staged`, `git reset`, or any command that mutates the Git index or commit history. By default, the user reviews, stages, and commits all changes manually. Only execute Git write operations when explicitly requested and approved by the user.

4. **CANONICAL SPECIFICATIONS ONLY (NO LOG PROBING)**
    - Never read, grep, or parse internal agent session logs, telemetry files, or conversation transcripts (`transcript.jsonl`, `.system_generated/`, internal brain directories) to infer rules or past state.
    - Rely exclusively on tracked repository documentation (`AGENTS.md`, `docs/`, and ADRs) or global configuration files (`GEMINI.md`, `SKILL.md`). If a constraint or architectural rule is ambiguous, ask the user directly for clarification, immediately codify the resolved decision in the project's ADRs or documentation, and propose creating or updating a skill when a reusable rule emerges.

5. **HIERARCHICAL ARTIFACT REPORTING (FILE LINK & NESTED SUMMARY)**
    - Format all file creations and modifications in chat using a strict 2-level Markdown list hierarchy:
        - **Level 1 (`*`):** Output exclusively the clickable Markdown file link (including `#L<start>-L<end>` line numbers only when editing an existing file).
        - **Level 2 (`  *`, 2-space indented):** List one or more concise bullet points describing what changed in that file. Never repeat the filename across multiple flat lines.
    - Strictly forbid quoting, blockquoting, or echoing any file contents, sections, lists, or code snippets, keeping all in-depth details strictly inside the file, to avoid redundancy and token bloat.

6. **CANONICAL ENTRY POINTS & MODULAR SHELL COMMANDS**
    - Never create temporary wrapper scripts to run pipeline steps or tests that are already supported by existing CLI entry points (`main.py`, `pytest`, package scripts). Use native CLI flags under user authorization.
    - Keep Git and PowerShell commands strictly separate: never combine `git` commands and PowerShell cmdlets on the same command line via pipes (`|`) or command separators (`;`, `&&`, `||`), and never use unquoted parenthesized subqueries or property wrappers (`(Get-Content ...)` or `(...).Lines`). Issue separate standalone `run_command` tool calls (in parallel when batching) or use native file-reading tools instead.

7. **TODO-FIRST TASK TRACKING**
    - Record every task or bugfix in the root `TODO.md` file (creating it if absent) before modifying code.
    - Use a single line (`- [ ] **Task Title:** Concise description`) for atomic tasks, or 2-space indented nested checkboxes (`␣␣- [ ] Sub-task`, where `␣` represents a literal space) under a bold parent (`- [ ] **Task Title:**`) for multi-step workflows, marking items `[X]` incrementally as completed.
    - **In-Document Staging & Backlog Consumption**: When an in-document staging list, candidate section, or review checklist is created for user evaluation, selecting and integrating specific items into target sections constitutes **consumption** of those items. Automatically prune or mark resolved the integrated items from the staging list, preserving strictly the unresolved / remaining candidate items for future evaluation (avoiding literalist duplication under phrases like "leave the rest untouched", where "the rest" semantically denotes the unmentioned/unselected list items).

8. **MERMAID DIAGRAMS FOR COMPLEXITY**
    - Whenever workflows, architectures, data pipelines, state transitions, or entity relationships become too complex or sprawling for raw text, ASCII art, or plain markdown tables, represent them using Mermaid fenced code blocks (`flowchart TD`, `flowchart LR`, `sequenceDiagram`, `stateDiagram-v2`, `classDiagram`, `erDiagram`, `gantt`, `pie`, and others), explicitly selecting whichever diagram type best fits each specific circumstance and ensuring clean native rendering in both the VS Code preview and on GitHub.

9. **CANONICAL ARCHITECTURE DOCUMENT BLUEPRINT (`docs/00_architecture_and_decisions.md`)**
    - Structure the repository's primary architecture document into five distilled sections:
        1. **Project Overview & Domain Context**: Core objective, guiding research/engineering question, and relative links to foundational specs, methodology (`docs/01_...`), and `GLOSSARY.md`.
        2. **Data Inventory & Critical Paths**: One subsection per primary input/dependency detailing relative path, size, temporal/spatial scope, operational kinematics, cache cleanup, and sanitization/deduplication invariants.
        3. **Consolidated Architectural Decision Matrix (`D1`..`Dn`)**: A 3-column table (`| Code | Component | Consolidated Architectural Decision |`) with sequential codes (`**D1**`..`**Dn**`), bold subsystem names, and a bold decision headline followed by technical rationale, parameters, and invariants.
        4. **Module & Test Status Matrix**: A 5-column table (`| Step | Script | Test | Status | Primary Outputs / Artifacts |`) linking each numbered pipeline stage (`00`..`0N`) to its production script, test suite, completion status, and generated artifacts.
        5. **Annotated Repository Directory Tree**: A fenced `text` tree (`├──` / `└──`) with inline `<--` role and Git-tracking annotations (`[versioned]` vs. `[ignored in Git]`), enforcing folder homogeneity (each directory contains either only files or only subdirectories, e.g., `data/00 raw/`, `data/01 processed cache/`, `data/02 results/`).

10. **GLOSSARY PURITY & DEFINITION DISCIPLINE (`GLOSSARY.md`)**
    - Reserve `GLOSSARY.md` strictly for pure domain concepts, terminology definitions, abbreviations, and cross-references.
    - Never paste pipeline documentation, implementation callouts, alerts (`[!NOTE]`, `[!IMPORTANT]`, `[!WARNING]`), API details, routine names, file paths, or methodological debates inside `GLOSSARY.md`.
    - All architecture decisions belong in `docs/00_architecture_and_decisions.md` (or `00_arquitetura_e_decisoes.md`), methodological formulations in `docs/01_methodology_...`, and technical dossiers in dedicated ADRs or topic docs.

11. **MANDATORY FAILURE LOGGING & RULE DISTILLATION LOOP (`stumble-learning` skill)**
    - Whenever a command execution fails, an unexpected exception/import error occurs, or the user points out a recurring mistake, trigger the `stumble-learning` skill to ask to bootstrap (or log sanitized summaries with exact locations in) `docs/agents/errors.md`, analyze structural patterns, and propose verified preventive rules for user-approved updates to `AGENTS.md` or global rules.

12. **LATEX SECTION TITLES WITH MATH (`\texorpdfstring`)**
    - In `.tex` headings (`\section`, `\subsection`, etc.), always wrap `$...$` in `\texorpdfstring{<TeX math>}{<plain-text>}` per [`code-maintainability-formatter/references/latex.md`](../code-maintainability-formatter/references/latex.md).

13. **FRESH DISK READ & AUTHOR VOICE PRESERVATION (NO EM-DASHES)**
    - Always re-read source Markdown, LaTeX, or text files from disk immediately before merging, refactoring, or converting them into another document so recent user edits are never lost to stale context memory.
    - Strictly preserve the user's exact arguments, numerical verifications, and punctuation style; never introduce em-dashes (`---` or `—`) into the user's prose (use commas, parentheses, or colons instead).

14. **PERSISTENT DOCUMENTATION OF CHAT DECISIONS & EXPLANATIONS**
    - Never leave architectural decisions, methodological clarifications, or diagnostic explanations trapped in ephemeral chat history; immediately codify them in their canonical repository doc so knowledge endures from generation to generation (Psalms 78:3-4):
        - **Architecture & Decisions:** `docs/00_architecture_and_decisions.md` or dedicated ADRs.
        - **Methodology & Modeling Rationale:** `docs/01_methodology_...` or topic docs.
        - **Domain Terminology:** `GLOSSARY.md` (pure definitions only).

15. **ASK QUESTIONS IN CHAT (NEVER USE `ask_question` UI BUTTONS)**
    - Never call the `ask_question` tool or present interactive UI question buttons, as they interfere with the user's workflow.
    - Write all clarifying or design questions directly in chat text using the [`grilling`](../grilling/SKILL.md) skill's numbered emoji format (`❓ **Q1**` / `➡️ <recommended answer>`, separated by horizontal rules, and worded so "yes" accepts your recommendation):

        ```markdown
        ❓ **Q1** - **<question title>**: <question body, including numbered or lettered options when applicable>

        ➡️ <your recommended answer>
        ```


16. **TEST-DRIVEN VERIFICATION & CARTESIAN COVERAGE ([`tdd`](../tdd/SKILL.md) skill)**
    - Whenever creating or modifying formal tests (`tests/`), building features test-first, or writing regression tests for bugfixes, load and follow [`tdd`](../tdd/SKILL.md): confirm public seams before writing tests, work in vertical red-to-green slices against public interfaces, and parameterize over Cartesian combinations when a seam accepts multiple simultaneous options.
