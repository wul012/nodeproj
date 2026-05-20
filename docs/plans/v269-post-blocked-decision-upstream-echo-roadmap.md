# Node v269 衍生计划：credential resolver pre-implementation intake 与质量分支

来源版本：Node v269 `credential resolver production-readiness blocked-decision upstream echo verification`。

计划状态：v268 衍生计划已经完成 Java v111、mini-kv v118、Node v269 这组三方 blocked-decision echo verification。后续不再向旧计划追加重合版本，本计划作为当前唯一后续入口。

## 当前对齐状态

```text
Node v268：production-readiness decision gate 已完成，readinessDecision=blocked。
Java v111：blocked-decision echo receipt 已完成，只读回显 Node v268，不写 ledger、不执行 SQL、不读取 credential value、不打开 managed audit connection。
mini-kv v118：blocked-decision non-participation receipt 已完成，只读证明不参与 resolver、secret provider、credential value、raw endpoint、external request、storage write、LOAD/COMPACT/RESTORE/SETNXEX。
Node v269：blocked-decision upstream echo verification 已完成，三方 blocked decision、counts、missing requirements 和 no-side-effect 边界对齐。
```

## 推荐执行顺序

```text
1. Node v270：credential resolver pre-implementation plan intake。
   - 消费 Node v269。
   - 只生成 plan intake，不实现真实 resolver。
   - 明确 credential handle、endpoint handle、disabled secret-provider stub、operator approval、rollback、redaction、external request simulation、schema migration policy、audit ledger write policy。
   - 如果 10 个边界不能一次写清楚，继续 blocked，不进入实现。

2. Node v271：statusRoutes split pre-quality branch。
   - 质量优化分支，不新增真实 resolver 能力。
   - 优先拆 `src/routes/statusRoutes.ts` 的 route group/helper。
   - 保持 API path / response shape 不变。
   - 同时记录后续 echo factory / shared evidence alignment helper 的候选点，但不在 v271 做大重构。

3. 推荐并行：Java v112 + mini-kv v119。
   - Java v112：只读回显 Node v270 pre-implementation plan intake，重点验证 Java 仍不读取 credential value、不写 ledger、不执行 SQL。
   - mini-kv v119：只读 non-participation receipt，证明 mini-kv 不承载 resolver secret、endpoint、external request 或 audit/order 权威状态。
   - 两边可以并行，因为都只消费 Node v270，不互相依赖。

4. Node v272：pre-implementation intake upstream echo verification。
   - 仅在 Java v112 + mini-kv v119 完成后推进。
   - 验证 Node v270 的 10 个边界被两边一致理解。
   - 仍不实现真实 resolver，不读取 credential value，不解析 raw endpoint，不打开 managed audit connection。
```

## 显式质量优化项

```text
Node：
- v270 不做质量重构，避免把 plan intake 和代码结构优化混在一版。
- v271 专门处理 `statusRoutes.ts` 拆分，先做 route group/helper 分离。
- 后续若 echo verification 继续重复 service/types/renderer/test 四件套，可借鉴 Java v108 的 echo factory 思路，抽 Node 侧 shared evidence alignment helper。
- 新增 audit endpoint 继续使用 `auditJsonMarkdownRoutes` + `auditJsonMarkdownRoute`。

Java：
- Java v112 若推进，继续沿用 support / builder / records 拆分，不把新 receipt 堆回 OpsEvidenceService。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- mini-kv v119 若推进，只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
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
- Java v112 / mini-kv v119 未完成时，Node v272 必须停止。

## 一句话结论

```text
v269 已经把 blocked decision 三方回显验证收口；下一步先做 Node v270 的 pre-implementation plan intake，再把 Node v271 作为质量分支拆 statusRoutes，之后才让 Java v112 + mini-kv v119 并行回显 v270。
```
