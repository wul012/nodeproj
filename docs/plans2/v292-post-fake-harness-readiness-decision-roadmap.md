# Node v292 衍生计划：fake harness readiness decision 之后

来源版本：Node v292 `credential resolver fake harness readiness decision record`。

计划状态：已完成并收口。上一份 `docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md` 已完成 Node v290、Java v127-v130、mini-kv v128、Node v291、Node v292；本计划已完成 Node v293、Node v294、Node v295。后续转入 `docs/plans2/v295-post-disabled-runtime-shell-design-review-roadmap.md`，不再向本计划追加重合版本。

## 当前对齐状态

```text
Node v287：test-only fake resolver harness precheck 已完成。
Node v288：disabled fake harness contract 已完成；只定义合同，不提供 runtime。
Node v289：disabled fake harness contract upstream echo verification 已完成。
Node v290：disabled fake harness execution-denied route preflight 已完成。
Java v127-v130：质量止血队列已完成；这是结构/测试/catalog 证据，不是 direct execution-denied echo。
mini-kv v128：execution-denied non-participation receipt 已完成；只读回显 Node v290 preflight。
Node v291：execution-denied upstream echo verification 已完成；blocked，原因是 Java direct execution-denied echo 缺失。
Node v292：fake harness readiness decision record 已完成；decision record 可归档，但 readiness decision 仍 blocked。
Java 侧这轮质量优化已完成；后续 Node 不再等待 Java 的这轮止血/收口落地，只消费已归档的质量证据。
Java v131：direct execution-denied echo receipt 已完成；补齐 Node v292 记录的 Java direct echo 缺口，但不打开 fake harness runtime。
mini-kv v129：receipt verification/retention check 已完成；只读保留 v128 receipt 并声明可供 Node v293 消费。
Node v293：fake harness readiness blocked decision upstream echo verification 已完成；三方 blocked decision 已对齐，runtime shell 仍不解锁。
Node v294：disabled runtime shell pre-plan intake 已完成；只定义 shell 命名、边界、开关策略、测试策略和暂停条件，不实现 runtime。
Node v295：disabled runtime shell design review 已完成；只做设计审查，结论是推荐并行 Java v132 + mini-kv v130，Node v296 必须等待两边 echo。
三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## v292 后评估：可借鉴处

```text
结论：截图中的建议合理，且应写成后续版本约束，而不是只作为口头评价。

Node 可借鉴：
- echo 段必须开始 catalog 化。后续如果继续增加第 8、9 段 echo / governance 验证，不应再复制一整套 1000+ 行 service + renderer + test；优先抽取 required evidence、no-go checks、production blockers、markdown section 的 catalog builder。
- 单个 Node 版本/提交目标控制在 3000 changed lines 以内；如果预估超过 3000 行，必须拆成 2-3 个小版本或多个提交，避免一版同时做功能、重构、文档、截图。
- 新增 echo/governance 链必须先写“必要性证明”：它解决哪个 blocker、谁消费它、为什么不能复用已有 report、什么时候可以停止继续延伸。

Java 可借鉴：
- Java v126/v130 的 catalog 模式对 Node 有参考价值。
- Java 后续如果继续扩展 echo builder，应优先把剩余 600+ builder 收进 catalog/template，而不是继续增加平行大文件。

三项目共同约束：
- 不再用“多一个 echo 就多一组大文件”的方式推进。
- 大型测试拆分可以做，但单项目内部仍串行；Java / mini-kv / Node 只有互不依赖时才写推荐并行。
- 关注总代码量增长：新增治理链必须证明实际生产推进价值，不能只为了版本推进而扩张 contract/fixture/report。
```

## 推荐执行顺序

```text
1. Java 侧质量优化、Java v131 direct echo、mini-kv v129 receipt retention 均已完成。
   - Java 侧已完成，不再作为 Node v293 的阻塞项；Node 直接消费已归档的 Java 质量证据。
   - mini-kv v129：v128 receipt verification/retention check，只做 receipt 自检与历史 fixture 友好化，不执行 LOAD/COMPACT/RESTORE/SETNXEX。
   - Node v293 已消费 Java v131 + mini-kv v129，并补入 historical fixture，保证 CI runner 不依赖 sibling workspace。

2. Node v293：fake harness readiness blocked decision upstream echo verification。已完成。
   - 消费 Java 侧已完成的质量证据 + mini-kv v129。
   - 验证三方 blocked decision 一致性。
   - 结论是 upstream echo verification ready，但 disabled runtime shell planning 仍为 false。
   - 本版未实例化 provider/client、未读取 credential、未解析 raw endpoint、未发送 HTTP/TCP、未写 ledger/schema、未自动启动上游。

3. Node v294：disabled runtime shell pre-plan intake。
   - 已完成。
   - 只有在 Node v293 三方 blocked decision 对齐后推进。
   - 仍不实现 runtime，只列 runtime shell 前置边界、命名、开关、测试策略和暂停条件。
   - 继续使用小文件四件套；如果预估超过 3000 changed lines，先拆 catalog/helper，再写 intake report。

4. Node v295：disabled runtime shell design review 或 upstream echo。
   - 已完成。
   - 只消费 Node v294，不直接实现 runtime shell。
   - 结论是需要跨项目回显，因此另起后继计划，推荐并行 Java v132 + mini-kv v130。
   - Node v296 必须等待 Java v132 + mini-kv v130 完成，不能抢跑 runtime shell implementation。
```

## 显式质量优化项

```text
Node：
- v293 继续使用 types / renderer / service / test 四件套。
- 不新增重复 route querystring/markdown 分支，继续通过 auditJsonMarkdownRoute 注册。
- v293 不要新建大文件；若服务超过约 700 行，优先抽 requiredEvidence/noGo/check builder。
- v293 起新增 echo/governance report 必须附带必要性证明：blocker、consumer、不能复用原因、停止条件。
- v293 起单版/单提交目标小于 3000 changed lines；超过时先拆版本或拆提交。
- v293 起 echo 段优先 catalog 化，借鉴 Java v126/v130 的 catalog 模式，避免第 8、9 段 echo 复制成 3000 行级别。
- v294 不得直接实现 fake harness runtime；只做 disabled runtime shell pre-plan intake。
- v294 必须继续证明 runtime、credential、endpoint、network、ledger、schema、auto-start 七类边界仍关闭。
- v295 不得跳过 design review 直接创建 runtime shell class / provider / client。
- v295 已完成 design review；推荐并行 Java v132 + mini-kv v130；同一项目内部仍串行。
- v296 必须消费 Java v132 + mini-kv v130，继续不实现 runtime shell。

Java：
- Java 这轮质量优化已完成；后续若再做 catalog/template 收口，另起 Java 新版本，不要回流到 Node v293。
- Java 后续 echo builder 可继续 catalog/template 化，把剩余 600+ builder 纳入统一模式；这是 Java 自己的质量优化，不阻塞 Node v293。

mini-kv：
- mini-kv v129 已完成 receipt verification/retention；不新增写命令、不做恢复/compact、不成为 audit/order 权威存储。

并行规则：
- 同一项目内部版本必须串行。
- Java 这轮质量优化已完成；后续若再做 catalog/template 收口，另起 Java 新版本，不再作为 Node v293 的阻塞项。
- Node v295 已完成；下一步推荐并行 Java v132 + mini-kv v130。
- Node v296 必须等待 Java v132 + mini-kv v130 完成，不能抢跑 runtime shell implementation。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider、真实 resolver client、fake secret provider 或 fake resolver client。
- 需要 Node 实现或调用 fake harness runtime。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
v295 已完成 disabled runtime shell design review：下一步不是 Node 抢跑 runtime，而是推荐并行 Java v132 + mini-kv v130；两边完成后 Node v296 再消费。
```
