# Node v2096：外部 artifact conflict taxonomy

## 目标与背景

把 artifact 进入 Node 前可能出现的矛盾归类，避免未来遇到重复批准、过期 digest、owner scope 不匹配、store owner 不一致或 cleanup 缺失时只能临时解释。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

## 代码入口

- `src/services/productionShardExecutionExternalArtifactConflictTaxonomy.ts`
- `src/services/productionShardExecutionExternalArtifactProvenancePreflight.ts`
- `src/services/productionShardExecutionReadinessBuilder.ts`
- `test/productionShardExecutionReadiness.test.ts`
- `docs/plans3/v2096-production-shard-execution-external-artifact-conflict-taxonomy-roadmap.md`
- `e/2096/evidence/production-shard-execution-external-artifact-conflict-taxonomy-v2096-http.json`
- `f/2096/解释/production-shard-execution-external-artifact-conflict-taxonomy-v2096.md`

这些路径共同构成本版的代码入口和归档入口。读代码时应先看 service 文件，再看 route 或 test 文件，最后看 docs、e、f 的归档材料。这样阅读顺序能把实现、验证和交付材料串起来。

## 响应模型

响应模型的核心是 externalArtifactConflictTaxonomy，包含 conflictClasses、defaultConflictAction=quarantine-and-block-production、realArtifactPayloadAccepted=false。五类 conflict 是以后真实 artifact intake 的强制分支，不是现在的生产授权。

响应模型不是为了展示字段数量，而是为了让后续版本知道哪些字段可以稳定消费，哪些字段只是 human explanation。对于质量门版本，profileVersion、checks、summary、blockers 和 qualityDigest 是机器可消费部分；对于 production shard execution 版本，stagePayload、sources、productionBlockers 和 safety 是核心。

## 执行流程

loadProductionShardExecutionExternalArtifactConflictTaxonomy 消费 v2095 provenance preflight。它把 CONFLICT_CLASSES 写成稳定数组，用 satisfiedControl 说明冲突类已命名且默认阻断生产，再通过 checks 逐项验证 duplicate、stale、scope mismatch、store owner mismatch、cleanup missing 都在场。

从维护角度看，这种拆法的价值在于职责边界清楚：上游来源由 source 或 scanner 提供，规则判断集中在 evaluator 或 checks，报告汇总交给 gate 或 builder，Markdown 渲染只负责展示。后续如果要调整底线，可以优先改规则或常量，不必重写路由和归档脚本。

## 安全边界

本版没有打开生产执行。关键边界保持为 executionAllowed=false、readyForProductionOperations=false、startsJavaService=false、startsMiniKvService=false。涉及 production shard execution 的说明还必须保留 productionAuthority=false；涉及 f-folder quality 的说明则必须避免把质量门说成审批门。

这条边界也适用于文档本身：讲解可以说明真实 artifact、owner receipt、managed audit store、CI smoke，但不能把尚未发生的真实批准写成已经发生。任何真实执行、真实签名、真实存储绑定都需要外部证据，不能由 Node 自己生成。

## 验证

本批验证覆盖 focused Vitest、route catalog、typecheck、build、HTTP smoke 和 CI。关键测试包括 `test/fFolderExplanationQualityRules.test.ts`、`test/fFolderExplanationQualityGate.test.ts`、`test/auditManagedAuditRouteQualityRoutes.test.ts`、`test/auditJsonMarkdownRouteCatalogSummary.test.ts`、`test/codeWalkthroughDocumentationQualityGate.test.ts`。归档证据写入 `e/2096/evidence`，人类讲解写入 `f/2096/解释`。

## 下一步与停止条件

下一步是 v2097 quarantine envelope。停止条件是：除非真实 provider 引入新的矛盾模式，否则不要继续增加 conflict class；分类已经足够支持下一步 quarantine。

本版完成后，后续版本如果继续写 f 目录讲解，必须满足同一套底线：中文内容足够长，章节完整，引用真实代码路径，说明验证方式，写清安全边界。没有实际代码路径值得讲时，应该不写讲解；如果写了，就要让维护者读完后真正能接手。
