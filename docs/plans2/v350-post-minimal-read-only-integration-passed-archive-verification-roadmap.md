# Node v350 衍生计划：minimal read-only integration passed archive verification 之后

来源版本：Node v350 `minimal read-only integration passed archive verification`。

计划状态：v349 衍生计划中的 Node v350 已完成 v349 passed evidence verification 并输出阶段切换决策后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v349：minimal read-only integration smoke rerun archive 已完成；真实只读重跑 5/5 passed。
Node v350：minimal read-only integration passed archive verification 已完成；25/25 checks passed，transitionDecision=advance-to-managed-audit-disabled-read-only-integration-intake。

Java v153 + mini-kv v144：继续跳过。v349/v350 都没有 invalid-read-contract，因此不需要两边补字段。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v351：managed-audit-disabled read-only integration intake。当前下一步。
   - 消费 Node v350 transition decision。
   - 只定义 managed audit 仍 disabled 的只读 integration stage 输入。
   - 明确 credential value、raw endpoint URL、provider/client、runtime shell、Java writes、mini-kv write/admin 全部仍关闭。
   - 不要求 Java / mini-kv 新版本。

2. 后续真实联调窗口：
   - Java / mini-kv 由各自项目窗口启动并回报健康与只读命令结果。
   - Node 只消费它们的只读能力。
   - Node 不再默认替两边启动服务；需要例外时必须有用户明确授权。

3. Node v352 或后续：
   - 如果 v351 intake 仍完全 disabled，可以做 archive verification / transition。
   - 如果需要真实 managed audit sandbox credential、真实 endpoint handle 或 provider/client，必须暂停并让用户确认授权与输入范围。
```

## 显式质量优化项

```text
Node：
- v351 必须复用 v350 transition decision，不新增重复 archive reader。
- 继续新增 report 前先写必要性证明：解决哪个 blocker、谁消费、为什么不能复用 v350。
- 新增文件仍按 types / service / renderer / test 拆分；单文件接近 700 行前先拆 helper/catalog。
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
Node v350 已把 v349 真实只读联调通过结果固化为阶段切换证据。下一步 Node v351 可以进入 managed-audit-disabled read-only integration intake，但仍不能打开 credential、endpoint、provider/client、runtime shell 或写操作能力。
```
