# LaTeX (`.tex`) Formatting & Maintainability Specifications

## 1. Canonical Tooling

- **Formatter & Linter:** Follow `latexindent` indentation conventions and `chktex` linting rules.

## 2. Mathematical Notation in Section & Heading Titles (`\texorpdfstring`)

- **Rule:** Whenever a sectioning, heading, or bookmark-generating command (`\part`, `\chapter`, `\section`, `\subsection`, `\subsubsection`, `\paragraph`) contains mathematical notation (`$...$`), **always** wrap the math expression in `\texorpdfstring{<TeX math>}{<plain-text PDF fallback>}`.
- **Why:** `hyperref` converts section titles into plain-text PDF bookmarks/outlines where math mode tokens (`$`, `_`, `^`, `\mathrm`, etc.) are invalid and trigger `Package hyperref Warning: Token not allowed in a PDF string`.
- **Example:**

  ```latex
  \subsection{Calibration for \texorpdfstring{$D_{AZ3} = 67\,\mathrm{mm}$}{DAZ3 = 67 mm}}
  ```

## 3. Non-Breaking Spaces (`~` Ties) for Labels, Cross-References & Units

- **Rule:** Always use a tilde (`~`) to insert a non-breaking space (tie) between cross-reference labels and their numbers/Commands (e.g., `Figure~3`, `Table~4`, `Section~\ref{sec:intro}`, `Equation~\eqref{eq:1}`) and between numerical values and their units in prose (e.g., `3.5~mm`, `100~Hz`).
- **Why:** The tilde (`~`) prevents a line break between the two elements it connects, stopping LaTeX from leaving `"Figure"` or `"3.5"` stranded at the end of one line and pushing `"3"` or `"mm"` to the start of the next. Keeping labels attached to their numbers and numerical values attached to their units is standard typographic practice (`chktex` Warning 12/13) to preserve visual clarity and readability.
- **Note on `siunitx`:** In larger technical manuscripts, the `siunitx` package (`\qty{3.5}{\milli\metre}` / `\SI{3.5}{\milli\metre}`) can automate unit spacing with thin non-breaking spaces, while `~` remains the standard built-in method in plain LaTeX.

## 4. Document Metadata Isolation (`\newcommand` Header Block)

- **Rule:** Declare all document-varying metadata (`\NOMEROTEIRO`, `\TEMA`, `\DATA`, `\LOCAL`, `\NOMEPROF`, `\NOMEMATERIA`, `\TURMA`, `\SEMESTRE`, `\FACULDADE`, `\DEPARTAMENTO`, and anonymized author/institution macros) via `\newcommand` at the very top of the `.tex` file before `\documentclass`.
- **Why:** Centralizing metadata variables at the top of the file allows reusing the `titlepage` and `\title` blocks across reports without hunting through layout code.

## 5. ABNT Page Geometry, Portuguese Typography & Smart Quotes

- **ABNT Margins:** For Brazilian academic/technical reports, use `\documentclass[12pt, a4paper]{article}` with `\usepackage{geometry}` configured to ABNT margins (`\geometry{a4paper, left=3cm, top=3cm, right=2cm, bottom=2cm}`).
- **Font, Encoding & Justification Stack:** Load `lmodern`, `[T1]{fontenc}`, `[utf8]{inputenc}`, `[brazil]{babel}`, `indentfirst`, `hyphenat`, and `microtype`.
- **Outer Double Quotes (`csquotes`):** Load `\usepackage[autostyle]{csquotes}` with `\MakeOuterQuote{"}` so standard `"..."` pairs automatically compile into proper localized typographic quotes without manual ` ``...'' ` (but these don't work well; prefer to use the regular ` ``...'' ` style for ABNT-compliant quotes in Portuguese).
- **Author Voice & No Em-Dashes (`---`):** Never introduce LaTeX em-dashes (`---`) or Unicode em-dashes (`—`) into user-authored academic prose during merges or rewrites; prefer commas, parentheses, or colons to preserve authentic human punctuation.

## 6. Package Load Ordering & Preamble Hygiene

- **`footmisc` Before `hyperref`:** Always load `\usepackage{footmisc}` **strictly before** `\usepackage[colorlinks=true]{hyperref}`; loading `footmisc` after `hyperref` breaks footnote hyperlink anchors.
- **Single-Load Discipline:** Load each package (such as `\usepackage{titlesec}`) only once in the preamble, grouping all `\titleformat{\section}` and `\titleformat{\subsection}` customizations beneath that single import.
- **Relative Graphics Root (`\graphicspath`):** Configure `\graphicspath{ {./images/} }` in the preamble so `\includegraphics{filename}` calls remain clean and relative without repeating directory prefixes.
- **Modern Bibliography (`biblatex` + `biber`):** Prefer `\usepackage[backend=biber, style=numeric, sorting=none]{biblatex}` with `\addbibresource{references.bib}` over legacy BibTeX.
- **IDE Magic Directives & Build Synchronization:** Place explicit magic comments on lines 1-2 of the root `.tex` file declaring the target engine (`% !TEX program = pdflatex | xelatex | lualatex`) and bibliography backend (`% !BIB program = biber | bibtex`), and synchronize `latexmkrc` when used, so IDEs and build runners invoke the exact toolchain required by the preamble rather than falling back to mismatched defaults or producing empty `.bbl` files.
- **Inspect Custom Classes (`.cls` / `.sty`) Before Adding Packages:** Before adding `\usepackage{...}` to a manuscript using a custom journal, conference, or institutional `.cls` or `.sty` template, inspect the class file first to check which packages, font stacks, and macros it already loads. This prevents duplicate imports, package option clashes (`Option clash for package ...`), and symbol redefinition errors (such as loading `amssymb` when the class already loads `newtxmath`, which redefines `\Bbbk`).

## 7. Mathematical, Physics & Solution Environments

- **Canonical Math & Physics Packages:** Use `amsmath, amsthm, amssymb`, `bm` (with `\DeclareRobustCommand{\uvec}[1]` for bold hat unit vectors `\bm{\hat{\mathbf{#1}}}`), `\usepackage[arrowdel]{physics}` (for differentials `\dd`, derivatives `\dv`, and vector calculus operators), `siunitx`, and `cancel`.
- **Exercise / Report Solution Environments:** Define dedicated `resposta` and `resolucao` environments backed by `amsthm`'s `proof` environment with a filled black square QED symbol (`\renewcommand\qedsymbol{$\blacksquare$}`).

## 8. Table Formatting & Stacked Column Headers (`\makecell`)

- **Rule:** When table column headers include parenthetical units, transformations, sample sizes, or test labels, load `\usepackage{makecell}` and use `\makecell[l]{...}` (left-aligned) or `\makecell{...}` (centered) with `\\` to break the secondary metadata onto a line directly beneath the bold column title.
- **Why:** Prevents wide tables from overflowing page margins (`Overfull \hbox`) while keeping headers compact, readable, and cleanly aligned without manual `p{...}` width tuning.
- **Example:**

  ```latex
  \makecell[l]{\textbf{Variável}\\(unidade / transformação)} & \makecell{\textbf{Tratados}\\($N=195$)} & \makecell{\textbf{Diferença}\\($t$-test)} \\
  ```
