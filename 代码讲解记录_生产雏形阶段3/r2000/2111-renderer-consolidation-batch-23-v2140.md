# v2140 renderer consolidation batch 23 / 受控只读与假传输家族标准报告收口

## Goal and Non-goal / 目标与非目标

本版（v2140，批次 23）继续 N1 渲染器整合：把五个仍然手写「标题 + 元信息块 + 多个
`##` 小节」骨架的报告渲染器迁移到共享的 `verificationReportBuilder`。目标是消除重复
的 Markdown 拼装样板、收敛到单一模板，并以「逐字节相同」为硬约束；非目标是改变任何
运行时行为、证据结构、路由或上游启动语义——本版只动渲染器内部，不新增任何 helper、
链路或文件。

迁移的五个渲染器全部属于 managed-audit / fake-transport 家族，且全部是「纯标准形态」
（meta 块之后只有 `## 标题` + `renderEntries` / `renderMessages` / `renderList` 小节，
没有 `for` 循环、没有 `### ` 三级标题、没有本地 helper 函数）。这与批次 22 不同：批次
22 的部署 / 身份渲染器含嵌套 h3 循环，必须以 `lines` 小节保留；本批次因此是迄今最干净
的一批，能够直接套用模板。

## Entry Points / 入口

五个被迁移的导出函数签名、函数名、文件名均保持不变，路由与服务层的导入无需改动：

- `renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateMarkdown`
- `renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionMarkdown`
- `renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMarkdown`
- `renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown`
- `renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeMarkdown`

## Response Model / 响应模型

每个渲染器的输入仍是各自的 `...Profile` 类型（类型导入保持不变）。迁移只是把函数体
从「数组字面量 + `join("\n")`」改写为对 `renderVerificationReportMarkdown({ title, meta,
sections })` 的单次调用。元信息行 `- Label: value` 映射为 `meta: [["Label", value], ...]`，
顺序逐条保留；`## H` + `...renderEntries(x)` 映射为 `{ heading: "H", entries: x }`，
`renderMessages(x, "空文案")` 映射为 `{ heading, messages: x, emptyText }`，
`renderList(x, "空文案")` 映射为 `{ heading, list: x, emptyText }`。

## Upstream Evidence and Config / 上游证据与配置

这些报告描述的是受控只读分片预览、最小只读集成的重跑 / 显式读窗门决策、假传输包上游
回声校验，以及 Java/mini-kv 运行时执行规范审批输入预检纳入等只读治理快照。它们不读取
真实上游、不发起网络请求，`executionAllowed` 等布尔位继续如实呈现 false 边界。本版不触
碰任何上游客户端或配置开关。

## Service Flow / 服务流程

渲染器是纯函数：传入 profile，返回 Markdown 字符串。共享 builder 负责统一插入小节之间
的空行、`# 标题` 与元信息块之间的空行，以及结尾换行。批次 1 的参考渲染器
（ApprovalRequiredBoundaryUpstreamEchoVerification）已证明该 builder 对相同结构产出逐字节
一致的结果，本批次沿用同一路径。

## Safety Boundary / 安全边界

迁移严格遵守 byte-identical 硬规则：所有字符串字面量（标题、标签、空文案）逐字照搬，不
改写、不重排、不「修正」。其中
`FakeTransportPacketUpstreamEchoVerification` 的三段空文案（blockers / warnings /
recommendations）较长且各不相同，已原样保留；
`JavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake` 的标题是动态的
`profile.title` 而非字面量，已映射为 `title: profile.title`，而非硬编码字符串。

## Test Coverage / 测试覆盖

五个渲染器各自的既有测试在不修改任何断言的前提下全部通过，加上治理增长 ratchet 测试，
共 6 个测试文件、18 个用例全绿。既有测试断言完整的 Markdown 输出，因此其通过本身即是
逐字节相同的证明（playbook 硬规则 1：既有测试即证据，绝不修改测试期望）。本批次未新增
测试，也未使用临时对比脚本。

## Maintenance Decision / 维护决策

选择本批五个文件的依据是「纯标准形态且有对应测试」。受控只读分片预览家族中仍有大量
含 `for` 循环、`### ` 三级条目的渲染器（如候选文档 intake packet / guard 列表），它们无法
用现有 builder 小节类型表达，本版按 playbook 要求跳过、留待后续以 `lines` 小节或新增的
嵌套小节格式化器处理。

## File Decisions / 文件级决策

- MinimalShardReadinessRegularGate：18 行元信息 + 8 个标准小节，直接映射。
- MinimalReadOnlyIntegrationRerunDecision：含两条超长 `readyFor...` 值，按参考样式换行。
- MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision：元信息最多（23 条），
  全部标准 entries/messages/list。
- FakeTransportPacketUpstreamEchoVerification：含 `upstreamEchoes.javaV103` /
  `upstreamEchoes.miniKvV112` 嵌套字段访问，作为 entries 传入即可。
- JavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake：动态标题，11 个小节。

## Verification Meaning / 验证含义

`npm run typecheck` 通过，说明 builder 调用的形参类型与各 profile 字段类型完全匹配；18 个
用例通过，说明输出未变；ratchet 通过，说明 service/route 文件数未增长（迁移是改写而非新增
文件）。

## Production Boundary / 生产边界

本版不改变任何生产边界：不启用上游探针/动作、不更改鉴权模式、不改写证据 schema。所有
报告继续呈现既有的只读 / 不可执行边界位。

## Cross-project Position / 跨项目位置

v2140 仅改动 Node 渲染器内部与归档文档，不影响 Java / mini-kv 的契约、鲜活证据要求或集成
启动行为，因此可与两者并行推进。

## Next Scan Strategy / 下一轮扫描策略

剩余约 135 个 `*Renderer.ts` + 约 158 个内联渲染服务文件待迁移。下一批应继续在「纯标准
形态且有测试」子集内推进；当受控只读分片预览家族的嵌套 h3 语法被证明反复出现时，再评估
是否值得为 builder 增加一个共享的嵌套小节格式化器（在此之前不新增 helper）。

## Regression Risks / 回归风险

主要风险是空行/空文案/顺序的细微偏差导致输出不一致——已由既有测试逐字节拦截。动态标题
渲染器若误写成字面量会回归，已确认映射为 `profile.title`。

## Closeout Standard / 收尾标准

按 AGENTS.md：本版含中文讲解（本文件）、`d/2140/` 证据（summary.json + 解释 md）、
CHANGELOG 条目、playbook 进度表更新、提交并打标签 v2140，单次提交改动远低于 3000 行。

## Review Notes / 审阅要点

审阅者可对任一迁移文件执行 `git show HEAD:<path>` 与当前版本对比，确认仅函数体改写、
字符串字面量未变；并确认 18 个用例与 ratchet 全绿、无测试期望被修改。

## One-sentence Summary / 一句话总结

本版把五个纯标准形态的 managed-audit/fake-transport 报告渲染器收敛到共享 builder，净减
约 105 行，输出逐字节不变，且不新增任何 helper、链路或文件。
