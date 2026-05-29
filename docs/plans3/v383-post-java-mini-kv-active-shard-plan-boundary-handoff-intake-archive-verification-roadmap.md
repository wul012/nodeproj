# Node v383 follow-up plan: active shard plan boundary handoff archive verification

## Current state

Node v383 verifies the Node v382 boundary handoff archive:

```text
Source Node: v382 active shard plan boundary handoff intake
Archive root verified: e/382
Source Java evidence: Java v158
Source mini-kv handoff: v149
Source mini-kv frozen active plan: v148
Starts/stops Java or mini-kv: false
Writes Java or mini-kv: false
Execution allowed: false
Active shard prototype enabled: false
Live read rerun: false
```

v383 is archive verification only. It replays v382 from frozen historical fixtures and proves the archive is complete enough for later review, but it still does not open a live-read gate.

## Necessity proof

- Blocker resolved: v382 consumed a new upstream boundary handoff set, but the archive itself needed a replayable verification record before any later gate can reference it.
- Later consumer: Node v384 may consume new frozen evidence or write a live-read gate plan. It should reference v383 only as verified historical context.
- Why existing reports cannot be reused: v381 verified v380's Java v157 / mini-kv v147 active plan intake. v383 verifies a different source archive with Java v158, mini-kv v149, and mini-kv v148 frozen plan linkage.
- Stop condition: after v383, Node pauses unless there is new frozen upstream evidence or an explicit live-read gate plan with startup, ports, owner, smoke target, fail-closed behavior, and cleanup.

## Recommended order

1. Node pauses after v383 unless a new frozen evidence set exists.
2. Java / mini-kv continue in parallel. They do not need to wait for Node unless they need v383's digest as a downstream receipt.
3. If live read is requested, write the service lifecycle plan first.

## Parallel / wait / serial decision

```text
Node v383: completed archive verification for v382.
Java / mini-kv: recommended parallel; Node v383 is not a pre-approval blocker.
Node v384: wait for new frozen evidence or explicit live-read gate plan.
Live integration: serial after a service lifecycle plan exists.
```

## Pause conditions

- No new frozen boundary evidence and no explicit live-read gate plan.
- Any request tries to read mini-kv rolling current as historical baseline.
- Any request starts Java or mini-kv without service owner, port list, smoke target, and cleanup.
- Any request enables mini-kv active shard router, write routing, multi-process sharding, or write commands without a separate active prototype plan.
