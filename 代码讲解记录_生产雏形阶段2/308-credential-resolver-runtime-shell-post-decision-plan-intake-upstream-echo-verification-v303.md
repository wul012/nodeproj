# 第三百零三版代码讲解：runtime shell post-decision plan intake upstream echo verification

本版目标是把 Node v301 的 post-decision continuation plan intake、Node v302 的 catalog quality pass、Java v136 的只读 echo、mini-kv v133 的 non-participation receipt 汇总到一个 Node v303 验证入口。它不是 runtime shell 实现版，而是三方只读证据对齐版。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v300-post-runtime-shell-decision-record-upstream-echo-roadmap.md
```

本版完成后，该计划已收口，并续写到：

```text
D:\nodeproj\orderops-node\docs\plans2\v303-post-decision-plan-intake-upstream-echo-roadmap.md
```

计划要求 Node v303 等待 Java v136、mini-kv v133 和 Node v302 完成后推进。当前 Java v136 / mini-kv v133 已完成，Node v302 也已完成 catalog quality pass，所以 v303 可以消费三方证据。

## 核心入口

新增文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification.ts
```

主函数是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification({ config })
```

它组装四类来源：

```ts
const sourceNodeV301 = createSourceNodeV301(input.config);
const sourceNodeV302 = createSourceNodeV302(input.config);
const javaV136 = createJavaV136Reference();
const miniKvV133 = createMiniKvV133Reference();
```

这四个来源各自负责一个边界：

- Node v301：证明 plan intake 本身是 ready，且 active next target 已经是 Node v303。
- Node v302：证明它只是 catalog quality pass，没有消费 Java v136 / mini-kv v133。
- Java v136：证明 Java 只读 echo 了 Node v301。
- mini-kv v133：证明 mini-kv 只做 non-participation receipt，不参与 runtime shell。

## legacy Node v302 marker

Java v136 和 mini-kv v133 的原始证据里写的是 Node v302 消费，因为当时计划中 v302 是 upstream echo verification。后来 v302 被调整为质量优化，真正消费版本变成 v303。

所以 v303 没有把这当作错误，而是显式建模：

```ts
legacyNodeV302ConsumerMarkerAccepted: true,
activeNodeVerificationVersion: "Node v303",
```

检查项也分成两层：

```ts
legacyNodeV302ConsumerMarkersAccepted:
  javaV136.legacyReadyForNodeV302
  && miniKvV133.legacyReadyForNodeV302
  && sourceNodeV301.legacyNextNodeVerificationVersion === "Node v302",
activeNodeV303VerificationTargetConfirmed:
  sourceNodeV301.nextNodeVerificationVersion === "Node v303"
  && sourceNodeV302.activeNodeVerificationTarget === "Node v303",
```

这能解释历史计划偏差，又不会把“Node v302 字样”误当成当前实际消费版本。

## Java v136 证据读取

Java 证据不是通过调用 Java 服务获得，而是读取本地/历史 fixture 文件：

```ts
evidenceFile("java-v136-support", JAVA_V136_SUPPORT),
evidenceFile("java-v136-test", JAVA_V136_TEST),
evidenceFile("java-v136-walkthrough", JAVA_V136_WALKTHROUGH),
```

关键 snippet 包括：

```ts
snippet("java-v136-source-node", JAVA_V136_TEST, "sourceSpan()).isEqualTo(\"Node v301\")"),
snippet("java-v136-ready", JAVA_V136_TEST, "readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification()).isTrue()"),
snippet("java-v136-selected", JAVA_V136_TEST, "\"continue-blocked-planning\""),
snippet("java-v136-proof", JAVA_V136_TEST, "necessityProof().proofComplete()).isTrue()"),
```

这里读的是实际测试和讲解里的稳定文本，不启动 Java，也不依赖 Java 当前工作区是否运行。

## mini-kv v133 证据读取

mini-kv 侧使用 JSON receipt 解析：

```ts
const parsed = readJsonObject(MINI_KV_V133_RECEIPT);
const receipt = objectField(parsed, "credential_resolver_runtime_shell_post_decision_plan_intake_non_participation_receipt");
```

关键字段包括：

```ts
legacyReadyForNodeV302:
  booleanField(receipt, "ready_for_node_v302_post_decision_plan_intake_upstream_echo_verification") === true,
echoesNodeV301PlanIntake:
  stringField(receipt, "source_plan_intake") === "Node v301 credential resolver runtime shell post-decision continuation plan intake",
nonParticipationReceiptOnly:
  booleanField(receipt, "runtime_shell_post_decision_plan_intake_non_participation_receipt_only") === true,
```

side-effect boundary 明确要求 runtime、credential、endpoint、external request、ledger/schema、LOAD/COMPACT/RESTORE/SETNXEX、audit/order authority 全部保持关闭。

## 路由挂载

新增路由仍走 audit route table：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification
```

JSON 和 Markdown 共用同一个 loader，Markdown 由 renderer 输出。这保持了 v225 之后的路由注册模式，不再复制旧式 route handler。

## 测试覆盖

新增测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification.test.ts
```

测试覆盖四件事：

1. 正常 profile ready，check 全通过。
2. 强制 historical fixture fallback 后仍 ready。
3. upstream probes/actions 开启时会 blocked。
4. JSON / Markdown 路由正常暴露。

关键断言：

```ts
expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
expect(profile.checks.activeNodeV303VerificationTargetConfirmed).toBe(true);
expect(profile.checks.legacyNodeV302ConsumerMarkersAccepted).toBe(true);
```

## 安全边界

本版所有执行能力仍是 false：

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

这说明 v303 是三方证据校验，不是实现真实 runtime shell。

## 一句话总结

Node v303 把 v301/v302/Java v136/mini-kv v133 收束为一次只读 upstream echo verification，解决了 v302 计划调整后的历史 marker 对齐问题，并把下一步明确推向 v304 的 stop-or-prerequisite decision，而不是继续堆 echo。
