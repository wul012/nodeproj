# 386 - Node v381 active shard plan evidence intake archive verification 代码讲解

## 版本定位

Node v381 承接 v380。v380 已经消费 Java v157 handoff 与 mini-kv v147 frozen activePrototypePlan evidence；v381 验证的是这次消费的归档完整性与 frozen evidence replay。

本版继续保持边界：

```text
不启动 Java / mini-kv
不停止 Java / mini-kv
不写 Java / mini-kv
不重新执行 live read
不打开 managed audit 连接
不读取 credential value 或 raw endpoint
不启用 active shard prototype
```

## 关键文件

### `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerification.ts`

入口函数是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerification(...)
```

它固定验证 v380 归档根：

```text
e/380
```

并重新调用 v380 service：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake(...)
```

这一步证明 v380 不是依赖当前 sibling workspace rolling current，而是可以从 Node historical fixture 回放：

```text
Java v157 handoff fallback=true
mini-kv v147 snapshot fallback=true
activeShardPrototypeEnabled=false
```

### checks

v381 的 checks 重点包括：

```text
archiveFilesPresent=true
jsonEvidenceReadable=true
jsonEvidenceVersionsMatch=true
jsonActiveShardPrototypeDisabled=true
jsonUsesFrozenHistoricalSnapshots=true
replayUsesFrozenJavaV157AndMiniKvV147=true
replayKeepsActiveShardPrototypeDisabled=true
noAutomaticUpstreamStartStop=true
noUpstreamMutation=true
productionAuditStillBlocked=true
```

最终 summary 为 33/33 checks passed，archive files 11/11，replay 33/33，production blockers 0。

### 路由

`src/routes/auditJsonMarkdownRoutes.ts` 新增：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake-archive-verification
```

同一路由支持 JSON 和 `?format=markdown`。

## 归档

v381 输出：

```text
e/381/evidence/
e/381/图片/
e/381/解释/
docs/plans3/v381-post-java-mini-kv-active-shard-plan-evidence-intake-archive-verification-roadmap.md
```

## 下一步

v381 后没有新的完成冻结证据，也没有 live-read gate 服务启停计划，因此 Node 应暂停。Java / mini-kv 可并行继续，不需要等待 Node。

一句话总结：v381 把 v380 的 active shard plan evidence intake 固化为可审计归档，并证明 Java v157 与 mini-kv v147 可以从冻结证据回放，同时继续关闭 active router 和写路由。
