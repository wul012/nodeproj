# v2178 解释：read-only / minimal integration renderer 迁移

v2178 收的是 N1 renderer consolidation 的第 53 批。上一版 v2177 已经把 CI 暴露出的 Markdown 路径标签归一化问题修好并确认远端通过，因此本版恢复功能性迁移：把四个 read-only / minimal integration 相关 renderer 从手写 Markdown 拼接或局部 helper 拼接迁到统一的 `renderVerificationReportMarkdown`。

本版的价值不在于新增一个审计报告，也不在于改变任何 readiness 决策，而在于减少同一类报告布局的重复实现。四个文件原本都在做同一类事情：先输出标题和 meta，再输出 evidence、target、check、summary、blocker、warning、recommendation、next action 等 section。差别只在每个 profile 的字段不同。继续让每个 renderer 自己拼数组，会让后续 24 个未标准化 renderer 的维护成本越来越高；集中到 builder 后，空列表、message、entries、普通行、标题层级这些规则由一个地方负责。

迁移对象是：

- `managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionRenderer.ts`

边界保持很窄：没有改 route，没有改 schema，没有改 loader，没有改 fixture，没有启动 Java 或 mini-kv，也没有把 read-only gate 升级成真实执行。Java 和 mini-kv 可以继续按各自计划书并行推进，Node 本版只消费已存在的 profile 和历史 fixture fallback，不构成它们的前置审批。

验证方式仍然是 byte-parity 风格。新增的 `test/rendererMigrationV2178Parity.test.ts` 固定 `generatedAt`，启用历史 fixture fallback，构造可复现的 passing profile，并对四份迁移后的 Markdown 做 normalized length、sha256、H1/H2/H3 数量检查。这样可以证明 builder 化没有让报告标题、section 顺序、业务字段、空列表文案或尾部换行漂移。

census ratchet 也随本版收紧：总 renderer 仍为 245，标准化 renderer 从 217 增至 221，未标准化 renderer 从 28 降到 24。`test/rendererCensusScript.test.ts` 同步更新，并保留一个会失败的负向门：当上限设为 23 时必须报出 `Renderer census regression: 24 exceeds --max-unstandardized=23.`，防止后续版本无意放松 N1 进度。

本版之后，N1 还剩 24 个 renderer。下一批更适合继续切 minimal read-only integration 家族的 window readiness、smoke rerun archive、operator CI handoff、managed-audit disabled intake/decision record。它们和 v2178 的字段形态相近，可以复用本版的 parity 测试方式；更复杂的 sandbox handle review 与 endpoint credential resolver 家族可以放在后面，避免把一个版本切得过大。

