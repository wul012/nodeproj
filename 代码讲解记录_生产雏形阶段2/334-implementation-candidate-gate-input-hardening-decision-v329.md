# 334：Node v329 implementation candidate gate / input-hardening decision 代码讲解

## 一、版本目标

Node v328 已经把 6/6 prerequisite 关闭，但 v328 明确说明这只是进入下一阶段的前置条件，不是 runtime shell 实施许可。v329 的任务就是把这个边界落成代码：

- 允许进入 `implementation candidate gate`；
- 要求先做 `input export hardening`；
- 推荐 Java v151 + mini-kv v143 并行只读回显；
- 禁止 Node v330 在上游证据完成前抢跑；
- 禁止任何 runtime / credential / network / write side effect。

## 二、类型层如何阻止越权

类型文件是 `src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionTypes.ts`。

主 Profile 里继续把危险能力写死为 `false`：

```ts
readyForDisabledRuntimeShellDesignDraft: false;
readyForRuntimeShellImplementation: false;
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

这里新增了一个关键字段：

```ts
readyForParallelJavaV151MiniKvV143EchoRequest: boolean;
```

它只表示“可以请求上游只读 echo / receipt”，不是“可以实现 runtime”。

## 三、服务入口如何消费 v328

服务文件是 `src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision.ts`。

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision(...)
```

它第一步调用：

```ts
createSourceNodeV328(...)
```

而 `createSourceNodeV328(...)` 内部复用：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview(...)
```

所以 v329 不再直接读 Java / mini-kv 文件，也不重复 v327 的 readiness runner 逻辑。它只消费 v328 的最终 closure review。

## 四、为什么还需要 v329

必要性证明在：

```ts
createNecessityProof()
```

它解释了 v328 不能直接复用为 implementation gate 的原因：

```ts
Node v328 only proves prerequisite closure.
It does not decide whether Java Markdown archive input and mini-kv release receipt input are stable enough...
```

这正好回应计划里的要求：不要继续堆另一个 closure review，而是解决新的真实 blocker：输入证据是否稳定、是否可被后续 runtime design 安全消费。

## 五、input hardening 具体要求

`createInputHardeningRequirements()` 定义了四个要求：

```ts
java-stable-evidence-export
mini-kv-stable-current-receipt
node-fail-closed-diagnostics
route-evidence-consumability
```

其中 Java 和 mini-kv 的要求分别指向：

```ts
requestedVersion: "Java v151"
requestedVersion: "mini-kv v143"
```

也就是说，v329 后面的正确并行点是 Java v151 + mini-kv v143，而不是 Node 继续抢跑。

## 六、No-Go 条件

`createNoGoConditions()` 固定了 7 个暂停条件：

- credential value
- raw endpoint URL
- provider/client
- HTTP/TCP network
- Java SQL / rollback / ledger / schema
- mini-kv LOAD / COMPACT / RESTORE / SETNXEX / write
- automatic upstream start

这些条件在 `decisionRecord` 里全部保持禁止状态。

## 七、检查项如何保证 fail closed

`createChecks(...)` 检查 v328 状态、input hardening、运行时边界和配置：

```ts
sourceNodeV328Ready
sourceNodeV328ClosedAllPrerequisites
sourceNodeV328AllowsCandidateGateOnly
sourceNodeV328KeepsRuntimeBlocked
sourceNodeV328KeepsSideEffectsClosed
candidateGateRequiresInputHardening
candidateGateDoesNotOpenRuntime
parallelJavaV151MiniKvV143EchoRecommended
nodeV330BlockedUntilUpstreamEcho
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

测试里也覆盖了源 v328 blocked 的场景：当 Java / mini-kv 输入缺失导致 v328 无法 ready，v329 会一起 blocked。

## 八、路由和测试

路由注册在 `src/routes/auditJsonMarkdownRoutes.ts`：

```ts
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-candidate-gate-input-hardening-decision
```

测试文件是：

```ts
test/managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision.test.ts
```

覆盖：

1. v328 ready 时，v329 进入 input-hardening candidate gate；
2. v328 blocked 时，v329 fail closed；
3. upstream probes/actions 开启时阻断；
4. JSON / Markdown route 输出正常。

## 九、验证结论

v329 做到了“向前一步，但不越权”。它把 6/6 closure 后的下一步压成输入硬化门禁，并明确下一步应由 Java v151 + mini-kv v143 并行提供只读证据。
