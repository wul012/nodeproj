# 178-production-release-dry-run-envelope-v174

## 版本定位

Node v174 是 `production release dry-run envelope`。它接在 Node v173 后面，把 `release window readiness packet` 包装成发布前 dry-run envelope。

本版不是生产发布器。它只做准备证据：

- 不执行 release。
- 不执行 deployment。
- 不执行 rollback。
- 不执行 mini-kv restore。
- 不执行 Java rollback SQL。
- 不读取 production secret。
- 不连接 production database。

## 核心入口

实现文件：

```text
src/services/productionReleaseDryRunEnvelope.ts
```

入口函数：

```ts
export function loadProductionReleaseDryRunEnvelope(config: AppConfig): ProductionReleaseDryRunEnvelopeProfile {
  const packet = loadReleaseWindowReadinessPacket(config);
  const dryRunSteps = createDryRunSteps();
  const operatorConfirmations = createOperatorConfirmations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(config, packet, dryRunSteps, operatorConfirmations, pauseConditions);
}
```

这说明 v174 的唯一上游 Node 依赖是 v173 packet。它不要求 Java v62 / mini-kv v71 先完成。

## Envelope Digest

v174 生成自己的 digest：

```ts
const envelopeDigest = digestEnvelope({
  profileVersion: "production-release-dry-run-envelope.v1",
  sourcePacketDigest: packet.packet.packetDigest,
  sourcePacketProfileVersion: packet.profileVersion,
  packetState: packet.packetState,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {
    ...checks,
    envelopeDigestValid: undefined,
    readyForProductionReleaseDryRunEnvelope: undefined,
  },
});
```

这里同样排除自校验字段，避免 digest 循环依赖。随后：

```ts
checks.envelopeDigestValid = isReleaseReportDigest(envelopeDigest);
completeAggregateReadyCheck(checks, "readyForProductionReleaseDryRunEnvelope");
```

最终 ready 状态来自全部 24 个 check，而不是手写布尔值。

## Dry-run Steps

`createDryRunSteps()` 固化 6 个步骤：

```ts
prepare -> verify -> simulate -> decide -> closeout -> closeout
```

每一步都明确：

```ts
dryRunOnly: true
readOnly: true
mutatesState: false
executesRelease: false
executesDeployment: false
executesRollback: false
executesRestore: false
readsSecretValues: false
connectsProductionDatabase: false
```

这让 dry-run envelope 只是“发布前人工准备视图”，不是操作入口。

## Operator Confirmations

`createOperatorConfirmations()` 记录 6 个确认项：

```text
release-operator
rollback-approver
artifact-target
migration-direction
restore-drill-digest-review
secret-source-confirmation
```

每个确认项都满足：

```ts
required: true
placeholderOnly: true
nodeMayInfer: false
```

意思是 Node 可以展示这些确认项，但不能替操作员推断或填写。

## Pause Conditions

`createPauseConditions()` 明确 8 个暂停条件，其中包括：

```text
UPSTREAM_ACTIONS_ENABLED must remain false.
Node must not start Java or mini-kv automatically.
No production secret values may be read.
No production database may be connected.
No Java release, deployment, rollback, or SQL command may execute.
No mini-kv LOAD, COMPACT, SETNXEX, or restore command may execute.
```

这些条件是 v174 继续靠近生产级但不打开生产执行的安全边界。

## 路由接入

`statusRoutes.ts` 注册：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/release-dry-run-envelope",
  () => Promise.resolve(loadProductionReleaseDryRunEnvelope(deps.config)),
  renderProductionReleaseDryRunEnvelopeMarkdown,
);
```

对应：

```text
GET /api/v1/production/release-dry-run-envelope
GET /api/v1/production/release-dry-run-envelope?format=markdown
```

## 测试覆盖

新增：

```text
test/productionReleaseDryRunEnvelope.test.ts
```

覆盖：

- 正常情况下 24 个 check 全部通过。
- `UPSTREAM_ACTIONS_ENABLED=true` 时 envelope blocked。
- JSON / Markdown route 可访问，并包含 `PROCEED_TO_PARALLEL_JAVA_V62_MINI_KV_V71`。

v174 的价值是把 v173 的人工 review packet 推进一步，变成发布前 dry-run envelope，同时仍然把真实生产动作全部关住。
