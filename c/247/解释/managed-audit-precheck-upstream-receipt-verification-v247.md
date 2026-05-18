# Node v247 运行调试说明：manual sandbox precheck upstream receipt verification

本版继续 `docs/plans/v245-post-sandbox-precheck-roadmap.md`，不是打开真实连接，而是在 Java v99 和 mini-kv v108 完成后做 Node 侧只读核对。

## 背景

Node v245 已生成 sandbox connection precheck packet。随后 v246 临时插入用于修复 GitHub CI historical sibling evidence fallback，所以 Java v99 和 mini-kv v108 的文档里仍写给 Node v246 消费。

v247 明确接受这个版本偏移：它把 Java v99 / mini-kv v108 看作同一个 precheck upstream receipt verification slot 的证据，而不是误判为失败。

## 本版处理

新增服务：

```text
src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.ts
```

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification
/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification?format=markdown
```

它只读消费：

```text
Node v245 precheck packet
Java v99 precheck packet echo receipt
mini-kv v108 precheck non-participation receipt
```

## 核对内容

本版验证：

```text
precheckItemCount=7
requiredOperatorFieldCount=6
timeoutBudgetMs=15000
credential boundary closed
connection boundary closed
write boundary closed
auto-start boundary closed
route registration accepted
UPSTREAM_ACTIONS_ENABLED=false
```

mini-kv 的 operator field names 必须与 Node v245 完全一致；Java v99 使用 review/rehearsal 语义字段名，v247 只把它当作 Java 侧 field echo 证据，不要求 Java 字段名与 Node 环境变量逐字一致。

## GitHub fallback

v247 继续使用 v246 的 `historicalEvidenceResolver`。本版新增 6 个 committed sibling evidence fallback 文件，确保 GitHub runner 没有 `D:/javaproj` 和 `D:/C/mini-kv` 时仍能跑通。

## 验证

已完成验证：

```text
npm run typecheck -> passed
vitest run managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.test.ts -> 4 tests passed
npm test -> 187 files / 628 tests passed
npm run build -> passed
safe HTTP smoke -> /health ok, v247 JSON ready, v247 Markdown 200
```

HTTP smoke 使用安全环境变量：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
```

## 边界

- 未启动 Java / mini-kv。
- 未构建或测试 Java / mini-kv。
- 未修改 Java / mini-kv。
- 未读取 credential value。
- 未打开 managed audit connection。
- 未执行 schema migration。
- 未写 approval ledger。

## 下一步

```text
Node v248：manual sandbox connection rehearsal guard
```

v248 仍然只做 guard，不打开真实 managed audit connection。
