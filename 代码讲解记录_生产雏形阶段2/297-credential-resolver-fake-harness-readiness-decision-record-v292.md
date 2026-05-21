# 297 - Node v292 credential resolver fake harness readiness decision record

## 版本定位

Node v292 是 v289 衍生计划的收口版。它不再继续扩展 fake harness runtime，而是把 Node v287-v291 的证据串成一个 readiness decision record：当前可以归档决策记录，但不能进入 disabled runtime shell planning。

入口是 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts:31) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord`。这个函数只读取 Node v291 profile，生成只读 decision record，不实例化 resolver、provider、client，也不启动上游。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordTypes.ts:5) 继续保持显式安全字段：

```ts
readyForDisabledRuntimeShellPlanning: false;
realResolverImplementationAllowed: false;
testOnlyFakeHarnessAllowed: false;
fakeHarnessRuntimeEnabled: false;
fakeHarnessInvocationAllowed: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这不是冗余，而是面向审计的分层边界：runtime、credential、endpoint、network、schema、ledger、auto-start 都要单独可读。

## Source Node v291

`createSourceNodeV291` 在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts:117) 调用 v291 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification({ config });
```

它提取 v291 的关键结论：

```ts
verificationState: "blocked";
javaExecutionDeniedEchoMissing: true;
javaExecutionDeniedEchoPresent: false;
miniKvV128NonParticipationReady: true;
miniKvPreflightDigestAligned: true;
implementationStillBlocked: true;
```

这说明 mini-kv 已经给出非参与回声，Java 质量队列也存在，但 Java direct execution-denied echo 仍缺失。

## Readiness Decision Record

`createReadinessDecisionRecord` 在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts:180) 构造决策记录。核心字段是：

```ts
decision: "blocked";
allowsDisabledRuntimeShellPlanning: false;
allowsFakeHarnessRuntimeImplementation: false;
allowsFakeHarnessRuntimeInvocation: false;
allowsCredentialValueRead: false;
allowsManagedAuditConnection: false;
```

这里刻意让 `decisionRecordState` 和 `readinessDecision` 分离：decision record 能归档，readiness 不能解锁。这个区分避免了“有报告 = 可以继续做 runtime”的误读。

## Required Evidence

`createRequiredEvidence` 在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts:231) 固定四项证据：

```text
node-v290-execution-denied-route-preflight: present
java-v127-v130-quality-evidence: present
mini-kv-v128-execution-denied-receipt: present
java-direct-execution-denied-echo: missing
```

前三项证明 v287-v291 链条已经对齐；最后一项解释为什么 v292 必须 blocked。

## Checks 和 Blocker

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.ts:288) 产出 18 个检查，默认全部通过。这里的“全部通过”代表 decision record 结构正确、边界关闭，而不是 runtime ready。

`collectProductionBlockers` 会保留：

```text
JAVA_EXECUTION_DENIED_ECHO_MISSING
```

这是业务决策 blocker，提示下一阶段需要 Java direct echo 或新计划重新定义路线。

## 路由和测试

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:679) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record
```

测试在 [managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.test.ts:12)，覆盖：

- decision record ready，但 readiness decision blocked。
- `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 下 v291 source chain 可用。
- 开启 upstream probes/actions 会让 decision record state blocked。
- JSON 和 Markdown route 都可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.test.ts test/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.test.ts test/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.test.ts
npm test
npm run build
```

全量结果：225 个测试文件、769 个用例通过。`npm run build` 通过。

## 本版结论

v292 完成了 v289 衍生计划的最后一个节点：它明确告诉后续开发，不能从 Node 自己继续抢跑 disabled runtime shell。下一阶段要另起计划，优先处理 Java direct execution-denied echo 或重新定义 fake harness 路线。
