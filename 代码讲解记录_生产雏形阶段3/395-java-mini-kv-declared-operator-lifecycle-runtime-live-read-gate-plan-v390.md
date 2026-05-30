# Node v390 代码讲解：Java / mini-kv declared operator lifecycle runtime live-read gate plan

## 版本进度

Node v390 在 v389 archive verification 之后写入 separate runtime live-read gate plan。它仍然不是 runtime 执行包：没有启动 Java，没有启动 mini-kv，没有探测 runtime，也没有启用 active shard routing。

## 关键文件

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan.test.ts`
- `docs/plans3/v390-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-roadmap.md`

## 核心流程

1. `createSourceNodeV389(...)` 读取 `e/389` 的 archive verification JSON，确认 v389 已验证 v388。
2. `createSourceNodeV389Replay(...)` 重新调用 v389 archive verification loader，确认归档可以从冻结证据重放。
3. `createSourceNodeV388Replay(...)` 重新调用 v388 declared lifecycle intake loader，确认 Java v161、mini-kv v152、mini-kv v151 frozen template 仍然从历史 fixture 解析。
4. `createRuntimeGatePlan(...)` 写入 runtime gate 前置条件：operator approval、concrete loopback ports、GET-only smoke command、cleanup proof、fail-closed result。
5. `createChecks(...)` 保证 plan 不会开启 runtime：`readyForRuntimeLiveReadGate=false`、`runtimeGateApprovalPresent=false`、`concreteLoopbackPortsAssigned=false`。

## 边界

- `runtimeGatePlanOnly=true`
- `runtimeGateApprovalPresent=false`
- `concreteLoopbackPortsAssigned=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `executionAllowed=false`
- `activeShardPrototypeEnabled=false`

## 验证

Focused test:

```text
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan.test.ts
1 file, 3 tests passed
```

后续完整收尾会继续跑 typecheck、相邻测试、full test、build、HTTP smoke 和浏览器归档。

## 下一步

Node v391 应先 archive verify v390。任何 runtime execution packet 都必须在 v391 之后单独写入，不能把 v390 plan 当作执行批准。
