# Node v382 follow-up plan: active shard plan boundary handoff intake

## Current state

Node v382 consumes the next frozen upstream handoff set:

```text
Source Node: v381 active shard plan evidence intake archive verification
Java source: v158 active shard plan boundary handoff
mini-kv source: v149 frozen consumer handoff
mini-kv supporting frozen plan: v148 active prototype plan freeze
Starts/stops Java or mini-kv: false
Writes Java or mini-kv: false
Execution allowed: false
Active shard prototype enabled: false
Live read rerun: false
```

v382 is still an evidence intake, not a live-read gate and not an active shard router. It proves Node can consume the Java v158 boundary statement and mini-kv v149 consumer handoff from local historical fixtures, while keeping the v148 active plan freeze available as the frozen source named by v149.

## Necessity proof

- Blocker resolved: v381 said Node should pause until new frozen evidence arrived. Java v158 and mini-kv v149 are now complete and tagged, so Node can consume them without opening a live runtime gate.
- Later consumer: Node v383 archive verification should verify the v382 archive and forced historical fallback replay.
- Why existing reports cannot be reused: v380 consumed Java v157 plus mini-kv v147. v382 consumes a different upstream pair and must prove Java v158 / mini-kv v149 boundary handoff semantics.
- Stop condition: after v383 archive verification, Node pauses again unless there is a new frozen upstream handoff or an explicit live-read gate plan with service startup, port, owner, smoke target, and cleanup.

## Recommended order

1. Node v383: archive verification for v382 boundary handoff intake.
2. Java / mini-kv: recommended parallel. They do not need to wait for Node v383 unless they need Node's archived digest as a consumer receipt.
3. Live-read gate: only after a separate plan defines service ownership, ports, fail-closed smoke, and cleanup.

## Parallel / wait / serial decision

```text
Node v382: completed frozen evidence intake.
Node v383: recommended next, archive verification only.
Java / mini-kv: recommended parallel; Node v382 is not a pre-approval blocker.
Live integration: wait until an explicit service lifecycle plan exists.
```

## Pause conditions

- Java v158 or mini-kv v149 evidence cannot be read from frozen historical fixtures.
- A request would read mini-kv rolling current files as historical baseline.
- A request would start Java/mini-kv without a service owner, port list, smoke target, and cleanup plan.
- A request would enable mini-kv active shard router, write routing, multi-process sharding, or write commands without a separate active prototype plan.
