# Node v305 衍生计划：stop/prerequisite upstream echo verification 之后

来源版本：Node v305 `runtime shell chain stop/prerequisite upstream echo verification`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v303-post-decision-plan-intake-upstream-echo-roadmap.md` 已完成 Node v303、Node v304、推荐并行 Java v141 + mini-kv v134、Node v305；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v303：post-decision plan intake upstream echo verification 已完成。
Node v304：runtime shell chain stop-or-prerequisite decision record 已完成；6 个显式审批前置仍 documented-missing，8 个 no-go condition 仍生效。
Java v141：runtime shell stop/prerequisite decision echo 已完成；只读回显 Node v304，不写 ledger、不执行 SQL、不调用外部 managed audit。
mini-kv v134：runtime shell stop/prerequisite non-participation receipt 已完成；只读回显 Node v304，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 authority。
Node v305：stop/prerequisite upstream echo verification 已完成；三方对 blocked prerequisite decision 对齐。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v306：approval prerequisite artifact intake plan。
   - 这是 Node 串行版本，不能和 Node v305 并行。
   - 目标不是继续 echo，而是把 v304 的 6 个 documented-missing prerequisites 收束为一个“approval prerequisite artifact”输入契约。
   - 只定义 artifact schema / required fields / rejection reasons / no-go boundary。
   - 不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP，不实现 runtime shell。
   - 必须写明：哪个 blocker 被推进、谁消费、为什么不能复用 v305、何时停止。

2. 推荐并行：Java v142 + mini-kv v135。
   - 只有 Node v306 完成后才推进。
   - Java v142：只读 echo Node v306 的 approval prerequisite artifact intake；不写 ledger、不执行 SQL、不调用外部 managed audit。
   - mini-kv v135：只读 non-participation receipt；不执行 LOAD、COMPACT、RESTORE、SETNXEX，不承载 audit/order 权威状态。
   - 两者互不依赖，可以并行。

3. Node v307：approval prerequisite artifact upstream echo verification。
   - 只有 Java v142 + mini-kv v135 都完成后才推进。
   - 消费两边只读 echo，确认三方对 approval prerequisite artifact intake 一致。
   - 不实现 runtime shell。
```

## 显式质量优化项

```text
Node：
- 不再新增无新 artifact/consumer 的 echo；v305 已经验证 Java v141 + mini-kv v134。
- v306 必须围绕 approval prerequisite artifact intake，而不是继续重复 stop/prerequisite summary。
- 新 service 继续拆成 types / renderer / service / test；若单文件明显膨胀，先拆分再新增功能。
- 单版/单提交目标小于 3000 changed lines；超过时拆版本或拆提交。
- 历史上游证据继续冻结最小必要文件，保证 GitHub runner fallback。

Java：
- Java v142 如被 Node v306 请求，只做只读 echo，可顺手延续 catalog/template 化，但不要把大型重构和 echo 混成一个不可审计版本。

mini-kv：
- mini-kv v135 如被 Node v306 请求，只做只读 non-participation receipt；不新增写命令，不做恢复/compact，不承载权威状态。

并行规则：
- 同一项目内部版本必须串行。
- Java v142 与 mini-kv v135 如被 Node v306 请求，互不依赖，推荐并行。
- Node v307 必须等待 Java v142 + mini-kv v135 完成，不能抢跑。
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
- Node v306 未完成时，Java v142 / mini-kv v135 不应按本计划抢跑。

## 一句话结论

```text
v305 已完成 stop/prerequisite 三方对齐；下一步如果继续推进，不能再做空转 echo，应先由 Node v306 定义 approval prerequisite artifact intake，再推荐并行 Java v142 + mini-kv v135 只读回显。
```
