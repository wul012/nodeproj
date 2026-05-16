# Node v207 post-real-read production hardening triage

## 本版判断

v207 是 v206 归档验证后的生产硬化分诊版。它不是继续证明“三项目能读通”，也不是再做一个 archive-only summary，而是把下一阶段真正阻塞生产雏形的硬门槛排出优先级。

本版核心问题：

```text
v206 的归档验证是否已经 ready？
哪些生产硬门槛最先阻塞真实生产窗口？
下一版是否应该转向 managed audit，而不是继续增加归档层？
Java v74 + mini-kv v83 是否应该作为推荐并行的只读证据版本？
```

## 本版新增

新增服务：

```text
src/services/postRealReadProductionHardeningTriage.ts
```

新增接口：

```text
GET /api/v1/production/post-real-read-production-hardening-triage
GET /api/v1/production/post-real-read-production-hardening-triage?format=markdown
```

新增测试：

```text
test/postRealReadProductionHardeningTriage.test.ts
```

## 优先级结论

v207 评估 5 个候选硬门槛，但只选 3 个进入下一阶段：

```text
1. managed-audit-persistence
2. operator-identity-boundary
3. manual-approval-record
```

暂缓但保留跟踪：

```text
4. ci-artifact-store
5. rollback-control-boundary
```

这样做的原因是：v205-v206 已经证明真实只读联调和归档完整，但生产窗口真正缺的是“谁操作、谁批准、证据写到哪、以后怎么追溯”。所以 managed audit 应该成为 v208 的第一条真实生产雏形能力。

## 安全边界

v207 仍然保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
readOnly=true
```

测试里继续使用会抛错的 Java / mini-kv client，确保 v207 不重新触发上游读，也不启动 Java 或 mini-kv。

## 当前验证结果

最终验证已通过：

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

## 下一步

按 v206 衍生计划，v207 之后不应直接抢跑 Node v208，而是推荐并行：

```text
Java v74：release approval rehearsal 的 audit-persistence handoff hint
mini-kv v83：runtime artifact path / binary provenance hint
```

两边完成后，Node v208 再消费这些只读证据，推进 managed audit persistence boundary candidate。
