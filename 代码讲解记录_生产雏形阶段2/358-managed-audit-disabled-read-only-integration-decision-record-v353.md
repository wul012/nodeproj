# 358. Node v353：managed-audit-disabled read-only integration decision record

## 版本进度

v353 的任务是把 v352 的 archive verification 结果转成一个明确 decision record。它不是连接实现，也不是 sandbox handle 的真实读取；它只是决定下一步可以进入“非 secret 的 sandbox handle review prerequisite intake”。

本轮最终状态：

```text
decisionState: managed-audit-disabled-read-only-integration-decision-record-ready
decision: advance-to-sandbox-handle-review-prerequisite-intake
readyForNodeV354SandboxHandleReviewPrerequisiteIntake: true
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts:35) 是主服务入口。它调用 v352 loader：

```text
loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification(...)
```

因此 v353 不重复 archive reader，也不重新读取 v351 文件。它只消费 v352 的 archive verification profile。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts:122) 的 `createSourceNodeV352(...)` 把 v352 profile 缩成稳定引用，重点字段是：

```text
archiveVerificationState=managed-audit-disabled-read-only-integration-intake-archive-verified
archiveVerificationDecision=archive-managed-audit-disabled-read-only-integration-intake
archiveFileCount=10
presentArchiveFileCount=10
checkCount=27
passedCheckCount=27
productionBlockerCount=0
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts:156) 的 `createNecessityProof(...)` 是治理增长控制点。它说明 v353 解决的是“v352 只验证归档，但没有记录下一步选择”的 blocker，并声明如果下一步请求 credential value、raw endpoint、provider/client、runtime shell、HTTP/TCP 或写/admin，就必须停。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts:167) 的 `createDecisionInputs(...)` 固定四类决策输入：v352 archive verification、credential/raw endpoint 仍关闭、真实连接授权未请求、未来 sandbox handle review 只能作为 prerequisite intake。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts:204) 的 `createDecisionRecord(...)` 生成本版核心记录：

```text
decision=advance-to-sandbox-handle-review-prerequisite-intake
requestsCredentialValue=false
requestsRawEndpointUrl=false
instantiatesProviderClient=false
implementsRuntimeShell=false
opensManagedAuditConnection=false
startsUpstreamServices=false
writesUpstreamState=false
requestsJavaMiniKvEcho=false
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.ts:236) 的 `createChecks(...)` 验证 v352 ready、10/10 archive files、27/27 source checks、必要性证明、decision inputs、decision digest，以及所有运行时边界仍关闭。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordTypes.ts:123) 固定 profile 合同。`startsJavaService`、`startsMiniKvService`、`connectsManagedAudit`、`sendsManagedAuditHttpTcp`、`readsManagedAuditCredential`、`rawEndpointUrlParsed`、`secretProviderInstantiated`、`resolverClientInstantiated`、`runtimeShellImplemented`、`executionAllowed` 都保持 `false`。

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordRenderer.ts:7) 输出 Markdown，展示 source Node v352、necessity proof、decision inputs、decision record、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1170) 注册 v353 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-decision-record
```

[managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.test.ts:17) 覆盖三条路径：正常消费 v352、缺 v352 源证据 fail-closed、JSON/Markdown route 输出。

## 核心流程

1. 调用 v352 loader，取得 archive verification profile。
2. 将 v352 profile 提炼成 `sourceNodeV352`。
3. 写入 necessity proof，说明为什么需要 decision record。
4. 固定四类 decision inputs。
5. 生成 decision digest。
6. 决定下一步只允许进入 sandbox handle review prerequisite intake，且不能打开任何真实连接或执行能力。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v353 1 file / 3 tests 通过
- 小组 vitest：v352 + v353 2 files / 6 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，19/19 checks 通过
- Playwright MCP 截图：已保存到 `d/353/图片/managed-audit-disabled-read-only-integration-decision-record-v353.png`

## 项目成熟度

v353 是一个生产前置决策门。它让项目从“归档验证通过”进入“下一步可做非 secret prerequisite intake”的状态，但没有把决策本身变成实现。这个边界很重要：真实连接能力仍然没有打开，下一版只能继续定义 handle/review status 的安全输入。
