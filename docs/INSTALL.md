# 📦 Agent-Specific Installation Guide

| | Quick Links |
| :---: | :--- |
| 🏠 | [Back to README](../README.md) |
| 🧩 | [Antigravity Manifest (`.antigravity-plugin/plugin.json`)](../.antigravity-plugin/plugin.json) |
| 🤖 | [Claude Code Manifest (`.claude-plugin/plugin.json`)](../.claude-plugin/plugin.json) |
| 🧠 | [Codex Manifest (`.codex-plugin/plugin.json`)](../.codex-plugin/plugin.json) |

Detailed setup instructions for each supported AI coding agent and for the bundled `SessionStart` update-check hooks. For quick copy-paste or prompt-based installation, see [Installation in README](../README.md#-installation).

---

## ⚡ Universal Installer (`npx skills`)

Works across Claude Code, OpenAI Codex, Gemini CLI, Cursor, and other `SKILL.md`-compatible agents by copying editable skill folders directly into your configuration:

```bash
npx skills@latest add zaymuel/skills
```

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
