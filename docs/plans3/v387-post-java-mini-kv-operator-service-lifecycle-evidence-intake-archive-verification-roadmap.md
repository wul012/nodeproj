# Node v387 follow-up plan: operator service lifecycle evidence intake archive verification

## Current state

Node v387 verifies the Node v386 archive:

```text
Source Node: v386 Java / mini-kv operator service lifecycle evidence intake
Archive root verified: e/386
Source Java evidence: Java v160
Source mini-kv lifecycle evidence: v151 template-only
Supporting mini-kv frozen gate plan: v150
Starts/stops Java or mini-kv: false
Runtime probe allowed: false
Runtime live-read gate ready: false
Execution allowed: false
Active shard prototype enabled: false
```

v387 is archive verification only. It proves the v386 JSON, Markdown, summary, screenshot, explanation, plan, and code walkthrough are present, then replays v386 from frozen historical fixtures. The replay preserves the important runtime boundary: mini-kv v151 is still template-only and declares zero operator evidence fields.

## Necessity proof

- Blocker resolved: v386 consumed Java v160 and mini-kv v151 lifecycle evidence. That intake needed a replayable archive verification record before any later runtime gate can reference it.
- Later consumer: Node v388 may consume declared operator-owned lifecycle evidence if mini-kv advances beyond template-only, or Node should remain paused.
- Why existing reports cannot be reused: v385 verifies the v384 live-read gate plan intake archive. v387 verifies a different archive that records Java v160 operator lifecycle evidence and mini-kv v151 template-only lifecycle evidence.
- Stop condition: after v387, Node pauses before runtime until both upstreams provide declared operator-owned lifecycle evidence and a separate approved runtime gate.

## Recommended order

1. Node pauses after v387 unless declared operator-owned lifecycle evidence exists.
2. Java and mini-kv continue in parallel. Node v387 is not a pre-approval blocker.
3. Runtime live-read remains serial and blocked until owner, startup command, port list, GET-only smoke target, fail-closed behavior, cleanup responsibility, and an approved runtime gate are present.

## Parallel / wait / serial decision

```text
Node v387: archive verification for v386 only.
Java: recommended parallel; Java v160 already provides operator-owned placeholder evidence.
mini-kv: recommended parallel; it must replace v151 template-only evidence before runtime.
Node v388: wait for declared operator evidence, otherwise pause.
Live integration: serial after declared owners, ports, smoke targets, fail-closed behavior, cleanup, and an approved runtime gate.
```

## Pause conditions

- Any request treats mini-kv v151 template-only evidence as runtime approval.
- Any request starts or stops Java / mini-kv from this archive verification.
- Any request reads mini-kv rolling current as historical baseline.
- Any request runs runtime probes or non-GET smoke targets before operator port confirmation.
- Any request enables active shard routing, write routing, storage directories, or multi-process sharding without a separate active prototype plan.
