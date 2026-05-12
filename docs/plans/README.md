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
- 同一条未完成开发主线不要创建互相重合的多个计划文件；当当前计划覆盖的版本做完后，下一阶段另起新的计划文件，并只在旧计划记录收口状态
- 普通版本归档仍放在 `a/<版本>/解释/说明.md`
- 代码讲解仍放在 `代码讲解记录/`

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
 -> 由 Node v82 scenario verification archive bundle 衍生出的下一阶段计划；收敛为 Node v83、Node v84
```
