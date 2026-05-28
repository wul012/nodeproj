# Node v369 运行说明：operator/CI regular gate handoff

本版目标是把 Node v367 的最小只读联调 gate 和 Node v368 的归档校验，收口成一个可由 operator / CI 固定消费的 handoff。它不再继续增加前置审批链，而是冻结两个跨项目契约：

```text
read-only-integration.v1
shard-readiness.v1
```

## 本轮做了什么

- 新增 `fixtures/upstream-contracts/read-only-integration.v1.json`，固定三项目只读联调的最小字段。
- 新增 `fixtures/upstream-contracts/shard-readiness.v1.json`，给 mini-kv shard prototype 和 Java shard echo 并行开发提供同一个契约。
- 新增 v369 service / renderer / route / test，把 Node 角色明确为 contract consumer + integration gate。
- 新增下一份计划 `docs/plans3/v369-post-operator-ci-regular-gate-handoff-roadmap.md`，明确下一步推荐并行 Java + mini-kv，而不是 Node 抢跑。

## 运行验证

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts
npm run build
Node HTTP smoke: GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff
```

HTTP smoke 摘要：

```text
handoffState = operator-ci-regular-gate-handoff-ready
handoffDecision = freeze-read-only-and-shard-readiness-contracts
checkCount = 30
passedCheckCount = 30
frozenContractCount = 2
productionBlockerCount = 0
startsJavaService = false
startsMiniKvService = false
connectsManagedAudit = false
executionAllowed = false
```

## 截图与证据

- JSON: `e/369/evidence/minimal-read-only-operator-ci-regular-gate-handoff-v369-http.json`
- Markdown: `e/369/evidence/minimal-read-only-operator-ci-regular-gate-handoff-v369-http.md`
- Summary: `e/369/evidence/minimal-read-only-operator-ci-regular-gate-handoff-v369-summary.json`
- Browser snapshot: `e/369/evidence/minimal-read-only-operator-ci-regular-gate-handoff-v369-browser-snapshot.md`
- Screenshot: `e/369/图片/minimal-read-only-operator-ci-regular-gate-handoff-v369.png`

本轮只启动了 Node 自身 smoke 服务和静态 HTML 服务；没有启动、停止、构建、测试或修改 Java / mini-kv。
