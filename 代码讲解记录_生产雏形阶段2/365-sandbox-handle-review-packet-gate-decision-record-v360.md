# 365 - Node v360 sandbox handle review packet/gate decision record 代码讲解

## 版本定位

v360 接在 v359 之后。v359 证明 v358 的 packet/gate non-secret intake 归档完整；v360 只做 decision record，记录下一步能否进入 prerequisite closure review。

这版不是执行链路。它不启动 Java / mini-kv，不发 managed audit HTTP/TCP，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，也不实现 runtime shell。

## 路由入口

路由注册在 `src/routes/auditJsonMarkdownRoutes.ts`：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordMarkdown,
)
```

它仍然走统一 JSON / Markdown route helper，不在 route 文件里重复报告渲染。

## Source Node v359

主服务在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord.ts
```

入口函数只消费 v359 profile：

```ts
const sourceProfile =
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification({
    config: input.config,
    archiveRoot: input.sourceArchiveRoot,
  });
const sourceNodeV359 = createSourceNodeV359(sourceProfile);
```

`createSourceNodeV359()` 不读取 v358 文件，也不复制 v359 archive reader，只提取 v359 已经暴露的摘要：

```ts
archiveVerificationState
archiveVerificationDecision
readyForArchiveVerification
readyForNodeV360DecisionRecord
archiveVerificationDigest
sourceIntakeDigest
archiveFileCount
packetInputCount
gateOutputCount
stopConditionCount
checkCount
passedCheckCount
```

这符合计划要求：v360 消费 v359 profile，不重新做 archive verification。

## 必要性证明

`createNecessityProof()` 解释为什么 v360 需要存在：

```ts
blockerResolved: "verified-packet-gate-intake-archive-needs-explicit-next-stage-decision"
consumedBy: "Node v361 sandbox handle review packet/gate decision record archive verification or later prerequisite closure review"
```

它的核心理由是：v358 只定义 intake，v359 只验证 archive；两者都没有记录“下一步到底进入 prerequisite closure review，还是停住”。

## Decision inputs

`createDecisionInputs()` 定义 5 个输入：

```text
node-v359-archive-verification
packet-gate-shape
secret-and-endpoint-material
human-review-authority
future-prerequisite-closure
```

这些输入把 v360 的判断边界写清楚：

- v359 归档必须完整。
- v358 的 6/5/7 packet/gate shape 必须保留。
- credential value 和 raw endpoint URL 仍然关闭。
- human review authority 仍不等于执行权限。
- 后续 prerequisite closure 必须等 v360 归档后再推进。

## Decision record

`createDecisionRecord()` 生成稳定 digest：

```ts
decision: "advance-to-sandbox-handle-review-prerequisite-closure-review"
allowsSandboxHandleReviewPrerequisiteClosure: true
allowsHumanReviewDecisionOnly: true
requestsCredentialValue: false
requestsRawEndpointUrl: false
instantiatesProviderClient: false
implementsRuntimeShell: false
invokesRuntimeShell: false
opensManagedAuditConnection: false
startsUpstreamServices: false
writesUpstreamState: false
requestsJavaMiniKvEcho: false
nextNodeVersionSuggested: "Node v361"
```

注意 `allowsSandboxHandleReviewPrerequisiteClosure=true` 不是执行授权，只是允许进入后续“前置条件关闭审查”。真实 secret、endpoint、provider/client、runtime shell 和外部连接仍然全部关闭。

## Checks

`createChecks()` 把决策记录变成 20 个检查：

```ts
sourceNodeV359Ready
sourceArchiveVerificationAllowsDecision
sourceArchiveFilesComplete
sourceChecksAllPassed
sourcePacketGateShapeComplete
necessityProofPresent
decisionInputsComplete
decisionDigestStable
decisionLimitedToPrerequisiteClosure
noCredentialValueRequestedOrRead
noRawEndpointRequestedOrParsed
noProviderClientInstantiated
noRuntimeShellImplementedOrInvoked
noManagedAuditHttpTcp
noUpstreamServiceStarted
noUpstreamMutation
noJavaMiniKvEchoRequired
productionAuditStillBlocked
productionWindowStillBlocked
readyForSandboxHandleReviewPacketGateDecisionRecord
```

这些检查确保 v360 不把 decision record 偷换成真实执行入口。

## fail closed

测试里有空 archive root 场景。如果 v359 evidence 不存在，v360 会变成：

```text
decisionState=blocked
decision=blocked
readyForNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification=false
```

并出现：

```text
NODE_V359_NOT_READY
NODE_V359_DECISION_NOT_ALLOWED
SOURCE_ARCHIVE_FILES_INCOMPLETE
```

这说明缺 v359 证据时，v360 只会停住，不会请求 Java / mini-kv 补无关版本。

## 测试

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord.test.ts
```

覆盖：

1. 正常记录 decision，20/20 checks passed。
2. v359 evidence 缺失时 fail closed。
3. route JSON / Markdown 可访问，安全边界仍关闭。

## 验证记录

```text
npm.cmd run typecheck
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord.test.ts
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord.test.ts
npm.cmd run build
Node HTTP smoke JSON / Markdown passed
Playwright MCP route Markdown screenshot captured
```
