# 357. Node v352：managed-audit-disabled read-only integration intake archive verification

## 版本进度

v352 的任务是验证 v351 已经落盘的 intake 归档，不再重新执行 v351 逻辑，也不重新 live probe。它是从“v351 intake ready”到“v353 可以做 decision record”的归档质量门。

本轮最终状态：

```text
archiveVerificationState: managed-audit-disabled-read-only-integration-intake-archive-verified
archiveVerificationDecision: archive-managed-audit-disabled-read-only-integration-intake
readyForNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord: true
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts:47) 是主服务入口。它只读取 `d/351` 归档和计划索引，不启动 Java / mini-kv，也不重新调用 v351 route。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts:134) 的 `createArchiveReferences(...)` 固定 v352 要验证的 10 个文件：

```text
d/351/evidence/*http.json
d/351/evidence/*http.md
d/351/evidence/*summary.json
d/351/evidence/*browser-snapshot.md
d/351/*.html
d/351/图片/*.png
d/351/解释/*.md
代码讲解记录_生产雏形阶段2/356-*.md
docs/plans2/v351-*.md
docs/plans2/README.md
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts:207) 的 `createSourceNodeV351(...)` 把 v351 JSON 缩成稳定引用，重点字段是：

```text
intakeState=managed-audit-disabled-read-only-integration-intake-ready
intakeDecision=define-managed-audit-disabled-read-only-integration-stage
inputCount=3
closedScopeCount=7
checkCount=20
passedCheckCount=20
productionBlockerCount=0
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts:267) 的 `createArchiveVerification(...)` 生成 v352 自己的 archive verification digest。这个 digest 只依赖 v351 intake digest、归档文件 digest 和边界决策，不依赖当前时间。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts:302) 的 `createChecks(...)` 是本版核心。它验证归档文件存在、JSON profile version 正确、v351 intake decision 正确、3 个 intake inputs、7 个 closed scopes、20/20 source checks、summary/JSON 一致、Markdown/解释/代码讲解/计划索引齐全，并继续确认没有上游启动、没有 mutation、没有 managed audit 连接。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts:537) 的 `closedScopesRecorded(...)` 把 7 个必须关闭的 scope 固定成集合：

```text
credential-value
raw-endpoint-url
secret-provider
runtime-shell
java-writes
mini-kv-write-admin
managed-audit-http-tcp
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.ts:558) 的 `objectBooleanValuesAllTrue(...)` 明确要求 v351 `checks` 有 20 项且全部为 true，避免只看 summary 数字。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationTypes.ts:142) 固定 profile 合同。`startsJavaService`、`startsMiniKvService`、`connectsManagedAudit`、`sendsManagedAuditHttpTcp`、`readsManagedAuditCredential`、`rawEndpointUrlParsed`、`secretProviderInstantiated`、`resolverClientInstantiated`、`runtimeShellImplemented`、`executionAllowed` 都保持 `false`。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationRenderer.ts:7) 输出 Markdown，展示 source Node v351、archive verification record、archive references、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1162) 注册 v352 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake-archive-verification
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.test.ts:17) 覆盖三条路径：正常归档验证、缺 v351 归档 fail-closed、JSON/Markdown route 输出。

## 核心流程

1. 建立 `d/351` 归档文件引用。
2. 读取 v351 JSON、Markdown、summary、截图 snapshot、解释、代码讲解和计划索引。
3. 将 v351 JSON 提炼成 `sourceNodeV351`。
4. 验证 3 个 intake inputs、7 个 closed scopes 和 20/20 checks。
5. 生成 v352 archive verification digest。
6. 保持 credential、raw endpoint、provider/client、runtime shell、managed audit HTTP/TCP、Java 写、mini-kv 写/admin 全部关闭。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v352 1 file / 3 tests 通过
- 小组 vitest：v351 + v352 2 files / 6 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，27/27 checks 通过
- Playwright MCP 截图：已保存到 `d/352/图片/managed-audit-disabled-read-only-integration-intake-archive-verification-v352.png`

## 项目成熟度

v352 是生产化节奏里的“归档验收门”。它没有增加新执行能力，而是确认 v351 的 intake 证据能被独立复核。这样后续即使进入 decision record，也不会把一次 intake 结果和下一阶段判断混在一起。
