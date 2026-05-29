# Node v382 run note: active shard plan boundary handoff intake

v382 consumes Java v158 and mini-kv v149 frozen boundary handoff evidence after Node v381. It is not a live-read gate: it does not start Java or mini-kv, does not mutate sibling state, does not open managed audit, and keeps active shard prototype disabled.

## Artifacts

```text
e/382/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382-http.json
e/382/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382-http.md
e/382/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382-summary.json
e/382/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382-browser-snapshot.md
e/382/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382.html
e/382/图片/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382.png
```

## Evidence inputs

```text
Node source: e/381/evidence/java-mini-kv-active-shard-plan-evidence-intake-archive-verification-v381-http.json
Java v158: fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/158/evidence/java-shard-readiness-active-shard-plan-handoff-v158.json
mini-kv v149: fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v149.json
mini-kv v148: fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v148.json
```

## Result

```text
readyForActiveShardPlanBoundaryHandoffIntake = true
readyForNodeV383ArchiveVerification = true
checks = 39/39
productionBlockers = 0
Java = Java v158
mini-kv handoff = v149
mini-kv frozen plan = v148
startsJavaService = false
startsMiniKvService = false
executionAllowed = false
activeShardPrototypeEnabled = false
```

## Verification

```text
Focused v382 test:
npm test -- test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake.test.ts
Result: 1 file / 4 tests passed

Adjacent v381+v382 tests:
npm test -- test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake.test.ts
Result: 2 files / 7 tests passed

Typecheck:
npm run typecheck
Result: passed

Build:
npm run build
Result: passed

HTTP smoke:
JSON=200 MD=200 ready=True checks=39/39 java=Java v158 mini=v149 active=False
```

Full default `npm test` was run twice. Both failures were timeout-only in older route-table / production live-probe route tests, not assertion failures:

```text
First default full run: 313/315 files passed, 1090/1092 tests passed.
The two timed-out files passed individually and as a two-file group.

Second default full run after local timeout stabilization: 298/315 files passed, 1075/1092 tests passed.
The 17 timed-out files were rerun in focused groups:
- managed-audit timeout group: 7 files / 28 tests passed
- production live-probe timeout group: 10 files / 37 tests passed
```

The low-worker full command was attempted to reduce default-concurrency pressure, but exceeded the command timeout before completing. This is recorded as test-budget pressure in the large route-table suite; v382 focused, adjacent, grouped timeout reruns, typecheck, build, and HTTP smoke all passed.

## Browser verification

Playwright MCP opened the static v382 HTML over a temporary local HTTP server on port 8382, captured the browser snapshot and full-page PNG, then the temporary server was stopped. The only browser console issue was the expected missing favicon request.

## Boundary

v382 must not be treated as runtime approval. A live-read gate still requires a separate service lifecycle plan covering Java and mini-kv startup, ports, ownership, smoke target, fail-closed behavior, and cleanup.
