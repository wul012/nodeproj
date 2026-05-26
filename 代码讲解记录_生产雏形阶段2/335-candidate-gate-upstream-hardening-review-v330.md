# 335：Node v330 candidate gate upstream hardening review 代码讲解

## 一、版本目标

Node v329 已经说明：6/6 prerequisite closure 之后不能直接实现 runtime shell，必须先让 Java 和 mini-kv 把输入证据稳定化。v330 的目标就是消费这些上游结果：

```text
Node v329 + Java v151/v152 + mini-kv v143
```

然后回答一个很窄的问题：

```text
input-hardening 是否足够稳定，可以让下一版只做 disabled design draft candidate review？
```

注意，v330 仍然不实现 runtime shell，也不创建 provider/client。

## 二、类型层的安全边界

类型文件是：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewTypes.ts
```

主 Profile 继续把危险能力写死为 `false`：

```ts
readyForDisabledRuntimeShellDesignDraft: false;
readyForRuntimeShellImplementation: false;
readyForRuntimeShellInvocation: false;
readyForManagedAuditResolverImplementation: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
javaSqlExecutionAllowed: false;
approvalLedgerWritten: false;
schemaMigrationExecuted: false;
miniKvWriteCommandAllowed: false;
miniKvLoadAllowed: false;
miniKvCompactAllowed: false;
miniKvRestoreAllowed: false;
miniKvSetnxexAllowed: false;
automaticUpstreamStart: false;
```

新增的正向字段是：

```ts
readyForNextNodeDisabledRuntimeShellDesignDraftCandidate: boolean;
```

这个字段只代表“下一版可以做候选评审”，不是“现在可以写 design draft”，更不是“可以实现 runtime”。

## 三、服务入口如何消费 v329

服务文件是：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview.ts
```

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview(...)
```

它先调用：

```ts
createSourceNodeV329(...)
```

而 `createSourceNodeV329(...)` 内部复用：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision(...)
```

所以 v330 不重新推导 v329 的候选门禁逻辑，只消费 v329 的结果。

## 四、Java v151/v152 如何被检查

Java / mini-kv 证据解析拆在独立文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningEvidence.ts
```

Java v151 由这个函数读取：

```ts
createJavaV151EvidenceExportHintReference(...)
```

它检查的关键片段包括：

```text
evidenceExportHint
release-approval-rehearsal-current.json
稳定只读 JSON 响应导出证据
不读取 credential value
不解析 raw endpoint url
不执行 HTTP/TCP
不写 approval ledger
不触发 deployment / rollback
不自动启动 upstream process
```

Java v152 由：

```ts
createJavaV152InputHardeningDecisionEchoReference(...)
```

检查：

```text
inputHardeningDecisionEcho
Java v152 消费 Node v329
Java v151 已经提供稳定只读 evidence export
Node v330 仍要等待并消费两边上游证据
不实例化 provider/client
不发 HTTP/TCP
不打开 managed audit connection
不写 approval ledger / schema
不执行 SQL / deployment / rollback
```

这解释了为什么 v330 同时消费 v151 和 v152：v151 是 stable export hint，v152 是对 Node v329 input-hardening decision 的回显。

## 五、mini-kv v143 如何被检查

mini-kv receipt 路径是：

```text
D:/C/mini-kv/fixtures/release/credential-resolver-implementation-candidate-gate-input-hardening-non-participation-receipt.json
```

服务里读取：

```ts
createMiniKvV143ReceiptReference(...)
```

它会进入 JSON 里的：

```ts
credential_resolver_implementation_candidate_gate_input_hardening_non_participation_receipt
mini_kv_receipt
stable_current_receipt_export
checks
```

核心检查包括：

```ts
stableCurrentReceiptExportReady === true
stableCurrentReceiptPathRequired === true
readyForNodeV330AfterJavaV151 === true
readyForNodeV330BeforeJavaV151 === false
readyForDisabledRuntimeShellDesignDraft === false
miniKvLoadAllowed === false
miniKvCompactAllowed === false
miniKvRestoreAllowed === false
miniKvSetnxexAllowed === false
automaticUpstreamStart === false
```

这保证 mini-kv 只是 evidence provider，不变成 audit/order authority。

## 六、检查项如何 fail closed

`createChecks(...)` 汇总 21 个检查：

```ts
sourceNodeV329Ready
sourceNodeV329RequiresInputHardening
sourceNodeV329KeepsRuntimeBlocked
javaV151StableEvidenceExportReady
javaV152ConsumesNodeV329
javaV152ConfirmsJavaStableEvidenceExport
miniKvV143StableCurrentReceiptReady
miniKvV143ReadyAfterJavaV151
miniKvV143BlocksBeforeJavaV151
miniKvV143KeepsRuntimeAndWriteBoundariesClosed
upstreamProbesStillDisabled
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

任意一个证据缺失，`reviewState` 都会变成：

```ts
"blocked"
```

测试里专门覆盖了 Java v151、Java v152、mini-kv v143 全部 missing 的场景，确保不会静默通过。

## 七、路由和测试

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review
```

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview.test.ts
```

覆盖：

1. historical fallback 下消费 Node v329、Java v151/v152、mini-kv v143；
2. 任一上游证据缺失时 fail closed；
3. upstream probes/actions 开启时 blocked；
4. JSON / Markdown route 输出正常。

## 八、计划修正

v328 计划原本写 Java v151 + mini-kv v143，但 Java 后续又做了 v152。v330 没有把 v152 当成冲突，而是修正计划：

```text
Java v151 = stable evidence export hint
Java v152 = input-hardening decision echo
mini-kv v143 = stable current receipt export
```

新增计划：

```text
docs/plans2/v330-post-candidate-gate-upstream-hardening-roadmap.md
```

下一步是 Node v331：disabled runtime shell design draft candidate review。

## 九、验证结论

v330 做到了“收齐上游证据，但不越权”。它把 input-hardening 阶段闭合到可消费状态，同时仍明确：

```text
readyForDisabledRuntimeShellDesignDraft=false
readyForRuntimeShellImplementation=false
executionAllowed=false
```

本版验证：

```text
npm.cmd run typecheck：通过
focused vitest：2 files / 8 tests 通过
npm.cmd test：263 files / 916 tests 通过
npm.cmd run build：通过
HTTP smoke：JSON 200，Markdown 200，21/21 checks，0 blockers
```

这让项目可以进入更真实的设计候选阶段，但不会因为计划推进而提前打开任何运行时副作用。
