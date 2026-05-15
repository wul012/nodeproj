# Node v196：real-read adapter imported window result packet

## 本版判断

Java v69 和 mini-kv v78 已经按计划补齐只读 verification hint。v196 在 Node 侧消费这些上游锚点，生成一个 imported window result packet，把默认 closed-window baseline 与 operator-window result sample 明确分开。

本版不启动 Java，不启动 mini-kv，不执行上游写操作，也不把导入样本当作 production pass evidence。

## 本版目标

新增：

```text
GET /api/v1/production/real-read-adapter-imported-window-result-packet
GET /api/v1/production/real-read-adapter-imported-window-result-packet?format=markdown
```

验证内容：

```text
v195 closed-window baseline 被保留
operator-window sample 与 closed baseline 分离
Java v69 responseSchemaVersion / warningDigest / no-ledger proof 可校验
mini-kv v78 SMOKEJSON taxonomyDigest 可校验
5 条 imported records 均为 read-only
Node 不启动上游、不写上游、不授权生产操作
```

## 注入调试结果

```json
{
  "profileVersion": "real-read-adapter-imported-window-result-packet.v1",
  "packetState": "closed-baseline-with-imported-window-sample",
  "ready": true,
  "importedRecords": 5,
  "passedRecords": 5,
  "checks": "16/16",
  "blockers": 0
}
```

## 安全边界

- `importedAsProductionPassEvidence=false`。
- `productionWriteAuthorized=false`。
- `readyForProductionOperations=false`。
- `UPSTREAM_ACTIONS_ENABLED=false` 必须保持。
- Node 不自动启动 Java / mini-kv。
- v196 只导入样本和校验证据锚点，不打开真实生产窗口。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterImportedWindowResultPacket.test.ts test/realReadAdapterEvidenceArchiveVerification.test.ts test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：6 files / 21 tests 通过
npm test：138 files / 474 tests 通过
npm run build：通过
```

## 下一步

按 `docs/plans/v194-post-real-read-archive-roadmap.md`，下一步是：

```text
Node v197：real-read adapter production readiness checkpoint
```

它需要汇总 v191-v196，并明确距离真正生产窗口还缺真实 operator identity、managed audit store、CI archive artifact、人工审批记录。
