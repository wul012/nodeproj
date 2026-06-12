# Node v2099-v2103 code walkthrough：f 目录中文讲解质量门

## Goal and Non-goal / 目标与非目标

目标是把用户指出的“代码讲解篇幅太短”变成可执行的工程质量门：只要 f 目录下存在新讲解，就必须是中文、足够长、章节完整、引用真实代码路径，并且不能误称生产授权。非目标是打开生产执行、连接 managed audit、启动 Java 或 mini-kv、读取凭据值、导入真实外部 artifact payload。

这批不是继续扩展 production shard execution 的 Node-only preflight，而是对讲解与归档质量做维护治理。这样既回应“篇幅至少两倍”的要求，也避免违反 v2098 写下的停止条件：没有 verified real external artifact 时，不继续伪造 artifact intake 层。

## Entry Points / 入口

- `src/services/fFolderExplanationQualityTypes.ts` 定义 f 目录讲解质量的 profile、scan、evaluation、summary 和 message 类型。
- `src/services/fFolderExplanationQualityScanner.ts` 读取 `f/<version>/解释`，收集版本摘要和 Markdown 文本。
- `src/services/fFolderExplanationQualityRules.ts` 评价字节数、中文字符数、代码路径密度、必需章节、占位符和禁止声明。
- `src/services/fFolderExplanationQualityGate.ts` 汇总扫描结果，输出 JSON/Markdown 质量门。
- `src/routes/auditManagedAuditRouteQualityRoutes.ts` 注册 `/api/v1/audit/f-folder-explanation-quality-gate`。
- `test/fFolderExplanationQualityRules.test.ts`、`test/fFolderExplanationQualityGate.test.ts` 和 `test/auditManagedAuditRouteQualityRoutes.test.ts` 覆盖规则、route 和 catalog。

## Profile Response Model / 响应模型

响应模型是 `FFolderExplanationQualityProfile`。它保留 service、title、generatedAt、profileVersion、qualityGateState、readyForFFolderExplanationQualityGate、readOnlyQualityGate、executionAllowed、connectsManagedAudit、startsJavaService、startsMiniKvService、mutatesJavaState、mutatesMiniKvState。scanScope 写明 root=f、explanationDirName=解释、imageDirName=图片、enforcementFloorVersion=2094、activeNodeVersionRange=Node v2094-v2103、minBytes=3600、minChineseCharacters=900、minCodePathReferences=4。

checks 是机器门槛，summary 是可读计数，enforcedExplanations 列出每篇文档的 byteLength、chineseCharacterCount、codePathReferences、missingRequiredSections、complianceScore。blockers 用来解释失败原因，qualityDigest 让归档和 CI 可以比较同一批扫描结果。

## Upstream Evidence and Config / 上游证据与配置

这批只读取本地仓库文件：`f/2094/解释` 到 `f/2103/解释`、`docs/code-walkthrough-documentation-standard.md`、`docs/plans3/v2099-f-folder-explanation-quality-type-contract-roadmap.md` 到 `docs/plans3/v2103-f-folder-explanation-expansion-closeout-roadmap.md`。它不消费 Java 或 mini-kv 的实时服务，不需要历史 fixture fallback，不读取密钥或 endpoint。Java 和 mini-kv 可以继续并行做 owner receipt，不需要等待本质量门。

## Service Flow / 服务流程

请求进入 `/api/v1/audit/f-folder-explanation-quality-gate` 后，route 调用 `loadFFolderExplanationQualityGate`。gate 调用 `scanFFolderExplanations`，scanner 先收集数字版本目录，再读取 `解释` 目录下的 Markdown，随后交给 `evaluateFFolderExplanationDocument`。rules 层计算长度、中文字符数、代码路径引用、章节缺失和 forbidden claim。gate 根据这些 evaluation 分出 short、shallowChinese、missingRequiredShape、lowCodePathDensity、placeholder、forbiddenExecutionClaims，并生成 checks、summary、blockers 和 qualityDigest。Markdown renderer 只负责展示，不改变结果。

## Safety Boundary / 安全边界

这是只读质量门。executionAllowed=false，readyForProductionOperations=false，connectsManagedAudit=false，startsJavaService=false，startsMiniKvService=false，mutatesJavaState=false，mutatesMiniKvState=false。规则还会阻断讲解中的 forbidden claim，例如把 productionAuthority、readyForProductionShardExecution 或 readyForProductionOperations 写成开启状态。这样可以保证文档不会把 preflight、quality gate 或 dry-run 误写成生产批准。

## Test Coverage / 测试覆盖

focused 测试包括 `test/fFolderExplanationQualityRules.test.ts`、`test/fFolderExplanationQualityGate.test.ts`、`test/auditManagedAuditRouteQualityRoutes.test.ts`、`test/auditJsonMarkdownRouteCatalogSummary.test.ts`、`test/auditJsonMarkdownRouteGroups.test.ts`、`test/codeWalkthroughDocumentationQualityGate.test.ts`。最终还需要 `npm run typecheck`、`npm run build`、HTTP smoke 和 GitHub Actions。归档写入 `e/2099/evidence` 到 `e/2103/evidence`，讲解写入 `f/2099/解释` 到 `f/2103/解释`。

## One-Sentence Summary / 一句话总结

Node v2099-v2103 把“有讲解就必须够厚、够中文、够可维护”从人工提醒升级为只读质量门，并用加厚后的 f 目录讲解证明规则已经生效。
