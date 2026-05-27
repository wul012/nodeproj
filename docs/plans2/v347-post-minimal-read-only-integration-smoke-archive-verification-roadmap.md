# Node v347 衍生计划：minimal read-only integration smoke archive verification 之后

来源版本：Node v347 `minimal read-only integration smoke archive verification`。

计划状态：v346 衍生计划中的 Node v347 已形成闭环后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v345：minimal read-only integration window readiness cut 已完成；现有 Node client 覆盖 Java GET health/ops overview 与 mini-kv HEALTH/INFOJSON/STATSJSON。
Node v346：minimal read-only integration smoke rehearsal 已完成；真实只读探测五个目标，但当前外部窗口未启动 Java / mini-kv，结果是 read-window-unavailable。
Node v347：minimal read-only integration smoke archive verification 已完成；验证 v346 归档完整，并确认不需要 Java v153 + mini-kv v144 改只读字段。

Java v153 + mini-kv v144：已由 Node v347 判定跳过。v346 不是 invalid-read-contract，而是 connection-refused/read-window-unavailable。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v348：minimal read-only integration rerun decision。已完成。
   - 消费 Node v347 archive verification。
   - 固化 rerun decision：等待用户或外部窗口启动 Java / mini-kv 后，才重跑 v346 minimal read-only smoke lane。
   - 继续明确：read-window-unavailable 不是 Java / mini-kv contract 缺陷。
   - 不重新 live probe，不启动 Java / mini-kv，不新增上游字段要求。

2. 外部操作窗口：启动 Java + mini-kv 到本机只读联调环境。
   - 这不是 Node 版本，也不是 Java/mini-kv 代码版本。
   - 只是在用户确认的窗口内启动现有服务，供后续 Node 重新探测。
   - 如果启动窗口不可用，Node 后续继续停在 rerun pending，不抢跑真实 managed audit。

3. Node v349：minimal read-only integration smoke rerun 或 rerun pending archive。当前下一步。
   - 如果外部窗口可用，重跑 v346 lane，生成新的只读联调证据。
   - 如果外部窗口仍不可用，只归档 pending 状态，不请求 Java/mini-kv 无效改代码。
   - 只有出现 invalid-read-contract，才推荐并行 Java v153 + mini-kv v144。
```

## 显式质量优化项

```text
Node：
- v348 只做 decision record，不复制 v346 runner 或 v347 archive verifier。
- v348 新增文件继续按 types / service / renderer / test 拆分；若预计超过 700 行，先拆 catalog/helper。
- 不跑一次性大测试；先 focused，再 v346-v348 小组测试，再 build/smoke。
- HTTP smoke 只访问 Node 自己的 v348 route，不探测 Java/mini-kv。

Java：
- 当前无需 Java v153；只有 Node 后续发现 invalid-read-contract 时才重新提出。

mini-kv：
- 当前无需 mini-kv v144；只有 Node 后续发现 invalid-read-contract 时才重新提出。
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
Node v347 已证明 v346 的最小只读联调失败原因是外部窗口不可达，不是上游 contract 缺陷。Node v348 已固化 rerun decision 为 wait-for-external-read-window；下一步 Node v349 只有在用户启动 Java / mini-kv 后才重跑，否则只归档 pending。
```
