# v2144 renderer consolidation batch 27 / minimal shard readiness live-read gate（首个 lines 小节迁移，纯标准子集清零）

## Goal and Non-goal / 目标与非目标

本版（v2144，批次 27）迁移最后一个「纯标准形态且有测试」的渲染器——
`ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate`
（最小分片就绪 live-read 门）。它与前几批最大的不同有两点：其一，其加载器是 **async**，
需要传入 `OrderPlatformClient` / `MiniKvClient`，并对 Java / mini-kv 做 live-read；其二，它的
两段 live-read 小节由文件本地的 `renderLiveRead` helper 产出原始 `- key: value` 行，**不是**
标准的 `renderEntries` / `renderMessages` / `renderList`。因此这是本整合工程里**首个使用
builder `lines` 小节类型**的迁移。目标仍是收敛模板、逐字节相同；非目标不变：不改运行时
行为、证据 schema、路由、上游启动语义、鉴权。不新增 helper / 链路 / 文件 / 测试，ratchet 不变。

## Entry Points / 入口

导出函数 `renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateMarkdown`
的函数名、签名、文件名不变，barrel 与路由导入零改动。

## Response Model / 响应模型

函数体由「数组字面量 + `join("\n")`」改写为一次 `renderVerificationReportMarkdown({ title,
meta, sections })`。19 条 `- Label: value` 元信息逐条映射为 `meta` 二元组；`## H` +
`renderEntries(x)` → `{ heading, entries: x }`；`renderMessages` / `renderList` 照常映射；
两段 live-read 小节 `## Java Live Read` / `## mini-kv Live Read` 原本是
`...renderLiveRead(profile.liveReads.java)`，映射为 `{ heading, lines: renderLiveRead(...) }`
——`lines` 小节把 helper 返回的 `string[]` 原样作为小节正文，builder 负责其前后空行，与原
手写数组逐字节一致。`renderLiveRead` helper 与 `MinimalShardReadinessLiveReadObservation`
类型导入均保留；不再需要的 `renderEntries/renderList/renderMessages` 导入已移除。

## Upstream Evidence and Config / 上游证据与配置

该门做真实只读 live-read：探针开启时，通过 `OrderPlatformClient.shardReadiness()`（HTTP-JSON
`GET /api/v1/ops/shard-readiness`）与 `MiniKvClient.shardJson()`（TCP `SHARDJSON` 命令）读取
Java / mini-kv 的分片就绪证据，与 Node v370 静态证据比对。所有 live-read 严格只读
（`executionBlocked: true`、`readOnlySafe: true`），不写、不启停上游、不改 sibling 状态、不连
managed audit。探针关闭时，两段 live-read 记为 `skipped-probes-disabled` 且 `attempted: false`，
门 fail-closed（`blocked`）。本版渲染器迁移不触碰任何上述读取/门控逻辑，仅改 Markdown 拼装。

## Service Flow / 服务流程

加载器（async）构造 sourceNodeV370、并行 await Java/mini-kv live-read、生成 gate/checks/
summary，返回 profile；渲染器为纯函数，把 profile 渲染为 Markdown。`renderLiveRead` 仍在
渲染器文件内，负责把单条 live-read 观测展开为约 17 行 `- key: value`（含 `??` 缺省与
`missingRequiredFields.join(", ")` 处理）。

## Safety Boundary / 安全边界

严格 byte-identical：字符串字面量逐字照搬，`renderLiveRead` 一字未改。`lines` 小节的语义已由
builder 既有契约保证（`renderSectionBody` 对 `lines` 直接 `[...section.lines]`），与手写
`...renderLiveRead(x)` 在数组中展开等价。

## Test Coverage / 测试覆盖

既有测试文件（367 行，3 个用例）在不改任何断言下全部通过：用例 1 用 fake 客户端验证
ready 路径下两段 live-read 内容；用例 2 验证探针关闭时 fail-closed、不尝试读取；用例 3 起真实
mock HTTP/TCP 服务、经 `app.inject` 验证 JSON 与 Markdown 路由（`toContain` 校验标题、
`Java v153 live`、`Starts Java service: false` 等）。加 ratchet，共 2 文件 5 用例全绿。由于
Markdown 断言为 `toContain`，另用一次性 async harness（复用测试的 fake 客户端与探针开启
配置）做渲染前后字节对比：差异仅落在运行时 `- Generated at:` 行，19 条元信息与两段 live-read
小节逐字节相同。harness 与 `.tmp/` 落盘已删除。

## Maintenance Decision / 维护决策（拐点）

本批迁移后重新普查（更正口径）：108 个未迁移渲染器中，纯标准（无 for/h3/map/flatMap）renderer
为 **0**——纯标准子集（无论有无测试）已**真正清空**。剩余按形态分桶（有重叠）：含 `for` 9、
含 `### ` 三级小节 50、含 `.map(` 67、含 `.flatMap(` 63。这意味着下一批必须正式做方向决策，
不能再走「挑标准渲染器」的低风险路径。

## File Decisions / 文件级决策

- MinimalShardReadinessLiveReadGate（原 97 行 → 净减 28 行）：19 元信息 + 10 小节，其中
  两段 live-read 用 `lines` 小节承载本地 `renderLiveRead` helper 输出，其余为 entries/messages/
  list。保留 helper 与观测类型导入，移除三个未用的 liveProbeReportUtils 导入。

## Verification Meaning / 验证含义

typecheck 通过说明 builder 调用（含 `lines` 小节接收 `renderLiveRead` 的 `string[]` 返回）类型
匹配；5 用例通过说明 ready/blocked/route 三条路径输出未变；ratchet 通过说明文件数未增长；
字节对比仅余时间戳行，构成逐字节相同的直接证明。

## Production Boundary / 生产边界

不改变任何生产边界：渲染器迁移不影响 live-read 的只读性、探针默认关闭、fail-closed 行为。

## Cross-project Position / 跨项目位置

仅改 Node 渲染器内部与归档文档，不影响 Java / mini-kv 契约或集成启动，可并行推进。

## Next Scan Strategy / 下一轮扫描策略（需用户定向）

纯标准子集清零后，v2145 起进入真正的分叉，建议显式与用户确认：
- 路线 A：对含 `### ` 三级小节或 `for` 循环但语义简单的渲染器，用 `lines` 小节承载其「原样
  行块」——能逐字节迁移，但 entries/messages 的结构化收益打折（只是把行块塞进 builder 骨架）。
- 路线 B：扩展 builder，使其 entries 小节能接受「`[label, value]` 数组」形态，从而吸收
  `.map`/`.flatMap` 动态拼装的 67/63 个渲染器；builder 扩展需自带测试与每文件字节对比。
两条路线单批都更重、风险更高。

## Regression Risks / 回归风险

主要风险为 `lines` 小节前后空行与 `renderLiveRead` 输出错配——由既有 3 路径测试 + 字节对比
双重拦截。标题为字面量，无动态标题风险。

## Closeout Standard / 收尾标准

含本中文讲解、`d/2144/` 证据（summary.json + 解释 md，含 post-v2144 普查）、CHANGELOG 条目、
两张 playbook 进度表更新，提交并打标签 v2144。

## v2145 Closeout Addendum / v2145 收尾补充说明

v2144 是 renderer consolidation 的一个边界版本：它不是继续挑最简单的 meta/entries/messages/list 文件，而是第一次把本地 helper 生成的原始行块交给 builder 的 `lines` section。这个动作的价值在于验证 builder 可以承载共享框架加局部行生成器的混合形态，而不必立即扩展出复杂的嵌套 section API。`renderLiveRead` 原本返回 `string[]`，旧 renderer 用展开运算符把它插入 Markdown 数组；新 renderer 用 `{ heading, lines: renderLiveRead(...) }` 表达同一件事。只要 builder 对 `lines` 的处理是原样展开，这个迁移就是结构化的，同时仍保持逐字节输出。

这份报告的上游语义也比前几批更敏感。它的 loader 是 async，会在探针开启时读取 Java 的 shard readiness HTTP JSON 和 mini-kv 的 `SHARDJSON` TCP 响应；探针关闭时必须 fail closed，不尝试读取。v2144 只迁移 renderer，不改变 loader，所以文档必须反复说明：没有新增 Java/mini-kv 服务启动，没有让 Node 自动执行上游动作，也没有放宽 `executionBlocked`、`readOnlySafe`、`startsJavaService` 等边界字段。若这点写得不够，后续读者可能把 live-read gate 误解为生产执行入口，而它实际上只是只读证据对照和门禁展示。

v2145 收尾时还要强调 v2144 的 stop condition：纯标准子集已经真正清空，剩余 108 个未迁移 renderer 都落入 for、h3、map 或 flatMap 等更复杂形态。这个结论直接决定下一阶段不能继续用挑简单文件的策略凑版本。要么采用 lines section 承载原始行块，接受结构化收益下降；要么扩展 builder，让 entries 支持 `[label, value]` 数组或更复杂的嵌套 section，并配套 builder 自测和逐文件字节对比。v2144 因此是路线分叉前的收束，不是普通小迁移。

原讲解不足 3000 中文字符时，最危险的不是 CI 红，而是它没有把上述路线分叉解释完整。工程后期的文档不是为了复述 diff，而是为了让下一位维护者知道哪里可以安全重复、哪里必须停下来重新设计。v2144 作为第一个 lines 样本，需要说明为什么没有新增 helper、为什么没有把 `renderLiveRead` 提升为共享 helper、为什么不在这个版本扩展 builder。答案是：只有一个样本不足以证明共享抽象值得存在，先用现有 `lines` 能把风险压在单文件内，等 h3/for 家族显示出重复模式后再抽象。

## Verification Reading Note / 验证阅读提示

验证 v2144 时应同时看三层证据：第一，focused route test 覆盖 ready、probes-disabled fail-closed、mock HTTP/TCP 三条路径；第二，一次性 async harness 对比迁移前后 Markdown，除 `Generated at` 时间戳外其余行一致；第三，v2145 重新跑文档质量 gate、lint 和 build，证明归档修复没有引入新的类型或构建问题。这样读者能把 v2144 视为 lines section 可用性证明，而不是一个只减少 28 行的轻量补丁。

## Service Flow Detail / 服务流细节

v2144 的服务流可以拆成加载、观察、判定、渲染四步。加载阶段读取 Node v370 静态证据，并根据配置决定是否尝试 Java/mini-kv live-read；观察阶段把 HTTP/TCP 返回值整理成 `MinimalShardReadinessLiveReadObservation`；判定阶段把缺失字段、ready 状态和 blocked 状态放入 profile；渲染阶段才由 renderer 把 profile 写成 Markdown。v2144 只动最后一步，因此所有关于是否尝试探针、探针失败如何 fail closed、是否允许执行的判断，都不在本次改动面内。

`lines` section 的引入也应放在这个 flow 中理解。它不是新的业务能力，而是一个保守的展示承载方式：当本地 helper 已经产出稳定的行数组时，builder 只负责把这些行放进对应 section。这样既避免复制整套手写 Markdown 框架，又不把 `renderLiveRead` 过早抽成共享工具。若未来多个 live-read 报告重复出现相同 helper 形态，再考虑共享化才有足够证据。

## Safety Reading Detail / 安全阅读细节

v2144 文档必须明确区分 live-read 与 execution。live-read 只读上游状态，且受探针开关和 fail-closed 约束；execution 则意味着写入、启动、审批通过或状态改变，本版本没有也不能引入这些行为。报告里出现 Java 和 mini-kv 字样，只代表只读证据来源，不代表 Node 拥有启动它们或修改它们的权限。这个边界如果不写清，后续审阅者很容易被 minimal shard readiness 这个名称带偏，误以为版本已经接近真实分片执行。

## Operational Reading Note / 运维阅读说明

v2144 的运维阅读重点是看 live-read 结果如何被降级展示。探针关闭时，报告应清楚呈现 skipped/not-attempted，而不是伪装成成功；探针失败时，应保持 blocked，而不是让缺失字段被忽略；探针成功时，也只是证明只读证据可见，不代表执行窗口打开。`lines` section 保留了 `renderLiveRead` 原本的逐行输出，使这些状态在 Markdown 中仍按旧顺序出现，便于和历史截图、HTTP smoke 或人工记录对照。

这篇文档补足后，后续路线也更清晰：如果下一个版本选择继续用 `lines` 搬运 h3/for 形态，就要承认结构化收益有限，只是把行块放进统一外壳；如果选择扩展 builder，就要先写 builder 测试，再做小批迁移。v2144 不替后续路线做决定，它只证明 lines section 可以安全承载一个已有 helper 的输出。这个结论本身已经足够，不需要在同一版里追加新的抽象。

## Follow-up Boundary / 后续边界

v2144 之后不能再按“纯标准 renderer”继续推进，因为这个子集已经清空。下一阶段若做 h3/for 家族，应明确接受较重的字节对比和更细的人工审阅；若做 builder 扩展，应先让 builder 自己有覆盖新增 section 语义的测试，再迁移具体报告。v2144 的角色是关门而不是开新门：它把最后一个低风险样本收掉，同时把更高风险路线摆到计划层讨论。

这个边界对三项目也有意义。Node 这里没有要求 Java 或 mini-kv 立即提供新证据，只有未来真实联合执行或 shard preview 进入 live integration 时，才需要写明端口、启动责任和清理责任。在那之前，v2144 的 live-read 语义仍是只读审阅，不是跨项目运行编排。

## Retrospective Conclusion / 后验结论

v2144 的后验结论是：`lines` section 可以作为谨慎过渡，但不能被当成无限扩展的终点。它适合承载一个已经存在、已经测试过、语义局部的行生成 helper；它不适合掩盖复杂报告结构，也不应该替代更清晰的 builder 扩展设计。v2145 把这点写明后，下一阶段路线会更稳：要么承认只是外壳统一，要么投入真实抽象和测试，而不是用“迁移成功”四个字遮住工程取舍。

## Human Review Note / 人工审阅说明

人工审阅 v2144 时，要把“能渲染 live-read”与“能执行分片动作”彻底分开。前者只是把只读观察结果写进报告，后者会涉及启动、写入、审批、状态改变和跨项目运行责任。本版本只属于前者，而且只改最后的 Markdown 渲染层。任何把它解读为生产分片执行准备完成的说法，都会越过版本事实。正确的读法是：v2144 证明现有 builder 可以安全承载一个本地行生成 helper，证明纯标准子集已收束，证明下一阶段需要重新选择技术路线。

这个结论对后续二十版、三十版式推进尤其重要。若继续追求版本数量而忽略路线选择，就会把 h3、for、map、flatMap 等复杂报告硬塞进 lines，得到表面统一但内部仍难维护的结果。若直接扩展 builder 而不先补 builder 测试，又会让共享工具变成新的风险中心。v2144 的正确后续不是立刻做更多，而是先在计划中写明选择标准、验证方式和停止条件。

v2145 补足这篇说明，是为了把这道边界留给后续维护者：只读报告可以继续被整理，真实联合执行必须另起计划，写清 Java、mini-kv、端口、清理和授权责任。这样项目会稳稳地向生产级分片执行靠近，而不是在文档和命名上提前宣布已经到达。

## One-sentence Summary / 一句话总结

本版以首个 `lines` 小节迁移收编最后一个纯标准且有测试的渲染器（async live-read 门，保留本地
`renderLiveRead`），净减 28 行，输出经字节对比确认逐字节不变；至此纯标准子集真正清零，剩余
108 个全含 for/h3/map/flatMap，下一批需用户定向。
