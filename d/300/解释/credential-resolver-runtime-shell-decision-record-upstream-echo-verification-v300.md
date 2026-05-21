# Node v300 运行解释：runtime shell decision record upstream echo verification

## 本版定位

Node v300 消费 Node v299 blocked decision record、Java v135 runtime shell decision record echo、mini-kv v132 runtime shell decision record non-participation receipt。

它只做 upstream echo verification，不实现 runtime shell，不实例化 provider/client，不读取 credential value，不解析 raw endpoint URL，不发 HTTP/TCP，不写 ledger/schema，不自动启动 Java 或 mini-kv。

## 运行结果

证据文件：

```text
d/300/evidence/credential-resolver-runtime-shell-decision-record-upstream-echo-verification-v300.json
d/300/evidence/credential-resolver-runtime-shell-decision-record-upstream-echo-verification-v300.md
```

核心结果：

```text
verificationState = runtime-shell-decision-record-upstream-echo-verification-ready
readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification = true
readyForPostRuntimeShellDecisionPlan = true
checkCount = 19
passedCheckCount = 19
productionBlockerCount = 0
warningCount = 1
recommendationCount = 2
```

## 消费的上游证据

Node v299：

```text
decisionRecordState = runtime-shell-candidate-gate-decision-record-ready
runtimeShellDecision = blocked
requiredEvidenceCount = 4
noGoConditionCount = 6
runtimeShellImplemented = false
executionAllowed = false
connectsManagedAudit = false
```

Java v135：

```text
echoMode = java-v135-credential-resolver-runtime-shell-decision-record-echo-only
sourceSpan = Node v299
nextNodeVersion = Node v300
readyForNodeV300 = true
sideEffectBoundariesClosed = true
```

mini-kv v132：

```text
receiptVersion = mini-kv-credential-resolver-runtime-shell-decision-record-non-participation-receipt.v1
releaseVersion = v132
consumerHint = Node v300 runtime shell decision record upstream echo verification
readyForNodeV300 = true
runtimeShellDecisionRecordOnly = true
sideEffectBoundariesClosed = true
```

## 关键判断

v300 证明的是“三方都同意 Node v299 的 blocked decision record”，不是 runtime implementation approval。

```text
upstreamEchoAligned = true
blockedDecisionAligned = true
requiredEvidenceAligned = true
noGoConditionsAligned = true
sideEffectBoundariesAligned = true
implementationStillBlocked = true
```

## 路由

路由在 [src/routes/auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:748) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification
```

JSON 和 Markdown 都只读输出同一份 upstream echo verification。

## 测试

[test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.test.ts:13) 覆盖：

- Java v135 + mini-kv v132 正向对齐。
- forced historical fixture fallback。
- upstream probes/actions 打开时仍 blocked。
- JSON / Markdown 路由可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.test.ts
HTTP smoke JSON/Markdown route = 200
Chrome screenshot = d/300/图片/credential-resolver-runtime-shell-decision-record-upstream-echo-verification-v300.png
```

截图说明：本轮已验证 Playwright MCP 可用，但该 MCP 阻止直接打开 `file://`，且当前工具集未暴露自定义 HTTP header 注入；因此截图使用本机 Chrome headless 打开归档 HTML 生成，HTTP smoke 已单独在鉴权开启的路由上通过。

后续收口还会继续运行 full test 和 build。

## 下一步

v300 之后应另起 post-decision plan。下一步不能直接把 upstream echo ready 当作 runtime shell approval；如果继续推进，只能先写后续计划，决定是停止 runtime shell 链、继续 blocked planning，还是提出新的显式审批前置条件。
