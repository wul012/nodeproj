# Node v395 follow-up plan: declared operator lifecycle runtime execution artifact intake preflight archive verification

## Scope

Node v395 archives and verifies the Node v394 runtime execution artifact intake preflight.

This version is archive-verification-only. It reads the v394 JSON, Markdown, summary, browser snapshot, HTML, screenshot, explanation, code walkthrough, source plan, and indexes; then it replays the v394 loader from frozen evidence.

It does not start Java, start mini-kv, parse raw endpoint URLs, connect to managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v394 recorded that the runtime execution artifact set is still 0/6, but the blocked preflight itself needs archive verification before any later artifact intake attempt.
- Later consumer: Node v396 may only retry artifact intake if v395 proves the v394 blocked preflight remained stable.
- Why existing reports cannot be reused: v394 scans artifact locations. It does not verify the final v394 archive bundle, screenshot, explanation, walkthrough, or index state.
- Growth stop condition: v395 stops after archive verification. The next useful input must be concrete runtime execution artifacts, not another planning echo for the same missing files.

## Cross-Project Parallel Plan

1. Node v395 verifies only the v394 blocked preflight archive and frozen replay.
2. Java and mini-kv remain recommended parallel. Node v395 is not a pre-approval blocker for upstream work.
3. A later Node version may only proceed if it receives concrete operator approval, loopback ports, GET-only smoke command, cleanup proof, service owner, and process cleanup rules.
4. If live integration is required later, write service startup/port/owner/cleanup requirements in a separate execution packet before running it.

## Runtime Boundary

Node v395:

- `readyForRuntimeExecutionPacket=false`;
- `readyForRuntimeLiveReadGate=false`;
- `runtimeExecutionArtifactsComplete=false`;
- `presentRuntimeExecutionArtifactCount=0`;
- `missingRuntimeExecutionArtifactCount=6`;
- `runtimeExecutionPacketPresent=false`;
- `runtimeExecutionPacketExecutable=false`;
- `executionAttempted=false`;
- `startsJavaService=false`;
- `startsMiniKvService=false`;
- `executionAllowed=false`;
- `activeShardPrototypeEnabled=false`.

## Stop Conditions

Stop before runtime if:

- v394 archive is missing or blocked;
- v394 replay no longer preserves the blocked preflight state;
- artifact counts drift away from 0/6 without a complete concrete artifact set;
- any request treats v395 archive verification as runtime approval rather than a closed gate.
