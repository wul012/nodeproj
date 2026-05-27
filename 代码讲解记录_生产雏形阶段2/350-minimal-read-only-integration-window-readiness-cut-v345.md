# 350. Node v345：minimal read-only integration window readiness cut

## 版本进度

v345 消费 v344 的 archive verification，把“设计正文已经稳定归档”转换成“可以进入最小只读联调窗口”的准备状态。

核心边界：

```text
准备只读联调窗口
不执行 live probe
不启动 Java / mini-kv
不读取 credential value
不解析 raw endpoint URL
不实现 runtime shell
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut.ts:1) 是主服务。它先调用 v344 archive verification 服务，再生成 Java / mini-kv 最小只读联调 requirements、environment handles、forbidden operations、checks、blockers 和 next actions。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutTypes.ts:1) 把 v345 的安全边界固定到类型层：`performsLiveProbeNow`、`startsJavaService`、`startsMiniKvService`、`sendsJavaHttpRequestNow`、`opensMiniKvTcpSocketNow`、`executionAllowed` 都是 `false`。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutRenderer.ts:1) 输出 Markdown，审计者可以直接看到 source Node v344、readiness cut、Java/mini-kv 只读要求、环境 handle、禁止操作和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1098) 注册 v345 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut
```

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut.test.ts:1) 覆盖三条路径：正常 readiness cut、上游 probe/action 开启时 fail closed、JSON/Markdown route 输出。

## 核心流程

1. `createSourceNodeV344(...)` 复用 v344 服务，读取 archive verification state、digest、检查数量和副作用边界。
2. `createJavaReadOnlyRequirements(...)` 列出 Java 只读窗口：`GET /actuator/health`、`GET /api/v1/ops/overview`。
3. `createMiniKvReadOnlyRequirements(...)` 列出 mini-kv 只读窗口：`HEALTH`、`INFOJSON`、`STATSJSON`。
4. `createEnvironmentHandles(...)` 只使用 `ORDER_PLATFORM_URL`、`ORDER_PLATFORM_TIMEOUT_MS`、`MINIKV_HOST`、`MINIKV_PORT`、`MINIKV_TIMEOUT_MS` 这类非 secret handle。
5. `createChecks(...)` 判断 v344 是否 ready、现有 client 是否已支持只读字段、是否仍关闭 probe/action、是否无需 Java v153 + mini-kv v144。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v345 1 file / 3 tests 通过
- v344/v345 小组 vitest：2 files / 7 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：JSON 200，Markdown 200，20/20 checks
- Playwright MCP：可用；因为当前暴露工具没有 HTTP header 注入，真实 route 用 HTTP smoke 验证，MCP 截图展示同轮 smoke summary
- 浏览器截图：已生成

## 项目成熟度

v345 的关键价值是方向修正：不再继续写新的 disabled design draft 层，而是把已验证的边界转成真实只读联调的门槛。它仍然很保守，但保守点开始服务于真实联调，而不是继续空转治理链。
