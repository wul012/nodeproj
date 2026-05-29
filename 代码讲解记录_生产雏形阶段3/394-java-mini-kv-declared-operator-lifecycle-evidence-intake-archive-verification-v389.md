# Node v389 代码讲解：Java / mini-kv declared operator lifecycle evidence intake archive verification

## 版本进度

Node v389 在 v388 之后补上归档验证层。它不消费新的上游运行时证据，也不启动 Java 或 mini-kv；它只验证 v388 的归档材料完整，并用冻结历史 fixture 重放 v388 的 declared operator lifecycle intake。

## 关键文件

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification.test.ts`
- `docs/plans3/v389-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification-roadmap.md`

## 核心流程

1. `createArchiveReferences(...)` 固定读取 `e/388` 下的 JSON、Markdown、summary、browser snapshot、HTML、截图、解释、v388 代码讲解和索引。
2. `createSourceNodeV388(...)` 从 v388 HTTP JSON 中提取 source intake 状态：Java v161、mini-kv v152、mini-kv v151 frozen template、45/45 checks、runtime gate closed。
3. `replayFromFrozenEvidence(...)` 调用 v388 loader，并要求 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 时仍解析到冻结历史快照。
4. `createChecks(...)` 同时验证归档文件、summary/Markdown/截图说明、v388 计划索引、冻结重放和 runtime 边界。
5. route 输出 JSON / Markdown，但 `readyForRuntimeLiveReadGate` 固定保持 false。

## 边界

- `archiveVerificationOnly=true`
- `rerunsLiveRead=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `stopsJavaService=false`
- `stopsMiniKvService=false`
- `executionAllowed=false`
- `activeShardPrototypeEnabled=false`

## 验证

Focused test:

```text
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification.test.ts
1 file, 3 tests passed
```

后续完整收尾会继续跑 typecheck、相邻测试、full test、build、HTTP smoke 和浏览器归档。

## 下一步

Node v390 可以写 separate runtime live-read gate plan，但仍不能把 v389 archive verification 当作 runtime approval。
