# orderops-node Agent Instructions

This file defines long-lived rules for work inside `D:\nodeproj\orderops-node`.

## Collaboration Rule

Do the work autonomously when it is safe and possible. If a task is blocked by permission, missing information, unclear ownership, or a risky decision, explain the reason and ask the user to cooperate.

Default responsibility:

- Codex works on the Node project: `D:\nodeproj\orderops-node`.
- Java and mini-kv are cross-project dependencies. By default, inspect them read-only for planning and completion checks only.
- Do not modify, build, test, start, or stop Java / mini-kv unless the user explicitly authorizes that cross-project work.
- Do not stage or revert unrelated user/IDE changes such as `.idea/misc.xml`.

## Context Length Stop Gate

When the context is clearly long and close to compaction risk, stop and do not start new changes.

If context is judged close to compaction risk:

- State that the context is approaching the compaction risk zone.
- Do not start new file edits, commits, processes, or long-running verification.
- Ask the user to compact the context or open a new session before continuing.

If already in final cleanup, only do safe cleanup: stop processes started this turn, delete temporary files created this turn, and report status.

## Plan-First Development Rule

Before advancing a Node version:

- Read the latest valid plan in `docs/plans/`.
- Follow the latest plan's version order, validation requirements, screenshot/archive rules, and pause conditions.
- If the next planned step is Java or mini-kv, do only a read-only completion check. Continue Node only if the required Java / mini-kv evidence is already complete or the user explicitly changes the order.
- Avoid overlapping or conflicting plan files. When a plan is complete, start a new plan file for the next phase instead of appending duplicate future versions.

Current cross-project framing:

```text
Java = order transaction core
Node = operations control plane / evidence chain / controlled operation entry
mini-kv = self-built KV infrastructure experiment
```

Do not include aiproj in Node/Java/mini-kv execution plans unless the user explicitly asks for four-project analysis.

## Version Completion Rule

For each completed Node version:

- Keep the version scope as one meaningful small loop, not only a trivial field/doc tweak and not a multi-layer rewrite.
- Run `npm run typecheck`.
- Run focused tests relevant to the change.
- Run `npm test`.
- Run `npm run build`.
- Create runtime/debug evidence when applicable.
- Archive screenshot and explanation under `c/<version>/图片` and `c/<version>/解释`.
- Write code walkthrough notes under `代码讲解记录_生产雏形阶段/`.
- Update or create the appropriate plan document when the version changes future order.
- Commit, tag as `v<version>`, and push.

If any of these steps cannot be done, state the reason clearly.

## Evidence And Screenshot Rule

- Since v161, use `c/<version>/图片` and `c/<version>/解释` for screenshots and explanations.
- Keep `a/` and `b/` as historical archive directories.
- Prefer local Chrome for browser screenshots. If Chrome is not available, use local Edge as fallback and mention it in the archive notes.
- Do not download Playwright browsers by default.
- Do not claim joint runtime testing unless Node actually consumes Java / mini-kv evidence through executable tests or a single cross-project readiness command.

## Cleanup Gate

Before the final response for any task, perform a cleanup pass for files and processes created during that task.

Delete files and folders created only for intermediate editing, conversion, rendering, testing, debugging, or validation. Common examples:

- `tmp/`, `.tmp/`, `output/tmp/`
- `test-output/`, `playwright-report/`, `.playwright-cli`
- `__pycache__/`, `.pytest_cache/`
- temporary render PNG/PDF files
- helper scripts created only for the task
- intermediate document files such as `*_edit.docx`, `*_editing.docx`, `*_temp.docx`, `*_converted.docx`, `*_rendered*`
- document names containing edit/temp/convert/preview words in any language, when clearly intermediate

Do not delete:

- user-provided source files
- final deliverables
- source code changes requested by the user
- logs still needed for debugging
- `.git`
- Codex session/state files
- files not created during the current task

After `npm run build`, remove `dist` before final response unless the user explicitly needs the build output kept.

## Background Process Rule

When starting any long-running process, record what it is for and, when practical, its PID, port, or terminal session.

Before final response, stop background processes started during the task unless the user explicitly needs them running. Common examples:

- `npm run dev`, Vite, Next.js, or other preview servers
- `python -m http.server`
- Playwright browsers and test servers
- Node, Python, or MCP/debug subprocesses started only for this task

If a process must remain running, state its name, port/PID if known, and why it was kept.

## Cross-Project Research Rules

For cross-project research, quality evaluation, and planning:

- Prefer read-only inspection, evidence-backed summaries, and clear separation between facts, judgments, and recommendations.
- Separate latest committed version from dirty working tree changes.
- Distinguish contract/evidence chain from live runtime integration.
- Until real integration exists, describe the state as `single-project validation + cross-project contract alignment`.
- Do not overstate production readiness.

Read-only completion checks for Java / mini-kv may include:

- `git status`
- latest commit/tag
- checking whether planned sample, fixture, document, or evidence files exist
- checking whether key fields match the plan

Do not build, test, start, stop, or modify Java / mini-kv during read-only checks.

## Quality And Refactoring Rhythm

Node is the control plane, not a simple API layer. Evidence packets, readiness gates, live probes, identity evidence, archive bundles, and controlled operation entries must stay read-only unless explicitly changed by the user.

Engineering quality rules:

- Treat large files, long names, repeated report renderers, string-based fixture checks, and delayed refactoring as real debt signals.
- After 3-4 feature versions, prefer 1 version of contract-preserving refactor, deduplication, or test hardening.
- Split large route/service/report/rendering modules before they become emergency refactors.
- Future work should shift from only fixture/contract expansion toward real production capabilities: persistence, authentication middleware, real HTTP reads, controlled runtime windows, and safer operational drills.

## Final Response Requirement

Include a short cleanup summary when meaningful:

- files deleted
- files kept
- processes stopped
- processes intentionally left running

When a version is completed, also state:

- validation commands and results
- commit hash
- tag
- push status
- remaining unrelated/untracked files
