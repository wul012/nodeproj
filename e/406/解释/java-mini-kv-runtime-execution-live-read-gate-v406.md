# Node v406 Java / mini-kv runtime execution live-read gate

## What Changed

Node v406 adds a live-read gate after v405 canonical approval input value validation. It consumes the real `e/398/input` approval files through v405, resolves the approved Java and mini-kv loopback GET smoke targets, and records that the next step may be an approved local-loopback read-only smoke.

The gate is still not runtime execution:

- Java is not started by v406.
- mini-kv is not started by v406.
- Managed audit remains disconnected.
- Credential values and raw endpoint URLs remain unread.
- Java / mini-kv state is not written.
- Active shard routing remains disabled.

## Approved Targets

- Java: `127.0.0.1:8080`, `GET /actuator/health`, owner `java-platform-operator`.
- mini-kv: `127.0.0.1:6424`, `GET /health`, owner `mini-kv-service-owner`.
- Cleanup: later smoke must stop only owned Java / mini-kv processes and archive cleanup proof.

## Result

- `readyForRuntimeExecutionLiveReadGate=true`
- `readyForApprovedLocalLoopbackReadOnlySmoke=true`
- `runtimeSmokeAttempted=false`
- `executionAllowed=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `summary.passedCheckCount=33`
- `summary.checkCount=33`
- `summary.productionBlockerCount=0`

## Verification

- Focused v406 Vitest: 1 file / 2 tests passed.
- Adjacent v405+v406 Vitest: 2 files / 4 tests passed.
- Typecheck: passed.
- Build: passed.
- HTTP smoke on port 4406: `/health` 200, JSON 200, Markdown 200, 33/33 checks, 0 blockers.
- Playwright MCP browser snapshot and screenshot generated.
- Full Vitest shards: 339 files / 1162 tests passed.
- Final typecheck: passed.
- Final build: passed.

## Next

Node v407 can attempt approved local-loopback read-only smoke only if service startup ownership and cleanup ownership remain explicit. If v407 starts any local Java or mini-kv process, it must record PID/port and stop only processes it owns.
