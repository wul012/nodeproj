# Node v2089-v2093 生产分片执行 dry-run 外部 artifact intake 代码讲解

## 本批定位

v2089-v2093 不是继续堆内部治理层，也不是伪造真实批准。它把 v2088 提到的“真实外部 artifact”先做成 dry-run intake 链：可以验证 envelope、synthetic approval fixture、store owner request、owner receipt reconciliation 和 closeout，但所有材料都保持 non-authoritative。

这批的核心边界仍然不变：

- `readyForProductionShardExecution=false`
- `executionAllowed=false`
- 不启动 Java / mini-kv
- 不连接 managed audit 生产存储
- 不读取 credential value
- 不解析 raw endpoint URL
- Java / mini-kv 仍可并行推进 owner receipts

## f 文件夹归档规则

这批开始使用新的说明/图片归档位置：

```text
e/<version>/evidence   机器证据：JSON、Markdown、summary
f/<version>/解释       人读讲解
f/<version>/图片       只有真正生成截图或图像证据时才创建
```

当前 v2089-v2093 没有浏览器页面截图，也没有图像证据，所以没有创建 `f/<version>/图片`。这不是遗漏，而是避免空目录和假截图。

## v2089: external artifact intake envelope

文件：

```text
src/services/productionShardExecutionExternalArtifactIntakeEnvelope.ts
```

v2089 做两件事：

- 定义五个 artifact slots：signed approval、managed audit store owner binding、Java receipt、mini-kv receipt、cleanup reconciliation receipt；
- 把新的 e/f 归档布局写进 profile。

它允许后续版本使用 synthetic fixture 做 schema validation，但明确 `syntheticFixturesAreAuthoritative=false`，因此不会产生真实执行权限。

## v2090: signed approval fixture validation

文件：

```text
src/services/productionShardExecutionSignedApprovalFixtureValidation.ts
```

v2090 使用一个 synthetic approval fixture 验证字段形状。它检查 approval id、window id、operator identity、source digest binding、expiry 和 signature digest shape。

关键不是“有批准”，而是“将来真实批准来了能被稳定验证”。所以 fixture 明确写成：

```text
synthetic=true
authoritative=false
executionAuthority=false
```

## v2091: managed audit store owner binding request

文件：

```text
src/services/productionShardExecutionManagedAuditStoreOwnerBindingRequest.ts
```

v2091 把 managed audit store owner 需要给出的绑定材料整理成五项：

- store-owner identity
- retention class
- immutable record schema
- idempotency key policy
- credential redaction proof

这版仍不连接生产 store，只是把 owner binding request 固化下来。

## v2092: owner receipt dry-run reconciliation

文件：

```text
src/services/productionShardExecutionOwnerReceiptDryRunReconciliation.ts
```

v2092 把 Java、mini-kv、cross-project cleanup 三个 receipt rows 放到一个 dry-run reconciliation table 中。每一行都保留 `signed=false`，避免把请求槽位误读为真实签收。

这让另外两个项目可以照着做真实 receipt，而 Node 不再通过新计划反复改变目标。

## v2093: external artifact dry-run closeout

文件：

```text
src/services/productionShardExecutionExternalArtifactDryRunCloseout.ts
```

v2093 消费 v2089-v2092 的 digest，关闭 dry-run artifact intake batch。它明确下一步必须是真实 artifact intake：

- real signed production approval
- real managed audit store owner binding
- real Java owner receipt
- real mini-kv owner receipt
- real cleanup reconciliation receipt

这版的停止条件很硬：没有真实外部 artifact，就停止 Node-only dry-run growth。

## 路由和测试

路由入口：

```text
src/routes/auditProductionShardExecutionRoutes.ts
```

测试入口：

```text
test/productionShardExecutionReadiness.test.ts
```

本批把 production shard execution route 从 11 条扩到 16 条，route catalog 计数从 241 更新到 246，`java-mini-kv` domain route count 从 75 更新到 80。

## 工程意义

这一批的价值不是“多五个报告”，而是把真实执行前最难处理的 artifact intake 做成可测试、可归档、可停止的 dry-run 链。下一次真正向生产级别靠近，不应该再靠 Node 自己编新门槛，而应该接入至少一个真实外部 artifact。
