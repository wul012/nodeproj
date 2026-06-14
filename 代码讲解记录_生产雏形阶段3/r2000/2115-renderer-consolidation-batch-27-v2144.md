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

## One-sentence Summary / 一句话总结

本版以首个 `lines` 小节迁移收编最后一个纯标准且有测试的渲染器（async live-read 门，保留本地
`renderLiveRead`），净减 28 行，输出经字节对比确认逐字节不变；至此纯标准子集真正清零，剩余
108 个全含 for/h3/map/flatMap，下一批需用户定向。
