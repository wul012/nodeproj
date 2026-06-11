# Node v2082 说明：候选归档校验

## 版本定位

v2082 把 v2078-v2081 的候选链合并校验，确认来源顺序、digest、ready 状态、检查计数和生产禁用边界都一致。它不是重新跑 Java/mini-kv，而是验证 Node 当前候选 profile 链是否能作为 v2083 closeout 的来源。

## 关键实现

- 服务：`src/services/productionShardExecutionCandidateArchiveVerification.ts`
- 路由：`/api/v1/audit/production-shard-execution-candidate-archive-verification`
- 来源：Node v2078、v2079、v2080、v2081 profiles

校验点包括：

- 四个来源 profile 全部 ready
- digest 全部为 64 位 sha256
- 来源顺序为 v2078 > v2079 > v2080 > v2081
- 所有 source checks passed
- 所有 source 仍保持 `readyForProductionShardExecution=false`

## 安全边界

v2082 是 profile-based verification。它不会生成新 runtime evidence，也不会启动服务。filesystem 证据在 closeout 阶段生成，因此这里不伪装成外部归档验证。

## 验证结果

归档证据：

- `e/2082/evidence/production-shard-execution-candidate-archive-verification-v2082-http.json`
- `e/2082/evidence/production-shard-execution-candidate-archive-verification-v2082-http.md`
- `e/2082/evidence/production-shard-execution-candidate-archive-verification-v2082-summary.json`

本版本的工程意义：把四个候选阶段压成一个可审核的 digest span，为六版 closeout 收口。
