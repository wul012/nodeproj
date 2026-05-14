# Node v175 运行调试说明

## 版本目标

Node v175 做 `release handoff readiness review`。它消费三份已完成证据：

```text
Node v174：production release dry-run envelope
Java v62：release handoff checklist fixture
mini-kv v71：restore handoff checklist fixture
```

本版只形成 handoff readiness review，不执行真实 release、deployment、rollback、restore、SQL，不读取 production secret，不连接 production database，也不启动 Java 或 mini-kv。

## 运行入口

新增接口：

```text
GET /api/v1/production/release-handoff-readiness-review
GET /api/v1/production/release-handoff-readiness-review?format=markdown
```

HTTP smoke 使用安全环境变量：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_AUTH_MODE=rehearsal
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
```

截图阶段只关闭 access guard 以渲染 Markdown 页面，仍保持 `UPSTREAM_ACTIONS_ENABLED=false`。

## 验证命令

```text
npm run typecheck
npx vitest run test/releaseHandoffReadinessReview.test.ts test/productionReleaseDryRunEnvelope.test.ts
npm test
npm run build
HTTP smoke
Chrome screenshot
```

## 预期结果

```text
profileVersion = release-handoff-readiness-review.v1
reviewState = ready-for-manual-release-handoff-review
readyForReleaseHandoffReadinessReview = true
readyForProductionRelease = false
readyForProductionDeployment = false
readyForProductionRollback = false
readyForProductionOperations = false
executionAllowed = false
summary.checkCount = 37
summary.passedCheckCount = 37
```

## 上游证据核对

本轮只读核对了另外两个项目，不启动、不测试、不修改：

```text
Java tag = v62订单平台release-handoff-checklist-fixture
mini-kv tag = 第七十一版恢复交接清单
Java fixture = src/main/resources/static/contracts/release-handoff-checklist.fixture.json
mini-kv fixture = fixtures/release/restore-handoff-checklist.json
```

v175 消费这些字段，但不会替操作员填写 placeholder，也不会触发上游真实动作。

## 截图记录

- `c/175/图片/release-handoff-readiness-review-v175.png`

完成后下一步按当前计划是 Node v176：CI evidence hardening packet。它依赖 v175 完成，不需要 Java / mini-kv 新版本先行。
