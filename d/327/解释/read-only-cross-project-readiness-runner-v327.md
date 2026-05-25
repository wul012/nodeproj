# Node v327 read-only cross-project readiness runner

## 本版做了什么

v327 按最新统筹计划，从单纯 `echo verification` 转成一个最小只读联合验证闭环：

```text
Node v327
  -> 读取 Java v150 本地 evidence Markdown
  -> 读取 mini-kv v142 本地 receipt JSON
  -> 合并成 cross-project readiness report
  -> 证明 SQL / rollback / secret / network / restore 等副作用仍关闭
```

这版不启动 Java、不启动 mini-kv、不打开 HTTP/TCP、不读 credential value、不解析 raw endpoint URL、不写 ledger/schema、不执行 rollback，不执行 mini-kv `LOAD/COMPACT/RESTORE/SETNXEX`。

## 主要文件

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner.test.ts
```

同时补充了历史 fixture fallback：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/d/150/解释/说明.md
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-abort-rollback-semantics-contract-non-participation-receipt.json
```

这样 GitHub 或没有兄弟仓库的环境也能验证 v327。

## 运行调试

```text
npm.cmd run typecheck
npx.cmd vitest run test/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner.test.ts test/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake.test.ts
npx.cmd tsx .tmp\v327-smoke.mjs
```

HTTP smoke 结果：

```json
{
  "jsonStatus": 200,
  "markdownStatus": 200,
  "runnerState": "read-only-cross-project-readiness-ready",
  "readyForReadOnlyCrossProjectReadinessReport": true,
  "readyForFinalPrerequisiteClosureReview": true,
  "javaEvidencePresent": true,
  "miniKvReceiptPresent": true,
  "productionBlockerCount": 0,
  "checkCount": 22,
  "passedCheckCount": 22
}
```

## 截图

```text
d/327/图片/read-only-cross-project-readiness-runner-v327.png
```

截图通过 Playwright MCP 完成。MCP 仍不能直接打开 `file://`，所以本版继续使用 data URL 方式打开归档 HTML。

## 边界结论

v327 已完成“只读联合验证雏形”：Node 能真实读取 Java v150 和 mini-kv v142 的本地产物，并在报告中 fail closed 地断言副作用关闭。下一步 v328 应消费 v327 report 做最终 prerequisite closure review，而不是回退到继续堆纯 echo。
