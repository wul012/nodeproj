# Node v2094-v2098：真实 artifact intake preflight 批次代码讲解

## 目标与背景

这份批次讲解补足 v2094-v2098 的整体阅读路径。单版讲解说明每一层做了什么，批次讲解说明为什么这五层必须按顺序出现：先关闭真实 artifact intake switch，再定义 provenance，再定义 conflict taxonomy，再定义 quarantine envelope，最后 closeout。这个顺序保证 Node 不会在没有真实外部 artifact、没有 owner digest、没有冲突处理、没有隔离策略时提前接收或授权任何载荷。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

## 代码入口

- `src/services/productionShardExecutionRealArtifactIntakeReadinessSwitch.ts`
- `src/services/productionShardExecutionExternalArtifactProvenancePreflight.ts`
- `src/services/productionShardExecutionExternalArtifactConflictTaxonomy.ts`
- `src/services/productionShardExecutionExternalArtifactQuarantineEnvelope.ts`
- `src/services/productionShardExecutionRealArtifactIntakePreflightCloseout.ts`
- `test/productionShardExecutionReadiness.test.ts`
- `e/2098/evidence/production-shard-execution-real-artifact-intake-preflight-closeout-v2098-http.json`
- `f/2098/解释/production-shard-execution-real-artifact-preflight-batch-v2094-v2098-code-explanation.md`

## 响应模型

五个版本都复用 ProductionShardExecutionReadinessProfile。核心字段包括 profileVersion、stage、sources、controls、stagePayload、checks、summary、productionBlockers、warnings、recommendations 和 evidenceEndpoints。每一版都让 readyForNextStage=true，但 readyForProductionShardExecution=false。这个组合表示本阶段材料完整，但生产执行仍然被 signed approval、managed audit production store、rollback owner confirmation 三个 blocker 挡住。

## 执行流程

v2094 消费 v2093 dry-run closeout，建立关闭状态的真实 artifact intake switch。v2095 消费 v2094，列出 provenance metadata。v2096 消费 v2095，列出 conflict classes。v2097 消费 v2096，列出 quarantine steps。v2098 同时加载 v2094-v2097，检查来源顺序、digest、checkCount 和 production block 状态。公共 digest、summary、安全边界由 `src/services/productionShardExecutionReadinessBuilder.ts` 处理，Markdown 输出由 `src/services/productionShardExecutionReadinessRenderer.ts` 处理，路由只在 `src/routes/auditProductionShardExecutionRoutes.ts` 注册。

## 安全边界

全批保持 executionAllowed=false、readyForProductionOperations=false、startsJavaService=false、startsMiniKvService=false、mutatesJavaState=false、mutatesMiniKvState=false。v2094-v2098 不读取凭据值，不连接 managed audit 生产存储，不保存真实 artifact payload，不把 synthetic fixture 当作生产批准。

## 验证

验证包括 `test/productionShardExecutionReadiness.test.ts`、route catalog tests、typecheck、build、HTTP smoke 和 CI。归档证据位于 `e/2094/evidence` 到 `e/2098/evidence`，人类说明位于 `f/2094/解释` 到 `f/2098/解释`。本次加厚后，这些讲解还会被 `src/services/fFolderExplanationQualityGate.ts` 检查中文篇幅和结构。

## 下一步与停止条件

停止条件是：不要继续添加 Node-only artifact-intake preflight，除非真实外部 artifact 出现。可以继续做维护质量、讲解质量、测试质量和拆分优化，但不能把这些治理工作包装成真实生产执行。
