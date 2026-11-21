---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

Write a handoff document summarising the current conversation so a fresh agent can continue the work.

When saving the handoff file, always use kebab-casing to append after the `handoff-` prefix a short summary of what the handoff is about (e.g., `handoff-auth-refactor.md`, `handoff-guardrail-architecture.md`). Save to the destination required by workspace policies (or temporary directory of the user's OS if unconstrained).

Include a "suggested skills" section in the document, naming which skills the next agent should call the Skill tool for.

Do not duplicate content already captured in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.

Once the handoff file is saved, never echo, quote, or reprint its contents or sections in the chat response; provide exclusively a clickable Markdown link to the created file (with line numbers only if an existing file was edited) and a brief one-line summary.

**Handoff Lifecycle & Cleanup**: Handoff documents are temporary session-transfer artifacts. Once you finish applying a handoff and integrating its tasks, findings, or architecture into the codebase or canonical documentation, let the user know the handoff has been merged and ask whether they would like to remove the consumed `handoff-*.md` file, unless workspace rules allow for automatic deletion of temporary artifacts.
