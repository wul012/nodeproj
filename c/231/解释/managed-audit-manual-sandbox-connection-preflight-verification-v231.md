# Node v231 运行调试说明：manual sandbox connection preflight verification

## 本版目标

Node v231 消费 Node v230、Java v88、mini-kv v97 的只读证据，生成 `managed-audit-manual-sandbox-connection-preflight-verification.v1`。

本版只验证：

- Node v230 preflight gate 已 ready。
- Java v88 preflight echo marker 已 ready。
- mini-kv v97 no-start guard receipt 已 ready。
- manual window 默认关闭。
- Node / Java / mini-kv 都不会被自动启动。
- 不读取 credential value，不执行 schema migration，不写 managed audit state。

## 关键接口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification?format=markdown
```

## 关键结果

```text
verificationState=manual-sandbox-connection-preflight-verification-ready
readyForManagedAuditManualSandboxConnectionPreflightVerification=true
readyForManagedAuditSandboxAdapterConnection=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
productionBlockerCount=0
matchedSnippetCount=23
```

## 计划同步

`docs/plans/v229-post-packet-verification-roadmap.md` 已收口。

`docs/plans/v231-post-preflight-verification-roadmap.md` 已新增为当前唯一有效全局计划，下一步推荐并行：

```text
Node v232 + Java v89 + mini-kv v98
```

其中 Node v232 优先做 `ReadOnlyDryRunGuards` / `SandboxDryRunGuards` 类型聚合；Java v89 与 mini-kv v98 分别做低风险质量优化。

## 验证记录

```text
npm run typecheck
通过

npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionPacketVerification.test.ts test/managedAuditManualSandboxConnectionPreflightGate.test.ts test/managedAuditManualSandboxConnectionPreflightVerification.test.ts --pool=threads --maxWorkers=4
8 个测试文件通过，24 个用例通过

npm test -- --pool=threads --maxWorkers=4
173 个测试文件通过，586 个用例通过

npm run build
通过
```

HTTP smoke 使用安全环境变量和本轮临时 Node 服务执行，结果：

```text
healthStatus=ok
verificationState=manual-sandbox-connection-preflight-verification-ready
readyForVerification=true
readyForConnection=false
connectsManagedAudit=false
readsCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
blockerCount=0
markdownHasWarning=true
```

截图：

```text
c/231/图片/managed-audit-manual-sandbox-connection-preflight-verification-v231.png
```
