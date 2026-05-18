# Node v250 运行调试说明：manual sandbox connection rehearsal guard

本版依据最新有效计划 `docs/plans/v245-post-sandbox-precheck-roadmap.md` 推进。Node v249、Java v101、mini-kv v110 的 Dependabot/security maintenance 都已在各自 tag 上完成并与远端对齐，所以 v250 可以进入三项目对齐版 rehearsal guard。

## 本版目标

v250 不打开真实 managed audit sandbox connection，而是生成连接前的人工 rehearsal guard：确认 Node v247/v248/v249、Java v101、mini-kv v110 五段证据都齐备，同时把真正连接前必须由人工准备的七类材料写成硬门槛。

七类材料是：

```text
owner approval artifact
credential handle review
schema rehearsal approval
manual window open marker
rollback path
abort marker
timeout policy
```

## 新增入口

新增服务：

```text
src/services/managedAuditManualSandboxConnectionRehearsalGuard.ts
```

新增路由：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard
GET /api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard?format=markdown
```

路由仍通过 `auditJsonMarkdownRoutes` 的共享表注册，没有回退到手写 JSON/Markdown route。

## 三项目证据

Node v250 只读消费：

```text
Node v247 precheck upstream receipt verification
Node v248 code health pass
Node v249 Dependabot/security maintenance
Java v101 Maven + GitHub Actions Dependabot maintenance
mini-kv v110 GitHub Actions Dependabot maintenance
```

其中 Java 的 `.github` 位于 Java git 根：

```text
D:\javaproj\.github\dependabot.yml
D:\javaproj\.github\workflows\maven-ci.yml
```

这不是错误；Maven 子项目位于 `D:\javaproj\advanced-order-platform`，但 GitHub 配置属于仓库根。

## fallback 修正

本版修正了 `historicalEvidenceResolver`：新增 `D:/javaproj/` 根级 fallback 映射，确保 GitHub runner 没有 sibling workspace 时，也能读取 committed Java root `.github` 证据。

本版只归档 Node 实际读取的 Java / mini-kv 证据文件到：

```text
fixtures/historical/sibling-workspaces/
```

没有全量复制上游仓库。

## 边界

本版没有做：

```text
读取 credential value
打开 managed audit connection
执行 schema migration
启动 Java 或 mini-kv
写 approval ledger
让 mini-kv 成为 managed audit storage backend
升级任何依赖版本
```

## 验证

聚焦验证：

```text
npm run typecheck -> passed
vitest run historicalEvidenceResolver + v250 rehearsal guard + v248/v249 tests -> passed
```

最终验证将在本版收口时补入：

```text
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

## 一句话总结

Node v250 把安全维护批次收进 manual sandbox connection rehearsal guard：三项目证据已对齐，但真实连接仍被明确阻断，下一步应先形成连接决策记录，而不是直接加入真实 adapter client。

## 最终验证补充

本版最终验证结果：

```text
npm run typecheck -> passed
npx vitest run test\historicalEvidenceResolver.test.ts test\managedAuditManualSandboxConnectionRehearsalGuard.test.ts test\managedAuditSandboxCodeHealthPass.test.ts test\dependabotConfig.test.ts -> 12 tests passed
npm test -> 190 files / 638 tests passed
npm run build -> passed
safe HTTP smoke -> /health ok, v250 guard ready, connectionAllowed=false, readsCredential=false
Chrome screenshot -> c/250/图片/manual-sandbox-connection-rehearsal-guard-v250.png
```

HTTP smoke 启动的本轮 Node 服务 PID 为 `16148`，脚本结束时已停止。截图使用 Playwright + 本机 Chrome channel 打开本版静态 HTML 证据页，没有启动 Java 或 mini-kv。
