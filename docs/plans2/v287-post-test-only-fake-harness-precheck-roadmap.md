# Node v287 衍生计划：test-only fake harness precheck 之后的下一波收口

来源版本：Node v287 `test-only fake resolver harness precheck`。

计划状态：当前唯一有效全局计划。上一份 `docs/plans2/v282-post-upstream-echo-verification-roadmap.md` 已完成 Node v286、Node v287，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v287：test-only fake resolver harness precheck 已完成；只做 precheck，不提供真实 fake harness 执行入口。
Node v286：resolver implementation plan upstream echo verification 已完成；已消费 Java v121 + mini-kv v126，并补 forced historical fixture fallback。
Java v121：implementation plan echo 已完成。
mini-kv v126：implementation plan non-participation receipt 已完成。
三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v288：disabled fake harness contract。已完成。
   - 只定义 disabled fake harness 的合同，不把它变成可运行入口。
   - 继续保持 credential handle / endpoint handle 边界，不读 credential value，不解析 raw endpoint。
   - 已输出 Java v122 + mini-kv v127 推荐并行要求；Node v289 必须等待两侧证据。

2. 推荐并行：Java v122 + mini-kv v127。
   - Java v122：Integration Tests 第 1 连拆。
   - mini-kv v127：disabled fake harness non-participation receipt。
   - 并行理由：两边写入不同仓库；Java 做测试拆分，mini-kv 做只读非参与回执，互不依赖。
   - 若任一侧需要真实 credential、raw endpoint、写命令或外部连接，则停止并拆回串行确认。

3. Java v123：Integration Tests 第 2 连拆。
   - 接续 Java v122；Java 单项目版本按原子顺序推进，不写 Java v123 + v124 并行。
   - 保留共享 fixture / helper，不把 harness 再写胖。

4. Java v124：Integration Tests 第 3 连拆。
   - 继续顺序拆，避免同一仓库同一测试基座并行冲突。

5. Java v125：Integration Tests 第 4 连拆。
   - Integration Tests 四连拆收口，保留测试行为不变。

6. Java v126：EvidenceService catalog 化止血。
   - 抽共享 catalog / template，统一 echo support、boundary code、required artifact、blocked side-effect。
   - 只做止血型重构，不改业务语义，不引入新的大文件。

7. Node v289：disabled fake harness contract upstream echo verification。
   - 已完成。
   - 已消费 Java v122-v126 的只读结果，验证 disabled fake harness contract 仍保持关闭状态。
   - 已消费 mini-kv v127 non-participation receipt，避免三项目对齐少一侧。
   - 已补 forced historical fixture fallback，确保 GitHub runner 没有本机兄弟仓库时仍能验证。
   - 仍不读取 credential value，不建立真实连接，不写 ledger。
```

## 显式质量优化项

```text
Node：
- v288 已完成 disabled fake harness contract；仍没有可执行 fake harness runtime。
- Node v289 必须先消费 Java v122-v126 与 mini-kv v127 的只读输入，再推进。

Java：
- Integration Tests 4 连拆应按 v122 -> v125 顺序推进；单项目版本是原子，不写同一项目内部并行。
- EvidenceService catalog 化要把 source profile、check id、boundary code、required artifact、blocked side-effect 统一收口。
- 这波是止血，不是架构重写。

mini-kv：
- mini-kv v127 需要作为三项目对齐的一侧输入；只做 non-participation / read-only receipt。
- 不能因为 Java 侧质量拆分较多就漏掉 mini-kv 对齐。

并行规则：
- 同一项目内部版本必须串行。
- 跨项目且写入不同仓库、职责域互不依赖时，可以写“推荐并行”。
- 当前明确可并行的是 Java v122 + mini-kv v127；Java v123-v126 仍是 Java 内部串行。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider 或真实 credential resolver client。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
v287 已把 test-only fake harness 的边界预检闭环；Node v288 已完成 disabled fake harness contract；Java v122-v126 与 mini-kv v127 已完成；Node v289 已完成三项目只读 upstream echo verification。下一步转入 `docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md`，不再向本文件追加重合版本。
```
