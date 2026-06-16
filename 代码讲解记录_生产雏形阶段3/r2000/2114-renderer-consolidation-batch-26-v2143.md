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

## v2145 Closeout Addendum / v2145 收尾补充说明

v2143 的特别价值不只是三份 renderer 被迁移，而是它主动修正了 v2142 的普查口径。此前用测试是否直接 import Renderer 模块判断覆盖情况，这个口径太窄，因为项目里的报告测试常通过稳定 barrel 导入 `loadXxx` 与 `renderXxxMarkdown`，并通过 route 注入或 profile 渲染间接覆盖 renderer。v2143 把检测口径改成 barrel/report stem，这个修正让计划不再误把成熟测试覆盖的 renderer 归为 testless。对后续推进来说，这比单纯减少行数更重要，因为错误的覆盖口径会直接影响版本切片：本该优先迁移的低风险文件会被跳过，本该补测试的文件也可能被误判。

本批三个 sandbox-endpoint handle 系列报告都保持了只读治理性质。它们围绕 endpoint handle preflight、upstream echo verification、approval-required implementation readiness 三个相邻面向，报告来源分别关联 Node 历史版本、Java/mini-kv 冻结证据和凭据解析器审批边界。迁移没有改变这些证据来源，只把 Markdown 框架收回 builder。尤其第三个 renderer 保留 `omitEvidenceArrays`，没有为了迁移而把 helper 拆掉或泛化，因为它只服务于该报告的条目裁剪：把 `evidenceFiles` 与 `expectedSnippets` 从 entries 展示中剥离，以维持原有报告形态。这个保留局部 helper 的选择说明 consolidation 不是强迫所有局部差异消失，而是把真正重复的框架收走。

v2145 对 v2143 文档的补充，是为了让读者区分两类工程动作：一类是 renderer 代码体改写，一类是普查方法纠偏。前者由 focused tests、ratchet 和字节对比兜底；后者则影响 playbook 下一步方向。如果后续继续基于错误普查推进，就会以为纯标准子集已经清空，从而过早进入 h3/map/flatMap 的复杂路线。v2143 的修正确认在 v2144 之前还剩一个 async live-read renderer，且它有成熟测试，可以安全作为最后一个纯标准/lines 混合样本处理。

## Closeout Reading Note / 收尾阅读提示

审阅 v2143 时不要只看净减少 99 行。更应确认三件事：第一，`omitEvidenceArrays` 仍在本地使用，说明报告语义没有被 builder 误吸收；第二，summary 中的 corrected census 清楚说明了 v2142 结论为何偏差，避免后续计划重复犯错；第三，验证说明包括 focused tests 与一次性字节对比，并明确临时 harness 已删除。v2145 重新补足说明后，这篇文档能承担纠偏版本的历史责任，而不是只作为普通迁移记录存在。

## Service Flow Detail / 服务流细节

v2143 的服务流从三个既有报告入口开始：preflight review、handle upstream echo verification、approval-required implementation readiness upstream echo verification。每个入口仍先由原服务装配 profile，再交给对应 renderer 输出 Markdown。renderer 迁移后，`renderVerificationReportMarkdown` 只接收已经决定好的 title、meta 与 sections；它不会重新查询 Java、mini-kv、历史 fixture，也不会改变 approval-required 的判断。`omitEvidenceArrays` 仍在 renderer 文件内运行，说明局部裁剪步骤仍属于该报告自己的展示规则，而不是全局 builder 行为。

这个服务流细节补上后，v2143 的 required shape 也更完整：读者能看到真实 `src/` 路径和 flow，而不仅是迁移三份报告的摘要。它还帮助定位失败：如果未来 approval-required 报告缺少某个 evidence array，先检查 profile 与局部 helper；如果只是 section 间距漂移，再检查 builder；如果 corrected census 又出现偏差，则检查扫描脚本的 barrel/stem 口径。三类问题的责任边界不一样，文档应当让维护者能快速分辨。

## Planning Consequence / 计划后果

v2143 的纠偏还改变了下一步策略。它证明有没有测试不能靠文件名直接 import 推断，必须理解项目的 barrel 习惯。后续若继续做 renderer 迁移，计划里应把检测命令写成 stem/barrel 双口径，并随机抽样打开测试确认。否则版本越往后，越容易因为错误分类把高风险文件当低风险处理。v2145 的收尾把这点补入讲解，是为了让后续执行者读到这里就知道：扫描结果只能指导排序，不能替代人工确认入口。

## Operational Reading Note / 运维阅读说明

v2143 对运维人员最有用的地方，是它把 endpoint handle 相关报告放在同一种阅读秩序里。preflight、upstream echo、approval-required readiness 三者都围绕连接前置条件展开，但各自的失败含义不同：preflight 更偏本地准备状态，upstream echo 更偏外部证据回声，approval-required readiness 更偏审批实现边界。统一 renderer 框架后，读者仍能通过 section 标题和 profile 字段区分三者，不会因为模板统一而混淆责任来源。

这也是为什么 `omitEvidenceArrays` 不应被删除。它保留了 approval-required 报告自己的展示裁剪规则，让大型数组不会淹没关键 entries。运维审阅时更需要先看到状态、版本、digest、边界字段，再按需追踪证据文件列表。v2143 的局部 helper 正是为这个阅读顺序服务，而不是重构遗留。文档把这一点写明，可以避免后续维护者为了追求“所有 renderer 零 helper”而破坏报告可读性。

## Follow-up Boundary / 后续边界

v2143 之后的计划应把普查纠偏当成硬规则：扫描脚本给出的剩余数量只能作为入口，真正开工前还要抽样检查测试是通过 renderer、barrel 还是 route 覆盖。若一个文件只是在扫描里看起来 testless，但实际有 route 级 Markdown 断言，就应按较低风险处理；反之如果没有任何输出断言，即使 shape 很标准，也应先补测试。这个边界能让后续迁移既不保守到停滞，也不激进到破坏报告输出。

## Retrospective Conclusion / 后验结论

v2143 的后验结论是：一次好的重构版本可以同时修代码和修判断方法。三个 renderer 的迁移本身不复杂，但普查口径纠偏避免了后续计划沿着错误分类继续推进。v2145 补足说明后，这个版本应被看作治理链中的校准点：它提醒后续执行者尊重仓库的 barrel 出口习惯，尊重既有 route 级测试，也尊重局部 helper 的展示责任。这样的校准能减少盲目批量化带来的隐藏风险。

## Human Review Note / 人工审阅说明

人工审阅 v2143 时，最容易漏掉的是“纠偏”比“迁移”更重要。三份 renderer 被改写为 builder 调用，只要测试和字节对比通过，代码层风险相对可控；但普查口径如果继续错误，会影响后面几十个版本的排序和工作量判断。因此审阅这版不应只问输出是否一致，还要问扫描逻辑是否符合仓库真实使用习惯，测试是否通过公共 barrel 或 route 覆盖，以及计划中是否承认旧结论的局限。

这类纠偏说明也有组织价值。多个执行者并行推进时，最怕的是每个人使用不同的“完成”定义：有人按文件名 import 认定无测试，有人按 route 断言认定有覆盖，有人按源码形态认定可以迁移。v2143 把口径写入文档后，后续协作可以围绕同一套判断说话。它减少的是沟通成本和误分流风险，而不只是某几个 renderer 的行数。

v2145 补充这些段落，是为了让该版本承担它真正的历史作用：在标准批次即将结束时，把计划从“机械挑文件”拉回“先校准事实”。这种校准会让后续大版本更慢一些，但更稳，因为每个复杂 renderer 开工前都知道自己为什么被选中、由什么测试保护、还有哪些输出需要字节级确认。

## One-sentence Summary / 一句话总结

本版把 sandbox-endpoint handle / approval-required 系列三个纯标准渲染器（其一保留
`omitEvidenceArrays` helper）收敛到共享 builder，净减约 99 行，输出经字节对比确认逐字节不变；
并更正了 v2142「纯标准有测试子集已空」这一基于缺陷测试口径的结论——真实仅剩 1 个（异步
live-read 渲染器），确无测试者为 0。
