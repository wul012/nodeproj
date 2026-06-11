# Node v389 follow-up plan: declared operator lifecycle evidence intake archive verification

## Scope

Node v389 verifies the Node v388 archive:

- `e/388/evidence/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388-http.json`
- `e/388/evidence/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388-http.md`
- `e/388/evidence/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388-summary.json`
- `e/388/evidence/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388-browser-snapshot.md`
- `e/388/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388.html`
- `e/388/图片/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388.png`
- `e/388/解释/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388.md`
- `代码讲解记录_生产雏形阶段3/r0000/393-java-mini-kv-declared-operator-lifecycle-evidence-intake-v388.md`

v389 is archive verification only. It proves the v388 JSON, Markdown, summary, screenshot, explanation, plan, and code walkthrough are present, then replays v388 from frozen historical fixtures. The replay preserves the runtime boundary: Java v161 and mini-kv v152 both declare operator-owned lifecycle evidence, but the runtime live-read gate is still closed and requires a separate approval record plus concrete loopback ports.

## Necessity Proof

- Blocker resolved: v388 consumed Java v161 and mini-kv v152 declared lifecycle evidence, but no later Node archive has verified that result yet.
- Later consumer: Node v390 may write a separate runtime live-read gate plan only after v389 verifies the v388 archive.
- Why existing reports cannot be reused: v387 verifies v386 template-era intake. v389 verifies v388 declared lifecycle intake with Java v161, mini-kv v152, and the frozen mini-kv v151 template baseline.
- Growth stop condition: after v389, do not add another archive-verification link for the same v388 archive. The next new work must be a separate runtime gate plan or an explicit stop.

## Cross-Project Parallel Plan

1. Node v389 archives and verifies the v388 declared lifecycle intake.
2. Java and mini-kv continue in parallel. Node v389 is not a pre-approval blocker for upstream service-ownership work.
3. If Node v390 needs live runtime integration, it must state startup command, port ownership, service owner, GET-only smoke command, cleanup owner, and stop conditions before any process starts.

## Runtime Boundary

Node v389:

- does not start Java;
- does not start mini-kv;
- does not run runtime probes;
- does not parse raw endpoint URLs;
- does not read credential values;
- does not enable active shard routing;
- does not mutate sibling repositories.

## Stop Conditions

Stop before runtime if:

- the v388 archive is missing JSON, Markdown, summary, screenshot, explanation, or walkthrough evidence;
- frozen replay does not resolve Java v161, mini-kv v152, and mini-kv v151 from historical fixtures;
- `readyForRuntimeLiveReadGate` becomes true in v389;
- any request treats v389 archive verification as runtime approval;
- Java / mini-kv service startup is requested without a separate Node v390 runtime gate plan.
