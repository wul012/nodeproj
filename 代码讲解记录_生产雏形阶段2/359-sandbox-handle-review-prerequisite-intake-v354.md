# 359. Node v354：sandbox handle review prerequisite intake

## 版本进度

v354 的任务是消费 v353 的 decision record，定义 sandbox handle review 的前置输入合同。它不是连接实现，也不是 credential resolver client；它只把“允许进入下一步 review 的非敏感输入”写成可测试、可归档的 profile。

本轮最终状态：

```text
intakeState: sandbox-handle-review-prerequisite-intake-ready
intakeDecision: define-non-secret-sandbox-handle-review-prerequisites
readyForNodeV355SandboxHandleReviewPrerequisiteIntakeArchiveVerification: true
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts:36) 是主服务入口。它调用 v353 loader：

```text
loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord(...)
```

因此 v354 不重新跑 live probe，也不重新启动 Java / mini-kv。它只消费 v353 的决策结果。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts:143) 的 `createSourceNodeV353(...)` 把 v353 profile 缩成稳定引用，重点字段是：

```text
decisionState=managed-audit-disabled-read-only-integration-decision-record-ready
decision=advance-to-sandbox-handle-review-prerequisite-intake
checkCount=19
passedCheckCount=19
productionBlockerCount=0
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts:175) 的 `createNecessityProof(...)` 是治理增长控制点。它说明 v354 解决的是“sandbox handle review 需要先定义非 secret 输入合同”的 blocker，并声明如果后续请求 credential value、raw endpoint、provider/client、runtime shell、HTTP/TCP 或写/admin，就必须停。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts:186) 的 `createPrerequisiteInputs(...)` 固定 5 类允许输入：

```text
sandbox-handle-reference
allowlist-review-status
credential-handle-binding-status
operator-approval-correlation
source-decision-digest
```

这些输入全部带有 `containsSecretValue=false`、`containsRawEndpointUrl=false`、`allowsNetworkConnection=false`、`allowsRuntimeInvocation=false`，所以它们只是 review 前置合同，不是可执行连接参数。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts:258) 的 `createClosedScopes(...)` 固定 9 个关闭范围：credential value、raw endpoint、secret provider、resolver client、runtime shell、managed audit HTTP/TCP、Java writes、mini-kv write/admin、automatic upstream start。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts:282) 的 `createIntakeRecord(...)` 生成本版核心记录：

```text
intakeDecision=define-non-secret-sandbox-handle-review-prerequisites
requestsCredentialValue=false
requestsRawEndpointUrl=false
instantiatesProviderClient=false
implementsRuntimeShell=false
opensManagedAuditConnection=false
startsUpstreamServices=false
writesUpstreamState=false
requestsJavaMiniKvEcho=false
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.ts:316) 的 `createChecks(...)` 验证 v353 ready、source checks 全通过、必要性证明存在、5 个输入无 secret/raw endpoint/network/runtime、9 个关闭范围完整，以及所有真实执行边界仍关闭。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeTypes.ts:138) 固定 profile 合同。`startsJavaService`、`startsMiniKvService`、`connectsManagedAudit`、`sendsManagedAuditHttpTcp`、`credentialValueRequested`、`rawEndpointUrlRequested`、`secretProviderInstantiated`、`resolverClientInstantiated`、`runtimeShellInvocationAllowed`、`executionAllowed` 都保持 `false`。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeRenderer.ts:8) 输出 Markdown，展示 source Node v353、necessity proof、prerequisite inputs、closed scopes、intake record、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1178) 注册 v354 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.test.ts:17) 覆盖三条路径：正常消费 v353、缺 v353 源证据 fail-closed、JSON/Markdown route 输出。

## 核心流程

1. 调用 v353 loader，取得 decision record profile。
2. 将 v353 profile 提炼成 `sourceNodeV353`。
3. 写入 necessity proof，说明为什么需要 prerequisite intake。
4. 固定 5 类非敏感 prerequisite inputs。
5. 固定 9 个 closed scopes。
6. 生成 intake digest。
7. 判定下一步只允许做 archive verification 或后续 handle review，不能打开任何真实连接或执行能力。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v354 1 file / 3 tests 通过
- 小组 vitest：v353 + v354 2 files / 6 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，24/24 checks 通过
- Playwright MCP 截图：已保存到 `d/354/图片/sandbox-handle-review-prerequisite-intake-v354.png`

## 项目成熟度

v354 是一个安全输入边界版本。它让项目从“决策可以进入 sandbox handle review”推进到“具体哪些非敏感输入可以进入 review”，但没有把 handle 变成 secret，没有把 endpoint handle 变成 raw URL，也没有把 review 变成真实连接。这是继续靠近真实联调前必须有的边界层。
