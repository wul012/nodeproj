# v2143 renderer consolidation batch 26 / sandbox-endpoint handle 系列三连迁移 + v2142 普查口径更正

## Goal and Non-goal / 目标与非目标

本版（v2143，批次 26）继续 N1 渲染器整合，把三个仍手写「标题 + 元信息块 + 多个 `##`
小节」的 managed-audit 报告渲染器迁移到共享 `verificationReportBuilder`：sandbox endpoint
handle preflight review（端点句柄预检评审）、sandbox endpoint handle upstream echo
verification（端点句柄上游回声校验）、credential resolver approval-required implementation
readiness upstream echo verification（凭据解析器「需审批」实现就绪上游回声校验）。目标与前
25 批一致：消除重复样板、收敛模板、以逐字节相同为硬约束。非目标同样不变：不改运行时行为、
不改证据 schema、不增删路由、不改上游启动语义、不碰鉴权。本版不新增 helper、链路或文件，
ratchet 不变。

本版同时承担一项更正职责：纠正 v2142 收尾文档中「纯标准且有测试子集已清空」这一结论所
依据的普查口径错误（详见下「Census Correction」一节）。

## Census Correction / 普查口径更正（重要）

v2142 收尾时我声称「纯标准形态且有测试」的渲染器子集已被清空，剩余 112 个未迁移渲染器
「全部含 `for` / `### ` / `.map` / `.flatMap`」。该结论的**形态部分仍然成立**（for/h3/map
的桶计数是按文件内容统计的，准确），但**「有无测试」的判定有缺陷**：当时我用「渲染器文件
名（`...Renderer`）是否被某个测试文件引用」来判断是否有测试。问题在于——本仓库的报告
测试通常从**稳定入口 barrel**（如 `...PreflightReview.js`，同时导出 `loadXxx` 与
`renderXxxMarkdown`）导入，而**不**直接 import `...Renderer.js` 模块。因此凡是仅通过 barrel
被测试覆盖的渲染器，都被我误判为「无测试」。

实际核对发现：本批这三个渲染器，以及推迟的 MinimalShardReadinessLiveReadGate，**都各自拥有
262–367 行的成熟测试文件**（通过 barrel + `app.inject` 路由注入断言 Markdown，house style 为
`toContain`）。换言之，v2142 时该子集**并未清空**，至少还有这 4 个成员。本版改用「barrel/
报告 stem（去掉 `Renderer` 后缀）是否被测试引用」作为判定口径，重新普查，结论见下。

## Entry Points / 入口

三个导出函数名、签名、文件名不变，barrel 继续重新导出同名函数，路由/服务层导入零改动：

- `renderManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewMarkdown`
- `renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown`
- `renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown`

## Response Model / 响应模型

迁移仅把函数体从「数组字面量 + `join("\n")`」改写为一次
`renderVerificationReportMarkdown({ title, meta, sections })` 调用，映射规则与既有 recipe
完全一致（`# 标题` → `title`；`- Label: value` → `meta` 二元组；`## H` + `renderEntries(x)`
→ `{ heading, entries: x }`；`renderMessages` → `{ messages, emptyText }`；`renderList`
→ `{ list, emptyText }`）。三个标题均为字面量。

## Upstream Evidence and Config / 上游证据与配置

三个报告均为只读治理快照：端点句柄预检评审依赖 Node v257、端点句柄上游回声校验依赖 Node
v258 与 Java v104 / mini-kv v113、「需审批」实现就绪上游回声校验依赖 Node v281 与 Java v116
/ mini-kv v122。均不读取真实上游、不发起网络请求，`readyForManagedAuditSandboxAdapterConnection`
等布尔位继续如实呈现生产边界。本版不触碰任何客户端或开关。

## Safety Boundary / 安全边界

严格遵守 byte-identical：所有字符串字面量逐字照搬。第三个渲染器（ApprovalRequired）保留了
其文件本地的 `omitEvidenceArrays` helper——它在传入 entries 前剥离 `evidenceFiles` /
`expectedSnippets` 两个数组字段。迁移后该 helper 原样保留，并以
`entries: omitEvidenceArrays(profile.upstreamEchoes.javaV116)` 的形式传入，输出不变。

## Test Coverage / 测试覆盖

这三个报告各自既有的成熟测试（PreflightReview 262 行、HandleUpstreamEcho 341 行、
ApprovalRequired 291 行）在不修改任何断言的前提下全部通过，加治理增长 ratchet，共 4 个
测试文件、14 个用例全绿。由于这些测试对 Markdown 用 `toContain` 断言（house style，非整串
相等），我额外用一次性 harness 做了渲染前后字节对比：三个报告的全部差异都仅落在运行时
`- Generated at:` 时间戳行，其余逐字节相同（含 `omitEvidenceArrays` 输出）。对比 harness 与
`.tmp/` 落盘已删除，不入提交。本版**不新增测试文件**——这些报告本就有覆盖，Path A 设想中的
「补测缺测试渲染器」前提对它们并不成立。

## Maintenance Decision / 维护决策

按更正后的口径重新普查 109 个未迁移渲染器：纯标准且有测试的仅剩 1 个——异步的
MinimalShardReadinessLiveReadGate（其 loader 需要 `OrderPlatformClient` / `MiniKvClient`
且做 live-read，渲染器用本地 `renderLiveRead` helper 产出 Java / mini-kv 两段 live-read 列表，
属 `lines` 小节形态）；纯标准且**确无**测试的为 0。该渲染器已有 367 行测试，可作为下一批
（v2144）目标，迁移时用其既有测试 + 字节对比双重把关，`renderLiveRead` 映射为 `lines` 小节。

## File Decisions / 文件级决策

- SandboxEndpointHandlePreflightReview（原 60 行）：纯标准，6 元信息 + 9 小节。
- SandboxEndpointHandleUpstreamEchoVerification（原 68 行）：纯标准，6 元信息 + 11 小节。
- CredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification（原 77 行）：
  8 元信息 + 11 小节，保留 `omitEvidenceArrays` 本地 helper。

## Verification Meaning / 验证含义

`npm run typecheck` 通过说明三处 builder 调用与 profile 字段类型完全匹配（含 helper 返回的
`Omit<...>` 类型）；14 个用例通过说明对外报告内容未变；ratchet 通过说明文件数未增长；独立
字节对比仅余时间戳行，构成逐字节相同的直接证明。

## Production Boundary / 生产边界

不改变任何生产边界：不启用上游探针/动作、不更改鉴权、不改写证据 schema、不连接真实沙箱。

## Cross-project Position / 跨项目位置

仅改动 Node 渲染器内部与归档文档，不影响 Java / mini-kv 契约或集成启动，可并行推进。

## Next Scan Strategy / 下一轮扫描策略

下一批（v2144/批次 27）目标为最后一个纯标准且有测试的渲染器
MinimalShardReadinessLiveReadGate：需先在测试中构造 `OrderPlatformClient` / `MiniKvClient`
（探针默认关闭时 live-read 记为 not-attempted），把 `renderLiveRead` 的两段输出映射为 builder
的 `lines` 小节，并配套渲染前后字节对比。此后纯标准子集真正清空，再转入 h3 / map/flatMap
形态（需扩展 builder 或集中补测），届时应显式与用户确认方向。

## Regression Risks / 回归风险

主要风险为空行/空文案/小节顺序偏差与 helper 输出错配——均由既有测试 + 字节对比双重拦截。
三个标题均为字面量，无动态标题风险。

## Closeout Standard / 收尾标准

含本中文讲解、`d/2143/` 证据（summary.json + 解释 md，内含更正后的普查表）、CHANGELOG 条目
（含更正说明）、两张 playbook 进度表更新及 Deviations 更正记录，提交并打标签 v2143。

## One-sentence Summary / 一句话总结

本版把 sandbox-endpoint handle / approval-required 系列三个纯标准渲染器（其一保留
`omitEvidenceArrays` helper）收敛到共享 builder，净减约 99 行，输出经字节对比确认逐字节不变；
并更正了 v2142「纯标准有测试子集已空」这一基于缺陷测试口径的结论——真实仅剩 1 个（异步
live-read 渲染器），确无测试者为 0。
