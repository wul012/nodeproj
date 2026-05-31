# Node v403 Java / mini-kv runtime execution approval input template compatibility intake

## What This Version Does

Node v403 consumes Node v402, Java v166, and mini-kv v157 as read-only evidence.

Java v166 confirms the Java canonical approval input and v165 handoff can be bound into Node v402's templates. mini-kv v157 echoes the same template/canonical path matrix and confirms templates remain template-only.

The canonical approval input paths under `e/398/input/` remain absent.

## Result

- `intakeState=runtime-execution-approval-input-template-compatibility-intake-blocked`
- `readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake=true`
- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `javaCompatibilityReady=true`
- `miniKvTemplateEchoReady=true`
- `compatibleUpstreamCount=2`
- `canonicalInputCount=3`
- `presentCanonicalInputCount=0`
- `validCanonicalInputCount=0`
- `missingCanonicalInputCount=3`
- `productionBlockerCount=3`
- `checkCount=28`
- `passedCheckCount=28`

## Runtime Boundary

Node v403 did not write real approval inputs, did not start or stop Java, did not start or stop mini-kv, did not open a managed-audit connection, did not parse raw endpoint URLs, and did not enable active shard routing.

## Archive Files

- `e/403/evidence/java-mini-kv-runtime-execution-approval-input-template-compatibility-intake-v403-http.json`
- `e/403/evidence/java-mini-kv-runtime-execution-approval-input-template-compatibility-intake-v403-http.md`
- `e/403/evidence/java-mini-kv-runtime-execution-approval-input-template-compatibility-intake-v403-summary.json`
- `e/403/evidence/java-mini-kv-runtime-execution-approval-input-template-compatibility-intake-v403-browser-snapshot.md`
- `e/403/java-mini-kv-runtime-execution-approval-input-template-compatibility-intake-v403.html`
- `e/403/图片/java-mini-kv-runtime-execution-approval-input-template-compatibility-intake-v403.png`

## Verification

Completed closeout checks:

- Focused v403 test: 1 file / 3 tests passed.
- Adjacent v402 + v403 tests: 2 files / 6 tests passed.
- Typecheck: `npx tsc --noEmit -p tsconfig.json` passed.
- Build: `npm run build` passed.
- Full Vitest shards with `--maxWorkers=4`: 336 files / 1155 tests passed.
- HTTP smoke on `127.0.0.1:4403`: `/health` 200, JSON 200, Markdown 200, 28/28 checks, 3 expected production blockers.
- Playwright MCP browser verification: final HTML snapshot and full-page screenshot saved under `e/403/evidence/` and `e/403/图片/`.
