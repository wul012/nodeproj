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

## Claude capstone review — 2026-07-11 (v2191): C1–C3 PASS by independent live reproduction; capstone INCOMPLETE — v2192 required

- Independent reproduction, not transcript-trusting: the reviewer rebuilt the Java jar
  from CURRENT HEAD (a7237a85 = v1852, five versions newer than the candidate run) and
  re-ran `INTEGRATION_LIVE=1 npm run readiness:cross` with the real mini-kv CLI.
  Result: overall=pass, C1/C2/C3 pass, read_only=true, execution_allowed=false, both
  upstream commits pinned in provenance. The cross-project read contract holds against
  moving HEADs — the program's first real joint test reproduces.
- Design quality confirmed: zero-write surface census (2 GET routes; read-only mini-kv
  command list), genuine unauthenticated-write rejection (POST → 400), WAL-untouched
  proof, graceful shutdown with port-release verification. Maturity label correctly not
  upgraded; docs tests honestly state "external program-end review pending".
- **INCOMPLETE — the C4 four-project threshold is missing.** The readiness report
  contains no aiproj requirement ("aiproj" appears nowhere in it), but the aiproj
  capstone tie-in requires the report to validate ONE real aiproj artifact. Required
  v2192 (one version):
  1. Add requirement C4 "aiproj artifact validation": read one artifact listed in
     aiproj's committed `docs/artifact-schema-guard-registry.json` (publication receipt
     or experiment card), validate the registry's required fields, pin artifact path +
     sha256 + aiproj commit in provenance, and record the read-only/no-promotion
     boundary. File-read only — no aiproj process execution, no promotion authority.
  2. Rerun the live evidence with `MINIKV_CAPSTONE_COMMIT` set — the v2191 transcript
     left `mini_kv_commit` null; the reviewer's rerun proves the field works.
- After v2192 is green and reviewed, the program-end verdict issues and the maturity
  label may change program-wide. Stage-2 remains blocked until then.

## Codex v2192 correction candidate — 2026-07-11

- Added the missing C4 as a real fourth-project requirement. The runner now reads
  aiproj's committed schema registry and exactly one registered publication receipt,
  validates required fields, expected values and type rules, and records both file
  digests plus the no-promotion boundary without starting an aiproj process.
- Upgraded the aggregate report to schema v2 and pinned Java, mini-kv, and aiproj
  commits. The fixed-input live run reports C1/C2/C3/C4 pass, read_only=true,
  execution_allowed=false; every owned PID exited, the Java port was released, and no
  fallback kill was used. Evidence is under `d/2192/evidence/`.
- Final local gates passed: 557 test files / 1,696 tests; coverage
  95.56/87.29/98.45/95.53 against unchanged 94/86/97/94 floors; typecheck,
  build, lint 0/261, security 18/18, renderer/source-size/archive censuses green.
- This is still a local candidate. Stop after green CI and request the external
  program-end review; do not change the maturity label or activate Stage 2 locally.

## Claude program-end review — 2026-07-11 (v2192): **CAPSTONE C1–C4 PASS**

- The reviewer re-ran the full four-project capstone live and independently
  (own-built Java jar from v1852, real mini-kv CLI, real aiproj registry+receipt):
  overall=pass, C1/C2/C3/C4 pass, read_only=true, execution_allowed=false, all three
  upstream commits pinned. The C4 receipt's sha256 was recomputed from the aiproj tree
  and matches. Canonical verdict lives in
  `docs/plans/production-excellence-final-acceptance.md` (PROGRAM-END VERDICT section).
- Node may now, in one maintenance version: update the maturity label to the exact
  authorized wording in the verdict, refresh README/START_HERE/boundaries + docs tests
  accordingly, and add a capstone-rerun pointer to the regression surface. After that:
  maintenance-only until Java's track closes (the program's last open item).
- Stage 2 remains blocked until the Java track passes its final review.

## Claude review — 2026-07-12 (v2193): PASS — maturity maintenance verified, Node parked

- Verified: the authorized label landed byte-for-byte in README and
  PRODUCTION_BOUNDARIES, and v2193 went further than asked — the label is pinned by a
  contract test (`test/productionMaturityContract.ts`) so drift now fails CI, and the
  live capstone is documented as an explicit regression window with the exact command.
  Run green.
- Node is now maintenance-only until the Java track closes. Update 2026-07-12: the
  sanctioned maintenance work is the bounded elegance program —
  `docs/plans/elegance-hotspot-program-node.md` (E-N1 commits the AGENTS sweep and the
  mechanical gates; ≤5 versions; subordinate to the program close).
- At Java track close: re-run `INTEGRATION_LIVE=1 npm run readiness:cross` against
  Java's final tag and attach the report to the program-close review request.

## Codex v2193 maintenance closeout — 2026-07-11

- The exact authorized read-only integration label is now applied across active
  Node documentation and protected by shared docs-test constants.
- The existing one-command capstone is an explicit regression surface for Java
  final close and capstone-contract changes; it remains outside default CI.
- Local closeout gates pass: 557 files / 1,697 tests, typecheck, build, lint
  0/261, security 18/18, renderer/source-size/archive censuses. Evidence:
  `d/2193/evidence/capstone-maturity-maintenance-v2193-summary.json`.
- After v2193 push and green final CI, stop. No Stage 2 or new Node feature chain
  is authorized while Java Stage-1 remains open.
