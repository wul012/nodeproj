# Node v245 衍生计划：sandbox connection precheck 后续阶段

来源版本：Node v245 `sandbox connection precheck packet`。

计划状态：当前唯一有效全局计划。上一份 `docs/plans/v242-post-historical-evidence-fallback-roadmap.md` 已完成 Node v243、推荐并行 Java v98 + mini-kv v107、Node v244、Node v245，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v245：
- sandbox connection precheck packet 已完成
- owner approval artifact、credential handle review、schema migration rehearsal id、operator window、rollback path、abort marker、timeout policy 已生成
- readyForManagedAuditSandboxAdapterConnection=false
- 不读取 credential value，不打开 managed audit connection，不执行 schema migration，不启动 Java / mini-kv
```

## 推荐执行顺序

```text
1. 推荐并行：Java v99 + mini-kv v108。当前下一步。
   - Java v99：manual sandbox connection precheck packet echo receipt，只读回显 Node v245 的 owner approval artifact、credential handle review、schema migration rehearsal id、operator window、rollback path、abort marker、timeout policy；不写 ledger、不执行 SQL、不打开 managed audit connection。
   - mini-kv v108：manual sandbox connection precheck non-participation receipt，只读证明 Node v245 precheck packet 不会让 mini-kv 自动启动、写 storage、读 credential、执行 restore/load/compact/SETNXEX，且不会成为 managed audit storage backend。
   - 两者可以并行推进，因为它们只读消费 Node v245 packet，不互相依赖，也不做真实连接。

2. Node v246：manual sandbox connection precheck upstream receipt verification。
   只读消费 Java v99 + mini-kv v108，验证 precheck item count、operator field names、credential/connection/write/auto-start 边界一致。
   如果两边未完成或证据不匹配，Node v246 必须停止，不得降级为部分 ready。

3. Node v247：manual sandbox connection rehearsal guard。
   在 v246 通过后，只生成人工 rehearsal guard：明确需要 owner approval artifact、credential handle review status、schema rehearsal approval、manual window open marker、rollback path、abort marker 与 timeout policy。
   仍不读取 credential value，不连接 managed audit，不执行 schema migration，不启动 Java / mini-kv。
```

## 显式质量优化项

```text
Node：
- v246 继续使用 `registerAuditJsonMarkdownRoute` 路由注册表。
- v246 消费 Java / mini-kv 时，只读核对 tag、归档、sample/fixture、关键字段，不构建、不启动、不测试、不修改上游项目。
- v247 只能做 rehearsal guard，不允许偷偷加入真实连接 client。

Java：
- v99 优先用 builder/helper 承载 precheck echo receipt，不把字段继续堆进 OpsEvidenceService 主类。
- v99 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- v108 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- v108 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v99 / mini-kv v108 未完成时，Node v246 必须停止。

## 一句话结论

```text
v245 已把真实 sandbox connection 前的 precheck packet 生成完；下一阶段先让 Java v99 + mini-kv v108 并行只读回显/非参与，再由 Node v246/v247 做 receipt verification 与 rehearsal guard，仍不打开真实 managed audit connection。
```
