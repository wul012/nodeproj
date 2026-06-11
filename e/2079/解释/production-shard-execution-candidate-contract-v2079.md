# Node v2079 说明：生产分片执行候选合同

## 版本定位

v2079 把 v2078 的 handoff digest 变成一个 disabled-by-default 的生产分片执行候选合同。这个合同只定义未来可讨论的执行形状，不给任何真实执行授权。

## 关键实现

- 服务：`src/services/productionShardExecutionCandidateContract.ts`
- 路由：`/api/v1/audit/production-shard-execution-candidate-contract`
- 来源：Node v2078 handoff readiness profile

合同定义了五个候选阶段：

1. pre-window-evidence-lock
2. operator-approved-read-only-probe
3. shard-plan-digest-binding
4. candidate-decision-freeze
5. archive-and-cleanup-proof

并把禁止面写成结构化 invariant：不能启用生产执行，不能由 Node 启停 Java/mini-kv，不能写入或迁移，不能读取凭证值，不能解析 raw endpoint，不能开启 active shard routing。

## 安全边界

v2079 的设计重点是让“候选合同”和“执行批准”彻底分开。它让下一版可以做 failure matrix，但所有生产 blocker 保留：

- signed production execution approval pending
- managed audit production store pending
- rollback owner confirmation pending

## 验证结果

归档证据：

- `e/2079/evidence/production-shard-execution-candidate-contract-v2079-http.json`
- `e/2079/evidence/production-shard-execution-candidate-contract-v2079-http.md`
- `e/2079/evidence/production-shard-execution-candidate-contract-v2079-summary.json`

本版本的工程意义：把“未来能不能执行”拆成可审核合同，而不是继续堆散点治理报告。
