# 355. Node v350：minimal read-only integration passed archive verification

## 版本进度

v350 的任务不是再跑一次联调，而是验证 v349 已经跑通的真实只读归档，并给出下一阶段切换决策。

本轮最终状态：

```text
transitionState: minimal-read-only-integration-passed-archive-verified
transitionDecision: advance-to-managed-audit-disabled-read-only-integration-intake
readyForNodeV351ManagedAuditDisabledReadOnlyIntegrationIntake: true
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.ts:1) 是主服务。它只读取本地归档文件，不连接 Java / mini-kv，也不重新调用 v349 route。

`createArchiveReferences(...)` 固定 v350 要验证的 v349 证据集：

```text
d/349/evidence/*http.json
d/349/evidence/*http.md
d/349/evidence/*summary.json
d/349/图片/*.png
d/349/解释/*.md
代码讲解记录_生产雏形阶段2/354-*.md
docs/plans2/v349-*.md
```

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.ts:200) 的 `createSourceNodeV349(...)` 把 v349 JSON 缩成稳定引用，重点字段是：

```text
rerunArchiveResult=all-read-passed
attemptedTargetCount=5
passedTargetCount=5
unavailableTargetCount=0
invalidContractTargetCount=0
```

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.ts:306) 的 `createChecks(...)` 是本版核心：它同时检查归档完整性、JSON/summary 一致性、目标都是只读命令、截图/解释/讲解/计划齐全，并确认没有启动上游、没有写上游、没有打开 managed audit。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationTypes.ts:1) 固定合同：`rerunsLiveProbe`、`startsJavaService`、`startsMiniKvService`、`connectsManagedAudit`、`readsManagedAuditCredential`、`rawEndpointUrlParsed`、`executionAllowed` 都是 `false`。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationRenderer.ts:1) 输出 Markdown，展示 source Node v349、transition record、archive references、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1138) 注册 v350 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification
```

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.test.ts:1) 覆盖三条路径：正常归档验证、缺 v349 归档 fail-closed、JSON/Markdown route 输出。

## 核心流程

1. 建立 `d/349` 归档文件引用。
2. 读取 v349 JSON、Markdown、summary、解释、代码讲解、计划索引。
3. 将 v349 JSON 提炼成 `sourceNodeV349`。
4. 验证 v349 是 `all-read-passed`，且 5 个 read target 都是只读允许项。
5. 生成 transition digest 和 `advance-to-managed-audit-disabled-read-only-integration-intake` 决策。
6. 保持生产执行、credential、raw endpoint、runtime shell、Java 写、mini-kv 写全部关闭。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v350 1 file / 3 tests 通过
- 小组 vitest：v349 + v350 2 files / 6 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，25/25 checks 通过
- Playwright MCP 截图：已保存到 `d/350/图片/minimal-read-only-integration-passed-archive-verification-v350.png`

## 项目成熟度

v350 是从“真实只读联调通过”到“下一阶段 intake 允许”的质量门。它把 v349 的事实结果固化为可审计证据，避免直接从一次联调成功跳到生产能力。这个节奏更像真实工程：先确认归档、边界和阶段切换，再进入下一版设计。
