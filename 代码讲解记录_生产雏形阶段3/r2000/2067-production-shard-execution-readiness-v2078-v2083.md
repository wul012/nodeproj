# 2067 - Node v2078-v2083 生产分片执行候选就绪批次代码讲解

## 版本目标和非目标

这一批不是把生产分片执行打开，而是把它推进到更接近生产前置闭环的状态。此前 Node 已经有 `Node v409` 的 Java/mini-kv runtime execution pass evidence closeout，但当前高版本主线缺少一个干净的承接点。v2078-v2083 做的就是把旧证据接回当前主线，并依次补齐候选合同、失败矩阵、操作者工作表、候选归档校验和批次收口。

非目标同样重要：

- 不开启 `executionAllowed`
- 不启动 Java 或 mini-kv
- 不连接 managed audit 生产存储
- 不读取凭证值
- 不解析 raw endpoint
- 不启用 active shard routing

## 入口路由

新增 route group 位于：

```text
src/routes/auditProductionShardExecutionRoutes.ts
```

六个路由为：

```text
/api/v1/audit/production-shard-execution-handoff-readiness
/api/v1/audit/production-shard-execution-candidate-contract
/api/v1/audit/production-shard-execution-failure-matrix
/api/v1/audit/production-shard-execution-operator-window-worksheet
/api/v1/audit/production-shard-execution-candidate-archive-verification
/api/v1/audit/production-shard-execution-closeout
```

它们全部使用共享 `auditJsonMarkdownRoute()` 注册，因此 JSON 和 Markdown 入口一致，也能被 route catalog 测试覆盖。

## 共享模型

核心类型在：

```text
src/services/productionShardExecutionReadinessTypes.ts
```

每个 profile 都有同一组关键字段：

```ts
readyForNextStage: boolean;
readyForProductionShardExecution: false;
candidateOnly: true;
javaMiniKvRecommendedParallel: true;
nodeIsUpstreamPreApprovalBlocker: false;
safety: {
  readOnly: true;
  executionAllowed: false;
  readyForProductionOperations: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  activeShardPrototypeEnabled: false;
};
```

这组字段故意写得很硬：本批次可以推进候选闭环，但不能被误读成生产执行授权。

## Builder 复用

公共构建逻辑在：

```text
src/services/productionShardExecutionReadinessBuilder.ts
```

`createProductionShardExecutionProfile()` 统一负责：

- 计算 `readyForNextStage`
- 生成 `readinessDigest`
- 汇总 checks
- 汇总 sources
- 生成 production blockers
- 保持 closed safety boundary

这避免了六个版本各自复制一套 summary / blockers / renderer 代码。真正的版本差异只放在每个服务自己的 `stagePayload` 和 checks 中。

## 六版真实流程

### v2078 handoff readiness

文件：

```text
src/services/productionShardExecutionHandoffReadiness.ts
```

它读取旧链路：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout()
```

然后把 `Node v409` closeout digest 固化为当前高版本主线的 handoff anchor。它解决的是“当前生产分片执行讨论从哪里承接旧 runtime pass evidence”的问题。

### v2079 candidate contract

文件：

```text
src/services/productionShardExecutionCandidateContract.ts
```

它定义五个候选阶段：evidence lock、operator-approved read-only probe、shard plan digest binding、candidate decision freeze、archive and cleanup proof。它解决的是“未来执行窗口到底允许讨论哪些阶段”的问题。

### v2080 failure matrix

文件：

```text
src/services/productionShardExecutionFailureMatrix.ts
```

它把失败分为 Node、operator、Java、mini-kv、cross-project cleanup 五类，并要求每类都必须归档。它解决的是“失败时怎么停、谁负责、是否需要证据”的问题。

### v2081 operator worksheet

文件：

```text
src/services/productionShardExecutionOperatorWindowWorksheet.ts
```

它把矩阵变成操作者工作表：先锁 digest，再确认批准缺口和 owner lifecycle，再记录只读 probe outcome，最后记录 cleanup proof。它解决的是“人执行前按什么顺序检查”的问题。

### v2082 candidate archive verification

文件：

```text
src/services/productionShardExecutionCandidateArchiveVerification.ts
```

它把 v2078-v2081 四个 profile 放到同一 digest span 中校验，确认顺序、digest、ready 和 production-disabled 边界。它解决的是“这些候选阶段能否一起作为 closeout 来源”的问题。

### v2083 closeout

文件：

```text
src/services/productionShardExecutionCloseout.ts
```

它关闭 v2078-v2083 批次，并把下一批真正 blocker 命名为：签名生产执行批准、managed audit 生产存储、Java/mini-kv owner receipts。它解决的是“下一步不要继续内部治理，要转向真实外部证据”的问题。

## 访问控制

新 route 前缀加入：

```text
src/services/accessPolicyProfile.ts
```

新增 pattern：

```text
/api/v1/audit/production-shard-execution-*
```

这让新报告继续走 audit-read 策略，需要 auditor/admin 角色；不是绕过访问控制。

## 测试

新增测试：

```text
test/productionShardExecutionReadiness.test.ts
```

覆盖两层：

1. 直接加载六个 profile，确认版本顺序为 v2078-v2083，全部 ready for next stage，同时全部保持 `readyForProductionShardExecution=false` 和 `executionAllowed=false`。
2. 通过 Fastify route 测 JSON/Markdown，确认新 route group 接入 audit catalog。

同时更新：

```text
test/accessPolicyProfile.test.ts
```

锁住新 audit path pattern，防止后续 route 因访问策略漏配而变成 403。

## 本批次的工程意义

v2078-v2083 没有用小版本凑数量，而是把生产级分片执行前置链从“旧证据存在”推进到“当前主线有候选合同、失败矩阵、操作者工作表、候选归档校验和 closeout”。它仍然不是生产执行，但已经把下一步需要的真实外部证据暴露得很清楚。
