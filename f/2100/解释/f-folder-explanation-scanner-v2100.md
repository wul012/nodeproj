# Node v2100：f 目录讲解扫描器

## 目标与背景

读取 f/<version>/解释 下的 Markdown，收集版本、文件名、标题、字节数、行数、目录对齐状态，同时发现空图片目录。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

维护者阅读这份讲解时，应该能够知道本版为什么存在、入口文件从哪里开始、响应模型有哪些稳定字段、执行流程如何把来源证据变成报告、哪些安全边界仍然关闭、验证命令覆盖了哪些风险，以及下一版在什么条件下才能继续。这里强调中文说明的原因是，归档材料主要用于人工交接，短句式摘要无法替代代码路径解释，也无法帮助后来的人判断是否可以删除、合并或扩展某个模块。

## 代码入口

- `src/services/fFolderExplanationQualityScanner.ts`
- `src/services/fFolderExplanationQualityRules.ts`
- `src/services/fFolderExplanationQualityTypes.ts`
- `test/fFolderExplanationQualityGate.test.ts`
- `docs/plans3/v2100-f-folder-explanation-scanner-roadmap.md`
- `e/2100/evidence/f-folder-explanation-scanner-v2100-summary.json`
- `f/2100/解释/f-folder-explanation-scanner-v2100.md`

这些路径共同构成本版的代码入口和归档入口。读代码时应先看 service 文件，再看 route 或 test 文件，最后看 docs、e、f 的归档材料。这样阅读顺序能把实现、验证和交付材料串起来。

## 响应模型

扫描结果是 FFolderExplanationQualityScan，包括 projectRoot、fRoot、rootExists、versionSummaries 和 documents。versionSummaries 记录 explanationDirExists、explanationMarkdownCount、imageDirExists、imageFileCount。

响应模型不是为了展示字段数量，而是为了让后续版本知道哪些字段可以稳定消费，哪些字段只是 human explanation。对于质量门版本，profileVersion、checks、summary、blockers 和 qualityDigest 是机器可消费部分；对于 production shard execution 版本，stagePayload、sources、productionBlockers 和 safety 是核心。

## 执行流程

scanFFolderExplanations 从 f 根目录读取数字版本目录，collectVersionSummaries 先形成版本摘要，collectExplanationDocuments 再递归读取 Markdown。每个文档交给 evaluateFFolderExplanationDocument。扫描器不决定是否合格，只提供事实。

从维护角度看，这种拆法的价值在于职责边界清楚：上游来源由 source 或 scanner 提供，规则判断集中在 evaluator 或 checks，报告汇总交给 gate 或 builder，Markdown 渲染只负责展示。后续如果要调整底线，可以优先改规则或常量，不必重写路由和归档脚本。

## 安全边界

本版没有打开生产执行。关键边界保持为 executionAllowed=false、readyForProductionOperations=false、startsJavaService=false、startsMiniKvService=false。涉及 production shard execution 的说明还必须保留 productionAuthority=false；涉及 f-folder quality 的说明则必须避免把质量门说成审批门。

这条边界也适用于文档本身：讲解可以说明真实 artifact、owner receipt、managed audit store、CI smoke，但不能把尚未发生的真实批准写成已经发生。任何真实执行、真实签名、真实存储绑定都需要外部证据，不能由 Node 自己生成。

## 验证

本批验证覆盖 focused Vitest、route catalog、typecheck、build、HTTP smoke 和 CI。关键测试包括 `test/fFolderExplanationQualityRules.test.ts`、`test/fFolderExplanationQualityGate.test.ts`、`test/auditManagedAuditRouteQualityRoutes.test.ts`、`test/auditJsonMarkdownRouteCatalogSummary.test.ts`、`test/codeWalkthroughDocumentationQualityGate.test.ts`。归档证据写入 `e/2100/evidence`，人类讲解写入 `f/2100/解释`。

## 下一步与停止条件

下一步是 v2101 rule evaluator。停止条件是：scanner 只处理布局和文本读取，不加入主观规则；否则后续维护会同时碰文件系统和质量判断。

本版完成后，后续版本如果继续写 f 目录讲解，必须满足同一套底线：中文内容足够长，章节完整，引用真实代码路径，说明验证方式，写清安全边界。没有实际代码路径值得讲时，应该不写讲解；如果写了，就要让维护者读完后真正能接手。
