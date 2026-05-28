# Node v366 运行解释：explicit read-window gate execution decision

## 本版目标

v366 由 Node v365 衍生。v365 已完成 regular gate archive + CI/operator friendly check；按计划，v366 不再继续 archive / closure，而是判断是否可以进入真实只读执行窗口。

本轮没有明确 Java / mini-kv 读窗口授权，所以 v366 的结论是：

```text
gateExecutionDecision: wait-for-external-read-window
actualProbeExecutedNow: false
```

这不是失败，而是计划要求的停止点：没有窗口就不继续绕，也不擅自启动另外两个项目。

## 运行结果

```text
profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision.v1
decisionState: explicit-read-window-gate-execution-decision-ready
gateExecutionDecision: wait-for-external-read-window
sourceNodeVersion: Node v365
checks: 22/22 passed
externalReadWindowRequired: true
explicitReadWindowProvided: false
actualProbeExecutedNow: false
productionBlockerCount: 0
```

## 安全边界

```text
decisionOnly=true
rerunsLiveProbe=false
actualProbeExecutedNow=false
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
```

## 产物

- HTTP JSON evidence：`d/366/evidence/explicit-read-window-gate-execution-decision-v366-http.json`
- HTTP Markdown evidence：`d/366/evidence/explicit-read-window-gate-execution-decision-v366-http.md`
- summary：`d/366/evidence/explicit-read-window-gate-execution-decision-v366-summary.json`
- browser snapshot：`d/366/evidence/explicit-read-window-gate-execution-decision-v366-browser-snapshot.md`
- HTML：`d/366/explicit-read-window-gate-execution-decision-v366.html`
- 截图：`d/366/图片/explicit-read-window-gate-execution-decision-v366.png`

## 验证

```text
npm.cmd run typecheck
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision.test.ts
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision.test.ts
npm.cmd run build
Node HTTP smoke: JSON + Markdown route passed with audit headers
Playwright MCP: archived HTML snapshot + screenshot captured
```

## 合理性说明

v366 合理，因为它把“是否真实执行最小只读 gate”变成明确决策，而不是继续生成新的 archive / closure。

当前没有明确 Java / mini-kv 读窗口，按照计划必须停在 `wait-for-external-read-window`。这比继续推进 Node 自己的报告更真实：真实联调需要上游窗口，不应该靠 Node 单方面自转。

## 结论

v366 已完成执行窗口决策。本轮没有真实重跑 Java / mini-kv gate。下一步需要用户明确授权或上游项目提供读窗口，之后才能进入 Node v367 最小只读 gate execution。
