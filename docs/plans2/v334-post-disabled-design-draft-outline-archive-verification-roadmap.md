# Node v334 衍生计划：disabled design draft outline archive verification 之后

来源版本：Node v334 `disabled design draft outline archive verification`。

计划状态：v332 衍生计划中的 Node v333、Node v334 已形成闭环后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v331：disabled runtime shell design draft candidate review 已完成；只允许 v332 归档验证。
Node v332：disabled design draft candidate archive verification 已完成；验证 v331 route/Markdown/JSON/smoke/screenshot/讲解/计划索引和 historical fallback。
Node v333：disabled runtime shell design draft outline intake 已完成；只定义 outline section catalog、非执行边界和 stop conditions，不写 outline body、不实现 runtime。
Node v334：disabled design draft outline archive verification 已完成；验证 v333 route/Markdown/evidence digest/截图/讲解/计划索引，未打开 runtime。
Node v335：disabled design draft body intake / readiness step 已完成；只定义 body section catalog、evidence catalog、非执行边界和 stop conditions，不写 body draft、不实现 runtime。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发 HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v335：disabled design draft body intake / readiness step。已完成。
   - 消费 Node v334 archive verification。
   - 只定义 body intake 的章节映射、输入证据清单、禁止内容和停止条件。
   - 不写 runtime shell implementation，不写 adapter/provider/client，不读取 credential value，不解析 raw endpoint URL，不发 HTTP/TCP。
   - 不请求 Java/mini-kv；除非本版新增需要上游确认的非 secret contract 字段。

2. Node v336：disabled design draft body intake archive verification。当前下一步。
   - 只有 Node v335 完成且仍无副作用时才推进。
   - 验证 v335 route/Markdown/evidence digest/截图/讲解/计划索引。
   - 仍不打开真实 runtime，不请求 Java/mini-kv 新 echo。

3. 后续是否推荐并行 Java v153 + mini-kv v144，由 Node v335/v336 的结论决定。
   - 如果只是 Node 自己的 body intake / archive verification，不需要两边跟进。
   - 如果 body intake 定义新的非 secret handoff 字段，才写成“推荐并行 Java v153 + mini-kv v144”。
```

## 显式质量优化项

```text
Node：
- v335/v336 继续沿用 types / service / renderer / test 拆分，禁止新增巨型 service。
- v335 如果 body 字段开始膨胀，必须抽 body section catalog / evidence catalog / stop-condition catalog，不允许复制 700+ 行 service。
- 新增 governance/design 链必须写 necessity proof：解决哪个 blocker、谁消费、为什么不能复用 v334、何时停止。
- 单个 commit 目标低于 3000 changed lines；如超出，拆成代码、归档/截图、计划文档多个小提交。
- 归档验证要继续兼容 UTF-8 BOM 和 historical fallback。

Java：
- 当前不需要新的 Java 版本配合 Node v335，除非 v335 明确提出新的非 secret contract 字段。
- 若 Java 自行优化，仍优先 service/catalog 化，不把 echo builder 重新膨胀成 600+ 行模板。

mini-kv：
- 当前不需要新的 mini-kv 版本配合 Node v335，除非 v335 明确提出新的 non-participation receipt 字段。
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
- 如果 Node v335 不能说明 body intake 的必要性、消费者和停止条件，必须暂停。

## 一句话结论

```text
Node v334 已把 v333 outline intake 的归档证据验稳；Node v335 已完成 disabled design draft body intake / readiness step。下一步只允许 Node v336 做 body intake archive verification，仍不是 runtime shell 实现。
```
