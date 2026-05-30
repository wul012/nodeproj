# Node v397 follow-up plan: Java / mini-kv runtime execution packet contribution review

## Scope

Node v397 consumes three frozen inputs:

- Node v396 archived runtime execution artifact upstream progress intake.
- Java v163 runtime execution packet contribution.
- mini-kv v154 runtime execution artifact candidate.

This version records which runtime execution packet rows now have project-side contributions and which rows still cannot be accepted as a cross-project runtime packet. It does not start Java, start mini-kv, parse raw endpoint URLs, connect managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: Java v163 and mini-kv v154 progressed beyond the v396 clarification, so Node must review the new contribution state without accidentally treating it as approval.
- Later consumer: Node v398 can use this review to decide whether a Node-approved runtime window and correlated approval packet exist.
- Why existing reports cannot be reused: Node v396 reviewed Java v162 and mini-kv v153. It did not consume Java v163 or mini-kv v154.
- Growth stop condition: v397 stops after one contribution review. Runtime execution remains blocked unless a later version has one correlated approval record, a Node-approved runtime window, and a complete cross-project packet.

## Cross-Project Parallel Plan

1. Node v397 owns only read-only contribution review and Node archive output.
2. Java and mini-kv remain recommended parallel. Node v397 is not a pre-approval blocker for their own next evidence work.
3. Java v163 is accepted as a Java-side contribution only.
4. mini-kv v154 is accepted as a candidate-only contribution only.
5. Node v397 does not ask Java or mini-kv to start services.
6. If live integration is required later, the next runtime packet must name startup command, port, owner, GET-only smoke, cleanup, and stop-only-owned-process rules before any process is started.

## Runtime Boundary

Node v397:

- `readyForRuntimeExecutionPacket=false`;
- `readyForRuntimeLiveReadGate=false`;
- `runtimeExecutionArtifactsComplete=false`;
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

## Contribution Review Matrix

| Requirement | Java v163 contribution | mini-kv v154 contribution | Node / operator gap |
| --- | --- | --- | --- |
| Operator approval record | Java-side record present | No mini-kv approval record | One correlated approval must bind Java, mini-kv, and Node window |
| Concrete loopback ports | Java port 8080 present | Candidate port 6424 present but not operator-approved | Node-approved packet must bind both ports |
| GET-only smoke command | Java GET-only smoke commands present | Candidate smoke command present but not operator-approved | Packet must bind Java GET smoke and mini-kv read-only smoke |
| Cleanup proof | Java references cleanup after future approved start | Cleanup proof missing | Proof can be accepted only after approved start and cleanup archive |
| Service owner confirmation | Java owner confirmed | mini-kv owner candidate declared but not operator-confirmed | Packet must confirm both owners |
| Process cleanup rules | Java stop-only-owned-process rules present | mini-kv candidate cleanup rules present | Packet must adopt both stop-only-owned-process rule sets |

## Stop Conditions

Stop before runtime if:

- Node-approved runtime window is missing;
- Java and mini-kv approvals are not correlated into one record;
- cleanup proof is referenced before an approved runtime start;
- mini-kv candidate rows are treated as operator-approved artifacts;
- any request treats v397 contribution review as runtime approval.
