# Node v191：real HTTP/TCP read adapter rehearsal

## 本版判断

Java v67 和 mini-kv v76 已完成并在各自 HEAD/tag 上可只读核对，因此 Node v191 可以按计划推进真实只读 adapter rehearsal。

本版不是生产连接开关，也不是自动联调脚本。它只是在 Node 内新增一个默认关闭、可人工开启窗口的真实读取 adapter rehearsal 入口。

## 本版目标

新增：

```text
GET /api/v1/production/real-read-adapter-rehearsal
GET /api/v1/production/real-read-adapter-rehearsal?format=markdown
```

它复用既有 `productionLiveProbeSmokeHarness` 的五个只读探针：

```text
Java GET /actuator/health
Java GET /api/v1/ops/overview
mini-kv HEALTH
mini-kv INFOJSON
mini-kv STATSJSON
```

`STORAGEJSON` 仍属于已有 `upstreamProductionEvidenceIntake` 链路，本版不混入 live-probe 五探针合约，避免破坏历史 smoke harness。

## 安全边界

- 默认 `UPSTREAM_PROBES_ENABLED=false`，不会访问上游。
- `UPSTREAM_ACTIONS_ENABLED=false` 必须保持。
- Node 不自动启动 Java。
- Node 不自动启动 mini-kv。
- 不执行 Java 写操作、审批、ledger、deployment、rollback。
- 不执行 mini-kv `SET`、`DEL`、`EXPIRE`、`LOAD`、`COMPACT`、`SETNXEX`、`RESTORE`。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/realReadAdapterRehearsal.test.ts：1 file / 3 tests 通过
npx vitest run test/realReadAdapterRehearsal.test.ts test/productionLiveProbeSmokeHarness.test.ts test/productionLiveProbeReadinessContract.test.ts test/upstreamProductionEvidenceIntake.test.ts：4 files / 12 tests 通过
npm test：通过
npm run build：通过
```

## 下一步

已新建 `docs/plans/v191-post-real-read-adapter-roadmap.md`，后续从 Node v192 的 operator window runbook 开始，不继续往 v185 旧计划追加重合版本。
