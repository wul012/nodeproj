# 354. Node v349：minimal read-only integration smoke rerun archive

## 版本进度

v349 接在 v348 后面，把“等待外部读窗口”的决策落成一次真实只读联调重跑。用户授权本轮由 Node 临时启动 Java / mini-kv，因此本版实际完成：

```text
Java / mini-kv 启动 -> Node route 重跑只读 smoke -> 5/5 passed -> 归档 all-read-passed
```

这不是打开生产执行能力，而是证明最小只读链路能跑通。

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.ts:1) 是主服务。它先调用 v348 的 `loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision(...)`，确认上一版确实要求等待外部读窗口。

同一个文件里的 `shouldRunSmokeRerun(...)` 只在三个条件同时满足时才触发重跑：

```text
v348 ready
rerunDecision == wait-for-external-read-window
externalReadWindowConfirmed == true
```

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.ts:71) 调用 v346 的 smoke rehearsal loader，但传入 `createReadinessSourceConfig(...)`。这里很关键：v349 用当前 `UPSTREAM_PROBES_ENABLED=true` 判断外部窗口已确认，但复用 v346 runner 时保留 v345 readiness source 的“探测开关关闭”语义，避免把历史 readiness 误判成 blocked。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveTypes.ts:1) 固定本版合同：`startsJavaService`、`startsMiniKvService`、`mutatesJavaState`、`mutatesMiniKvState`、`connectsManagedAudit`、`readsManagedAuditCredential`、`rawEndpointUrlParsed`、`executionAllowed` 都是 `false`。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveRenderer.ts:1) 输出 Markdown，展示 source Node v348、rerun archive、target results、checks、summary、warnings 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1132) 注册 v349 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive
```

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.test.ts:1) 覆盖三条路径：窗口确认后 5/5 passed、窗口关闭时 pending 且不调用上游、route JSON/Markdown 输出。

## 核心流程

1. 读取 v348 rerun decision，确认是 `wait-for-external-read-window`。
2. 根据 `UPSTREAM_PROBES_ENABLED` 判断外部 read window 是否已确认。
3. 未确认时直接返回 `pending`，并断言没有调用 Java / mini-kv。
4. 已确认时复用 v346 smoke runner，只执行 Java GET 和 mini-kv 只读命令。
5. 将结果映射成 `archive-read-passed-rerun-evidence`、`archive-read-window-unavailable-rerun-evidence` 或 `request-java-mini-kv-read-contract-fix`。
6. 生成稳定 archive digest、checks、summary 和下一步建议。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v349 1 file / 3 tests 通过
- 小组 vitest：v346 + v347 + v348 + v349 4 files / 13 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，`rerunArchiveResult=all-read-passed`
- Playwright MCP 截图：已保存到 `d/349/图片/minimal-read-only-integration-smoke-rerun-archive-v349.png`

## 项目成熟度

v349 让三项目从“证据/治理链路”第一次进入“真实最小只读联调通过”。这一步仍然非常克制：Node 只是控制面消费者，不自动启动上游、不写上游、不接触真实 managed audit endpoint。后续可以开始进入 managed-audit-disabled read-only stage，但仍不应跳到生产写操作。
