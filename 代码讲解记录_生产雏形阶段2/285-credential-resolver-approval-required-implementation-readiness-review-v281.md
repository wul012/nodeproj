# 285. Node v281 credential resolver approval-required implementation readiness review

## 本版所处项目进度

v281 是 `statusRoutes` 质量线收口后的主流程回归版本。

前置链路：

```text
Node v274：disabled candidate upstream echo verification
Java v115 + mini-kv v121：approval-required boundary 只读对齐
Node v275：approval-required boundary upstream echo verification
Node v276-v280：statusRoutes 质量拆分收口
Node v281：approval-required implementation readiness review
```

这版不是实现真实 managed audit resolver，而是把 v275 已经确认的 6 个 approval-required boundary 转成“实现前必须补齐什么证据”的 review。

## 新增类型文件

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewTypes.ts
```

核心 profile：

```ts
export interface ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewProfile {
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review.v1";
  reviewState: "credential-resolver-approval-required-implementation-readiness-review-ready" | "blocked";
  readyForJavaV116MiniKvV122Echo: boolean;
  readyForManagedAuditResolverImplementation: false;
  realResolverImplementationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
}
```

这些 `false` 字段不是装饰，它们是本版的安全边界：即使 review ready，也不能理解成可以连接真实 managed audit。

## 新增服务

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview.ts
```

入口函数：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewProfile {
```

它先读取 v275：

```ts
const sourceNodeV275 = createSourceNodeV275(input.config);
```

再生成本版 boundary readiness：

```ts
const boundaryReadiness = createBoundaryReadiness();
```

最后用 checks 决定 review state：

```ts
const reviewState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview
  ? "credential-resolver-approval-required-implementation-readiness-review-ready"
  : "blocked";
```

## 六个 boundary 的来源

本版只选取真正进入 implementation readiness 的 6 个 approval-required boundary：

```ts
const APPROVAL_REQUIRED_BOUNDARY_CODES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const
```

这和 v275 的 boundary echo 对齐，但 v281 的职责更进一步：不是再证明“解释一致”，而是列出“实现前需要什么人工证据、策略证据和回显证据”。

## readiness blueprint

文件中用 `READINESS_BLUEPRINTS` 描述每个 boundary 的后续要求：

```ts
CREDENTIAL_HANDLE: {
  owner: "security",
  artifacts: [
    "credential-handle-review-id",
    "credential-value-redaction-contract",
    "operator-visible-secret-value-prohibition",
  ],
  java: "Echo credential handle review id without credential value fields.",
  miniKv: "Confirm no credential value load/store/include behavior.",
  node: "Verify handle-only evidence and value-redaction invariants.",
  prohibited: ["read-credential-value", "store-credential-value", "render-credential-value"],
},
```

这里每个 boundary 都有四类输出：

```text
requiredArtifacts
javaV116EchoHint
miniKvV122ReceiptHint
nodeV282VerificationHint
```

这就是为什么下一步可以并行 Java v116 + mini-kv v122：两边都只消费 Node v281 的只读 review。

## createBoundaryReadiness

核心组装函数：

```ts
function createBoundaryReadiness(): ApprovalRequiredImplementationBoundaryReadiness[] {
  return APPROVAL_REQUIRED_BOUNDARY_CODES.map((code) => {
    const blueprint = READINESS_BLUEPRINTS[code];
    return {
      code,
      requirementFromV268: REQUIREMENT_BY_BOUNDARY[code],
      readinessState: "echo-ready-implementation-blocked",
      implementationDisposition: "requires-explicit-follow-up-artifacts",
      owner: blueprint.owner,
      requiredArtifacts: [...blueprint.artifacts],
      javaV116EchoHint: blueprint.java,
      miniKvV122ReceiptHint: blueprint.miniKv,
      nodeV282VerificationHint: blueprint.node,
      prohibitedRuntimeActions: [...blueprint.prohibited],
      readyForJavaV116Echo: true,
      readyForMiniKvV122Receipt: true,
      readyForNodeV282Verification: false,
      readyForRuntimeImplementation: false,
    };
  });
}
```

注意最后两项：

```text
readyForNodeV282Verification=false
readyForRuntimeImplementation=false
```

这代表 v281 只把任务交给 Java / mini-kv 做回显，不直接跳到 Node v282，更不会跳到真实实现。

## checks 设计

本版 checks 覆盖三组风险：

```text
sourceNodeV275Ready
sourceBoundaryCodesAligned
sourceKeepsCredentialBoundaryClosed
sourceKeepsRawEndpointBoundaryClosed
sourceKeepsConnectionBoundaryClosed
sourceKeepsWriteBoundaryClosed
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

配置侧用：

```ts
upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

所以如果打开上游探测或动作，v281 会进入 `blocked`，防止把 readiness review 误当作真实联调。

## 路由接入

文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增注册：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewMarkdown,
),
```

仍然使用 audit JSON/Markdown route table，没有重新写一套 `format=markdown` 分支。

## Markdown renderer

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewRenderer.ts
```

renderer 输出：

```text
Source Node v275
Readiness Review
Boundary Readiness
Checks
Summary
Production Blockers
Warnings
Recommendations
Evidence Endpoints
Next Actions
```

这和之前的证据报告版式一致，便于 Java / mini-kv 直接读取 next actions。

## 测试覆盖

文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview.test.ts
```

三个测试点：

```text
1. 默认安全配置下 review ready，且 readyForManagedAuditResolverImplementation=false
2. UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 打开时 blocked
3. JSON 与 Markdown 路由都能通过 audit route table 输出
```

代表性断言：

```ts
expect(profile.summary).toMatchObject({
  checkCount: 21,
  passedCheckCount: 21,
  boundaryCount: 6,
  requiredArtifactCount: 18,
});
```

以及：

```ts
expect(profile.boundaryReadiness.every((boundary) => !boundary.readyForRuntimeImplementation)).toBe(true);
```

## 一句话总结

Node v281 把 v275 的 approval-required boundary 结果整理成 implementation readiness review：6 个 boundary、18 个 required artifact、Java v116 / mini-kv v122 并行回显建议；它只做只读审查，不打开真实 resolver、不读 credential、不连 managed audit。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run v281 focused tests -> 2 files, 7 tests passed
npm test -> 216 files, 731 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, reviewState=credential-resolver-approval-required-implementation-readiness-review-ready, readyForJavaV116MiniKvV122Echo=true, readyForManagedAuditResolverImplementation=false, boundaryCount=6, requiredArtifactCount=18, checkCount=21, passedCheckCount=21, markdown=200, executionAllowed=false, connectsManagedAudit=false
Chrome screenshot -> d/281/图片/credential-resolver-approval-required-implementation-readiness-review-v281.png
```

## 清理记录

HTTP smoke 启动的 Node 进程会在本版收尾前停止。本版验证产生的 `.tmp` 和 `dist` 会在提交前删除。
