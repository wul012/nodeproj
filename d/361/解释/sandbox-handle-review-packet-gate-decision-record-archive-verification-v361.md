# Node v361 运行解释：sandbox handle review packet/gate decision record archive verification

## 本版目标

v361 消费 Node v360 的 `sandbox handle review packet/gate decision record` 归档，只验证 v360 是否已经被完整保存、可复核、可继续被后续 prerequisite closure review 消费。

这版仍然不是执行链路。它不重跑 live probe，不启动 Java / mini-kv，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不实现 runtime shell，也不打开 managed audit HTTP/TCP。

## 运行结果

```text
profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record-archive-verification.v1
archiveVerificationState: sandbox-handle-review-packet-gate-decision-record-archive-verified
archiveVerificationDecision: archive-sandbox-handle-review-packet-gate-decision-record
checks: 33/33 passed
archive files: 11/11 present
source Node v360 checks: 20/20 passed
source decision: advance-to-sandbox-handle-review-prerequisite-closure-review
readyForNodeV362SandboxHandleReviewPrerequisiteClosureReview: true
```

## 安全边界

```text
archiveVerificationOnly=true
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

- HTTP JSON evidence：`d/361/evidence/sandbox-handle-review-packet-gate-decision-record-archive-verification-v361-http.json`
- HTTP Markdown evidence：`d/361/evidence/sandbox-handle-review-packet-gate-decision-record-archive-verification-v361-http.md`
- summary：`d/361/evidence/sandbox-handle-review-packet-gate-decision-record-archive-verification-v361-summary.json`
- browser snapshot：`d/361/evidence/sandbox-handle-review-packet-gate-decision-record-archive-verification-v361-browser-snapshot.md`
- HTML：`d/361/sandbox-handle-review-packet-gate-decision-record-archive-verification-v361.html`
- 截图：`d/361/图片/sandbox-handle-review-packet-gate-decision-record-archive-verification-v361.png`

## 验证

```text
npm.cmd run typecheck
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification.test.ts
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord.test.ts test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification.test.ts
npm.cmd run build
Node HTTP smoke: JSON + Markdown route passed
Playwright MCP: route Markdown snapshot + screenshot captured with audit headers
```

## 结论

v361 已证明 v360 decision record 归档完整，下一步可以进入 Node v362 的 sandbox handle review prerequisite closure review。但当前仍不能跳到真实 credential、raw endpoint、provider/client、runtime shell 或 managed audit HTTP/TCP。
