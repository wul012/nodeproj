# Node v216 managed audit dry-run adapter archive verification 代码讲解

## 模块角色

v216 是 v215 dry-run adapter candidate 的归档复核版：

```text
v215：Node 本地 JSONL dry-run adapter candidate
v216：验证 v215 archive 是否完整、可复查、没有被误解成真实 adapter
```

它不调用 v215 endpoint。原因很明确：v215 endpoint 会重新写 `.tmp` 本地 dry-run 文件；而 v216 只应该复查已经归档的证据，不应该重新制造一轮 dry-run 行为。

## 1. 服务入口

文件：[managedAuditDryRunAdapterArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterArchiveVerification.ts)

```ts
export function loadManagedAuditDryRunAdapterArchiveVerification(input: {
  config: AppConfig;
}): ManagedAuditDryRunAdapterArchiveVerificationProfile
```

入口只接收 `AppConfig`，不接收 Java / mini-kv client，也不接收 v215 adapter runtime。这个设计把 v216 固定为 archive verification，而不是 adapter rerun。

## 2. 归档文件清单

文件：[managedAuditDryRunAdapterArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterArchiveVerification.ts)

```ts
const ARCHIVE_PATHS = Object.freeze({
  html: "c/215/managed-audit-dry-run-adapter-candidate-v215.html",
  screenshot: "c/215/图片/managed-audit-dry-run-adapter-candidate-v215.png",
  explanation: "c/215/解释/managed-audit-dry-run-adapter-candidate-v215.md",
  walkthrough: "代码讲解记录_生产雏形阶段/219-managed-audit-dry-run-adapter-candidate-v215.md",
  activePlan: "docs/plans/v215-post-dry-run-adapter-roadmap.md",
  previousPlanCloseout: "docs/plans/v213-post-restore-drill-plan-roadmap.md",
});
```

这组文件覆盖 v215 的人机两类证据：运行截图/HTML/解释给人工复查，代码讲解/计划文件给工程审计。

## 3. 文件证据

文件：[managedAuditDryRunAdapterArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterArchiveVerification.ts)

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

每个归档文件都会记录 `exists / sizeBytes / sha256 digest`。如果后续文件缺失或内容漂移，v216 profile 会直接变成 blocked。

## 4. 片段证据

文件：[managedAuditDryRunAdapterArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterArchiveVerification.ts)

```ts
snippet("source-candidate-state", ARCHIVE_PATHS.explanation, "candidateState=local-dry-run-adapter-verified")
snippet("source-mini-kv-digest", ARCHIVE_PATHS.explanation, "receiptDigest=fnv1a64:f39d8e3ef98654ea")
snippet("source-cleanup", ARCHIVE_PATHS.explanation, "dryRunDirectoryRemoved=true")
```

这些 snippet 锁住 v215 的关键结果：

```text
candidate 确实 verified
Java v77 / mini-kv v86 回执被记录
本地 JSONL dry-run 确实 append/query/digest/cleanup
HTTP smoke 结果已经归档
```

## 5. 不复跑 v215 的保护

文件：[managedAuditDryRunAdapterArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterArchiveVerification.ts)

```ts
archiveVerificationRerunsSourceEndpoint: false
localDryRunWritePerformed: false
noArchiveVerificationLocalDryRunRerun: true
```

这是 v216 和 v215 最大的区别：v215 做本地 dry-run 写入；v216 只检查 v215 已经留下的归档证据，不再写 `.tmp`。

## 6. forbidden operations

文件：[managedAuditDryRunAdapterArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterArchiveVerification.ts)

```ts
forbiddenOperationsRecorded:
  snippetMatched("forbid-real-managed-audit")
  && snippetMatched("forbid-java-write")
  && snippetMatched("forbid-mini-kv-restore")
```

v216 继续确认归档里写明：

```text
不连接真实 managed audit
不执行 Java approval / ledger / SQL / deployment / rollback
不执行 mini-kv LOAD / COMPACT / SETNXEX / RESTORE
```

## 7. ready 计算

文件：[managedAuditDryRunAdapterArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterArchiveVerification.ts)

```ts
checks.readyForManagedAuditDryRunAdapterArchiveVerification = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditDryRunAdapterArchiveVerification")
  .every(([, value]) => value);
```

ready 由所有归档检查共同决定，而不是手写常量。只要截图、解释、代码讲解、plan、核心片段或 runtime config 任一项不满足，`verificationState` 就会变成 `blocked`。

## 8. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification",
```

接口支持：

```text
/api/v1/audit/managed-audit-dry-run-adapter-archive-verification
/api/v1/audit/managed-audit-dry-run-adapter-archive-verification?format=markdown
```

## 本版项目进度

v216 把 v215 的“本地 adapter candidate”从一次运行结果，推进成可复查的 archive verification。下一步应该由 Java v78 + mini-kv v87 并行补真实 adapter 前硬门槛回执，然后 Node v217 再做 production-hardening readiness gate。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditDryRunAdapterArchiveVerification.test.ts，3 tests 已通过
聚焦稳定性回归：managed audit dry-run 相关 6 files / 18 tests 已通过
全量测试：158 files / 536 tests 已通过
npm run build：已通过
Chrome screenshot：c/216/图片/managed-audit-dry-run-adapter-archive-verification-v216.png 已生成
HTTP smoke：127.0.0.1:4322，verificationState=verified-dry-run-adapter-archive
HTTP smoke：ready=true，readyForProductionAudit=false，connectsManagedAudit=false，restoreExecutionAllowed=false，archiveVerificationRerunsSourceEndpoint=false，localDryRunWritePerformed=false，matchedSnippetCount=21，Markdown 200
```
