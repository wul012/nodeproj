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
