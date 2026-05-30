# Node v399 follow-up plan: Java / mini-kv runtime execution packet approval gate review archive verification

## Scope

Node v399 verifies the Node v398 approval gate review archive.

It checks the v398 JSON, Markdown, summary, browser snapshot, screenshot, explanation, code walkthrough, active plan, plan index, and archive index. It also replays the v398 gate review from frozen evidence to prove the approval gate remains blocked without starting Java or mini-kv.

Node v399 does not start Java, start mini-kv, parse raw endpoint URLs, connect managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v398 created a blocked approval gate record; v399 proves that record is archived, replayable, and still runtime-closed.
- Later consumer: Node v400 can consume only real approval-gate inputs instead of re-reading v398 as if it were runtime approval.
- Why existing reports cannot be reused: v398 was the approval gate review itself. It did not verify the archive files, browser evidence, explanation, walkthrough, and replay.
- Growth stop condition: v399 stops after one archive verification. The next version must either consume the three missing approval inputs or remain blocked without creating another echo chain.

## Cross-Project Parallel Plan

1. Node v399 owns only archive verification.
2. Java and mini-kv remain recommended parallel. Node v399 is not a pre-approval blocker.
3. No live integration is required.
4. If live integration is requested later, a later version must first consume all three approval-gate inputs together.

## Archive Verification Inputs

Node v399 verifies:

- `e/398/evidence/java-mini-kv-runtime-execution-packet-approval-gate-review-v398-http.json`
- `e/398/evidence/java-mini-kv-runtime-execution-packet-approval-gate-review-v398-http.md`
- `e/398/evidence/java-mini-kv-runtime-execution-packet-approval-gate-review-v398-summary.json`
- `e/398/evidence/java-mini-kv-runtime-execution-packet-approval-gate-review-v398-browser-snapshot.md`
- `e/398/java-mini-kv-runtime-execution-packet-approval-gate-review-v398.html`
- `e/398/图片/java-mini-kv-runtime-execution-packet-approval-gate-review-v398.png`
- `e/398/解释/java-mini-kv-runtime-execution-packet-approval-gate-review-v398.md`
- `代码讲解记录_生产雏形阶段3/403-java-mini-kv-runtime-execution-packet-approval-gate-review-v398.md`

## Runtime Boundary

Node v399:

- `readyForRuntimeExecutionPacket=false`;
- `readyForRuntimeLiveReadGate=false`;
- `archiveVerificationOnly=true`;
- `presentRuntimeExecutionArtifactCount=0`;
- `missingRuntimeExecutionArtifactCount=6`;
- `runtimeExecutionPacketPresent=false`;
- `runtimeExecutionPacketExecutable=false`;
- `runtimeGateApprovalPresent=false`;
- `executionAttempted=false`;
- `startsJavaService=false`;
- `startsMiniKvService=false`;
- `executionAllowed=false`;
- `activeShardPrototypeEnabled=false`.

## Stop Conditions

Stop before runtime if:

- any v398 archive artifact is missing;
- v398 replay does not preserve 0/3 approval inputs and 0/6 runtime artifacts;
- the approval gate blockers disappear from Markdown or explanation;
- any request treats archive verification as runtime approval.
