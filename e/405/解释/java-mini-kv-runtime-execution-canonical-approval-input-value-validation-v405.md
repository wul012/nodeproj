# Node v405 Java / mini-kv runtime execution canonical approval input value validation

## What This Version Does

Node v405 validates the three real canonical approval inputs under `e/398/input/`.

The three inputs share one `approvalCorrelationId`, contain concrete values instead of `REQUIRED-*` placeholders, allow only GET smoke commands, and explicitly deny credential value reads, raw endpoint URL parsing, managed audit connection, and writes.

## Result

- `validationState=runtime-execution-canonical-approval-input-value-validation-ready`
- `readyForRuntimeExecutionCanonicalApprovalInputValueValidation=true`
- `readyForRuntimeExecutionPacket=true`
- `readyForRuntimeLiveReadGate=true`
- `presentTargetInputCount=3`
- `validTargetInputCount=3`
- `sharedApprovalCorrelationIdValidated=true`
- `runtimeExecutionPacketExecutable=true`
- `executionAttempted=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `productionBlockerCount=0`
- `checkCount=32`
- `passedCheckCount=32`

## Runtime Boundary

Node v405 did not start or stop Java, did not start or stop mini-kv, did not run runtime probes, did not open a managed-audit connection, did not parse raw endpoint URLs, did not read credential values, did not write upstream state, and did not enable active shard routing.

## Archive Files

- `e/405/evidence/java-mini-kv-runtime-execution-canonical-approval-input-value-validation-v405-http.json`
- `e/405/evidence/java-mini-kv-runtime-execution-canonical-approval-input-value-validation-v405-http.md`
- `e/405/evidence/java-mini-kv-runtime-execution-canonical-approval-input-value-validation-v405-summary.json`
- `e/405/evidence/java-mini-kv-runtime-execution-canonical-approval-input-value-validation-v405-browser-snapshot.md`
- `e/405/java-mini-kv-runtime-execution-canonical-approval-input-value-validation-v405.html`
- `e/405/图片/java-mini-kv-runtime-execution-canonical-approval-input-value-validation-v405.png`

## Verification

Completed closeout checks:

- Focused v405 test: 1 file / 2 tests passed.
- Adjacent v400-v405 approval input chain tests: 6 files / 17 tests passed.
- Typecheck: `npx tsc --noEmit -p tsconfig.json` passed.
- Build: `npm run build` passed.
- Full Vitest shards with `--maxWorkers=4`: 338 files / 1160 tests passed.
- HTTP smoke on `127.0.0.1:4405`: `/health` 200, JSON 200, Markdown 200, 32/32 checks, 0 production blockers.
- Playwright MCP browser verification: final HTML snapshot and full-page screenshot saved under `e/405/evidence/` and `e/405/图片/`.
