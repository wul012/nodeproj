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
| 12 | v2129 | 6 | credential-handle approval and no-network safety fixture prerequisite-chain renderers migrated; contract details, upstream evidence file rows, and closure prerequisite rows remain local | `npm run typecheck`; 8 focused files / 30 tests; ratchet included; temporary Vitest exact compare 6/6 byte-identical | ready in this commit |
| 13 | v2130 | 6 | endpoint-handle allowlist approval and signed-human approval artifact prerequisite-chain renderers migrated; Java v148 quality split and expected-snippet rows remain local; renderer BOM normalized before patching | `npm run typecheck`; 8 focused files / 30 tests; ratchet included; temporary Vitest exact compare 6/6 byte-identical | ready in this commit |
| 14 | v2131 | 6 | fake-shell, fake-harness, execution-denied, final-prerequisite, and human-approval artifact review report renderers migrated; requirement/no-go rows, final-closure message grammar, and evidence/snippet rows remain local | `npm run typecheck`; 8 focused files / 29 tests; ratchet included; temporary Vitest exact compare 6/6 byte-identical | ready in this commit |
| 15 | v2132 | 6 | runtime-shell candidate gate, post-decision plan intake, and chain stop/prerequisite report renderers migrated; decision record projections, continuation options, and evidence/snippet rows remain local | `npm run typecheck`; 8 focused files / 29 tests; ratchet included; temporary Vitest exact compare 6/6 byte-identical | ready in this commit |
| 16 | v2133 | 7 | pre-implementation plan intake, production-readiness, implementation-plan, and runtime-shell decision-record report renderers migrated; plan boundary rows and Java / mini-kv evidence snippets remain local | `npm run typecheck`; 10 focused files / 32 tests; temporary Vitest exact compare 7/7 byte-identical | ready in this commit |
| 17 | v2134 | 2 | local adapter candidate and identity approval provenance packet verification reports migrated; archive/snippet rows and source-packet quality optimization projections remain local | `npm run typecheck`; 2 focused files / 6 tests; temporary Vitest exact compare 2/2 files and 4/4 profiles byte-identical | ready in this commit |
| 18 | v2135 | 2 | identity approval provenance dry-run packet and external adapter connection readiness review reports migrated; external evidence/snippet rows remain local; restore drill plan deferred because its compact step/operation section spacing does not match the current builder contract | `npm run typecheck`; 2 focused files / 6 tests; temporary Vitest exact compare 2/2 files and 4/4 profiles byte-identical | ready in this commit |
| 19 | v2136 | 2 | disabled adapter client precheck and disabled adapter client upstream echo verification reports migrated; env-handle, failure-taxonomy, and upstream-echo rows remain local | `npm run typecheck`; 2 focused files / 7 tests; temporary Vitest exact compare 2/2 files and 4/4 profiles byte-identical | ready in this commit |
| 20 | v2137 | 2 | audit store env config and audit store runtime profile reports migrated; source-less message rows and h3 store sections remain local lines sections | `npm run typecheck`; 2 focused files / 5 tests; temporary Vitest exact compare 2/2 files and 5/5 profiles byte-identical | ready in this commit |
| 21 | v2138 | 4 | access policy, CI evidence command, audit retention integrity, and auth enforcement rehearsal reports migrated; source-less message rows and nested h3 sections remain local lines sections | `npm run typecheck`; 4 focused files / 12 tests; temporary Vitest exact compare 4/4 files and 8/8 profiles byte-identical | ready in this commit |
| 22 | v2139 | 4 | deployment environment readiness, deployment safety, IdP verifier boundary, and idempotency vertical readiness review reports migrated; prefixed evidence rows and nested h3 artifact/state sections remain local lines sections | `npm run typecheck`; 4 focused files / 12 tests; temporary Vitest exact compare 4/4 files and 8/8 profiles byte-identical | ready in this commit |
| 23 | v2140 | 5 | pure-standard-shape managed-audit/fake-transport renderers migrated (minimal shard readiness regular gate, minimal read-only integration rerun decision, minimal read-only integration explicit read-window gate execution decision, fake transport packet upstream echo verification, Java/mini-kv runtime execution canonical approval input precheck intake); no local lines sections needed; controlled-shard-preview h3-loop renderers still deferred | `npm run typecheck`; 5 focused files + ratchet / 18 tests; byte-identical proven by existing unmodified tests (no temp compare) | committed (Claude executor) |
| 24 | v2141 | 5 | standard-shape managed-audit renderers migrated (precheck upstream receipt verification, Java/mini-kv declared operator lifecycle runtime live-read gate plan, Java/mini-kv runtime execution approval input template compatibility intake, test-only fake harness precheck, fake transport adapter dry-run verification packet); two dynamic titles, two inline-object entries sections; ProfileSection renderers without tests still deferred | `npm run typecheck`; 5 focused files + ratchet / 19 tests; byte-identical proven by existing unmodified tests (no temp compare) | committed (Claude executor) |
| 25 | v2142 | 3 | last pure-standard-shape sandbox-endpoint credential-resolver upstream-echo-verification renderers migrated (upstream echo verification, disabled precheck upstream echo verification, test-only shell upstream echo verification); literal titles; two carry inline-object entries sections preserved verbatim. NOTE: the "empties the pure-standard-with-tests subset" claim here was based on a flawed test-detection — see batch 26 correction; the shape buckets were correct, the with-tests split was not | `npm run typecheck`; 3 focused files + ratchet / 17 tests; existing tests assert via `toContain`, so a throwaway before/after render diff proved byte-identical (only the runtime `Generated at` line varied) | committed (Claude executor) |
| 26 | v2143 | 3 | standard-shape sandbox-endpoint-handle / approval-required renderers migrated (sandbox endpoint handle preflight review, sandbox endpoint handle upstream echo verification, credential resolver approval-required implementation readiness upstream echo verification); literal titles; one keeps a file-local `omitEvidenceArrays` helper passed as entries. Corrected the v2142 test-detection (now matches the barrel/report stem, not just the `...Renderer.ts` import); all three already had 262-341-line barrel tests. Corrected census: of 109 unmigrated, 1 pure-standard-with-tests remains (async MinimalShardReadinessLiveReadGate, due v2144), 0 genuinely testless | `npm run typecheck`; 3 existing report tests + ratchet / 14 tests; existing tests assert via `toContain`, so a throwaway before/after render diff proved byte-identical (only the runtime `Generated at` line varied) | committed (Claude executor) |
| 27 | v2144 | 1 | minimal shard readiness live-read gate renderer migrated — the last pure-standard-with-tests renderer. FIRST migration to use the builder's `lines` section: the two live-read sections keep a file-local `renderLiveRead` helper (string[]) passed as `lines`. Async loader. After this batch the pure-standard subset is genuinely empty (0 with tests, 0 testless); the remaining 108 carry for-loops (9), h3 (50), map (67), or flatMap (63). v2146 needs a direction decision (lines-block carry vs. builder entries-array extension) | `npm run typecheck`; existing 3-case live-read test + ratchet / 5 tests (incl. mock-HTTP/TCP route injection); existing tests assert via `toContain`, so a throwaway async before/after render diff proved byte-identical (only the runtime `Generated at` line varied) | committed (Claude executor) |
| closeout | v2145 | 0 | documentation gate closeout repair only: expanded v2140-v2144 walkthroughs to satisfy the enforced Chinese writing floor, corrected prior summary `lint/build` pending records, and added v2145 archive evidence. No renderer, route, service, schema, or sibling evidence change | documentation profile verified-quality-gate (54/54 enforced walkthroughs compliant after adding the v2145 walkthrough, 0 blockers); 3 CI-failing route/gate test files / 5 tests passed; `npm run typecheck`; `npm run lint` (0 errors, existing warnings); `npm run build` | ready in this commit |
| 28 | v2146 | 5 | first compact h3/flatMap renderer batch after the pure-standard subset emptied: controlled read-only shard preview type module catalog, live read-only window stage ledger, runbook, command worksheet, and evidence packet. Builder extended with optional compact body spacing and optional no-trailing-newline output; local h3 helpers remain `lines` sections. Remaining unmigrated: 118 (h3 48, for 9, map 65, flatMap 59) | pre/post SHA-256 and length comparison 5/5 byte-identical; `npx vitest run` 6 focused files / 28 tests; `npm run typecheck`; ratchet 1 file / 2 tests; code walkthrough quality gate 55/55 | ready in this commit |
| 29 | v2147 | 5 | continued the controlled read-only shard preview live-read-only-window evidence intake chain: evidence intake ledger, evidence intake review package, manual evidence entry worksheet, operator evidence import preflight, and operator evidence value draft. Added `renderVerificationBlockedReasonLines` and reused it in the four compact v2146 renderers plus this batch. Remaining unmigrated: 113 (h3 43, for 9, map 60, flatMap 54) | pre/post SHA-256 and length comparison 9/9 byte-identical; `npx vitest run` 10 focused files / 42 tests; `npm run typecheck`; ratchet 1 file / 2 tests; code walkthrough quality gate 56/56; `npm run lint` 0 errors / 263 existing warnings | ready in this commit |
| 30 | v2148 | 5 | advanced the same live-read-only-window chain from fresh sibling intake through value supply envelope, approval packet draft, approval packet review, and signed approval template. Added `renderVerificationResolvedEvidenceFileDetailLines` for repeated h3 evidence-file blocks and `trimVerificationTrailingBlankLine` for byte-identical compact h3 section carry. Remaining unmigrated: 108 (h3 38, for 9, map 55, flatMap 49) | forced historical fallback pre/post SHA-256 and length comparison 5/5 byte-identical; `npx vitest run` 6 focused files / 33 tests; `npm run typecheck`; ratchet 1 file / 2 tests; code walkthrough quality gate 57/57; `npm run lint` 0 errors / 263 existing warnings | ready in this commit |
| 31 | v2149 | 5 | continued the signed approval capture / artifact draft chain: signed approval capture preflight, artifact preflight, artifact draft preflight, artifact draft readiness, and artifact draft review package preflight. Reused compact blocked-reason and trailing-blank helpers; no new helpers were needed. Remaining unmigrated: 103 (h3 33, for 9, map 50, flatMap 44) | forced historical fallback pre/post SHA-256 and length comparison 5/5 byte-identical; `npx vitest run` 6 focused files / 33 tests; `npm run typecheck`; ratchet 1 file / 2 tests; code walkthrough quality gate 58/58; `npm run lint` 0 errors / 263 existing warnings | ready in this commit |
| 32 | v2150 | 5 | continued the artifact draft text-package chain: artifact draft authoring readiness, artifact draft instruction preflight, text package intake, text package review preflight, and text package submission preflight. Reused compact blocked-reason and trailing-blank helpers while preserving local domain h3 helpers. Remaining unmigrated: 98 (h3 14, for 9, map 45, flatMap 39, counted only among unmigrated files) | forced historical fallback pre/post SHA-256 and length comparison 5/5 byte-identical; `npx vitest run` 6 focused files / 33 tests; `npm run typecheck`; ratchet 1 file / 2 tests; code walkthrough quality gate 59/59; `npm run lint` 0 errors / 263 existing warnings | ready in this commit |
| 33 | v2151 | 6 | continued the text-package comparison / compared-evidence tail: comparison preflight, comparison acceptance precheck, compared package evidence intake, compared evidence evaluation preflight, compared evidence candidate, and compared evidence candidate intake. Extended the builder for empty-meta first sections and separated h3 blocks so old summary-first and for-loop shapes migrate byte-identically. Remaining unmigrated: 92 (h3 14, for 4, map 45, flatMap 38, counted only among unmigrated files) | forced historical fallback pre/post SHA-256 and length comparison 6/6 byte-identical; `npx vitest run` 7 focused files / 41 tests; `npm run typecheck`; ratchet 1 file / 2 tests; code walkthrough quality gate 60/60; `npm run lint` 0 errors / existing warnings | ready in this commit |
| 34 | v2152 | 5 | migrated the candidate document full-report chain: request package, submission precheck, intake packet, material request package, and material submission precheck. Reused the separated h3 block builder contract without adding a new builder API; deferred the adjacent profile-section renderer because it returns section fragments rather than a complete report. Remaining unmigrated: 87; broad scan now shows h3 17, for 0, map 45, flatMap 37, with *MarkdownRenderer.ts tail files included in that h3/map/flatMap planning scan | pre/post SHA-256 and length comparison 5/5 byte-identical; `npx vitest run` 5 focused files / 27 tests; `npm run typecheck`; ratchet 1 file / 2 tests; code walkthrough quality gate 61/61; `npm run lint` 0 errors / 263 existing warnings | ready in this commit |

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
