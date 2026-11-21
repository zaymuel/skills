# 📄 Paper Analysis Questions (`paper-analysis-questions`)

| | Quick Links |
| :---: | :--- |
| 🏠 | [Back to README](../README.md) |
| 📄 | [Skill Specification (`SKILL.md`)](../skills/paper-analysis-questions/SKILL.md) |

Generates a progressive set of 6 to 9 high-rigor critical analysis questions from academic papers, research articles, and technical reports to structure deep reading, critiques, or analytical reports.

---

## 🎯 When It Activates

* 📚 The user uploads or shares one or more academic papers, articles, or technical reports and asks for guided questions to structure a report or literature review.
* 🔬 The user wants to stress-test a study's methodology, metrics, assumptions, or conclusions through structured questioning.
* 🎓 The user asks for discussion prompts, study questions, or an analytical framework to dissect technical literature.

---

## 🧭 Five Analytical Axes

After auditing the source material for metrics, sample sizes, modeling assumptions, reported limitations, and cross-paper tensions, the skill distributes 6 to 9 numbered questions along a progressive arc:

1. **📏 Limits of Metrics and Indicators**: Probes whether a single quantitative metric or proxy captures a complex underlying phenomenon, or identifies conditions where two metrics diverge.
2. **🧩 Conceptual Distinctions and Relationships**: Tests the boundary between commonly conflated terms or asks the reader to derive and interpret core theoretical or mathematical relationships.
3. **🧪 Methodological and Statistical Critique**: Interrogates experimental design choices such as arbitrary thresholds, small or imbalanced samples, confounding variables, broken independence assumptions, simplified models, or narrow benchmarks.
4. **⚙️ Mechanisms and Counterintuitive Findings**: Asks for causal explanations behind paradoxical results, unexpected failure modes, or non-obvious systemic dynamics.
5. **⚖️ Applied Trade-offs and Decision-Making**: Closes with operational, design, economic, or policy dilemmas where optimizing one objective penalizes another.

---

## ✍️ Question Framing Principles

* 🚫 **No Surface-Level Recall**: Avoids descriptive questions answerable by copying the abstract ("What is X?" or "Summarize section Y"); anchors every prompt to specific numbers, design choices, or tensions inside the body and limitations sections.
* ⚡ **Force Nuance via Closed-Form Provocations**: Frames questions as apparent dichotomies or adequacy challenges ("Does A imply B?", "Is X methodologically sufficient to establish Y?", "Should a system prioritize A or B?") so respondents must argue from evidence.
* 🔗 **Cross-Paper Synthesis**: When multiple papers are provided, crafts integrated questions that cross-reference frameworks, compare competing protocols, or connect one paper's limitation to another's mechanism.
* 🎯 **Tight, Single-Tension Phrasing**: Keeps each question to 1 or 2 direct sentences focused on a single core tension, matching the language of the user's prompt without unnecessary meta-commentary.

---

## ❓ Common Questions & Design Rationale

### Why do closed-form dichotomies and cross-paper tension prompts produce deeper technical critiques than open-ended section summaries?

1. **Eliminating Abstract Paraphrasing**: Open-ended prompts ("Summarize the methodology in Section 3" or "What are the limitations?") allow a reader or language model to pass by paraphrasing the authors' own abstract and limitation statements without verifying whether the empirical evidence actually supports the claim.
2. **Forcing Evidence-Backed Nuance via Dichotomies**: Framing a question as a sharp methodological tension or apparent dichotomy ("Does metric $A$ suffice to establish claim $B$ when sample condition $C$ holds, or does it confound $X$ with $Y$?") compels the analyst to reject both naive extremes, inspect the underlying equations and experimental constraints, and defend a nuanced position using concrete numbers from the text.
