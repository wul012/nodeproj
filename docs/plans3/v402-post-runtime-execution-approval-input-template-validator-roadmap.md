# Node v402 follow-up plan: runtime execution approval input template validator

## Scope

Node v402 consumes Node v401 as the current blocked completion intake and publishes machine-checkable templates for the three still-missing runtime approval inputs.

This version does not create the real approval inputs under `e/398/input/`. It keeps the canonical target paths absent and writes template/archive material under `e/402/input-templates/` so older gates cannot mistake templates for approval.

Node v402 does not start Java, start mini-kv, parse raw endpoint URLs, connect managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v401 identified the same three missing inputs but did not freeze their exact machine-checkable JSON shape.
- Later consumer: v403 can validate real canonical files as soon as they are provided, without re-litigating schema names, target paths, version bindings, or GET-only/runtime cleanup constraints.
- Why existing reports cannot be reused: v398/v400/v401 list missing inputs, but they are not a template bundle and do not publish expected constants, required fields, semantic rules, or template digests.
- Growth stop condition: v402 stops at three templates and one validator route. The next version must either consume real canonical input files or remain blocked on those exact files.

## Template Matrix

| Requirement | Canonical target | Template archive | Status |
| --- | --- | --- | --- |
| Node-approved runtime window | `e/398/input/node-approved-runtime-window-v398.json` | `e/402/input-templates/node-approved-runtime-window-v402.template.json` | template only |
| Correlated operator approval record | `e/398/input/correlated-operator-approval-record-v398.json` | `e/402/input-templates/correlated-operator-approval-record-v402.template.json` | template only |
| Complete cross-project runtime execution packet | `e/398/input/cross-project-runtime-execution-packet-v398.json` | `e/402/input-templates/cross-project-runtime-execution-packet-v402.template.json` | template only |

## Runtime Boundary

Node v402:

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

- a template file is copied to a canonical input path without concrete approval values;
- the three canonical input files do not share one `approvalCorrelationId`;
- any approval permits non-GET smoke commands, managed audit connection, raw endpoint parsing, or write operations;
- cleanup rules and post-run cleanup proof requirements are missing;
- any request treats v402 templates as runtime approval.

Java / mini-kv can continue in recommended parallel mode. Node v402 is not an upstream pre-approval blocker; it only documents the exact input shape Node will require next.
