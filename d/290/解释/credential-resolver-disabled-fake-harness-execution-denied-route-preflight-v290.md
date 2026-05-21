# Node v290 运行说明：disabled fake harness execution-denied route preflight

## 本版目标

按 `docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md` 推进 Node v290：在 Node 内新增一个“执行被拒绝”的只读 route preflight/report，消费 Node v289 的 disabled fake harness upstream echo verification，明确说明为什么当前不能执行 fake harness。

本版不新增 fake harness runtime，不实例化 fake provider/client，不实例化真实 provider/client，不读取 credential value，不解析 raw endpoint URL，不打开 managed audit connection，不发送 HTTP/TCP，不写 approval ledger，不执行 schema migration，不自动启动 Java 或 mini-kv。

## 改动结果

新增：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.test.ts
d/290/evidence/credential-resolver-disabled-fake-harness-execution-denied-route-preflight-v290.json
d/290/evidence/credential-resolver-disabled-fake-harness-execution-denied-route-preflight-v290.md
```

调整：

```text
src/routes/auditJsonMarkdownRoutes.ts
docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md
docs/plans2/README.md
```

计划文档的小修来自本轮前置判断：Java v127-v130 是 Java 内部质量止血队列，不能和 Node runtime 混为一版；当前明确可并行的是 Java v127 + mini-kv v128。

## 预检重点

- `sourceNodeV289`：确认 v289 upstream echo verification 已 ready，且 Node / Java / mini-kv 的 disabled fake harness contract 仍只读对齐。
- `executionDeniedRoutePreflight`：确认新增 route 只是 audit JSON/Markdown GET 报告，不是 runtime endpoint。
- `simulatedRouteAttempts`：列出 8 类会被拒绝的操作，包括 approval gate、credential value、raw endpoint URL、provider/client、HTTP/TCP、ledger/schema、fake harness runtime、automatic upstream start。
- `checks`：确认 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`，并且 production audit / production window 仍关闭。

## 验证命令

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract.test.ts
```

后续收口还需运行：

```text
npm test
npm run build
```

## 清理

本版未启动 Java、mini-kv 或 Node 长驻服务；`dist/` 会在 build 验证后删除。
