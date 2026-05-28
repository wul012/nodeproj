# Node v370 运行说明：shard readiness contract consumer gate

本版目标是消费 Java v153 和 mini-kv v144 已经产出的 `shard-readiness.v1` 只读证据，确认 Node 可以从“等待两边输出”进入“下一版做最小 live-read gate”。

## 本轮做了什么

- 新增 v370 contract consumer gate service / renderer / route / test。
- 读取 Java v153：`D:/javaproj/advanced-order-platform/e/153/evidence/java-shard-readiness-v153.json`。
- 读取 mini-kv v144：`D:/C/mini-kv/fixtures/release/shard-readiness.json`。
- 新增历史 fallback fixture，保证 GitHub runner 没有 sibling workspace 时也能验证。
- 不启动 Java / mini-kv，不写两边状态，不连接 managed audit。

## 运行验证

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts
npm run build
Node HTTP smoke: GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate
```

HTTP smoke 摘要：

```text
gateState = shard-readiness-contract-consumer-gate-ready
gateDecision = consume-java-and-mini-kv-shard-readiness-evidence
checkCount = 31
passedCheckCount = 31
evidenceSourceCount = 2
readyEvidenceSourceCount = 2
productionBlockerCount = 0
startsJavaService = false
startsMiniKvService = false
executionAllowed = false
```

## 关于 mini-kv 的 prototype 值

mini-kv v144 输出：

```text
status = prototype-ready-read-only
routingMode = single-shard-readiness-prototype
```

这两个值比 v369 的初版契约枚举更具体。v370 没有把它误判为失败，而是采用“字段完整 + readOnly=true + executionAllowed=false + 边界安全”为硬门槛，并把 prototype-specific 值记录为 warning。后续如果要收紧枚举，应在计划里做契约兼容修正。

## 截图与证据

- JSON: `e/370/evidence/shard-readiness-contract-consumer-gate-v370-http.json`
- Markdown: `e/370/evidence/shard-readiness-contract-consumer-gate-v370-http.md`
- Summary: `e/370/evidence/shard-readiness-contract-consumer-gate-v370-summary.json`
- Browser snapshot: `e/370/evidence/shard-readiness-contract-consumer-gate-v370-browser-snapshot.md`
- Screenshot: `e/370/图片/shard-readiness-contract-consumer-gate-v370.png`

本轮只启动了 Node 自身 smoke 服务和静态 HTML 服务；没有启动、停止、构建、测试或修改 Java / mini-kv。
