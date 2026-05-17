# Node v236 运行调试说明：managed audit manual sandbox connection dry-run request envelope

本版来源计划：

```text
D:\nodeproj\orderops-node\docs\plans\v235-post-precondition-intake-roadmap.md
```

v236 的目标不是打开 managed audit sandbox connection，而是消费 v235 的 precondition intake，把六类前置条件整理成一个可审计的 dry-run request envelope。这个 envelope 只携带字段名、marker id 和 timeout budget，不包含 credential value，不包含 schema SQL，不包含真实连接指令。

## 本版结果

核心 profile：

```text
managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1
```

运行状态：

```text
envelopeState=manual-sandbox-connection-dry-run-request-envelope-ready
readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
readOnlyReview=true
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

dry-run envelope：

```text
requestMode=manual-sandbox-connection-dry-run-request-envelope-only
requiredPreconditionCount=6
documentedPreconditionCount=6
operatorReviewFieldCount=6
credentialHandleOnly=true
credentialValueIncluded=false
timeoutBudgetMs=15000
readyForOperatorReview=true
actualConnectionAttempted=false
schemaMigrationRequested=false
managedAuditStateWriteRequested=false
upstreamServiceAutoStartRequested=false
miniKvPermissionRequested=false
```

这说明 v236 只是生成“给人工审核看的请求信封”，不是连接批准。

## 关键代码

新增服务：

```text
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionDryRunRequestEnvelope.ts
```

关键入口：

```text
loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope()
```

它先读取 Node v235：

```text
loadManagedAuditManualSandboxConnectionPreconditionIntake()
```

然后生成：

```text
createSourceNodeV235()
createOperatorReviewFields()
createDryRunRequestEnvelope()
createChecks()
collectProductionBlockers()
```

## 路由

新增路由注册在：

```text
D:\nodeproj\orderops-node\src\routes\auditRoutes.ts
```

接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope
GET /api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope?format=markdown
```

它继续使用：

```text
registerAuditJsonMarkdownRoute()
```

所以没有新增手写 JSON/Markdown 分支。

## 操作员 review 字段

v236 固化六个必须人工 review 的字段：

```text
owner-approval-artifact -> ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID
credential-handle-review -> ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
schema-rehearsal-evidence -> ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID
rollback-path -> ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID
timeout-budget -> timeoutBudgetMs
manual-abort-marker -> ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT
```

每个字段都固定为：

```text
secretValueAllowed=false
operatorMustReview=true
envelopeCarriesValue=false
```

## 测试

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditManualSandboxConnectionDryRunRequestEnvelope.test.ts
```

覆盖三类场景：

```text
1. 正常配置下生成 ready profile，六个 operatorReviewFields 完整且不携带 secret value。
2. UPSTREAM_ACTIONS_ENABLED=true 时 envelope readiness 阻断，且仍不尝试连接或读取 credential。
3. JSON / Markdown 路由均可访问，并返回 v236 profile。
```

已完成验证：

```text
npm run typecheck
结果：通过

npx vitest run test/managedAuditManualSandboxConnectionPreconditionIntake.test.ts test/managedAuditManualSandboxConnectionDryRunRequestEnvelope.test.ts
结果：2 个测试文件通过，6 个用例通过

npm run build
结果：通过

npm test
结果：177 个测试文件通过，598 个用例通过

git diff --check
结果：通过，无空白错误
```

HTTP smoke 使用安全环境变量，只启动 Node 本服务，不启动 Java / mini-kv：

```text
PORT=4327
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
AUDIT_STORE_URL=managed-audit://contract-only
```

HTTP smoke 结果：

```text
GET /health -> status=ok
GET /api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope -> 200
GET /api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope?format=markdown -> 200 text/markdown
profileVersion=managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1
envelopeState=manual-sandbox-connection-dry-run-request-envelope-ready
operatorReviewFieldCount=6
credentialValueIncluded=false
actualConnectionAttempted=false
readyForOperatorReview=true
connectsManagedAudit=false
readsManagedAuditCredential=false
```

截图：

```text
D:\nodeproj\orderops-node\c\236\图片\managed-audit-manual-sandbox-connection-dry-run-request-envelope-v236.png
```

## 边界

本版没有做：

```text
没有打开 managed audit sandbox connection
没有读取 credential value
没有执行 schema migration
没有写 managed audit 状态
没有写 Java ledger 或执行 Java SQL
没有执行 mini-kv 写命令、LOAD、COMPACT、RESTORE
没有自动启动 Java / mini-kv
没有打开 production window
```

## 成熟度变化

v235 证明“连接前置条件齐备”；v236 把这些条件整理成 dry-run request envelope。这样下一步 Java v92 / mini-kv v101 可以并行只读回显这个 envelope 的边界，Node v237 再做 readiness gate。

下一步是：

```text
推荐并行：Java v92 + mini-kv v101
```
