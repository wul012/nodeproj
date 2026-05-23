# OrderOps Node 计划文档目录 2

`docs/plans2/` 是 `docs/plans/` 的同级续写目录，用来承接当前阶段之后的新计划，避免旧目录继续膨胀。

## 当前唯一有效入口

```text
docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md
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
Java 这轮质量优化已完成，后续 Node 不再等待这轮止血/收口落地，只消费已归档的 Java 质量证据。
Java v131：direct execution-denied echo receipt 已完成；补齐 Node v292 记录的 Java direct echo 缺口。
mini-kv v129：receipt verification/retention check 已完成；可供 Node v293 消费。
Node v293：fake harness readiness blocked decision upstream echo verification 已完成；三方 blocked decision 已对齐，但 runtime shell 仍未解锁。
Node v294：disabled runtime shell pre-plan intake 已完成；只定义边界，不实现 runtime。
Node v295：disabled runtime shell design review 已完成；结论是先推荐并行 Java v132 + mini-kv v130，再由 Node v296 消费。
Java v132：质量优化已完成，不是 disabled runtime shell handoff echo。
Java v133：disabled runtime shell handoff echo 已完成，是 Node v296 的实际 Java 上游证据。
mini-kv v130：disabled runtime shell non-participation receipt 已完成。
Node v296：disabled runtime shell upstream echo verification 已完成；已修正 Java v132/v133 计划偏差，下一步是 Node v297 candidate gate。
Node v297：disabled runtime shell implementation candidate gate 已完成；下一步是推荐并行 Java v134 + mini-kv v131。
Java v134：runtime shell candidate gate echo 已完成；只读回显 Node v297 blocked candidate gate。
mini-kv v131：runtime shell candidate gate non-participation receipt 已完成；只读确认 mini-kv 不参与 runtime shell candidate。
Node v298：runtime shell candidate gate upstream echo verification 已完成；已消费 Java v134 + mini-kv v131，三方 blocked gate 对齐。
Node v299：runtime shell candidate gate decision record 已完成；只记录 blocked decision，不新增 runtime implementation。
Java v135：runtime shell decision record echo 已完成；只读回显 Node v299 blocked decision record。
mini-kv v132：runtime shell decision record non-participation receipt 已完成；只确认 mini-kv 不参与 runtime shell implementation/invocation。
Node v300：runtime shell decision record upstream echo verification 已完成；已消费 Node v299 + Java v135 + mini-kv v132，三方 blocked decision record 已对齐。
Node v301：post-decision continuation plan intake 已完成；只做继续 blocked planning 的必要性证明，不实现 runtime shell。
Java v136：post-decision plan intake echo 已完成；只读回显 Node v301，保留 legacy Node v302 consumer marker。
mini-kv v133：post-decision plan intake non-participation receipt 已完成；只确认 mini-kv 不参与 runtime shell implementation/invocation。
Node v302：echo segment catalog quality pass 已完成；只做 Node 质量优化，不消费两边新证据。
Node v303：post-decision plan intake upstream echo verification 已完成；已消费 Node v301 + Node v302 + Java v136 + mini-kv v133。
Node v304：runtime shell chain stop-or-prerequisite decision record 已完成；显式审批前置仍缺失，继续 blocked，不实现 runtime shell。
Java v141：runtime shell stop/prerequisite decision echo 已完成；只读回显 Node v304。
mini-kv v134：runtime shell stop/prerequisite non-participation receipt 已完成；只读回显 Node v304，不参与 runtime shell。
Node v305：runtime shell chain stop/prerequisite upstream echo verification 已完成；三方 blocked prerequisite decision 已对齐。
Node v306：approval prerequisite artifact intake plan 已完成；已定义非 secret artifact 输入契约，不实现 runtime shell。
Java v142：approval prerequisite artifact intake echo 已完成；只读回显 Node v306。
mini-kv v135：approval prerequisite artifact intake non-participation receipt 已完成；只读回显 Node v306。
Node v307：approval prerequisite artifact upstream echo verification 已完成；三方对 Node v306 artifact contract 已对齐。
Node v308：human approval artifact review packet 已完成；定义人工 approval artifact review packet contract。
Java v143：human approval artifact review packet echo 已完成；只读回显 Node v308。
mini-kv v136：human approval artifact review non-participation receipt 已完成；只读回显 Node v308。
Node v309：human approval artifact review upstream echo verification 已完成；三方对 Node v308 review packet contract 已对齐。
Node v310：human approval artifact review post-echo decision gate 已完成；请求 Java v144 + mini-kv v137 并行只读 echo。
Java v144：human approval artifact review post-echo decision gate echo 已完成；只读回显 Node v310。
mini-kv v137：human approval artifact review post-echo decision gate non-participation receipt 已完成；只读回显 Node v310。
Node v311：human approval artifact review post-echo decision upstream echo verification 已完成；三方对 v310 decision gate 已对齐。
Node v312：human approval artifact review governance stop/prerequisite closure decision 已完成；只关闭 java-mini-kv-decision-echo，剩余 5 个 prerequisite 继续缺失，governance 链暂停。
Node v313：human approval post-echo prerequisite catalog cleanup 已完成；只做 Node 质量优化，把 v310/v312 prerequisite 定义收进同一 catalog。
Node v314：signed human approval artifact contract intake 已完成；只定义 signed-human-approval-artifact 的非 secret contract，不关闭其余 4 个 prerequisite，不实现 runtime shell。
当前有效计划已切换到 docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md；下一步是推荐并行 Java v145 + mini-kv v138。
三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐顺序与并行点

```text
Node v290：disabled fake harness execution-denied route preflight。已完成。
Java 侧质量优化已完成，mini-kv v128 作为已完成历史证据继续保留。
Java v128：ResponseRecords 二拆。已完成。
Java v129：OverviewTests 二拆。已完成。
Java v130：echo catalog 延伸。已完成。
Node v291：execution-denied upstream echo verification。已完成，blocked 是预期结果。
Node v292：credential resolver fake harness readiness decision record。已完成，旧计划收口。
mini-kv v129：receipt verification/retention 收口。已完成。
Node v293：fake harness readiness blocked decision upstream echo verification。已完成。
Node v294：disabled runtime shell pre-plan intake。已完成。
Node v295：disabled runtime shell design review。已完成。
推荐并行：Java v133 + mini-kv v130。已完成；原计划 Java v132 已修正为 Java v133。
Node v296：disabled runtime shell upstream echo verification。已完成。
Node v297：disabled runtime shell implementation candidate gate。已完成。
推荐并行：Java v134 + mini-kv v131。已完成。
Node v298：runtime shell candidate gate upstream echo verification。已完成。
Node v299：runtime shell candidate gate decision record。已完成。
推荐并行：Java v135 + mini-kv v132。已完成。
Node v300：runtime shell decision record upstream echo verification。已完成。
Node v301：post-decision continuation plan intake。已完成；只做继续 blocked planning 的必要性证明，不实现 runtime shell。
推荐并行：Java v136 + mini-kv v133。已完成；两边互不依赖，可以并行推进。
Node v302：echo segment catalog quality pass。已完成；只做 Node 质量优化，不消费两边新证据。
Node v303：post-decision plan intake upstream echo verification。已完成；已等待 Java v136 + mini-kv v133 和 Node v302 完成。
Node v304：runtime shell chain stop-or-prerequisite decision record。已完成；默认仍 blocked，不实现 runtime shell。
推荐并行：Java v141 + mini-kv v134。Node v304 已明确请求上游只读确认；两边互不依赖，可以并行推进。
Node v305：runtime shell chain stop/prerequisite upstream echo verification。已完成；已消费 Java v141 + mini-kv v134。
Node v306：approval prerequisite artifact intake plan。已完成；先定义 approval prerequisite artifact 输入契约，不实现 runtime shell。
推荐并行：Java v142 + mini-kv v135。当前下一步；Node v306 已完成，两边互不依赖，可以并行只读 echo。
Node v307：approval prerequisite artifact upstream echo verification。已完成；当前有效计划切换到 docs/plans2/v307-post-approval-prerequisite-artifact-upstream-echo-roadmap.md。
Node v308：human approval artifact review packet。已完成；只定义人工 artifact review packet，不实现 runtime shell。
推荐并行：Java v143 + mini-kv v136。已完成；两边互不依赖，可以并行只读 echo。
Node v309：human approval artifact review upstream echo verification。已完成；当前有效计划切换到 docs/plans2/v309-post-human-approval-artifact-review-upstream-echo-roadmap.md。
Node v310：human approval artifact review post-echo decision gate。已完成；不实现 runtime shell。
推荐并行：Java v144 + mini-kv v137。已完成；两边互不依赖，可以并行只读 echo。
Node v311：human approval artifact review post-echo decision upstream echo verification。已完成；当前有效计划切换到 docs/plans2/v311-post-human-approval-artifact-review-post-echo-decision-upstream-echo-roadmap.md。
Node v312：human approval artifact review governance stop/prerequisite closure decision。已完成；当前没有新的 Java + mini-kv 并行 echo 请求。
Node v313：human approval post-echo prerequisite catalog cleanup。已完成；只做质量优化，不消费两边新证据。
Node v314：signed human approval artifact contract intake。已完成；先定义非 secret signed approval artifact contract，不请求 Java/mini-kv。
推荐并行：Java v145 + mini-kv v138。当前下一步；两边互不依赖，可以并行只读 echo / non-participation。
Node v315：signed human approval artifact contract upstream echo verification。必须等待 Java v145 + mini-kv v138 完成。
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
- mini-kv v129 已完成 receipt verification/retention；后续 Node 只读消费，不要求 mini-kv 继续加写能力。
- Node v294 已完成：disabled runtime shell pre-plan intake，只做边界和计划，不实现 runtime。
- Node v295 已完成 design review；原推荐 Java v132 已修正为 Java v133。
- Node v296 已完成，依赖的是 Java v133 + mini-kv v130，不能抢跑 runtime shell implementation。
- Node v297 已完成 implementation candidate gate；仍默认 blocked。
- Node v298 已完成；依赖的是 Java v134 + mini-kv v131，仍默认 blocked。
- Node v299 已完成，只允许记录 blocked decision，不允许 runtime implementation。
- Node v300 已完成，依赖的是 Java v135 + mini-kv v132。
- Node v301 已完成 post-decision continuation plan intake，没有实现 runtime shell。
- 推荐并行：Java v136 + mini-kv v133。当前上游并行 lane。
- Node v302 已完成 echo segment catalog quality pass，没有消费 Java v136 / mini-kv v133。
- Node v303 必须等待 Java v136 + mini-kv v133 和 Node v302 完成。
- Node v303 已完成，当前有效计划切换到 docs/plans2/v303-post-decision-plan-intake-upstream-echo-roadmap.md。
- Node v304 已完成 stop-or-prerequisite decision；下一步是推荐并行 Java v141 + mini-kv v134。
- Node v305 已完成 stop/prerequisite upstream echo verification；当前有效计划切换到 docs/plans2/v305-post-stop-prerequisite-upstream-echo-roadmap.md。
- Node v306 已完成 approval prerequisite artifact intake；没有继续空转 echo。
- 推荐并行：Java v142 + mini-kv v135。Node v306 已完成，现在两边可以并行只读 echo。
- Node v307 已完成 approval prerequisite artifact upstream echo verification；当前有效计划切换到 docs/plans2/v307-post-approval-prerequisite-artifact-upstream-echo-roadmap.md。
- Node v308 已完成 human approval artifact review packet，不得跳到 runtime shell implementation。
- 推荐并行：Java v143 + mini-kv v136。已完成；Node v309 已等待两边完成。
- Node v309 已完成 human approval artifact review upstream echo verification；当前有效计划切换到 docs/plans2/v309-post-human-approval-artifact-review-upstream-echo-roadmap.md。
- Node v310 已完成 human approval artifact review post-echo decision gate；当前上游并行 lane 是 Java v144 + mini-kv v137。
- Java v144 + mini-kv v137 已完成；Node v311 已等待两边完成。
- Node v311 已完成 human approval artifact review post-echo decision upstream echo verification；当前有效计划切换到 docs/plans2/v311-post-human-approval-artifact-review-post-echo-decision-upstream-echo-roadmap.md。
- Node v312 必须先做 stop/prerequisite closure decision，避免 governance 链无限增长；若不能说明继续推进解决哪个具体 prerequisite，就暂停该链。
- Node v312 已完成 stop/prerequisite closure decision：只关闭 java-mini-kv-decision-echo，剩余 signed-human-approval-artifact、credential-handle-approval、endpoint-handle-allowlist-approval、no-network-safety-fixture、abort-rollback-semantics 继续缺失；当前不请求新 Java/mini-kv echo。
- Node 后续若继续推进，优先只做 human approval echo catalog cleanup 这类质量优化；功能主线必须等出现具体 prerequisite artifact contract 后再恢复。
- Node v313 已完成 human approval post-echo prerequisite catalog cleanup；v310/v312 现在共享 prerequisite catalog，降低后续 ID/label/evidence 漂移风险。
- 当前有效计划切换到 docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md。
- Node v314 已完成 signed-human-approval-artifact 的非 secret contract intake；不关闭其余 4 个 prerequisite，不打开 runtime shell。
- 推荐并行：Java v145 + mini-kv v138。Node v314 已完成，现在两边可以并行只读 echo / non-participation。
- Java 后续质量优化显式参考项：OpsEvidenceService.java service/catalog 化、ResponseRecords.java 继续拆、FailedEventMessageService.java 拆分、Java CI 加 jacoco gate；同一 Java 项目内部仍串行，不能和 Java v144 echo 并行。
- Node 后续质量优化显式参考项：echo catalog 化全面落地，继续把第 9、10 段以后 echo/decision 重复块收进 catalog/template；新 service 接近 700+ 行时先拆再写功能。
- Node v302 已把 post-decision continuation options / necessity proof catalog 化；后续继续复用 catalog，避免第 9、10 段复制。
- 同一项目内部版本仍按原子串行推进；只有 Java 与 mini-kv、或 Node 与其他项目互不依赖时，才写推荐并行。
- 未来新增计划优先写入 docs/plans2/，不要回灌旧的 docs/plans/；一个计划版本做完后另起续写，不要无限追加。
- 代码讲解继续写入 代码讲解记录_生产雏形阶段2/，截图和解释继续放 d/<版本>/。
```
