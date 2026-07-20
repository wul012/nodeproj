# Node v2203-v2205 Maintainability Closeout

Date: 2026-07-19
Owner: Codex
State: complete; v2203-v2205 pushed and cumulative Node Evidence run 29693804255 passed

## Objective and stop condition

This bounded maintenance track improves code shape without adding product behavior.
It stops after v2205 when all of the following are mechanically true:

1. ESLint reports zero errors and zero warnings, and CI rejects the first warning.
2. A committed maintainability census rejects new near-limit files, oversized or
   over-complex functions, and relative-import cycles while existing debt may only
   shrink.
3. At least two high-value source hotspots leave the near-limit baseline, with route,
   report, fixture, and dashboard output parity preserved.
4. Typecheck, focused parity tests, the complete Vitest suite, build, static gates,
   safe HTTP smoke, and remote Node Evidence all pass from the final tree.

This is not a mass rename. Public paths and historical evidence remain stable, and
the maturity label remains:
`single-project validation + verified read-only cross-project integration (env-gated, single machine, no execution authority)`.

## Step-0 reconciliation

- Node HEAD: `7f5cda45`; branch `master` matches `nodeproj/master`; worktree clean.
- Latest tag: `v2202`; its source tree passed Node Evidence run `29231188913`.
- HEAD differs from `v2202` only by the committed external README review ledger.
- Fresh local audit: typecheck passes; lint is 0 errors / 180 warnings; elegance,
  family, source-size, and renderer censuses are ready.
- Measured debt: 1,246 TypeScript source files / 309,949 lines; 93 files exceed
  600 lines; 4,537 legacy name violations; 52 tracked suffix families.
- Java is clean at `v1868-order-platform-readme-evidence-exhibition` and may continue
  in parallel. Node is not a Java pre-approval blocker.
- mini-kv is at `v1664` with one pre-existing modified README brief. That change is
  owned by its session and must not be edited or reverted. mini-kv may continue in
  parallel; no fresh mini-kv evidence is needed here.
- Shared Stage 2 remains inactive. This local maintenance authorization does not
  activate operational execution work or require a live capstone rerun.

## Requirement-evidence matrix

| Requirement | Implementation | Reproducible evidence | State |
|---|---|---|---|
| Remove lint debt | delete unused imports/locals; replace explicit `any` with checked types | `npm run lint` | locally accepted in v2203 |
| Make zero warnings permanent | set ESLint warning ceiling to zero and update its contract test | focused contract test + CI | locally accepted in v2203; remote check batched |
| Measure structural health | AST/import-graph census plus shrink-only baseline | `npm run maintainability:census` | locally accepted in v2204 |
| Prevent gate drift | adversarial Vitest fixtures for new/grown/stale debt and cycles | `test/maintainabilityCensus.test.ts` | 8/8 passed in v2204 |
| Repair real hotspots | reduce two selected >600-line files without public/output drift | focused parity digests + census shrink | locally accepted in v2205 |
| Preserve behavior | no route, JSON, Markdown, fixture, or dashboard-byte changes | focused tests + full suite + smoke | accepted: exact digests, 16/16 shards, 567 files / 1,726 tests, build, and 6/6 HTTP smoke |
| Close remotely | commit/tag each version, push once at final boundary, inspect CI | git refs + Node Evidence URL | passed in cumulative run 29693804255 |

## Progress ledger

| Version | State | Evidence |
|---|---|---|
| v2203 warning-zero | local acceptance complete; batched push/CI waits for v2205 | lint 0/0; typecheck; 16 focused files / 53 tests; security and all structural censuses ready; `d/2203/evidence/lint-zero-v2203-summary.json` |
| v2204 maintainability census | local acceptance complete; batched push/CI waits for v2205 | current tree ready: 91 near-limit files, 122 long functions, 238 complex functions, 2 runtime cycles; adversarial test 8/8; typecheck and lint 0/0; `d/2204/evidence/maintainability-census-v2204-summary.json` |
| v2205 hotspot repair | local acceptance complete; remote check batched | `statusRoutes.ts` 795 -> 215; `dashboardMarkup.ts` 793 -> 531; 34 routes and both dashboard digests preserved; direct route files repaired from rejected 82 to 80; census 89 / 121 / 238 / 2 ready; 567 files / 1,726 tests, build, static gates, and 6/6 HTTP smoke pass |

## Necessity proof for the new gate

- Blocker resolved: the existing 800-line check reports ready while 93 files remain
  above 600 lines; lint allows 261 warnings; no committed function-complexity or
  relative-import-cycle gate exists.
- Consumer: every later Node feature/refactor version and CI run consumes this gate.
- Existing checks cannot be reused: `elegance:census` measures names and suffix
  families, `source:size:census` owns the hard 800-line boundary, and ESLint currently
  has no complexity/cycle rules or shrink-only historical baseline.
- Growth stop: one census command, one baseline, and one focused test own all new
  maintainability metrics. No route, report, receipt, or evidence-service chain is
  created.

## New-file design note

- Abstraction: `maintainabilityScan` models source-file, function, and import-graph health.
- Data boundary: thresholds and historical violation keys live in one JSON baseline.
- Behavior boundary: AST span/complexity scanning and graph-cycle detection live in a helper.
- Command boundary: one short CLI compares the scan to the baseline and renders JSON/text.
- Test boundary: temporary fixture projects prove every fail-closed condition.
- No third implementation file is authorized; further metrics extend the same scan model.

## Version map

### v2203: warning-zero boundary

- Remove all 180 current warnings without changing runtime behavior or public exports.
- Prefer deleting unused imports/locals over suppression or underscore-renaming.
- Replace six explicit `any` annotations with `unknown`/narrow structural types.
- Change `eslint src test --max-warnings 261` to `--max-warnings 0` and update the
  exact script contract test.
- Acceptance: typecheck, lint 0/0, promotion archive focused tests, deployment evidence
  focused tests, security scan, and all existing structural censuses pass.

### v2204: maintainability census

- Add `scripts/maintainability-scan.mjs`, `scripts/maintainability-census.mjs`, one
  baseline, and one focused test file.
- Track exact legacy keys for source files over 600 physical lines, functions spanning
  over 120 physical lines, functions with branch complexity over 20, and relative-import cycles.
- Unknown/grown/stale baseline entries fail. Counts and exact key sets may only shrink;
  threshold changes fail validation.
- Wire `npm run maintainability:census` into Node Evidence after the existing elegance
  gates. Keep implementation files within the active name and size budgets.
- Acceptance: adversarial fixtures prove each failure class; current tree reports ready.

### v2205: hotspot repair and track closeout

- Select two highest-value near-limit files using severity, recent churn, call-graph
  impact, and parity-oracle strength. Current leading candidates are
  `src/routes/statusRoutes.ts` and `src/ui/dashboardMarkup.ts`.
- Reduce both selected files to at most 600 physical lines. Extract coherent concepts,
  not arbitrary line buckets; no third parallel family may appear.
- Freeze relevant route registrations and dashboard bytes before migration. Existing
  tests or a dedicated digest oracle must prove byte-identical output afterward.
- Refresh the maintainability baseline only to remove repaired entries; all other debt
  keys and ceilings remain unchanged.
- Write the final evidence summary and explain why further broad refactoring has lower
  value than feature work under the permanent gates.

## v2205 extraction design note

- Route abstraction: `statusReportRoutes` owns two existing route groups through separate real-read and release-gate registration functions.
- Route behavior boundary: one request-header-aware JSON/Markdown registrar removes repeated Fastify handlers.
- Dashboard abstraction: `dashboardScenarioMarkup` owns matrix, verification, and archive-evidence panels.
- Dashboard data boundary: markup remains raw text; the composed `dashboardMarkup` and full HTML stay byte-identical.
- Test boundary: one pre-migration oracle freezes 34 GET paths plus markup and full-page digests.

## v2205 final-regression deviation

- Finding: full-suite shard execution stopped on `governanceGrowthRatchet.test.ts` with 82 direct
  `src/routes/*.ts` files against the immutable ceiling of 80. This is a structural regression,
  not a flaky assertion and not a reason to raise the ceiling.
- Repair: keep the two route responsibilities as separate functions inside one
  `statusReportRoutes` module, and fold the ten-line dashboard registration shell into the
  existing `statusRoutes` module while preserving the call site and route order in `app.ts`.
- Stop condition: direct route files return to 80, the failed test passes unchanged, the
  maintainability census remains shrink-only, and route/dashboard parity remains exact.

All four conditions passed. The failed test was not edited, the ceiling was not raised,
and the final source layout contains one 369-line report-route module with two separate
registration functions plus a 215-line status entry module.

## v2205 final local verification

- Complete Vitest: all 16 final-tree shards passed, covering 567 test files and 1,726
  tests. `vitest list` independently reproduced the same totals.
- Timeout triage: a dual-shard/single-worker attempt timed out on shard 6 without an
  assertion failure. Its slow route file passed alone (1 file / 4 tests), and shard 6
  then passed unchanged (36 files / 118 tests) with the same total two-worker budget.
- Build and static gates: build, typecheck, zero-warning lint, maintainability, elegance,
  family, source-size, renderer, security/config, and archive-retention checks passed.
- Safe HTTP smoke: the owned process on port 31205 served health, metrics, runtime config,
  migrated real-read JSON/Markdown, and Dashboard HTML with 6/6 status 200 responses;
  the process stopped and the port closed afterward.
- Browser evidence: desktop full-page rendering passed and is archived at
  `d/2205/图片/dashboard-v2205-desktop.png`. Mobile inspection exposed long audit-button
  overflow; the browser also reported a favicon 404. Source inspection had already found
  duplicate document-shell tags. Because v2205 is byte-preserving, these pre-existing
  shell defects are recorded rather than hidden inside the migration and require a
  separately tested successor version.

## Verification cadence

- During v2203-v2205: focused tests, typecheck, lint, and affected censuses per slice.
- Before the final commit/push boundary: complete Vitest once, build once, all static
  gates once, safe HTTP smoke once, and dashboard browser validation if it is selected.
- Push all local version tags together after final local acceptance so GitHub runs one
  clean-checkout Node Evidence cycle rather than one full CI per intermediate version.

## Fail conditions

- Suppressing a warning, loosening a threshold, replacing one baseline violation with
  another, or editing an expectation/fixture to accept changed output: fail and revert.
- Splitting by arbitrary line count while increasing imports or duplicated behavior:
  fail and redesign around a named responsibility.
- Any production execution permission, write endpoint, sibling contract, or frozen
  archive change: out of scope and fail.
- A final claim based only on a progress table, without commands and committed evidence:
  fail.
