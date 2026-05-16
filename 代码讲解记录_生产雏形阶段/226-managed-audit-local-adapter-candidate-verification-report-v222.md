# Node v222 managed audit local adapter candidate verification report 代码讲解

## 模块角色

v222 接在 v221 之后，但它不是第二次 dry-run：

```text
Node v221：本地 JSONL adapter candidate append/query/digest/cleanup
Node v222：只读验证 v221 归档证据
Java v81 + mini-kv v90：下一步推荐并行补真实外部 adapter 前 guard
Node v223：消费三边 guard 后做 connection readiness review
```

它的核心价值是把 v221 的临时写入演练收束为可审计的归档验证，而不是再制造一条新的 `.tmp` 记录。

## 1. 服务入口

文件：[managedAuditLocalAdapterCandidateVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateVerificationReport.ts)

```ts
export function loadManagedAuditLocalAdapterCandidateVerificationReport(input: {
  config: AppConfig;
}): ManagedAuditLocalAdapterCandidateVerificationReportProfile {
```

入口只需要 `AppConfig`，没有 `orderPlatform`、`miniKv`、`auditLog` 参数。这是故意的：v222 不应该访问 Java、mini-kv 或真实 audit store，只能读取本地归档文件。

## 2. 归档文件白名单

文件：[managedAuditLocalAdapterCandidateVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateVerificationReport.ts)

```ts
const ARCHIVE_PATHS = Object.freeze({
  html: "c/221/managed-audit-local-adapter-candidate-dry-run-v221.html",
  screenshot: "c/221/图片/managed-audit-local-adapter-candidate-dry-run-v221.png",
  explanation: "c/221/解释/managed-audit-local-adapter-candidate-dry-run-v221.md",
  walkthrough: "代码讲解记录_生产雏形阶段/225-managed-audit-local-adapter-candidate-dry-run-v221.md",
  activePlan: "docs/plans/v221-post-local-adapter-candidate-roadmap.md",
  previousPlanCloseout: "docs/plans/v219-post-implementation-precheck-roadmap.md",
});
```

这里没有把 v221 endpoint 当数据源。v222 验证的是已经落盘的归档证据，所以测试和 HTTP smoke 都不会再次触发 v221 的本地 JSONL 写入。

## 3. 文件摘要

文件：[managedAuditLocalAdapterCandidateVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateVerificationReport.ts)

```ts
function archiveFile(id: string, relativePath: string): ArchiveFileEvidence {
  const absolutePath = path.join(process.cwd(), relativePath);
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

v222 对每个归档文件生成 sha256 摘要。这样后续 v223 可以消费 v222 的 reportDigest，而不是散读多个历史文件。

## 4. snippet 证据

文件：[managedAuditLocalAdapterCandidateVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateVerificationReport.ts)

```ts
snippet("state-recorded", ARCHIVE_PATHS.explanation, "candidateState=local-adapter-dry-run-verified")
snippet("cleanup-recorded", ARCHIVE_PATHS.explanation, "dryRunDirectoryRemoved=true")
snippet("candidate-class-recorded", ARCHIVE_PATHS.walkthrough, "LocalJsonlManagedAuditAdapterCandidate")
snippet("plan-parallel-v81-v90", ARCHIVE_PATHS.activePlan, "推荐并行：Java v81 + mini-kv v90")
```

这些 snippet 把 v221 的关键事实锁住：

```text
local adapter candidate 已验证
生产审计仍关闭
本地临时目录已清理
Java v80 / mini-kv v89 guard 已被记录
下一步不是 Node 抢跑，而是推荐并行 Java v81 + mini-kv v90
```

## 5. 不重跑 source endpoint

文件：[managedAuditLocalAdapterCandidateVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateVerificationReport.ts)

```ts
sourceEndpointRerunPerformed: false,
additionalLocalDryRunWritePerformed: false,
```

这两个字段比 `ready=true` 更重要。因为 v221 的 source endpoint 会写 `.tmp/managed-audit-v221-*` 再删除；v222 如果为了验证而调用它，就会把“归档验证”变成“二次 dry-run”。本版没有这样做。

## 6. 临时目录检查的并行测试边界

文件：[managedAuditLocalAdapterCandidateVerificationReport.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateVerificationReport.ts)

```ts
currentV221TempDirectoriesAbsent: v221TempDirectoriesPresent === 0,
```

这个字段保留为现场观察，但不作为 v222 ready 的硬阻断项。原因是全量测试并行时，v221 自己的测试可能正在短暂创建 `.tmp/managed-audit-v221-*`。v222 真正依赖的 cleanup 证据来自 v221 归档和代码讲解，而不是某个瞬时目录扫描。

## 7. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report",
  () => loadManagedAuditLocalAdapterCandidateVerificationReport({ config: deps.config }),
  renderManagedAuditLocalAdapterCandidateVerificationReportMarkdown,
);
```

这版继续使用 `registerAuditJsonMarkdownRoute`，没有复制新的 querystring schema / format 分支。也把计划里“迁移旧 audit 路由”的质量方向继续贯彻下去。

## 8. 测试覆盖

文件：[managedAuditLocalAdapterCandidateVerificationReport.test.ts](D:/nodeproj/orderops-node/test/managedAuditLocalAdapterCandidateVerificationReport.test.ts)

```ts
expect(profile).toMatchObject({
  reportState: "local-adapter-candidate-verification-ready",
  readyForProductionAudit: false,
  sourceEndpointRerunPerformed: false,
  additionalLocalDryRunWritePerformed: false,
  connectsManagedAudit: false,
});
```

测试覆盖三类场景：

```text
默认配置：归档文件、snippet、摘要、上游 guard linkage 全部通过
UPSTREAM_ACTIONS_ENABLED=true：report blocked，但仍不写本地 dry-run、不连接 managed audit
JSON / Markdown route：接口可用并返回 v222 report 语义
```

## 本版项目进度

v222 把 v221 本地 adapter candidate 的运行证据固化成 verification report。到这里，Node 已经能证明：

```text
adapter interface 存在
disabled shell 默认安全
local JSONL candidate 可以 dry-run
dry-run 归档可被只读验证
```

但项目仍没有进入真实 managed audit 连接阶段。下一步应该按计划推荐并行推进 Java v81 + mini-kv v90，再由 Node v223 做 connection readiness review。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditLocalAdapterCandidateVerificationReport.test.ts + test/managedAuditLocalAdapterCandidateDryRun.test.ts，7 tests 已通过
全量测试：npx vitest run --pool=threads --maxWorkers=4，164 files / 559 tests 已通过
npm run build：已通过
Chrome screenshot：已生成 c/222/图片/managed-audit-local-adapter-candidate-verification-report-v222.png
HTTP smoke：端口 4331 已通过，reportState=local-adapter-candidate-verification-ready，readyForProductionAudit=false，sourceEndpointRerunPerformed=false，additionalLocalDryRunWritePerformed=false，服务已停止
```
