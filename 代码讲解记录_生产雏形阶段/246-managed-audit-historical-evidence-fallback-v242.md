# 第二百四十二版代码讲解：managed audit historical evidence fallback

本版目标是修复 GitHub CI 报错：`managedAuditSandboxAdapterDryRunPlan.test.ts` 期望 `planState=sandbox-adapter-dry-run-plan-ready`，但 CI 实际收到 `blocked`。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

计划已经推进到：

```text
Node v241：manual sandbox connection dry-run command package 已完成
Node v242：historical evidence fallback for GitHub CI
```

v242 不是新业务能力，而是生产雏形阶段很重要的 CI 可复现修复：旧 v223/v224 计划链路不能依赖开发机上的 sibling Java / mini-kv 路径。

## 报错原因

失败链路是：

```text
v224 sandbox adapter dry-run plan
  -> 读取 v223 external adapter connection readiness review
  -> v223 读取 Java v81 / mini-kv v90 历史证据
```

原来 `managedAuditExternalAdapterConnectionReadinessReview.ts` 里直接引用本机路径：

```ts
const JAVA_V81_RUNBOOK = "D:/javaproj/advanced-order-platform/c/81/解释/说明.md";
const MINI_KV_V90_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
```

这在开发机能通过，但 GitHub runner 没有 `D:/javaproj` 和 `D:/C/mini-kv`，于是：

```text
javaV81EvidencePresent=false
miniKvV90RuntimeEvidencePresent=false
reviewState=blocked
planState=blocked
```

## historical fixtures

本版新增目录：

```text
fixtures/historical/managed-audit-external-adapter-readiness-review/
```

其中包含：

```text
java-v81-runbook.md
java-v81-walkthrough.md
mini-kv-v90-runbook.md
mini-kv-v90-walkthrough.md
mini-kv-v90-runtime-smoke-evidence.json
mini-kv-v90-verification-manifest.json
```

这些文件不是新事实，而是 v223/v224 老链路所需的历史只读证据快照。它们让 CI 能在 Node 仓库内复现旧证据，不需要 checkout Java / mini-kv。

## 代码改动

`src/services/managedAuditExternalAdapterConnectionReadinessReview.ts` 现在用 `process.cwd()` 拼出仓库内 fixture 根目录：

```ts
const HISTORICAL_EVIDENCE_ROOT = path.join(
  process.cwd(),
  "fixtures",
  "historical",
  "managed-audit-external-adapter-readiness-review",
);
```

历史 Java v81 / mini-kv v90 证据路径改为：

```ts
const JAVA_V81_RUNBOOK = path.join(HISTORICAL_EVIDENCE_ROOT, "java-v81-runbook.md");
const MINI_KV_V90_RUNTIME_SMOKE = path.join(HISTORICAL_EVIDENCE_ROOT, "mini-kv-v90-runtime-smoke-evidence.json");
```

这样 `createEvidenceFiles()`、`createSnippetMatches()` 和 `readMiniKvV90Receipt()` 继续走原来的解析逻辑，只是输入文件从开发机路径变成仓库内 fixture。

## mini-kv receipt 保持原契约

`mini-kv-v90-runtime-smoke-evidence.json` 保留旧链路需要的关键字段：

```json
"project_version":"0.102.0",
"release_version":"v102",
"receipt_digest":"fnv1a64:9bacde73d6d07097",
"consumed_receipt_digest":"fnv1a64:76411286a0913dc8",
"current_artifact_path_hint":"c/102/"
```

它仍然表达同一个边界：

```json
"external_adapter_storage_backend":false,
"participates_in_external_adapter":false,
"credential_read_allowed":false,
"migration_execution_allowed":false,
"managed_audit_write_executed":false
```

所以 v242 只是让旧证据在 CI 可读，不改变 mini-kv 的角色。

## 测试防回归

`test/managedAuditExternalAdapterConnectionReadinessReview.test.ts` 增加断言：

```ts
expect(profile.archivedEvidence.files.every((file) => file.path.includes("fixtures"))).toBe(true);
```

这条断言的意义是：v223 旧证据必须来自 Node 仓库内 fixture，不能再悄悄依赖 `D:/javaproj` 或 `D:/C/mini-kv`。

## 运行调试结果

本轮验证命令：

```text
npm run typecheck
npm exec -- vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts
npm test
npm run build
```

结果：

```text
typecheck 通过
聚焦测试：2 files / 6 tests 通过
全量测试：182 files / 613 tests 通过
build 通过
```

HTTP smoke 使用安全环境变量直接注入 Fastify app，请求：

```text
GET /api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan
```

返回关键字段：

```json
{
  "statusCode": 200,
  "planState": "sandbox-adapter-dry-run-plan-ready",
  "connectsManagedAudit": false,
  "readsManagedAuditCredential": false
}
```

截图归档：

```text
c/242/图片/managed-audit-historical-evidence-fallback-v242.png
```

当前机器未找到 Chrome / Chromium，本轮截图使用本机 Edge 兜底。

## 为什么不改测试期望

不能把测试改成允许 `planState=blocked`。因为 v224 的语义本来就是：

```text
sandbox adapter dry-run plan ready
```

它只是计划和 profile，不打开连接、不读取 credential、不写状态。CI 缺文件导致 blocked 是环境问题，不是业务状态真的 blocked。

## 安全边界

本版继续保持：

```text
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
executionAllowed=false
restoreExecutionAllowed=false
automaticUpstreamStart=false
```

没有修改 Java / mini-kv，没有启动、构建或测试上游项目。
