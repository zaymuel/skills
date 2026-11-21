# 🧹 Code Maintainability Formatter (`code-maintainability-formatter`)

| | Quick Links |
| :---: | :--- |
| 🏠 | [Back to README](../README.md) |
| 📄 | [Skill Specification (`SKILL.md`)](../skills/code-maintainability-formatter/SKILL.md) |
| 🐍 | [Python Reference (`references/python.md`)](../skills/code-maintainability-formatter/references/python.md) |
| 📝 | [LaTeX Reference (`references/latex.md`)](../skills/code-maintainability-formatter/references/latex.md) |

Guides coding agents to write code and technical manuscripts that natively conform to formatter and linter standards from the first draft, paired with high-signal comments for both human engineers and AI agents.

---

## 🎯 When It Activates

* 🐍 Writing, refactoring, reviewing, or formatting Python modules, scripts, or test suites.
* 📝 Authoring or cleaning up LaTeX (`.tex`) manuscripts, academic reports, or technical papers.
* 🔧 Standardizing or documenting code in any programming language (JavaScript/TypeScript, Go, Rust, C/C++, Java/Kotlin) for long-term human and AI maintainability.

---

## 🛠️ Core Workflow

### 1. Documentation-Driven First Draft

* 📖 **Read Project Conventions First**: Inspects `README.md`, architecture docs, `pyproject.toml`, linter configs, and official library docs before writing code so new modules match existing patterns and never invent APIs.
* 🔗 **Traceable Implementation**: References source specifications or methodology docs directly inside module and function docstrings.

### 2. Formatter & Linter Mentality by Language

Dedicated language reference guides live in `skills/code-maintainability-formatter/references/`:

* 🐍 **[Python (`references/python.md`)](../skills/code-maintainability-formatter/references/python.md)**: Targets zero-diff compliance with `autopep8 -aa` and PEP 8 from the first draft:
  * Hanging-delimiter multiline wrapping for long calls, indexing expressions, and chained pipelines (with trailing commas for clean diffs).
  * Idiomatic linter rules: `is None` (`E711`, with `# noqa: E711` explicitly preserved for SQLAlchemy/ORM `== None` queries), truthiness (`E712`), `isinstance()` (`E721`), `def` over lambda assignment (`E731`), and explicit exception classes (`E722`).
  * Cross-platform `pathlib.Path`, explicit `encoding="utf-8"` file context managers, and complete `typing` annotations.
* 📝 **[LaTeX (`references/latex.md`)](../skills/code-maintainability-formatter/references/latex.md)**: Targets `latexindent` and `chktex` compliance:
  * `\texorpdfstring{<math>}{<plain-text>}` in all section/heading titles containing math (`$...$`) to eliminate `hyperref` PDF bookmark warnings.
  * Non-breaking space ties (`~`) between cross-reference labels and numbers (`Figure~3`, `Section~\ref{...}`) and between numbers and units (`3.5~mm`).
  * Preamble hygiene (`footmisc` before `hyperref`, single-load package discipline, `\graphicspath`, `biblatex` + `biber`, IDE `% !TEX` / `% !BIB` magic directives, custom `.cls`/`.sty` inspection before adding packages, `\makecell` stacked table headers, and metadata macro isolation).
* 🌐 **Multi-Language Defaults**: Applies canonical formatters and linters across JS/TS (`prettier`/`eslint`), Go (`gofmt`/`golangci-lint`), Rust (`rustfmt`/`clippy`), C/C++ (`clang-format`), and Java/Kotlin (`google-java-format`/`ktlint`).

### 3. High-Signal "Why", "What" & Guardrail Commenting

* 🧠 **"Why" Comments (Intent & Trade-offs)**: Explains non-obvious business logic, edge cases, and design rationale rather than restating trivial syntax.
* 🧱 **"What" Comments (Structural Complexity)**: Explicitly documents deeply nested data structures (>2 levels), dense regexes, multi-clause comprehensions, loop/control block entries, and constant domain mappings.
* 🚧 **Agent Guardrail Comments (`# AGENT-NOTE:`)**: Calls out ordering invariants and runtime constraints that an AI agent cannot safely infer from syntax alone.

---

## ❓ Common Questions & Design Rationale

### When writing Python with an aggressive `autopep8 -aa` mindset, why must ORM filter expressions intentionally violate `E711` (`x == None` with `# noqa: E711`), and why pair "why" comments with structural "what" comments on nested data?

1. **Why Structural "What" Comments Matter for Agents and Humans**: Conventional style guides advise against "what" comments on trivial lines (`i += 1`), which is correct. However, deeply nested structures (`> 2` levels like `[[[]]]`), multi-clause regular expressions, and chained array transformations force readers and AI agents to mentally simulate intermediate tensor/list shapes. Annotating the dimensionality and domain meaning at those structural boundaries prevents indexing and shape bugs during future edits.
2. **Operator Overloading vs. Identity Checks (`E711`)**: In standard Python, `x is None` is mandatory because `is` tests object identity against the `None` singleton. However, ORMs and query builders (such as SQLAlchemy) overload the equality operator (`__eq__`) on column objects to compile `Column == None` into a SQL `IS NULL` expression, whereas `Column is None` evaluates immediately to the Python boolean `False`. Appending `# noqa: E711` prevents subsequent `autopep8 -aa` runs from silently breaking SQL queries.
