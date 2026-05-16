# Node v214 managed audit restore drill archive verification 代码讲解

## 模块角色

v214 是 v213 restore drill plan 的归档复核版：

```text
v211：生成本地 dry-run packet
v212：复核 packet shape / digest / provenance / cleanup
v213：生成 restore drill plan
v214：验证 v213 归档证据完整、可复查、仍保持安全边界
```

它不是 adapter，也不是 restore executor。它只读文件系统中的归档证据，并输出一个可被后续 v215 消费的 archive verification profile。

## 1. 服务入口

文件：[managedAuditRestoreDrillArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditRestoreDrillArchiveVerification.ts)

```ts
export function loadManagedAuditRestoreDrillArchiveVerification(input: {
  config: AppConfig;
}): ManagedAuditRestoreDrillArchiveVerificationProfile
```

这里故意只接收 `AppConfig`，不接收 Java / mini-kv client。这样从函数签名层面就能看出：v214 不会重新触发上游联调，也不会复跑 v213 的源 endpoint 链路。

## 2. 归档文件清单

文件：[managedAuditRestoreDrillArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditRestoreDrillArchiveVerification.ts)

```ts
const ARCHIVE_PATHS = Object.freeze({
  html: "c/213/managed-audit-packet-restore-drill-plan-v213.html",
  screenshot: "c/213/图片/managed-audit-packet-restore-drill-plan-v213.png",
  explanation: "c/213/解释/managed-audit-packet-restore-drill-plan-v213.md",
  walkthrough: "代码讲解记录_生产雏形阶段/217-managed-audit-packet-restore-drill-plan-v213.md",
  activePlan: "docs/plans/v213-post-restore-drill-plan-roadmap.md",
  previousPlanCloseout: "docs/plans/v211-post-managed-audit-packet-roadmap.md",
});
```

这组路径绑定了 v214 要消费的 v213 证据面：HTML、截图、解释、代码讲解、当前计划和上一阶段收口计划。它验证的是“v213 是否可归档和复查”，不是重新证明 Java / mini-kv 当前运行状态。

## 3. 文件证据

文件：[managedAuditRestoreDrillArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditRestoreDrillArchiveVerification.ts)

```ts
function createFileEvidence(id: string, relativePath: string): ArchiveFileEvidence {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  if (!existsSync(absolutePath)) {
    return { id, path: relativePath, exists: false, sizeBytes: 0, digest: null };
  }

  const content = readFileSync(absolutePath);
  return {
    id,
    path: relativePath,
    exists: true,
    sizeBytes: statSync(absolutePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}
```

每个归档文件都会记录：

```text
exists
sizeBytes
sha256 digest
```

后续如果归档文件被误删、变成 0 字节或内容漂移，v214 profile 会直接反映出来。

## 4. 片段证据

文件：[managedAuditRestoreDrillArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditRestoreDrillArchiveVerification.ts)

```ts
snippet("source-drill-state", ARCHIVE_PATHS.explanation, "drillState=ready-for-manual-dry-run-plan")
snippet("source-mini-kv-marker", ARCHIVE_PATHS.explanation, "fnv1a64:1ea4570c967cfdb1")
snippet("normalized-mini-kv-evidence", ARCHIVE_PATHS.explanation, "miniKvV85RuntimeSmokeEvidence=fixtures/release/runtime-smoke-evidence.json")
```

这些 snippet 不是为了测试文案，而是为了锁住 v213 的关键 contract：

```text
v213 确实 ready
v213 确实消费 Java v76 / mini-kv v85
mini-kv marker digest 没丢
evidence hints 使用项目相对路径
HTTP smoke 结果被记录
```

## 5. 禁止操作复核

文件：[managedAuditRestoreDrillArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditRestoreDrillArchiveVerification.ts)

```ts
forbiddenOperationsRecorded:
  snippetMatched("forbid-real-managed-audit")
  && snippetMatched("forbid-java-decision")
  && snippetMatched("forbid-mini-kv-restore")
```

它检查 v213 归档里仍然写明三类禁止项：

```text
不能连接真实 managed audit adapter
不能创建 Java approval decision
不能执行 mini-kv LOAD / COMPACT / SETNXEX / RESTORE
```

这对后续 v215 很重要：v215 即使开始做 dry-run adapter candidate，也必须被 v214 的归档验证结果约束住。

## 6. ready 计算

文件：[managedAuditRestoreDrillArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditRestoreDrillArchiveVerification.ts)

```ts
checks.readyForManagedAuditRestoreDrillArchiveVerification = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditRestoreDrillArchiveVerification")
  .every(([, value]) => value);
```

ready 不是手写常量，而是由所有检查项共同决定。只要归档文件、关键片段、计划收口、上游动作开关等任一项不满足，`verificationState` 就会变成 `blocked`。

## 7. runtime config gate

文件：[managedAuditRestoreDrillArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditRestoreDrillArchiveVerification.ts)

```ts
upstreamActionsStillDisabled: !config.upstreamActionsEnabled
```

即使 v214 只是读归档，它仍然检查 `UPSTREAM_ACTIONS_ENABLED`。如果运行配置把上游动作打开，本版会直接 blocked，避免 archive verification 在危险配置下被误解为可以继续推进生产审计。

## 8. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-audit-restore-drill-archive-verification",
```

接口支持：

```text
/api/v1/audit/managed-audit-restore-drill-archive-verification
/api/v1/audit/managed-audit-restore-drill-archive-verification?format=markdown
```

JSON 给机器消费，Markdown 给人工复查和归档说明使用。

## 9. 测试重点

文件：[managedAuditRestoreDrillArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditRestoreDrillArchiveVerification.test.ts)

```ts
expect(profile).toMatchObject({
  verificationState: "verified-restore-drill-archive",
  readyForProductionAudit: false,
  restoreExecutionAllowed: false,
  archiveVerificationRerunsSourceEndpoint: false,
});
```

测试覆盖三类场景：

```text
正常归档验证通过
UPSTREAM_ACTIONS_ENABLED=true 时 blocked
JSON / Markdown 路由可访问
```

## 本版项目进度

v214 把 v213 restore drill plan 从“做出来”推进到“可归档、可复查、可作为 v215 前置证据”。这一步仍然不是生产级 managed audit adapter，但它让下一版 adapter candidate 有了更清楚的证据边界：

```text
先确认 v213 证据可靠
再等 Java v77 + mini-kv v86 给出 no-write 回执
最后 Node v215 做本地 dry-run adapter candidate
```

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditRestoreDrillArchiveVerification.test.ts，3 tests 已通过
全量测试：156 files / 530 tests 已通过
npm run build：已通过
Chrome screenshot：c/214/图片/managed-audit-restore-drill-archive-verification-v214.png 已生成
HTTP smoke：127.0.0.1:4320，verificationState=verified-restore-drill-archive
HTTP smoke：ready=true，readyForProductionAudit=false，restoreExecutionAllowed=false，archiveVerificationRerunsSourceEndpoint=false，matchedSnippetCount=18，Markdown 200
```
