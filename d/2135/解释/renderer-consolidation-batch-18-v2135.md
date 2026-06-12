# v2135 renderer consolidation batch 18

本版继续收口 N1 renderer consolidation，迁移 2 个完整报告：`managedAuditIdentityApprovalProvenanceDryRunPacket.ts` 与 `managedAuditExternalAdapterConnectionReadinessReview.ts`。
前者是 Node v211 identity approval provenance dry-run packet 报告，后者是 Node v223 external adapter connection readiness review。两者都保留原 loader、route、profile type 和历史 fixture，只把标题、meta、标准 section、message、endpoint、next actions 这些重复 Markdown 外框迁到 `verificationReportBuilder`。

`managedAuditExternalAdapterConnectionReadinessReview.ts` 继续保留 evidence file / snippet match 的本地行生成，并在交给 builder 前去掉整体尾空行，以保持旧输出字节一致。`managedAuditPacketRestoreDrillPlan.ts` 本轮暂缓，因为它的旧 `Drill Steps` / `Forbidden Operations` / `Checks` section 之间是紧凑无空行连接，当前 builder 的标准 section 间隔不能自然复刻；为了不为单例扩展 builder，本版不强迁它。

已完成验证：`npm run typecheck` 通过；2 个 focused test 文件 / 6 个测试通过；临时逐字节对比 2 个文件、4 个 profile 全部通过。Java / mini-kv 不需要等待本版，仍可并行推进。
