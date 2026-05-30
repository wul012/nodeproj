# Node v397 Java / mini-kv runtime execution packet contribution review

## What This Version Does

Node v397 consumes:

- the frozen Node v396 upstream progress archive;
- Java v163 runtime execution packet contribution evidence;
- mini-kv v154 runtime execution artifact candidate evidence.

It records that both sibling projects made useful contribution progress, but the cross-project runtime execution packet is still not approved or executable.

## Result

- `contributionReviewState=java-v163-and-mini-kv-v154-contributions-reviewed`
- `readyForJavaMiniKvRuntimeExecutionPacketContributionReview=true`
- `readyForNodeV398RuntimeExecutionPacketApprovalGateReview=true`
- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `presentRuntimeExecutionArtifactCount=0`
- `missingRuntimeExecutionArtifactCount=6`
- `crossProjectAcceptedRequirementCount=0`
- `crossProjectMissingRequirementCount=6`
- `checkCount=33`
- `passedCheckCount=33`

## Runtime Boundary

Node v397 did not start or stop Java, did not start or stop mini-kv, did not open a managed-audit connection, did not parse raw endpoint URLs, and did not enable active shard routing.

The review keeps all six rows blocked until a later packet supplies a Node-approved runtime window, one correlated operator approval record, and accepted cleanup proof after any approved runtime start.

## Important Stability Fix

v397 reads Node v396 from the archived JSON under `e/396/evidence/` instead of re-running the older v396 chain. This avoids historical replay drift after Java or mini-kv publish newer evidence.

The same stability pass also keeps Node v394 from treating mini-kv's frozen `shard-readiness-v153.json` release fixture as a runtime execution artifact candidate.

## Archive Files

- `e/397/evidence/java-mini-kv-runtime-execution-packet-contribution-review-v397-http.json`
- `e/397/evidence/java-mini-kv-runtime-execution-packet-contribution-review-v397-http.md`
- `e/397/evidence/java-mini-kv-runtime-execution-packet-contribution-review-v397-summary.json`
- `e/397/evidence/java-mini-kv-runtime-execution-packet-contribution-review-v397-browser-snapshot.md`
- `e/397/java-mini-kv-runtime-execution-packet-contribution-review-v397.html`
- `e/397/图片/java-mini-kv-runtime-execution-packet-contribution-review-v397.png`

## Verification

- Focused v397 test: 3/3 passed.
- Adjacent v394-v397 regression tests: 12/12 passed.
- Typecheck: passed.
- Full Vitest coverage: first monolithic run timed out at the tool boundary with no returned assertion failure; rerun as four Vitest shards passed 330 files / 1137 tests.
- Build: passed.
- HTTP smoke from `dist/server.js`: JSON 200, Markdown 200, `readyForJavaMiniKvRuntimeExecutionPacketContributionReview=true`, checks 33/33.
- Playwright MCP static page check: browser snapshot and full-page screenshot regenerated after final HTTP smoke output.
