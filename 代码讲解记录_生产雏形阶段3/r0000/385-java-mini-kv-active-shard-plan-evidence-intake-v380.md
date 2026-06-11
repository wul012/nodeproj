# 385 - Node v380 active shard plan evidence intake 代码讲解

## 版本定位

Node v380 承接 v379。v379 已验证 v378 completed shard-readiness evidence intake 归档，v380 则消费新的上游完成证据：

```text
Java v157: shard readiness evidence handoff
mini-kv v147: frozen activePrototypePlan evidence, produced by mini-kv v148
```

本版不是 live read，也不是 active sharding。它只做冻结证据消费，并继续关闭 Java / mini-kv 启停、上游写入、managed audit 连接、credential value、raw endpoint 和 active router。

## 关键文件

### `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake.ts`

入口函数是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake(...)
```

它读取三个输入：

```text
e/379/evidence/java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification-v379-http.json
D:/javaproj/advanced-order-platform/e/157/evidence/java-shard-readiness-evidence-handoff-v157.json
D:/C/mini-kv/fixtures/release/shard-readiness-v147.json
```

Java 和 mini-kv 路径都走 `historicalEvidenceResolver`。在 Node 仓库中，实际冻结副本位于：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/157/evidence/java-shard-readiness-evidence-handoff-v157.json
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v147.json
```

这避免了 Node v380 依赖 sibling workspace 的 rolling current。

### v380 检查

核心 checks 覆盖：

```text
Node v379 ready=true
Java v157 status=passed
Java v157 references Java v155 + Java v156
Java v157 consumer rules prohibit rolling current and Node-owned service lifecycle
mini-kv v147 releaseVersion=v147
mini-kv v147 activePrototypePlan exists
activeShardPrototypeAllowed=false
routerActivationAllowed=false
writeRoutingAllowed=false
allEvidenceUsesHistoricalFallbackSnapshots=true
```

最终 summary 是 33/33 checks passed，production blockers 为 0。

### 路由

`src/routes/auditJsonMarkdownRoutes.ts` 新增：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake
```

同一路由支持 JSON 和 `?format=markdown`。

## 测试与归档

Focused test：

```text
npm test -- test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake.test.ts
```

结果：1 file / 4 tests passed。

Typecheck：

```text
npm run typecheck
```

结果：passed。

归档写入：

```text
e/380/evidence/
e/380/图片/
e/380/解释/
docs/plans3/v380-post-java-mini-kv-active-shard-plan-evidence-intake-roadmap.md
```

## 下一步

Node v381 应做 v380 archive verification，验证 `e/380` 归档完整，并强制 historical fixture fallback。Java / mini-kv 可以并行继续，但 Node live-read gate 仍需要单独服务启停计划。

一句话总结：v380 把 Java v157 handoff 与 mini-kv v147 activePrototypePlan frozen baseline 收进 Node 可复现证据链，同时继续把 active router、write routing 和生产执行关在只读边界之外。
