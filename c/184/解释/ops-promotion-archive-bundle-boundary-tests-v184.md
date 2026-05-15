# Node v184 运行调试说明：opsPromotionArchiveBundle boundary tests

## 本版本目标

Node v184 接在 v183 之后。

v183 把 `digestStable()` / `stableJson()` 从 `opsPromotionArchiveBundle.ts` 抽到 `stableDigest.ts`。v184 不继续拆大文件，而是先补边界测试，确保 archive bundle 的 manifest / artifact / summary 校验不会因为后续优化被破坏。

## 新增测试

```text
test/opsPromotionArchiveBundleBoundary.test.ts
```

覆盖四类真实边界：

```text
1. manifestDigest 被篡改。
2. ledger-integrity artifact digest 不匹配。
3. latest-evidence artifact 被删除。
4. summary / nextActions 被外部漂移修改。
```

这四类都是 `createOpsPromotionArchiveVerification()` 真正负责的契约。

## 重要边界说明

当前 plan 早期写过 actions enabled / identity missing，但 `opsPromotionArchiveBundle` 是纯 archive/verification 模块，不读取配置，也不处理 HTTP identity。

所以 v184 没有做伪测试：

- `UPSTREAM_ACTIONS_ENABLED` 边界仍由 production gate / action guard 类模块负责。
- identity missing 边界仍由 access guard / identity packet / pre-approval packet 类模块负责。
- archive bundle 只验证 archiveName、state、summary、manifest digest、artifact digest、nextActions 等归档一致性。

## 验证结果

本版本已运行：

```text
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/opsPromotionDecision.test.ts test/stableDigest.test.ts
npm test
npm run build
Chrome screenshot
```

全量测试结果：

```text
Test Files  131 passed (131)
Tests       450 passed (450)
```

截图归档：

```text
c/184/图片/ops-promotion-archive-bundle-boundary-tests-v184.png
```

## 下一步

Node v183-v184 已经完成第一轮技术债优化闭环：

```text
v183：抽 stable digest 工具
v184：补 archive bundle 边界测试
```

按当前全局计划，下一步是推荐并行：

```text
Java v66 + mini-kv v75
```

它们负责补更接近真实运行的只读 evidence。Node 不抢跑 v185，除非确认 Java v66 和 mini-kv v75 已完成或用户明确要求调整计划。
