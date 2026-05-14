# Node v176 运行调试说明

## 版本目标

Node v176 做 `CI evidence hardening packet`。它消费：

```text
Node v175：release handoff readiness review
Node 既有：CI evidence command profile
```

本版把 `typecheck / test / build / HTTP smoke / Chrome screenshot / cleanup` 的证据要求收敛成一个可检查的 CI hardening packet。它不是 CI runner，也不执行生产发布、部署、回滚、恢复，不读取 production secret，不启动 Java 或 mini-kv。

## 运行入口

新增接口：

```text
GET /api/v1/ci/evidence-hardening-packet
GET /api/v1/ci/evidence-hardening-packet?format=markdown
```

本版同时把 `/api/v1/ci/*` 加入 readiness 只读访问策略，避免开启 access guard enforcement 后 CI 证据 endpoint 被误判为缺失策略。

## 运行环境

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
npx vitest run test/ciEvidenceHardeningPacket.test.ts test/releaseHandoffReadinessReview.test.ts test/ciEvidenceCommandProfile.test.ts test/accessPolicyProfile.test.ts test/accessGuard.test.ts
npm test
npm run build
HTTP smoke
Chrome screenshot
```

## 预期结果

```text
profileVersion = ci-evidence-hardening-packet.v1
packetState = ready-for-ci-evidence-hardening
readyForCiEvidenceHardeningPacket = true
readyForProductionRelease = false
readyForProductionDeployment = false
readyForProductionRollback = false
executionAllowed = false
summary.checkCount = 21
summary.passedCheckCount = 21
summary.evidenceExpectationCount = 7
summary.ciDifferenceCount = 5
```

## 截图记录

- `c/176/图片/ci-evidence-hardening-packet-v176.png`

完成后当前 v173 衍生计划收口。后续按新计划 `v176-post-ci-evidence-hardening-roadmap.md` 推进，不继续在旧计划里叠重合版本。
