# Node v401 follow-up plan: Java / mini-kv runtime execution approval input completion intake

## Scope

Node v401 consumes Node v400, Java v165, and mini-kv v156 as read-only evidence.

This version records that the Java-side input and final mini-kv input are now both present. It does not approve runtime execution because the Node-approved runtime window, correlated operator approval record, and complete cross-project runtime execution packet are still missing.

Node v401 does not start Java, start mini-kv, parse raw endpoint URLs, connect managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v400 said mini-kv still needed a final input; mini-kv v156 now provides that final input.
- Later consumer: Node v402 can focus only on Node/operator/cross-project approval inputs instead of rechecking whether Java and mini-kv inputs are complete.
- Why existing reports cannot be reused: v400 was written before Java v165 and mini-kv v156 landed.
- Growth stop condition: v401 stops after one completion intake. The next version must either consume the Node-approved window, correlated approval, and cross-project packet, or remain blocked on those exact missing inputs.

## Current Input Matrix

| Requirement | Owner | Current evidence | Current status |
| --- | --- | --- | --- |
| Java canonical approval input | Java | Java v165 handoff keeps Java v164 canonical | complete |
| Final mini-kv approval input | mini-kv | mini-kv v156 final approval gate input | complete |
| Node-approved runtime window | Node | `e/398/input/node-approved-runtime-window-v398.json` | missing |
| Correlated operator approval record | operator | `e/398/input/correlated-operator-approval-record-v398.json` | missing |
| Complete cross-project runtime execution packet | cross-project | `e/398/input/cross-project-runtime-execution-packet-v398.json` | missing |

## Runtime Boundary

Node v401:

- `readyForRuntimeExecutionPacket=false`;
- `readyForRuntimeLiveReadGate=false`;
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
- any input treats Java v165 or mini-kv v156 as full runtime approval;
- any request would start or stop Java/mini-kv from the completion intake.
