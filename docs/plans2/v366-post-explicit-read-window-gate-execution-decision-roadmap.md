# Node v366 衍生计划：explicit read-window gate execution decision 之后

来源版本：Node v366 `explicit read-window gate execution decision`。

计划状态：v365 衍生计划中的 Node v366 已完成后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v349：minimal read-only integration smoke rerun archive 已真实只读跑通，5/5 passed。
Node v350：minimal read-only integration passed archive verification 已完成，25/25 checks passed。
Node v364：minimal read-only integration regular gate 已完成，34/34 checks passed。
Node v365：regular gate archive + CI/operator friendly check 已完成，40/40 checks passed。
Node v366：explicit read-window gate execution decision 已完成，22/22 checks passed。

当前 v366 决策：wait-for-external-read-window。
原因：本轮没有明确 Java / mini-kv 读窗口授权。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 合理性判断

```text
v366 是必要的真实流程分叉：
- 如果没有明确读窗口，就停在 wait-for-external-read-window。
- 如果用户明确授权 Node 启动 Java / mini-kv，或两边由外部窗口启动，则下一步才能做真实 gate execution。
- 不应继续新增 archive / closure-only 版本。
```

## 推荐执行顺序

```text
1. 暂停 Node 自动推进。当前下一步不是继续写 Node 报告。
   - 等待用户明确说明：Java / mini-kv 已经启动，或授权 Node 本轮启动它们。
   - 没有读窗口时，不要推进 v367。

2. Node v367：minimal read-only gate execution。仅在明确读窗口存在时执行。
   - 按 v365 的 focused -> grouped -> build -> smoke 顺序执行。
   - 真实只读访问 Java / mini-kv 的 5 个目标。
   - 若 5/5 passed，归档 execution evidence。
   - 若 read-window-unavailable，保持 wait，不改 Java/mini-kv。
   - 若 invalid-read-contract，才推荐并行 Java + mini-kv 修只读 evidence。

3. Java / mini-kv：
   - 当前不要求新版本。
   - 只有 v367 真实 gate execution 发现 invalid-read-contract，才推荐并行 Java + mini-kv。
```

## 显式质量优化项

```text
Node：
- 不要在无读窗口时继续堆 archive / closure。
- v367 如果执行，应复用 v349/v365 的 smoke/gate 体系，不新造一套大 service。
- 测试继续分批：focused -> 小组 -> build -> smoke，不一次性跑大批量测试。

Java：
- 当前不要求 Java 新版本。

mini-kv：
- 当前不要求 mini-kv 新版本。
```

## 暂停条件

- 用户没有明确给出 Java / mini-kv 读窗口，且没有授权 Node 启动两边。
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
v366 已明确：没有 Java / mini-kv 读窗口时，Node 应停在 wait-for-external-read-window；只有用户明确授权或上游窗口打开后，才进入 v367 真实最小只读 gate execution。
```
