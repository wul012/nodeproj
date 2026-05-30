# Node v394 follow-up plan: declared operator lifecycle runtime execution artifact intake preflight

## Scope

Node v394 performs a local runtime execution artifact intake preflight after the Node v393 stop record archive verification.

This version scans the Node drop zone plus the latest local Java and mini-kv sibling evidence locations. It records whether the six concrete runtime execution artifacts exist:

- operator approval record;
- concrete Java and mini-kv loopback ports;
- GET-only smoke command;
- cleanup proof;
- service owner;
- process cleanup rules.

It does not start Java, start mini-kv, parse raw endpoint URLs, connect to managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v393 proved the v392 stop record archive is stable, but Node still needs a concrete local intake preflight to distinguish "artifacts supplied" from "still only planned".
- Later consumer: Node v395 can archive and verify this v394 preflight; a future execution packet may only proceed after all six concrete artifacts exist.
- Why existing reports cannot be reused: v393 verifies an archive. It does not scan the v394 artifact drop zone or the latest sibling runtime artifact candidates.
- Growth stop condition: v394 stops after exactly six named artifact statuses and the Java/mini-kv latest-version scan. It does not add another planning echo for the same missing artifacts.

## Cross-Project Parallel Plan

1. Node v394 owns only the local artifact intake preflight and route/archive surface.
2. Java and mini-kv remain recommended parallel. Node v394 is not a pre-approval blocker for upstream work.
3. Fresh Java / mini-kv evidence is required only if a later runtime execution packet is requested; v394 records that no Java v162 or mini-kv v153 runtime artifact candidate is present locally.
4. If live integration becomes required later, a separate execution packet must name service startup command, concrete loopback ports, GET-only smoke command, service owner, and cleanup owner before any process is started.

## Runtime Boundary

Node v394:

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

- v393 archive is missing or blocked;
- v393 replay no longer preserves the stopped execution packet state;
- any runtime execution artifact is missing or only partially supplied;
- runtime artifacts would be resolved from historical fallback instead of concrete local/operator files;
- any request treats v394 artifact preflight as runtime approval rather than a closed gate.
