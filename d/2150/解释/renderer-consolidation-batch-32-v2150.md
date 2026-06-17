# v2150 renderer consolidation batch 32

## 本版目标

本版继续推进 Node 自己的 renderer consolidation，不触碰 Java 和 mini-kv，也不推进真实分片联合执行。迁移对象是 signed approval capture artifact draft 之后的五个文本包前置报告 renderer：

- artifact draft authoring readiness
- artifact draft instruction preflight
- artifact draft text package intake
- artifact draft text package review preflight
- artifact draft text package submission preflight

这五个 renderer 原本都用手写数组拼 Markdown：标题、几十个 meta bullet、`## Gates`、两个 h3 明细区和 `## Blocked Reasons`。v2150 把共同报告骨架交给 `renderVerificationReportMarkdown`，继续保留每个文件自己的明细 helper。这样减少重复外壳，又不把文本包、审查条件、提交槽位这些领域含义压进一个难读的大 helper。

## 关键边界

本版只改变 Markdown 渲染外壳，不改变服务对象、不改变 route、不改变 schema、不改变 approval 行为，也不生成任何真实批准。报告里出现 approval、draft、submission、review 等词，只表示只读前置材料和人工审查材料的状态被展示出来，不代表系统已经允许执行。

Java / mini-kv 可以继续按各自 playbook 并行推进。Node 本版使用历史 fixture fallback 做 byte-identical 校验，不依赖它们刚生成的新文件。

## 验证摘要

- forced historical fallback 旧输出 baseline 已记录，迁移后五份输出长度和 SHA-256 全部一致。
- focused tests：6 个文件，33 个测试通过。
- typecheck：`npm run typecheck` 通过。
- renderer 统计：245 个 renderer 中 147 个已 builder-backed，剩余 98 个未迁移；未迁移文件内还有 h3 14 个、for 9 个、map 45 个、flatMap 39 个。

最终提交前还会补跑 ratchet、代码讲解质量门、lint 和 diff 检查，并删除本版 `.tmp` 临时脚本。
