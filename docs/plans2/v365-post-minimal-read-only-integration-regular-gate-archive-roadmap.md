# Node v365 衍生计划：minimal read-only integration regular gate archive verification 之后

来源版本：Node v365 `minimal read-only integration regular gate archive verification`。

计划状态：v364 衍生计划中的 Node v365 已完成后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v349：minimal read-only integration smoke rerun archive 已真实只读跑通，5/5 passed。
Node v350：minimal read-only integration passed archive verification 已完成，25/25 checks passed。
Node v364：minimal read-only integration regular gate 已完成，34/34 checks passed。
Node v365：regular gate archive + CI/operator friendly check 已完成，40/40 checks passed。

Java v153 + mini-kv v144：继续不要求。v365 只验证 v364 归档，没有 invalid-read-contract。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 合理性判断

```text
v365 已把 archive verification 和 CI/operator friendly check 合并完成，没有拆成两个很小版本。
v365 也没有继续写新的 prerequisite closure。

下一步不能再继续 archive / closure 自转。
应进入 explicit read-window gate execution decision：
- 如果有明确 Java / mini-kv 读窗口，可按 v365 给出的 focused/grouped/build/smoke 顺序执行。
- 如果没有读窗口，就停在 wait-for-external-read-window。
```

## 推荐执行顺序

```text
1. Node v366：explicit read-window gate execution decision。当前下一步。
   - 消费 Node v365 archive verification。
   - 判断是否具备明确 Java / mini-kv read window。
   - 若没有明确授权或上游窗口，则输出 wait-for-external-read-window，不继续做新的 closure 链。
   - 若用户明确授权本轮启动或外部已启动 Java / mini-kv，则按 v365 的 focused/grouped/build/smoke 顺序执行最小只读 gate。
   - 不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 managed audit HTTP/TCP。

2. Java / mini-kv：
   - 当前不要求新版本。
   - 只有 Node v366 真实 gate execution 发现 invalid-read-contract，才推荐并行 Java + mini-kv 修只读 evidence。

3. Node 后续：
   - v366 之后若 gate execution 通过，可进入 managed-audit-disabled read-only integration 的下一阶段整理。
   - 若 gate execution 仍因窗口未开而 pending，不要继续新增 archive / closure 版本。
```

## 显式质量优化项

```text
Node：
- v366 不要新增 700+ 行 service；若需要执行决策，优先消费 v365 profile，保持 service / types / renderer / test 拆分。
- v366 只做决策或一次最小只读 gate execution，不夹带大重构。
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
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务，且用户未明确授权。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
v365 已完成 regular gate 归档与 CI/operator 友好化；v366 应明确判断是否进入真实只读执行窗口，没有窗口就停，不再继续堆 archive / closure。
```
