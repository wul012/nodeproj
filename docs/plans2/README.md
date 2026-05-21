# OrderOps Node 计划文档目录 2

`docs/plans2/` 是 `docs/plans/` 的同级续写目录，用来承接当前阶段之后的新计划，避免旧目录继续膨胀。

## 当前唯一有效入口

```text
docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md
```

## 当前状态

```text
Node v287：test-only fake resolver harness precheck 已完成，只做边界预检，不做真实 fake harness 执行。
Node v288：disabled fake harness contract 已完成；只定义合同，不提供可执行 fake harness runtime。
Node v289：disabled fake harness contract upstream echo verification 已完成；已消费 Java v122-v126 + mini-kv v127。
Node v290：disabled fake harness execution-denied route preflight 已完成；已消费 Node v289。
Java v127-v130：质量止血队列已完成；这是 Java 结构/测试/catalog 证据，不是 execution-denied echo。
mini-kv v128：execution-denied non-participation receipt 已完成；只读回显 Node v290 preflight。
Node v291：execution-denied upstream echo verification 已完成；已消费 Node v290 + Java v127-v130 + mini-kv v128，因 Java 缺 direct execution-denied echo 而按设计 blocked。
Node v292：fake harness readiness decision record 已完成；decision record 可归档，但 readiness decision 仍 blocked。
Java v121：implementation plan echo 已完成。
mini-kv v126：implementation plan non-participation receipt 已完成。
Java v122-v126：Integration Tests 四连拆 + EvidenceService catalog 化止血已完成。
mini-kv v127：disabled fake harness non-participation receipt 已完成。
三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐顺序与并行点

```text
Node v290：disabled fake harness execution-denied route preflight。已完成。
推荐并行：Java v127 + mini-kv v128。
Java v128：ResponseRecords 二拆。已完成。
Java v129：OverviewTests 二拆。已完成。
Java v130：echo catalog 延伸。已完成。
Node v291：execution-denied upstream echo verification。已完成，blocked 是预期结果。
Node v292：credential resolver fake harness readiness decision record。已完成，旧计划收口。
推荐并行：Java v131 + mini-kv v129。
Node v293：fake harness readiness blocked decision upstream echo verification。
Node v294：disabled runtime shell pre-plan intake。
```

## 质量收口

```text
- Node v290 仍要拆成 types / renderer / service / test，避免新建 700+ 行 service。
- Node v290 已完成，后续只读引用其 route preflight 结果即可。
- 消费历史版本时优先使用 sibling receipt 中固化的 source snapshot，避免后续代码重算旧 gate 造成 digest 漂移。
- Node v293 起新增 echo/governance 链必须先写必要性证明：解决哪个 blocker、谁消费、为什么不能复用已有 report、何时停止继续延伸。
- Node v293 起单版/单提交目标小于 3000 changed lines；超过时拆版本或拆提交，避免一版混入功能、重构、文档、截图。
- Node 后续 echo 段优先 catalog 化，借鉴 Java v126/v130 模式，避免第 8、9 段 echo 复制成 3000 行级别。
- Java v127-v130 优先做质量止血和 catalog 延伸，不做真实 fake harness。
- Java 后续 echo builder 可继续 catalog/template 化，把剩余 600+ builder 收进统一模式。
- mini-kv v128 只做 non-participation receipt，不执行 LOAD/COMPACT/RESTORE/SETNXEX。
- 同一项目内部版本仍按原子串行推进；只有 Java 与 mini-kv、或 Node 与其他项目互不依赖时，才写推荐并行。
- 未来新增计划优先写入 docs/plans2/，不要回灌旧的 docs/plans/；一个计划版本做完后另起续写，不要无限追加。
- 代码讲解继续写入 代码讲解记录_生产雏形阶段2/，截图和解释继续放 d/<版本>/。
```
