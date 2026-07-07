# v2175 说明：shard readiness intake renderer 合并

## 本版做了什么

v2175 迁移了 5 个 Java/mini-kv shard readiness 与 live-read-plan intake renderer：

- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeRenderer.ts`

这些文件原来都手写 `["# title", "", "- Service: ...", ...].join("\n")`，只有少量差异在章节列表和 Evidence Files 行。现在它们统一改为
`renderVerificationReportMarkdown`，让标题、meta bullet、二级章节、messages/list/entries 的空行规则由同一个 builder 负责。

## 为什么这样做

N1 的目标是把 full-report renderer 从复制粘贴式手写数组迁移到通用 builder。v2175 这一批都属于同步、只读、冻结证据 intake renderer，不启动 Java，不启动 mini-kv，不连接 managed audit，也不改变 route 或 loader。它们很适合放在同一批处理：结构相同，风险集中，parity 也能一条测试覆盖。

第一个 renderer 有 `renderShardReadiness` 局部 helper，因为 Java 与 mini-kv shard readiness assessment 有自定义格式。这个 helper 没有硬塞进 builder，而是作为 `lines` section 保留；这样既减少了重复框架代码，又不把领域格式藏到通用 builder 里。

## 验证结果

已通过：

```powershell
npm run typecheck
npx vitest run test/rendererMigrationV2175Parity.test.ts test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption.test.ts test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake.test.ts test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake.test.ts --maxWorkers=2
npm run renderer:census -- --json --max-unstandardized=36
```

census 从 209/245 标准化提升到 214/245，剩余未标准化 renderer 为 31。

## 并行边界

Java 和 mini-kv 可以继续并行推进。本版只消费 Node 仓库中的冻结历史证据，并且只改 Node 渲染层，不需要新鲜 Java/mini-kv 输出，也不要求另外两个项目等待 Node 批准。
