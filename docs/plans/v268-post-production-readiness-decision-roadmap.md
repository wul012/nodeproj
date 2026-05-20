# Node v268 衍生计划：credential resolver production readiness decision 后续阶段

来源版本：Node v268 `credential resolver production readiness decision gate`。

计划状态：下一阶段当前唯一有效全局计划。上一份 `docs/plans/v266-post-fake-shell-archive-roadmap.md` 已完成 Node v267、Node v268，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v267：
- credential resolver fake-shell archive upstream echo verification 已完成
- 消费 Node v266、Java v110、mini-kv v117
- 验证 archive count、snippet count、no-rerun、credential、raw endpoint、resolver、connection、write 和 auto-start 边界一致
- 仍不实现真实 resolver client / secret provider，不读取 credential value，不解析 raw endpoint URL，不发送 external request

Node v268：
- credential resolver production readiness decision gate 已完成
- 消费 Node v267，输出生产就绪决策：readinessDecision=blocked
- 记录 10 个进入真实 resolver pre-implementation 前必须补齐的硬边界
- 仍不实现真实 resolver client / secret provider，不读取 credential value，不解析 raw endpoint URL，不发送 external request
```

## 推荐执行顺序

```text
1. 推荐并行：Java v111 + mini-kv v118。
   - Java v111：credential resolver production-readiness blocked-decision echo receipt，只读引用 Node v268，证明 Java 侧仍不写 ledger、不执行 SQL、不读取 credential value、不打开 managed audit connection。
   - mini-kv v118：credential resolver production-readiness blocked-decision non-participation receipt，只读引用 Node v268，证明 mini-kv 仍不参与 resolver、secret provider、credential value、raw endpoint、external request、storage write、LOAD/COMPACT/RESTORE/SETNXEX。
   - 两者可以并行，因为都只读消费 Node v268，不互相依赖，也不做真实连接。

2. Node v269：credential resolver production-readiness blocked-decision upstream echo verification。
   - 仅在 Java v111 + mini-kv v118 完成后推进。
   - 消费两边对 Node v268 blocked decision gate 的 echo / non-participation。
   - 验证 10 个 missing requirement、blocked decision、no credential、no raw endpoint、no resolver、no connection、no write 和 no auto-start 边界被三方一致理解。

3. Node v270：credential resolver pre-implementation plan intake。
   - 仅消费 Node v269，不实现真实 resolver。
   - 输出下一阶段 plan intake：credential handle、endpoint handle、disabled secret-provider stub、operator approval、rollback、redaction、external request simulation、schema migration policy、ledger write policy。
   - 如果 intake 不能把 10 个硬边界全部写清楚，继续 blocked，不进入实现。

4. Node v271：statusRoutes 拆分预备质量版。
   - 按当前质量建议，先审计 `src/routes/statusRoutes.ts` 的 2250+ 行职责边界。
   - 目标是拆出只读 helper / route group，不改变 API 行为，不新增生产连接能力。
   - 若 v270 的 plan intake 未完成，v271 可以作为质量优化支线推进；不能借质量优化绕过 resolver 门禁。
```

## 显式质量优化项

```text
Node：
- 借鉴 Java v108 echo factory 的做法：后续 echo verification 若继续出现 service/types/renderer/test 四件套重复，应抽象 Node 侧 echo factory 或 shared evidence alignment helper。
- `statusRoutes.ts` 已超过 2250 行，下阶段应安排 1-2 个质量版拆分 route group / helper，避免继续扩大单文件。
- 新增 audit route 继续走 `auditJsonMarkdownRoutes` + `auditJsonMarkdownRoute`。
- v269 从一开始拆出 types / renderer / service，不把三方 echo 逻辑堆进路由文件。
- v270 是 plan intake，不应膨胀成真实 resolver implementation。

Java：
- Java v111 只做 blocked-decision echo receipt，不把字段堆回 `OpsEvidenceService`。
- 继续沿用 v108/v109 的 echo support / response records 拆分成果。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- mini-kv v118 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
- 继续复用 credential resolver receipt 模块，不扩大 command dispatch if-chain。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider 或真实 credential resolver client。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v111 / mini-kv v118 未完成时，Node v269 必须停止。
- 任一版本从 blocked-decision evidence 变成真实 secret provider、credential value reader 或 external endpoint request，必须暂停并另起计划。

## 一句话结论

```text
v268 已把生产就绪决策明确为 blocked；下一阶段应先让 Java v111 + mini-kv v118 并行只读回显这个 blocked decision，再由 Node v269 做三方 blocked-decision echo verification，仍不得进入真实 resolver 实现。
```

## 收口状态

```text
Java v111：已完成 blocked-decision echo receipt。
mini-kv v118：已完成 blocked-decision non-participation receipt。
Node v269：已完成 blocked-decision upstream echo verification。
本计划已收口；后续从 docs/plans/v269-post-blocked-decision-upstream-echo-roadmap.md 继续。
```
