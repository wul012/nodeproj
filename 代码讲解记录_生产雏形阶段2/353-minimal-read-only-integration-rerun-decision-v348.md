# 353. Node v348：minimal read-only integration rerun decision

## 版本进度

v348 的任务是把 v347 的 archive verification 转成下一步决策。它不重新探测、不启动上游，只判断：

```text
all-read-passed -> 进入下一阶段只读集成
read-window-unavailable -> 等待外部启动窗口
invalid-read-contract -> 才请求 Java v153 + mini-kv v144
```

本轮实际决策是 `wait-for-external-read-window`。

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision.ts:1) 是主服务。它复用 v347 的 `loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification(...)`，没有复制 v346 runner，也没有发起新的上游 I/O。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionTypes.ts:1) 固定 v348 的决策合同：`rerunsLiveProbe`、`startsJavaService`、`startsMiniKvService`、`connectsManagedAudit`、`readsManagedAuditCredential`、`executionAllowed` 都是 `false`。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionRenderer.ts:1) 输出 Markdown，展示 source Node v347、rerun decision record、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1124) 注册 v348 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision
```

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision.test.ts:1) 覆盖三条路径：正常等待外部窗口、缺 v347 archive fail-closed、JSON/Markdown route 输出。

## 核心流程

1. 调用 v347 archive verification loader，读取稳定归档结论。
2. `createSourceNodeV347(...)` 把 v347 profile 缩成决策输入。
3. `determineRerunDecision(...)` 将 archive result 映射到下一步。
4. `createRerunDecisionRecord(...)` 生成稳定 digest，说明是否需要外部窗口或 Java/mini-kv echo。
5. `createChecks(...)` 确认本版没有重跑探测、没有启动上游、没有放开执行边界。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v348 1 file / 3 tests 通过
- 小组 vitest：v346 + v347 + v348 3 files / 10 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，`rerunDecision=wait-for-external-read-window`
- 浏览器截图：Playwright MCP data-page summary 截图已保存；route 真值以 HTTP evidence 为准

## 项目成熟度

v348 的价值是把“什么时候能真正重跑联调”讲清楚：必须先由用户或外部窗口启动 Java / mini-kv。Node 不再用重复 connection-refused 证明同一件事，也不让 Java / mini-kv 做无效补丁。
