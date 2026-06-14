# v2142 renderer consolidation batch 25 / sandbox-endpoint credential-resolver 上游回声校验三连迁移

## Goal and Non-goal / 目标与非目标

本版（v2142，批次 25）继续 N1 渲染器整合工作，把三个仍然手写「标题 + 元信息块 + 多个
`##` 小节」的 managed-audit「sandbox endpoint credential resolver upstream echo
verification」系列渲染器迁移到共享 `verificationReportBuilder`。这三个文件分别对应
upstream echo verification（基础上游回声校验）、disabled precheck upstream echo
verification（禁用预检上游回声校验）、test-only shell upstream echo verification
（仅测试外壳上游回声校验）。目标与前 23 批完全一致：消除重复样板、把模板收敛到单一
builder、并以逐字节相同（byte-identical）作为不可逾越的硬约束。非目标同样明确——不改变
任何运行时行为、不改动证据结构与 schema、不新增或修改路由、不改变上游探针/动作的启动
语义、不触碰鉴权与访问守卫配置。本版不新增任何 helper、不新增链路、不新增文件，因此
`governanceGrowthRatchet` 的 service/route 计数维持不变（迁移是「改写」而非「新增」）。

## Why This Batch / 为何选这三个

在批次 25 启动前，我对仍未迁移的 `*Renderer.ts` 做了一次完整的形态普查：剩余 115 个
未迁移渲染器中，9 个含 `for` 循环、50 个含 `### ` 三级标题小节、26 个含 `.map(`、32 个
含 `.flatMap(`——这些都超出当前 builder 能逐字节表达的范围，必须留待后续引入 `lines`
小节格式化器或专门的嵌套小节支持后再处理。普查结果显示「纯标准形态（无 for / 无 h3 /
无 map/flatMap）且拥有对应测试」的渲染器，恰好只剩这三个。换言之，本批是「纯标准且有
测试」这一最安全子集里的最后三个成员。把它们清空后，后续批次将被迫进入需要更复杂格式化
能力或需要先补测的领域，我已在收尾里明确标注这一拐点，避免下一批盲目地以高风险方式迁移。

## Entry Points / 入口

三个导出函数的函数名、签名、所在文件名均保持不变，因此路由层与服务层的所有导入都无需
改动，barrel（`...UpstreamEchoVerification.js` 等稳定入口）继续重新导出同名函数：

- `renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown`
- `renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown`
- `renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown`

每个 barrel 还对外暴露对应的 `loadXxx` 加载器与 `renderXxxMarkdown` 渲染器，并各自附带
一条「稳定入口与拆分后的 core/renderer 模块保持一致」的对齐断言测试，本版同样保持其通过。

## Response Model / 响应模型

迁移仅把函数体从「数组字面量 + `join("\n")`」改写为一次
`renderVerificationReportMarkdown({ title, meta, sections })` 调用。映射规则与既有 recipe
完全一致：首行 `# 标题` 去掉 `# ` 前缀后成为 `title`；每条 `- Label: value` 元信息行
映射为 `meta` 数组中的一个 `[label, value]` 二元组；`## H` 后接 `...renderEntries(x)`
映射为 `{ heading: "H", entries: x }`；`...renderMessages(x, "空文案")` 映射为
`{ heading, messages: x, emptyText }`；`...renderList(x, "空文案")` 映射为
`{ heading, list: x, emptyText }`。builder 内部对标题与元信息之间、各小节之间的空行，以及
结尾换行的处理，与原手写数组逐字节一致——这一点已由批次 1 的参考渲染器证明，并在随后
每一批中被既有测试持续复核。

## Upstream Evidence and Config / 上游证据与配置

这三个报告分别描述：sandbox endpoint credential resolver 的基础上游回声校验、其禁用预检
变体、以及其仅测试外壳变体。它们均为只读治理快照，呈现 Node 源版本（v260 / v262 / v264）
与 Java（v105 / v106 / v107，外加 test-only 变体的 v109 优化上下文）、mini-kv（v114 /
v115 / v116 非参与回执）之间的回声对齐关系。三者都不读取真实上游、不发起任何网络请求；
诸如 `readyForManagedAuditSandboxAdapterConnection`、`credentialResolverExecutionAllowed`
等布尔位继续如实呈现「尚未连接真实沙箱、尚未解析真实凭据」的生产边界。本版不触碰任何
客户端、开关或环境变量解析逻辑。

## Service Flow / 服务流程

渲染器是纯函数：传入由对应 `loadXxx` 加载器构造的 profile，返回 Markdown 字符串。共享
builder 统一负责小节间空行、标题与元信息块之间的空行、以及结尾换行三类格式细节。把这些
细节集中到一处，意味着任何未来对报告骨架格式的统一调整都只需改 builder 一处，而不必逐个
触碰上百个渲染器——这正是 N1 整合的长期收益。

## Safety Boundary / 安全边界

严格遵守 byte-identical：所有字符串字面量（标题、`## 小节标题`、空文案）逐字照搬，未做
任何「顺便修正」。这三个渲染器的标题都是字面量字符串（非动态 `profile.title`），故直接
作为 `title` 字面量传入。其中 disabled precheck 与 test-only shell 两个渲染器原本就向
`renderEntries` 传入手工组装的内联对象字面量（从 `upstreamEchoes.javaV106` /
`miniKvV115`、`sourceNodeV264` / `javaV107` / `miniKvV116` 等子结构中挑选字段并显式列出
键），本版把这些内联对象原封不动地作为 `entries: { ... }` 保留，字段顺序、键名、取值
表达式一字不改。基础 upstream 渲染器则直接传入完整子对象（`profile.sourceNodeV260`、
`profile.upstreamEchoes.javaV105` 等），与原写法一致。

## Test Coverage / 测试覆盖

三个渲染器各自的既有测试在不修改任何断言的前提下全部通过，加上治理增长 ratchet，共 4 个
测试文件、17 个用例全绿（`npx vitest run` 直跑）。需要说明的是：与前几批不同，这三个测试
对 Markdown 的断言是 `toContain`（断言关键标题/状态串存在）而非整串相等，因此单凭测试
通过尚不足以构成逐字节相同的完整证明。为补足这一点，我额外做了一次直接的「渲染前后字节
对比」：在编辑前用一个一次性 vitest harness 渲染三个报告并落盘，编辑后再渲染一次并 `diff`，
结果三个报告的全部差异都仅落在 `- Generated at:` 这一行（该行取自运行时的
`profile.generatedAt`，两次渲染之间时间推移导致 ISO 时间戳不同，行格式本身完全一致），其余
每一行——包括两段内联对象 entries 展开后的全部条目——逐字节相同。对比完成后，该一次性
harness 与 `.tmp/` 落盘文件已全部删除，未进入提交。

## Maintenance Decision / 维护决策

本批刻意只在「纯标准形态且有对应测试」子集内选取，并且把该子集清空。普查已确认：剩余
未迁移渲染器无一属于该子集——它们或含 `for` 循环、或含 `### ` 三级小节、或含
`.map`/`.flatMap` 动态拼装。controlled-shard-preview 的 `...ProfileSection` 系列依旧缺少
对应渲染器测试，按 playbook 不在批次内为其补测。下一批必须先做一个方向决策（见下「下一轮
扫描策略」），不能再沿用「随手挑一个标准渲染器」的低风险路径。

## File Decisions / 文件级决策

- UpstreamEchoVerification（基础，原 68 行）：无内联对象，6 条元信息 + 11 个小节（Source
  Node v260、Java v105 Echo、mini-kv v114 Non-Participation、Echo Verification、Checks、
  Summary、Production Blockers、Warnings、Recommendations、Evidence Endpoints、Next Actions）。
- DisabledPrecheckUpstreamEchoVerification（原 94 行）：含两段内联对象 entries（Java v106
  Echo 的 13 字段、mini-kv v115 Non-Participation 的 11 字段），原样保留为 `entries: { ... }`。
- TestOnlyShellUpstreamEchoVerification（原 108 行）：含三段内联对象 entries（Source Node
  v264 的 11 字段、Java v107 Echo 的 12 字段、mini-kv v116 Non-Participation 的 10 字段），
  另有一个 Java v109 Optimization Context 小节直接传完整子对象。

## Verification Meaning / 验证含义

`npm run typecheck` 通过，说明 builder 调用的 `meta`/`sections` 结构与三个 profile 的字段
类型完全匹配（含每一段内联对象里逐字段的类型）；17 个用例通过说明对外可见的报告内容未变；
ratchet 通过说明 service/route 文件数未增长；独立的渲染前后 `diff` 仅余时间戳行，构成
逐字节相同的直接证明。四条证据相互独立、相互印证。

## Production Boundary / 生产边界

不改变任何生产边界：不启用上游探针或动作、不更改鉴权、不改写证据 schema、不连接真实
沙箱、不解析真实凭据。三个报告继续如实标注其只读、非执行的治理快照性质。

## Cross-project Position / 跨项目位置

本版仅改动 Node 渲染器内部实现与归档文档，不影响 Java / mini-kv 的契约、回执格式或集成
启动，因此与另外两个项目的推进完全解耦，可并行进行。

## Next Scan Strategy / 下一轮扫描策略

「纯标准且有测试」子集已清空，下一批（v2143/批次 26）面临一个方向选择，需要先决策再动手：
（A）为 controlled-shard-preview 的 `...ProfileSection` 等缺测试渲染器先补一组快照测试，
再迁移；（B）在 builder 中确认/扩展 `lines` 小节的使用方式，开始啃含 `### ` 三级小节或
含 `for`/`.map` 动态拼装的渲染器，并为每个迁移配套字节对比。无论选哪条，单批规模都会比
本批更重、风险更高，因此应当显式向用户确认方向，而非默认继续。

## Regression Risks / 回归风险

本批主要风险是空行/空文案/小节顺序偏差，以及内联对象字段顺序被无意打乱。前者由 builder
统一格式化消除，后者由「逐字段照搬 + 渲染前后字节对比」双重拦截。由于三个标题均为字面量，
不存在前两批出现过的「动态标题误写为字面量」风险。

## Closeout Standard / 收尾标准

含本中文讲解、`d/2142/` 证据（summary.json + 解释 md）、CHANGELOG 条目、两张 playbook
进度表更新（v2114-codex-migration-playbook 与 production-excellence-node-playbook 的 N1
行），提交并打标签 v2142，单次提交改动量远低于 3000 行。

## One-sentence Summary / 一句话总结

本版把 sandbox-endpoint credential-resolver 上游回声校验系列的最后三个纯标准形态渲染器
（含三段/两段内联对象 entries）收敛到共享 builder，净减约 93 行，输出经直接字节对比确认
逐字节不变（仅时间戳行随运行时变化），不新增任何 helper、链路或文件，并清空了「纯标准且
有测试」子集、标记出下一批的方向决策拐点。
