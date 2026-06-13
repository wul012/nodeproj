# v2138 renderer consolidation batch 21

v2138 继续推进 N1 renderer consolidation，把四份基础治理报告迁移到 `verificationReportBuilder`：`accessPolicyProfile.ts`、`ciEvidenceCommandProfile.ts`、`auditRetentionIntegrityEvidence.ts` 和 `authEnforcementRehearsal.ts`。

本版不改变任何 route、schema、配置含义或执行开关，只收敛重复 Markdown 外框。`Access Policy` 的 identity field / route policy、`CI Evidence Command` 的 command、`Auth Enforcement Rehearsal` 的 sample 都保留本地三级标题子块；四份报告的 source-less message 行也继续由本地 formatter 生成，再作为 raw lines section 交给 builder。这样既能减少重复，又不把单例语法塞进公共模板。

已完成验证：`npm run typecheck` 通过；4 个 focused 测试文件 / 12 个测试通过；临时逐字节对比覆盖 4 个文件、8 个 profile，确认 safe/warning/enforced/file-backed 等变体与 `git show HEAD:<path>` 旧 renderer 完全一致。Java / mini-kv 继续推荐并行推进，本版不要求新 sibling evidence。
