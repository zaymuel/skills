---
name: terminal-enforcer
description: Enforces strict terminal command allowlists, read-only Git/PowerShell inspection rules, Python execution authorization gates, and pipeline isolation. Trigger before executing any shell, PowerShell, Git, or Python command.
---

# Terminal Enforcer: Command Execution & Pipeline Policy

## When to Use

Activate this skill before invoking any terminal command (`run_command`) across PowerShell, Git, or Python within a workspace.

## Core Directives

1. **SAFE FLAT-FILE INSPECTION (`cat`)**
    - Restrict `cat` strictly to simple filenames in the current working directory with `.txt`, `.md`, `.json`, or `.csv` extensions, avoiding directory paths or upward traversal (`../`).

2. **READ-ONLY GIT INSPECTION**
    - Use read-only Git inspection commands freely: `git status` (optionally with `--porcelain`, `--short`, `-s`, `-sb`, `-u`), `git log` (optionally with `--oneline`, `-n <num>`, `-S`, `-G`), `git blame` (with `-- <relative_path>`), `git branch` (optionally with `-a`, `-r`, `-v`, or `-vv`), `git diff` (optionally with `--staged`, `--cached`, `--stat`, `--name-only` followed by safe relative file paths or commit hashes), `git show` (permitting `-C` strictly before `show` for safe relative paths without upward traversal or absolute paths), `git ls-files`, and `git check-ignore`.
    - Never autonomously execute `git commit`, `git add`, `git reset`, or mutating Git commands unless explicitly requested and approved by the user.

3. **PYTHON EXECUTION (REQUIRES EXPLICIT USER AUTHORIZATION)**
    - **Authorization**: Never execute Python code automatically. Every execution MUST trigger the manual "Ask" prompt and await explicit user approval.
    - **Inline Python Scope (`python -c`)**: Inline Python (`python -c "..."`) is restricted strictly to 1–2 trivial lines. For anything beyond 1–2 trivial lines (such as data inspection, probing, multi-line logic, or exploratory scripts), always write the code to a file in `Python-drafts/` and invoke it via `python Python-drafts/<script>.py` under user authorization.
    - **Allowed Commands**: Once authorized, execute scripts strictly using one of the following exact patterns:
        - `python <filename>.py` (or with standard CLI flags/arguments, e.g., `python main.py --from-step 4 --log-scale`)
        - `python scripts/<filename>.py` (or `python "scripts/<filename>.py"` / `python "scripts\<filename>.py"`, optionally with CLI flags/arguments)
        - `python "Python-drafts/<filename>.py"` (or `python "Python-drafts\<filename>.py"`)
    - **Syntax Constraints**: `<filename>` may only contain alphanumeric characters, underscores (`_`), dots (`.`), or hyphens (`-`). Canonical CLI flags and options (e.g., `--from-step`, `--log-scale`, `-v`) are permitted for official entry points (`main.py` and `scripts/`). Never create wrapper draft scripts to circumvent CLI arguments.

4. **POWERSHELL INSPECTION CMDLETS**
    - Use read-only PowerShell inspection, filtering, and formatting cmdlets in exact PascalCase with safe relative paths: `Get-ChildItem`, `Get-Content`, `Get-Item`, `Compare-Object`, `Measure-Object`, `Select-String`, `Test-Path`, `Get-Command`, `Get-Help`, `Select-Object`, `Where-Object`, `Sort-Object`, `Format-Table`, and `Format-List`.

5. **ZERO-ARGUMENT UTILITIES (`pwd` & `Get-Process`)**
    - Execute `pwd` and `Get-Process` standalone (or pipe `Get-Process` into allowed PowerShell filter cmdlets), with no mutating flags.

6. **NETWORK DIAGNOSTICS (`ping`)**
    - Restrict `ping` to simple domain names or IP addresses without additional flags.

7. **PIPELINE & CHAINING VALIDATION (ALL-STAGE WHITELIST & TOOL SEPARATION)**
    - **All-Stage PowerShell Whitelist**: Chain or pipe commands using `|` ONLY IF every individual command segment in the pipeline is an allowed PowerShell cmdlet from Directive 4 above (e.g., `Get-ChildItem ... | Select-String ...` or `Get-Content ... | Measure-Object`).
    - **Never Mix Git and PowerShell on the Same Command Line**: Never combine `git` commands and PowerShell cmdlets on the same command line, whether via pipes (`|`) or command separators (`;`, `&&`, `||`) -- e.g., `git show ... | Select-String ...` or `Get-ChildItem ...; git status ...` are strictly forbidden. Execute `git` inspection commands and PowerShell cmdlets as separate standalone `run_command` tool calls (invoked in parallel when batching) or use native IDE search/read tools.
    - **No Unquoted Parenthesized Subqueries or Wrappers**: Never wrap pipelines in parenthesized property accessors (use `Get-Content README.md | Measure-Object -Line` instead of `(Get-Content README.md | Measure-Object -Line).Lines`) or pass parenthesized subqueries as arguments (`Compare-Object (Get-Content a.md) (Get-Content b.md)`).
    - **Destructive & Unlisted Command Gate**: If ANY segment in a pipeline or chained command (`|`, `;`, `&&`, `||`) contains an unlisted, state-modifying, or destructive command (`Remove-Item`, `Set-Content`, `Out-File`, `Move-Item`, `New-Item`, `Copy-Item`, `Rename-Item`, `Invoke-Expression`, `ForEach-Object`), the entire command line is forbidden from automatic execution and MUST trigger the manual "Ask" prompt (or use native IDE tools instead).
    - **Prohibited Operators**: Redirection operators (`>`, `>>`, `<`) and subexpressions (`$()`, `@()`, `()`) outside quoted regex patterns are strictly prohibited in auto-executed commands.
