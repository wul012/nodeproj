# Node v223 managed audit external adapter connection readiness review 代码讲解

## 模块角色

v223 是真实外部 managed audit adapter 连接前的 review，不是连接实现：

```text
Node v222：验证本地 adapter candidate 归档，不重跑 dry-run
Java v81：提供 owner / schema / credential migration guard
mini-kv v90：提供 external adapter non-participation receipt
Node v223：把三边证据汇总成 connection readiness review
```

它的结论可以是 `ready-for-external-adapter-connection-review`，但仍保持 `readyForProductionAudit=false`。

## 1. 服务入口

文件：[managedAuditExternalAdapterConnectionReadinessReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditExternalAdapterConnectionReadinessReview.ts)

```ts
export function loadManagedAuditExternalAdapterConnectionReadinessReview(input: {
  config: AppConfig;
}): ManagedAuditExternalAdapterConnectionReadinessReviewProfile {
```

入口只接收 `AppConfig`，没有 Java client、mini-kv client 或 audit store 依赖。v223 消费的是三边归档证据，不启动上游服务，也不连接真实外部 managed audit。

## 2. 消费 Node v222

文件：[managedAuditExternalAdapterConnectionReadinessReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditExternalAdapterConnectionReadinessReview.ts)

```ts
const nodeV222 = loadManagedAuditLocalAdapterCandidateVerificationReport({ config: input.config });
```

这里复用 v222 的 verification report，而不是回头调用 v221 dry-run endpoint。v223 只要求：

```text
nodeV222.reportState=local-adapter-candidate-verification-ready
sourceEndpointRerunPerformed=false
additionalLocalDryRunWritePerformed=false
```

## 3. Java v81 evidence

文件：[managedAuditExternalAdapterConnectionReadinessReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditExternalAdapterConnectionReadinessReview.ts)

```ts
const JAVA_V81_RUNBOOK = "D:/javaproj/advanced-order-platform/c/81/解释/说明.md";
const JAVA_V81_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/85-version-81-release-approval-managed-audit-external-adapter-migration-guard-receipt.md";
```

v223 通过 snippet 锁住 Java v81 的关键边界：

```text
ownerApprovalRequiredBeforeConnection=true
schemaMigrationReviewRequired=true
credentialReviewRequired=true
credentialValueReadByJava=false
externalManagedAuditConnectionOpened=false
javaSqlExecuted=false
```

这说明 Java v81 已经给下一步真实 adapter 前的 owner / schema / credential review 留出门槛，但没有替 Node 打开生产连接。

## 4. mini-kv v90 fixture

文件：[managedAuditExternalAdapterConnectionReadinessReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditExternalAdapterConnectionReadinessReview.ts)

```ts
const MINI_KV_V90_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
```

v223 不靠文案猜 mini-kv receipt，而是读取 v90 fixture：

```ts
const parsed = JSON.parse(readFileSync(MINI_KV_V90_RUNTIME_SMOKE, "utf8")) as {
  managed_audit_external_adapter_non_participation_receipt?: Record<string, unknown>;
};
```

然后把 snake_case 字段转成 Node profile：

```text
receiptDigest=fnv1a64:0dfb07cd2f8de289
consumedReceiptDigest=fnv1a64:76411286a0913dc8
externalAdapterStorageBackend=false
participatesInExternalAdapter=false
credentialReadAllowed=false
migrationExecutionAllowed=false
```

如果 fixture 缺字段，代码会把对应值设成 `missing` 或高风险 `true`，从而让 checks 失败，而不是默认放行。

## 5. readiness digest

文件：[managedAuditExternalAdapterConnectionReadinessReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditExternalAdapterConnectionReadinessReview.ts)

```ts
const readinessDigest = sha256StableJson({
  profileVersion: "managed-audit-external-adapter-connection-readiness-review.v1",
  reviewState,
  nodeV222Digest: nodeV222.verification.reportDigest,
  javaV81ReceiptVersion: javaV81.receiptVersion,
  miniKvV90ReceiptDigest: miniKvV90.receiptDigest,
  checks,
});
```

这个 digest 把 Node v222、Java v81、mini-kv v90 的证据链压成 v223 自己的 review 指纹。它不是生产 audit record，也不包含 credential value。

## 6. 关键 checks

文件：[managedAuditExternalAdapterConnectionReadinessReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditExternalAdapterConnectionReadinessReview.ts)

```ts
miniKvV90ReceiptAccepted: miniKvV90.receiptDigest === "fnv1a64:0dfb07cd2f8de289"
  && miniKvV90.consumedReceiptDigest === "fnv1a64:76411286a0913dc8"
```

```ts
javaV81CredentialBoundaryValid: snippetMatched(snippets, "java-v81-credential-review")
  && snippetMatched(snippets, "java-v81-no-credential-read")
```

```ts
realExternalAdapterStillDisconnected: true,
credentialStillUnread: true,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

v223 允许“进入 review”，但同时要求真实连接、credential 读取、migration 和生产 audit 都继续关闭。

## 7. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-external-adapter-connection-readiness-review",
  () => loadManagedAuditExternalAdapterConnectionReadinessReview({ config: deps.config }),
  renderManagedAuditExternalAdapterConnectionReadinessReviewMarkdown,
);
```

路由继续走 `registerAuditJsonMarkdownRoute`，没有新增重复 querystring schema。

## 8. 测试覆盖

文件：[managedAuditExternalAdapterConnectionReadinessReview.test.ts](D:/nodeproj/orderops-node/test/managedAuditExternalAdapterConnectionReadinessReview.test.ts)

```ts
expect(profile).toMatchObject({
  reviewState: "ready-for-external-adapter-connection-review",
  readyForProductionAudit: false,
  connectsManagedAudit: false,
  readsManagedAuditCredential: false,
});
```

测试覆盖：

```text
默认配置：三边证据通过，v223 ready for review
UPSTREAM_ACTIONS_ENABLED=true：review blocked，但仍不连接、不读 credential
JSON / Markdown route：接口可用，Markdown 包含 PREPARE_SANDBOX_ADAPTER_DRY_RUN
```

## 本版项目进度

v223 完成后，managed audit 主线已经走到：

```text
disabled shell
 -> local adapter candidate dry-run
 -> archive verification
 -> external adapter connection readiness review
```

下一阶段不能直接连生产，应另起计划做 sandbox-only external adapter dry-run plan：先定义测试 credential、schema migration rehearsal、owner approval artifact 和失败回滚路径。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditExternalAdapterConnectionReadinessReview.test.ts + test/managedAuditLocalAdapterCandidateVerificationReport.test.ts，6 tests 已通过
全量测试：npx vitest run --pool=threads --maxWorkers=4，165 files / 562 tests 已通过
npm run build：已通过
Chrome screenshot：已生成 c/223/图片/managed-audit-external-adapter-connection-readiness-review-v223.png
HTTP smoke：端口 4332 已通过，reviewState=ready-for-external-adapter-connection-review，readyForProductionAudit=false，connectsManagedAudit=false，readsManagedAuditCredential=false，服务已停止
```
