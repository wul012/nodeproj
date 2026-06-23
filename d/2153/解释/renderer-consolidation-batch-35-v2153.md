# v2153 renderer consolidation batch 35

## 本版目标

v2153 处理的是 v2152 刻意暂缓的 profile-section fragment renderer。上一版已经把 candidate document 的五个完整 Markdown 报告迁入 `verificationReportBuilder`，但相邻的 profile-section 文件并不是完整报告：它们返回 `string[]`，只负责向上层 live read-only window profile 提供若干 `##` 局部段落。因此本版没有把它们硬套进 full-report builder，而是在 `liveProbeReportUtils.ts` 里新增轻量的 `renderProfileEntrySections`。

本版迁移 8 个真正有本地 `## heading + renderEntries(...) + ""` 结构的 profile-section renderer，保留 3 个只做子 section 拼接的组合 renderer 不动。这样既减少重复的 Markdown fragment 外壳，又不把局部 profile 片段伪装成完整报告。

## 边界

本版不改变 route、schema、审批、执行、读写开关、兄弟项目证据消费或 runtime 行为。所有输入仍来自 Node 本地 fixture profile；Java 和 mini-kv 不需要提供 fresh evidence，也不需要等待 Node 本版完成。报告里出现 signed approval、candidate document、value supply、operator evidence 等词，只表示只读 profile 字段继续按原顺序展示，不表示系统获得真实批准或真实执行能力。

## 代码入口

新增的共享入口在 `src/services/liveProbeReportUtils.ts`：

- `ProfileEntrySection`：只描述局部 `##` 段落标题和已经渲染好的 entry lines。
- `renderProfileEntrySection`：输出 `## heading`、原 entry lines、一个旧格式空行分隔符。
- `renderProfileEntrySections`：按原顺序拼接多个局部段落。

这三个入口刻意放在既有 utils 文件中，而不是新建 `profileSectionRenderer.ts` 服务文件。第一次尝试新建文件时，治理增长 ratchet 会把 service 文件数量从 1125 推到 1126；本版真正需要的是 Markdown fragment 小工具，不值得为了一个三函数 helper 增加新的服务模块。

## 输出稳定性

迁移前后 6 个采样输出全部 byte-identical：

- operatorEvidenceValueSupply: `61678453fb45644eb00cadd738caa0fba6f29128a3af4be5f64cff1701d6cb0d`
- operatorEvidenceValueSupplyApproval: `62943acc4a2b047f90b816facd03e9840d66bbf2b3c807c9d3994cd069fefd44`
- signedApprovalArtifactDraft: `7a8dffc88e48d978dfe82fc15fe5181822017c7b15204e4e5b5aa4db60392f4c`
- signedApprovalArtifactDraftTextPackage: `0fa51ca12359c9e9668e5b4a89e99bdb00bcad7ae66873c069d10f87b935c820`
- candidateDocument: `18ef38d64a1075a96fd17988a529e92f562621fbe2bafcf6f1ca7f8233dbb90f`
- liveReadOnlyWindowAggregate: `66d0f030a66b890f102c675b37ae93c27e8ee3503e49337fc3994e389d16b605`

其中最后一项是上层聚合 profile 输出，证明局部 section 的拼接顺序、空行、标题文本和字段值没有漂移。

## 验证摘要

- profile-section pre/post hash compare：6/6 byte-identical。
- focused tests：6 个文件 / 7 个测试通过。
- typecheck：`npm run typecheck` 通过。
- ratchet：`test/governanceGrowthRatchet.test.ts` 通过。
- lint：`npm run lint` 通过，0 error / 263 existing warnings。

## 维护收益

v2153 把 profile-section fragment renderer 从“每个文件手写标题、展开字段、补空行”的重复模式，收敛为“本地字段 helper + 共享 fragment 外壳”。这让后续审查可以更快地区分两件事：一是局部 profile 的段落结构，二是每个业务对象到底暴露了哪些只读字段。

本版也把一个边界判断固定下来：完整报告继续走 `verificationReportBuilder`，局部 profile fragment 走 `renderProfileEntrySections`。这比把所有 Markdown 输出都归到一个 builder 更稳，也能避免 builder 语义继续膨胀。
