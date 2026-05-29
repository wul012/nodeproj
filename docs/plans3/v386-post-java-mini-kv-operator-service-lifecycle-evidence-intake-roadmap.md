# Node v386 follow-up plan: operator service lifecycle evidence intake

## Current state

Node v386 consumes frozen upstream lifecycle evidence:

```text
Source Node: v385 Java / mini-kv live-read gate plan intake archive verification
Source Java evidence: Java v160 operator-owned service lifecycle evidence
Source mini-kv evidence: v151 operator service lifecycle template
Supporting mini-kv frozen gate plan: v150
Starts/stops Java or mini-kv: false
Runtime probe allowed: false
Runtime live-read gate ready: false
Execution allowed: false
Active shard prototype enabled: false
```

v386 is evidence intake only. Java v160 declares an operator-owned Java service lifecycle placeholder, while mini-kv v151 is still template-only and deliberately declares no owner, port list, GET-only smoke target, or cleanup responsibility. The result is ready for v387 archive verification, but not ready for runtime live read.

## Necessity proof

- Blocker resolved: v385 proved the v384 live-read gate plan intake archive, so Node can now record whether newer Java / mini-kv service lifecycle evidence exists.
- Later consumer: Node v387 should archive and verify this v386 intake before any future runtime gate can cite it.
- Why existing reports cannot be reused: v384 consumed gate-plan prerequisites and v385 verified that archive. v386 consumes a different evidence pair: Java v160 operator-owned lifecycle and mini-kv v151 lifecycle template.
- Stop condition: the chain stops before runtime until mini-kv declares real operator-owned service lifecycle evidence, including owner, startup command, port list, GET-only smoke target, fail-closed behavior, cleanup responsibility, and a separate approved runtime gate.

## Recommended order

1. Node v387 archives and verifies the v386 evidence intake.
2. Java and mini-kv continue in parallel. Node v386 is not a pre-approval blocker for either project.
3. Runtime live-read remains serial and blocked until both upstream service lifecycles are operator-owned and the runtime gate is explicitly approved.

## Parallel / wait / serial decision

```text
Node v386: completed frozen evidence intake for Java v160 + mini-kv v151.
Java: recommended parallel; Java v160 already provides operator-owned placeholder evidence.
mini-kv: recommended parallel; v151 is template-only and must later provide declared operator evidence.
Node v387: may proceed with archive verification of v386.
Live integration: serial after declared owners, ports, smoke targets, fail-closed behavior, cleanup, and an approved runtime gate.
```

## Pause conditions

- Any request treats mini-kv v151 template-only evidence as runtime approval.
- Any request starts or stops Java / mini-kv from this intake.
- Any request reads mini-kv rolling current as historical baseline.
- Any request runs runtime probes or non-GET smoke targets before operator port confirmation.
- Any request enables active shard routing, write routing, storage directories, or multi-process sharding without a separate active prototype plan.
