# 第二百三十六版代码讲解：managed audit manual sandbox connection dry-run request envelope

本版目标是把 v235 的 manual sandbox connection precondition intake 转成一个可审计、可人工 review、但不可执行的 dry-run request envelope。v236 不打开连接，也不读取 credential value，只把六类前置条件字段名和 marker 整理成请求信封，为 Java v92 / mini-kv v101 的并行回显做输入。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v235-post-precondition-intake-roadmap.md
```

计划要求 Node v236 做：

```text
manual sandbox connection dry-run request envelope
消费 Node v235 intake
只放 owner artifact id field、credential handle name、schema rehearsal id、rollback path id、timeout budget、manual abort marker
不读取 credential value
不打开连接
不执行 schema migration
```

这说明当前主线已经从“前置条件 intake”推进到“连接窗口请求信封”。本版完成后，下一步不是继续 Node 抢跑，而是推荐并行：

```text
Java v92 + mini-kv v101
```

## 新增服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionDryRunRequestEnvelope.ts
```

profile 版本是：

```text
managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1
```

服务入口是：

```ts
loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope()
```

入口先读取上一版 Node 证据：

```ts
const sourceNodeV235Profile = loadManagedAuditManualSandboxConnectionPreconditionIntake({
  config: input.config,
});
```

然后构建三组材料：

```ts
const sourceNodeV235 = createSourceNodeV235(sourceNodeV235Profile);
const operatorReviewFields = createOperatorReviewFields(sourceNodeV235Profile);
const dryRunRequestEnvelope = createDryRunRequestEnvelope(sourceNodeV235Profile, operatorReviewFields);
```

这里的设计点是：v236 不再重复读取 Java / mini-kv 文件，而是消费 v235 已经汇总好的 intake digest，避免把同一份上游证据读取逻辑复制到新版本里。

## Node v235 来源检查

v236 读取：

```text
src/services/managedAuditManualSandboxConnectionPreconditionIntake.ts
```

并保留这些字段：

```ts
intakeDigest: source.preconditionIntake.intakeDigest
readyForPreconditionIntake: source.readyForManagedAuditManualSandboxConnectionPreconditionIntake
readyForDryRunRequestEnvelope: source.preconditionIntake.readyForDryRunRequestEnvelope
requiredPreconditionCount: source.preconditionIntake.requiredPreconditionCount
documentedPreconditionCount: source.preconditionIntake.documentedPreconditionCount
handlesOnly: source.preconditionIntake.handlesOnly
readyForSandboxAdapterConnectionFromSource: source.readyForManagedAuditSandboxAdapterConnection
connectsManagedAudit: source.connectsManagedAudit
readsManagedAuditCredential: source.readsManagedAuditCredential
schemaMigrationExecuted: source.schemaMigrationExecuted
managedAuditStateWritten: source.preconditionIntake.managedAuditStateWritten
```

这表示 v235 的边界仍然有效：v236 可以生成 dry-run envelope，但不能打开 adapter connection。

## operatorReviewFields

v236 的第一组核心输出来自：

```ts
function createOperatorReviewFields(...)
```

它生成六个必须人工 review 的字段：

```ts
owner-approval-artifact
credential-handle-review
schema-rehearsal-evidence
rollback-path
timeout-budget
manual-abort-marker
```

每个字段都固定为：

```ts
secretValueAllowed: false
operatorMustReview: true
envelopeCarriesValue: false
```

尤其是 `credential-handle-review`：它只携带字段名 `ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE`，不携带 credential value。

## dryRunRequestEnvelope

v236 的核心汇总函数是：

```ts
function createDryRunRequestEnvelope(...)
```

它输出：

```ts
requestMode: "manual-sandbox-connection-dry-run-request-envelope-only"
requiredPreconditionCount: 6
documentedPreconditionCount: 6
operatorReviewFieldCount: 6
credentialHandleOnly: true
credentialValueIncluded: false
ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"
credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID"
rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID"
timeoutBudgetMs: 15000
manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT"
```

并且继续强制执行边界：

```ts
actualConnectionAttempted: false
schemaMigrationRequested: false
managedAuditStateWriteRequested: false
upstreamServiceAutoStartRequested: false
miniKvPermissionRequested: false
readyForManagedAuditSandboxAdapterConnection: false
```

`readyForOperatorReview=true` 只代表 envelope 可以进入人工 review，不代表连接已批准。

## checks

`createChecks()` 把来源 intake 和 envelope 结构合成 readiness：

```ts
sourceNodeV235PreconditionIntakeReady
sourceIntakeDigestPresent
sourceReadyForDryRunRequestEnvelope
sourceStillBlocksSandboxAdapterConnection
requiredPreconditionsCarried
envelopeDigestPresent
operatorReviewFieldsComplete
credentialHandleOnly
noCredentialValueIncluded
noConnectionAttempted
noSchemaMigrationRequested
noManagedAuditStateWriteRequested
noUpstreamServiceAutoStartRequested
noMiniKvPermissionRequested
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

最后：

```ts
checks.readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope")
  .every(([, value]) => value);
```

这让 v236 的 ready 结论来自所有子检查，而不是手写常量。

## 路由

路由文件：

```text
src/routes/auditRoutes.ts
```

新增 import：

```ts
loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope
renderManagedAuditManualSandboxConnectionDryRunRequestEnvelopeMarkdown
```

新增接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope
GET /api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope?format=markdown
```

注册方式仍然是：

```ts
registerAuditJsonMarkdownRoute(...)
```

这继承了 v225 之后的路由规范，没有退回手写 JSON/Markdown 分支。

## 测试

新增测试文件：

```text
test/managedAuditManualSandboxConnectionDryRunRequestEnvelope.test.ts
```

覆盖三类场景：

```text
1. 正常配置下生成 ready profile，六个 operatorReviewFields 完整，且不携带 secret value。
2. UPSTREAM_ACTIONS_ENABLED=true 时 readiness 阻断，且仍不连接、不读 credential。
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

截图归档：

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

v236 把“连接前置条件齐备”推进成“可人工 review 的请求信封”，但仍然把真实连接和所有写操作关在门外。下一步两侧上游可以并行回显这个 envelope 的字段和边界，之后 Node v237 再判断是否具备申请真实沙箱连接窗口的材料。

一句话总结：

```text
v236 让 sandbox connection 进入 dry-run request envelope 阶段，但它仍然只是请求材料，不是执行授权。
```
