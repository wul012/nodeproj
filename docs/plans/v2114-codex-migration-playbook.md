# v2114 Codex Migration Playbook

Step-by-step execution instructions for the consolidation defined in
`docs/plans/v2114-governance-consolidation-roadmap.md`. Follow the steps in
order. Do not add features, new chains, or new files beyond what is listed.
All normal AGENTS.md rules (cleanup gate, walkthrough language/depth, version
closeout, <3000 changed lines per commit) apply.

## Hard rules

1. **Byte-identical output.** A migrated renderer must produce exactly the same
   markdown string as before, for every input. Existing tests are the proof —
   never edit an existing test's expectations to make a migration pass. If a
   test fails after migration, the migration is wrong; fix the renderer.
2. **Keep public API.** Exported function names, signatures, and file names do
   not change. Imports in routes/services/tests stay untouched.
3. **No new chains.** While this plan is active, do not create any new echo /
   verification / readiness / closure service, route, or type file. The ratchet
   test enforces this.
4. **Do not touch** `a/`–`f/`, `代码讲解记录*` (except adding this version's own
   artifacts), `fixtures/`, or anything outside `orderops-node` unless a step
   says so.

## State of the tree (prepared by the planning session, NOT yet verified)

These files were already written and are waiting in the working tree:

- `src/services/verificationReportBuilder.ts` (new — the shared builder)
- `src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationRenderer.ts` (migrated, simple shape)
- `src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationRenderer.ts` (migrated, helper shape — local `renderJavaReference` / `renderMiniKvReference` kept and passed as `lines` sections)
- `test/verificationReportBuilder.test.ts` (new)
- `test/governanceGrowthRatchet.test.ts` (new — baselines: services ≤ 1125, routes ≤ 80)
- `docs/plans/v2114-governance-consolidation-roadmap.md`, this playbook

## Step 0 — verify the foundation (do this first)

```powershell
npm run typecheck
npx vitest run test/verificationReportBuilder.test.ts test/governanceGrowthRatchet.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.test.ts
```

All four must pass before anything else. If a renderer test fails, diff the
rendered markdown against the pre-migration output (git shows the original in
`git show HEAD -- <file>`) and fix the spec mapping — never the test.

## Step 1 — finish v2114

1. Repo hygiene:
   ```powershell
   git rm -r --cached .idea
   ```
   and append `.idea/` to `.gitignore`.
2. Add this section to `START_HERE.md`, after "Where to look next":

   ```markdown
   ## Curated tour (read these ~15 files, skip the rest)

   Most of `src/services` is versioned governance evidence produced by the
   incremental version loop. The living core of the system is:

   - `src/server.ts`, `src/app.ts`, `src/config.ts` — Fastify bootstrap and configuration gates.
   - `src/routes/statusRoutes.ts`, `src/routes/dashboardRoutes.ts` — health, status, and dashboard surface.
   - `src/routes/operationIntentRoutes.ts` → `src/routes/operationPreflightRoutes.ts` → `src/routes/operationDispatchRoutes.ts` — the intent / preflight / dry-run dispatch flow.
   - `src/routes/operationApprovalRequestRoutes.ts`, `src/routes/operationApprovalDecisionRoutes.ts` — approval evidence flow.
   - `src/routes/orderPlatformRoutes.ts`, `src/routes/miniKvRoutes.ts` — upstream boundaries (disabled by default).
   - `src/clients/` — the only code that would ever talk to upstreams.
   - `src/services/verificationReportBuilder.ts` + `src/services/liveProbeReportUtils.ts` — the shared report template all verification renderers use.
   ```

   Verify each listed path exists before committing; adjust names if any differ.
3. Migrate **batch 1**: the first 10 files from the simple-renderer list
   (Step 2 discovery command), following the recipe.
4. Version closeout per AGENTS.md: focused tests for the touched renderers,
   typecheck, walkthrough document (中文, ≥3000 字, 写在
   `代码讲解记录_生产雏形阶段3/`), archive artifacts under `e/2114/`, then commit.
   Suggested message: `refactor: v2114 verification report builder + batch 1 renderer consolidation`.

## Step 2 — migration batches (v2115 onward)

### Discovery

```bash
# all renderers not yet migrated:
grep -L "renderVerificationReportMarkdown" src/services/*Renderer.ts
# of those, simple ones (no local helper functions) — do these first:
grep -L "renderVerificationReportMarkdown" src/services/*Renderer.ts | xargs grep -L "^function "
```

Counts at planning time: 245 renderers total, 2 migrated, 127 simple, 118 with
helpers.

### Recipe (per renderer file)

The original files all have this shape: one exported
`render<Name>Markdown(profile) => string` returning
`[ "# <title>", "", ...meta template literals, "", "## <heading>", "", ...body, ... , "" ].join("\n")`.

Rewrite the function body as a single call to `renderVerificationReportMarkdown`
from `./verificationReportBuilder.js`:

| Original pattern                                         | Spec mapping                                            |
| -------------------------------------------------------- | ------------------------------------------------------- |
| `"# <title>"`                                             | `title: "<title>"`                                      |
| `` `- <Label>: ${expr}` `` (meta block before first `##`) | `meta: [["<Label>", expr], ...]` (keep order)           |
| `"## <H>"`, then `...renderEntries(x)`                    | `{ heading: "<H>", entries: x }`                        |
| `"## <H>"`, then `...renderMessages(x, "<empty>")`        | `{ heading: "<H>", messages: x, emptyText: "<empty>" }` |
| `"## <H>"`, then `...renderList(x, "<empty>")`            | `{ heading: "<H>", list: x, emptyText: "<empty>" }`     |
| `"## <H>"`, then `...someLocalHelper(x)` or mixed literals| `{ heading: "<H>", lines: someLocalHelper(x) }` — keep the helper function unchanged |

Rules:

- Copy every string literal **verbatim** (headings, labels, empty-text). No
  rewording, no reordering, no "fixing" typos.
- Keep local helper functions and their `renderEntries`/`renderList` imports;
  drop imports the file no longer uses.
- If a renderer deviates from the standard shape in any way the table cannot
  express (conditional sections, non-`##` structure, extra text between
  sections), **skip it**, leave it unmigrated, and record it in the progress
  table below with a one-line reason.

Reference examples (already migrated, use as templates):

- simple shape: `...ApprovalRequiredBoundaryUpstreamEchoVerificationRenderer.ts`
- helper shape: `...ApprovalPrerequisiteArtifactUpstreamEchoVerificationRenderer.ts`

### Per-batch verification gate

For each batch of 10–15 renderers:

```powershell
npm run typecheck
npx vitest run <the test files matching each migrated renderer's base name>
npx vitest run test/governanceGrowthRatchet.test.ts
```

A renderer's tests are found by its service base name, e.g.
`fooBarVerificationRenderer.ts` → `test/fooBarVerification*.test.ts`. If a
renderer has no test that exercises its markdown route, note it in the progress
table (do not write a new test for it inside a batch version; collect them and
add at most one consolidated snapshot test in the final version if needed).

Per AGENTS.md timeout triage: run focused tests first; never run the full
529-file suite to validate a single batch.

### Per-batch closeout

One version + one commit per batch, with walkthrough (中文 ≥3000 字) and
`e/<version>/` artifacts per AGENTS.md Version Closeout. Suggested message:
`refactor: v<NNNN> renderer consolidation batch <K> (<M> renderers, byte-identical)`.

## Step 3 — final version of the plan

1. `grep -L "renderVerificationReportMarkdown" src/services/*Renderer.ts` —
   must return only the renderers recorded as intentionally skipped.
2. Full verification: typecheck, then the full test suite **in chunks**
   (e.g. `npx vitest run test/a* test/b*` style splits), then `npm run build`,
   then delete `dist/`.
3. Update the progress table and write a closeout note in the roadmap doc:
   lines removed, renderers migrated/skipped, whether Phase B (merging renderer
   files into services) is recommended.
4. Request the final review (planner does the last check, see below).

## Progress table (update after every batch)

| Batch | Version | Renderers migrated | Skipped (reason) | Tests | Committed |
| ----- | ------- | ------------------ | ---------------- | ----- | --------- |
| foundation + 1 | v2114 | 2 + 10 | raw simple-list prefix deferred: 5 loop/flatMap document renderers and 5 section-array renderers | Step 0 + batch focused tests passed locally | ready in this commit |
| 2 | v2119 | 10 | controlled shard preview, section-array, loop-heavy, and helper renderers deferred to later batches; this batch used only uniform Java / mini-kv route catalog cleanup archive verification renderers | `npm run typecheck`; 14 focused files / 16 tests; ratchet included; temporary exact compare 10/10 byte-identical | ready in this commit |
| 3 | v2120 | 10 | helper-heavy disabled runtime shell / minimal integration / sandbox handle archive verification renderers deferred; this batch used no-helper archive verification renderers with entries/messages/list/raw lines only | `npm run typecheck`; 12 focused files / 22 tests; ratchet included; temporary Vitest exact compare 10/10 byte-identical | ready in this commit |
| 4 | v2121 | 7 | minimal integration, sandbox handle, and operator lifecycle archive verification families deferred; this batch migrated the disabled runtime shell design draft family while retaining the local archive-reference helper as raw lines | `npm run typecheck`; 9 focused files / 32 tests; ratchet included; temporary Vitest exact compare 7/7 byte-identical | ready in this commit |
| 5 | v2122 | 7 | runtime pass evidence, shard readiness, minimal integration, sandbox handle, and fake transport archive verification families deferred; this batch migrated no-helper Java / mini-kv operator lifecycle and runtime gate renderers | `npm run typecheck`; 9 focused files / 25 tests; ratchet included; temporary Vitest exact compare 7/7 byte-identical | ready in this commit |
| 6 | v2123 | 5 | minimal integration, shard readiness, runtime pass evidence, and fake transport archive verification families deferred; this batch migrated the same-shape sandbox handle review family and replaced five duplicate archive-reference helpers with `renderVerificationArchiveFileReferenceLines` | `npm run typecheck`; 7 focused files / 20 tests; ratchet included; temporary Vitest exact compare 5/5 byte-identical | ready in this commit |
| 7 | v2124 | 5 | shard readiness, runtime pass evidence, and fake transport archive verification families deferred; this batch migrated the minimal read-only integration family while keeping the gate-execution target result formatter local as raw lines | `npm run typecheck`; 7 focused files / 20 tests; ratchet included; temporary Vitest exact compare 5/5 byte-identical | ready in this commit |
| 8 | v2125 | 3 | runtime pass evidence and fake transport packet archive verification remain as final tail candidates; this batch migrated the shard-readiness archive verification family while keeping live-read observation formatting local as raw lines | `npm run typecheck`; 5 focused files / 14 tests; ratchet included; temporary Vitest exact compare 3/3 byte-identical | ready in this commit |
| 9 | v2126 | 2 | archive verification renderer subset tail completed; remaining N1 work should scan non-archive verification renderers and Phase-B merge candidates rather than this subset | `npm run typecheck`; 4 focused files / 10 tests; ratchet included; temporary Vitest exact compare 2/2 byte-identical; local scan found 0 `*ArchiveVerificationRenderer.ts` files without `verificationReportBuilder` | ready in this commit |
| 10 | v2127 | 6 | route catalog cleanup evidence report family migrated; batch closeout, preflight, availability closeout, and other non-archive renderer families remain for later scanning | `npm run typecheck`; 8 focused files / 18 tests; ratchet included; temporary Vitest exact compare 6/6 byte-identical; evidence-file helper covered in builder test | ready in this commit |
| 11 | v2128 | 6 | adjacent route catalog cleanup consumer/current/batch/preflight/availability report renderers migrated; operational line shapes intentionally remain local, and remaining N1 work should scan other non-archive report families by shape | `npm run typecheck`; 8 focused files / 14 tests; ratchet included; temporary Vitest exact compare 6/6 byte-identical | ready in this commit |

## Final acceptance checklist (the planner's last check)

The reviewing session will verify, at minimum:

- [ ] `npm run typecheck` clean
- [ ] ratchet test passes; service/route counts did not grow
- [ ] random sample of migrated renderers diffed against `git show` originals — markdown construction provably identical
- [ ] all batch test runs green; no existing test expectation was edited
- [ ] skipped renderers listed with reasons
- [ ] `.idea/` untracked; START_HERE tour present and paths valid
- [ ] walkthrough + archive artifacts exist for every version in the progress table
- [ ] no leftover `dist/`, `.tmp/`, or stray background processes
