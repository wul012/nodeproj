# Node v245 运行调试说明：sandbox connection precheck packet

本版目标是生成真实 managed audit sandbox connection 前的 precheck packet。它只整理人工审核材料，不打开连接、不读取 credential value、不执行 schema migration。

## 本版位置

当前计划：

```text
docs/plans/v242-post-historical-evidence-fallback-roadmap.md
```

v245 完成后已另起：

```text
docs/plans/v245-post-sandbox-precheck-roadmap.md
```

下一步是推荐并行：

```text
Java v99 + mini-kv v108
```

## 核心验证

新增 profile：

```text
managed-audit-manual-sandbox-connection-precheck-packet.v1
```

关键字段：

```text
precheckState=manual-sandbox-connection-precheck-packet-ready
readyForManagedAuditManualSandboxConnectionPrecheckPacket=true
readyForManagedAuditSandboxAdapterConnection=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

## Precheck packet

本版生成 7 类前置材料：

```text
owner approval artifact
credential handle review
schema migration rehearsal id
operator window
rollback path
manual abort marker
timeout policy
```

它们只作为人工审核字段，不包含 credential value，也不会触发真实连接。

## 路由

新增 JSON / Markdown 路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet
/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet?format=markdown
```

路由继续走 `auditJsonMarkdownRoute` 表。新增 v245 路由后，route table 计数从 43 滚动到 44。

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
npm exec -- vitest run test/managedAuditRouteRegistrationTableQualityPass.test.ts test/managedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionPrecheckPacket.test.ts
npm test
npm run build
```

结果：

```text
typecheck: passed
focused tests: 3 files / 9 tests passed
full tests: 185 files / 622 tests passed
build: passed
HTTP smoke: precheckState=manual-sandbox-connection-precheck-packet-ready, ready=true, productionBlockerCount=0
```

## 截图

```text
c/245/图片/managed-audit-precheck-packet-v245.png
```

截图使用本机 Chrome / Chromium 生成，来源页面：

```text
c/245/managed-audit-precheck-packet-v245.html
```
