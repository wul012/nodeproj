# Node v345 衍生计划：minimal read-only integration window readiness cut 之后

来源版本：Node v345 `minimal read-only integration window readiness cut`。

计划状态：v344 衍生计划中的 Node v345 已形成闭环后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v343：disabled design draft body draft candidate 已完成；只写受限设计文本，不实现 runtime、不请求 Java/mini-kv。
Node v344：disabled design draft body draft candidate archive verification 已完成；验证 v343 route/Markdown/digest/截图/讲解/计划索引。
Node v345：minimal read-only integration window readiness cut 已完成；现有 Node client 已覆盖 Java GET health/ops overview 与 mini-kv HEALTH/INFOJSON/STATSJSON。

Java v153 + mini-kv v144：Node v345 判定无需补做。两边现有最小只读字段足够支撑 Node v346 的第一轮只读 smoke rehearsal。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v346：minimal read-only integration smoke rehearsal。当前下一步。
   - 只在用户或外部窗口已经启动 Java / mini-kv 时执行只读探测。
   - 只允许 Java GET /actuator/health、GET /api/v1/ops/overview。
   - 只允许 mini-kv HEALTH、INFOJSON、STATSJSON。
   - Node 不启动、不停止、不构建、不测试、不修改 Java / mini-kv。
   - 如果 Java / mini-kv 未运行，记录 connection-refused / timeout，并 fail closed；不要把不可达误判为生产通过。

2. 推荐并行：Java v153 + mini-kv v144（仅当 Node v346 发现现有只读输出字段不足）。
   - Java v153：只补 v346 真实只读 smoke 缺少的 health/ops overview 字段；不写 ledger/schema/SQL。
   - mini-kv v144：只补 v346 真实只读 smoke 缺少的 HEALTH/INFOJSON/STATSJSON 字段；不执行 write/admin。
   - 如果 Node v346 只遇到 connection refused / timeout，而不是字段缺失，不需要让 Java/mini-kv 改代码。

3. Node v347：minimal read-only integration smoke archive verification。
   - 消费 Node v346 的 smoke evidence。
   - 区分三种归档结果：all-read-passed、read-window-unavailable、invalid-read-contract。
   - 不扩大到 managed audit endpoint，不打开 runtime shell。
```

## 显式质量优化项

```text
Node：
- v346 必须复用现有 OrderPlatformClient / MiniKvClient，不复制新的 HTTP/TCP client。
- v346 的错误分类要小而清晰：connection-refused、timeout、invalid-json、unexpected-status、read-passed。
- v346 新增代码继续按 types / service / renderer / test 拆分；不要新增 700+ 行单文件。
- 不跑一次性大测试；先 focused，再小块组合验证。

Java：
- 只有 Node v346 证明只读字段缺失时，才推荐 Java v153。
- Java v153 若发生，只补只读输出字段，不写业务状态。

mini-kv：
- 只有 Node v346 证明只读字段缺失时，才推荐 mini-kv v144。
- mini-kv v144 若发生，只补只读输出字段，不执行 LOAD/COMPACT/RESTORE/SETNXEX/write/admin。
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
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE 或承载 audit/order 权威状态。
- 如果 v346 要求 Node 自行启动 Java / mini-kv，必须暂停并让用户或外部窗口启动。

## 一句话结论

```text
Node v345 已确认最小只读联调字段足够；下一步 Node v346 可以进入真实只读 smoke rehearsal，但前提是 Java / mini-kv 由用户或外部窗口启动，Node 只读探测并 fail closed。
```
