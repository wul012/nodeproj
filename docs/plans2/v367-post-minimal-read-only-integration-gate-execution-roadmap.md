# Node v367 衍生计划：minimal read-only integration gate execution 之后

来源版本：Node v367 `minimal read-only integration gate execution`。

计划状态：v366 衍生计划中的 Node v367 已完成真实最小只读 gate execution 后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v349：minimal read-only integration smoke rerun archive 已真实只读跑通，5/5 passed。
Node v364：minimal read-only integration regular gate 已完成，34/34 checks passed。
Node v365：regular gate archive + CI/operator friendly check 已完成，40/40 checks passed。
Node v366：explicit read-window gate execution decision 已完成，明确无窗口时等待。
Node v367：minimal read-only integration gate execution 已完成，真实读窗口下 5/5 read targets passed，20/20 checks passed。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 合理性判断

```text
v367 是一个真实推进点：
- 它不再只是 archive / closure。
- 它消费用户已启动的 Java / mini-kv 窗口。
- 它复用 v349 smoke lane，不新造大 service。
- 它把 v365 regular gate 从文档门禁推进到真实执行证据。
```

## 推荐执行顺序

```text
1. Node v368：minimal read-only gate execution archive verification。
   - 消费 v367 JSON / Markdown / summary / screenshot / walkthrough。
   - 验证 5/5 read targets passed，20/20 checks passed。
   - 验证 startsJavaService=false、startsMiniKvService=false、executionAllowed=false、managed audit=false。
   - 验证 v367 复用了 v349 smoke lane，而不是复制新 probe 体系。
   - 不要求 Java / mini-kv 新版本。

2. Node v369：operator/CI regular gate handoff。
   - 仅在 v368 验证通过后执行。
   - 把 v367 gate execution 固化为后续 operator/CI 的分批执行建议。
   - 继续要求 focused -> grouped -> build -> smoke，不一次性跑大批量测试。
   - 若需要再次真实读窗口，必须在计划里写清 Java / mini-kv 启动要求。

3. Java / mini-kv：
   - 当前不要求新版本。
   - 只有后续 gate 出现 invalid-read-contract，才推荐并行 Java + mini-kv 修只读 evidence。
```

## 显式质量优化项

```text
Node：
- v368 优先做 archive verification，不新增重复 probe service。
- v369 若写 operator/CI handoff，应消费 v367 evidence，不重新定义 5 个 read targets。
- 新文件继续保持拆分：types / renderer / service / test，不写巨型文件。

Java：
- 当前不要求 Java 新版本。

mini-kv：
- 当前不要求 mini-kv 新版本。
```

## 后续读窗口要求

```text
如果 v369 或后续版本需要再次真实读取 Java / mini-kv：
- Java 仍需提供 8080 health + ops overview。
- mini-kv 仍需提供 6379 HEALTH / INFOJSON / STATSJSON。
- Node 只设置 UPSTREAM_PROBES_ENABLED=true；UPSTREAM_ACTIONS_ENABLED 必须保持 false。
- Node 不自动启动上游，除非用户在本轮明确授权。
```

## 暂停条件

- v368 发现 v367 归档缺 JSON / Markdown / summary / screenshot / walkthrough。
- v368 发现 v367 不是 5/5 read-passed 或 20/20 checks passed。
- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider、真实 resolver client、fake secret provider 或 fake resolver client。
- 需要 Node 实现、启用或调用 disabled runtime shell。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
v367 已把最小只读 regular gate 真正跑通；下一步 Node v368 应验证归档并固化为可重复 gate evidence，而不是继续请求 Java / mini-kv 新版本。
```
