# Node v403 follow-up plan: Java / mini-kv runtime execution approval input template compatibility intake

## Scope

Node v403 consumes Node v402, Java v166, and mini-kv v157 as read-only evidence.

Java v166 confirms Java v164/v165 can be bound into Node v402's template matrix. mini-kv v157 confirms the template paths and canonical target paths while keeping template-as-approval, service start, runtime probe, live read, router, writes, and execution all false.

Node v403 does not create any real canonical approval input under `e/398/input/`. It records upstream compatibility and keeps runtime execution blocked.

## Necessity Proof

- Blocker resolved: v402 published templates, but Node had not yet consumed Java/mini-kv's independent confirmation that those templates are compatible with their current evidence.
- Later consumer: Node v404 can validate real canonical input files without rechecking whether Java v166 and mini-kv v157 accepted the template boundary.
- Why existing reports cannot be reused: v402 is Node-only template publication; it does not contain Java v166 compatibility receipt or mini-kv v157 echo evidence.
- Growth stop condition: v403 stops after one compatibility intake. The next Node version must either consume real canonical approval input files or remain blocked on those exact files.

## Current Input Matrix

| Requirement | Source | Current evidence | Current status |
| --- | --- | --- | --- |
| Node template validator | Node | Node v402 route/archive | complete |
| Java template compatibility | Java | Java v166 compatibility receipt | complete |
| mini-kv template echo | mini-kv | mini-kv v157 template-validator echo | complete |
| Node-approved runtime window | canonical input | `e/398/input/node-approved-runtime-window-v398.json` | missing |
| Correlated operator approval record | canonical input | `e/398/input/correlated-operator-approval-record-v398.json` | missing |
| Complete cross-project runtime execution packet | canonical input | `e/398/input/cross-project-runtime-execution-packet-v398.json` | missing |

## Runtime Boundary

Node v403:

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

Java / mini-kv are recommended parallel. Node v403 is not a pre-approval blocker for their own work. Node v404 only needs the three real canonical approval input files, not new Java or mini-kv versions.

## Stop Conditions

Stop before runtime if:

- any request treats Java v166 or mini-kv v157 compatibility evidence as runtime approval;
- any request copies templates into canonical input paths without concrete approval values;
- the three canonical input files do not share one `approvalCorrelationId`;
- any approval permits non-GET smoke commands, managed audit connection, raw endpoint parsing, or write operations;
- cleanup rules and post-run cleanup proof requirements are missing.
