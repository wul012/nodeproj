# orderops-node Agent Instructions

This file defines long-lived rules for work inside `D:\nodeproj\orderops-node`.

## Current State (single source of truth)

Update this table instead of appending relative-time rules ("starting with the next version…") below. Where an older section conflicts with this table, this table wins.

| Item | Current |
|---|---|
| Active screenshot/evidence archive root | `d/<version>/图片` + `d/<version>/解释` (+ `d/<version>/evidence/` for machine summaries) |
| Active walkthrough volume | `代码讲解记录_生产雏形阶段3/` |
| Active cross-project program | `D:\C\四项目理解统筹\AGENTS.md` → Current Active Program |
| Active playbook + progress table | `docs/plans/production-excellence-node-playbook.md` |
| Session bootstrap | run `.\scripts\codex-bootstrap.ps1` at session start (git/tag/CI/pointers in one command) |
| Authorized maturity label | `single-project validation + verified read-only cross-project integration (env-gated, single machine, no execution authority)` |
| Capstone regression trigger | run `INTEGRATION_LIVE=1 npm run readiness:cross` at Java final track close and after capstone-contract changes |
| Active maintenance track | `docs/plans3/v2206-dashboard-shell-quality.md`; test-first repair of duplicate shell tags, mobile button overflow, and favicon 404; v2203-v2205 locally accepted and batched remote CI pending |
| Frozen history (never move) | `a/`, `b/`, `c/`, older walkthrough volumes, `fixtures/` |

## Collaboration Rule

Do the work autonomously when it is safe and possible. If a task is blocked by permission, missing information, unclear ownership, or a risky decision, explain the reason and ask the user to cooperate.

Default responsibility:

- Codex works on the Node project: `D:\nodeproj\orderops-node`.
- Java and mini-kv are cross-project dependencies. By default, inspect them read-only for planning and completion checks only.
- Do not modify, build, test, start, or stop Java / mini-kv unless the user explicitly authorizes that cross-project work.
- Do not stage or revert unrelated user/IDE changes such as `.idea/misc.xml`.

## Plan-First Development Rule

Before advancing a Node version:

- First check `D:\C\四项目理解统筹\AGENTS.md` → Current Active Program: if a program brief is active there, it takes precedence over the plans directories. Otherwise read the latest valid plan in `docs/plans3/`, `docs/plans2/`, or `docs/plans/`, preferring the newest active successor directory.
- Before writing a successor plan, inspect Java and mini-kv progress read-only in parallel. Record the latest committed version/tag, clean/dirty status, whether each project can continue in parallel, and the concrete next direction they can follow.
- Every new Node plan must include a cross-project progress section. If Node needs fresh Java / mini-kv evidence, list the exact upstream version and pause condition. If the Node version is a local route-table/archive/refactor loop, mark Java / mini-kv as recommended parallel and say Node is not their pre-approval blocker.
- Follow the latest plan's version order, validation requirements, screenshot/archive rules, and pause conditions.
- If the next planned step is Java or mini-kv, do only a read-only completion check. Continue Node only if the required Java / mini-kv evidence is already complete or the user explicitly changes the order.
- Avoid overlapping or conflicting plan files. When a plan is complete, start a new plan file for the next phase instead of appending duplicate future versions.
- For new successor plans after v368, prefer `docs/plans3/` and keep `docs/plans2/` / `docs/plans/` as historical plan storage.

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
- Write code walkthrough notes under the active walkthrough volume from the Current State table, keeping the previous document style and naming. Write the walkthrough BEFORE the version's final verification run, so the closing test pass covers it (lesson promoted from Java v1799).
- Code walkthrough notes must be written in Chinese. Each version-level code walkthrough must contain at least 3000 Chinese characters; if the explanation cannot naturally reach that depth, enlarge the real engineering work, refactor scope, or verification coverage for that version instead of padding with repetitive prose.
- Update or create the appropriate plan document when the version changes future order.
- Update `CHANGELOG.md` for the completed version; git tags remain the canonical milestone version while `package.json` stays `0.1.0` until a packaging/release workflow explicitly changes that policy.
- Commit, tag as `v<version>`, and push.

If any of these steps cannot be done, state the reason clearly.

## Evidence And Screenshot Rule

- Active archive root, walkthrough volume, and plans location: see the Current State table at the top of this file. `a/`, `b/`, `c/` and older walkthrough volumes are frozen historical archives.
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
- After the v2192 external capstone PASS, use exactly `single-project validation + verified read-only cross-project integration (env-gated, single machine, no execution authority)`; do not strengthen it to production readiness.
- Keep the live capstone outside default CI, but treat `INTEGRATION_LIVE=1 npm run readiness:cross` as a mandatory regression at Java final track close and after capstone-contract changes.
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

## Program Discipline (promoted 2026-07-06)

- Remote verification policy: after push, confirm the CI run is queued/started with a quick `gh run list` (seconds), but do not block on `gh run watch` for intermediate versions of a multi-version batch. Check the previous version's run conclusion at the start of the next version; if it failed, fixing CI becomes the immediate next task. Block-watch only the final version of a batch or when the user asks.
- Evidence economy: text evidence first (logs, JSON summaries, transcripts); screenshots only where a visual actually proves something or for closeout versions. Archive growth is budgeted — the mini-kv `e/` 1.1GB history is the cautionary tale.
- Progress-table rows: at most ~3 lines per milestone/batch; details live in `d/<version>/evidence/` files, the row keeps a pointer. Never grow a row into a paragraph wall (the N1 row is the cautionary tale).
- Lesson promotion: when the same deviation or workaround is recorded twice, promote it into this file as a rule instead of recording it a third time.
- CI-only failures are never debugged by pushing (recurred v2171–73, v2176–77, v2180–82; promoted 2026-07-10): when a parity/test failure reproduces only in CI, reproduce it locally first (fake absolute paths, CRLF, missing sibling repos, fresh clone) or bundle diagnostics into ONE push; one fix = one version, and a red run on master from an iteration attempt is a closeout violation. For renderer-migration parity specifically: before pushing a migration batch, scan the migrated renderers' outputs for ANY machine-dependent token (absolute path, timestamp, byte count, sha256/digest in any phrasing) and extend `test/rendererMigrationParityUtils.ts` proactively in the same commit — do not wait for CI to reveal the next digest phrasing one red run at a time.
- Any version that touches a parity utility, parity oracle, or byte-frozen response surface must complete the local six-surface mixed/LF/CRLF pass before push. A portability-class CI red is a closeout violation, not a discovery mechanism.
- Method kernel: apply the 12-rule kernel and task-brief skeleton from `D:\C\四项目理解统筹\模型使用手册\00-通用方法内核.md` (read once per session; also mirrored in the global `~/.codex/AGENTS.md`).

## Elegance Gates (promoted 2026-07-11, program-end review)

The post-capstone review judged this codebase fortified but not elegant: naming by
concatenation, generation-scale duplication (245 renderers consolidated after the fact),
scaffolding substituting for design. These gates buy elegance upstream. They apply to
NEW and TOUCHED code only; existing violations enter a committed baseline that may only
shrink. Each rule must become a committed mechanical check that fails CI — the next
governance version commits the gates (the renderer-census machinery is the model);
until then they bind as authoring rules enforced at review. Ratchets only tighten.

- Name budget: no new identifier or filename over 40 characters. A name that wants more
  nouns means a missing abstraction — extract and name the concept instead. Existing
  over-budget names: baseline census, shrink-only; renames only where contracts allow.
- Rule of three: a third structurally-similar file in any family is a STOP condition —
  build the shared engine/builder first, then land the third case as data/config.
- Generation cap: a feature version adds at most 400 new source lines (dedup, refactor,
  split, and migration versions exempt). Needing more means the version splits.
- Family design note: before creating a new file family, write ≤10 lines in the
  walkthrough naming the abstraction and the data-vs-behavior split — BEFORE
  implementation, the same discipline as freezing a parity oracle before migrating.
- Boy-scout rule: any touched file must leave within this section's name and size
  budgets.

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
