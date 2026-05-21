# Node v286 运行说明：credential resolver implementation plan upstream echo verification

## 本版目标

Node v286 回到三项目主流程，消费 Java v121 和 mini-kv v126 对 Node v283 implementation plan draft 的只读回显。

这版只做 verification，不实现真实 resolver，不实例化 secret provider，不解析 raw endpoint URL，不连接 managed audit，不写 ledger，不执行 schema migration。

## 版本偏移说明

Java v121 和 mini-kv v126 的证据原本写给 `Node v284` verification gate。后续 Node v284 / v285 被用于两个质量优化版：

```text
Node v284: opsPromotionArchiveBundleTypes.ts 类型族拆分
Node v285: opsPromotionArchiveDeploymentBuilders.ts builder 拆分
Node v286: 消费原 Node v284 gate 证据
```

因此本版 profile 显式输出：

```text
originalExpectedNodeVerificationVersion = Node v284
executedAsNodeVersion = Node v286
```

## 新增能力

新增服务：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationRenderer.ts
```

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification?format=markdown
```

新增测试：

```text
test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.test.ts
```

## 证据归档

```text
d/286/evidence/credential-resolver-implementation-plan-upstream-echo-verification-v286.json
d/286/evidence/credential-resolver-implementation-plan-upstream-echo-verification-v286.md
```

同时补入 historical fixture，保证 GitHub runner 没有本机 sibling workspace 时仍可验证：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/...
fixtures/historical/sibling-workspaces/mini-kv/...
```

## 验证结果

已通过聚焦验证：

```bash
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.test.ts
```

聚焦测试覆盖：

```text
正常 profile ready
UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 打开时 blocked
forced historical fixture fallback
JSON / Markdown audit route
```

本版没有运行浏览器截图；这是只读 service + route verification 版本，核心证据是 JSON/Markdown profile 和 route 注入测试。
