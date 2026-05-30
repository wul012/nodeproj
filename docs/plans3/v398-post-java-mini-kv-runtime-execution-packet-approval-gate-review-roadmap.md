# Node v398 follow-up plan: Java / mini-kv runtime execution packet approval gate review

## Scope

Node v398 consumes the frozen Node v397 contribution review and performs the approval gate review for runtime execution.

This version does not consume fresh Java or mini-kv write-side evidence, because read-only checks show Java remains at v163 and mini-kv remains at v154. It scans only Node-owned approval-gate input paths under `e/398/input/` and records that the runtime execution packet cannot be approved.

Node v398 does not start Java, start mini-kv, parse raw endpoint URLs, connect managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v397 confirmed contributions but left the approval gate implicit. v398 makes the approval gate explicit and records why runtime remains blocked.
- Later consumer: Node v399 can archive this blocked gate, or a later version can consume a complete packet without reinterpreting v397 contribution evidence as approval.
- Why existing reports cannot be reused: v397 reviewed contribution rows. It did not scan the Node-approved runtime window, correlated operator approval record, or complete cross-project packet inputs.
- Growth stop condition: v398 stops after one approval gate review. No new echo or runtime chain is allowed until the three approval-gate inputs exist together.

## Cross-Project Parallel Plan

1. Node v398 owns only the approval gate review and Node archive output.
2. Java and mini-kv remain recommended parallel. Node v398 is not a pre-approval blocker for their own evidence work.
3. Required approval inputs are Node-owned gate inputs, not live sibling service calls.
4. No Java or mini-kv process can be started from v398.
5. If live integration is requested later, a separate version must first consume a complete packet with owner, port, GET-only smoke, cleanup, and stop-only-owned-process rules.

## Approval Gate Inputs

Node v398 scans:

| Input | Path | Status |
| --- | --- | --- |
| Node-approved runtime window | `e/398/input/node-approved-runtime-window-v398.json` | missing |
| Correlated operator approval record | `e/398/input/correlated-operator-approval-record-v398.json` | missing |
| Complete cross-project runtime execution packet | `e/398/input/cross-project-runtime-execution-packet-v398.json` | missing |

## Runtime Boundary

Node v398:

- `readyForRuntimeExecutionPacket=false`;
- `readyForRuntimeLiveReadGate=false`;
- `runtimeExecutionArtifactsComplete=false`;
- `presentRuntimeExecutionArtifactCount=0`;
- `missingRuntimeExecutionArtifactCount=6`;
- `runtimeExecutionPacketPresent=false`;
- `runtimeExecutionPacketExecutable=false`;
- `runtimeGateApprovalPresent=false`;
- `concreteLoopbackPortsAssigned=false`;
- `executionAttempted=false`;
- `startsJavaService=false`;
- `startsMiniKvService=false`;
- `executionAllowed=false`;
- `activeShardPrototypeEnabled=false`.

## Stop Conditions

Stop before runtime if:

- the Node-approved runtime window is missing;
- the correlated operator approval record is missing;
- the complete cross-project runtime execution packet is missing;
- cleanup proof is only a future reference and not archived after an approved runtime start;
- any request treats Java v163 or mini-kv v154 contribution evidence as runtime approval.
