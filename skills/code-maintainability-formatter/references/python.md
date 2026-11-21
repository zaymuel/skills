# Python Formatting & Linter Specifications (`autopep8` & PEP 8)

## 1. Layout & Structural Standards

- **Indentation & Line Length:** Use 4 spaces per indentation level and cap lines at 79–100 characters (matching project config) using clean parenthesized line continuations rather than backslash continuations.
- **Hanging-Delimiter Multiline Wrapping (User Preferred Style):** Whenever a call, indexing expression, or chained pipeline has long or numerous arguments, leave the opening delimiter (`(`, `[`, or `{`) at the end of the first line, isolate the inner arguments/predicates on indented middle line(s) (with trailing commas on multiline sequences/calls for clean Git diffs), and close the delimiter on the bottom line (standalone or continuing the chain with `].method()` / `).method()`):

  ```python
  values = df.loc[
      row_mask, df.columns.isin(["a", "b", "c"])
  ].fillna(0.0).astype(float).to_numpy()
  ```
- **Vertical Whitespace:** Place 2 blank lines around top-level functions and classes, and 1 blank line between class methods.
- **Imports:** Group imports at the top of the file into three sections separated by a single blank line:
  1. Standard library imports
  2. Third-party library imports
  3. Local application/repository imports

## 2. Semantic `autopep8` (`-aa`) & Flake8 Rules

Write Python code that natively satisfies aggressive `autopep8` rules from the first draft:

- **Singleton Comparisons (`E711`):** Always use `is None` and `is not None` instead of `== None` or `!= None`.
  - **ORM Exception (SQLAlchemy / Custom `__eq__`):** When an ORM or query builder overloads `== None` to generate SQL `IS NULL` expressions, intentionally write `== None` and append `# noqa: E711` on that line so subsequent `autopep8 -aa` runs or linters do not break the query.
- **Boolean & Sequence Checks (`E712`):** Test truthiness idiomatically (`if items:`, `if not items:`, `if flag:`) instead of `if len(items) > 0:` or `if flag == True:`.
- **Type Comparisons (`E721`):** Always use `isinstance(obj, MyClass)` instead of `type(obj) == MyClass`.
- **Named Functions Over Lambda Assignments (`E731`):** Use a `def` statement instead of assigning a `lambda` expression to a variable.
- **Explicit Exceptions (`E722`):** Always catch specific exception classes (e.g., `ValueError`, `KeyError`, `FileNotFoundError`) rather than bare `except:`.
- **Cross-Platform Paths & UTF-8 Context Managers:** Prefer `pathlib.Path` over `os.path` string joining, and always specify `encoding="utf-8"` inside `with` file context managers (preventing Windows `cp1252` decoding failures).
- **Type Annotations:** Include explicit `typing` annotations on all function signatures, return values, and non-trivial data structures.
