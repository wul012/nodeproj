# v2129 renderer consolidation batch 12

v2129 继续 N1 renderer consolidation，把 managed-audit credential resolver 里两条相邻 prerequisite 链的 6 个 renderer 迁移到 `renderVerificationReportMarkdown`：Credential Handle Approval 的 contract intake / upstream echo verification / prerequisite closure review，以及 No-Network Safety Fixture 的 contract intake / upstream echo verification / prerequisite closure review。

本版没有修改 loader、type、route、fixture、access guard 或真实执行开关。它只整理 Node 内部 Markdown 展示层：通用标题、meta、section、messages、next actions 交给 builder；合同字段、required/prohibited fields、rejection reasons、no-go boundaries、upstream echo evidence files、completed/remaining prerequisites 继续保留在本地 helper 中。

维护收益：
- 6 个 renderer 进入共享 report builder。
- 总差异 362 insertions / 420 deletions，净减少 58 行。
- 没有新增 helper，避免把审批链细节过早抽成万能 formatter。
- 6/6 byte-identical compare 通过，说明 Markdown 输出与迁移前逐字节一致。

已完成验证：
- `npm run typecheck` 通过。
- focused renderer batch 通过：8 个测试文件、30 个断言。
- 临时 Vitest exact compare 通过：6 个 renderer 与 `git show HEAD` 旧实现逐字节一致。

待最终收尾验证：
- walkthrough 中文质量 gate。
- lint。
- build。
- 删除 `.tmp` 和 `dist` 后提交、tag、push、观察 CI。

Java 和 mini-kv 可继续并行；v2129 不消费新 sibling evidence，也不要求它们启动服务或修改合同。
