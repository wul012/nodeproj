# 91. Node v87 Release evidence readiness gate 代码讲解

## 1. v87 的职责

`src/services/upstreamContractFixtureScenarioReleaseEvidenceReadinessGate.ts` 做的是“发布证据门禁”，不是执行入口。

核心字段：

```ts
readyForReleaseEvidenceArchive: boolean;
readOnly: true;
executionAllowed: false;
sourceIndexDigest: string;
blockers: ReleaseEvidenceReadinessMessage[];
warnings: ReleaseEvidenceReadinessMessage[];
```

这说明 gate 的结论只用于判断“是否能归档发布证据”，不能授权 Java replay 或 mini-kv 写操作。

## 2. gate 必须消费 v86 index

加载函数只做一件事：先加载 v86 的 release evidence index，再创建 gate。

```ts
return createUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(
  await loadUpstreamContractFixtureScenarioReleaseEvidenceIndex(config),
);
```

这样 v87 没有重复手写四份 evidence 的结论，而是把 v86 的 index 作为唯一输入来源。

## 3. blockers 是明确的发布门禁失败原因

`checks` 把 index 的状态转成门禁条件：

```ts
indexValid
indexReadOnly
indexExecutionBlocked
evidenceCountComplete
allEvidenceValid
executionNeverAllowed
digestCoverageComplete
sourcePathCoverageValid
scenarioEvidenceCoverageValid
noScenarioIssues
```

`collectBlockers()` 会把失败条件转成明确 code：

```ts
INDEX_INVALID
EVIDENCE_COUNT_INCOMPLETE
DIGEST_COVERAGE_INCOMPLETE
SCENARIO_ISSUES_PRESENT
```

这比单纯返回 `valid=false` 更接近生产级，因为 CI 或运维系统可以直接定位失败原因。

## 4. warnings 保留“还没生产化”的真实边界

即使 ready=true，v87 仍返回两个 warning：

```ts
CI_GATE_NOT_WIRED
EVIDENCE_ONLY
```

这表示当前 gate 还只是接口能力，尚未被 CI 强制执行；而且 ready 只代表证据可归档，不代表可以真实执行上游动作。

## 5. 路由只读暴露 JSON / Markdown

`src/routes/statusRoutes.ts` 新增：

```ts
/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate
```

Markdown 仍用同一个 `format=markdown` 参数：

```ts
renderUpstreamContractFixtureScenarioReleaseEvidenceReadinessGateMarkdown(gate)
```

没有新增 POST/PUT/DELETE，也没有触碰 Java / mini-kv。

## 6. 测试锁住门禁行为

`test/upstreamContractFixtureScenarioReleaseEvidenceReadinessGate.test.ts` 覆盖：

```ts
turns a valid release evidence index into an archive readiness gate
blocks archive readiness when the release evidence index is invalid
exposes readiness gate routes in JSON and Markdown
```

其中 invalid 测试很关键：当 index 被标记 invalid 时，gate 会输出 blocker，而不是继续 ready。
