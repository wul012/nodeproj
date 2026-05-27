# 362. Node v357：sandbox handle review contract decision archive verification

## 版本进度

v357 的任务是验证 v356 归档，而不是继续扩大功能。它读取 `d/356` 下的 JSON、Markdown、summary、HTML、截图、解释、代码讲解和计划索引，确认 v356 的 contract decision 已经形成可追溯证据。

本轮最终状态：

```text
archiveVerificationState=sandbox-handle-review-contract-decision-archive-verified
archiveVerificationDecision=archive-sandbox-handle-review-contract-decision
readyForNodeV358SandboxHandleReviewPacketOrGateIntake=true
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts:48) 是主服务入口。它不调用 Java / mini-kv，也不重新跑 live probe；它只读取本地 v356 归档文件并生成 archive verification profile。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts:134) 的 `createArchiveReferences(...)` 固定 11 个必须存在的归档引用：

```text
JSON evidence
Markdown evidence
summary evidence
browser snapshot
HTML archive
screenshot
explanation
code walkthrough
source plan
plans index
d/README archive index
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts:209) 的 `createSourceNodeV356(...)` 从 v356 JSON 里提取稳定源证据，关键字段包括：

```text
decisionState=sandbox-handle-review-contract-decision-ready
decision=define-sandbox-handle-review-contract
contractInputCount=5
contractSectionCount=6
checkCount=25
passedCheckCount=25
productionBlockerCount=0
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts:276) 的 `createArchiveVerification(...)` 生成本版 verification record：

```text
verificationMode=sandbox-handle-review-contract-decision-archive-verification
archiveRoot=d/356
verifiesJsonMarkdownAndSummary=true
verifiesScreenshotExplanationAndWalkthrough=true
verifiesPlanAndArchiveIndexes=true
rerunsLiveProbe=false
opensManagedAuditConnection=false
requestsJavaMiniKvEcho=false
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts:310) 的 `createChecks(...)` 是本版核心门禁。它检查 11 个归档文件存在、v356 JSON profile version 正确、5 个 contract inputs 都是非 secret、6 个 contract sections 完整、25/25 source checks 全通过、v355 source archive 计数保留、summary 与 JSON 一致、Markdown/解释/代码讲解/计划索引都记录了关键边界。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts:459) 的 `collectProductionBlockers(...)` 让 archive verification fail closed：缺文件、JSON 不可读、summary 不一致、截图/HTML 缺失、计划索引不对、credential/raw endpoint/runtime/HTTP/TCP 边界被打开，都会变成 blocker。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.ts:549) 的 `createSummary(...)` 汇总 30 个 checks、11 个 archive files、5 个 contract inputs、6 个 contract sections 和 production blocker 数量。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationRenderer.ts:6) 输出 Markdown，展示 source Node v356、archive verification、archive references、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1202) 注册 v357 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision-archive-verification
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.test.ts:17) 覆盖正常验证 v356 归档；[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.test.ts:147) 覆盖缺归档 fail closed；[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.test.ts:176) 覆盖 JSON/Markdown route 输出。

## 核心流程

1. 固定 v356 归档文件列表。
2. 读取并解析 JSON、Markdown、summary、解释、讲解、计划索引。
3. 从 v356 JSON 提取 `sourceNodeV356`。
4. 构造 archive verification record 和 digest。
5. 检查 30 个归档/边界条件。
6. 只有全部通过才允许进入 v358 非 secret packet/gate intake。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v357 1 file / 3 tests 通过
- 小组 vitest：v356 + v357 2 files / 6 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，30/30 checks 通过
- Playwright MCP 截图：已保存到 `d/357/图片/sandbox-handle-review-contract-decision-archive-verification-v357.png`

## 项目成熟度

v357 把 v356 的合同决策从“代码和报告存在”推进到“归档证据完整可验证”。这一步让后续 v358 可以进入 sandbox handle review packet/gate 的非 secret intake，而不是直接跳真实连接。生产方向上，它继续保证真实联调前的证据链可追溯。
