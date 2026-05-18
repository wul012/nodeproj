# Node v244 运行调试说明：upstream echo verification

本版目标是只读验证 Node v243、Java v98、mini-kv v107 三方证据是否对齐，不打开真实 managed audit sandbox connection。

## 本版位置

当前计划：

```text
docs/plans/v242-post-historical-evidence-fallback-roadmap.md
```

v244 完成后，计划下一步是：

```text
Node v245：sandbox connection precheck packet
```

## 核心验证

新增 profile：

```text
managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification.v1
```

关键字段：

```text
commandCountAligned=true
disabledByDefaultAligned=true
dryRunOnlyAligned=true
credentialBoundaryAligned=true
connectionBoundaryAligned=true
writeBoundaryAligned=true
autoStartBoundaryAligned=true
```

## 路由

新增 JSON / Markdown 路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification
/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification?format=markdown
```

路由继续走 `auditJsonMarkdownRoute` 表。新增 v244 路由后，route table 计数从 42 滚动到 43。

## CI fallback

本版增加 Node 仓库内 fallback fixture：

```text
fixtures/historical/managed-audit-command-upstream-echo-verification/
```

这样 GitHub CI 即使没有本机 Java / mini-kv sibling workspace，也能验证 Java v98 和 mini-kv v107 的关键证据形状。

## 边界

本版不做：

```text
不读取 credential value
不打开 managed audit connection
不执行 schema migration
不写 Java ledger / SQL
不写 mini-kv storage
不启动 Java / mini-kv
```

## 验证

```text
npm run typecheck
npm exec -- vitest run test/managedAuditRouteRegistrationTableQualityPass.test.ts test/managedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport.test.ts test/managedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification.test.ts
npm test
npm run build
```

结果：

```text
typecheck: passed
focused tests: 3 files / 9 tests passed
full tests: 184 files / 619 tests passed
build: passed
HTTP smoke: verificationState=manual-sandbox-dry-run-command-upstream-echo-verification-ready, ready=true, productionBlockerCount=0
```

## 截图

```text
c/244/图片/managed-audit-upstream-echo-verification-v244.png
```
