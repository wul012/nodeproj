# Node v248 运行调试说明：managed-audit sandbox code health pass

本版是质量优化版，不是 rehearsal guard。它来自 `docs/plans/v245-post-sandbox-precheck-roadmap.md` 中的推荐并行质量优化批次：

```text
Node v248 + Java v100 + mini-kv v109
```

Node v248 先把 v247 的质量闸固化下来，等 Java v100 / mini-kv v109 的优化完成后，再进入 Node v249 rehearsal guard。

## 本版新增

新增服务：

```text
src/services/managedAuditSandboxCodeHealthPass.ts
```

新增路由：

```text
/api/v1/audit/managed-audit-sandbox-code-health-pass
/api/v1/audit/managed-audit-sandbox-code-health-pass?format=markdown
```

## 核对内容

v248 读取 Node 本地源码和测试，确认：

```text
v247 source ready
v247 service exists
v247 service <= 1000 lines
fallback regression test present
blocked config test present
JSON/Markdown route regression present
route registered through audit route table
no real connection clients imported
credential boundary closed
schema migration blocked
auto-start blocked
large file inventory recorded
split acceptance checklist created
UPSTREAM_ACTIONS_ENABLED=false
```

## 大文件拆分清单

v248 不直接拆大文件，而是输出后续验收清单：

```text
src/routes/statusRoutes.ts -> Node v250+
src/ui/dashboard.ts -> Node v251+
src/services/opsPromotionArchiveRenderers.ts -> Node v252+
```

拆分必须保持路径、响应 shape、DOM id、digest / archive shape 不漂移。

## 验证

已完成验证：

```text
npm run typecheck -> passed
vitest run managedAuditSandboxCodeHealthPass.test.ts -> 3 tests passed
npm test -> 188 files / 631 tests passed
npm run build -> passed
safe HTTP smoke -> /health ok, v248 JSON ready, v248 Markdown 200
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
Java v100 + mini-kv v109 继续并行优化
完成后 Node v249 manual sandbox connection rehearsal guard
```
