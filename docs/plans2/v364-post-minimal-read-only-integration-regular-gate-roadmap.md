# Node v364 衍生计划：minimal read-only integration regular gate 之后

来源版本：Node v364 `minimal read-only integration regular gate`。

计划状态：v363 衍生计划中的 Node v364 已完成后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v349：minimal read-only integration smoke rerun archive 已真实只读跑通，5/5 passed。
Node v350：minimal read-only integration passed archive verification 已完成，25/25 checks passed。
Node v351-v363：managed-audit-disabled read-only integration 与 sandbox handle review prerequisite/contract/packet/closure 已完成。
Node v364：已把 v349/v350 的 passed evidence 固化为 minimal read-only integration regular gate，34/34 checks passed。

Java v153 + mini-kv v144：继续不要求。v364 没有 invalid-read-contract，也没有要求两边新增 read field。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 合理性判断

```text
v364 是对“Node 连续推进偏多”的纠偏：
- 它没有继续堆新的 prerequisite closure。
- 它消费 v349/v350 已经真实通过的只读联调证据。
- 它把 safe env、operator headers、read-only target allowlist、failure classification 和 artifact expectations 固化成常规门禁。

但 v364 仍是 gate definition，不是生产窗口。
后续最多做一次 v365 archive / CI 友好化收口，然后应进入明确的 read-only gate 执行窗口或等待外部窗口，而不是继续长链条 archive。
```

## 推荐执行顺序

```text
1. Node v365：minimal read-only integration regular gate archive + CI/operator friendly check。当前下一步。
   - 消费 Node v364 regular gate。
   - 验证 JSON / Markdown / summary / HTML / 截图 / 解释 / 代码讲解 / plan / index 齐全。
   - 同版给出 focused CI/operator smoke 建议，避免 v366 再单独做一版纯 archive。
   - 不重跑 Java / mini-kv，不自动启动上游。
   - 不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 managed audit HTTP/TCP。

2. Node v366：
   - 如果 v365 已把 archive + CI/operator 友好化收口，则 v366 应进入 explicit read-window gate execution decision。
   - 若没有 Java / mini-kv 读窗口授权，则停在 wait-for-external-read-window，不继续写新的 closure 链。

3. Java / mini-kv：
   - 当前不要求新版本。
   - 只有 Node v365/v366 发现 invalid-read-contract、缺必要只读字段，或用户明确要求两边补只读 evidence 时，才推荐并行 Java + mini-kv。
```

## 显式质量优化项

```text
Node：
- v365 允许合并 archive verification 与 CI/operator friendly check，不要拆成两个很小版本。
- v365 继续分层 types/service/renderer/test；不要生成 700+ 行新 service。
- 新增 gate / archive 逻辑优先复用 v364 profile 和现有 archive reference helper，不复制 v349/v350 大段逻辑。
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
v364 已把 v349/v350 的真实最小只读联调沉淀成 regular gate；v365 应一次性完成 archive + CI/operator friendly 收口，然后准备进入更明确的只读执行窗口。
```
