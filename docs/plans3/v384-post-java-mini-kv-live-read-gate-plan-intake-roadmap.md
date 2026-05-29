# Node v384 follow-up plan: Java / mini-kv live-read gate plan intake

## Current state

Node v384 consumes the new frozen live-read gate plan evidence:

```text
Source Node: v383 active shard plan boundary handoff archive verification
Source Java evidence: Java v159 live-read gate plan
Source mini-kv evidence: mini-kv v150 live-read gate prerequisite
Supporting mini-kv frozen handoff: v149
Starts/stops Java or mini-kv: false
Runtime probe allowed: false
Execution allowed: false
Active shard prototype enabled: false
Live read gate opened: false
```

v384 is evidence intake only. It verifies the service-owner, port, smoke target, fail-closed, and cleanup prerequisites that a later live-read gate would need, but it does not run that gate.

## Necessity proof

- Blocker resolved: Java v159 and mini-kv v150 added the first explicit service-lifecycle prerequisite evidence after v383. Node needed a frozen intake before any future runtime gate can reference it.
- Later consumer: Node v385 should archive and verify this v384 intake. A later runtime gate may only proceed after an operator-owned service lifecycle plan exists.
- Why existing reports cannot be reused: v383 verified the v382 archive; it did not consume Java v159 or mini-kv v150, and it did not check service ownership, ports, smoke targets, fail-closed behavior, or cleanup.
- Stop condition: after v384, Node stops at archive verification unless a separate operator-owned live-read gate plan supplies service owners, startup ownership, ports, read-only smoke targets, fail-closed behavior, and cleanup responsibilities.

## Recommended order

1. Node v385 archives and verifies the v384 intake.
2. Java / mini-kv continue in parallel; Node v384 is not a pre-approval blocker.
3. Runtime live read remains serial and blocked until the service lifecycle plan is explicit.

## Parallel / wait / serial decision

```text
Node v384: completed frozen evidence intake for Java v159 and mini-kv v150 gate plans.
Java / mini-kv: recommended parallel; Node consumes frozen evidence and does not require new upstream work to archive v384.
Node v385: recommended next as archive verification.
Live integration: serial after service owner, ports, smoke target, fail-closed, and cleanup are declared.
```

## Pause conditions

- Any request starts Java or mini-kv from the v384 intake.
- Any request reads mini-kv rolling current as the v150 historical baseline.
- Any request runs non-GET smoke targets.
- Any request reads credential values or parses raw managed-audit endpoint URLs.
- Any request enables mini-kv active shard router, write routing, multi-process sharding, or write commands without a separate active prototype plan.
