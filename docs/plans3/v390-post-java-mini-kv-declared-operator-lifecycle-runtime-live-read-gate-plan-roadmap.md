# Node v390 follow-up plan: declared operator lifecycle runtime live-read gate plan

## Scope

Node v390 writes a separate runtime live-read gate plan after Node v389 verified the v388 declared operator lifecycle evidence intake archive.

This version is plan-only. It records the runtime gate prerequisites that must exist before any live runtime probe:

- operator approval record;
- concrete loopback port assignment;
- GET-only smoke command;
- cleanup proof;
- fail-closed result recording.

It does not start Java, start mini-kv, parse raw endpoint URLs, connect to managed audit, run runtime probes, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v389 verified that v388 archived Java v161 and mini-kv v152 declared operator lifecycle evidence. The next missing artifact is a separate runtime gate plan that states concrete approval, port, smoke, and cleanup requirements.
- Later consumer: Node v391 should archive and verify this v390 plan before any runtime execution packet or service startup is considered.
- Why existing reports cannot be reused: v384 described an earlier prerequisite-only live-read gate plan based on Java v159 and mini-kv v150. v390 is based on the later declared operator lifecycle evidence chain: Node v389, Node v388, Java v161, and mini-kv v152.
- Growth stop condition: v390 stops at a plan. Do not add another planning echo for the same gate unless v391 archive verification finds a concrete defect. The next new artifact after v391 must be an explicit runtime execution packet or an explicit stop.

## Cross-Project Parallel Plan

1. Node v390 writes the plan and keeps runtime closed.
2. Java and mini-kv can continue in parallel. Node v390 is not a pre-approval blocker for upstream operator work.
3. If a later Node version executes anything, it must identify service owner, startup command owner, loopback port, GET-only smoke command, cleanup owner, stop condition, and process cleanup rules before starting any process.

## Runtime Boundary

Node v390:

- `readyForRuntimeLiveReadGate=false`;
- `runtimeGateApprovalPresent=false`;
- `concreteLoopbackPortsAssigned=false`;
- `startsJavaService=false`;
- `startsMiniKvService=false`;
- `executionAllowed=false`;
- `activeShardPrototypeEnabled=false`.

## Stop Conditions

Stop before runtime if:

- v389 archive verification is missing or blocked;
- v388 replay no longer resolves Java v161, mini-kv v152, and mini-kv v151 from frozen historical fixtures;
- operator approval record is absent;
- concrete loopback ports are absent;
- GET-only smoke command is absent;
- cleanup proof is absent;
- any request treats v390 as runtime approval rather than a plan.
