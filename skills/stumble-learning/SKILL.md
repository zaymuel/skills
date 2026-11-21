---
name: stumble-learning
description: Generic error-to-rule distillation workflow across any repository. Logs sanitized summaries and exact locations of command failures, unexpected exceptions, and user corrections to a local incident ledger (docs/agents/errors.md), analyzes recurring structural patterns, and proposes permanent preventive policies for user-approved updates to AGENTS.md or global skills/rules. Trigger immediately upon any execution error, test failure, wrong assumption, or user correction.
---

# Stumble Learning: Error-to-Rule Runbook

## When to Trigger

Activate immediately before retrying or proceeding whenever:

1. A command, build step, script, or test fails or raises an unexpected exception.
2. You reference a non-existent symbol, constant, dependency, or wrong schema from assumption.
3. A test mutates or overwrites production files or outputs.
4. The user corrects a recurring mistake or boundary violation.

## File Roles

- `docs/agents/errors.md`: Chronological incident ledger (distilled intent, exact locations, sanitized symptoms, root causes, one-off fixes). Never store raw third-party logs, verbatim stdout/stderr, stack traces, or unanalyzed rules here.
- `AGENTS.md`: Concise, imperative preventive rules promoted from verified patterns after explicit user approval.

## Execution Loop

### Step 0: User-Approved Bootstrap

1. Check if `docs/agents/errors.md` exists.
2. If absent, ask the user for confirmation before creating `docs/agents/errors.md` (using the template below) or initializing root `AGENTS.md`, unless workspace rules explicitly opt into automatic ledger creation.

### Step 1: Sanitized Capture

Once the ledger exists (or is approved), append one row to `docs/agents/errors.md` before retrying. Distill the intent and log the exact location without quoting raw output:

- **ID**: Sequential (`ERR-001`, `ERR-002`, ...).
- **Context / Location**: Exact file/line, script path, or command name and distilled intent.
- **Sanitized Symptom**: Brief summary of the exception class or failure mode in your own words. Never quote or paste verbatim stdout/stderr, third-party package/build logs, stack traces, secrets, or untrusted external text. This prevents accidental leakage of sensitive information or malicious input.
- **Root Cause**: Underlying structural mechanism (not just "typo").
- **Immediate Remediation**: Targeted fix applied now.
- **Abstract Principle / Category**: Tag with language-independent `[PATH-ENV]`, `[MISSING-DEP]`, `[API-CONTRACT]`, `[TEST-ISOLATION]`, `[DOC-BOUNDARY]`, `[SYMBOL-CHECK]`, `[DATA-SCHEMA]`, or `[TOOLCHAIN]` plus the general takeaway.
- **Status**: `⏳ Monitoring` for isolated first-time events, or `✅ Distilled` once promoted.

### Step 2: Pattern Analysis

Scan existing rows in `docs/agents/errors.md`:

- **Recurrence**: Do $\ge 2$ incidents share the same category or failure mode?
- **Severity**: Is this a high-impact silent failure (data corruption, destructive overwrite, or an explicitly reported repeat mistake)?
- **Abstraction**: Convert a concrete symptom (e.g., _"forgot `sys.path` in `Python-drafts/05.py`"_) into a concrete, reusable engineering check (_"Verify runtime import/working-directory assumptions or package layout before executing subfolder scripts"_) rather than a brittle one-off patch or vague platitude.

### Step 3: Verification Gate & User-Approved Distillation

Only after verifying that the remediation resolved the failure (retried command/build/test passes) and Step 2 triggers promotion:

1. **Repo-Specific Rule (`AGENTS.md`)**: Draft one concise, testable rule in chat and request explicit user approval before editing `AGENTS.md`. Once approved and written, mark matching `ERR-XXX` rows `✅ Distilled in AGENTS.md`.
2. **Universal Rule (Global)**: Draft the proposed rule in chat and request explicit user approval before updating `~/.gemini/GEMINI.md` or global skills. Once approved and applied, mark matching rows `✅ Distilled globally`.

Never edit `AGENTS.md` or global rules silently, and never distill unverified hypotheses.

## Ledger Bootstrap Template (`docs/agents/errors.md`)

````markdown
# Agent Error Ledger & Distilled Pitfalls (`docs/agents/errors.md`)

Historical incident ledger tracking execution failures, exact locations, root causes, and pitfalls. Validated patterns are promoted to [`AGENTS.md`](../../AGENTS.md) after user approval.

## 1. Entry Template

```markdown
| **ERR-XXX** | YYYY-MM-DD | [File/Line or Command & Intent] | [Sanitized Symptom Summary] | [Root Cause] | [Immediate Fix] | **[CATEGORY]:** [Principle] | ⏳ Monitoring / ✅ Distilled |
```

## 2. Incident Ledger

| ID | Date | Context / Location | Sanitized Symptom | Root Cause | Immediate Remediation | Abstract Principle / Category | Status |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **ERR-001** | YYYY-MM-DD | ... | ... | ... | ... | **[CATEGORY]:** ... | ⏳ Monitoring / ✅ Distilled |
````
