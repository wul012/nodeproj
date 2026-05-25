# 333：Node v328 final prerequisite closure review 代码讲解

## 一、版本目标

Node v328 的目标不是继续增加上游 echo，而是消费 Node v327 已归档的联合只读 readiness report，完成最后一个 prerequisite `abort-rollback-semantics` 的 closure review。

这一版的边界很明确：

- 可以关闭 6/6 prerequisite catalog；
- 可以建议下一步进入 implementation candidate gate；
- 不能实现 runtime shell；
- 不能实例化 provider/client；
- 不能读取 credential value 或 raw endpoint URL；
- 不能发 HTTP/TCP；
- 不能让 Java / mini-kv 发生写操作。

## 二、类型层如何约束边界

核心类型在 `src/services/managedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewTypes.ts`。

`ManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewProfile` 把 v328 的所有危险能力固定为 `false`：

```ts
readyForRuntimeShellImplementation: false;
readyForRuntimeShellInvocation: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
javaSqlExecutionAllowed: false;
rollbackExecutionAllowed: false;
miniKvWriteCommandAllowed: false;
automaticUpstreamStart: false;
```

这类字段看似重复，但在当前项目里是有价值的：它们分别对应 credential、endpoint、network、Java、mini-kv、runtime shell 的安全边界。v328 没有把这些字段合并，是为了让报告和测试能逐项锁住。

## 三、服务层如何消费 v327

核心服务在 `src/services/managedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview.ts`。

入口函数是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview(...)
```

它第一步调用 v327：

```ts
const sourceNodeV327 = createSourceNodeV327(input.config, input.evidencePaths);
```

`createSourceNodeV327(...)` 内部复用：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner(...)
```

所以 v328 不再直接读取 Java v150 和 mini-kv v142 文件。Java / mini-kv 的本地证据读取、historical fallback、side-effect matrix 都由 v327 负责；v328 只判断 v327 是否足以支撑最终 closure。

## 四、closure review 如何形成 6/6

`createCompletedPrerequisites(...)` 读取统一 catalog：

```ts
HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.map(...)
```

其中前 5 个 prerequisite 使用历史 closure 证据：

- `java-mini-kv-decision-echo`
- `signed-human-approval-artifact`
- `credential-handle-approval`
- `endpoint-handle-allowlist-approval`
- `no-network-safety-fixture`

最后一个 `abort-rollback-semantics` 使用 v327 readiness digest 作为证据：

```ts
Node v327 readiness digest ... consumed Java v150 evidence and mini-kv v142 receipt.
```

这就是 v328 能把 `completedPrerequisiteCount` 推到 6、`remainingPrerequisiteCount` 推到 0 的原因。

## 五、检查项如何 fail closed

`createChecks(...)` 明确检查：

```ts
sourceNodeV327Ready
sourceNodeV327ReadinessReportReady
sourceNodeV327FinalClosureReady
sourceNodeV327KeepsRuntimeBlocked
sourceNodeV327KeepsSideEffectsClosed
sourceJavaV150Consumed
sourceMiniKvV142Consumed
allSixPrerequisitesCompleted
noPrerequisitesRemain
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

如果 v327 因证据缺失而 blocked，v328 会跟着 blocked。测试里通过传入缺失路径模拟这一点，断言 `NODE_V327_NOT_READY`、`JAVA_V150_NOT_CONSUMED`、`MINI_KV_V142_NOT_CONSUMED` 都进入 blockers。

## 六、路由如何暴露

路由注册在 `src/routes/auditJsonMarkdownRoutes.ts`：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-final-prerequisite-closure-review",
  ...
)
```

这个路由继续走统一 `registerAuditJsonMarkdownRoute` 模式，支持 JSON 和 `?format=markdown`，没有写新的路由分支。

## 七、测试覆盖

测试文件是 `test/managedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview.test.ts`，覆盖四类场景：

1. v327 ready 时，v328 关闭 6/6 prerequisite；
2. v327 blocked 时，v328 fail closed；
3. `UPSTREAM_PROBES_ENABLED` / `UPSTREAM_ACTIONS_ENABLED` 开启时阻断；
4. JSON / Markdown route 正常输出。

## 八、验证结论

v328 把 prerequisite 链收口为 6/6，但没有把系统推进到真实执行。下一步应该是 Node v329 的 implementation candidate gate，它仍应是候选门禁，而不是直接实现 runtime shell。
