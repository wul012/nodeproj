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
- C4 **aiproj artifact validation**: Node reads one JSON artifact listed in aiproj's
  committed `docs/artifact-schema-guard-registry.json`, validates the selected schema's
  required fields, expected values, and type rules, and pins the registry/artifact path,
  SHA-256, and aiproj commit. This is file-read only: no aiproj process, network,
  training, artifact rewrite, or promotion authority.
- **One-command acceptance mechanism**: `npm run readiness:cross` produces a single
  cross-project readiness report (JSON + markdown) aggregating C1–C4 with explicit
  `read_only: true`, `execution_allowed: false`, and per-check pass/fail/skipped.
  Archived transcript of one full local run is the acceptance evidence; a CI job is a
  stretch goal, not required.
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

## Node capstone candidate status — v2191-v2192, 2026-07-11

- v2191 implemented and independently reproduced C1-C3, but the external review found
  that its former C4 label described only report aggregation and omitted aiproj. v2192
  therefore replaces that false fourth-project claim with a real C4 artifact check while
  retaining the one-command report as the acceptance mechanism.
- The v2192 archived report records `live_requested=true`, C1/C2/C3/C4 pass,
  `read_only=true`, and `execution_allowed=false`. Java, mini-kv, and aiproj commits are
  all non-null in provenance.
- Java was built from fixed commit `a7237a85` in an isolated worktree; mini-kv was read
  through the existing CLI at commit `12b08563`; aiproj's committed registry and receipt
  were read at `5d6c288b`. No sibling source or active worktree was modified.
- The maturity label remains unchanged. This is a local candidate only; request
  the external program-end review and do not activate Stage 2 before PASS.

## PROGRAM-END VERDICT — Claude external review, 2026-07-11: capstone C1–C4 PASS

- Basis: the reviewer reproduced the capstone LIVE twice, independently of the archived
  transcripts — first C1–C3 at v2191 (Java jar rebuilt from HEAD v1852), then the full
  four-project run at v2192 (`INTEGRATION_LIVE=1`, real Java jar, real mini-kv CLI,
  real aiproj registry+receipt). Reviewer's run: overall=pass, C1/C2/C3/C4 pass,
  read_only=true, execution_allowed=false; provenance pinned java `a7237a85`,
  mini-kv `12b08563`, aiproj `5d6c288b` (all current HEADs). The C4 artifact is a real,
  git-tracked aiproj publication receipt whose sha256 the reviewer recomputed and
  matched; the registry sha matches the committed file.
- **Maturity label change AUTHORIZED**, exact wording (repos update it in their next
  version, byte-for-byte): `single-project validation + verified read-only
  cross-project integration (env-gated, single machine, no execution authority)`.
  Nothing stronger; "production" remains a false claim.
- Program state after this verdict: aiproj, mini-kv, and Node Stage-1 tracks CLOSED and
  the capstone PASSED. Java's Stage-1 track remains OPEN (ops extraction 471 → 105 and
  its Phase-2 closeout). The PROGRAM as a whole closes — and Stage 2 unblocks — only
  when Java's track passes its own final review. Until then: Node and mini-kv take
  maintenance-only versions; the capstone rerun (one command) joins Node's regression
  surface and must stay green when re-run at Java track close.

## Codex v2193 authorized maintenance closeout — 2026-07-11

- Applied the authorized maturity label byte-for-byte across the active Node
  entry, boundary, evidence, playbook, and agent surfaces. Public docs now record
  the independently reproduced C1-C4 PASS while keeping production execution and
  Stage 2 blocked until Java final review.
- Registered `INTEGRATION_LIVE=1 npm run readiness:cross` as the canonical live
  regression at Java track close and after capstone-contract changes. Default CI
  remains intentionally excluded; docs tests mechanically protect both facts.
- Final local gates: 557 test files / 1,697 tests passed in 8 sequential shards
  with at most 2 workers; typecheck/build green; lint 0/261; security 18/18;
  renderer 242 standardized / 3 composition-only waivers / 0 non-waived;
  source-size 0 oversized; archive retention 7,035 files / 62.66 MiB.
- Stop after v2193 commit/tag/push/green final CI. Node remains maintenance-only;
  the next live capstone evidence is produced at Java final track close, not by
  extending the Node readiness chain now.
