# Node v383 run note: active shard plan boundary handoff intake archive verification

v383 verifies the Node v382 boundary handoff archive and replays v382 from frozen historical fixtures. It is archive verification only: it does not start Java or mini-kv, does not mutate sibling state, does not open managed audit, and keeps active shard prototype disabled.

## Artifacts

```text
e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-http.json
e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-http.md
e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-summary.json
e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-browser-snapshot.md
e/383/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383.html
e/383/图片/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383.png
```

## Source archive

```text
Source archive root: e/382
Source JSON: e/382/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382-http.json
Source Node: Node v382
Source Java: Java v158
Source mini-kv handoff: v149
Source mini-kv frozen plan: v148
```

## Result

```text
readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification = true
readyForNodeV384NextBoundaryEvidenceOrLiveGate = true
archive files = 11/11
checks = 35/35
source checks = 39/39
replay checks = 39/39
productionBlockers = 0
startsJavaService = false
startsMiniKvService = false
executionAllowed = false
activeShardPrototypeEnabled = false
```

## Verification

```text
Focused v383 test:
npm test -- test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerification.test.ts
Result: 1 file / 3 tests passed

Adjacent v382+v383 tests:
npm test -- test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerification.test.ts
Result: 2 files / 7 tests passed

Typecheck:
npm run typecheck
Result: passed

Build:
npm run build
Result: passed

Full test:
npm test
Result: 316 files / 1095 tests passed

HTTP archive generation:
JSON=200 MD=200 ready=True checks=35/35 replay=39/39 active=False

HTTP smoke from built server:
JSON=200 MD=200 ready=True checks=35/35 replay=39/39 active=False
```

## Browser verification

Playwright MCP opened the static v383 HTML over a temporary local HTTP server on port 8383, captured the browser snapshot and full-page PNG, then the temporary server was stopped. The only browser console issue was the expected missing favicon request.

## Boundary

v383 confirms the archive; it does not authorize runtime behavior. A live-read gate still requires a separate plan covering service startup, ports, ownership, smoke target, fail-closed behavior, and cleanup.
