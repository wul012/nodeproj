# 360. Node v355：sandbox handle review prerequisite intake archive verification

## 版本进度

v355 的任务是验证 v354 归档，而不是继续扩大功能。它读取 `d/354` 下的 JSON、Markdown、summary、HTML、截图、解释、代码讲解和计划索引，确认 v354 的 prerequisite intake 已经形成可追溯证据。

本轮最终状态：

```text
archiveVerificationState: sandbox-handle-review-prerequisite-intake-archive-verified
archiveVerificationDecision: archive-sandbox-handle-review-prerequisite-intake
readyForNodeV356SandboxHandleReviewContractDecision: true
```

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts:49) 是主服务入口。它不调用 Java / mini-kv，也不重新跑 live probe；它只读取本地 v354 归档文件并生成 archive verification profile。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts:134) 的 `createArchiveReferences(...)` 固定 11 个必须存在的归档引用：

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

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts:209) 的 `createSourceNodeV354(...)` 从 v354 JSON 里提取稳定源证据，关键字段包括：

```text
intakeState=sandbox-handle-review-prerequisite-intake-ready
intakeDecision=define-non-secret-sandbox-handle-review-prerequisites
prerequisiteInputCount=5
closedScopeCount=9
checkCount=24
passedCheckCount=24
productionBlockerCount=0
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts:274) 的 `createArchiveVerification(...)` 生成本版 verification record：

```text
verificationMode=sandbox-handle-review-prerequisite-intake-archive-verification
archiveRoot=d/354
verifiesJsonMarkdownAndSummary=true
verifiesScreenshotExplanationAndWalkthrough=true
verifiesPlanAndArchiveIndexes=true
rerunsLiveProbe=false
opensManagedAuditConnection=false
requestsJavaMiniKvEcho=false
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts:308) 的 `createChecks(...)` 是本版核心门禁。它检查 11 个归档文件存在、v354 JSON profile version 正确、5 个 prerequisite inputs 都是非 secret、9 个 closed scopes 完整、24/24 source checks 全通过、summary 与 JSON 一致、Markdown/解释/代码讲解/计划索引都记录了关键边界。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts:424) 的 `archiveFileReferences(...)` 把所有归档引用收成统一列表，用于计算 `archiveFileCount=11`、`presentArchiveFileCount=11` 和 digest 列表。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.ts:442) 的 `collectProductionBlockers(...)` 让 archive verification fail closed：缺文件、JSON 不可读、summary 不一致、截图/HTML 缺失、计划索引不对、credential/raw endpoint/runtime/HTTP/TCP 边界被打开，都会变成 blocker。

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationRenderer.ts:7) 输出 Markdown，展示 source Node v354、archive verification、archive references、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1186) 注册 v355 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake-archive-verification
```

[managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.test.ts:17) 覆盖三条路径：正常验证 v354 归档、缺归档 fail-closed、JSON/Markdown route 输出。

## 核心流程

1. 固定 v354 归档文件列表。
2. 读取并解析 JSON、Markdown、summary、解释、讲解、计划索引。
3. 从 v354 JSON 提取 `sourceNodeV354`。
4. 构造 archive verification record 和 digest。
5. 检查 29 个归档/边界条件。
6. 只有全部通过才允许进入 v356 contract/decision。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v355 1 file / 3 tests 通过
- 小组 vitest：v354 + v355 2 files / 6 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，29/29 checks 通过
- Playwright MCP 截图：已保存到 `d/355/图片/sandbox-handle-review-prerequisite-intake-archive-verification-v355.png`

## 项目成熟度

v355 把 v354 的输入边界从“代码和报告存在”推进到“归档证据完整可验证”。这一步让后续 v356 可以讨论 sandbox handle review contract/decision，而不是直接跳真实连接。生产方向上，它是继续靠近真实联调前的归档门禁。
