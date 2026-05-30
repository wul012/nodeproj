# Node v392 代码讲解：Java / mini-kv declared operator lifecycle runtime execution packet stop record

## 版本进度

Node v392 在 v391 archive verification 之后写入 runtime execution packet stop record。它没有把“推进”当成 runtime 批准，而是把缺失的执行工件写成可审计记录：operator approval、concrete loopback ports、GET-only smoke command、cleanup proof、service owner、process cleanup rules。

本版不启动 Java，不启动 mini-kv，不连接 managed audit，不解析 raw endpoint URL，也不启用 active shard routing。

## 关键文件

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord.test.ts`
- `docs/plans3/v392-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-roadmap.md`

## 核心流程

1. `createArchiveReferences(...)` 固定 v391 归档文件清单，要求 11 个来源归档文件存在。
2. `createSourceNodeV391(...)` 从 v391 JSON 中读取 archive verification 状态、runtime gate 关闭状态、执行包缺席状态和 38/38 检查结果。
3. `replayFromFrozenEvidence(...)` 重新调用 v391 archive verification loader，确认冻结 replay 仍然保持 `readyForRuntimeLiveReadGate=false`。
4. `createRuntimeExecutionPacket(...)` 写入 stop record：`runtimeExecutionPacketPresent=false`、`runtimeExecutionPacketExecutable=false`、`executionAttempted=false`。
5. `createChecks(...)` 汇总 42 个检查，确认 6 个必需执行工件仍缺失，同时没有启停上游服务、没有写上游状态、没有连接 managed audit。

## 边界

- `stopRecordOnly=true`
- `readyForRuntimeLiveReadGate=false`
- `runtimeExecutionPacketPresent=false`
- `runtimeExecutionPacketExecutable=false`
- `runtimeGateApprovalPresent=false`
- `concreteLoopbackPortsAssigned=false`
- `executionAttempted=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `executionAllowed=false`
- `activeShardPrototypeEnabled=false`

## 验证

Focused test:

```text
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord.test.ts
1 file, 3 tests passed
```

Adjacent tests:

```text
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification.test.ts managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord.test.ts
2 files, 6 tests passed
```

Full test:

```text
npm test
325 files, 1122 tests passed
```

## 下一步

Node v393 应先 archive verify v392 stop record。后续若重新尝试 runtime execution packet，必须先提供 operator approval、concrete loopback ports、GET-only smoke command、cleanup proof、service owner 和 process cleanup rules。
