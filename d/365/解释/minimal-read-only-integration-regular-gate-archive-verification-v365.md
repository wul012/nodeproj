# Node v365 运行解释：minimal read-only integration regular gate archive verification

## 本版目标

v365 由 Node v364 衍生。v364 已把 v349/v350 的真实最小只读联调证据固化为 `minimal read-only integration regular gate`。

本版按计划把两件事合并到同一版完成：

```text
1. 验证 v364 regular gate 的归档完整性。
2. 写出 CI/operator friendly check，让后续验证分成 focused / grouped / build / smoke，而不是一次性跑大批量测试。
```

这版不重跑 Java / mini-kv，不自动启动上游，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 managed audit HTTP/TCP，不实现 runtime shell，也不写 Java 或 mini-kv。

## 运行结果

```text
profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification.v1
archiveVerificationState: minimal-read-only-integration-regular-gate-archive-verified
archiveVerificationDecision: archive-minimal-read-only-integration-regular-gate-and-ci-operator-check
sourceNodeVersion: Node v364
checks: 40/40 passed
archive files: 11/11 present
ciOperatorFriendlyCheckIncluded: true
readyForNodeV366ExplicitReadWindowGateExecutionDecision: true
```

## CI / Operator Friendly Check

v365 固化的分步验证建议：

```text
focused:
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.test.ts

grouped:
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.test.ts

build:
npm.cmd run build

smoke:
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate
```

这里明确 `avoidsFullTestBatchByDefault=true`，符合后续规则：不要默认一次性跑大量测试。

## 安全边界

```text
archiveVerificationOnly=true
ciOperatorFriendlyCheckIncluded=true
rerunsLiveProbe=false
startsJavaService=false
startsMiniKvService=false
connectsManagedAudit=false
sendsManagedAuditHttpTcp=false
credentialValueRequested=false
credentialValueRead=false
rawEndpointUrlRequested=false
rawEndpointUrlParsed=false
secretProviderInstantiated=false
resolverClientInstantiated=false
runtimeShellImplemented=false
runtimeShellInvocationAllowed=false
executionAllowed=false
requiresParallelJavaV153MiniKvV144ReadOnlyEcho=false
```

## 产物

- HTTP JSON evidence：`d/365/evidence/minimal-read-only-integration-regular-gate-archive-verification-v365-http.json`
- HTTP Markdown evidence：`d/365/evidence/minimal-read-only-integration-regular-gate-archive-verification-v365-http.md`
- summary：`d/365/evidence/minimal-read-only-integration-regular-gate-archive-verification-v365-summary.json`
- browser snapshot：`d/365/evidence/minimal-read-only-integration-regular-gate-archive-verification-v365-browser-snapshot.md`
- HTML：`d/365/minimal-read-only-integration-regular-gate-archive-verification-v365.html`
- 截图：`d/365/图片/minimal-read-only-integration-regular-gate-archive-verification-v365.png`

## 验证

```text
npm.cmd run typecheck
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification.test.ts
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification.test.ts
npm.cmd run build
Node HTTP smoke: JSON + Markdown route passed with audit headers
Playwright MCP: archived HTML snapshot + screenshot captured
```

## 合理性说明

v365 合理，因为它没有把 archive verification 和 CI/operator friendly check 拆成两个很小版本，而是一次性完成收口。

同时，它没有继续向 Java / mini-kv 要新 evidence：v364 没有 invalid-read-contract，v349 的最小只读联调已经真实 5/5 passed。下一步应进入 explicit read-window gate execution decision，而不是继续写新的 prerequisite closure。

## 结论

v365 已完成 v364 regular gate 的归档验证和 CI/operator 友好化收口。下一步是 Node v366：判断是否具备明确的只读执行窗口；如果没有 Java / mini-kv 读窗口，就停在 `wait-for-external-read-window`。
