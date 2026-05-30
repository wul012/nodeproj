# Node v400 follow-up plan: Java / mini-kv runtime execution approval input intake contract

## Scope

Node v400 consumes Node v399, Java v164, and mini-kv v155 as read-only evidence and writes the exact approval-input contract for the next step.

This version does not approve runtime execution. It records that Java v164 is a complete Java-side approval input, mini-kv v155 is precheck-only, and the final Node/operator/cross-project approval inputs are still missing.

Node v400 does not start Java, start mini-kv, parse raw endpoint URLs, connect managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v399 left the next step too implicit. v400 turns the next handoff into explicit owner-by-owner requirements.
- Later consumer: Node v401 or later can consume only complete approval inputs instead of guessing from Java/mini-kv progress evidence.
- Why existing reports cannot be reused: v399 verified an archive; Java v164 and mini-kv v155 were created after v399 and are not represented in the v399 archive.
- Growth stop condition: v400 stops at one input contract. The next Node version must either consume completed inputs or remain blocked with a concrete missing-input reason.

## Cross-Project Parallel Plan

1. Node v400 owns only the intake contract and archive output.
2. Java v164 can continue to be referenced as the Java-side input. Java does not need to wait for Node unless it changes that input.
3. mini-kv should produce a final approval gate input; mini-kv v155 is only precheck evidence.
4. Operator/release coordination must provide the Node-approved runtime window and correlated operator approval record.
5. A complete cross-project runtime execution packet must bind Java v164, final mini-kv input, Node runtime window, correlated approval, GET-only smoke commands, owner confirmations, and cleanup proof.
6. No live integration is required for v400.

## Required Inputs

| Requirement | Owner | Current evidence | Current status |
| --- | --- | --- | --- |
| Java-side approval gate input | Java | `D:/javaproj/advanced-order-platform/e/164/evidence/java-shard-readiness-runtime-execution-approval-gate-input-v164.json` | present |
| Final mini-kv approval gate input | mini-kv | `D:/C/mini-kv/fixtures/release/shard-readiness-v155.json` | precheck-only |
| Node-approved runtime window | Node | `e/398/input/node-approved-runtime-window-v398.json` | missing |
| Correlated operator approval record | operator | `e/398/input/correlated-operator-approval-record-v398.json` | missing |
| Complete cross-project runtime execution packet | cross-project | `e/398/input/cross-project-runtime-execution-packet-v398.json` | missing |

## Runtime Boundary

Node v400:

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

- mini-kv remains precheck-only;
- the Node-approved runtime window is missing;
- the correlated operator approval record is missing;
- the complete cross-project runtime execution packet is missing;
- any input treats Java v164 or mini-kv v155 precheck as runtime approval;
- any request would start or stop Java/mini-kv from the intake contract.
