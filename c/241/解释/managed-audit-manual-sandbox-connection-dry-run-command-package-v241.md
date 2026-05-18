# Node v241 运行调试说明：managed audit manual sandbox connection dry-run command package

本版来源计划：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

v241 是一次对齐推进版。它在 Node v240 路由注册表优化后，只读核对 Java v97 与 mini-kv v106 已完成各自优化收口，然后生成默认 disabled 的 manual sandbox connection dry-run command package。

## 本版结果

核心 profile：

```text
managed-audit-manual-sandbox-connection-dry-run-command-package.v1
```

关键状态：

```text
packageState=manual-sandbox-connection-dry-run-command-package-ready
readyForManagedAuditManualSandboxConnectionDryRunCommandPackage=true
readyForManagedAuditSandboxAdapterConnection=false
readOnlyCommandPackage=true
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

## 对齐来源

```text
Node v239: operator window evidence verification
Node v240: route registration table quality pass
Java v97: release approval rehearsal builder chain refactor
mini-kv v106: command dispatch table
```

Java v97 与 mini-kv v106 只作为质量上下文：证明两边优化已收口，不代表 Node 获得连接权限、写权限或生产窗口权限。

## 新增路由

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package
GET /api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package?format=markdown
```

## command package

本版生成 6 个 disabled command 条目：

```text
review-owner-approval-artifact
verify-credential-handle
review-schema-rehearsal
review-rollback-path
confirm-timeout-budget
confirm-manual-abort-marker
```

每个条目固定：

```text
disabledByDefault=true
dryRunOnly=true
operatorReviewRequired=true
carriesCredentialValue=false
opensConnection=false
mutatesState=false
```

## 边界

本版没有做：

```text
没有修改 Java / mini-kv
没有构建、启动、测试 Java / mini-kv
没有读取 credential value
没有打开 managed audit sandbox connection
没有执行 schema migration
没有写 managed audit state
没有启动 Java / mini-kv / external audit service
没有打开 production window
```

## 验证

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditManualSandboxConnectionDryRunCommandPackage.test.ts
```

覆盖：

```text
1. Node v239 / v240 / Java v97 / mini-kv v106 对齐成功。
2. UPSTREAM_ACTIONS_ENABLED=true 时阻断。
3. 新 JSON / Markdown 路由可访问。
```

最终验证：

```text
npm run typecheck：通过
聚焦测试：3 个测试文件、9 个用例通过
npm test：182 个测试文件、613 个用例通过
npm run build：通过
HTTP smoke：通过，/health、新 v241 JSON/Markdown、v240 route 均可访问
git diff --check：通过，仅有 CRLF 工作区提示
截图：已保存到 c/241/图片/managed-audit-manual-sandbox-connection-dry-run-command-package-v241.png
```

## 成熟度变化

v241 把“优化后重新对齐”从一句计划变成可审计 profile：它能说明三项目已完成质量收口，也能明确命令包仍只是 operator review 材料，不是连接执行许可。

一句话总结：v241 让 Node 重新接回主线，但仍牢牢停在 disabled dry-run command package，不越过真实连接边界。
