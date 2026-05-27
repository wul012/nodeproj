# Node v344 衍生计划：disabled design draft body draft candidate archive verification 之后

来源版本：Node v344 `disabled design draft body draft candidate archive verification`。

计划状态：v342 衍生计划中的 Node v343、Node v344 已形成闭环后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v341：disabled design draft body preparation plan 已完成。
Node v342：disabled design draft body preparation plan archive verification 已完成。
Node v343：disabled design draft body draft candidate 已完成；只写受限设计文本，不实现 runtime、不请求 Java/mini-kv。
Node v344：disabled design draft body draft candidate archive verification 已完成；验证 v343 route/Markdown/digest/截图/讲解/计划索引。
Node v345：minimal read-only integration window readiness cut 已完成；消费 v344，列出 Java GET 与 mini-kv HEALTH/INFOJSON/STATSJSON 最小只读联调窗口，不启动上游、不探测上游。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 方向修正

```text
方向正确：继续保持 fail-closed、非 secret handle、只读证据和人工窗口。
节奏修正：不要继续无限增加 disabled design draft / archive verification 层。
下一阶段目标：收束治理链，尽快推进 Node -> Java / mini-kv 的最小只读真实联调窗口。
```

这不是跳过安全边界，而是把安全边界转化为实际只读联调门禁。

## 推荐执行顺序

```text
1. Node v345：minimal read-only integration window readiness cut。已完成。
   - 消费 Node v344。
   - 列出 Java / mini-kv 最小只读联调所需 endpoint / command / header / env handle。
   - 明确只允许 GET/health/read-only command，不允许 Java 写、不允许 mini-kv write/admin。
   - 不自动启动 Java / mini-kv；如果服务未运行，记录 blocked readiness，而不是启动它们。
   - 输出下一步是否需要 Java / mini-kv 补只读 echo 或 endpoint 字段。

2. 推荐并行：Java v153 + mini-kv v144（已由 Node v345 判定可跳过）。
   - Java v153：补最小只读联调需要的 health/ops evidence 字段；不写 ledger/schema/SQL。
   - mini-kv v144：补最小只读联调需要的 HEALTH/INFOJSON/STATSJSON 只读证据字段；不执行 write/admin。
   - Node v345 已证明现有 Node Java client 支持 `GET /actuator/health`、`GET /api/v1/ops/overview`，mini-kv client 支持 `HEALTH`、`INFOJSON`、`STATSJSON`，因此这组并行版本跳过。

3. Node v346：minimal read-only integration smoke rehearsal。当前下一步。
   - 只在用户或外部窗口已经启动 Java / mini-kv 时执行只读探测。
   - Node 不负责启动、停止、构建、测试 Java / mini-kv。
   - 探测失败必须 fail closed，并归档 connection refused / timeout / invalid JSON 的分类。
```

## 显式质量优化项

```text
Node：
- v345 必须复用现有 upstream / live-read / route helper，禁止再复制一套 600+ 行治理模板。
- 新增文件仍按 types / service / renderer / test 拆分；如果服务接近 700 行，先抽 catalog/helper。
- v345 要把“为什么现在进入最小只读联调”写成 necessity proof，避免 governance 链无限增长。
- 单个 commit 目标低于 3000 changed lines；超过则拆成代码、归档、计划文档。

Java：
- 只有 Node v345 明确发现缺少只读联调字段时，才推荐 Java v153。
- Java v153 若发生，必须只补只读 evidence，不写 ledger/schema/SQL，不扩大生产权限。

mini-kv：
- 只有 Node v345 明确发现缺少只读联调字段时，才推荐 mini-kv v144。
- mini-kv v144 若发生，必须只补 HEALTH/INFOJSON/STATSJSON 级别证据，不执行 LOAD/COMPACT/RESTORE/SETNXEX/write/admin。
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
- 如果 v345 不能证明它是在推进最小只读联调，而只是继续增加治理说明，必须暂停并改计划。

## 一句话结论

```text
Node v344 已把 v343 设计正文候选验成稳定归档；Node v345 已把下一步收束到最小只读真实联调 readiness。下一步 Node v346 只能在用户或外部窗口启动 Java / mini-kv 后做只读 smoke rehearsal，Node 自己不自动启动上游。
```
