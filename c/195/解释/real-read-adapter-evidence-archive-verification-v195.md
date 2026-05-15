# Node v195：real-read adapter evidence archive verification

## 本版判断

v194 已经把 v191 rehearsal、v192 operator window runbook、v193 failure taxonomy 收进 archive bundle。v195 不继续新增 archive，而是做独立 verification：重新计算 v194 archive digest，确认摘要链、分类覆盖和生产门禁没有漂移。

本版不启动 Java，不启动 mini-kv，不执行上游写操作，也不把 closed-window evidence 当作 production pass。

## 本版目标

新增：

```text
GET /api/v1/production/real-read-adapter-evidence-archive-verification
GET /api/v1/production/real-read-adapter-evidence-archive-verification?format=markdown
```

验证内容：

```text
storedArchiveDigest == recomputedArchiveDigest
v191 adapter digest 有效
v192 operator window digest 有效
v193 taxonomy digest 有效
classification coverage 完整
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionOperations=false
```

## 注入调试结果

```json
{
  "profileVersion": "real-read-adapter-evidence-archive-verification.v1",
  "verificationState": "verified-closed-window-archive",
  "ready": true,
  "archiveDigestMatches": true,
  "checks": "16/16",
  "blockers": 0
}
```

## 安全边界

- `archivedAsProductionPassEvidence=false`。
- `productionWriteAuthorized=false`。
- `readyForProductionOperations=false`。
- `UPSTREAM_ACTIONS_ENABLED=false` 必须保持。
- Node 不自动启动 Java / mini-kv。
- v195 只验证 archive，不导入人工窗口结果。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterEvidenceArchiveVerification.test.ts test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：5 files / 18 tests 通过
npm test：137 files / 471 tests 通过
npm run build：通过
```

## 下一步

按 `docs/plans/v194-post-real-read-archive-roadmap.md`，下一步不是 Node 抢跑，而是推荐并行：

```text
Java v69 + mini-kv v78
```

它们补只读 verification hint 后，Node v196 再消费人工窗口导入样本。
