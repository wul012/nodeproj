# Node v396 follow-up plan: Java / mini-kv runtime execution artifact upstream progress intake

## Scope

Node v396 consumes the real upstream progress made after Node v395:

- Java v162 runtime execution artifact candidate.
- mini-kv v153 blocked runtime execution artifact preflight.

This version clarifies the acceptance gap that caused the upstream work to converge only partially. Java and mini-kv both followed the intended direction, but the result is not a complete cross-project runtime execution packet.

Node v396 does not start Java, start mini-kv, parse raw endpoint URLs, connect managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: the previous plan said "six concrete artifacts" but did not hard-map accepted artifacts to Java, mini-kv, and operator ownership.
- Later consumer: Node v397 or later can use this v396 clarification as the handoff checklist before another execution-packet attempt.
- Why existing reports cannot be reused: v395 only archived the old 0/6 preflight. It did not consume the newly completed Java v162 and mini-kv v153 outputs.
- Growth stop condition: v396 stops after one real upstream-progress intake and one explicit six-item requirement clarification. The next version must either consume newly supplied concrete artifacts or keep runtime closed; it should not create another vague planning echo.

## Cross-Project Parallel Plan

1. Node v396 owns only read-only consumption and clarification.
2. Java and mini-kv remain recommended parallel. Node v396 is not a pre-approval blocker for their next work.
3. Java v162 is accepted as a Java-side candidate, not cross-project approval.
4. mini-kv v153 is accepted as a blocked preflight proving mini-kv artifacts remain missing, not as runtime readiness.
5. A runtime execution packet still requires all six accepted artifacts together: operator approval record, concrete Java and mini-kv loopback ports, GET-only smoke command, cleanup proof, service owner confirmation, and process cleanup rules.
6. If live integration is required later, the execution packet must name startup command, port, owner, smoke, cleanup, and stop-only-owned-process rules before any process is started.

## Runtime Boundary

Node v396:

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

## Hard Handoff For Upstream

Accepted next upstream delivery must answer all six rows:

| Requirement | Java status | mini-kv status | operator / Node status |
| --- | --- | --- | --- |
| Operator approval record | Candidate-only is not enough | No approval in v153 | Signed/correlated operator approval still required |
| Concrete loopback ports | Java candidate declares 8080 | mini-kv concrete port still missing | Packet must bind both ports together |
| GET-only smoke command | Java candidate declares GET smoke | mini-kv concrete smoke artifact still missing | Packet must bind both smokes together |
| Cleanup proof | Java records responsibility only | mini-kv cleanup proof still missing | Proof must be archived after approved runtime start |
| Service owner confirmation | Java declares java-platform-operator | mini-kv runtime owner confirmation still missing | Packet must confirm both owners |
| Process cleanup rules | Java declares rules | mini-kv rules still missing | Packet must stop only processes started by the packet |

## Stop Conditions

Stop before runtime if:

- Java evidence is only candidate-scoped;
- mini-kv evidence remains blocked preflight;
- operator approval or Node approved runtime window is missing;
- any runtime artifact is partial rather than a complete cross-project packet;
- any request treats v396 clarification as runtime approval.
