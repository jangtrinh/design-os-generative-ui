# DESIGN:OS Generative UI (`design-os-generative-ui`)

**Stream-first interactive visual runtime for AI agents — 60fps `morphdom` DOM reconciliation, streaming HTML sanitizer, and WebGL/Canvas widget bridge.**

Render live-streaming interactive calculators, 3D scenes, charts, and explorable explanations inside Claude Artifacts, ChatGPT Canvas, Gemini, and custom agent webviews with zero flicker.

<p align="center">
  <img src="docs/images/cover.png" alt="DESIGN:OS Generative UI — 2:1 Axonometric Technical Architecture" width="840">
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-202020?style=flat-square&labelColor=202020&color=444444" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/Claude_Code_%C2%B7_Codex_%C2%B7_Gemini_%C2%B7_Antigravity-skill-202020?style=flat-square&labelColor=202020&color=444444" alt="Compatible agents">
  <a href="commands/doctor.md"><img src="https://img.shields.io/badge/diagnostics-%2Fdoctor-202020?style=flat-square&labelColor=202020&color=444444" alt="Doctor command"></a>
  <a href="https://jangtrinh.github.io/design-os-generative-ui/"><img src="https://img.shields.io/badge/live_docs-GitHub_Pages-202020?style=flat-square&labelColor=202020&color=444444" alt="Live GitHub Pages"></a>
  <a href="https://buymeacoffee.com/jangtrinh"><img src="https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=flat-square&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee"></a>
</p>

<p align="center">
  <a href="#quickstart">Quickstart</a> · <a href="#what-it-makes">What it makes</a> · <a href="#installation">Install</a> · <a href="#how-it-works">How it works</a> · <a href="#commands--diagnostics">Commands</a> · <a href="#quality-bar--limitations">Limits</a>
</p>

---

## Why this exists

Naively setting `innerHTML` on an LLM token stream causes severe layout thrashing, destroys active `<canvas>` / `<input>` state on every chunk, and opens XSS vectors. **`design-os-generative-ui`** provides a stream-healer, sanitizer, and 60fps `morphdom` reconciler (`createStreamRenderer` + `DesignOSBridge`) purpose-built for AI agent artifacts.

| Dimension | Generic AI / Manual Workflow | DESIGN:OS Generative UI (`DESIGN:OS`) |
| :--- | :--- | :--- |
| **Streaming DOM Updates** | `element.innerHTML = chunk` flashes white and resets inputs on every token | 60fps `morphdom` diffing that preserves `<canvas>`, WebGL, and focused input state |
| **Incomplete Tag Healing** | Broken layout while `<svg>` or `<table>` tags are mid-stream | Deterministic tag auto-healing and script execution deferral until stream completion |
| **Security & XSS** | Unsanitized LLM output executing inline `onerror=` payloads | Strict streaming sanitizer stripping dangerous attributes and untrusted scripts |
| **Host Communication** | Isolated iframes that cannot send user actions back to the agent | Bidirectional `DesignOSBridge` (`sendPrompt`, state sync, theme adaptation) |
| **Privacy & Telemetry** | Opaque cloud telemetry or unverified third-party APIs | **Zero telemetry** — 100% local execution ([`PRIVACY.md`](PRIVACY.md) audited) |

---

## Quickstart

### 1. Install the plugin or CLI

**In Claude Code:**

```text
/plugin marketplace add jangtrinh/design-os-generative-ui
/plugin install design-os-generative-ui@design-os-generative-ui
```

**Or from your terminal (Codex, Gemini CLI, Antigravity, OpenCode, or standalone CLI):**

```bash
git clone https://github.com/jangtrinh/design-os-generative-ui.git
cd design-os-generative-ui
npm test
```

### 2. Ask in plain English

Open your project in your AI coding agent and describe what you need:

> "Build a stream-safe interactive compound-interest and Monte Carlo simulator widget using DesignOSBridge and Chart.js."

> "Wrap our LLM token stream in createStreamRenderer so incomplete HTML tags reconcile at 60fps via morphdom without resetting canvas state."

> "Audit this generative UI widget against the DESIGN:OS interactive widget guidelines (zero raw emojis, dark-mode adaptive tokens, and XSS sanitization)."

### 3. Verify your setup

```bash
python3 scripts/self_check.py
```

---

## What it makes

Every deliverable produced by `design-os-generative-ui` is backed by a deterministic verification gate rather than freehand AI guesswork.

<p align="center">
  <img src="docs/images/cover.png" alt="DESIGN:OS Generative UI Output Specimen" width="840"><br>
  <sub>Prompt: <code>"Build a stream-safe interactive compound-interest and Monte Carlo simulator widget using DesignOSBridge and Chart.js."</code></sub>
</p>

| Deliverable / Mode | Best for | Output Format | Verification Gate |
| :--- | :--- | :--- | :--- |
| **Streaming DOM Reconciler** | Rendering partial LLM HTML/SVG chunks smoothly at 60fps | `createStreamRenderer (ESM/Browser)` | `Zero layout thrash or state loss` |
| **Bidirectional Host Bridge** | Connecting interactive widget controls back to the host AI agent conversation | `DesignOSBridge SDK` | `Full unit & integration test PASS` |
| **Generative Widget Guidelines** | Teaching agents how to compose Charts, KaTeX, Mermaid, and Three.js widgets | `skills/design-os-generative-ui/SKILL.md` | `python3 scripts/self_check.py` |

---

## Installation

Choose the setup that matches your AI coding agent. Every option installs the same canonical skill (`skills/design-os-generative-ui/SKILL.md`) and `/doctor` diagnostic suite.

### Claude Code

Run these two commands inside Claude Code:

```text
/plugin marketplace add jangtrinh/design-os-generative-ui
/plugin install design-os-generative-ui@design-os-generative-ui
```

### OpenAI Codex

Install to your personal Codex skills directory:

```bash
git clone https://github.com/jangtrinh/design-os-generative-ui.git /tmp/design-os-generative-ui
mkdir -p ~/.codex/skills/design-os-generative-ui ~/.codex/prompts
cp -R /tmp/design-os-generative-ui/skills/design-os-generative-ui/* ~/.codex/skills/design-os-generative-ui/
cp /tmp/design-os-generative-ui/prompts/doctor.md ~/.codex/prompts/design-os-generative-ui-doctor.md
rm -rf /tmp/design-os-generative-ui
```

### Gemini CLI & Google Antigravity

```bash
git clone https://github.com/jangtrinh/design-os-generative-ui.git /tmp/design-os-generative-ui
mkdir -p ~/.gemini/skills/design-os-generative-ui
cp -R /tmp/design-os-generative-ui/skills/design-os-generative-ui/* ~/.gemini/skills/design-os-generative-ui/
rm -rf /tmp/design-os-generative-ui
```

### OpenCode, Cursor, Windsurf & Other Agent Harnesses

```bash
git clone https://github.com/jangtrinh/design-os-generative-ui.git /tmp/design-os-generative-ui
mkdir -p ~/.agents/skills/design-os-generative-ui
cp -R /tmp/design-os-generative-ui/skills/design-os-generative-ui/* ~/.agents/skills/design-os-generative-ui/
rm -rf /tmp/design-os-generative-ui
```

<details>
<summary>Verify or uninstall</summary>

**Verify installation:**

```bash
python3 scripts/self_check.py
```

Or run `/doctor` inside Claude Code / Codex to inspect installed skill paths, plugin manifests, and gate health.

**Uninstall:**

```bash
rm -rf ~/.claude/skills/design-os-generative-ui ~/.codex/skills/design-os-generative-ui ~/.gemini/skills/design-os-generative-ui ~/.agents/skills/design-os-generative-ui
```

</details>

---

## Usage & Prompt Cookbook

Once installed, `skills/design-os-generative-ui/SKILL.md` activates automatically when your prompt matches its domain triggers. Browse [`docs/cookbook.md`](docs/cookbook.md) for copy-paste prompt recipes.

**Generate & Scaffold**

```text
"Build a stream-safe interactive compound-interest and Monte Carlo simulator widget using DesignOSBridge and Chart.js."
```

**Audit & Verify**

```text
"Wrap our LLM token stream in createStreamRenderer so incomplete HTML tags reconcile at 60fps via morphdom without resetting canvas state."
```

**Export & Automate**

```text
"Audit this generative UI widget against the DESIGN:OS interactive widget guidelines (zero raw emojis, dark-mode adaptive tokens, and XSS sanitization)."
```

---

## Commands & Diagnostics

| Command | Environment | What it does |
| :--- | :--- | :--- |
| `/doctor` | Claude Code / Codex | Read-only diagnostic check of installed skill paths, plugin manifests, and runtime prerequisites |
| `python3 scripts/self_check.py` | Terminal / CI | Deterministic offline verification of manifests, skill contracts, and governance files |
| `npm test` | Terminal / CI | Run the streaming sanitizer, morphdom reconciliation, and DesignOSBridge test suite |

---

## How it works

1. **Intent Routing** — Your AI agent matches your request against `skills/design-os-generative-ui/SKILL.md` frontmatter triggers.
2. **Progressive Context Loading** — Only the entry-point `SKILL.md` router loads initially; detailed recipes and scripts load on demand.
3. **Deterministic Execution** — Domain scripts and contracts execute locally with reproducible inputs and outputs.
4. **Gate Verification** — `scripts/self_check.py` and domain verifiers (`npm test`) validate the artifact before completion.
5. **Zero-Telemetry Delivery** — Verified files are written directly to your workspace with zero external network calls.

```text
User Prompt / CLI Invocation
            │
            ▼
┌───────────────────────────────────────────────┐
│ skills/design-os-generative-ui/SKILL.md
│ Progressive disclosure router & hard rules    │
└───────────┬───────────────────────────────────┘
            │ loads on demand
            ▼
┌───────────────────────────────────────────────┐
│ npm test
│ Deterministic build & contract enforcement    │
└───────────┬───────────────────────────────────┘
            │ verifies
            ▼
┌───────────────────────────────────────────────┐
│ python3 scripts/self_check.py + /doctor       │
│ Zero-telemetry local verification gate        │
└───────────────────────────────────────────────┘
```

### What loads when

`design-os-generative-ui` uses progressive context disclosure so your agent's context window stays fast and focused:

| File | Loaded when |
| :--- | :--- |
| `skills/design-os-generative-ui/SKILL.md` | Always (~100–150 lines) — routing rules, triggers, and execution workflow |
| `docs/cookbook.md` | When selecting multi-step prompt recipes or domain patterns |
| `commands/doctor.md` / `prompts/doctor.md` | Only when running `/doctor` diagnostics |
| `llms.txt` | When indexed by AI answer engines, RAG pipelines, or repo crawlers |

---

## File structure

```text
design-os-generative-ui/
├── .claude-plugin/
│   ├── plugin.json                 # Claude Code plugin manifest
│   └── marketplace.json            # Claude Code marketplace catalog
├── .codex-plugin/
│   └── plugin.json                 # OpenAI Codex plugin & interface manifest
├── .agents/
│   └── plugins/marketplace.json    # Cross-agent local plugin registry
├── .factory-plugin/
│   ├── plugin.json                 # Factory / Droid plugin manifest
│   └── marketplace.json            # Factory marketplace metadata
├── skills/
│   └── design-os-generative-ui/
│       └── SKILL.md                # Canonical agent skill entrypoint
├── commands/
│   └── doctor.md                   # /doctor diagnostic slash command
├── prompts/
│   └── doctor.md                   # Codex diagnostic prompt mirror
├── scripts/
│   └── self_check.py               # Deterministic repository & skill self-check
├── docs/
│   ├── cookbook.md                 # Copy-paste prompt recipes by job
│   └── llms.txt                    # GEO / LLM discovery index
├── PRIVACY.md                      # Zero-telemetry & local-first privacy commitment
├── SECURITY.md                     # Vulnerability disclosure & security policy
├── CONTRIBUTING.md                 # Contribution workflow & verification rules
├── CODE_OF_CONDUCT.md              # Contributor Covenant code of conduct
├── CHANGELOG.md                    # Release history
├── llms.txt                        # Root LLM indexing manifest
├── LICENSE                         # MIT License
└── README.md
```

---

## Quality bar & Limitations

### It's working if...

- `python3 scripts/self_check.py` prints `ok: design-os-generative-ui self-check passed (design-os-generative-ui)` and exits `0`.
- `npm test` passes with zero contract or test regressions.
- Your AI coding agent loads `skills/design-os-generative-ui/SKILL.md` automatically when given any prompt from [`docs/cookbook.md`](docs/cookbook.md).
- Network traffic during execution remains zero (guaranteed by [`PRIVACY.md`](PRIVACY.md)).

### When not to use

- Static marketing landing pages that are not streamed or dynamically generated by an AI agent (use `design-os-github-page`).
- Native iOS/macOS SwiftUI applications (use `design-os-apple`).
- Server-side batch PDF generation (use `design-os-origami`).

---

## DESIGN:OS Ecosystem

`design-os-generative-ui` is one of the 13 open-source engines in the **`DESIGN:OS`** ecosystem:

| Engine | Live Docs | Repository | Layer |
| :--- | :--- | :--- | :--- |
| **DESIGN:OS CLI** | [jangtrinh.github.io/design-os](https://jangtrinh.github.io/design-os/) | [`jangtrinh/design-os`](https://github.com/jangtrinh/design-os) | `cli` |
| **Knowledge Builder** | [jangtrinh.github.io/design-os-knowledge-builder](https://jangtrinh.github.io/design-os-knowledge-builder/) | [`jangtrinh/design-os-knowledge-builder`](https://github.com/jangtrinh/design-os-knowledge-builder) | `compiler` |
| **Figma Plugin & CLI** | [jangtrinh.github.io/design-os-figma-plugin](https://jangtrinh.github.io/design-os-figma-plugin/) | [`jangtrinh/design-os-figma-plugin`](https://github.com/jangtrinh/design-os-figma-plugin) | `plugin` |
| **SVG Animation Engine** | [jangtrinh.github.io/design-os-svg-animation](https://jangtrinh.github.io/design-os-svg-animation/) | [`jangtrinh/design-os-svg-animation`](https://github.com/jangtrinh/design-os-svg-animation) | `engine` |
| **3D Blender Agent** | [jangtrinh.github.io/design-os-3d-blender](https://jangtrinh.github.io/design-os-3d-blender/) | [`jangtrinh/design-os-3d-blender`](https://github.com/jangtrinh/design-os-3d-blender) | `3d / cad` |
| **OPAH ONE Drone** | [jangtrinh.github.io/design-os-drone-showcase](https://jangtrinh.github.io/design-os-drone-showcase/) | [`jangtrinh/design-os-drone-showcase`](https://github.com/jangtrinh/design-os-drone-showcase) | `hardware` |
| **GitHub Pages Engine** | [jangtrinh.github.io/design-os-github-page](https://jangtrinh.github.io/design-os-github-page/) | [`jangtrinh/design-os-github-page`](https://github.com/jangtrinh/design-os-github-page) | `pages` |
| **Apple Design OS** | [jangtrinh.github.io/design-os-apple](https://jangtrinh.github.io/design-os-apple/) | [`jangtrinh/design-os-apple`](https://github.com/jangtrinh/design-os-apple) | `swiftui` |
| **Agent Teacher** | [jangtrinh.github.io/design-os-pedagogy](https://jangtrinh.github.io/design-os-pedagogy/) | [`jangtrinh/design-os-pedagogy`](https://github.com/jangtrinh/design-os-pedagogy) | `pedagogy` |
| **Origami CAD** | [jangtrinh.github.io/design-os-origami](https://jangtrinh.github.io/design-os-origami/) | [`jangtrinh/design-os-origami`](https://github.com/jangtrinh/design-os-origami) | `packaging` |
| **Voice UX Architecture** | [jangtrinh.github.io/design-os-voice-ux](https://jangtrinh.github.io/design-os-voice-ux/) | [`jangtrinh/design-os-voice-ux`](https://github.com/jangtrinh/design-os-voice-ux) | `voice-ai` |
| **Code2Flow** | [jangtrinh.github.io/design-os-code2flow](https://jangtrinh.github.io/design-os-code2flow/) | [`jangtrinh/design-os-code2flow`](https://github.com/jangtrinh/design-os-code2flow) | `ast / audit` |
| **Generative UI** | [jangtrinh.github.io/design-os-generative-ui](https://jangtrinh.github.io/design-os-generative-ui/) | [`jangtrinh/design-os-generative-ui`](https://github.com/jangtrinh/design-os-generative-ui) | `runtime` |

---

## Contributing, Governance & License

- **Contributing**: See [`CONTRIBUTING.md`](CONTRIBUTING.md) for pull request guidelines and verification gates (`python3 scripts/self_check.py`).
- **Code of Conduct**: Governed by [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
- **Security & Privacy**: Zero telemetry — see [`SECURITY.md`](SECURITY.md) and [`PRIVACY.md`](PRIVACY.md).
- **Changelog & LLM Index**: Track releases in [`CHANGELOG.md`](CHANGELOG.md) and machine-readable index in [`llms.txt`](llms.txt).
- **License**: [MIT](LICENSE) © [Jang Trinh](https://github.com/jangtrinh).

---

If `design-os-generative-ui` saves you time, a star on GitHub helps other engineers and AI agents find it.

<p align="left">
  <a href="https://buymeacoffee.com/jangtrinh">
    <img src="https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee">
  </a>
</p>
