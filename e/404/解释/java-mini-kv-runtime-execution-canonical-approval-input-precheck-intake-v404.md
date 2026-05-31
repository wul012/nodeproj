# Node v404 Java / mini-kv runtime execution canonical approval input precheck intake

## What This Version Does

Node v404 consumes Node v403, Java v167, and mini-kv v158 as read-only evidence.

Java v167 confirms the Java side consumed Node v403's template compatibility intake. mini-kv v158 records the canonical approval input precheck and confirms all three required `e/398/input` files are still missing.

The canonical approval input paths under `e/398/input/` remain absent.

## Result

- `intakeState=runtime-execution-canonical-approval-input-precheck-intake-blocked`
- `readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake=true`
- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `javaCompatibilityIntakeReady=true`
- `miniKvCanonicalPrecheckReady=true`
- `completeUpstreamPrecheckCount=2`
- `canonicalInputCount=3`
- `presentCanonicalInputCount=0`
- `validCanonicalInputCount=0`
- `missingCanonicalInputCount=3`
- `productionBlockerCount=3`
- `checkCount=31`
- `passedCheckCount=31`

## Runtime Boundary

Node v404 did not write real approval inputs, did not start or stop Java, did not start or stop mini-kv, did not open a managed-audit connection, did not parse raw endpoint URLs, and did not enable active shard routing.

## Archive Files

- `e/404/evidence/java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake-v404-http.json`
- `e/404/evidence/java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake-v404-http.md`
- `e/404/evidence/java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake-v404-summary.json`
- `e/404/evidence/java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake-v404-browser-snapshot.md`
- `e/404/java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake-v404.html`
- `e/404/图片/java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake-v404.png`

## Verification

Completed closeout checks:

- Focused v404 test: 1 file / 3 tests passed.
- Adjacent v403 + v404 tests: 2 files / 6 tests passed.
- Typecheck: `npx tsc --noEmit -p tsconfig.json` passed.
- Build: `npm run build` passed.
- Full Vitest shards with `--maxWorkers=4`: 337 files / 1158 tests passed.
- HTTP smoke on `127.0.0.1:4404`: `/health` 200, JSON 200, Markdown 200, 31/31 checks, 3 expected production blockers.
- Playwright MCP browser verification: final HTML snapshot and full-page screenshot saved under `e/404/evidence/` and `e/404/图片/`.
