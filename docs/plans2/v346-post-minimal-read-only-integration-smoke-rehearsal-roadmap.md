# Node v346 衍生计划：minimal read-only integration smoke rehearsal 之后

来源版本：Node v346 `minimal read-only integration smoke rehearsal`。

计划状态：v345 衍生计划中的 Node v346 已形成闭环后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v345：minimal read-only integration window readiness cut 已完成；现有 Node client 已覆盖 Java GET health/ops overview 与 mini-kv HEALTH/INFOJSON/STATSJSON。
Node v346：minimal read-only integration smoke rehearsal 已完成；只读探测五个目标，不启动、不停止、不构建、不测试、不修改 Java / mini-kv。
Node v347：minimal read-only integration smoke archive verification 已完成；归档结果为 read-window-unavailable，不请求 Java v153 / mini-kv v144。

Java v153 + mini-kv v144：是否需要取决于 Node v346 的 smokeState。若只是 read-window-unavailable，不需要补代码；若是 invalid-read-contract，才需要并行补只读字段。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v347：minimal read-only integration smoke archive verification。已完成。
   - 消费 Node v346 的 JSON/Markdown/smoke summary/截图/讲解。
   - 明确归档结果：all-read-passed、read-window-unavailable、invalid-read-contract。
   - 如果 v346 是 read-window-unavailable，只记录需要用户/外部窗口启动 Java / mini-kv 后重试，不要求 Java / mini-kv 改代码。
   - 如果 v346 是 invalid-read-contract，才推荐并行 Java v153 + mini-kv v144 补只读字段。

2. 推荐并行：Java v153 + mini-kv v144（已由 Node v347 判定可跳过）。
   - Java v153：只补 Java health/ops overview 缺少的只读字段；不写 ledger/schema/SQL。
   - mini-kv v144：只补 HEALTH/INFOJSON/STATSJSON 缺少的只读字段；不执行 write/admin。
   - Node v347 证明 v346 是 read-window-unavailable，不是 invalid-read-contract，因此这组并行版本跳过。

3. Node v348：minimal read-only integration rerun decision。当前下一步。
   - 如果 v347 归档为 all-read-passed，可以准备下一阶段 managed audit 仍禁用的只读 rehearsal。
   - 如果 v347 归档为 read-window-unavailable，等待用户启动 Java / mini-kv 后再重跑 v346 lane。
   - 如果 v347 归档为 invalid-read-contract，等待 Java v153 + mini-kv v144 后再重跑。
```

## 显式质量优化项

```text
Node：
- v347 只做归档验证，不再重新探测上游。
- v347 不复制 v346 的 live-probe runner，只读取归档文件和 smoke summary。
- v347 新增文件继续按 types / service / renderer / test 拆分；不要新增 700+ 行单文件。
- 不跑一次性大测试；先 focused，再小块组合验证。

Java：
- 只有 Node v347 归档结论为 invalid-read-contract 时，才推荐 Java v153。

mini-kv：
- 只有 Node v347 归档结论为 invalid-read-contract 时，才推荐 mini-kv v144。
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
Node v346 已把最小只读联调推进到真实探测证据；Node v347 已归档验证该证据为 read-window-unavailable。下一步 Node v348 做 rerun decision，等待用户或外部窗口启动 Java / mini-kv 后再重跑。
```
