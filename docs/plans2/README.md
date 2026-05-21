# OrderOps Node 计划文档目录 2

`docs/plans2/` 是 `docs/plans/` 的同级续写目录，用来承接当前阶段之后的新计划，避免旧目录继续膨胀。

## 当前唯一有效入口

```text
docs/plans2/v287-post-test-only-fake-harness-precheck-roadmap.md
```

## 当前状态

```text
Node v287：test-only fake resolver harness precheck 已完成，只做边界预检，不做真实 fake harness 执行。
Node v288：disabled fake harness contract 待推进。
Java v121：implementation plan echo 已完成。
mini-kv v126：implementation plan non-participation receipt 已完成。
三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐顺序与并行点

```text
Node v288：disabled fake harness contract。
推荐并行：Java v122 + mini-kv v127。
Java v123：Integration Tests 第 2 连拆，接续 Java v122。
Java v124：Integration Tests 第 3 连拆，接续 Java v123。
Java v125：Integration Tests 第 4 连拆，接续 Java v124。
Java v126：EvidenceService catalog 化止血。
Node v289：disabled fake harness contract upstream echo verification，消费 Java v122-v126 + mini-kv v127 之后再推进。
```

## 质量收口

```text
- Node v287 必须保持 precheck only，不把 fake harness 变成可运行入口。
- Java integration tests 的 4 连拆要保留共享 fixture / helper，不要把 harness 再写胖。
- Java EvidenceService catalog 化只抽共享 catalog/template，不要制造新的大文件。
- 同一项目内部版本仍按原子串行推进；只有 Java 与 mini-kv、或 Node 与其他项目互不依赖时，才写推荐并行。
- 未来新增计划优先写入 docs/plans2/，不要回灌旧的 docs/plans/。
- 代码讲解继续写入 代码讲解记录_生产雏形阶段2/，截图和解释继续放 d/<版本>/。
```
