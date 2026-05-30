# Node v391 follow-up plan: declared operator lifecycle runtime live-read gate plan archive verification

## Scope

Node v391 archives and verifies the Node v390 declared operator lifecycle runtime live-read gate plan.

This version is archive-verification-only. It replays v390 from frozen historical evidence, checks the v390 JSON/Markdown/summary/browser/screenshot/explanation/code walkthrough artifacts, and confirms that the runtime gate is still closed.

It does not start Java, start mini-kv, parse raw endpoint URLs, connect to managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v390 produced a plan but not an auditable archive verification of that plan.
- Later consumer: Node v392 may prepare a separate runtime execution packet only after this archive verification proves v390 did not approve execution.
- Why existing reports cannot be reused: v389 verifies the declared lifecycle evidence intake, not the v390 runtime gate plan archive.
- Growth stop condition: v391 stops after archive verification. The next new artifact must be either an explicit runtime execution packet with approval/ports/smoke/cleanup details, or an explicit stop record. Do not add another plan echo for the same v390 plan unless this verification finds a concrete defect.

## Cross-Project Parallel Plan

1. Node v391 verifies only Node v390 archives and frozen replay.
2. Java and mini-kv can continue in recommended parallel mode while Node verifies this archive. Node v391 is not a pre-approval blocker for upstream operator work.
3. If Node v392 prepares execution, it must name service owner, startup command owner, loopback port, GET-only smoke command, cleanup owner, stop condition, and process cleanup rules before starting any process.

## Runtime Boundary

Node v391:

- `readyForRuntimeLiveReadGate=false`;
- `runtimeExecutionPacketPresent=false`;
- `runtimeGateApprovalPresent=false`;
- `concreteLoopbackPortsAssigned=false`;
- `startsJavaService=false`;
- `startsMiniKvService=false`;
- `executionAllowed=false`;
- `activeShardPrototypeEnabled=false`.

## Stop Conditions

Stop before runtime if:

- the v390 archive is missing or blocked;
- v390 replay no longer resolves Node v389 and Node v388 evidence from frozen historical fixtures;
- operator approval record is absent;
- concrete loopback ports are absent;
- GET-only smoke command is absent;
- cleanup proof is absent;
- any request treats v391 archive verification as runtime approval rather than a prerequisite.
