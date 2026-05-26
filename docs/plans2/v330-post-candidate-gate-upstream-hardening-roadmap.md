# Node v330 衍生计划：candidate gate upstream hardening review 之后

来源版本：Node v330 `candidate gate upstream alignment / hardening review`。

计划状态：v328 计划的 Node v329、Java v151、mini-kv v143、Java v152 补充 echo、Node v330 已形成闭环后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v329：implementation candidate gate / input-hardening decision 已完成；只允许请求 Java/mini-kv 做稳定只读 input-hardening 证据。
Java v151：release approval evidence export hint 已完成；提供 release-approval-rehearsal-current.json 这类稳定只读 evidence export 方向。
Java v152：input-hardening decision echo 已完成；明确消费 Node v329，并确认 Java v151 已满足 java-stable-evidence-export。
mini-kv v143：input-hardening candidate gate non-participation receipt 已完成；提供 stable current receipt export，并继续拒绝 LOAD/COMPACT/RESTORE/SETNXEX/write/admin。
Node v330：candidate gate upstream hardening review 已完成；消费 Node v329 + Java v151/v152 + mini-kv v143，允许下一步只进入 disabled design draft candidate review，不允许直接实现 runtime shell。
Node v331：disabled runtime shell design draft candidate review 已完成；只判断是否值得进入后续 archive verification，不写 design draft outline、不实现 runtime。
Node v332：disabled design draft candidate archive verification 已完成；只验证 v331 归档、route、Markdown、digest、截图/讲解/计划索引和 historical fallback，不写 design draft outline、不实现 runtime。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发 HTTP/TCP、不打开 managed audit connection、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v331：disabled runtime shell design draft candidate review。已完成。
   - 消费 Node v330 hardening review。
   - 只定义“是否值得起草 disabled runtime shell design”的候选评审，不写 shell、不写 adapter、不实例化 provider/client。
   - 必须继续写 necessity proof：解决哪个 blocker、谁消费、为什么不能复用 v330、何时停止。
   - 必须把 credential value、raw endpoint URL、provider/client、HTTP/TCP、Java SQL/ledger/schema/rollback、mini-kv LOAD/COMPACT/RESTORE/SETNXEX/write/admin、auto-start 全部保持 false。

2. Node v332：disabled design draft candidate archive verification。已完成。
   - 只有 Node v331 完成且仍无副作用时才推进。
   - 消费 v331，验证 route/Markdown/evidence digest/historical fallback 是否稳定。
   - 不打开真实 runtime，不请求 Java/mini-kv 新 echo。

3. Node v333：disabled design draft outline intake。当前下一步，已另起 `docs/plans2/v332-post-disabled-design-draft-candidate-archive-verification-roadmap.md`。
   - 只做 outline intake，不实现 runtime shell。
   - 不解析 raw endpoint URL、不读取 credential value、不实例化 provider/client、不发 HTTP/TCP。
   - 仍不请求 Java + mini-kv，除非 outline intake 定义了新的非 secret contract 字段。

4. 后续是否请求 Java + mini-kv 并行 echo，由 Node v333 的结论决定。
   - 如果只是 Node 自己的 disabled design draft candidate review，不需要两边立刻跟进。
   - 如果下一步要求上游确认新的 contract 字段，才写成“推荐并行 Java v153 + mini-kv v144”。
```

## 显式质量优化项

```text
Node：
- v331/v332 继续沿用 types / service / renderer / test 拆分，禁止新增巨型 service。
- 任何新 echo/governance 链必须写 necessity proof，避免治理链无限增长。
- 单个 commit 目标低于 3000 changed lines；如超出，拆成代码、归档/截图、计划文档多个小提交。
- 对历史证据继续测试本地 sibling path 与 ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true 两种路径。

Java：
- 当前不需要新的 Java 版本配合 Node v331，除非 v331 明确提出新的 contract 字段。
- 若 Java 自行优化，优先继续 service/catalog 化，不能把 echo builder 重新膨胀成 600+ 行模板。

mini-kv：
- 当前不需要新的 mini-kv 版本配合 Node v331，除非 v331 明确提出新的 non-participation receipt 字段。
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
- 如果 Node v331 不能说明 disabled design draft candidate review 的必要性和停止条件，必须暂停。

## 一句话结论

```text
Node v330 已把 Java v151/v152 与 mini-kv v143 的 input-hardening 证据对齐；Node v331/v332 已完成 candidate review 与 archive verification。下一步只允许 Node v333 做 disabled design draft outline intake，仍不是 runtime shell 实现。
```
