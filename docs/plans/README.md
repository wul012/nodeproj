# OrderOps Node 计划文档目录

本目录统一保存 Node 后续版本计划、跨项目联调计划、阶段路线图和由某个版本衍生出的下一阶段开发安排。

规则：

- Node 每个版本或每几个版本，视工作量输出一份计划文档
- 计划文档统一放在 `docs/plans/`
- 文件名建议带来源版本和主题，例如 `v52-cross-project-roadmap.md`
- 如果计划由某个版本衍生，文档开头必须说明来源版本
- 如果计划影响 Java 或 mini-kv，需要明确写出跨项目边界、暂停条件和不做事项
- 普通版本归档仍放在 `a/<版本>/解释/说明.md`
- 代码讲解仍放在 `代码讲解记录/`

## 当前计划

```text
v52-cross-project-roadmap.md
 -> 由 Node v52 upstream overview 衍生出的三项目综合开发路线图；当前收敛为 Java v36、Node v53、mini-kv v44、mini-kv v45、Node v54 五个近期版本，并标明可一起推进的批次

v54-post-infojson-roadmap.md
 -> 由 Node v54 mini-kv INFOJSON 接入衍生出的后续计划；收敛为 Java v37、mini-kv v46、Node v55、Node v56，并新增运行调试截图归档规则
```
