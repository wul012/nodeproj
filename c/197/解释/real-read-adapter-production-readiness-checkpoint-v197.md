# Node v197：real-read adapter production readiness checkpoint

## 本版判断

v191-v196 已经完成真实只读 adapter 的 rehearsal、runbook、taxonomy、archive、verification 和 imported window sample。v197 不继续堆 archive，而是做阶段 checkpoint：确认证据链已经完整，同时明确真正生产窗口仍被四个硬门槛阻断。

本版不启动 Java，不启动 mini-kv，不执行上游写操作，也不允许打开生产窗口。

## 本版目标

新增：

```text
GET /api/v1/production/real-read-adapter-production-readiness-checkpoint
GET /api/v1/production/real-read-adapter-production-readiness-checkpoint?format=markdown
```

检查内容：

```text
v196 imported window packet ready
Node v191-v196 + Java v69 + mini-kv v78 证据链完整
closed-window baseline 被保留
operator-window sample 与 baseline 分离
imported records 仍为 read-only
production window 仍 blocked
```

## 硬门槛

```text
real operator identity
managed audit store
CI archive artifact
manual approval record
```

这四项全部未满足，所以：

```text
readyForProductionWindow=false
readyForProductionOperations=false
```

## 注入调试结果

```json
{
  "profileVersion": "real-read-adapter-production-readiness-checkpoint.v1",
  "checkpointState": "rehearsal-evidence-ready-production-window-blocked",
  "ready": true,
  "readyForProductionWindow": false,
  "evidenceChainItems": 8,
  "hardGates": 4
}
```

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterProductionReadinessCheckpoint.test.ts test/realReadAdapterImportedWindowResultPacket.test.ts test/realReadAdapterEvidenceArchiveVerification.test.ts test/realReadAdapterEvidenceArchive.test.ts test/realReadAdapterFailureTaxonomy.test.ts test/realReadAdapterRehearsal.test.ts test/realReadAdapterOperatorWindowRunbook.test.ts：7 files / 24 tests 通过
npm test：139 files / 477 tests 通过
npm run build：通过
```

## 下一步

本阶段计划 `v194-post-real-read-archive-roadmap.md` 已收口。已新建：

```text
docs/plans/v197-post-readiness-checkpoint-roadmap.md
```

下一步按新计划是 Node v198：real-read window operator identity binding。
