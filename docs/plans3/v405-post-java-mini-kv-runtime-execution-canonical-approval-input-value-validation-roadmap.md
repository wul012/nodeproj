# Node v405 follow-up plan: Java / mini-kv runtime execution canonical approval input value validation

## Scope

Node v405 validates the three real canonical approval inputs under `e/398/input/`.

The inputs were generated from the user's standing authorization to let Codex choose conservative automation defaults and continue without waiting on repeated "advance" prompts. The generated values are constrained to one local-loopback, GET-only runtime smoke path and explicitly deny writes, credential value reads, raw endpoint URL parsing, managed audit connection, and active shard routing.

Node v405 does not start Java, start mini-kv, run runtime probes, or open external connections. It only validates that the approval input values are complete enough for a separate live-read gate.

## Necessity Proof

- Blocker resolved: v404 proved the canonical input files were missing; v405 records that all three are now present and value-valid.
- Later consumer: Node v406 can consume v405 as the live-read gate prerequisite before any service startup.
- Why existing reports cannot be reused: v402-v404 are template/precheck reports and intentionally freeze their historical missing-input state; they do not validate current concrete values.
- Growth stop condition: v405 stops at value validation. Runtime startup requires a separate live-read gate with owner, port, smoke target, and cleanup proof handling.

## Current Input Matrix

| Requirement | Source | Current evidence | Current status |
| --- | --- | --- | --- |
| Node v404 precheck intake | Node | v404 route/archive | complete |
| Node-approved runtime window | canonical input | `e/398/input/node-approved-runtime-window-v398.json` | present and valid |
| Correlated operator approval record | canonical input | `e/398/input/correlated-operator-approval-record-v398.json` | present and valid |
| Complete cross-project runtime execution packet | canonical input | `e/398/input/cross-project-runtime-execution-packet-v398.json` | present and valid |

## Runtime Boundary

Node v405:

- `readyForRuntimeExecutionPacket=true`;
- `readyForRuntimeLiveReadGate=true`;
- `runtimeExecutionPacketPresent=true`;
- `runtimeExecutionPacketExecutable=true`;
- `runtimeGateApprovalPresent=true`;
- `concreteLoopbackPortsAssigned=true`;
- `executionAttempted=false`;
- `startsJavaService=false`;
- `startsMiniKvService=false`;
- `executionAllowed=false`;
- `activeShardPrototypeEnabled=false`.

## Cross-Project Parallel Status

Java / mini-kv are recommended parallel. Node v405 does not require new Java or mini-kv versions before the next Node live-read gate.

If Java / mini-kv produce newer evidence before Node v406 starts, Node v406 may consume it. Otherwise v406 can use the validated v405 packet as the local-loopback GET-only live-read gate prerequisite.

## Stop Conditions

Stop before runtime if:

- any input permits non-GET commands;
- any input allows managed audit connection, raw endpoint parsing, credential value read, or writes;
- the approval correlation id stops matching across all three inputs;
- the runtime window has expired;
- a live-read gate does not include service owner, port conflict handling, smoke target, and stop-only-owned-process cleanup proof.
