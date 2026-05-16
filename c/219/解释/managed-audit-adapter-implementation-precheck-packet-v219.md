# Node v219 运行说明

## 1. 版本目标

Node v219 按 `docs/plans/v217-post-production-hardening-gate-roadmap.md` 推进，新增 `managed audit adapter implementation precheck packet`。

它消费：

```text
Node v218 managed audit route helper quality pass
Java v79 OpsEvidenceService quality split receipt
mini-kv v88 command dispatch quality receipt
```

本版只做真实 managed audit adapter wiring 前的最小 precheck，不连接真实 managed audit，不启动 Java / mini-kv，不执行 Java approval / ledger / SQL / deployment / rollback，也不执行 mini-kv LOAD / COMPACT / SETNXEX / RESTORE。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-adapter-implementation-precheck-packet
GET /api/v1/audit/managed-audit-adapter-implementation-precheck-packet?format=markdown
```

接口输出 `precheckState=ready-for-implementation-precheck-review`，意思是“可以进入真实 adapter 实现前的评审”，不是“可以连真实 adapter”。

关键禁用字段：

```text
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
connectsManagedAudit=false
realAdapterWiringAllowed=false
executionAllowed=false
restoreExecutionAllowed=false
automaticUpstreamStart=false
```

## 3. 证据来源

v219 固定消费三条证据：

```text
sourceQualityPass.sourceVersion=Node v218
upstreamReceipts.javaV79.sourceVersion=Java v79
upstreamReceipts.miniKvV88.sourceVersion=mini-kv v88
upstreamReceipts.miniKvV88.receiptDigest=fnv1a64:4aa6d12fb067e2a6
```

Java v79 负责证明 `OpsEvidenceService` 的 receipt / digest / hint / render / record 拆分边界已经只读公开，并且没有改变 API shape、没有写 ledger、没有 SQL、没有 managed audit write。

mini-kv v88 负责证明 runtime evidence command dispatch 已拆出读侧边界，同时没有改写命令、admin 命令、WAL、snapshot、restore，也没有变成订单权威。

## 4. Precheck 判断

本版检查：

```text
nodeV218QualityPassReady=true
javaV79ReceiptAccepted=true
javaV79SplitBoundariesRecorded=true
javaV79NoWriteBoundaryValid=true
miniKvV88ReceiptAccepted=true
miniKvV88DispatchBoundaryValid=true
managedAuditStoreUrlConfigured=true
ownerApprovalStillRequired=true
schemaMigrationStillRequiresReview=true
retentionRecoveryPrerequisitesRecorded=true
failureTaxonomyPrerequisitesRecorded=true
rollbackDisablePathPrerequisitesRecorded=true
javaMiniKvWritesStillBlocked=true
realAdapterWiringStillBlocked=true
upstreamActionsStillDisabled=true
productionAuditStillBlocked=true
```

其中 `ownerApprovalPresent=false`、`schemaMigrationApproved=false` 是刻意保留的生产硬门槛：v219 只是 precheck，不是授权。

## 5. 验证

本版最终验证覆盖：

```text
npm run typecheck：通过
npx vitest run test/managedAuditAdapterImplementationPrecheckPacket.test.ts test/managedAuditRouteHelperQualityPass.test.ts：2 files / 7 tests 通过
npm test：默认 forks 在 Windows 上出现 Vitest worker spawn UNKNOWN；无业务断言失败，已改用受控 threads 重跑
npx vitest run --pool=threads --maxWorkers=4：161 files / 547 tests 通过
npm run build：通过
Chrome screenshot：已生成 c/219/图片/managed-audit-adapter-implementation-precheck-packet-v219.png
Node HTTP smoke：通过，端口 4328，验证后进程已停止
```

HTTP smoke 重点检查：

```text
precheckState=ready-for-implementation-precheck-review
readyForManagedAuditAdapterImplementationPrecheck=true
readyForProductionAudit=false
connectsManagedAudit=false
realAdapterWiringAllowed=false
javaV79ReceiptAccepted=true
miniKvV88ReceiptAccepted=true
v218 quality route 仍然 200
Markdown 200
```

## 6. 清理

本版最终清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
