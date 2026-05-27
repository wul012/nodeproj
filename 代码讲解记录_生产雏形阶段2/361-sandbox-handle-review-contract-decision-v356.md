# 361. Node v356：sandbox handle review contract decision

## 版本进度

v356 的任务是消费 v355 archive verification，并决定是否可以定义 sandbox handle review contract。它不是 runtime shell，也不是 managed audit adapter；它只把后续 review 所需的非 secret 输入、章节、停止条件和决策 digest 固化下来。

本轮最终状态：

```text
decisionState=sandbox-handle-review-contract-decision-ready
decision=define-sandbox-handle-review-contract
readyForNodeV357SandboxHandleReviewContractDecisionArchiveVerification=true
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts:36) 是主服务入口。它先调用 v355 archive verification loader，生成 `sourceNodeV355`，再创建 necessity proof、contract inputs、contract sections、decision record、checks、summary 和 next actions。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts:130) 的 `createSourceNodeV355(...)` 只抽取 v355 已验证过的归档状态：

```text
archiveVerificationState=sandbox-handle-review-prerequisite-intake-archive-verified
archiveFileCount=11
presentArchiveFileCount=11
checkCount=29
passedCheckCount=29
productionBlockerCount=0
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts:167) 的 `createNecessityProof()` 写明本版为什么存在：它解决 `sandbox-handle-review-needs-contract-decision-after-archive-verification`，由 Node v357 archive verification 或后续非 secret handle review gate 消费。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts:178) 的 `createContractInputs()` 固化 5 个输入：

```text
sandbox-handle-reference
allowlist-review-status
credential-handle-binding-status
operator-approval-correlation
source-decision-digest
```

这些输入都显式声明 `containsSecretValue=false`、`containsRawEndpointUrl=false`、`allowsNetworkConnection=false`、`allowsRuntimeInvocation=false`。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts:214) 的 `createContractSections()` 固化 6 个合同章节：opaque handle reference、allowlist review state、binding review state、operator correlation、source evidence digest、stop conditions。每个章节同样保持 no secret、no raw URL、no managed audit connection、no runtime shell、no upstream mutation。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts:249) 的 `createDecisionRecord(...)` 生成本版核心决策。ready 时 `decision=define-sandbox-handle-review-contract`，blocked 时 `decision=blocked`；无论哪种状态，以下能力都保持 false：

```text
requestsCredentialValue
requestsRawEndpointUrl
instantiatesProviderClient
implementsRuntimeShell
invokesRuntimeShell
opensManagedAuditConnection
startsUpstreamServices
writesUpstreamState
requestsJavaMiniKvEcho
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts:284) 的 `createChecks(...)` 是本版 25 个门禁的来源。它要求 v355 ready、11/11 archive files present、29/29 source checks passed、必要性证明存在、contract inputs/sections 都完整且非 secret，并确认 provider/client/runtime/network/upstream mutation 都没有打开。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.ts:361) 的 `collectProductionBlockers(...)` 让本版 fail closed：如果 v355 不 ready、归档缺失、source checks 未全过、contract 请求 secret/raw endpoint/network/runtime，或者 production audit/window 被误开，都会转成 blocker。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionRenderer.ts:7) 输出 Markdown，包含 source Node v355、necessity proof、contract inputs、contract sections、decision record、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1194) 注册 v356 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.test.ts:17) 覆盖正常 ready；[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.test.ts:151) 覆盖空归档 fail closed；[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.test.ts:181) 覆盖 JSON/Markdown route 输出。

## 核心流程

1. 读取 v355 archive verification profile。
2. 抽取 source Node v355 归档状态和边界字段。
3. 创建本版 necessity proof。
4. 固化 5 个非 secret contract inputs。
5. 固化 6 个 closed contract sections。
6. 生成 decision record 和 25 个 checks。
7. 全部通过后允许进入 v357 archive verification。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v356 1 file / 3 tests 通过
- 小组 vitest：v355 + v356 2 files / 6 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，25/25 checks 通过
- Playwright MCP 截图：已保存到 `d/356/图片/sandbox-handle-review-contract-decision-v356.png`

## 项目成熟度

v356 是从 prerequisite intake 转向 sandbox handle review contract 的一版。它没有抢跑真实连接，而是先把 contract 输入和章节做成可归档、可验证、可 fail-closed 的决策记录。生产方向上，这仍是靠近真实联调前的治理门槛，但比单纯 archive verification 多了一步明确的合同结构。
