# Node v272 衍生计划：credential resolver disabled candidate 前置收敛

来源版本：Node v272 `credential resolver pre-implementation plan intake upstream echo verification`。

计划状态：v269 衍生计划已经完成 Node v270、Node v271、Java v112、mini-kv v119、Node v272 这一组计划摄取和三方回显验证。后续不再向旧计划追加重合版本，本计划作为当前唯一后续入口。

## 当前对齐状态

```text
Node v270：credential resolver pre-implementation plan intake 已完成，10 个边界均为 defined-for-review。
Node v271：statusRoutes split quality pass 已完成，API path / response shape 保持不变。
Java v112：只读 echo receipt 已完成，不读取 credential value、不写 ledger、不执行 SQL、不打开 managed audit connection。
mini-kv v119：只读 non-participation receipt 已完成，不实现 resolver、不实例化 resolver client / secret provider、不读 credential、不写 storage、不执行 LOAD/COMPACT/RESTORE/SETNXEX。
Node v272：pre-implementation intake upstream echo verification 已完成，三方 planIntakeState、counts、boundary codes、requirement codes 和 no-side-effect 边界对齐。
```

## 推荐执行顺序

```text
1. Node v273：credential resolver disabled implementation candidate review。
   - 消费 Node v272。
   - 只定义 disabled resolver interface candidate 和 fake wiring review。
   - 不实例化真实 secret provider，不读取 credential value，不解析 raw endpoint，不发送 external request。
   - 重点检查 v272 的 10 个边界中，哪些可以进入 disabled candidate，哪些必须继续留在后续审批。

2. 推荐并行：Java v113 + mini-kv v120。

   Java v113：只读回显 Node v273 disabled implementation candidate review。
   - 只说明 Java 是否理解 disabled candidate 的接口边界。
   - 不写 approval ledger，不执行 SQL，不打开 managed audit connection。

   mini-kv v120：只读 non-participation receipt。
   - 只证明 mini-kv 不参与 resolver interface、secret provider、credential value、raw endpoint、transport、audit/order 权威状态。
   - 不执行 LOAD / COMPACT / RESTORE / SETNXEX，不触碰 WAL/snapshot/restore 核心语义。

   并行理由：
   - Java v113 和 mini-kv v120 都只消费 Node v273 的只读 disabled candidate evidence。
   - 两边写入不同仓库、不同职责域，不互相依赖。

3. Node v274：disabled candidate upstream echo verification。
   - 仅在 Java v113 + mini-kv v120 完成后推进。
   - 验证三方对 disabled resolver candidate 的接口边界、禁用状态、失败分类和 no-side-effect 边界一致。
   - 仍不实现真实 resolver，不读取 credential value，不解析 raw endpoint，不打开 managed audit connection。
```

## 显式质量优化项

```text
Node：
- v273 若新增 service/types/renderer/test，继续从一开始拆分类型和 renderer，避免单文件继续膨胀。
- route 继续放入 auditJsonMarkdownRoutes，不新增手写 JSON/Markdown route 样板。
- 如果 v273 出现重复的 Java/mini-kv evidence 引用逻辑，记录 shared upstream echo helper 候选，但不要和 v273 业务闭环混成大重构。

Java：
- Java v113 若推进，继续沿用 support / builder / records 拆分，不把新 receipt 堆回 OpsEvidenceService。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- mini-kv v120 若推进，只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
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
- Java v113 / mini-kv v120 未完成时，Node v274 必须停止。

## 一句话结论

```text
v272 已完成 plan-intake 三方回显验证；下一步 Node v273 可以进入 disabled implementation candidate review，但仍然只是 disabled / fake / review，不是真实 credential resolver 实现。
```
