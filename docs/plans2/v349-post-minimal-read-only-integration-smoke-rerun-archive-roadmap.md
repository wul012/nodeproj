# Node v349 衍生计划：minimal read-only integration smoke rerun archive 之后

来源版本：Node v349 `minimal read-only integration smoke rerun archive`。

计划状态：v348 衍生计划中的 Node v349 已完成真实只读联调重跑并归档 `all-read-passed` 后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v346：minimal read-only integration smoke rehearsal 已完成；早期结果为 read-window-unavailable。
Node v347：minimal read-only integration smoke archive verification 已完成；确认不可达属于 external read window 问题。
Node v348：minimal read-only integration rerun decision 已完成；决策为 wait-for-external-read-window。
Node v349：minimal read-only integration smoke rerun archive 已完成；本轮授权启动 Java / mini-kv 后，真实只读重跑 5/5 passed。

Java v153 + mini-kv v144：继续跳过。v349 没有 invalid-read-contract，因此不需要两边补字段。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v350：minimal read-only integration passed archive verification / transition decision。当前下一步。
   - 消费 Node v349 的 JSON/Markdown/summary/screenshot evidence。
   - 验证 5 个只读目标全部 passed，且 v349 route 没有启动上游、写上游或打开 managed audit。
   - 输出下一阶段 transition decision：进入 managed-audit-disabled read-only integration stage。
   - 不要求 Java / mini-kv 新版本。

2. 下一次真实联调窗口开始前，Java / mini-kv 应由各自项目窗口启动并给出端口/健康/只读命令结果。
   - Node 只消费它们的只读能力。
   - 如果 Java / mini-kv 没有启动，Node 不再自动启动它们，只归档 pending 或等待窗口。

3. Node v351：managed-audit-disabled read-only integration intake。
   - 只能定义 managed audit 仍 disabled 的只读 stage 输入。
   - 不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client。
   - 如果需要外部 managed audit sandbox credential 或真实 endpoint，必须暂停并让用户另行确认。
```

## 显式质量优化项

```text
Node：
- v350 优先消费 v349 evidence，不新增重复 smoke runner。
- 若要继续新增 report，先写必要性证明：解决哪个 blocker、谁消费、为什么不能复用 v349。
- 新增文件仍按 types / service / renderer / test 拆分；单文件接近 700 行前先拆 helper/catalog。
- 测试继续分批：focused -> 小组 -> build -> smoke，不一次性跑大批量测试。

Java：
- 当前不要求 Java 新版本；以后真实联调窗口由 Java 自己启动并回报 8080 health/ops overview 只读结果。

mini-kv：
- 当前不要求 mini-kv 新版本；以后真实联调窗口由 mini-kv 自己启动并回报 HEALTH/INFOJSON/STATSJSON 只读结果。
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
Node v349 已经证明三项目最小只读链路能跑通。下一步 Node v350 只做 passed evidence verification 和阶段切换决策，不再让 Java / mini-kv 为 connection-refused 或字段合同做无效补丁。
```
