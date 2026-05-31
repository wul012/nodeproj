# Node v404 follow-up plan: Java / mini-kv runtime execution canonical approval input precheck intake

## Scope

Node v404 consumes Node v403, Java v167, and mini-kv v158 as read-only evidence.

Java v167 confirms Java saw Node v403's template compatibility intake and still leaves the three canonical approval inputs missing. mini-kv v158 records the same canonical approval input precheck with `presentCanonicalInputCount=0`, `missingCanonicalInputCount=3`, and fail-closed runtime boundaries.

Node v404 does not create any file under `e/398/input/`. It records the canonical input precheck result and keeps runtime execution blocked.

## Necessity Proof

- Blocker resolved: after v403, Java and mini-kv both produced stable evidence that the next step is not runtime startup but real canonical approval input creation.
- Later consumer: Node v405 can validate real canonical approval input values without re-consuming Java v167 and mini-kv v158 precheck receipts.
- Why existing reports cannot be reused: v403 only proves template compatibility. It does not consume Java v167's intake receipt or mini-kv v158's explicit canonical approval input precheck.
- Growth stop condition: v404 stops at one canonical precheck intake. The next Node version must consume actual `e/398/input` files or stay blocked on those exact missing inputs.

## Current Input Matrix

| Requirement | Source | Current evidence | Current status |
| --- | --- | --- | --- |
| Node template compatibility intake | Node | Node v403 route/archive | complete |
| Java compatibility intake receipt | Java | Java v167 evidence | complete |
| mini-kv canonical input precheck | mini-kv | mini-kv v158 fixture | complete |
| Node-approved runtime window | canonical input | `e/398/input/node-approved-runtime-window-v398.json` | missing |
| Correlated operator approval record | canonical input | `e/398/input/correlated-operator-approval-record-v398.json` | missing |
| Complete cross-project runtime execution packet | canonical input | `e/398/input/cross-project-runtime-execution-packet-v398.json` | missing |

## Runtime Boundary

Node v404:

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

## Cross-Project Parallel Status

Java / mini-kv are recommended parallel. Node v404 consumes their latest stable precheck evidence, but Node is not a pre-approval blocker for their own next evidence work.

Node v405 must wait for the three real canonical approval input files, or for Java / mini-kv to publish new stable evidence that changes those inputs' status. No project should treat v404 as runtime approval.

## Stop Conditions

Stop before runtime if:

- any request treats Java v167 or mini-kv v158 precheck evidence as runtime approval;
- any request copies templates into canonical input paths without concrete approval values;
- the three canonical input files do not share one `approvalCorrelationId`;
- any approval permits non-GET smoke commands, managed audit connection, raw endpoint parsing, or write operations;
- service startup owner, port assignment, and cleanup proof are missing.
