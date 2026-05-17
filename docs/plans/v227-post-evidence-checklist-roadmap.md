# Node v227 衍生计划：manual sandbox evidence checklist 后续阶段

来源版本：Node v227 `managed audit manual sandbox connection evidence checklist`。

计划状态：当前唯一有效全局计划。v227 已消费 Node v226、Java v86、mini-kv v95，生成人工 sandbox 连接前 evidence checklist。当前仍未打开 managed audit 连接，未读取 credential value，未执行 schema migration，未写 Java / mini-kv / audit 状态。

## 当前状态

```text
Node v227：
- manual sandbox connection evidence checklist ready
- evidenceSpan=Node v226 + Java v86 + mini-kv v95
- readyForManagedAuditSandboxAdapterConnection=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false
- schemaMigrationExecuted=false
- automaticUpstreamStart=false

Java v86：
- release approval rehearsal boolean flags 已完成
- response shape / schema version 不变
- no-ledger-write / no-SQL / no-credential 边界已归档

mini-kv v95：
- string utils shared split 已完成
- runtime smoke evidence 当前为 project_version=0.95.0 / release_version=v95
- sandbox_adapter_storage_backend=false
- credential_value_read_allowed=false
- sandbox_managed_audit_state_write_allowed=false
```

## 推荐执行顺序

```text
1. Node v228：manual sandbox connection operator packet。
   消费 v227 checklist，生成 operator packet：owner artifact id、credential handle name、schema rehearsal id、rollback path id、timeout budget、manual abort marker。仍不连接、不读 credential value、不启动外部服务。

2. 推荐并行：Java v87 + mini-kv v96。
   - Java v87：sandbox connection operator handoff marker，只读说明 Java 侧如何接收 Node v228 的 owner artifact / rehearsal id，不写 ledger、不执行 SQL。
   - mini-kv v96：sandbox connection receipt echo marker，只读说明 mini-kv 仍只提供 receipt echo，不成为 audit storage backend，不读 credential，不写 managed audit state。

3. Node v229：manual sandbox connection packet verification。
   消费 Node v228、Java v87、mini-kv v96，验证 operator packet 与两侧 handoff/receipt marker 是否一致；仍不打开连接。
```

## 合并/并行规则

```text
Node v228 是 operator packet，不应和 v229 verification 合并。
Java v87 + mini-kv v96 推荐并行，因为二者都是只读 handoff/receipt marker，不互相依赖。
Node v229 必须等 Java v87 + mini-kv v96 都完成后再消费。
可安全并行、互不阻塞、且同属一个交付闭环的三项目版本，后续计划必须写成“推荐并行”，不要拆成容易误解的串行步骤。
```

## 质量优化显式待办

```text
Node：
- 新增 managedAudit* 服务文件接近 800 行时必须先拆 helper，不继续堆单文件。
- audit JSON/Markdown 路由必须继续使用 registerAuditJsonMarkdownRoute。
- 若继续接近真实连接，先补 operator packet / verification，不直接打开连接。

Java：
- 不允许把新 marker 继续堆进 OpsEvidenceService。
- 必须沿用 builder / helper / 子 service 拆分方式。
- 不允许新增长布尔参数构造链；字段增多时按 sandbox window / credential boundary / schema rehearsal / rollback path 分组。

mini-kv：
- 不允许继续膨胀 command.cpp 主 if-chain。
- 不允许触碰 WAL / snapshot / restore 核心。
- 不允许把 mini-kv 接成 sandbox audit storage backend。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v87 / mini-kv v96 未完成时，Node v229 必须停止。

## 一句话结论

```text
v227 已完成人工 sandbox 连接前 evidence checklist；下一步 Node v228 只能做 operator packet，仍不能打开真实连接，随后推荐并行 Java v87 + mini-kv v96。
```
