# Node v391 代码讲解：Java / mini-kv declared operator lifecycle runtime live-read gate plan archive verification

## 版本进度

Node v391 对 v390 的 runtime live-read gate plan 做归档校验。它读取 `e/390` 的 JSON、Markdown、summary、browser snapshot、HTML、截图、解释和代码讲解，再用 v390 loader 从冻结证据重放一次，确认 v390 仍然只是计划。

本版不启动 Java，不启动 mini-kv，不连接 managed audit，不解析 raw endpoint URL，也不启用 active shard routing。

## 关键文件

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerificationTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerificationRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification.test.ts`
- `docs/plans3/v391-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification-roadmap.md`

## 核心流程

1. `createArchiveReferences(...)` 固定 v390 归档文件清单，要求 11 个归档文件存在。
2. `createSourceNodeV390(...)` 从 v390 JSON 中提取 plan state、plan digest、runtime artifact counts 和关闭边界。
3. `replayFromFrozenEvidence(...)` 重新调用 v390 loader，确认冻结 replay 仍然得到 36/36 且 runtime gate 关闭。
4. `createArchiveVerification(...)` 生成 v391 archive verification digest，并记录不 rerun live read、不启停上游服务、不写上游状态。
5. `createChecks(...)` 汇总 38 个检查，尤其是 `runtimeExecutionPacketPresent=false`、`runtimeGateApprovalPresent=false`、`concreteLoopbackPortsAssigned=false`。

## 边界

- `archiveVerificationOnly=true`
- `readyForRuntimeLiveReadGate=false`
- `runtimeExecutionPacketPresent=false`
- `runtimeGateApprovalPresent=false`
- `concreteLoopbackPortsAssigned=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `executionAllowed=false`
- `activeShardPrototypeEnabled=false`

## 验证

Focused test:

```text
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification.test.ts
1 file, 3 tests passed
```

Adjacent tests:

```text
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification.test.ts managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan.test.ts managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification.test.ts
3 files, 9 tests passed
```

Full test:

```text
npm test
324 files, 1119 tests passed
```

第一次完整测试外层命令在 304 秒超时，没有断言失败；focused、相邻测试和 typecheck 通过后，延长外层预算复跑完整测试通过。这是测试预算稳定化，不是业务行为修复。

## 下一步

Node v392 只能在单独执行包中继续：必须写清 operator approval、concrete loopback ports、GET-only smoke command、cleanup proof、service owner 和进程清理规则。v391 archive verification 本身不能当作 runtime 批准。
