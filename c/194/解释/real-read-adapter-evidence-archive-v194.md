# Node v194：real-read adapter evidence archive

## 本版判断

v193 已经把真实只读 adapter 结果分类成 taxonomy。v194 继续按计划把 v191 rehearsal、v192 operator window runbook、v193 failure taxonomy 固化成一个 archive bundle。

本版不启动 Java，不启动 mini-kv，不执行上游写操作，也不把 closed-window baseline 当作 production pass evidence。

## 本版目标

新增：

```text
GET /api/v1/production/real-read-adapter-evidence-archive
GET /api/v1/production/real-read-adapter-evidence-archive?format=markdown
```

归档内容：

```text
v191 adapter digest
v192 operator window runbook digest
v193 taxonomy digest
adapter records summary
taxonomy classifications summary
production operation still false
```

## 注入调试结果

```json
{
  "profileVersion": "real-read-adapter-evidence-archive.v1",
  "archiveState": "closed-window-evidence-archived",
  "ready": true,
  "adapterRecords": 5,
  "classifications": 5,
  "failureClasses": ["closed-window"],
  "blockers": 0
}
```

## 安全边界

- `archivedAsProductionPassEvidence=false`。
- `readyForProductionOperations=false`。
- `UPSTREAM_ACTIONS_ENABLED=false` 必须保持。
- Node 不自动启动 Java / mini-kv。
- unsafe surface 或 unexpected write signal 不会被归档成 ready evidence。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：4 files / 14 tests 通过
npm test：136 files / 467 tests 通过
npm run build：通过
```

## 下一步

v191 衍生计划到 v194 收口。已新建：

```text
docs/plans/v194-post-real-read-archive-roadmap.md
```

下一步按新计划是 Node v195：real-read adapter evidence archive verification。
