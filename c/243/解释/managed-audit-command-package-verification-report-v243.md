# Node v243 运行调试说明：command package verification report

本版目标是验证 Node v241 的 disabled dry-run command package，而不是新增真实连接能力。

## 本版位置

当前计划：

```text
docs/plans/v242-post-historical-evidence-fallback-roadmap.md
```

v243 已完成后，计划下一步切到：

```text
推荐并行 Java v98 + mini-kv v107
```

## 核心验证

新增 profile：

```text
managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report.v1
```

关键字段：

```text
commandShapeAccepted=true
disabledByDefaultAccepted=true
noCredentialValueAccepted=true
noConnectionAccepted=true
noMutationAccepted=true
routeRegistrationAccepted=true
ciFallbackAccepted=true
```

本版还补了两个维护点：

```text
route registration table count: 41 -> 42
Java v97 / mini-kv v106 evidence 增加 Node 仓库内 fallback fixture
```

这样新增 v243 audit route 后，v240 路由表质量 pass 不会把后续 v241/v243 链路误判为 blocked；同时 GitHub CI 不需要本机存在 Java / mini-kv 兄弟仓库，也能完成 v243 验证。

## 路由

新增 JSON / Markdown 路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report
/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report?format=markdown
```

路由继续走 `auditJsonMarkdownRoute` 表，不把注册样板塞回 `auditRoutes.ts`。

## 边界

本版不做：

```text
不读取 credential value
不打开 managed audit connection
不执行 schema migration
不写 Java / mini-kv
不启动 Java / mini-kv
```

## 验证

```text
npm run typecheck
npm exec -- vitest run test/managedAuditManualSandboxConnectionRehearsalPacketReview.test.ts test/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.test.ts test/managedAuditManualSandboxConnectionPreconditionIntake.test.ts test/managedAuditManualSandboxConnectionReadinessGate.test.ts test/managedAuditManualSandboxConnectionDryRunCommandPackage.test.ts test/managedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport.test.ts
npm test
npm run build
```

结果：

```text
typecheck: passed
focused tests: 6 files / 18 tests passed
full tests: 183 files / 616 tests passed
build: passed
HTTP smoke: reportState=manual-sandbox-dry-run-command-package-verification-ready, ready=true, productionBlockerCount=0
```

## 截图

```text
c/243/图片/managed-audit-command-package-verification-report-v243.png
```
