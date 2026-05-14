# 第一百六十四版代码讲解：release report shared helpers refactor

本版目标是收敛 Node release report 的重复模板。

它解决的问题是：

```text
v162 cross-project release verification intake gate 有 727 行；
v163 release rollback readiness runbook 有 788 行；
两者都包含 Markdown 拼装、blocking message、step rendering、forbidden operation rendering、digest helper；
如果继续照这个模式做 Node v165/v166，报告服务会继续膨胀。
```

所以 v164 不是新增一个新业务报告，而是插入一个小型重构闭环：抽出公共 helper，保持已有 endpoint 和 JSON 结构不变。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v163-post-rollback-readiness-roadmap.md
```

原计划下一步是推荐并行 Java v56 + mini-kv v65，然后 Node v164 消费两边证据做 release bundle gate。

但用户指出：

```text
13 个版本新增约 9995 行
单文件仍然 400-700 行
命名仍然较长
```

这个判断合理，所以本版插入一个 Node 内部重构版。调整后计划变成：

```text
Node v164：release report shared helpers refactor，已完成
下一步推荐并行：Java v56 + mini-kv v65
Node v165：cross-project release bundle gate，等待 Java v56 + mini-kv v65 完成后再做
```

这样既解决当前 Node 侧维护问题，也不阻塞其他窗口推进 Java / mini-kv。

## 新增公共 helper

新增文件：

```text
src/services/releaseReportShared.ts
```

它收敛的不是业务证据，而是报告服务共用的表现层和小工具。

## aggregate ready check

原来 v162 / v163 都有这种代码：

```ts
checks.readyForCrossProjectReleaseVerificationIntakeGate = Object.entries(checks)
  .filter(([key]) => key !== "readyForCrossProjectReleaseVerificationIntakeGate")
  .every(([, value]) => value);
```

v164 抽成：

```ts
export function completeAggregateReadyCheck<TChecks extends Record<string, boolean>>(
  checks: TChecks,
  readyKey: keyof TChecks,
): void {
  checks[readyKey] = Object.entries(checks)
    .filter(([key]) => key !== readyKey)
    .every(([, value]) => value) as TChecks[keyof TChecks];
}
```

现在 v162 里变成：

```ts
completeAggregateReadyCheck(checks, "readyForCrossProjectReleaseVerificationIntakeGate");
```

v163 里变成：

```ts
completeAggregateReadyCheck(checks, "readyForReleaseRollbackReadinessRunbook");
```

这样后续新报告只需要声明 ready 字段名，不再复制 `Object.entries(...).filter(...).every(...)`。

## blocking message helper

原来每个服务都有自己的 `addMessage()`：

```ts
function addMessage(
  messages: CrossProjectReleaseVerificationIntakeGateMessage[],
  condition: boolean,
  code: string,
  source: CrossProjectReleaseVerificationIntakeGateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
```

v164 抽成：

```ts
export function appendBlockingMessage<TMessage extends LiveProbeReportMessage>(
  messages: TMessage[],
  condition: boolean,
  code: string,
  source: TMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message } as TMessage);
  }
}
```

v162 / v163 保留本地 `addMessage()` 作为类型适配层，但内部已经只调用公共 helper：

```ts
appendBlockingMessage(messages, condition, code, source, message);
```

这样既减少重复，又保持各服务自己的 message union type。

## Markdown 渲染 helper

原来 v162 / v163 的 Markdown 函数都很长，重复结构包括：

```text
标题
header fields
Gate / Runbook
Checks
Artifacts
Steps
Forbidden Operations
Summary
Production Blockers
Warnings
Recommendations
Evidence Endpoints
Next Actions
```

v164 抽出：

```ts
export function renderReleaseReportMarkdown<TMessage extends LiveProbeReportMessage>(
  options: ReleaseReportMarkdownOptions<TMessage>,
): string {
  return [
    `# ${options.title}`,
    "",
    ...renderEntries(options.header),
    "",
    ...options.sections.flatMap(renderObjectSection),
    ...options.itemSections.flatMap((section) => renderItemSection(section)),
    ...options.messageSections.flatMap(renderMessageSection),
    "## Evidence Endpoints",
    "",
    ...renderEntries(options.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(options.nextActions, "No next actions."),
    "",
  ].join("\n");
}
```

v162 的 `renderCrossProjectReleaseVerificationIntakeGateMarkdown()` 现在只描述自己有哪些 section：

```ts
return renderReleaseReportMarkdown({
  title: "Cross-project release verification intake gate",
  header: {
    Service: profile.service,
    "Generated at": profile.generatedAt,
    "Profile version": profile.profileVersion,
    "Gate state": profile.gateState,
```

v163 的 `renderReleaseRollbackReadinessRunbookMarkdown()` 同理：

```ts
return renderReleaseReportMarkdown({
  title: "Release rollback readiness runbook",
  header: {
    Service: profile.service,
    "Generated at": profile.generatedAt,
    "Profile version": profile.profileVersion,
    "Runbook state": profile.runbookState,
```

这让后续报告服务不必再手写上百行 Markdown 数组拼接。

## section 方式

v162 的 section 描述：

```ts
sections: [
  { heading: "Gate", entries: profile.gate },
  { heading: "Checks", entries: profile.checks },
  { heading: "Previous Runbook", entries: profile.artifacts.previousRunbook },
  { heading: "Java Release Manifest", entries: profile.artifacts.javaReleaseManifest },
  { heading: "mini-kv Release Manifest", entries: profile.artifacts.miniKvReleaseManifest },
  { heading: "Node Intake Envelope", entries: profile.artifacts.nodeIntakeEnvelope },
  { heading: "Summary", entries: profile.summary },
],
```

v163 的 section 描述：

```ts
sections: [
  { heading: "Runbook", entries: profile.runbook },
  { heading: "Checks", entries: profile.checks },
  { heading: "Previous Intake Gate", entries: profile.artifacts.previousIntakeGate },
  { heading: "Java Deployment Rollback Evidence", entries: profile.artifacts.javaDeploymentRollbackEvidence },
  {
    heading: "mini-kv Runtime Artifact Rollback Evidence",
    entries: profile.artifacts.miniKvRuntimeArtifactRollbackEvidence,
  },
  { heading: "Node Runbook Envelope", entries: profile.artifacts.nodeRunbookEnvelope },
  { heading: "Summary", entries: profile.summary },
],
```

这比原来逐段手写 `##`、空行和 `renderEntries()` 更紧凑，后续也更不容易漏掉空行或章节顺序。

## step rendering helper

v162 和 v163 的 step 字段不完全一样：

```text
v162：source / readOnly / executesExternalBuild / mutatesState
v163：actor / dryRunOnly / readOnly / mutatesState / executesRollback
```

所以公共 helper 做成可配置：

```ts
export function renderReleaseReportStep(
  step: Record<string, unknown>,
  options: ReleaseReportStepRenderOptions,
): string[] {
  return [
    `### Step ${String(step.order)}: ${String(step.phase)}`,
    "",
    `- ${options.identityLabel}: ${String(step[options.identityKey])}`,
    `- Action: ${String(step.action)}`,
    `- Evidence target: ${String(step.evidenceTarget)}`,
    `- Expected evidence: ${String(step.expectedEvidence)}`,
    ...options.booleanFields.map(([label, key]) => `- ${label}: ${String(step[key])}`),
    "",
  ];
}
```

v162 使用：

```ts
return renderReleaseReportStep(step as unknown as Record<string, unknown>, {
  identityLabel: "Source",
  identityKey: "source",
  booleanFields: [
    ["Read only", "readOnly"],
    ["Executes external build", "executesExternalBuild"],
    ["Mutates state", "mutatesState"],
  ],
});
```

v163 使用：

```ts
return renderReleaseReportStep(step as unknown as Record<string, unknown>, {
  identityLabel: "Actor",
  identityKey: "actor",
  booleanFields: [
    ["Dry run only", "dryRunOnly"],
    ["Read only", "readOnly"],
    ["Mutates state", "mutatesState"],
    ["Executes rollback", "executesRollback"],
  ],
});
```

这保留了两个报告的语义差异，同时把格式逻辑统一。

## forbidden operation helper

两个服务里的 forbidden operation 输出格式完全一样：

```text
- operation: reason Blocked by blockedBy.
```

v164 抽成：

```ts
export function renderReleaseForbiddenOperation(operation: ReleaseReportForbiddenOperation): string[] {
  return [
    `- ${operation.operation}: ${operation.reason} Blocked by ${operation.blockedBy}.`,
  ];
}
```

v162 / v163 只保留薄薄的一层：

```ts
function renderForbiddenOperation(operation: CrossProjectReleaseVerificationForbiddenOperation): string[] {
  return renderReleaseForbiddenOperation(operation);
}
```

## digest helper

原来两个服务都直接引用 `sha256StableJson()`：

```ts
function digestGate(value: unknown): string {
  return sha256StableJson(value);
}
```

v164 抽成：

```ts
export function digestReleaseReport(value: unknown): string {
  return sha256StableJson(value);
}
```

v162：

```ts
function digestGate(value: unknown): string {
  return digestReleaseReport(value);
}
```

v163：

```ts
function digestRunbook(value: unknown): string {
  return digestReleaseReport(value);
}
```

这样以后 release report digest 统一走一个命名更贴切的入口。

## 为什么没有大拆文件

这版没有把 v162/v163 拆成：

```text
xxxReferences.ts
xxxChecks.ts
xxxMarkdown.ts
```

原因是本版目标是合理小闭环，不做大重构。当前最重复的是 Markdown/report helper，先抽这一层风险最低；如果下一两版仍然超过 600 行，再考虑按 references/checks/markdown 拆文件。

## 测试覆盖

本版没有新增 endpoint，所以继续用已有测试守住行为：

```text
test/crossProjectReleaseVerificationIntakeGate.test.ts
test/releaseRollbackReadinessRunbook.test.ts
```

它们覆盖：

```text
JSON profile shape
blocked case
Markdown route
ready state
digest
forbidden operations
recommendations
```

这能证明重构没有改变外部行为。

## 运行与归档

本版验证：

```text
npm run typecheck
npm test -- --run test/crossProjectReleaseVerificationIntakeGate.test.ts test/releaseRollbackReadinessRunbook.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

归档：

```text
c/164/图片/release-report-shared-helpers-refactor.png
c/164/解释/运行调试说明.md
```

HTTP smoke 只启动 Node 本地服务，且保持：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

截图完成后 Node 进程已停止。

## 成熟度变化

v164 没有让业务功能变多，但让 Node 侧报告开发更可持续。

成熟度提升点：

```text
报告 Markdown 拼装统一
blocking message 逻辑统一
step / forbidden operation 渲染统一
digest 入口统一
后续 Node v165/v166 不必继续复制 700 行模板
```

仍未解决的点：

```text
reference constants 仍在服务文件内
checks 仍在服务文件内
文件名仍偏长
下一步新 report 如果继续很大，应该考虑拆 references/checks/markdown
```

## 一句话总结

v164 是一次必要的 Node 内部报告骨架收敛：不新增业务能力，不抢跑 Java / mini-kv，而是先把 v162/v163 的重复报告模板抽成公共 helper，为后续 release bundle gate 和 rollback window checklist 降低维护成本。
