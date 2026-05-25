# Node v326 abort/rollback semantics contract intake 运行说明

## 本版定位

v326 执行 `docs/plans2/v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md` 的第一步。v325 已经把 `no-network-safety-fixture` 关闭到 `contract-intake-and-upstream-echo-complete`，当前只剩 `abort-rollback-semantics` 一个 prerequisite。

本版只定义最后一个 prerequisite 的非执行合同：manual abort marker、rollback runbook reference、operator confirmation、cleanup/evidence marker、idempotent no-op failure policy、rollback authority boundary、recovery checkpoint 和 audit digest。

本版仍不启动 Java/mini-kv，不发 HTTP/TCP，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不写 ledger/schema，不执行 SQL/deployment/rollback，不渲染或调用 runtime shell command。

## 产物

- JSON evidence：`d/326/evidence/abort-rollback-semantics-contract-intake-v326.json`
- Markdown evidence：`d/326/evidence/abort-rollback-semantics-contract-intake-v326.md`
- HTTP JSON smoke：`d/326/evidence/abort-rollback-semantics-contract-intake-v326-http.json`
- HTTP Markdown smoke：`d/326/evidence/abort-rollback-semantics-contract-intake-v326-http.md`
- HTTP smoke summary：`d/326/evidence/abort-rollback-semantics-contract-intake-v326-smoke-summary.json`
- HTML evidence：`d/326/abort-rollback-semantics-contract-intake-v326.html`
- Playwright MCP snapshot：`d/326/evidence/abort-rollback-semantics-contract-intake-v326-snapshot.md`
- Playwright MCP screenshot：`d/326/图片/abort-rollback-semantics-contract-intake-v326.png`

## 关键结果

```text
contractState = abort-rollback-semantics-contract-intake-ready
activeNodeContractVersion = Node v326
targetPrerequisiteId = abort-rollback-semantics
readyForParallelJavaV150MiniKvV142Echo = true
readyForNodeV327BeforeUpstreamEcho = false
requiredFieldCount = 10
prohibitedFieldCount = 14
noGoBoundaryCount = 11
productionBlockerCount = 0
```

v326 只把 `abort-rollback-semantics` 推进到 `contract-intake-defined`。它不关闭第六个 prerequisite，也不允许 Node v327 抢跑；Java v150 + mini-kv v142 必须先完成只读 echo / non-participation。

## 验证记录

```powershell
npm.cmd run typecheck
npx.cmd vitest run test/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake.test.ts
npm.cmd run build
npm.cmd test
node .tmp\v326-smoke.mjs
```

HTTP smoke 使用自关闭 Node helper 直接启动 Fastify 实例、读取 JSON/Markdown 两个端点并在 `finally` 中关闭服务，没有留下后台 Node 服务。页面截图通过 Playwright MCP 对归档 HTML 的 data URL 渲染完成，结果写入 `d/326/图片/`。

## 下一步

当前有效计划仍然是：

```text
docs/plans2/v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md
```

下一步是推荐并行：

```text
Java v150 + mini-kv v142
```

两边完成后，Node v327 才能做 `abort/rollback semantics upstream echo verification`。
