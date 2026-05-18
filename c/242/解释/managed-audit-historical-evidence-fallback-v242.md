# Node v242 运行调试说明：historical evidence fallback

本版目标是修复 GitHub CI 中旧 v223/v224 managed audit 计划链路的环境差异问题。

## 问题

CI 报错显示：

```text
Expected planState: sandbox-adapter-dry-run-plan-ready
Received planState: blocked
```

本机能通过，是因为本机存在：

```text
D:/javaproj/advanced-order-platform
D:/C/mini-kv
```

GitHub runner 没有这些 sibling 工作区，所以 v223 readiness review 找不到 Java v81 / mini-kv v90 的历史证据，导致 v224 sandbox plan 继承 blocked。

## 修复

v242 把这组历史只读证据固化到 Node 仓库：

```text
fixtures/historical/managed-audit-external-adapter-readiness-review/
```

然后让 `managedAuditExternalAdapterConnectionReadinessReview` 读取这些 fixture。

## 不变边界

```text
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
executionAllowed=false
```

本版不修改 Java / mini-kv，不启动它们，不构建或测试它们。

## 验证

重点验证：

```text
npm exec -- vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts
```

并新增防回归断言：历史证据路径必须来自 Node 仓库内的 `fixtures`，避免后续再次绑定回开发机绝对路径。

本轮实际验证结果：

```text
npm run typecheck：通过
npm exec -- vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts：2 files / 6 tests 通过
npm test：182 files / 613 tests 通过
npm run build：通过
Node HTTP smoke：/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan 返回 200，planState=sandbox-adapter-dry-run-plan-ready
```

截图使用本机 Edge 兜底生成，因为当前机器未找到 Chrome / Chromium。
