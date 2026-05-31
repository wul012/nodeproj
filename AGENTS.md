# orderops-node Agent Instructions

This file defines long-lived rules for work inside `D:\nodeproj\orderops-node`.

## Collaboration Rule

Do the work autonomously when it is safe and possible. If a task is blocked by permission, missing information, unclear ownership, or a risky decision, explain the reason and ask the user to cooperate.

Default responsibility:

- Codex works on the Node project: `D:\nodeproj\orderops-node`.
- Java and mini-kv are cross-project dependencies. By default, inspect them read-only for planning and completion checks only.
- Do not modify, build, test, start, or stop Java / mini-kv unless the user explicitly authorizes that cross-project work.
- Do not stage or revert unrelated user/IDE changes such as `.idea/misc.xml`.

## Plan-First Development Rule

Before advancing a Node version:

- Read the latest valid plan in `docs/plans/` or `docs/plans2/`.
- Follow the latest plan's version order, validation requirements, screenshot/archive rules, and pause conditions.
- If the next planned step is Java or mini-kv, do only a read-only completion check. Continue Node only if the required Java / mini-kv evidence is already complete or the user explicitly changes the order.
- Avoid overlapping or conflicting plan files. When a plan is complete, start a new plan file for the next phase instead of appending duplicate future versions.
- For new successor plans after this rule, prefer `docs/plans2/` and keep `docs/plans/` as historical plan storage.

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
- Archive screenshot and explanation under `d/<version>/图片` and `d/<version>/解释`.
- Write code walkthrough notes under the current code-walkthrough sibling directory, such as `代码讲解记录_生产雏形阶段2/`, keeping the previous document style and naming.
- Update or create the appropriate plan document when the version changes future order.
- Commit, tag as `v<version>`, and push.

If any of these steps cannot be done, state the reason clearly.

## Evidence And Screenshot Rule

- Since v161, use `c/<version>/图片` and `c/<version>/解释` for screenshots and explanations.
- Keep `a/` and `b/` as historical archive directories.
- Starting with the next new Node version after this rule, use `d/<version>/图片` and `d/<version>/解释` for screenshots and explanations. Keep `c/` as historical archive storage.
- Starting with the next new Node version after this rule, use `代码讲解记录_生产雏形阶段2/` for code walkthrough notes. Keep `代码讲解记录_生产雏形阶段/` as historical walkthrough storage.
- Starting with the next successor plan after this rule, use `docs/plans2/` for new plan files. Keep `docs/plans/` as historical plan storage and only edit it when needed for indexes or corrections.
- Prefer local Chrome for browser screenshots. If Chrome is not available, use local Edge as fallback and mention it in the archive notes.
- For browser/page verification, first use `tool_search` to discover available MCP browser tools. The Playwright MCP is usable for HTTP navigation, snapshots, resizing, and screenshots; prefer it when the target page can be reached directly.
- Known Playwright MCP limits from v300: it blocks `file://` URLs, and the currently exposed tools do not provide custom HTTP header injection. If a route requires headers or the target is a local archive HTML file, use local Chrome headless as a fallback and record the reason in the archive explanation.
- Do not download Playwright browsers by default.
- Do not claim joint runtime testing unless Node actually consumes Java / mini-kv evidence through executable tests or a single cross-project readiness command.
- For documentation-heavy folders, when a same-level directory becomes crowded, create a sibling directory for continued documentation writes and keep the same document style/naming. This rule applies to documentation only, not source code.

## Historical Evidence And Smoke Lessons

Reusable lessons from v275 and later cross-project evidence work:

- Never overwrite shared historical fallback source files when copying newer Java / mini-kv evidence for a later Node version. If two Node versions need different upstream snapshots, create versioned snapshot directories such as `v113-snapshot/` and `v115-snapshot/`, then point `historicalEvidenceResolver.ts` at those explicit snapshots.
- After adding new historical fallback paths, rerun the previous-version focused test together with the new-version focused test. This catches accidental fixture pollution before full test runs.
- Prefer structured JSON parsing for committed upstream receipts when the upstream file is JSON; use snippet checks only for source/document evidence that has no stable JSON shape.
- When `ACCESS_GUARD_ENFORCEMENT_ENABLED=true`, HTTP smoke must include the same operator headers used by route tests, including `/health`. A failed readiness probe may be an access-guard 401/403 rather than a server startup failure.
- If an HTTP smoke command times out or fails during startup, check for lingering `node dist/server.js` processes by command line and stop only the process started for the current task. Do not kill unrelated Node processes.
- Before pushing, inspect `git remote -v`; this repository may use a remote name such as `nodeproj` instead of `origin`.
- In PowerShell commands, avoid Bash-style `&&`; use separate tool calls or PowerShell-native command sequencing.

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
