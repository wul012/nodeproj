# Production Excellence — Final Acceptance Program

Status: active. Written 2026-07-06 by Claude (planner/final reviewer) from fresh evidence,
superseding nothing: `production-excellence-program.md` and the three playbooks remain the
base standard (gates E1–E10). This document defines what "all done, excellently" means,
what verifiably remains, and the acceptance bar. It is deliberately strict: a gate counts
only when a committed mechanical check fails on regression. Prose claims count for nothing.

## Verified state (2026-07-06, evidence-checked, not self-reported)

| Track | Done | Remaining |
| ----- | ---- | --------- |
| mini-kv | K0–K6 complete + reviewed; coursework v1629–v1636 shipped and independently verified | Receipts-consolidation stretch open (2/28 files migrated; no-network canonical-surface decision pinned but unresolved); docs freshness after OSFS; program-end audit |
| Node | N0, N2, N3, N4 complete | **N1: 87 unmigrated full-report renderers** (census v2154: h3 17, map 45, flatMap 37); N5 blocked on N1; program-end audit |
| Java | J0–J6 complete; extraction J7–J36 (root 1,330 → 874) | v1826 closeout reconciliation; extraction series to structural completion; untracked `docs/project-explanation/` in tree; program-end audit |
| Cross-project | Contract alignment + frozen fixtures + digest assertions (439 path refs) | **Real joint testing: never attempted.** The shared AGENTS.md threshold is unmet |

## Definition of DONE (strict)

The program is complete when ALL of the following hold, each verified by the final
reviewer from fresh evidence, not from progress tables:

1. **Per-repo E1–E10 green** with every gate mechanically enforced, all waivers written,
   justified, and enumerated in one place per repo. Known accepted waivers carry forward
   (mini-kv `shard_readiness_boundary_field_names.cpp`, gcovr negative-hits workaround).
   New waivers require a reason the reviewer can check, not a preference.
2. **No open consolidation debt without an end-state census.** Node renderer census reaches
   0 unmigrated or a per-family written waiver (criteria in the Node brief). Java root-ops
   census reaches the structural end state (criteria in the Java brief). mini-kv receipts
   reach 28/28 or a written stop decision at a defined boundary.
3. **Docs honesty re-verified at end state**: README / START_HERE / PRODUCTION_BOUNDARIES /
   PRODUCTION_READINESS / CAPABILITY-SNAPSHOT statements checked against the final tree,
   not the tree they were written for.
4. **Integration capstone passed** (below). Until then the honest label remains
   `single-project validation + cross-project contract alignment` and no doc may claim more.

## Integration capstone (the only new scope in this program)

Goal: cross the shared-AGENTS threshold with the SMALLEST real slice, all read-only,
no execution authority, no contract changes. Runs after (or in parallel with, but
accepted only after) per-repo tracks close. Owner: Node session, since Node is the
consumer/control plane.

- C1 **Live Java read**: an env-gated integration suite (`INTEGRATION_LIVE=1`, excluded
  from default CI) that boots the packaged Java jar (prod profile, H2), calls read-only
  `/actuator/health` and one ops evidence endpoint, asserts HTTP 200 + schema fields, then
  shuts down gracefully. Failure of the gate when the server is absent must be "skipped",
  never a false green.
- C2 **Live mini-kv read**: the suite executes the real `minikv_cli` (path via env var) to
  produce fresh `SMOKEJSON`/`CHECKJSON` output, and Node validates schema + `read_only` /
  `execution_allowed:false` boundary fields from the fresh output, not from a frozen fixture.
- C3 **No-write proof**: tests assert the Node upstream clients expose zero write methods
  (route census), and one live probe proves a Java write route rejects an unauthenticated
  request. mini-kv side reuses the existing CHECKJSON no-execution receipt, asserted from
  C2's fresh output.
- C4 **One command**: `npm run readiness:cross` produces a single cross-project readiness
  report (JSON + markdown) aggregating C1–C3 results with explicit `read_only: true`,
  `execution_allowed: false`, and per-check pass/fail/skipped. Archived transcript of one
  full local run is the acceptance evidence; a CI job is a stretch goal, not required.
- Only after C1–C4 pass may any doc in any repo change the maturity claim, and the new
  claim must cite the capstone evidence.

## Sequencing

1. Java: reconcile v1826 closeout immediately (it may be half-closed). Then extraction
   series continues. — brief: `production-excellence-java-final-push.md`
2. Node: finish N1, then N5. — brief: `production-excellence-node-final-push.md`
3. mini-kv: receipts completion + docs freshness. — brief:
   `D:\C\mini-kv\治理计划\v1637-production-excellence-completion-brief.md`
4. Integration capstone last, in the Node repo.
All three repo tracks may run in parallel (non-contract work, own repos only). The
original program's hard rules 1–5 (frozen archive paths, no new governance chains,
mechanical-change limits, per-repo AGENTS conventions) bind every step.

## Review protocol (unchanged in spirit, tightened in letter)

- Checkpoints: Java after v1826 reconciliation and then every 5 extraction batches;
  Node after every 5 renderer batches, after N1 close, after N5; mini-kv after receipts
  completion; program end after the capstone.
- At each checkpoint the user asks the Claude session to "check <repo>". Review is
  adversarial: fresh build, fresh test run, spot-checked byte-parity, doc claims diffed
  against the tree. A checkpoint FAILS if any progress-table claim cannot be reproduced.
- Failure handling: a failed checkpoint's fixes are the next version; no new work lands
  on top of an unreproduced claim.

## Explicit fail conditions (what "not too generous" means)

- A gate satisfied by a doc sentence with no failing check = not satisfied.
- A test edited to make a migration pass = the migration is wrong; revert.
- A waiver written after the fact to avoid work the recipe covers = rejected.
- Screenshots/walkthroughs advancing ahead of executable evidence = version incomplete.
- Version scope creep (feature work smuggled into consolidation batches) = revert the batch.

## Node capstone candidate status — v2191, 2026-07-11

- C1-C4 implementation and one full local run are complete. The archived report
  records `live_requested=true`, C1/C2/C3 pass, `read_only=true`, and
  `execution_allowed=false`.
- Java was built from fixed commit `894deeb0` in an isolated worktree; its active
  extraction worktree was not modified. mini-kv/aiproj received no source writes.
- The maturity label remains unchanged. This is a local candidate only; request
  the external program-end review and do not activate Stage 2 before PASS.
