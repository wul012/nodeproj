# Node v299 运行解释：runtime shell candidate gate decision record

## 本版定位

Node v299 消费 Node v298 upstream echo verification 的冻结结果，只记录一个被验证过的 blocked decision。

它不是 runtime shell 实现版本，不实例化 provider/client，不读取 credential value，不解析 raw endpoint URL，不发 HTTP/TCP，不写 ledger/schema，不自动启动 Java 或 mini-kv。

## 运行结果

证据文件：

```text
d/299/evidence/credential-resolver-runtime-shell-candidate-gate-decision-record-v299.json
d/299/evidence/credential-resolver-runtime-shell-candidate-gate-decision-record-v299.md
```

核心结果：

```text
decisionRecordState = runtime-shell-candidate-gate-decision-record-ready
runtimeShellDecision = blocked
readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord = true
readyForParallelJavaV135MiniKvV132EchoRequest = true
readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification = false
checkCount = 14
passedCheckCount = 14
productionBlockerCount = 0
warningCount = 1
recommendationCount = 2
```

## 消费的上游证据

Node v298：

```text
verificationState = runtime-shell-candidate-gate-upstream-echo-verification-ready
readyForNodeV299RuntimeShellCandidateGateDecisionRecord = true
readyForNodeV299RuntimeShellImplementation = false
runtimeShellImplemented = false
executionAllowed = false
connectsManagedAudit = false
```

Java v134 / mini-kv v131 的证据已经被 v298 冻结进来，所以 v299 只需要消费 v298 的 verifed blocked decision，不再重算上游。

## 决策记录

v299 的 decision record 显式写死为 blocked：

```text
decision = blocked
upstreamEchoVerified = true
allowsParallelJavaV135MiniKvV132EchoRequest = true
allowsNodeV300BeforeUpstreamEcho = false
allowsDisabledRuntimeShellImplementation = false
allowsDisabledRuntimeShellInvocation = false
allowsCredentialValueRead = false
allowsRawEndpointUrlParse = false
allowsManagedAuditConnection = false
allowsSchemaMigration = false
allowsApprovalLedgerWrite = false
allowsAutomaticUpstreamStart = false
```

这版的作用是把“v298 已验证 blocked”变成单独的决策记录，而不是把它误写成 runtime implementation approval。

## 代码结构

入口在 [src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts:30)。

关键分层是：

- `createSourceNodeV298(...)`：读取并固化 v298 upstream echo verification。
- `createDecisionRecord(...)`：生成 blocked 决策本体和 required evidence。
- `createChecks(...)`：把上游 readiness、blocked 状态、只读边界和配置门禁汇总成检查位。
- `collectProductionBlockers(...)`：只在真正违反边界时才列 blocker。
- `collectWarnings()` / `collectRecommendations()`：给出“记录 blocked decision”与“Java v135 + mini-kv v132 并行”的下一步提示。

## 路由

路由在 [src/routes/auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:742) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record
```

JSON 和 Markdown 都只读输出同一份决策记录。

## 测试

[test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.test.ts:13) 覆盖：

- blocked decision 的默认正向路径。
- forced historical fixture fallback。
- upstream probes/actions 打开时仍 blocked。
- JSON / Markdown 路由可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.test.ts
npm test
npm run build
```

本轮还补了本机 Chrome 的页面截图，归档在 `d/299/图片/`。

## 下一步

v299 之后应先做 Java v135 + mini-kv v132 的并行 echo，再让 Node 进入 v300。
