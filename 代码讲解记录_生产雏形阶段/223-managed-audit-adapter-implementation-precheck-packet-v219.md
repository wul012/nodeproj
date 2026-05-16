# Node v219 managed audit adapter implementation precheck packet 代码讲解

## 模块角色

v219 是真实 managed audit adapter wiring 前的最小 precheck：

```text
Node v218：audit route/helper quality pass
Java v79：OpsEvidenceService quality split receipt
mini-kv v88：command dispatch quality receipt
Node v219：implementation precheck packet
```

它的关键语义是：可以进入 implementation precheck review，但还不能连真实 adapter，也不能生产写审计。

## 1. 服务入口

文件：[managedAuditAdapterImplementationPrecheckPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterImplementationPrecheckPacket.ts)

```ts
export function loadManagedAuditAdapterImplementationPrecheckPacket(input: {
  config: AppConfig;
}): ManagedAuditAdapterImplementationPrecheckPacketProfile
```

入口只接收 `AppConfig`，不接收 Java / mini-kv client，也不接收真实 managed audit client。所以 v219 不会启动或调用另外两个项目，也不会连接外部审计系统。

## 2. 消费 Node v218

文件：[managedAuditAdapterImplementationPrecheckPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterImplementationPrecheckPacket.ts)

```ts
const sourceQualityPass = loadManagedAuditRouteHelperQualityPass({ config: input.config });
```

v219 先消费 v218 的质量收口结果，确认 Node 自己的 audit route/helper 结构已经可维护，不是在混乱路由上继续堆真实 adapter。

## 3. Java v79 回执

文件：[managedAuditAdapterImplementationPrecheckPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterImplementationPrecheckPacket.ts)

```ts
interface JavaV79OpsEvidenceServiceQualitySplitReceipt {
  sourceVersion: "Java v79";
  responsibilityBoundaries: readonly ["receipt", "digest", "hint", "render", "record"];
  apiShapeChanged: false;
  approvalLedgerWritten: false;
  managedAuditStoreWritten: false;
  sqlExecuted: false;
}
```

Java v79 证明 `OpsEvidenceService` 后续拆分边界已经公开，但没有改变 API shape、没有写 ledger、没有 SQL、没有 managed audit store write。

## 4. mini-kv v88 回执

文件：[managedAuditAdapterImplementationPrecheckPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterImplementationPrecheckPacket.ts)

```ts
interface MiniKvV88CommandDispatchQualityReceipt {
  receiptDigest: "fnv1a64:4aa6d12fb067e2a6";
  dispatchSplitApplied: true;
  writeHandlerChanged: false;
  adminHandlerChanged: false;
  walSnapshotRestoreTouched: false;
  behaviorChanged: false;
  fixtureContractPreserved: true;
}
```

mini-kv v88 证明读侧 runtime evidence command dispatch 已整理，但写命令、admin、WAL、snapshot、restore 都没有被触碰。

## 5. Implementation precheck

文件：[managedAuditAdapterImplementationPrecheckPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterImplementationPrecheckPacket.ts)

```ts
const implementationPrecheck = {
  configSwitchReady: checks.managedAuditStoreUrlConfigured,
  ownerApprovalRequired: true,
  ownerApprovalPresent: false,
  schemaMigrationRequired: true,
  schemaMigrationApproved: false,
  dryRunOnly: true,
  productionAuditAllowed: false,
};
```

这里最重要的是两组 false：

```text
ownerApprovalPresent=false
schemaMigrationApproved=false
```

它们说明 v219 不是授权版本，只是把真实 adapter 实现前必须审查的门槛摆出来。

## 6. ready 计算

文件：[managedAuditAdapterImplementationPrecheckPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterImplementationPrecheckPacket.ts)

```ts
checks.readyForManagedAuditAdapterImplementationPrecheck = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditAdapterImplementationPrecheck")
  .every(([, value]) => value);
```

ready 由 Node v218、Java v79、mini-kv v88、安全配置和阻断边界共同决定。只要任一证据缺失或 `UPSTREAM_ACTIONS_ENABLED=true`，precheck 就会 blocked。

## 7. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet",
```

v219 继续使用 v218 抽出的公共 route registrar，所以新增路由不再复制 schema + Markdown 分支。

## 8. 测试覆盖

文件：[managedAuditAdapterImplementationPrecheckPacket.test.ts](D:/nodeproj/orderops-node/test/managedAuditAdapterImplementationPrecheckPacket.test.ts)

```ts
expect(profile).toMatchObject({
  precheckState: "ready-for-implementation-precheck-review",
  readyForProductionAudit: false,
  connectsManagedAudit: false,
  realAdapterWiringAllowed: false,
});
```

测试还覆盖：

```text
AUDIT_STORE_URL 缺失会 blocked
UPSTREAM_ACTIONS_ENABLED=true 会 blocked
JSON / Markdown 路由可用
v218 quality route 仍然可用
```

## 本版项目进度

v219 把“真实 adapter 可以怎么开始”从口头计划推进成可测试 precheck。下一步应另起 post-v219 计划，先做 `ManagedAuditAdapter` interface + disabled shell；不要直接连接真实外部 managed audit。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditAdapterImplementationPrecheckPacket.test.ts + test/managedAuditRouteHelperQualityPass.test.ts，7 tests 已通过
全量测试：默认 forks 在 Windows 上出现 Vitest worker spawn UNKNOWN；无业务断言失败，随后使用 npx vitest run --pool=threads --maxWorkers=4，161 files / 547 tests 已通过
npm run build：已通过
Chrome screenshot：已生成 c/219/图片/managed-audit-adapter-implementation-precheck-packet-v219.png
HTTP smoke：端口 4328 已通过，precheckState=ready-for-implementation-precheck-review，readyForProductionAudit=false，realAdapterWiringAllowed=false，服务已停止
```
