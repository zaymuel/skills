# 📦 Agent-Specific Installation Guide

| | Quick Links |
| :---: | :--- |
| 🏠 | [Back to README](../README.md) |
| ⚡ | [Universal Installer (`npx skills`)](#-universal-installer-npx-skills) |
| 💬 | [Direct Prompt Install](#-direct-prompt-ask-your-agent-to-install-the-whole-suite) |
| 📋 | [Selected Skills (Copy & Paste)](#-installing-selected-skills-only-copy--paste) |
| 🤖 | [Claude Code](#-claude-code) |
| 🧠 | [OpenAI Codex (Codex CLI)](#-openai-codex-codex-cli) |
| 💎 | [Gemini CLI & Google Antigravity](#-gemini-cli--google-antigravity) |
| 🔄 | [Automatic Update-Check Hooks](#-automatic-update-check-hooks) |

Detailed setup instructions for installing via `npx skills`, direct agent prompts, selective copy-and-paste, or per-agent plugin marketplaces, plus the bundled `SessionStart` update-check hooks.

---

## ⚡ Universal Installer (`npx skills`)

Works across Claude Code, OpenAI Codex, Gemini CLI, Cursor, and other `SKILL.md`-compatible agents by copying editable skill folders directly into your configuration:

```bash
npx skills@latest add zaymuel/skills
```

> [!NOTE]
> To pick only specific skills to install, browse [skills.sh/zaymuel/skills](https://www.skills.sh/zaymuel/skills) or pass `--skill`:
>
> ```bash
> npx skills add https://github.com/zaymuel/skills --skill handoff
> ```

---

## 💬 Direct Prompt: Ask Your Agent to Install the Whole Suite

Paste a prompt with this repository's link directly into your AI coding agent:

```text
Install the skills from https://github.com/zaymuel/skills into my skills directory.
```

> [!WARNING]
> If your agent cannot fetch GitHub links automatically, use the copy-and-paste steps below or the per-agent options further down.

---

## 📋 Installing Selected Skills Only (Copy & Paste)

Want only specific modules, or using an agent that cannot fetch GitHub URLs directly? Install any individual skill in 3 steps:

1. **Access the skill**: Open the skill's `SKILL.md` link from the [Included Skills](../README.md#-included-skills) table in the README (for example, [`stumble-learning/SKILL.md`](../skills/stumble-learning/SKILL.md)).
2. **Copy the raw file**: Click GitHub's **Copy raw file** button (or copy the full `SKILL.md` text, including the text between `---`).
3. **Paste into your agent**: Paste the copied content into your agent chat:

```text
Please save this as a skill:

<paste SKILL.md content here>
```

*(If a skill includes a `references/` folder, such as [`code-maintainability-formatter`](../skills/code-maintainability-formatter/SKILL.md), repeat the same steps for any reference files you need.)*

---

## 🤖 Claude Code

**Via Plugin Marketplace (Recommended):**

```bash
/plugin marketplace add https://github.com/zaymuel/skills
/plugin install zaymuel-skills@zaymuel
```

**Manual Installation (Global or Project Scope):**

Clone this repository and copy the desired skill folders into `~/.claude/skills/` (global) or `.claude/skills/` (project-scoped):

```bash
git clone https://github.com/zaymuel/skills.git temp-skills
mkdir -p ~/.claude/skills
cp -r temp-skills/skills/* ~/.claude/skills/
rm -rf temp-skills
```

---

## 🧠 OpenAI Codex (Codex CLI)

**Via Plugin Marketplace:**

```bash
codex plugin marketplace add zaymuel/skills
codex plugin add zaymuel-skills@zaymuel
```

**Manual Installation:**

Copy the skills into your global Codex skills directory (`~/.codex/skills/`) or into your project's `skills/` directory (or point `CODEX_SKILLS_DIR` to the cloned `skills/` folder):

```bash
git clone https://github.com/zaymuel/skills.git temp-skills
mkdir -p ~/.codex/skills
cp -r temp-skills/skills/* ~/.codex/skills/
rm -rf temp-skills
```

> [!NOTE]
> **Codex Hook Trust:** OpenAI Codex treats plugin-bundled hooks (`hooks/hooks.json`) as non-managed hooks. Approve the `SessionStart` update-check hook once via `/hooks` (or Codex desktop settings) to enable automatic update notifications.

---

## 💎 Gemini CLI & Google Antigravity

**Via Gemini CLI:**

```bash
gemini skills install https://github.com/zaymuel/skills.git
```

**Manual Plugin Installation (Google Antigravity / Gemini CLI):**

Clone directly into your user plugins directory (`~/.gemini/config/plugins/zaymuel-skills` on macOS/Linux, or `C:\Users\username\.gemini\config\plugins\zaymuel-skills` on Windows, replacing `username` with your Windows username):

```powershell
git clone https://github.com/zaymuel/skills.git "C:\Users\username\.gemini\config\plugins\zaymuel-skills"
```

---

## 🔄 Automatic Update-Check Hooks

When installed as a plugin, this repository includes a lightweight `SessionStart` hook ([`scripts/check-updates.mjs`](../scripts/check-updates.mjs)) that checks GitHub for newer `package.json` versions (with a 3-second timeout and silent offline fallback) and notifies you if an update is available:

* **Google Antigravity**: Loads [`hooks.json`](../hooks.json) from the plugin root automatically on session start.
* **Claude Code & OpenAI Codex**: Both load [`hooks/hooks.json`](../hooks/hooks.json) and substitute `${CLAUDE_PLUGIN_ROOT}` directly before running the command. Keeping `"${CLAUDE_PLUGIN_ROOT}/scripts/check-updates.mjs"` (rather than bash `${CLAUDE_PLUGIN_ROOT:-$CODEX_PLUGIN_ROOT}` fallback syntax) ensures cross-OS compatibility on Windows where `cmd.exe` does not evaluate bash `:-` fallbacks.
* **Codex Approval**: Approve the plugin hook once in Codex via `/hooks` (or settings) so Codex allows the `SessionStart` check to run.
