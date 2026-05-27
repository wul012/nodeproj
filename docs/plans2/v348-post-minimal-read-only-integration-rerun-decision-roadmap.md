# Node v348 衍生计划：minimal read-only integration rerun decision 之后

来源版本：Node v348 `minimal read-only integration rerun decision`。

计划状态：v347 衍生计划中的 Node v348 已形成闭环后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v346：minimal read-only integration smoke rehearsal 已完成；真实只读探测五个目标，结果为 read-window-unavailable。
Node v347：minimal read-only integration smoke archive verification 已完成；确认这是外部服务窗口不可达，不是 invalid-read-contract。
Node v348：minimal read-only integration rerun decision 已完成；决策为 wait-for-external-read-window，不请求 Java v153 + mini-kv v144。
Node v349：minimal read-only integration smoke rerun archive 已完成；本轮授权启动 Java / mini-kv 后，真实只读重跑 5/5 passed。

Java v153 + mini-kv v144：当前继续跳过。只有后续出现 invalid-read-contract，才会重新请求并行只读字段补强。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. 外部操作窗口：用户或其他终端启动 Java + mini-kv 到本机只读联调环境。
   - 这不是 Node 自动化动作；Node 不启动、不停止、不构建、不测试、不修改 Java / mini-kv。
   - 如果无法确认两边已启动，Node 不重跑 live smoke，只归档 pending。

2. Node v349：minimal read-only integration smoke rerun or pending archive。已完成。
   - 如果用户明确说明 Java / mini-kv 已启动，则复用 v346 minimal read-only smoke lane 重跑。
   - 如果用户未确认服务已启动，则只生成 pending archive，不做无意义 connection-refused 重跑。
   - 如果重跑后仍是 read-window-unavailable，继续保留 external-window pending。
   - 如果重跑后是 invalid-read-contract，才推荐并行 Java v153 + mini-kv v144。
   - 实际结果为 all-read-passed，进入下一阶段 managed-audit-disabled read-only integration。

3. Node v350：minimal read-only integration passed archive verification / transition decision。下一步转入新计划：
   `docs/plans2/v349-post-minimal-read-only-integration-smoke-rerun-archive-roadmap.md`
```

## 显式质量优化项

```text
Node：
- v349 不复制 v346 runner；能复用现有 smoke rehearsal loader 就复用。
- 如果用户未确认外部窗口，v349 只做 pending archive，不启动 Java / mini-kv。
- 新增文件继续按 types / service / renderer / test 拆分；单文件接近 700 行前先拆 helper/catalog。
- 不跑一次性大测试；先 focused，再 v346-v349 小组测试，再 build/smoke。

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
Node v349 已在授权外部窗口中完成真实只读重跑并归档 all-read-passed。下一步转入 v349 衍生计划，由 Node v350 验证 passed evidence 并做阶段切换决策。
```
