# Node N5 source-size close evidence

## Review status

- Implementation checkpoint: `v2189`, commit `325bbe9e`.
- External N5 decision: `PASS, no corrections` (2026-07-11).
- Phase 3: unblocked and owned by the separate v2190 closeout roadmap.
- Scope: internal module ownership and permanent source-size ratchet only.

## Reproducible acceptance commands

```powershell
node scripts/source-size-census.mjs --json
npx vitest run test/sourceSizeRatchet.test.ts test/governanceGrowthRatchet.test.ts --maxWorkers=2
npm run typecheck
npm run lint
npm run renderer:census
npm run build
```

The canonical census result is 1234 files scanned, threshold 800, zero oversized files, zero remediation entries, and `ready: true`. The committed baseline is intentionally empty, so a future source file at 801 lines fails instead of silently creating a new allowance.

## Sixteen-file disposition

| Version | Original source | Resulting ownership |
| --- | --- | --- |
| v2187 | `productionReadinessSummaryV4.ts` | Public profile types moved to `src/contracts`; service facade retained |
| v2187 | `crossProjectEvidenceRetentionGate.ts` | Frozen evidence references moved to `src/evidence`; loader/renderer retained |
| v2187 | `crossProjectReleaseBundleGate.ts` | Frozen bundle references moved to `src/evidence`; loader/renderer retained |
| v2187 | `productionEnvironmentPreflightChecklist.ts` | Environment evidence references moved to `src/evidence`; public facade retained |
| v2187 | `releaseApprovalDecisionRehearsalPacket.ts` | Approval evidence references moved to `src/evidence`; public facade retained |
| v2187 | `rollbackWindowReadinessChecklist.ts` | Rollback evidence references moved to `src/evidence`; public facade retained |
| v2188 | `managedAuditManualSandboxConnectionRehearsalPacketReview.ts` | Historical path and parsing ownership moved to a named evidence module |
| v2188 | `managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts` | Operator-window evidence contracts moved to a named evidence module |
| v2188 | `managedAuditManualSandboxConnectionPreconditionIntake.ts` | Precondition evidence contracts and accepted guards moved to `src/evidence` |
| v2188 | `managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification.ts` | Requirement-to-snippet mappings moved to `src/evidence` |
| v2188 | `managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.ts` | Frozen paths and defensive field readers moved to `src/evidence` |
| v2188 | `managedAuditSandboxAdapterDryRunPackage.ts` | Package evidence paths and accepted digest sets moved to `src/evidence` |
| v2189 | `dashboardClientScript.ts` | Public facade concatenates three ordered UI fragments; runtime bytes frozen by hash test |
| v2189 | `statusRoutes.ts` | Four approval routes moved to the existing deployment route owner at the same registration point |
| v2189 | `managedAuditManualSandboxConnectionRehearsalGuard.ts` | Historical evidence I/O and formatting moved to `src/evidence` |
| v2189 | `threeProjectRealReadRuntimeSmokeExecutionPacket.ts` | Record construction, failure classification, and record rendering moved to `src/runtime` |

## Contract-preservation evidence

- Dashboard runtime artifact: 51041 characters and SHA-256 `5771c499a2987853de06731340221b5ad800930431da59f1b80439f4645c7f3f`, byte-identical to the v2188 source artifact.
- Approval routes: four moved Fastify expression statements are AST-identical to their `git HEAD` originals; the facade calls the helper at the original registration position.
- Rehearsal guard: 25 moved declarations compare identically after ignoring the added export modifier.
- Runtime packet: eight moved declarations compare identically after ignoring the added export modifier; `RuntimeSmokeExecutionRecord` remains re-exported from its original public module.
- Existing expectations and frozen fixtures were not edited. The renderer parity normalizer remains frozen and unchanged.

## Governance and boundaries

- Root service/route counts remain 1125/80; no growth baseline was raised.
- Lint is 0 errors and 261 warnings, below the 263 N0 baseline.
- No route, response schema, fixture, sibling contract, production authority, or upstream action setting changed.
- Java and mini-kv are recommended parallel. No fresh sibling evidence is required, and Node is not their pre-approval blocker.

## Reviewer decision evidence

The final local eight-shard suite passed 546 files and 1662 tests; aggregate Vitest duration was 3251.70 seconds. The walkthrough quality gate passed 2 files and 8 tests, and the v2189 walkthrough contains 3283 Chinese characters across 10 H2 sections. Tag `v2189` points to commit `325bbe9e`; GitHub Actions Node Evidence run [29131852707](https://github.com/wul012/nodeproj/actions/runs/29131852707) passed in 14m05s. Full local details and the interrupted-wrapper deviation are recorded in `d/2189/evidence/n5-source-size-closure-v2189-summary.json`. Claude reproduced the empty census and granted N5 PASS with no corrections on 2026-07-11.
