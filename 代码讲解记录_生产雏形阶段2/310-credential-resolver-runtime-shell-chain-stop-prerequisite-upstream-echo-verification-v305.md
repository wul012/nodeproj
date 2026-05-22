# 第三百零五版代码讲解：runtime shell chain stop/prerequisite upstream echo verification

本版目标是消费 Node v304、Java v141、mini-kv v134，确认三方对 runtime shell chain 的 stop/prerequisite 决策已经对齐。它不是实现运行壳，而是证明“显式审批前置未满足，继续 blocked”这个结论已经被 Java 和 mini-kv 只读回显。

## 本版所处项目进度

当前计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v303-post-decision-plan-intake-upstream-echo-roadmap.md
```

计划要求：

```text
Node v305：stop/prerequisite upstream echo verification
只有 Java v141 + mini-kv v134 都完成后才推进
消费两边只读 echo，确认三方一致
不实现 runtime shell
```

本轮先只读确认 Java v141 和 mini-kv v134 都已在各自 HEAD/tag 完成，然后再推进 Node v305。

## 文件拆分

本版没有把新能力塞进单个巨型文件，而是拆成四块：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification.test.ts
```

当前行数分别约为：

```text
service：564 行
types：229 行
renderer：144 行
test：279 行
```

这符合当前规则：新增治理链路必须拆 service / types / renderer / test，避免制造难维护的巨型文件。

## 核心入口

主入口是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification({ config })
```

它先读取三个来源：

```ts
const sourceNodeV304 = createSourceNodeV304(input.config);
const javaV141 = createJavaV141Reference();
const miniKvV134 = createMiniKvV134Reference();
```

然后统一生成 checks：

```ts
const checks = createChecks(input.config, sourceNodeV304, javaV141, miniKvV134);
```

最后只在所有 checks 为 true 时进入 ready：

```ts
checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification =
  Object.entries(checks)
    .filter(([key]) =>
      key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification")
    .every(([, value]) => value);
```

这个模式和 v303/v304 保持一致：先读取来源，后做证据对齐，再用 check gate 收口。

## Node v304 来源

`createSourceNodeV304` 复用 v304 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord({
  config,
});
```

它只取 v305 真正需要的字段：

```ts
runtimeShellChainDecision: source.runtimeShellChainDecision,
decisionDigest: source.decisionRecord.decisionDigest,
prerequisiteCount: source.decisionRecord.prerequisiteCount,
missingRuntimePrerequisiteCount: source.decisionRecord.missingRuntimePrerequisiteCount,
noGoConditionCount: source.decisionRecord.noGoConditionCount,
```

这避免 v305 重算 v304 的完整决策细节，只消费已归档的决策结果。

## Java v141 证据

`createJavaV141Reference` 读取四份 Java 证据：

```ts
JAVA_V141_SUPPORT
JAVA_V141_TEST
JAVA_V141_EXPLANATION
JAVA_V141_WALKTHROUGH
```

关键断言包括：

```ts
snippet("java-v141-node-v304", JAVA_V141_TEST, ".isEqualTo(\"Node v304\")")
snippet("java-v141-node-v305", JAVA_V141_TEST, ".isEqualTo(\"Node v305\")")
snippet("java-v141-ready", JAVA_V141_TEST, "readyForNodeV305StopPrerequisiteUpstreamEchoVerification()).isTrue()")
snippet("java-v141-decision", JAVA_V141_SUPPORT, "require-explicit-approval-prerequisites-before-runtime-shell")
```

这说明 Java v141 不是泛泛地“完成了”，而是明确消费 Node v304，并把结果交给 Node v305。

## mini-kv v134 证据

`createMiniKvV134Reference` 读取 mini-kv 的 standalone receipt、运行说明和讲解：

```ts
MINI_KV_V134_RECEIPT
MINI_KV_V134_EXPLANATION
MINI_KV_V134_WALKTHROUGH
```

它解析 JSON 里的核心 receipt：

```ts
const receipt = objectField(parsed, "credential_resolver_runtime_shell_chain_stop_or_prerequisite_non_participation_receipt");
const nodeV304Reference = objectField(receipt, "source_node_v304_reference");
```

并校验 v304 的关键数字：

```ts
prerequisiteCount: numberField(nodeV304Reference, "prerequisite_count"),
missingRuntimePrerequisiteCount: numberField(nodeV304Reference, "missing_runtime_prerequisite_count"),
noGoConditionCount: numberField(nodeV304Reference, "no_go_condition_count"),
```

这里最重要的是 mini-kv 的定位仍然是 non-participation receipt，不参与 runtime shell、不写存储、不做权威状态。

## 对齐判断

`createChecks` 里最关键的三组判断是：

```ts
upstreamEchoesAligned:
  javaV141.echoesNodeV304Decision
  && javaV141.readyForNodeV305
  && miniKvV134.echoesNodeV304Decision
  && miniKvV134.readyForNodeV305,
```

```ts
prerequisiteGateStillBlocked:
  sourceNodeV304.runtimeShellChainDecision === "require-explicit-approval-prerequisites-before-runtime-shell"
  && sourceNodeV304.prerequisiteCount === 6
  && sourceNodeV304.missingRuntimePrerequisiteCount === 6
  && sourceNodeV304.noGoConditionCount === 8,
```

```ts
sideEffectBoundariesAligned:
  sourceNodeV304.executionAllowed === false
  && javaV141.sideEffectBoundariesClosed
  && miniKvV134.sideEffectBoundariesClosed,
```

这三组分别回答：

1. Java/mini-kv 是否真的回显了 v304。
2. blocked prerequisite gate 是否仍然成立。
3. 三方是否都没有打开副作用边界。

## 历史 fixture fallback

本版把 Java v141 和 mini-kv v134 的最小必要证据冻结到：

```text
fixtures/historical/sibling-workspaces/
```

测试里强制：

```ts
process.env[FORCE_FALLBACK_ENV] = "true";
```

并断言：

```ts
resolvedPath.includes("fixtures/historical/sibling-workspaces")
```

这样 GitHub runner 没有 sibling workspace 时，仍能用已提交 fixture 完成验证。

## 路由挂载

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification
```

它挂在统一 audit JSON/Markdown route table 中：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMarkdown),
```

这延续 v225 之后的路由收敛模式，没有回到手写重复路由。

## 测试覆盖

新增测试覆盖四类场景：

```text
1. 正常 ready：Java v141 + mini-kv v134 + Node v304 三方对齐。
2. forced historical fixture fallback：CI/GitHub runner 风格证据可用。
3. upstream probes/actions 开启时 blocked。
4. JSON / Markdown route 正常暴露。
```

关键断言：

```ts
expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
expect(profile.upstreamEvidence.javaV141.expectedSnippets.every((expected) => expected.matched)).toBe(true);
expect(profile.upstreamEvidence.miniKvV134.expectedSnippets.every((expected) => expected.matched)).toBe(true);
```

## 安全边界

本版仍全部关闭：

```ts
runtimeShellImplemented: false,
runtimeShellInvocationAllowed: false,
executionAllowed: false,
connectsManagedAudit: false,
credentialValueRead: false,
rawEndpointUrlParsed: false,
externalRequestSent: false,
schemaMigrationExecuted: false,
approvalLedgerWritten: false,
automaticUpstreamStart: false,
```

## 验证结果

```text
typecheck: passed
focused tests: passed
forced fallback focused test: passed
full test: 238 files / 819 tests passed
build: passed
HTTP smoke: JSON 200 / Markdown 200
Playwright MCP screenshot: passed
archive profile: verificationState=runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready
checks: 20/20
verificationDigest=75278ffa6fe777a5936b47382e49d4524dbc2bd6eec893f2b002c6323e47b5bb
```

后续还会跑全量 test、build 和 HTTP smoke。

## 一句话总结

Node v305 把 Node v304 的 stop/prerequisite decision、Java v141 的只读 echo、mini-kv v134 的 non-participation receipt 对齐成一份可归档 verification。它证明三方都同意 runtime shell 仍被显式审批前置阻塞，但没有给 runtime shell 实现、调用、credential、endpoint、network 或写操作开门。
