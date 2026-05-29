# Node v388 follow-up plan: declared operator lifecycle evidence intake

## Current state

Node v388 consumes frozen declared lifecycle evidence:

```text
Source Node: v387 operator lifecycle intake archive verification
Source Java evidence: Java v161 declared operator lifecycle
Source mini-kv evidence: v152 declared operator lifecycle
Supporting mini-kv frozen template: v151
Starts/stops Java or mini-kv: false
Runtime probe allowed: false
Runtime live-read gate ready: false
Execution allowed: false
Active shard prototype enabled: false
```

v388 is evidence intake only. Java v161 and mini-kv v152 now both declare operator-owned service lifecycle evidence, including ownership/startup/port/smoke/cleanup/fail-closed fields. Runtime remains blocked because mini-kv v152 explicitly requires a separate runtime gate approval and concrete loopback-port assignment.

## Necessity proof

- Blocker resolved: v387 verified that v386 still had mini-kv template-only evidence. Java v161 and mini-kv v152 now provide the declared lifecycle evidence v387 was waiting for.
- Later consumer: Node v389 should archive and verify this v388 intake before any separate runtime gate plan cites it.
- Why existing reports cannot be reused: v386 consumed Java v160 plus mini-kv v151 template evidence. v388 consumes Java v161 plus mini-kv v152 declared lifecycle evidence and verifies v151 as the frozen template baseline.
- Stop condition: the chain stops before runtime until a separate runtime gate records operator approval, concrete loopback ports, GET-only smoke command, cleanup proof, and fail-closed behavior.

## Recommended order

1. Node v389 archives and verifies the v388 declared lifecycle intake.
2. Java and mini-kv continue in parallel. Node v388 is not a pre-approval blocker for service ownership work.
3. Runtime live-read remains serial and blocked until a separate gate explicitly approves runtime probes.

## Parallel / wait / serial decision

```text
Node v388: consumes declared lifecycle evidence only.
Java: recommended parallel; Java v161 declares service owner, startup command, port, smoke, cleanup, and fail-closed behavior.
mini-kv: recommended parallel; v152 declares lifecycle evidence but still blocks runtime gate approval.
Node v389: may proceed with archive verification of v388.
Live integration: serial after runtime gate approval, concrete ports, GET-only smoke command, cleanup proof, and fail-closed result.
```

## Pause conditions

- Any request treats v388 intake as runtime approval.
- Any request starts or stops Java / mini-kv from this intake.
- Any request reads mini-kv rolling current as historical baseline.
- Any request runs runtime probes before concrete loopback ports and separate approval are recorded.
- Any request enables active shard routing, write routing, storage directories, or multi-process sharding without a separate active prototype plan.
