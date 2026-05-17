# Node v225 衍生计划：manual sandbox adapter connection runbook 前置阶段

来源版本：Node v225 `managed audit sandbox adapter dry-run package`。

计划状态：当前唯一有效全局计划。v225 已消费 Node v224、Java v82、mini-kv v91/v94，生成 sandbox adapter dry-run package，并融合 auditRoutes 旧 JSON/Markdown 路由迁移。Node v226 已完成 manual sandbox adapter connection runbook。下一阶段不能由 Node 抢跑 v227，必须先推荐并行推进 Java v86 + mini-kv v95，只补 sandbox connection 前只读/禁写 guard。

## 当前状态

```text
Node v225：
- sandbox dry-run package ready
- readyForManagedAuditSandboxAdapterConnection=false
- readyForProductionAudit=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false
- schemaMigrationExecuted=false

Java v82：
- sandbox approval/schema guard 已完成
- builder/helper 拆分已完成
- OpsEvidenceService 不再继续堆 v82 细节

mini-kv v91/v94：
- sandbox adapter non-participation receipt 已完成
- runtime evidence helper / formatter 拆分链已完成
- mini-kv 仍不是 sandbox audit storage backend

Node v226：
- manual sandbox adapter connection runbook 已完成
- 输出 operatorInputs / checklist / forbiddenOperations / pauseConditions / failureTaxonomy
- readyForManagedAuditSandboxAdapterConnection=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false
- schemaMigrationExecuted=false
```

## 推荐执行顺序

```text
1. 已完成：Node v226：manual sandbox adapter connection runbook。
   消费 Node v225，只生成人工 sandbox 连接演练 runbook。必须列出 operator 输入、credential handle、owner artifact、schema rehearsal、rollback path、超时/失败分类；仍不连接、不启动外部服务、不读取 credential value。

2. 当前下一步，推荐并行：Java v86 + mini-kv v95。
   - Java v86：sandbox connection rehearsal readiness receipt。只读说明 Java 侧若未来进入人工 sandbox 连接窗口，仍不写 ledger、不执行 SQL、不读取 credential value，并继续保持 builder/helper 拆分。
   - mini-kv v95：sandbox connection non-storage receipt。只读说明 mini-kv 即使在 sandbox connection rehearsal 里也不做 audit storage、不读 credential、不写 managed audit state；若继续优化，优先保持 command/formatter 拆分，不回灌 command.cpp。

3. 等 Java v86 + mini-kv v95 都完成后再推进：Node v227：manual sandbox connection evidence checklist。
   消费 Node v226、Java v86、mini-kv v95，生成 checklist 和 verification profile；仍不打开连接，只验证人工演练前材料是否齐。
```

## 合并/并行规则

```text
Node v226 是 runbook，不应和 Node v227 checklist 合并；v226 已完成。
Java v86 + mini-kv v95 推荐并行，因为二者都是只读 guard，不互相依赖；这两项可以同轮推进。
Node v227 必须等 Java v86 + mini-kv v95 完成后再消费。
```

## 硬性质量验收门槛

```text
Node v226：已完成，验收结果如下
- 不允许新增手写 JSON/Markdown 路由样板；必须继续使用 registerAuditJsonMarkdownRoute。
- managedAudit* 新增服务文件若接近 800 行，必须先拆 helper。
- runbook 不能只做文档标题，必须输出机器可读 checklist / forbiddenOperations / pauseConditions。

Java v86：
- 不允许把新 receipt 继续堆回 OpsEvidenceService。
- 必须沿用 builder/helper/分组 record 模式。
- 不允许长布尔参数构造链。

mini-kv v95：
- 不允许把已拆出的 managed audit/runtime evidence formatter 逻辑回灌 command.cpp。
- 不允许触碰 WAL/snapshot/restore 核心。
- 不允许把 mini-kv 变成 sandbox audit storage backend。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v86 / mini-kv v95 未完成时，Node v227 必须停止。

## 一句话结论

```text
v225 已具备 sandbox dry-run package，v226 已具备 manual sandbox connection runbook；当前下一步是推荐并行 Java v86 + mini-kv v95，只补只读 guard，不能跳到自动连接或生产审计。
```
