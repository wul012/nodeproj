# 351. Node v346：minimal read-only integration smoke rehearsal

## 版本进度

v346 消费 v345 的 readiness cut，首次进入 Java / mini-kv 最小只读真实联调 smoke rehearsal。

核心边界：

```text
执行只读探测
不启动 Java / mini-kv
不写 Java / mini-kv
不读取 credential value
不解析 raw endpoint URL
不连接 managed audit endpoint
不实现 runtime shell
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal.ts:1) 是主服务。它复用 v345 readiness cut，然后调用现有 `OrderPlatformClient` 和 `MiniKvClient` 执行五个只读目标。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.ts:1) 固化 v346 的输出模型：`smokeState` 可为 `all-read-passed`、`read-window-unavailable`、`invalid-read-contract` 或 `blocked`，每个 target 都记录 `status`、`latencyMs`、`statusCode`、`responseShape`、`errorCode` 和 `errorMessage`。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalRenderer.ts:1) 输出 Markdown，把 source Node v345、smoke session、target results、checks、summary 和 next actions 展开。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1103) 注册 v346 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal
```

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal.test.ts:1) 覆盖四条路径：全部只读通过、服务不可达 fail closed、只读契约 invalid JSON、route 输出。

## 核心流程

1. `createSourceNodeV345(...)` 复用 v345 readiness cut，确认最小只读窗口已 ready。
2. `runReadOnlyTargets(...)` 按固定顺序调用 Java health、Java ops overview、mini-kv HEALTH、mini-kv INFOJSON、mini-kv STATSJSON。
3. `classifyError(...)` 把错误收敛为 `connection-refused`、`timeout`、`invalid-json`、`unexpected-status`。
4. `createSmokeSession(...)` 统计 attempted、passed、unavailable、invalid contract，并生成 session digest。
5. `determineSmokeState(...)` 区分 all-read-passed、read-window-unavailable、invalid-read-contract。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v346 1 file / 4 tests 通过
- v345/v346 小组 vitest：2 files / 7 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：JSON 200，Markdown 200，17/17 checks
- 本机只读联调结果：`read-window-unavailable`，5 个只读目标均为 connection-refused
- Java / mini-kv 是否需要改代码：否；这是服务未由外部窗口启动的环境状态，不是 read contract 字段缺失
- Playwright MCP：可用；本轮 route 需要 access-guard headers，真实 route 用 HTTP smoke 验证，MCP 截图展示同轮 smoke summary
- 浏览器截图：已生成

## 项目成熟度

v346 的意义是把“安全边界已经说清楚”推进成“真实只读窗口能否跑通”的证据。不可达不是失败实现，而是现实环境状态；字段不匹配才会触发 Java / mini-kv 的后续只读补强。
