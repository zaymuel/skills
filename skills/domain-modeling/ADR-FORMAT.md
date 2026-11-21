# ADR Format

ADRs live in `docs/adr/` and use sequential numbering: `0001-slug.md`, `0002-slug.md`, etc.

Create the `docs/adr/` directory lazily: only when the first ADR is needed.

## Template

```md
# {Short title of the decision}

{1-3 sentences: what's the context, what did we decide, and why.}
```

That's it. An ADR can be a single paragraph. The value is in recording *that* a decision was made and *why*, not in filling out sections.

## Optional sections

Only include these when they add genuine value. Most ADRs won't need them.

- **Status** frontmatter (`proposed | accepted | deprecated | superseded by ADR-NNNN`): useful when decisions are revisited
- **Considered Options**: only when the rejected alternatives are worth remembering
- **Consequences**: only when non-obvious downstream effects need to be called out

## Numbering

Scan `docs/adr/` for the highest existing number and increment by one.

## When to offer an ADR

All three of these must be true:

1. **Hard to reverse**: the cost of changing your mind later is meaningful
2. **Surprising without context**: a future reader will look at the code and wonder "why on earth did they do it this way?"
3. **The result of a real trade-off**: there were genuine alternatives and you picked one for specific reasons

If a decision is easy to reverse, skip it: you'll just reverse it. If it's not surprising, nobody will wonder why. If there was no real alternative, there's nothing to record beyond "we did the obvious thing."

### What qualifies

- **Architectural shape.** "We're using a monorepo." "The write model is event-sourced, the read model is projected into Postgres."
- **Integration patterns between contexts.** "Ordering and Billing communicate via domain events, not synchronous HTTP."
- **Technology choices that carry lock-in.** Database, message bus, auth provider, deployment target. Not every library: just the ones that would take a quarter to swap out.
- **Boundary and scope decisions.** "Customer data is owned by the Customer context; other contexts reference it by ID only." The explicit no-s are as valuable as the yes-s.
- **Deliberate deviations from the obvious path.** "We're using manual SQL instead of an ORM because X." Anything where a reasonable reader would assume the opposite. These stop the next engineer from "fixing" something that was deliberate.
- **Constraints not visible in the code.** "We can't use AWS because of compliance requirements." "Response times must be under 200ms because of the partner API contract."
- **Rejected alternatives when the rejection is non-obvious.** If you considered GraphQL and picked REST for subtle reasons, record it; otherwise someone will suggest GraphQL again in six months.

## Canonical Architecture Document Blueprint (`docs/00_architecture_and_decisions.md`)

When creating or maintaining a central architecture and decisions document (`docs/00_architecture_and_decisions.md` or `docs/00_arquitetura_e_decisoes.md`), structure it into five core sections:

1. **Project Overview & Context**: Bullet points stating the objective, primary research/engineering question, and relative links to the methodology doc (`docs/01_...`), base specification, and root `GLOSSARY.md`.
2. **Data Inventory & Critical Paths**: Subsections (`2.1`, `2.2`, ...) per dataset or external source listing relative location, size, coverage/validity, operational parameters, cache lifecycle, and data-hygiene/deduplication rules.
3. **Consolidated Architectural Decision Matrix (`D1` to `Dn`)**: A 3-column synthesis table indexing every major architectural, methodological, and engineering decision:

   ```md
   | Code | Component | Consolidated Architectural Decision |
   | :--- | :--- | :--- |
   | **D1** | **Subsystem / Scope** | **Short Decision Headline:** Concise technical specification, parameters, trade-offs, and invariants. |
   ```

4. **Module & Test Status Matrix**: A 5-column traceability table mapping each numbered pipeline stage to its code, tests, status, and concrete outputs:

   ```md
   | Step | Script | Test | Status | Primary Outputs / Artifacts |
   | --- | --- | --- | --- | --- |
   | **00** | [scripts/config.py](../scripts/config.py) | [tests/test_00_config.py](../tests/test_00_config.py) | ✅ Completed | Path resolution, operational parameters, and CRS |
   ```

5. **Annotated Repository Directory Tree**: A fenced `text` block illustrating the full repository hierarchy (`├──` / `└──`) with aligned `<--` comments specifying each path's responsibility and Git versioning policy (`[versioned]` vs. `[ignored in Git]`), keeping directories homogeneous (all-folders or all-files, e.g., `00 raw/`, `01 processed cache/`, `02 results/`).
