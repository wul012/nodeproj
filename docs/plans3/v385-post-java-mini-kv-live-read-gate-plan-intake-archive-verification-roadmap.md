# Node v385 follow-up plan: live-read gate plan intake archive verification

## Current state

Node v385 verifies the Node v384 archive:

```text
Source Node: v384 Java / mini-kv live-read gate plan intake
Archive root verified: e/384
Source Java evidence: Java v159
Source mini-kv gate evidence: v150
Supporting mini-kv frozen handoff: v149
Starts/stops Java or mini-kv: false
Runtime probe allowed: false
Execution allowed: false
Active shard prototype enabled: false
Live read rerun: false
```

v385 is archive verification only. It proves the v384 JSON, Markdown, summary, screenshot, explanation, plan, and code walkthrough are present, then replays v384 from frozen historical fixtures.

## Necessity proof

- Blocker resolved: v384 consumed the first Java v159 / mini-kv v150 service-lifecycle prerequisite evidence. That intake needed a replayable archive verification record before a later runtime gate can reference it.
- Later consumer: Node v386 may consume a new operator-owned service lifecycle plan, or Node may pause if no such evidence exists.
- Why existing reports cannot be reused: v383 verified the v382 boundary handoff archive. v385 verifies a different archive containing Java v159, mini-kv v150, and mini-kv v149 frozen handoff linkage.
- Stop condition: after v385, Node pauses unless there is explicit service owner, startup responsibility, port list, GET-only smoke target, fail-closed behavior, and cleanup responsibility.

## Recommended order

1. Node pauses after v385 unless operator-owned service lifecycle evidence exists.
2. Java / mini-kv continue in parallel. They do not need to wait for Node unless they need v385's archive verification digest as a downstream receipt.
3. If live read is requested, write the runtime service lifecycle plan first.

## Parallel / wait / serial decision

```text
Node v385: completed archive verification for v384.
Java / mini-kv: recommended parallel; Node v385 is not a pre-approval blocker.
Node v386: wait for operator-owned service lifecycle evidence, otherwise pause.
Live integration: serial after service owner, ports, smoke target, fail-closed, and cleanup are declared.
```

## Pause conditions

- No explicit service owner / port / smoke / cleanup evidence exists.
- Any request starts Java or mini-kv from this archive verification.
- Any request reads mini-kv rolling current as historical baseline.
- Any request runs non-GET smoke targets.
- Any request enables active shard routing, write routing, or multi-process sharding without a separate active prototype plan.
