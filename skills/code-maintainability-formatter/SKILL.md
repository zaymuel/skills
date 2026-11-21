---
name: code-maintainability-formatter
description: Write code and technical documents that natively adhere to language-specific formatting and linting standards (such as autopep8 and PEP 8 for Python, or latexindent and chktex for LaTeX .tex documents) from the first draft, write high-signal "why" and "what" comments (including nested data structures and complex expressions) for AI agent and human maintainability, and follow a documentation-driven workflow. Use when the user asks to write, refactor, format, document, or clean up code or LaTeX (.tex) manuscripts in Python or any other programming/markup language.
---

# Code Maintainability Formatter

## Summary

Guides the agent to write code that natively conforms to strict formatting and linting standards from the very first draft (specifically thinking in `autopep8` and PEP 8 rules for Python, and canonical formatter/linter conventions for other languages), combined with documentation-driven development and rich "why" and "what" commenting so human developers and AI agents can maintain the codebase safely.

## When to Use

- The user writes, refactors, reviews, or formats Python scripts or modules.
- The user asks to clean up, standardize, or document code in any programming language.
- The user wants code optimized for long-term maintainability by AI coding agents (such as Google Antigravity) and human engineers.
- The user asks to implement features drawing on project or library documentation.

## Steps

### 1. Draw on Documentation First

1. Read relevant project files (`README.md`, architecture docs, `pyproject.toml`, linter configs) and official library documentation before modifying code.
2. Identify existing conventions, type definitions, and architectural invariants so new code integrates cleanly without duplicating logic.
3. Explicitly reference the source documentation or specification in module or function docstrings when implementing documented workflows.

### 2. Write Code Natively with a Formatter and Linter Mentality

Load the matching language reference in `references/` whenever editing a language with dedicated rules:

- **Python (`.py`):** `autopep8` (`-aa`) and PEP 8 layout, idioms, and type hints — see [`references/python.md`](references/python.md).
- **LaTeX (`.tex`):** `latexindent` layout, `chktex` rules, non-breaking ties (`~`), and `hyperref`-safe `\texorpdfstring` section headings — see [`references/latex.md`](references/latex.md).
- **JavaScript / TypeScript:** `prettier` formatting and `eslint` best practices.
- **Go:** `gofmt` layout and `golangci-lint` idioms.
- **Rust:** `rustfmt` layout and `clippy` lint rules.
- **C / C++:** `clang-format` conventions.
- **Java / Kotlin:** `google-java-format` or `ktlint` conventions.

Follow idiomatic naming conventions, modular function design (single responsibility), explicit error handling, and strict typing across all languages.

### 3. Write Agent- and Human-Centric Maintainability Comments

1. **Module and File Headers:** Begin each file with a concise header block explaining the file's responsibility, its role in the broader architecture, and key dependencies.
2. **Docstrings / API Comments:** Add structured docstrings to every class, public function, and complex helper (e.g., Google-style or PEP 257 docstrings in Python, JSDoc in TypeScript, GoDoc in Go) detailing:
    - Purpose and behavior summary
    - Parameters, types, and valid ranges or constraints
    - Return values and types
    - Raised exceptions or error states
3. **"Why" Inline Comments (Intent & Decisions):** Write thorough inline comments explaining _why_ a decision was made, non-obvious edge cases, business logic rules, and performance trade-offs.
4. **"What" Inline Comments (Structural Clarity & Complex Constructs):** Explicitly include "what" inline comments whenever structural complexity or syntax requires mental unpacking:
    - **Deeply Nested Data Structures (more than 2 levels, e.g., `[[[]]]`):** Document the shape, hierarchy, or dimensions at each level, and clarify multi-dimensional index or key accesses.
    - **Complex Expressions & Multi-Part Patterns:** Break down dense expressions (such as regular expressions, nested comprehensions, bitwise operations, complex slicing, or chained pipelines) into readable sub-parts with inline comments explaining what each clause does.
    - **Control Block & Loop Entry:** Place a concise orienting comment on the first line inside loops or conditional blocks (especially when unpacking complex iterables) to state the immediate operation taking place.
    - **Constant Collections & Domain Mappings:** Annotate lists, tuples, or dictionaries of raw literals, thresholds, or configuration entries with inline comments and logical section headers so their domain meaning and structure are immediately clear.
5. **Agent Guardrail Comments:** Explicitly mark invariants and constraints that an AI agent cannot infer from the syntax alone (for example, `# AGENT-NOTE: Do not reorder these middleware calls; auth must precede rate-limiting, see tests/test_middleware.py`).

### 4. Synchronize Documentation and Self-Inspect

1. Update affected README sections, API docs, or inline docstrings whenever function signatures or behaviors change.
2. Mentally lint and inspect all generated code against `autopep8` and language-specific linter rules before outputting it so that if the user runs a formatter afterward, it produces zero or near-zero diffs.
3. **Architecture, Glossary & Mermaid Visualization:** When documentation updates involve complex workflows, pipelines, state transitions, architecture blueprints (ADRs or `docs/00_architecture_and_decisions.md`), or `GLOSSARY.md` definitions, load and follow [`workspace-enforcer`](../workspace-enforcer/SKILL.md) (Directives 8–10) to represent complex structures with Mermaid diagrams and preserve glossary purity.

## Gotchas

- Skip trivial "what" comments on flat, self-evident lines (such as `# increment i by 1` above `i += 1`), but ALWAYS include "what" comments on nested structures (more than 2 levels like `[[[]]]`), complex expressions, control block entries, and non-obvious constant collections. Also, on the first line inside loops, multi-line regex sub-clauses, hex/literal scales, categorized tuple lists, etc.
- When writing Python with an internalized `autopep8` mindset, use `x is None` (`E711`) by default, EXCEPT when custom `__eq__` methods overload `== None` (such as SQLAlchemy filter expressions). In those ORM cases, intentionally write `== None` and append `# noqa: E711` on that line so the user's local `autopep8` or linter setup will not break the query later.
- Never invent documentation references or library APIs. If documentation is missing for an external dependency, state clearly what could not be verified and inspect the source definitions first.
