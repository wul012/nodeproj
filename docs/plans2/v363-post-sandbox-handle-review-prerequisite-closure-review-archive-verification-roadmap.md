# Node v363 衍生计划：sandbox handle review prerequisite closure review archive verification 之后

来源版本：Node v363 `sandbox handle review prerequisite closure review archive verification`。

计划状态：v362 衍生计划中的 Node v363 已完成后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v349：minimal read-only integration smoke rerun archive 已真实只读跑通，5/5 passed。
Node v350：minimal read-only integration passed archive verification 已完成，25/25 checks passed。
Node v351-v353：managed-audit-disabled read-only integration intake / archive / decision record 已完成。
Node v354-v363：sandbox handle review prerequisite / contract / packet gate / closure / archive verification 已完成。

Java v153 + mini-kv v144：继续跳过。v349-v363 都没有 invalid-read-contract，因此不要求两边补字段。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 合理性判断

```text
Node 连续推进偏多是事实，但 v363 本身合理：
- v362 明确要求先做 archive verification。
- v363 消费 d/362 归档，验证 JSON / Markdown / summary / HTML / 截图 / 解释 / 代码讲解 / 计划索引 / 归档索引。
- v363 没有请求 Java / mini-kv，也没有打开任何执行能力。

但 v363 之后不能继续长期只做 archive verification / prerequisite closure。
v349 已经证明最小只读联调真实跑通，下一步应把 v349 的最小只读联调固化成常规门禁。
```

## 推荐执行顺序

```text
1. Node v364：minimal read-only integration regular gate。当前下一步。
   - 消费 Node v349/v350 passed evidence。
   - 把真实只读 smoke 的前置条件、headers、safe env、Java/mini-kv readiness、失败分类固化成常规 gate。
   - 默认不自动启动 Java / mini-kv；如果需要真实重跑，由用户明确授权或外部窗口提供。
   - 不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 managed audit HTTP/TCP。
   - 不做新的 prerequisite closure 链条。

2. Node v365：
   - 如果 v364 regular gate 只做 gate 定义，则 v365 可以做 gate archive verification。
   - 如果 v364 已包含足够归档证据，则 v365 应转向真实只读 gate 的小组验证/CI 友好化，而不是继续 closure。

3. Java / mini-kv：
   - 当前不要求新版本。
   - 只有 Node v364 regular gate 发现 invalid-read-contract、缺必要只读字段，或用户明确要求两边补只读 evidence 时，才推荐并行 Java + mini-kv。
```

## 显式质量优化项

```text
Node：
- v364 不要复制 v349/v350 的大段报告逻辑；优先复用现有 smoke / passed archive profile。
- v364 只定义常规门禁所需字段：safe env、operator headers、upstream readiness、read-only route allowlist、failure classification、artifact expectations。
- 新增 service 继续分层 types/service/renderer/test；单 service 接近 700 行时先拆 helper/catalog。
- 测试继续分批：focused -> 小组 -> build -> smoke，不一次性跑大批量测试。

Java：
- 当前不要求 Java 新版本。

mini-kv：
- 当前不要求 mini-kv 新版本。
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

## 一句话结论

```text
v363 是必要归档收口；v364 开始应把 v349 的真实最小只读联调沉淀成常规门禁，避免 Node 继续在 archive / closure 链条里自转。
```
