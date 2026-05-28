# Node v364 运行解释：minimal read-only integration regular gate

## 本版目标

v364 由 Node v363 衍生。v363 已完成 sandbox handle review prerequisite closure review 的归档验证，但继续只做 archive / closure 会让主线显得绕。

所以 v364 把 Node v349 真实跑通的最小只读联调，以及 Node v350 的 passed archive verification，沉淀为一个可复用的 regular gate。

这版仍然不重跑 Java / mini-kv，不自动启动上游，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 managed audit HTTP/TCP，不实现 runtime shell，也不写 Java 或 mini-kv。

## 运行结果

```text
profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate.v1
gateState: minimal-read-only-integration-regular-gate-ready
gateDecision: standardize-v349-read-only-smoke-as-regular-gate
sourceNodeVersion: Node v350
checks: 34/34 passed
readOnlyTargetCount: 5
sourceCheckCount: 25
sourcePassedCheckCount: 25
readyForMinimalReadOnlyIntegrationRegularGate: true
readyForNodeV365RegularGateArchiveVerification: true
```

## 常规门禁内容

v364 固化的 regular gate 包含：

```text
safe env:
- UPSTREAM_PROBES_ENABLED=true
- UPSTREAM_ACTIONS_ENABLED=false
- ACCESS_GUARD_ENFORCEMENT_ENABLED=true
- ORDEROPS_AUTH_TOKEN_SECRET=configured

required headers:
- x-orderops-operator-id
- x-orderops-roles
- x-orderops-operator-verified
- x-orderops-approval-correlation-id

read-only targets:
- Java GET /actuator/health
- Java GET /api/v1/ops/overview
- mini-kv HEALTH
- mini-kv INFOJSON
- mini-kv STATSJSON
```

## 安全边界

```text
regularGateOnly=true
gateDefinitionOnly=true
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
```

## 产物

- HTTP JSON evidence：`d/364/evidence/minimal-read-only-integration-regular-gate-v364-http.json`
- HTTP Markdown evidence：`d/364/evidence/minimal-read-only-integration-regular-gate-v364-http.md`
- summary：`d/364/evidence/minimal-read-only-integration-regular-gate-v364-summary.json`
- browser snapshot：`d/364/evidence/minimal-read-only-integration-regular-gate-v364-browser-snapshot.md`
- HTML：`d/364/minimal-read-only-integration-regular-gate-v364.html`
- 截图：`d/364/图片/minimal-read-only-integration-regular-gate-v364.png`

## 验证

```text
npm.cmd run typecheck
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.test.ts
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.test.ts
npm.cmd run build
Node HTTP smoke: JSON + Markdown route passed with audit headers
Playwright MCP: archived HTML snapshot + screenshot captured
```

## 合理性说明

v364 合理，因为它回应了当前节奏的问题：Node 前面几版 archive / closure 偏多，而 v349 已经真实完成最小只读联调。v364 不再继续扩写新的 prerequisite 链条，而是把已通过的真实只读联调转换成可重复执行、可审计、可失败分类的常规门禁。

它仍然不等于生产联调全部完成。生产窗口、生产审计、真实 managed audit endpoint、credential value、provider/client 和 runtime shell 仍然保持关闭。

## 结论

v364 已把最小只读联调从一次性 evidence 转成 regular gate。下一步可以做一次 v365 archive / CI 友好化收口，然后再决定是否进入更真实的只读 gate 执行窗口。
