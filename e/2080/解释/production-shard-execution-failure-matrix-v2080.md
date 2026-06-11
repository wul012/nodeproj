# Node v2080 说明：失败、中止、回滚矩阵

## 版本定位

v2080 消费 v2079 候选合同，补上生产级分片执行前最关键的一层：失败、中止、回滚分类。没有这层，候选合同容易看起来“可以执行”，但遇到 Java probe 失败、mini-kv probe 失败、清理证明缺失时没有明确停机路径。

## 关键实现

- 服务：`src/services/productionShardExecutionFailureMatrix.ts`
- 路由：`/api/v1/audit/production-shard-execution-failure-matrix`
- 来源：Node v2079 candidate contract

矩阵覆盖五类失败：

- pre-window-evidence-missing
- operator-approval-mismatch
- java-read-probe-failed
- mini-kv-read-probe-failed
- cleanup-proof-missing

每一类都要求 archive evidence，并明确 abort owner。回滚动作保持只读边界，不引入写操作或迁移动作。

## 安全边界

v2080 仍然是候选解释层，不是执行层。它只说明失败时如何停止、如何归档、由谁负责，不让 Node 取得 sibling runtime lifecycle 权限。

## 验证结果

归档证据：

- `e/2080/evidence/production-shard-execution-failure-matrix-v2080-http.json`
- `e/2080/evidence/production-shard-execution-failure-matrix-v2080-http.md`
- `e/2080/evidence/production-shard-execution-failure-matrix-v2080-summary.json`

本版本的工程意义：把生产分片执行候选从“乐观路径”推进到“失败也能收住”的工程形态。
