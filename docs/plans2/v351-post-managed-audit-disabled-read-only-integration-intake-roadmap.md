# Node v351 衍生计划：managed-audit-disabled read-only integration intake 之后

来源版本：Node v351 `managed-audit-disabled read-only integration intake`。

计划状态：v350 衍生计划中的 Node v351 已完成 intake 合同、关闭边界和 HTTP/screenshot 归档后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v349：minimal read-only integration smoke rerun archive 已完成；真实只读重跑 5/5 passed。
Node v350：minimal read-only integration passed archive verification 已完成；transitionDecision=advance-to-managed-audit-disabled-read-only-integration-intake。
Node v351：managed-audit-disabled read-only integration intake 已完成；20/20 checks passed，intakeDecision=define-managed-audit-disabled-read-only-integration-stage。

Java v153 + mini-kv v144：继续跳过。v349-v351 都没有 invalid-read-contract，因此不要求两边补字段。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v352：managed-audit-disabled read-only integration intake archive verification。当前下一步。
   - 消费 Node v351 intake archive。
   - 验证 JSON/Markdown/summary/截图/解释/代码讲解/计划索引齐全。
   - 验证 3 个 intake inputs、7 个 closed scopes、20/20 checks 和 intake digest。
   - 不重新 live probe，不启动 Java / mini-kv，不连接 managed audit。

2. Node v353 或后续：
   - 如果 v352 只是 archive verification 通过，可以生成是否进入 sandbox handle review 的 decision record。
   - 如果需要真实 managed audit sandbox credential、真实 endpoint handle、secret provider、resolver client 或 runtime shell，必须暂停并让用户确认授权与输入范围。

3. Java / mini-kv：
   - 当前不要求新版本。
   - 只有 Node 后续发现 invalid-read-contract、缺必要只读字段，或用户明确要求两边补只读 evidence 时，才推荐并行 Java + mini-kv。
```

## 显式质量优化项

```text
Node：
- v352 只做 archive verification，不复制 v351 intake 业务逻辑。
- 新增 report 前继续写必要性证明：解决哪个 blocker、谁消费、为什么不能复用已有 report、何时停止。
- 新增文件继续按 types / service / renderer / test 拆分；单文件接近 700 行前先拆 helper/catalog。
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
Node v351 已把 v350 阶段切换决策固化为 managed-audit-disabled read-only integration intake。下一步 Node v352 应验证这份 intake archive，而不是抢跑 credential、endpoint、provider/client 或 runtime shell。
```
