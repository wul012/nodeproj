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

## Phase 1 — N1 completion (est. 5–9 more batch versions)

1. Batch size 8–15 renderers per version, grouped by shape (finish `map` family, then
   `flatMap`, then `h3` tails), hardest-last is NOT allowed — take at least one
   non-trivial renderer per batch so the tail does not accumulate only hard cases.
2. Per batch, in order: migrate → `npm run typecheck` → full `vitest run` (all tests,
   not a subset) → lint (0 errors, warning count must not grow) → census re-run →
   ratchet/baseline updates → `d/<version>/evidence/renderer-consolidation-batch-N.json`
   summary → walkthrough → commit/tag/push → CI green before the next batch starts.
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
