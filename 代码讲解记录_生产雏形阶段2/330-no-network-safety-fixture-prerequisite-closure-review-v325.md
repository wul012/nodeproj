# 330. Node v325 no-network safety fixture prerequisite closure review

## 版本进度

v325 接在 v324 之后。v324 已经消费 Node v323、Java v149、mini-kv v141，证明三方都理解 no-network safety fixture contract；v325 则把这条证据转成 prerequisite closure 结果。

对应计划是：

```text
D:\nodeproj\orderops-node\docs\plans2\v322-post-endpoint-handle-prerequisite-closure-roadmap.md
```

v325 完成后，新的有效计划切换为：

```text
D:\nodeproj\orderops-node\docs\plans2\v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md
```

## 代码结构

本版保持拆分模式，没有把 closure review 写进路由大文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewTypes.ts      199 行
src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview.ts           505 行
src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewRenderer.ts   135 行
test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview.test.ts              275 行
```

`auditJsonMarkdownRoutes.ts` 只新增一次 route registration：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review
```

这符合当前规则：业务判断放在 service，Markdown 展示放 renderer，类型独立维护，路由只负责注册。

## 核心代码讲解

入口函数是：

```typescript
loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview(...)
```

它先读取 v324 的结果：

```typescript
const sourceNodeV324 = createSourceNodeV324(input.config);
const closureReview = createClosureReview(sourceNodeV324);
const checks = createChecks(input.config, sourceNodeV324, closureReview);
```

这里没有重新读取 Java v149 或 mini-kv v141 的原始证据，而是消费 v324 已经完成的 upstream echo verification。这样 v325 的职责很清楚：它不是再做一次三方 echo，而是判断 prerequisite 是否能关闭。

`createSourceNodeV324(...)` 复用 v324 service 输出，把关键字段收进当前 closure review：

```typescript
verificationDigest: source.echoVerification.verificationDigest,
sourceNodeV323Ready: source.echoVerification.sourceNodeV323Ready,
javaV149EchoReady: source.echoVerification.javaV149EchoReady,
miniKvV141ReceiptReady: source.echoVerification.miniKvV141ReceiptReady,
upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
noNetworkSafetyFixtureContractAligned: source.echoVerification.noNetworkSafetyFixtureContractAligned,
sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
```

这保证 v325 的 closure 依据来自 v324 的 digest 和 checks，而不是口头依赖。

`createClosureReview(...)` 把已经完成的 prerequisite 列成 5 个：

```typescript
java-mini-kv-decision-echo
signed-human-approval-artifact
credential-handle-approval
endpoint-handle-allowlist-approval
no-network-safety-fixture
```

其中 `no-network-safety-fixture` 的状态是：

```typescript
closureState: "contract-intake-and-upstream-echo-complete"
```

剩余项只保留：

```typescript
abort-rollback-semantics
```

这就是 v325 的核心价值：它把真实连接前置链从 2 个缺口压到 1 个缺口，但不打开执行能力。

`createChecks(...)` 是安全门。它不仅检查 v324 ready，还要求 v324 保持所有危险边界关闭：

```typescript
runtimeShellImplemented === false
runtimeShellInvocationAllowed === false
executionAllowed === false
connectsManagedAudit === false
credentialValueRead === false
rawEndpointUrlParsed === false
externalRequestSent === false
networkSafetyFixtureExecuted === false
httpRequestSent === false
tcpConnectionAttempted === false
networkSocketOpened === false
schemaMigrationExecuted === false
approvalLedgerWritten === false
automaticUpstreamStart === false
```

只有这些都满足，`readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview` 才会变成 true。

## 测试覆盖

测试文件覆盖四类场景：

```typescript
advances only the no-network safety fixture prerequisite after Node v324
keeps the v324 historical fixture fallback path available
blocks when upstream probes or actions are enabled
exposes JSON and Markdown routes through the audit route table
```

重点断言包括：

```typescript
completedPrerequisiteCount: 5
remainingPrerequisiteCount: 1
movedPrerequisiteId: "no-network-safety-fixture"
nextConcretePrerequisiteId: "abort-rollback-semantics"
runtimeShellStillBlocked: true
```

这能防止 v325 被误理解成“可以连接”或“可以实现 runtime shell”。

## 成熟度判断

v325 让三项目真实联调前置链更接近完成：当前只剩 `abort-rollback-semantics`。但这仍然不是实际联调。真实联调至少还要经过 Node v326 contract intake、Java v150 + mini-kv v142 并行 echo、Node v327 upstream verification、Node v328 final closure review，然后才能进入新的 implementation candidate gate。

这版的正确方向是“收口 prerequisite”，不是新增执行能力。

## 运行验证

本版验证按 Node 收口流程执行：

```powershell
npm.cmd run typecheck
npx.cmd vitest run test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview.test.ts test/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification.test.ts
npm.cmd run build
npm.cmd test
node .tmp\v325-smoke.mjs
```

其中 `node .tmp\v325-smoke.mjs` 是一次性 HTTP smoke：脚本内部启动 Fastify、读取 v325 JSON/Markdown 端点、写入 `d/325/evidence/`，然后关闭服务。截图用 Playwright MCP 渲染归档 HTML 生成，保存到 `d/325/图片/no-network-safety-fixture-prerequisite-closure-review-v325.png`。
