# v2176 说明：shard/execution readiness renderer 合并

## 本版做了什么

v2176 迁移了 3 个完整报告 renderer：

- `managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateRenderer.ts`
- `productionShardExecutionReadinessRenderer.ts`

前两个是 shard readiness 家族报告，第三个是 production shard execution 批次共享 renderer，会被 21 个 stage profile 使用。本版把它们从手写 Markdown 数组迁移到 `renderVerificationReportMarkdown`，保留局部 `renderProjectReport`、`renderFieldCheck`、`renderShardReadiness` 和 `renderEntries` 展开逻辑作为 `lines` section。

## 验证与进度

已通过 focused gate：

```powershell
npm run typecheck
npx vitest run test/rendererMigrationV2176Parity.test.ts test/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts test/managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts test/productionShardExecutionReadiness.test.ts --maxWorkers=2
npm run renderer:census -- --json --max-unstandardized=31
```

census 从 214/245 标准化提升到 217/245，剩余未标准化 renderer 为 28。`test/rendererCensusScript.test.ts` 也已收紧到 217/28，负向 gate 改为 `--max-unstandardized=27` 必须失败。

## 边界

本版不改变 loader、route、schema、fixture，也不启用任何 production shard execution。Java 和 mini-kv 可以继续并行推进；v2176 只改 Node renderer 展示层，不需要新鲜上游证据。
