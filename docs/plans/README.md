# OrderOps Node 计划文档目录

本目录统一保存 Node 后续版本计划、跨项目联调计划、阶段路线图和由某个版本衍生出的下一阶段开发安排。

规则：

- Node 每个版本或每几个版本，视工作量输出一份计划文档
- 计划文档统一放在 `docs/plans/`
- 文件名建议带来源版本和主题，例如 `v52-cross-project-roadmap.md`
- 如果计划由某个版本衍生，文档开头必须说明来源版本
- 如果计划影响 Java 或 mini-kv，需要明确写出跨项目边界、暂停条件和不做事项
- 分工规则：Codex 默认只负责推进 Node 项目 `D:\nodeproj\orderops-node`；Java 和 mini-kv 只做只读核对、计划判断和方向提示，不直接修改、不构建、不启动、不测试，除非用户明确重新授权交叉开发
- 如果最新计划的下一步是 Java 或 mini-kv 版本，收到“推进”时必须先做只读完成度核对，再决定是否停止或继续 Node
- 跨项目只读完成度核对步骤：检查对应项目 `git status` 是否干净、`git log` / tag 是否出现计划版本、计划要求的 sample/fixture/文档文件是否存在、关键字段是否匹配计划；不得构建、启动、测试或修改 Java / mini-kv
- 如果只读核对确认 Java / mini-kv 计划版本已完成，则继续推进下一个 Node 版本；如果未完成或证据不足，则说明缺少哪项证据并停止
- 每次推进 Node 自己的新版本前，必须先读取 `docs/plans/` 中最新计划文档，并按最新计划的版本范围、验证要求、截图规则、暂停条件执行
- 计划粒度要按真实开发效率组织：能够安全并行、互不阻塞、且同属一个交付闭环的 Node / Java / mini-kv 版本，应写成“同轮推荐并行”或“推荐并行”，不要拆成让人误解为必须串行的多个步骤
- 运行调试截图默认优先使用本机 Chrome / Chromium 可执行文件；不要默认触发 Playwright 浏览器下载。若当前机器未找到 Chrome / Chromium，可使用本机 Edge 兜底，并在归档说明中写明。
- 同一条未完成开发主线不要创建互相重合的多个计划文件；当当前计划覆盖的版本做完后，下一阶段另起新的计划文件，并只在旧计划记录收口状态
- v107 起运行调试截图和解释默认放在 `b/<版本>/图片` 与 `b/<版本>/解释`；v161 起切换到 `c/<版本>/图片` 与 `c/<版本>/解释`；`a/` 和 `b/` 保留历史归档
- v104 起代码讲解写入 `代码讲解记录_生产雏形阶段/`；旧目录 `代码讲解记录/` 保留 v1-v103 历史记录

## 当前计划

```text
v52-cross-project-roadmap.md
 -> 由 Node v52 upstream overview 衍生出的三项目综合开发路线图；当前收敛为 Java v36、Node v53、mini-kv v44、mini-kv v45、Node v54 五个近期版本，并标明可一起推进的批次

v54-post-infojson-roadmap.md
 -> 由 Node v54 mini-kv INFOJSON 接入衍生出的后续计划；收敛为 Java v37、mini-kv v46、Node v55、Node v56，并新增运行调试截图归档规则

v56-post-dashboard-control-roadmap.md
 -> 由 Node v56 Dashboard 上游观察详情面板衍生出的受控操作预演计划；收敛为 Java v38、mini-kv v47、Node v57、Node v58、Node v59，并说明哪些版本可以一起推进

v59-post-preflight-control-roadmap.md
 -> 由 Node v59 operation preflight evidence bundle 衍生出的后续计划；已推进到 Node v65 接入 Java v40 approval-status 与 mini-kv v49 side_effects

v65-post-upstream-evidence-roadmap.md
 -> 由 Node v65 upstream evidence integration 衍生出的后续计划；收敛为 Node v66、Java v41 + mini-kv v50、Node v67、Node v68，并继续保持真实执行前 gate 边界

v68-post-execution-gate-roadmap.md
 -> 由 Node v68 execution gate preview 衍生出的执行前证据链计划；已推进到 Node v71 接入 Java v42 与 mini-kv v51 execution-contract 证据

v71-post-execution-contract-roadmap.md
 -> 由 Node v71 execution-contract evidence 衍生出的当前主线计划；已完成 Node v72-v75 并收口

v75-post-fixture-diagnostics-roadmap.md
 -> 由 Node v75 fixture drift diagnostics 衍生出的下一阶段计划；已完成 Node v76-v78 并收口

v78-post-scenario-matrix-roadmap.md
 -> 由 Node v78 fixture scenario matrix 衍生出的下一阶段计划；已完成 Node v79-v80 并收口

v80-post-scenario-matrix-verification-roadmap.md
 -> 由 Node v80 scenario matrix verification 衍生出的下一阶段计划；已完成 Node v81-v82 并收口

v82-post-scenario-archive-bundle-roadmap.md
 -> 由 Node v82 scenario verification archive bundle 衍生出的下一阶段计划；已完成 Node v83-v84 并收口

v84-post-scenario-archive-verification-roadmap.md
 -> 由 Node v84 scenario archive bundle verification 衍生出的下一阶段计划；收敛为 Node v85、Node v86

v86-production-readiness-roadmap.md
 -> 由 Node v86 release evidence index 后续主线衍生出的生产就绪路线；已推进到 Node v89

v89-production-hardening-roadmap.md
 -> 由 Node v89 deployment safety profile 衍生出的生产硬化路线；已推进到 Node v92

v92-production-ops-roadmap.md
 -> 由 Node v92 rollback evidence runbook 衍生出的生产运维证据路线；已推进到 Node v95

v95-production-gap-roadmap.md
 -> 由 Node v95 production readiness summary index 衍生出的生产阻塞项收敛计划；已完成 Node v96-v99 并收口

v99-production-readiness-v2-roadmap.md
 -> 由 Node v99 production readiness summary v2 衍生出的生产阻塞项收敛计划；已完成 Node v100-v103 并收口

v103-production-auth-audit-roadmap.md
 -> 由 Node v103 production readiness summary v3 衍生出的生产 auth/audit 计划；已完成 Node v104-v107 并收口

v107-production-readiness-v4-roadmap.md
 -> 由 Node v107 production readiness summary v4 衍生出的生产门槛可切换演练计划；已完成 Node v108-v110 并收口

v110-production-hardening-roadmap.md
 -> 由 Node v110 production readiness summary v5 衍生出的生产认证与审计硬化计划；已完成 Node v111-v113 并收口

v113-production-integration-roadmap.md
 -> 由 Node v113 deployment environment readiness gate 衍生出的生产硬门槛集成计划；已完成 Node v114-v116 并收口

v116-production-adapter-roadmap.md
 -> 由 Node v116 production readiness summary v6 衍生出的生产 adapter 边界计划；已完成 Node v117-v119 并收口

v119-production-connection-roadmap.md
 -> 由 Node v119 production readiness summary v7 衍生出的计划；已完成 Node v120-v122 并收口

v122-production-connection-candidate-roadmap.md
 -> 由 Node v122 production readiness summary v8 衍生出的计划；已完成 Node v123-v125 并收口

v125-production-connection-readiness-roadmap.md
 -> 由 Node v125 production readiness summary v9 衍生出的计划；已完成 Node v126-v128 并收口

v128-production-connection-implementation-roadmap.md
 -> 由 Node v128 production readiness summary v10 衍生出的计划；已完成 Node v129-v131 并收口

v131-production-connection-review-roadmap.md
 -> 由 Node v131 production readiness summary v11 衍生出的计划；已完成 Node v132-v134 并收口

v134-production-live-probe-roadmap.md
 -> 由 Node v134 production readiness summary v12 衍生出的计划；已完成 Node v135-v137 并收口

v137-production-live-probe-evidence-roadmap.md
 -> 由 Node v137 production readiness summary v13 衍生出的计划；已完成 Node v138-v140 并收口，且本阶段没有新增 summary v14

v140-live-probe-handoff-roadmap.md
 -> 由 Node v140 production live probe evidence archive bundle 衍生出的计划；已完成 Node v141-v143 并收口

v143-live-probe-real-read-window-roadmap.md
 -> 由 Node v143 real-read smoke archive adapter 衍生出的计划；已完成 Node v144-v146 并由 v146-production-pass-evidence-roadmap.md 接续

v146-production-pass-evidence-roadmap.md
 -> 由 Node v146 production live probe real-read smoke release evidence gate 衍生出的计划；已完成 Node v147-v149 并由 v149-post-production-pass-evidence-roadmap.md 接续

v149-post-production-pass-evidence-roadmap.md
 -> 已完成 Node v150-v159 并由 v159-post-release-evidence-review-roadmap.md 接续

v159-post-release-evidence-review-roadmap.md
 -> 已完成 Node v160-v161 并由 v161-post-controlled-idempotency-drill-roadmap.md 接续

v161-post-controlled-idempotency-drill-roadmap.md
 -> 已完成 Java v54、mini-kv v63、Node v162、Java v55、mini-kv v64、Node v163，并由 v163-post-rollback-readiness-roadmap.md 接续

v163-post-rollback-readiness-roadmap.md
 -> 已完成并收口；Node v164-v166、Java v56-v57、mini-kv v65-v66 已完成，由 v166-post-rollback-window-roadmap.md 接续

v166-post-rollback-window-roadmap.md
 -> 已完成并收口；Java v59 + mini-kv v68 已推荐并行完成，Node v168 已消费两边 secret/digest evidence，Node v169 已完成 post-v166 readiness summary

v169-post-production-environment-preflight-roadmap.md
 -> 当前唯一有效全局计划；由 Node v169 post-v166 readiness summary 衍生，Node v170 已插入 report shared helpers hardening 维护重构，Java v60 + mini-kv v69、Java v61 + mini-kv v70 均已推荐并行完成，Node v171-v173 已消费并形成 release window readiness packet；下一步需另起新计划，不在本文件继续追加重合版本

v173-post-release-window-readiness-roadmap.md
 -> 已完成并收口；由 Node v173 release window readiness packet 衍生，Node v174 production release dry-run envelope、推荐并行 Java v62 + mini-kv v71、Node v175 release handoff readiness review、Node v176 CI evidence hardening packet 已完成，由 v176-post-ci-evidence-hardening-roadmap.md 接续

v176-post-ci-evidence-hardening-roadmap.md
 -> 已完成并收口；由 Node v176 CI evidence hardening packet 衍生，Node v177 CI operator identity evidence packet、推荐并行 Java v63 + mini-kv v72、Node v178 cross-project evidence retention gate、Node v179 production release pre-approval packet 已完成，由 v179-post-pre-approval-roadmap.md 接续

v179-post-pre-approval-roadmap.md
 -> 已完成并收口；由 Node v179 production release pre-approval packet 衍生，推荐并行 Java v64 + mini-kv v73、Node v180、Node v181、推荐并行 Java v65 + mini-kv v74、Node v182 release approval decision rehearsal packet 已完成，由 v182-post-rehearsal-quality-roadmap.md 接续

v182-post-rehearsal-quality-roadmap.md
 -> 已完成并收口；由 Node v182 release approval decision rehearsal packet 衍生，Node v183-v184 已完成 opsPromotionArchiveBundle 第一轮实际优化与边界测试，Java v66 + mini-kv v75 已推荐并行完成，Node v185 已完成 real-read rehearsal intake，由 v185-post-real-read-rehearsal-roadmap.md 接续

v185-post-real-read-rehearsal-roadmap.md
 -> 已完成并收口；由 Node v185 real-read rehearsal intake 衍生；Node v186-v190 已完成 opsPromotionArchiveBundle 技术债拆分，Java v67 + mini-kv v76 已推荐并行完成，Node v191 已完成 real HTTP/TCP read adapter rehearsal；由 v191-post-real-read-adapter-roadmap.md 接续

v191-post-real-read-adapter-roadmap.md
 -> 已完成并收口；由 Node v191 real HTTP/TCP read adapter rehearsal 衍生；Node v192、推荐并行 Java v68 + mini-kv v77、Node v193 real-read adapter failure taxonomy、Node v194 evidence archive 已完成，由 v194-post-real-read-archive-roadmap.md 接续

v194-post-real-read-archive-roadmap.md
 -> 已完成并收口；由 Node v194 real-read adapter evidence archive 衍生；Node v195 archive verification、推荐并行 Java v69 + mini-kv v78、Node v196 imported window result packet、Node v197 production readiness checkpoint 已完成，由 v197-post-readiness-checkpoint-roadmap.md 接续

v197-post-readiness-checkpoint-roadmap.md
 -> 已完成并收口；由 Node v197 production readiness checkpoint 衍生；Node v198 real-read window operator identity binding、推荐并行 Java v70 + mini-kv v79、Node v199 real-read window audit store handoff contract、Node v200 CI archive artifact manifest 已完成；由 v200-post-ci-artifact-manifest-roadmap.md 接续

v200-post-ci-artifact-manifest-roadmap.md
 -> 已完成并收口；由 Node v200 real-read window CI archive artifact manifest 衍生；推荐并行 Java v71 + mini-kv v80、Node v201、Node v202、推荐并行 Java v72 + mini-kv v81、Node v203 cross-project CI artifact retention gate 已完成；由 v203-post-ci-artifact-retention-roadmap.md 接续

v203-post-ci-artifact-retention-roadmap.md
 -> 已完成并收口；由 Node v203 cross-project CI artifact retention gate 衍生；Node v204 联调预检、推荐并行 Java v73 + mini-kv v82、Node v205 真实只读联调 execution packet、Node v206 archive verification 已完成；由 v206-post-real-read-archive-verification-roadmap.md 接续

v206-post-real-read-archive-verification-roadmap.md
 -> 已完成并收口；由 Node v206 three-project real-read runtime smoke archive verification 衍生；Node v207 post-real-read production hardening triage 已完成，由 v207-post-hardening-triage-roadmap.md 接续

v207-post-hardening-triage-roadmap.md
 -> 已完成并收口；由 Node v207 post-real-read production hardening triage 衍生；Java v74 + mini-kv v83 已推荐并行完成，Node v208 managed audit persistence boundary candidate 已完成，由 v208-managed-audit-boundary-roadmap.md 接续

v208-managed-audit-boundary-roadmap.md
 -> 已完成并收口；由 Node v208 managed audit persistence boundary candidate 衍生；Node v209 managed audit persistence dry-run verification 已完成，只写 Node 本地测试临时目录，不写 Java 或 mini-kv；由 v209-managed-audit-dry-run-roadmap.md 接续

v209-managed-audit-dry-run-roadmap.md
 -> 已完成并收口；由 Node v209 managed audit persistence dry-run verification 衍生；Node v210、推荐并行 Java v75 + mini-kv v84、Node v211 managed audit identity approval provenance dry-run packet 已完成；由 v211-post-managed-audit-packet-roadmap.md 接续

v211-post-managed-audit-packet-roadmap.md
 -> 已完成并收口；由 Node v211 managed audit identity approval provenance dry-run packet 衍生；Node v212 packet verification report、推荐并行 Java v76 + mini-kv v85 只读消费回执、Node v213 managed audit packet restore drill plan 已完成，下一阶段应另起新计划

v213-post-restore-drill-plan-roadmap.md
 -> 已完成并收口；由 Node v213 managed audit packet restore drill plan 衍生；Node v214 archive verification、推荐并行 Java v77 + mini-kv v86、Node v215 managed audit dry-run adapter candidate 已完成，下一阶段应另起 post-v215 计划

v215-post-dry-run-adapter-roadmap.md
 -> 已完成并收口；由 Node v215 managed audit dry-run adapter candidate 衍生；Node v216 archive verification、推荐并行 Java v78 + mini-kv v87、Node v217 production-hardening readiness gate 已完成，由 v217-post-production-hardening-gate-roadmap.md 接续

v217-post-production-hardening-gate-roadmap.md
 -> 已完成并收口；由 Node v217 managed audit adapter production-hardening readiness gate 衍生；Node v218、推荐并行 Java v79 + mini-kv v88、Node v219 implementation precheck packet 已完成，由 v219-post-implementation-precheck-roadmap.md 接续

v219-post-implementation-precheck-roadmap.md
 -> 当前唯一有效全局计划；由 Node v219 managed audit adapter implementation precheck packet 衍生；Node v220 managed audit adapter interface + disabled shell 已完成；下一步推荐并行 Java v80 + mini-kv v89，只读 guard receipt 完成后 Node v221 做本地 adapter candidate dry-run
```
