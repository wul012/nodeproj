# Node Final Push — finish N1, unlock N5, close the track

Executor: Codex session in `D:\nodeproj\orderops-node`. Parent:
`docs/plans/production-excellence-final-acceptance.md`. Base playbook and its progress
table remain authoritative: `docs/plans/production-excellence-node-playbook.md`.
All v2114 playbook hard rules stay binding: byte-identical output, never edit an existing
test's expectations, keep public API, no new chains (ratchet enforces), <3000 changed
lines per commit, cleanup gate, 中文 walkthrough conventions.

## Step 0 — reconcile reality (every session start)

1. `git log --oneline -5`, `git status`, confirm clean tree and last tag; if a prior
   batch is half-closed (committed but untagged/unpushed/CI-pending), close it first.
2. Re-run the renderer census (the same broad scan that produced "87 remaining: h3 17,
   map 45, flatMap 37" at v2154). Record the fresh number in the batch summary. If the
   census disagrees with the progress table, the census wins and the discrepancy is
   written into the deviations section before any migration.
3. v2157 commits the census as `scripts/renderer-census.mjs`; every later batch and
   reviewer must run `npm run renderer:census -- --json` so the same definition is
   used instead of re-deriving the scan by hand. The script's output is the number
   of record. Use `--max-unstandardized=<previous count>` as a shrink-only check.
4. Pipelining: while the full `vitest run` executes, do read-only preparation of the
   next batch (file list, shape classification, expected builder mapping) — no writes
   of any kind until the current batch is green.

## Phase 1 — N1 completion (est. 5–9 more batch versions)

1. Batch size 8–15 renderers per version, grouped by shape (finish `map` family, then
   `flatMap`, then `h3` tails), hardest-last is NOT allowed — take at least one
   non-trivial renderer per batch so the tail does not accumulate only hard cases.
2. Per batch, in order: migrate → `npm run typecheck` → full `vitest run` (all tests,
   not a subset) → lint (0 errors, warning count must not grow) → census re-run →
   ratchet/baseline updates → `d/<version>/evidence/renderer-consolidation-batch-N.json`
   summary → walkthrough → commit/tag/push → confirm CI queued. At the next
   batch start, check the previous run first; a red run blocks all new writes and is
   repaired immediately. Block-watch CI for the final batch before review.
3. Waivers: a renderer may be left unmigrated ONLY if it is composition-only (the v2153
   precedent: it composes other renderers and contains no line-formatting logic a builder
   would absorb). Each waiver = one entry in a committed
   `docs/plans/renderer-consolidation-waivers.md` with file, reason, and the reviewer
   check ("builder migration would add indirection without removing formatting code").
   Target: census 0 unmigrated, waiver list expected small (single digits). A waiver for
   "large/tedious" is a fail condition.
4. N1 close = census shows 0 non-waived unmigrated full-report renderers + waiver doc
   committed + progress table updated with the final census. Request Claude review.

## Phase 2 — N5 code health (1–3 versions, only after N1 close)

1. Fresh size census: list every file under `src/` over 800 lines (playbook said 5 at
   audit time; re-measure). For each: split plan or written waiver (same standard —
   waivers need a mechanical reason, e.g. generated/registry tables with fixture tests).
2. Contract-preserving splits only; routes/services keep public module paths via
   re-export shims where imports would otherwise change. Existing tests are the proof;
   byte-identical route/report output.
3. Commit a size-ratchet test (fail on any non-waived source file > 800 lines and on
   waived files growing further). This is the E9 mechanical gate.
4. N5 close = ratchet committed and green + splits tagged + walkthroughs written.
   Request Claude review.

## Phase 3 — track closeout (1 version)

1. Self-audit vs E1–E10 with file evidence per gate; update the playbook progress table
   and `docs/PRODUCTION_BOUNDARIES.md` / `CHANGELOG.md` to the end state.
2. Coverage floors: re-baseline upward if actuals now exceed floors by >2 points
   (ratchet up, never down). Lint warning baseline: record end count; it must be ≤ the
   N0 baseline (263) and the closeout should reduce it where cheap (unused vars, etc.),
   without a repo-wide mechanical sweep.
3. Produce `docs/plans/node-track-final-evidence.md`: gate-by-gate table, waiver list,
   census numbers, CI run links. This is the input to the reviewer's E-gate verification.
4. After Claude review PASS, the Node session may start the integration capstone
   (C1–C4 in the final-acceptance program) as its next version series.

## Fail conditions specific to this brief

- Full test suite skipped in favor of focused tests before a commit = batch invalid.
- Census number in a summary that the reviewer cannot reproduce = checkpoint fail.
- A batch mixing renderer migration with any other refactor or feature = revert.
- CI red carried into a new batch = stop; fix first.

## Claude checkpoint review — 2026-07-07 (v2155–v2174): PASS with one process finding

- Verified: v2174 CI green. `test/rendererMigrationParityUtils.ts` normalization masks only
  machine-dependent values (timestamps, absolute paths → `<repo>`/`<java>` placeholders,
  external-file digests/sizes) and is applied symmetrically to both comparison sides —
  migration byte-parity is intact; this was NOT expectation-weakening. Census script
  (`scripts/renderer-census.mjs`) committed as required.
- Process finding: v2171–v2173 pushed two red CI runs to master while iterating on a
  CI-only-reproducible failure, spending four version numbers on one fix.
- Standing instruction: when a failure reproduces only in CI, do NOT iterate by pushing —
  simulate the environment difference locally (fake absolute paths, CRLF, missing sibling
  repos) or bundle diagnostics into a single push; one fix = one version.
- Continue batches. Next checkpoint after 5 more batches or at N1 close.

## Claude checkpoint review — 2026-07-10 (v2175–v2182): PASS on output, FAIL on one process rule

- Verified: census 245 total / 242 standardized / 3 unmigrated — N1 is one batch from
  close. v2181/v2182 normalizer additions ("chained to <sha256>", "verified archive …
  for decision …") mask digest VALUES only, symmetrically; parity intent intact.
- Process FAIL: the red-run iteration pattern recurred a THIRD time (v2180 red → v2181
  red → v2182 green), violating the 07-07 standing instruction above. Now promoted to
  AGENTS.md Program Discipline as a rule, including the root-cause fix: before pushing a
  migration batch, proactively scan migrated outputs for machine-dependent tokens and
  extend the normalizer in the SAME commit — CI must not be the discovery mechanism.
- N1 close: finish the last 3 (or waiver them per the composition-only standard), commit
  the waiver doc, update the progress table, then request the N1-close review before
  starting N5.

## Claude N1-close review — 2026-07-10 (v2183–v2186): N1 CLOSED — PASS

- Verified: census 245 total / 242 standardized / 3 waived / 0 non-waived unstandardized;
  the waiver mechanism exceeds the brief's standard (composition-only boundary enforced
  by AST in `scripts/renderer-census.mjs`, canonical `renderer-consolidation-waivers.json`,
  sync test). v2186 green on master; playbook N1 row updated. N1 is officially closed.
- Normalizer additions in v2185/v2186 verified value-masking-only and symmetric; the
  re-pinned length/sha256 expectations in the V2179/V2183 parity tests are the mechanical
  consequence of the normalizer change (digests are over the normalized form), not
  expectation-weakening. Acceptable — but each re-pin shrinks the snapshot's independent
  value, so the normalizer is now FROZEN: any further normalizer extension requires a
  one-line justification naming the machine-dependent token class it masks.
- Process: v2184 and v2185 both went red on master before v2186 closed the portability
  hole. v2185's local LF-checkout matrix was the right practice but missed the
  sizeBytes/digest metadata class the AGENTS rule's proactive scan should have caught.
  N5 entry gate: before the FIRST N5 push, run the full parity suite against an
  LF/normalized checkout locally and attach the result to the batch evidence — CI must
  not be the discovery mechanism again.
- N5 is unblocked. Follow the brief's Phase 2 as written (fresh >800-line census, split
  or waiver each, size-ratchet test). Next checkpoint at N5 close or after 3 versions,
  whichever comes first.

## Claude N5-close review — 2026-07-11 (v2187–v2189): N5 CLOSED — PASS, no corrections

- Verified by running the committed census: 1,234 source files, threshold 800,
  oversizedFileCount 0, maxOversized ratchet pinned at 0, remediation baseline empty.
  Series went 16 → 0 with ZERO waivers — stronger than the brief permitted.
- Process compliance was exemplary this round: the N5 entry gate ran as required (full
  parity suite in an independent core.autocrlf=false worktree, attached to v2187
  evidence); the historical-estimate-vs-fresh-census discrepancy (5 vs 16) was recorded
  and the reproducible number won; the normalizer freeze was respected (declared as a
  nonGoal and untouched); all runs green on master.
- Node now has N0–N5 complete. Next and final step: Phase 3 track closeout (one
  version — E1–E10 self-audit, `docs/plans/node-track-final-evidence.md`, coverage/lint
  floors re-baselined upward only). After the closeout review PASSES, the Node session
  starts the integration capstone C1–C4 — it is the capstone owner, and mini-kv's and
  aiproj's tracks are already closed, so the capstone is the program's critical path.
- Also: commit the reviewer's working-tree edits (AGENTS.md + the two brief appends)
  in the closeout version; they have now survived four sessions uncommitted.

## Claude track-closeout review — 2026-07-11 (v2190): **PASS — Node Stage-1 track CLOSED**

- Independently reproduced: lint 0 errors / 261 warnings (below the 263 N0 ceiling);
  `security-config-scan.mjs` 6/6 digest-pinned synthetic matches, 0 env secrets,
  ready:true; `archive-retention-census.mjs` 7,017 files within hard budgets; renderer
  and source-size censuses verified at their own reviews; v2190 tag on the remote and
  its run green. The waiver inventory is complete and every waiver is mechanically
  scoped (AST-validated renderers, digest+count-pinned scan entries).
- The reviewer's edits were committed in v2190 as instructed. E4 (digest-pinned secret
  scanner) and E10 (hard-budget archive census) added at closeout are gates the brief
  did not even require at this strength.
- **Next: the integration capstone C1–C4 is authorized and is the program's critical
  path.** Read `docs/plans/production-excellence-final-acceptance.md` C1–C4: env-gated
  live Java read, fresh mini-kv CLI output validation, no-write proofs, and
  `npm run readiness:cross` producing the single report. Capstone rules: read-only
  against Java/mini-kv, no execution authority, maturity label may change ONLY after
  the capstone review PASSES. Request Claude review at capstone complete — that review
  is the program-end review.

## Codex capstone candidate — v2191, 2026-07-11

- Implemented C1-C4 as one cohesive version under
  `docs/plans/v2191-integration-capstone-roadmap.md`: env-gated real Java jar
  lifecycle, fresh real mini-kv CLI parsing, static/live no-write proofs, and
  atomic JSON/Markdown aggregation through `npm run readiness:cross`.
- The full local candidate run passed every C1-C3 check and proved graceful
  Java shutdown, application PID exit, and port release. Evidence is archived
  under `d/2191/evidence/`.
- Stop after commit/tag/push/green CI and request Claude program-end review.
  Do not change the maturity label or start Stage 2 before that review PASS.
