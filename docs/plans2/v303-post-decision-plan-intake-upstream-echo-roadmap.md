# Node v303 衍生计划：post-decision plan intake upstream echo verification 之后

来源版本：Node v303 `post-decision plan intake upstream echo verification`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v300-post-runtime-shell-decision-record-upstream-echo-roadmap.md` 已完成 Node v301、Java v136、mini-kv v133、Node v302、Node v303；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v301：post-decision continuation plan intake 已完成；选择 continue-blocked-planning，但不实现 runtime shell。
Java v136：post-decision plan intake echo 已完成；只读回显 Node v301，并保留 legacy Node v302 consumer marker。
mini-kv v133：post-decision plan intake non-participation receipt 已完成；只确认 mini-kv 不参与 runtime shell implementation/invocation。
Node v302：echo segment catalog quality pass 已完成；只做 Node 质量优化，不消费 Java v136 / mini-kv v133。
Node v303：post-decision plan intake upstream echo verification 已完成；三方对 v301 的计划入口已对齐，legacy Node v302 marker 已作为历史兼容证据处理。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v303：post-decision plan intake upstream echo verification。已完成。
   - 消费 Node v301 + Node v302 + Java v136 + mini-kv v133。
   - 只验证三方对 v301 plan intake 一致。
   - 接受 Java/mini-kv 的 legacy Node v302 marker，但实际消费版本以 Node v303 为准。
   - 仍不做 runtime shell implementation，不实例化 provider/client，不读取 credential，不解析 raw endpoint，不发 HTTP/TCP。

2. Node v304：runtime shell chain stop-or-prerequisite decision record。
   - 已完成。
   - 这是 Node 串行版本，不能和 Node v303 并行。
   - 目标不是继续加 echo，而是把链条收束为二选一判断：暂停 runtime shell chain，或列出后续必须补齐的显式审批前置。
   - 必须写明：继续推进会解决哪个 blocker、谁消费、为什么不能复用 v303、何时停止。
   - 默认仍选择 blocked / no runtime implementation。

3. 推荐并行：Java v141 + mini-kv v134。
   - Node v304 已明确需要上游只读确认；当前可以并行推进。
   - Java v141：只读 echo Node v304 的 stop/prerequisite decision；不写 ledger、不执行 SQL、不调用外部 managed audit。
   - mini-kv v134：只读 non-participation receipt；不执行 LOAD、COMPACT、RESTORE、SETNXEX，不承载 audit/order 权威状态。
   - 两者互不依赖，可以并行。

4. Node v305：stop/prerequisite upstream echo verification。
   - 只有 Java v141 + mini-kv v134 都完成后才推进。
   - 消费两边只读 echo，确认三方对 runtime shell chain 是否停止或转入审批前置的一致性。
   - 不实现 runtime shell。
```

## 显式质量优化项

```text
Node：
- v303 已完成三方 echo verification；不要再无理由新增第 4 层 echo。
- v304 已完成收束/决策版本，不是常规 summary，也没有实现 runtime shell。
- 新 service 继续拆成 types / renderer / service / test；若单文件明显膨胀，先拆分再新增功能。
- 单版/单提交目标小于 3000 changed lines；超过时拆版本或拆提交。
- 历史上游证据继续冻结最小必要文件，保证 GitHub runner fallback。

Java：
- Java v136 已完成；v137-v140 是质量优化，不是新的 runtime shell 上游依赖。
- Node v304 已请求 Java v141；Java 只做只读 echo，可顺手延续 catalog/template 化，但不要把大型重构和 echo 混成一个不可审计版本。

mini-kv：
- mini-kv v133 已完成；当前仍是 evidence provider / non-participation receipt，不成为 runtime shell 或 audit storage。
- Node v304 已请求 mini-kv v134；mini-kv 只做只读 non-participation receipt；不新增写命令，不做恢复/compact，不承载权威状态。

并行规则：
- 同一项目内部版本必须串行。
- Java v141 与 mini-kv v134 如被 Node v304 请求，互不依赖，推荐并行。
- Node v305 必须等待 Java v141 + mini-kv v134 完成，不能抢跑。
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
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Node v304 已说明新 blocker、consumer、停止条件；Java v141 / mini-kv v134 未完成时，Node v305 必须停止。

## 一句话结论

```text
v303 已完成 post-decision plan intake 三方对齐；v304 已做 stop-or-prerequisite decision record，把 runtime shell 链条收束为“显式审批前置未满足，继续 blocked”。下一步推荐并行 Java v141 + mini-kv v134，只读回显 v304。
```
