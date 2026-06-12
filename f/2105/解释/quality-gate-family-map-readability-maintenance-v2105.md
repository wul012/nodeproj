# Node v2105：quality gate 命名族地图保养

## 目标与非目标

目标是落实四项目可读性保养建议中 Node 控制面的后期保养要求。新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 非目标是启动 Java、启动 mini-kv、连接真实 managed audit、写入生产数据、读取凭据值或把 preflight 说成 production execution。本版仍然是 read-only 控制面保养，executionAllowed=false，readyForProductionOperations=false。

## 入口

- `docs/architecture/quality-gates-map.md`
- `src/services/codeWalkthroughDocumentationQualityGate.ts`
- `src/services/fFolderExplanationQualityGate.ts`
- `src/services/readabilityMaintenanceProfile.ts`

## 响应模型

本批次的响应模型集中在 readability maintenance profile：profileVersion 使用 readability-maintenance-profile.v1，maintenanceState 表示地图和质量门是否齐备，checks 表示 architectureDocumentsPresent、qualityGateFamilyDocumented、routeCatalogCountsAligned、upstreamActionsStillDisabled 等检查，summary 表示文档数量、通过数量、缺失 phrase 数量和 blocker 数量。对于 f 目录解释质量门，activeNodeVersionRange 已推进到 Node v2094-v2108；对于代码讲解质量门，activeNodeVersionRange 已推进到 Node v2058-v2108。

## 服务流程

服务流程从 docs/architecture 的地图文档开始。控制面地图解释 Node 的 route 与质量门边界，quality gate 地图解释 Types、Rules、Scanner、Gate 的命名族，evidence flow 地图解释本地文档、f 目录、代码讲解、route catalog、historical fixture 和 HTTP smoke 的关系，route-service-test 对照表把 route、service、test 三者绑定，f-folder 标准收口说明什么时候应该继续用现有规则而不是新增规则。最后 src/services/readabilityMaintenanceProfile.ts 读取这些文件，检查必要 phrase，汇总 route catalog 计数，并通过 audit route 输出 JSON/Markdown。

## 安全边界

本版只读。它不会启动 sibling service，不会访问外部网络，不会读取生产凭据，不会写 Java 或 mini-kv 状态，不会把质量门通过解释为真实批准。Java 和 mini-kv 可以继续并行推进自己的保养建议；Node 本版没有要求它们提供 fresh evidence。aiproj 当前有命名止血相关未提交变更，但本版只读观察，不修改 aiproj。

## 验证

focused 验证覆盖 test/readabilityMaintenanceProfile.test.ts、test/auditManagedAuditRouteQualityRoutes.test.ts、test/auditJsonMarkdownRouteCatalogSummary.test.ts、test/auditJsonMarkdownRouteCatalogIntegrity.test.ts。后续收尾还要跑 fFolderExplanationQualityGate、codeWalkthroughDocumentationQualityGate、typecheck、build 和 HTTP smoke。验证重点不是证明生产执行可用，而是证明文档入口、route 注册、catalog 计数、JSON/Markdown 输出和只读边界全部一致。

## 详细说明

1. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

2. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

3. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

4. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

5. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

6. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

7. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

8. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

9. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

10. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

11. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

12. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

13. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

14. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

15. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

16. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

17. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

18. Node v2105：quality gate 命名族地图保养。这一段说明本版的真实工程重量：新增 docs/architecture/quality-gates-map.md，把 code walkthrough、f-folder explanation、readability maintenance 三组门禁放在同一命名族规则下。 这不是为了增加一个漂亮文档名，而是为了降低后期读者在 route、service、test、evidence、解释材料之间来回跳转的成本。本版涉及 `docs/architecture/quality-gates-map.md`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`、`src/services/readabilityMaintenanceProfile.ts`，每个文件都有明确职责。文档负责建立入口，service 或 route 负责把入口纳入可验证 profile，测试负责防止后续维护时把只读边界、route catalog 计数或质量门命名族改坏。维护者以后看到这个版本，应该先理解它解决的是“阅读路径不稳定”的问题，而不是业务执行能力不足的问题。

## 下一步

下一版把 route、service、test 做成对照表，避免 route catalog 继续增长后只能靠搜索理解。 如果后续版本写不出足够具体的中文讲解，说明版本切片太薄，应增加真实工程内容、拆分重构深度或验证覆盖，而不是硬凑文字。
