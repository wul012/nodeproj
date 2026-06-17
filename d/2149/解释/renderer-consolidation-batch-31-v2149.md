# v2149 renderer consolidation batch 31

本版继续 N1 renderer consolidation，迁移 signed approval capture / artifact draft 链上的五个相邻 Markdown renderer：

- signed approval capture preflight
- signed approval capture artifact preflight
- signed approval capture artifact draft preflight
- signed approval capture artifact draft readiness
- signed approval capture artifact draft review package preflight

这些报告仍然是只读治理报告。v2149 没有生成真实签名、没有生成批准、没有解锁 runtime payload、没有启动 Java/mini-kv，也没有修改跨项目 schema。

本版没有新增共享 helper，而是复用 v2148 建立的 `trimVerificationTrailingBlankLine` 和 v2147 的 `renderVerificationBlockedReasonLines`。五个 renderer 的 Inputs/Attestations、Fragments/Seals、Fields/Guards、Readiness Lanes/Controls、Package Slots/Guards 仍保留本地 helper，因为这些名字承载领域语义。

已完成验证：

- 强制历史 fixture fallback 下，五个输出 pre/post SHA-256 和长度完全一致。
- 聚焦 Vitest：6 个文件 / 33 个测试通过。
- `npm run typecheck` 通过。

最终 closeout 会继续补跑 ratchet、代码讲解质量门、lint，并回填 evidence summary。
