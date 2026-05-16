# Node v207 post-real-read production hardening triage 代码讲解

## 模块角色

v207 接在 v206 后面。v206 做的是“归档验证”，v207 做的是“下一阶段生产硬化分诊”。

它的角色不是继续堆归档，而是回答：

```text
现在离生产窗口最近的阻塞项是什么？
哪些必须先做，哪些可以后做？
下一版 Node 是否应该等 Java / mini-kv 的只读证据？
```

## 1. 服务入口

文件：[postRealReadProductionHardeningTriage.ts](D:/nodeproj/orderops-node/src/services/postRealReadProductionHardeningTriage.ts)

```ts
export async function loadPostRealReadProductionHardeningTriage(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
})
```

入口仍然接收 `orderPlatform` 和 `miniKv`，但 v207 自己不直接调用它们。它只消费 v206 的归档验证 profile。

## 2. 消费 v206 归档验证

文件：[postRealReadProductionHardeningTriage.ts](D:/nodeproj/orderops-node/src/services/postRealReadProductionHardeningTriage.ts)

```ts
const sourceArchiveVerification = await loadThreeProjectRealReadRuntimeSmokeArchiveVerification(input);
```

这意味着 v207 的前置条件是：

```text
v205 真实只读联调已经归档
v206 已经验证归档完整
v207 只做后续生产硬化分诊
```

v207 会继续检查：

```ts
sourceArchiveVerificationReady
sourceArchiveVerificationStillReadOnly
sourceArchiveVerificationDoesNotRerunUpstreams
sourceProductionWindowStillBlocked
```

这些检查防止 triage 本身把生产窗口打开。

## 3. 候选硬门槛

文件：[postRealReadProductionHardeningTriage.ts](D:/nodeproj/orderops-node/src/services/postRealReadProductionHardeningTriage.ts)

```ts
function createCandidateGates(): HardeningCandidateGate[] {
  return [
    managed-audit-persistence,
    operator-identity-boundary,
    manual-approval-record,
    ci-artifact-store,
    rollback-control-boundary,
  ];
}
```

v207 不是随便列清单，而是明确 5 个候选项：

```text
managed audit：证据写到哪里
operator identity：谁操作
manual approval：谁批准
CI artifact store：远端归档
rollback control：如何回滚
```

这五个都重要，但不应该同一版全部做完。

## 4. 选择前三个优先项

文件：[postRealReadProductionHardeningTriage.ts](D:/nodeproj/orderops-node/src/services/postRealReadProductionHardeningTriage.ts)

```ts
function createSelectedPriorities(): HardeningPriority[] {
  return [
    managed-audit-persistence,
    operator-identity-boundary,
    manual-approval-record,
  ];
}
```

v207 选择前三个作为下一阶段重点：

```text
1. managed-audit-persistence -> Node v208
2. operator-identity-boundary -> Node v209
3. manual-approval-record -> Node v209
```

其中 managed audit 放第一，是因为生产窗口需要先有持久、可查、可保留的审计记录，否则身份和审批即使存在，也缺少可靠落点。

## 5. 暂缓项仍保留

文件：[postRealReadProductionHardeningTriage.ts](D:/nodeproj/orderops-node/src/services/postRealReadProductionHardeningTriage.ts)

```ts
function createDeferredGates(): DeferredHardeningGate[] {
  return [
    ci-artifact-store,
    rollback-control-boundary,
  ];
}
```

这不是丢掉 CI artifact 和 rollback，而是把它们排到 managed audit 和 approval record 之后。

理由是：

```text
远端 artifact 需要先知道哪些审计记录要打包
rollback 更偏生产写/恢复链路，不能抢在只读窗口治理前面
```

## 6. 防止 summary 膨胀

文件：[postRealReadProductionHardeningTriage.ts](D:/nodeproj/orderops-node/src/services/postRealReadProductionHardeningTriage.ts)

```ts
noArchiveOnlySummaryExpansion: candidateGates.every((gate) => gate.title !== "Archive-only summary")
  && selectedPriorities.every((priority) => !priority.nextSmallLoop.toLowerCase().includes("archive-only summary")),
```

这是本版专门加的质量边界。前面已经有很多 archive、verification、summary 版本，v207 必须把方向转向真实能力，而不是继续包装已完成的证据。

## 7. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```ts
app.get<{ Querystring: FixtureReportQuery }>(
  "/api/v1/production/post-real-read-production-hardening-triage",
```

接口支持 JSON 和 Markdown：

```text
/api/v1/production/post-real-read-production-hardening-triage
/api/v1/production/post-real-read-production-hardening-triage?format=markdown
```

这让 v207 的分诊结论可以作为后续计划和运维面证据读取。

## 8. 测试覆盖

文件：[postRealReadProductionHardeningTriage.test.ts](D:/nodeproj/orderops-node/test/postRealReadProductionHardeningTriage.test.ts)

第一类测试验证正常分诊：

```text
triageState=ready-for-hardening-roadmap
selectedPriorityCount=3
deferredGateCount=2
productionBlockerCount=0
```

第二类测试验证危险开关：

```text
UPSTREAM_ACTIONS_ENABLED=true -> blocked
```

第三类测试验证路由：

```text
JSON endpoint 200
Markdown endpoint 200
Markdown 包含 managed-audit-persistence
Markdown 包含 RUN_JAVA_V74_AND_MINI_KV_V83_IN_PARALLEL
```

## 本版结论

v207 把 v204-v206 的真实只读联调阶段正式转向生产硬化阶段。它明确下一步不是继续做 Node archive summary，而是：

```text
推荐并行 Java v74 + mini-kv v83
然后 Node v208 消费两边只读证据，推进 managed audit persistence boundary candidate
```

## 验证记录

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests 通过
npm test：149 files / 509 tests 通过
npm run build：通过
Chrome screenshot：c/207/图片/post-real-read-production-hardening-triage-v207.png 已生成
HTTP smoke：127.0.0.1:4312，triageState=ready-for-hardening-roadmap
HTTP smoke：selectedPriorityCount=3，deferredGateCount=2，readyForProductionWindow=false
HTTP smoke：Markdown 200，包含 managed-audit-persistence 和 RUN_JAVA_V74_AND_MINI_KV_V83_IN_PARALLEL
```
