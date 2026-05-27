# Node v340 衍生计划：disabled design draft body pre-draft decision archive verification 之后

来源版本：Node v340 `disabled design draft body pre-draft decision archive verification`。

计划状态：v338 衍生计划中的 Node v339、Node v340 已形成闭环后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v337：disabled design draft body candidate review 已完成；只审查 body candidate 是否可归档，不写 body draft、不实现 runtime。
Node v338：disabled design draft body candidate archive verification 已完成；验证 v337 route/Markdown/evidence digest/截图/讲解/计划索引，未打开 body draft 或 runtime。
Node v339：disabled design draft body pre-draft decision 已完成；只记录是否可进入受限 body draft 准备，不写 body draft、不实现 runtime。
Node v340：disabled design draft body pre-draft decision archive verification 已完成；验证 v339 route/Markdown/evidence digest/截图/讲解/计划索引，未打开 body draft 或 runtime。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发 HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v341：disabled design draft body preparation plan。
   - 消费 Node v340 archive verification。
   - 只准备 body draft 的章节执行计划和证据映射，不写正式 body draft 正文。
   - 必须继续写 necessity proof：解决哪个 blocker、谁消费、为什么不能复用 v340、何时停止。
   - 不请求 Java/mini-kv；除非本版新增需要上游确认的非 secret handoff 字段。

2. Node v342：disabled design draft body preparation plan archive verification。
   - 验证 v341 route/Markdown/evidence digest/截图/讲解/计划索引。
   - 仍不打开真实 runtime，不请求 Java/mini-kv 新 echo。

3. 如果 Node v341 定义新的非 secret handoff 字段，才推荐并行 Java v153 + mini-kv v144。
   - Java v153：只读 echo v341 handoff，不写 ledger/schema/SQL。
   - mini-kv v144：non-participation receipt，只确认不执行 write/admin、不承载 audit/order authority。
```

## 显式质量优化项

```text
Node：
- v341/v342 继续沿用 types / service / renderer / test 拆分，禁止新增巨型 service。
- 如果 body preparation plan 字段继续膨胀，先抽 catalog/template，再继续写功能。
- 新增治理/design 链必须写 necessity proof：解决哪个 blocker、谁消费、为什么不能复用已有 report、何时停止。
- 单个 commit 目标低于 3000 changed lines；如超出，拆成代码、归档/截图、计划文档多个小提交。
- 归档验证继续兼容 UTF-8 BOM 和 historical fallback。

Java：
- 当前不需要新的 Java 版本配合 Node v341，除非 v341 明确提出新的非 secret contract 字段。
- 若 Java 自行优化，仍优先 service/catalog 化，不把 echo builder 重新膨胀成 600+ 行模板。

mini-kv：
- 当前不需要新的 mini-kv 版本配合 Node v341，除非 v341 明确提出新的 non-participation receipt 字段。
- 仍不执行 LOAD/COMPACT/RESTORE/SETNXEX/write/admin，不进入集群分片或 audit/order authority。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider、真实 resolver client、fake secret provider 或 fake resolver client。
- 需要 Node 实现、启用或调用 disabled runtime shell。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- 如果 Node v341 不能说明 body preparation plan 的必要性、消费者和停止条件，必须暂停。

## 一句话结论

```text
Node v340 已完成 pre-draft decision archive verification；下一步只允许 Node v341 做 body preparation plan，仍不是 body draft 或 runtime shell 实现。
```
