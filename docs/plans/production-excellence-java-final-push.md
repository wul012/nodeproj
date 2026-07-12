# Java Final Push — reconcile v1826, finish the ops extraction, close the track

Executor: Codex session in `D:\javaproj\advanced-order-platform`. Parent:
`docs/plans/production-excellence-final-acceptance.md` (this repo reads Node plans
read-only; progress is recorded ONLY in the Java repo's
`docs/production-excellence-progress.md`). Base playbook stays authoritative:
`docs/plans/production-excellence-java-playbook.md` (in the Node repo).
Binding conventions: focused tests + Spotless + full `mvnw verify` (tests, JaCoCo floors,
SpotBugs 0 new, Spotless) per version; 中文 walkthrough ≥3000 CJK written BEFORE the final
verify (the v1799 lesson); commit + tag + push + green Actions run before the next batch;
frozen archive paths; shrink-only SpotBugs baseline; route strings byte-identical.

## Step 0 — reconcile v1826 and the dirty tree (do this first, one version)

1. The progress ledger says v1826 "commit, tag, push, remote CI pending" but commit
   `dd3e1db0` exists. Determine exactly what is missing: `git tag --list 'v1826*'`,
   `git status -sb` vs remote, `gh run list` (or Actions page). Complete whatever is
   missing — tag with the established naming pattern, push, wait for green CI — and
   update the ledger row to "completed; remote CI passed" with the run id.
2. The untracked `docs/project-explanation/project-value-and-flow.md` must stop floating:
   read it; if it is real explanatory content, commit it (this version or folded into the
   v1826 closeout with a ledger note); if it is scratch, delete it. An untracked file
   living in the tree across versions is a cleanup-gate violation.

## Phase 1 — extraction series to structural completion

1. Continue the established J7+ recipe (public RoutePaths owner, byte-identical routes,
   package-local tests move with implementation, SpotBugs exclusion FQN relocation,
   ratchet lowered each batch). Nothing about the recipe changes; this brief adds an
   explicit END STATE so the series does not run forever:
   - **Done when the direct-root `ops` package contains only**: controllers, the shared
     route aggregators, genuinely cross-family shared roots, and files on the committed
     waiver list. Everything family-shaped is extracted.
2. At the next version, produce a **remaining-families census**: group the current direct
   root files (874 at v1826) into named extraction families with file counts, plus the
   projected end-state root count. Commit it as
   `docs/ops/extraction-endgame-census-v<version>.md`. This number is the contract;
   the reviewer will hold the series to it.
3. Batch rhythm unchanged (one family or coherent cluster per version). Every 5 batches:
   pause for a Claude checkpoint review before continuing. Any batch whose full
   `mvnw verify` was not run (or was run before the walkthrough was final) is invalid.
   Pipelining: while `mvnw verify` runs (6–14 min), do read-only preparation of the next
   batch (family file list, route constants, exclusion FQNs) — no writes until green.
   If the census is not already runnable as one command, commit it as a script in the
   next batch so batches and reviews use the identical definition.
3b. Optional toolchain-acceleration version (one version, any time): evaluate Maven
   Daemon (`mvnd`) and/or `mvnw -T 1C` for the verify cycle. Adoption gate: full verify
   output identical (same test count, same gate results) AND measurably faster across 3
   consecutive runs; record the numbers in the version doc. If not clearly better,
   record the negative result and stay on plain `mvnw`.
4. Waivers: a root file may stay only if extraction would break a public contract or it
   is genuinely shared by 3+ families; each waiver is one entry in
   `docs/ops/extraction-waivers.md` with the reviewer check written down.

## Phase 2 — track closeout (1–2 versions)

1. Final census version: root count matches the endgame census (or better); ratchet
   test pinned at the final number; waiver doc complete.
2. Self-audit vs E1–E10 with file evidence; refresh `PRODUCTION_READINESS.md`,
   `CHANGELOG.md`, and the coverage baseline doc to the end state (ratchet floors up if
   actuals exceed them by >2 points; never down). SpotBugs baseline: record final count;
   it must be ≤ the J1 baseline and shrink-only remains enforced.
3. Produce `docs/java-track-final-evidence.md` (in the Java repo): gate-by-gate table,
   final censuses, waiver lists, CI run links. Request Claude review.

## Fail conditions specific to this brief

- Tag/push/CI deferred "to batch later" = the version is not complete; nothing new starts.
- A walkthrough written or expanded after its version's final verify = redo the verify.
- Ratchet loosened (number raised) for any reason = revert; ratchets only tighten.
- An extraction that changes any route string, response byte, or write boundary = revert.
- The endgame census revised upward without a waiver entry = checkpoint fail.

## Claude checkpoint review — 2026-07-07 (v1827–v1833): PASS with three corrections

- Verified: step-0 reconciliation (v1827) and endgame census (v1828: 805 → target 105)
  executed as briefed; v1829–v1833 all CI green; clean tree at review time.
- Correction 1 (recurred, now promoted to AGENTS Program Discipline): the J43 ledger row
  still said "commit/tag/push pending" while v1833 was already pushed with green CI.
  Close the ledger row in the same session as the tag push, before anything new starts.
- Correction 2: progress rows remain paragraph walls; apply the ≤3-line row rule from the
  next row onward — details belong in the per-version `docs/ops/` extraction docs.
- Correction 3: publish the exact census command inside the endgame census doc; the
  reviewer's independent count could not reproduce 805 with an obvious glob, and the
  census is only a contract if both sides compute it identically.
- Continue batches. Next checkpoint after 5 more.

## Claude checkpoint review — 2026-07-10 (v1834–v1836): PASS with one contract note

- Verified: all three 07-07 corrections implemented — ledger rows now close with
  commit/tag/CI-run id in-session, rows are within budget, and the census command is
  committed (`scripts/ops-root-census.ps1`, published in the endgame census doc).
- The v1834–v1837 maintainability program is high quality (reproducible hotspot census,
  shrink-only aggregate + named-file budgets, facade 1126→662→199 with full verify green)
  and is sanctioned by the AGENTS refactoring-rhythm rule — but it pauses this brief's
  extraction series without amending it. Contract note: when interleaving a multi-version
  side program, add one line to the active brief (or ledger) naming the pause and the
  resume point, so the brief stays the single contract.
- After v1837 closes: resume extraction batches toward the endgame census target
  (root 805 → 105); next checkpoint after 5 extraction batches or at v1837 close.

## Claude review addendum — 2026-07-10 晚: v1837 verified closed; maintainability program COMPLETE

- v1837 both runs green; ledger row J47 closed in-session with commit/tag/run id. The row
  honestly records a mid-version self-caught +2 root-census violation fixed without
  loosening ratchets — exactly the intended gate behavior. All four planned versions
  (v1834–v1837) delivered; budgets ended tighter than baseline (>500: 39→35, >750: 5→3).
- Resume the extraction series now (direct-root 805 → endgame 105, `scripts/ops-root-census.ps1`
  is the number of record). Next checkpoint after 5 extraction batches.

## Claude checkpoint review — 2026-07-11 (v1838–v1842): PASS with one recurrence note

- Verified by running the committed census: direct-root 805 → 696 (109 files in 5
  batches, ~22/batch), UnassignedFiles empty, all ten runs green, extraction recipe
  unchanged (controllers root-visible, public route owners, package-local tests move).
- Recurrence note on the promoted ledger rule: the J52/v1842 row still reads "completed
  locally; remote CI running" although both v1842 runs concluded green. v1842 was the
  FINAL version of the batch, which the remote-verification policy says to block-watch;
  the row must be refreshed to final state with the run id before the session ends.
  Reality gap is zero (CI is green) — this is a row-refresh miss, but it is the third
  strike on a rule that was promoted BECAUSE of two prior strikes. Close the J52 row
  as the first action of the next session, before any new batch.
- Pace math: 591 non-controller root files remain to reach 105; at ~22/batch that is
  ~27 more batches. Continue; next checkpoint after 5 more.

## Claude checkpoint review — 2026-07-11 晚 (v1843–v1847): PASS, no corrections

- Verified by running the committed census: direct-root 696 → 573 (123 files in 5
  batches, pace up to ~25/batch), UnassignedFiles empty, all runs green.
- The J52 row was closed as the first action exactly as instructed, and J53–J57 rows
  closed in-session with run ids — the ledger rule finally held for a full batch cycle.
- 468 non-controller root files remain; ~19 batches to the 105 target at current pace.
  Continue; next checkpoint after 5 more. When the Node capstone (C1) requests the
  env-gated live Java read, that request takes priority over one extraction batch.

## Active Node C1 coordination request — 2026-07-11

- Node has started `docs/plans/v2191-integration-capstone-roadmap.md` after the
  authorized Stage-1 PASS. Java may continue extraction batches normally.
- At the next clean batch boundary, Node will build a packaged jar from one exact
  committed Java HEAD and run it with the `prod` profile plus H2. No Java source,
  ledger, tag, branch, fixture, or test expectation change is requested.
- The live slice is read-only except for one deliberately unauthenticated POST to
  `/api/v1/failed-events/0/replay`; it must be rejected by the operator-context guard
  before the business service is invoked. Node owns the process, port, evidence and
  cleanup. A dirty or moving Java HEAD is not an acceptable capstone artifact.

## Claude checkpoint review — 2026-07-11 深夜 (v1848–v1852): PASS, no corrections

- Verified by running the committed census: direct-root 573 → 471 (102 files in 5 green
  batches), UnassignedFiles empty, all rows closed in-session with run ids — the ledger
  rule has now held for two consecutive batch cycles.
- Capstone note: the reviewer independently re-ran the Node capstone LIVE against Java
  HEAD a7237a85 (v1852) — health, ops-evidence read, and the unauthenticated-write
  rejection all held against this repo's current code. The Java-side contract is doing
  its job under a moving HEAD.
- 366 non-controller root files remain (~15 batches). Continue; next checkpoint after
  5 more.

## Claude checkpoint review — 2026-07-12 (v1853–v1857): PASS, no corrections — endgame in sight

- Verified by running the committed census: direct-root 471 → 249 (221 files in exactly
  5 batches, including the 118-file ReleaseApproval closure as one green version);
  UnassignedFiles empty; all rows closed in-session with run ids — third consecutive
  clean ledger cycle.
- Java is the FIRST repo to commit the Elegance Gates (swept into v1854's AGENTS.md).
  The gates' mechanical check (name census extension of
  `scripts/java-maintainability-census.ps1` + shrink-only baseline) is due in a
  governance version before track close.
- 145 non-controller files remain — roughly 3–4 batches to the 105-file endgame target.
  When the census hits target: run Phase 2 track closeout as briefed (final census
  pinned, E1–E10 self-audit, `docs/java-track-final-evidence.md`), then request the
  Java track final review — that review triggers the PROGRAM-close sequence (capstone
  rerun against Java's final tag).
