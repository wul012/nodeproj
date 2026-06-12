# Node v2110 section 指标投影到质量门 Roadmap

## 目标

把 h2SectionCount、scannableH2SectionCount、largestH2SectionHeading 和 largestH2SectionChineseCharacters 投影到两类文档评价和 gate summary。

## 并行关系

Java / mini-kv：recommended parallel。Node 本版只处理本地讲解可读性、route catalog 和 evidence 归档，不要求 sibling 项目提供 fresh evidence，也不是它们推进的预审批 blocker。

aiproj：read-only observed。本版不修改 aiproj。

## 必要性证明

- blocker：上一轮反馈指出 Detailed Walkthrough 大桶和凑字数会降低可读性。
- 消费者：f-folder quality gate、code walkthrough quality gate、readability maintenance profile、route catalog 和 v2113 evidence 会消费本版结果。
- 复用理由：优先复用现有 f/code 质量门和 shared audit JSON/Markdown route registrar，不新增执行链。
- 停止条件：重复段落计数为 0，过大详细章节计数为 0，route/access/catalog 对齐，focused tests、typecheck、build 和 HTTP evidence 通过。

## 计划

1. 更新代码入口：`src/services/codeWalkthroughDocumentationQualityTypes.ts`、`src/services/fFolderExplanationQualityTypes.ts`、`src/services/codeWalkthroughDocumentationQualityGate.ts`、`src/services/fFolderExplanationQualityGate.ts`。
2. 更新测试入口，覆盖 JSON、Markdown、access guard 和 catalog 计数。
3. 写入 f 目录中文解释和代码讲解记录，避免大桶 Detailed Walkthrough。
4. 写入 evidence，记录本版的只读验证结果。
5. 收尾时删除 dist 和临时文件，不保留本地后台进程。
