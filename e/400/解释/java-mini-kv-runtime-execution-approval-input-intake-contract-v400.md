# Node v400 Java / mini-kv runtime execution approval input intake contract

## What This Version Does

Node v400 consumes Node v399, Java v164, and mini-kv v155 as read-only evidence and writes the next input contract.

The contract records that Java v164 is a complete Java-side input, while mini-kv v155 is precheck-only. Runtime execution remains blocked because the final mini-kv approval input, Node-approved runtime window, correlated operator approval record, and complete cross-project runtime execution packet are still missing.

## Result

- `intakeState=runtime-execution-approval-input-intake-contract-blocked`
- `readyForRuntimeExecutionApprovalInputIntakeContract=true`
- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `javaInputComplete=true`
- `miniKvFinalApprovalInputPresent=false`
- `presentNodeApprovalInputCount=0`
- `missingNodeApprovalInputCount=3`
- `handoffRequirementCount=5`
- `blockedHandoffRequirementCount=4`
- `productionBlockerCount=4`
- `checkCount=31`
- `passedCheckCount=31`

## Runtime Boundary

Node v400 did not start or stop Java, did not start or stop mini-kv, did not open a managed-audit connection, did not parse raw endpoint URLs, and did not enable active shard routing.

## Archive Files

- `e/400/evidence/java-mini-kv-runtime-execution-approval-input-intake-contract-v400-http.json`
- `e/400/evidence/java-mini-kv-runtime-execution-approval-input-intake-contract-v400-http.md`
- `e/400/evidence/java-mini-kv-runtime-execution-approval-input-intake-contract-v400-summary.json`
- `e/400/evidence/java-mini-kv-runtime-execution-approval-input-intake-contract-v400-browser-snapshot.md`
- `e/400/java-mini-kv-runtime-execution-approval-input-intake-contract-v400.html`
- `e/400/图片/java-mini-kv-runtime-execution-approval-input-intake-contract-v400.png`

## Verification

- Focused v400 test: 3/3 passed.
- Adjacent v399+v400 tests: 6/6 passed.
- Forced historical fallback for Java v164 and mini-kv v155: passed.
- Typecheck: passed.
- Build: passed.
- Full Vitest shards: 333 files / 1146 tests passed.
- HTTP smoke: JSON 200, Markdown 200, 31/31 checks, 4 runtime blockers recorded.
- Playwright MCP browser verification: final HTML snapshot and full-page screenshot regenerated.
