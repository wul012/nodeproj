# v2187-v2189 N5 source-size health roadmap

## Objective

Close Node Production Excellence N5 without changing public routes, report bytes,
schemas, fixtures, or cross-project contracts. Every source file under `src/` must
finish at 800 lines or fewer unless a mechanically justified waiver is committed.
The target for this series is zero waivers and zero oversized source files.

## Step-0 reconciliation and deviation

- Baseline commit/tag: `3d53f5a7` / `v2186`.
- N1 external review: PASS; N5 is explicitly unblocked in
  `production-excellence-node-final-push.md`.
- Node Evidence run `29086454703`: green, including test, build, and all safe smoke
  steps.
- Renderer census: 245 total / 242 standardized / 3 AST-validated
  composition-only waivers / 0 non-waived unstandardized.
- Fresh N5 census: 16 files over 800 lines, not the 5 recorded at the original
  program audit. The fresh census wins. The difference comes from later production
  governance growth and from the old v248 code-health inventory naming files that
  have since been split or renamed.
- Existing dirty files `AGENTS.md`, `production-excellence-java-final-push.md`, and
  `production-excellence-node-final-push.md` are external review/rule inputs. This
  series reads but does not stage or overwrite them.

## Necessity proof

- Blocker resolved: E9 cannot be mechanically accepted while 16 non-generated
  source files exceed the documented 800-line boundary.
- Later consumer: Phase 3 gate-by-gate closeout and the external N5 reviewer consume
  the final source-size census and ratchet result.
- Existing surface is insufficient: `managedAuditSandboxCodeHealthPass.ts` records
  a historical three-file checklist with 900/1200/1400 targets; it neither scans all
  `src/` files nor fails when a new oversized file appears.
- Stop condition: the canonical census reports zero oversized files, the committed
  ratchet fails on any future `src/` file above 800 lines, all public behavior tests
  remain green, and N5 receives external review.

## Requirement-evidence matrix

| Requirement | Implementation | Mechanical evidence | Initial state |
|---|---|---|---|
| Reproducible census | `scripts/source-size-census.mjs` | JSON output from one command | complete |
| No new oversized files during migration | shrink-only remediation baseline | ratchet test rejects unknown/growing entries | complete |
| Contract-preserving splits | original modules remain public entry points | typecheck + existing focused/full tests | complete locally |
| Byte-identical reports | move declarations/constants/helpers without changing values | renderer parity plus v2189 AST/runtime audit | complete locally |
| Final E9 gate | remediation baseline becomes empty | ratchet rejects every `src/` file above 800 | complete locally |
| Reviewable maintenance record | per-version evidence and Chinese walkthrough | documentation quality gate | complete locally |

## Fresh census and version ownership

### v2187: census foundation and static evidence/type boundaries

- `src/services/productionReadinessSummaryV4.ts` (929): extract public data types to
  `src/contracts/` so service-chain file count does not grow.
- `src/services/crossProjectEvidenceRetentionGate.ts` (891): extract immutable
  Java/mini-kv fixture references to `src/evidence/`.
- `src/services/crossProjectReleaseBundleGate.ts` (850): extract immutable bundle
  references to `src/evidence/`.
- `src/services/productionEnvironmentPreflightChecklist.ts` (847): extract immutable
  environment evidence references to `src/evidence/`.
- `src/services/releaseApprovalDecisionRehearsalPacket.ts` (829): extract immutable
  approval evidence references to `src/evidence/`.
- `src/services/rollbackWindowReadinessChecklist.ts` (829): extract immutable rollback
  evidence references to `src/evidence/`.
- Add canonical census, shrink-only remediation baseline, and ratchet test.
- Before first N5 push, run the complete renderer migration parity suite in an
  independent `core.autocrlf=false` checkout and attach the result.

### v2188: evidence-service ownership boundaries

- `managedAuditManualSandboxConnectionRehearsalPacketReview.ts` (905).
- `managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts` (890).
- `managedAuditManualSandboxConnectionPreconditionIntake.ts` (860).
- `managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification.ts` (848).
- `managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.ts` (816).
- `managedAuditSandboxAdapterDryRunPackage.ts` (814).

These files will retain their public loader/renderer entry points while evidence
types, immutable references, and parsing/support responsibilities move to named
adjacent modules.

### v2189: route/UI/runtime boundaries and final ratchet

- `src/ui/dashboardClientScript.ts` (1080): split the embedded client artifact into
  stable ordered fragments with a byte-parity assertion.
- `src/routes/statusRoutes.ts` (896): extract cohesive route registration groups while
  keeping `registerStatusRoutes` as the public facade.
- `managedAuditManualSandboxConnectionRehearsalGuard.ts` (813): extract evidence
  support responsibilities.
- `threeProjectRealReadRuntimeSmokeExecutionPacket.ts` (813): extract runtime record
  formatting/classification support.
- Remove all remediation entries and require zero files above 800 lines.

## Invariants and fail conditions

- Existing test expectations and fixtures are never edited to accommodate output
  drift. A split that changes output is repaired or reverted.
- Public import paths remain valid through imports/re-exports or facade functions.
- No N5 batch adds product functionality, routes, schemas, evidence chains, or live
  execution authority.
- No batch is pushed while local LF parity or the previous Node Evidence run is red.
- Each version stays below 3000 changed lines and carries a Chinese walkthrough of at
  least 3000 Chinese characters without repeated filler.
- Checkpoint priority applies: stop after v2189/N5 close or after three versions,
  whichever comes first, and request external review before Phase 3.

## Cross-project parallel statement

Java and mini-kv are **recommended parallel**. This series changes only Node module
ownership and local tests, consumes frozen historical evidence, requires no fresh
sibling version, and does not make Node a pre-approval blocker. No sibling process is
started, stopped, built, tested, or modified by this session.

## Progress

| Version | Result | Oversized count | Verification state |
|---|---|---:|---|
| v2187 | Canonical census/ratchet plus six contracts/static-evidence splits | 16 -> 10 | local and Node Evidence green |
| v2188 | Six evidence-service ownership splits; service/route counts unchanged | 10 -> 4 | local and Node Evidence green |
| v2189 | UI, route, rehearsal guard, and runtime packet; empty baseline | 4 -> 0 | local verification green; external N5 review pending |

## N5 implementation closeout

- Canonical result: 1234 source files scanned, threshold 800, zero oversized
  files, zero remediation entries, zero waivers, and `ready: true`.
- Contract audit: dashboard runtime bytes and SHA-256 match v2188; four approval
  route statements are AST-identical; 25 guard and 8 runtime declarations have
  no content mismatch after their ownership move.
- Full suite: all eight deterministic shards passed, totaling 546 files and
  1662 tests with aggregate Vitest duration 3251.70 seconds.
- Governance: root service/route counts remain 1125/80; lint is 0 errors and
  261 warnings, below the 263 baseline; renderer census remains 242/245 with
  three AST-validated composition-only waivers and zero non-waived remainder.
- Evidence: `docs/plans/node-n5-close-evidence.md` and
  `d/2189/evidence/n5-source-size-closure-v2189-summary.json`.
- Checkpoint: implementation is complete, but N5 is not externally accepted
  until review. Phase 3 remains blocked by the checkpoint rule.
