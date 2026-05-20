# 279. Node v275 credential resolver approval-required boundary upstream echo verification

## 本版所处项目进度

v275 接在 v274 后面，当前链路已经走到：

```text
Node v273 disabled implementation candidate review
 -> Java v113 + mini-kv v120 只读回显
 -> Node v274 disabled candidate upstream echo verification
 -> Java v115 + mini-kv v121 只读强化 approval-required boundary
 -> Node v275 approval-required boundary upstream echo verification
```

这版的价值是把 v274 留下的 6 个 `approval-required` boundary 重新对齐到三项目证据里，但仍然不实现真实 credential resolver。

## 新增服务入口

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.ts
```

主入口：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationProfile {
  const sourceNodeV274 = createSourceNodeV274(input.config);
  const javaV115 = createJavaV115Reference();
  const miniKvV121 = createMiniKvV121Reference();
  const checks = createChecks(input.config, sourceNodeV274, javaV115, miniKvV121);
```

这三个输入对应三项目职责：

```text
sourceNodeV274：Node 自己上一版 disabled-candidate verification 结果
javaV115：Java 对 6 个 approval-required boundary 的只读解释
miniKvV121：mini-kv 对 6 个 approval-required boundary 的非参与回执
```

## 读取 Node v274

v275 不重新分类 boundary，而是消费 v274 的结论：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification({
  config,
});
```

随后把 v274 的关键字段映射成本版基准：

```ts
candidateDecisionCount: source.sourceNodeV273.candidateDecisionCount,
candidateReadyDecisionCount: source.sourceNodeV273.candidateReadyDecisionCount,
approvalRequiredDecisionCount: source.sourceNodeV273.approvalRequiredDecisionCount,
approvalRequiredBoundaryCodes: source.sourceNodeV273.approvalRequiredBoundaryCodes,
approvalRequiredRequirementCodes: [...APPROVAL_REQUIRED_REQUIREMENT_CODES],
sourceNodeV273Ready: source.echoVerification.sourceNodeV273Ready,
javaV113EchoReady: source.echoVerification.javaV113EchoReady,
miniKvV120NonParticipationReady: source.echoVerification.miniKvV120NonParticipationReady,
```

这里有一个重要边界：v275 只承接 v274 的只读结论，不让真实 resolver 借机打开。

## Java v115 证据

v275 使用 versioned snapshot，而不是覆盖旧 shared fixture：

```ts
const JAVA_V115_BUILDER =
  "D:/javaproj/advanced-order-platform/v115-snapshot/EchoReceiptBuilder.java";
const JAVA_V115_SUPPORT =
  "D:/javaproj/advanced-order-platform/v115-snapshot/EchoSupport.java";
const JAVA_V115_RECORDS =
  "D:/javaproj/advanced-order-platform/v115-snapshot/EchoRecords.java";
const JAVA_V115_DECISION_RECORDS =
  "D:/javaproj/advanced-order-platform/v115-snapshot/DecisionEchoRecords.java";
```

这样做是为了避免 v115 Java 代码覆盖 v113 旧 fixture，导致 v274 旧测试被污染。

关键 snippet 包括：

```ts
snippet("java-v115-echo-mode", JAVA_V115_SUPPORT, "java-v115-credential-resolver-approval-required-boundary-echo-refinement-only"),
snippet("java-v115-proof-claim", JAVA_V115_BUILDER, "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.approvalRequiredBoundaryExplanations.size=6"),
snippet("java-v115-node-action", JAVA_V115_BUILDER, "Verify managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.approvalRequiredBoundaryExplanations.size=6"),
snippet("java-v115-decision-records-split", JAVA_V115_DECISION_RECORDS, "ReleaseApprovalSandboxEndpointCredentialResolverDecisionEchoRecords"),
snippet("java-v115-workflow-template", JAVA_V115_BUILDER, "workflowStep(\"approvalRequiredBoundaryExplanationsEchoed\""),
```

这些检查不仅确认 Java v115 业务字段，还确认 Java 继续复用 echo workflow template，并且已经拆出 decision records。

## mini-kv v121 证据

mini-kv v121 的主证据是 JSON receipt：

```ts
const MINI_KV_V121_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-approval-required-boundary-non-participation-receipt.json";
```

v275 结构化读取：

```ts
const root = readJsonObject(MINI_KV_V121_RECEIPT);
const receipt = objectField(root, "credential_resolver_approval_required_boundary_non_participation_receipt");
const sourceVerification = objectField(receipt, "source_node_v274_verification");
const approvalRequiredBoundaries = objectField(receipt, "approval_required_boundaries");
const details = objectArrayField(approvalRequiredBoundaries, "details").map((detail) => ({
  code: stringField(detail, "code") ?? "",
  owner: stringField(detail, "owner") ?? "",
  reason: stringField(detail, "reason") ?? "",
  mini_kv_position: stringField(detail, "mini_kv_position") ?? "",
  prohibited_runtime_actions: stringArrayField(detail, "prohibited_runtime_actions"),
  read_only: booleanField(detail, "read_only") === true,
  approval_required: booleanField(detail, "approval_required") === true,
  mini_kv_participates: booleanField(detail, "mini_kv_participates") === true,
}));
```

这比只做文本搜索更强，因为 v275 可以直接校验每个 boundary 的 `prohibited_runtime_actions` 和 `mini_kv_participates=false`。

## 核心校验

6 个 approval-required boundary 常量：

```ts
const APPROVAL_REQUIRED_BOUNDARY_CODES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];
```

requirement code 对齐：

```ts
approvalRequiredRequirementCodesAligned:
  arrayEquals(sourceNodeV274.approvalRequiredRequirementCodes, [...APPROVAL_REQUIRED_REQUIREMENT_CODES])
  && arrayEquals(javaV115.approvalRequiredRequirementCodes, [...APPROVAL_REQUIRED_REQUIREMENT_CODES]),
```

mini-kv non-participation detail 对齐：

```ts
miniKvApprovalRequiredDetailsComplete:
  miniKvV121.approvalRequiredBoundaryDetails.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length
  && miniKvV121.approvalRequiredBoundaryDetails.every((detail) =>
    detail.read_only
    && detail.approval_required
    && !detail.mini_kv_participates
    && APPROVAL_REQUIRED_BOUNDARY_CODES.some((code) => code === detail.code)),
```

危险动作映射对齐：

```ts
prohibitedRuntimeActionsAligned:
  APPROVAL_REQUIRED_BOUNDARY_CODES.every((code) => {
    const detail = miniKvV121.approvalRequiredBoundaryDetails.find((candidate) => candidate.code === code);
    return detail !== undefined && arrayEquals(detail.prohibited_runtime_actions, [
      ...PROHIBITED_ACTIONS_BY_BOUNDARY[code],
    ]);
  }),
```

这里的 `PROHIBITED_ACTIONS_BY_BOUNDARY` 把每个 approval-required boundary 和禁止动作绑定起来，例如 credential boundary 禁止 `read-credential-value`，endpoint boundary 禁止 `parse-raw-endpoint-url`，ledger boundary 禁止 `write-approval-ledger`。

## 安全边界

v275 输出继续强制：

```ts
readyForManagedAuditSandboxAdapterConnection: false,
readyForProductionAudit: false,
readyForProductionWindow: false,
readyForProductionOperations: false,
realResolverImplementationAllowed: false,
executionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
credentialValueRead: false,
rawEndpointUrlParsed: false,
externalRequestSent: false,
secretProviderInstantiated: false,
resolverClientInstantiated: false,
schemaMigrationExecuted: false,
approvalLedgerWritten: false,
automaticUpstreamStart: false,
```

这说明 v275 是“解释/证据对齐版”，不是“真实 resolver 实现版”。

## 路由接入

文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增路由仍放在统一 route table：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMarkdown),
```

这延续 v225 之后的路由规则，不再手写一套 JSON / Markdown 分支。

## 文档目录变化

本版正式启用新的同级目录：

```text
d/275/解释/credential-resolver-approval-required-boundary-upstream-echo-verification-v275.md
d/275/图片/credential-resolver-approval-required-boundary-upstream-echo-verification-v275.png
代码讲解记录_生产雏形阶段2/279-credential-resolver-approval-required-boundary-upstream-echo-verification-v275.md
docs/plans2/v274-post-disabled-candidate-echo-roadmap.md
```

旧 `c/`、`代码讲解记录_生产雏形阶段/`、`docs/plans/` 保留历史内容，新内容优先写入同级续写目录。

## 测试覆盖

文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.test.ts
```

覆盖四类场景：

```text
1. 正常验证 Node v274 + Java v115 + mini-kv v121
2. 强制 historical fixture fallback，模拟 GitHub runner 没有 sibling workspace
3. UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 打开时必须 blocked
4. JSON / Markdown route 通过 audit route table 暴露
```

## 一句话总结

Node v275 把 6 个 approval-required credential resolver boundary 从“需要审批”推进到“三项目解释一致”：Java 证明这些 boundary 的业务解释完整，mini-kv 证明自己继续不参与 resolver/credential/raw endpoint/storage，Node 统一验证 requirement codes、prohibited runtime actions 和 no-side-effect 边界；真实 resolver 仍未打开。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.test.ts -> 2 files, 8 tests passed
npm test -> 215 files, 728 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, verificationState=credential-resolver-approval-required-boundary-upstream-echo-verification-ready, ready=true, checkCount=26, passedCheckCount=26, javaReady=true, miniKvReady=true, blockerCount=0, markdownStatus=200
Chrome screenshot -> d/275/图片/credential-resolver-approval-required-boundary-upstream-echo-verification-v275.png
```

## 清理记录

HTTP smoke 启动的 Node 服务 PID 32228 已停止。本版验证产生的 `.tmp` 和 `dist` 会在提交前删除。
