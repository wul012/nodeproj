# v2154 renderer consolidation batch 36

## 本版目标

v2154 处理 production live probe real-read smoke read-only window 这一组尾部 `*MarkdownRenderer.ts`。这五个文件都是完整 Markdown 报告，但它们不是 verification-report spec，而是生产 live-probe / release-report 风格的只读窗口材料。因此本版没有把它们迁入 `verificationReportBuilder`，而是扩展已有 `releaseReportShared.ts`，导出 header、entries section、line section、item section、artifact subsection、messages section 和 Evidence Endpoints / Next Actions tail 等可复用 helper。

被收敛的五个文件：

- `productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdownRenderer.ts`
- `productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdownRenderer.ts`
- `productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdownRenderer.ts`
- `productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdownRenderer.ts`
- `productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdownRenderer.ts`

## 边界

本版不改变 read-only window 的业务状态，不启动 Java / mini-kv，不读取 fresh sibling evidence，不打开生产执行，也不修改 route 或 schema。它只整理 Markdown 结构表达方式，并保持旧输出字节级一致。

Java 和 mini-kv 可以继续并行推进。Node v2154 使用的是本地保存的只读窗口 profile 和临时 hash fixture，不要求另外两个项目先产出新版本。

## 输出稳定性

迁移前先捕获固定 profile，再用同一份 profile 做迁移后重渲染。五个输出全部 byte-identical：

- readinessPacket: `26e91e53716d342e96601bb50852c8486127dc312a1b425aacca6e6c402ce011`
- liveCapture: `3d3f0d6771dc4307862df2067f7fffb282a965fffa0aa83ff6544784c750dcd5`
- captureArchive: `c3a59319ab525b133b42de921ea9f49e99a3c71e96f906e67b15955f20d721e3`
- captureArchiveVerification: `2e0ef44a7b1e18c6cd3375ca5d7853929cfc65b9ca1d02902e3fc8e29792d9f1`
- captureReleaseEvidenceReview: `a80c81fbc95bd4e3ebc9914dadd4d318fab3772588de6ea7f353539da125dc60`

## 验证摘要

- pre/post hash compare：5/5 byte-identical。
- focused tests：5 个文件 / 22 个测试通过。
- typecheck：`npm run typecheck` 通过。
- ratchet：`test/governanceGrowthRatchet.test.ts` 通过。
- lint：`npm run lint` 通过，0 error / 263 existing warnings。

## 维护收益

这版把 read-only window 报告里重复的标题、字段段落、artifact 子段落、messages 段落和 evidence tail 收进 `releaseReportShared`。后续 production live probe 其他尾部 Markdown 报告可以复用同一组 helper，而不需要复制整段 Markdown 数组。

同时，本版把 renderer consolidation 的边界再往前推了一步：verification 报告继续用 `verificationReportBuilder`，release/probe 风格报告使用 `releaseReportShared`。这比把所有 Markdown 都塞进单一 builder 更符合语义，也更利于维护。
