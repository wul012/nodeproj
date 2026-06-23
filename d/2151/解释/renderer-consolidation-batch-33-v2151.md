# v2151 renderer consolidation batch 33

## 本版目标

本版继续 Node renderer consolidation，迁移 artifact draft text package 的 comparison / compared-evidence 后续链条。迁移对象是 6 个具体报告 renderer：

- text package comparison preflight
- text package comparison acceptance precheck
- compared package evidence intake
- compared evidence evaluation preflight
- compared evidence candidate
- compared evidence candidate intake

本版同时给 `verificationReportBuilder` 增加两个小能力：空 meta 时第一节不多打一行空白，以及 `renderVerificationSeparatedBlockLines` 用于保留旧 for-loop h3 block 的块间空行。所有改动只影响 Markdown 外壳，不改变服务对象、route、schema、approval 行为、执行行为或兄弟项目状态。

## 验证摘要

- forced historical fallback pre/post SHA-256 比对：6/6 byte-identical。
- focused tests：7 个文件，41 个测试通过。
- typecheck：`npm run typecheck` 通过。
- renderer 统计：245 个 renderer 中 153 个已 builder-backed，剩余 92 个未迁移；未迁移文件内还有 h3 14 个、for 4 个、map 45 个、flatMap 38 个。

Java / mini-kv 仍可并行推进。本版没有读取它们的新工作树材料，也没有要求它们写回 Node。
