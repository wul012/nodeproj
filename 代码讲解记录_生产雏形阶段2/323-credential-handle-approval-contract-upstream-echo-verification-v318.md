# 323 - Node v318 credential handle approval contract upstream echo verification

## 版本进度

v318 消费 Node v317、Java v146 和 mini-kv v139，完成 `credential-handle-approval` contract 的三方只读 echo verification。v317 定义 contract，Java v146 只读回显，mini-kv v139 只做 non-participation receipt；v318 把这三份证据合并验证，确认 `credential-handle-approval` 已经具备后续 closure review 的证据基础。

这不是 credential resolver 实现。v318 不读取 credential value，不解析 raw endpoint URL，不实例化 secret provider / resolver client，不发送 managed audit HTTP/TCP，不写 ledger，不执行 schema migration，也不自动启动任何上游服务。

## 关键代码

`src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification.ts`

- `loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification()` 是本版入口。它组装 source Node v317、Java v146、mini-kv v139、checks、echo verification、summary、blockers 和 next actions。
- `createSourceNodeV317()` 直接消费 v317 intake profile，读取 `credentialHandleApprovalContract.contractDigest`、10 个 required fields、8 个 prohibited fields、5 个 rejection reasons、9 个 no-go boundaries，以及 `Java v146 + mini-kv v139` 的并行 echo 请求。
- `createJavaV146Reference()` 锁定 Java v146 的 support、catalog、test、说明和代码讲解证据。它用 `expectedSnippets` 验证 Java 确认了 Node v317 profile、Node v318 consumer、10/8/5/9 计数、contract digest、只读边界和 `readyForNodeV318CredentialHandleApprovalContractUpstreamEchoVerification()`。
- `createMiniKvV139Reference()` 读取 `credential-resolver-credential-handle-approval-contract-non-participation-receipt.json`，用结构化 JSON 字段验证 mini-kv 没有存储、校验、解析、解析 authority、读取 credential value、解析 endpoint、发请求、写 ledger、执行 schema、LOAD/COMPACT/RESTORE/SETNXEX。
- `createChecks()` 形成 23 个硬检查：source ready、三方 evidence present、Java echo ready、mini-kv receipt ready、contract digest/count 对齐、side-effect boundaries 对齐、upstream probes/actions 仍关闭、生产窗口仍 blocked。
- `collectProductionBlockers()` 只在 source、Java、mini-kv、contract alignment 或 runtime config 失效时产生 blocker；正常 v318 的 `productionBlockerCount=0`。

`src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationTypes.ts`

- `ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationProfile` 固化对外 JSON 形状。
- `SourceNodeV317CredentialHandleApprovalContractIntakeReference` 保存 v317 的 contract、transition、checks 和安全边界。
- `JavaV146CredentialHandleApprovalContractIntakeEchoReference` 和 `MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference` 分别描述 Java echo 与 mini-kv non-participation 证据。

`src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationRenderer.ts`

- 渲染 Markdown evidence。
- 分区输出 Source Node v317、Java v146 Echo、mini-kv v139 Receipt、Echo Verification、Checks、Summary、Blockers、Warnings、Recommendations、Evidence Endpoints 和 Next Actions。

`src/routes/auditJsonMarkdownRoutes.ts`

- 注册 `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification`。
- JSON 和 `?format=markdown` 继续走统一 audit JSON/Markdown route table。

`test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification.test.ts`

- 覆盖 ready profile。
- 覆盖 forced historical fixture fallback，保护 GitHub runner 上没有 sibling workspace 时仍能验证 Java v146 + mini-kv v139 证据。
- 覆盖 upstream probes/actions 开启时 blocked。
- 覆盖 JSON/Markdown route。

## 为什么这样拆

v318 延续 v317 的拆分模式：types、service、renderer、test 分离。service 约 660 行，test 约 320 行，没有继续把 route、渲染、类型、证据解析塞进单个巨型文件。

本版也把 Java v146 的 support/catalog/test/说明/讲解，以及 mini-kv v139 的 receipt/说明/讲解复制进 Node historical fixtures。这样 GitHub runner 即使没有 `D:/javaproj` 或 `D:/C/mini-kv`，也能通过 forced historical fallback 复现同一份证据。

## 验证结果

```text
npm run typecheck
  passed

npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification.test.ts
  1 test file passed, 4 tests passed

npm test
  251 test files passed, 868 tests passed

npm run build
  passed

HTTP smoke
  JSON 200
  Markdown 200
```

## 项目成熟度

v318 仍没有打开真实联调，但它把 `credential-handle-approval` 从“Node 已定义 contract，等待上游 echo”推进到“三方上游 echo 已对齐”。下一步 v319 可以做 closure review，判断这一项 prerequisite 是否完成；但真实 resolver、endpoint allowlist、no-network safety fixture、abort rollback semantics 仍没有被解锁。
