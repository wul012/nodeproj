# v2132 renderer consolidation batch 15

本版本继续 N1 renderer consolidation，迁移 runtime-shell candidate gate、post-decision plan intake、chain stop/prerequisite 这三段治理链上的 6 个完整报告 renderer。它们只改变 Markdown 生成方式，不改变 profile、route、evidence schema、digest、ready flag 或任何真实执行开关。

## 本批迁移

- `RuntimeShellPostDecisionContinuationPlanIntakeRenderer`
- `RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationRenderer`
- `RuntimeShellChainStopOrPrerequisiteDecisionRecordRenderer`
- `RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationRenderer`
- `RuntimeShellCandidateGateDecisionRecordRenderer`
- `RuntimeShellCandidateGateUpstreamEchoVerificationRenderer`

## 工程取舍

这批报告都属于 runtime shell 真实实现前的治理材料，公共结构是 title/meta/sections/messages/next actions。v2132 把公共 frame 交给 `renderVerificationReportMarkdown`，但保留本地 decision record 投影、requirement/no-go 字符串、continuation options、Java/mini-kv evidence files 和 expected snippets。没有新增 helper，避免让 shared builder 承担业务链路语义。

## 验证

- `npm run typecheck` passed。
- focused tests：8 files / 29 tests passed。
- byte-identical compare：6/6 passed，旧 renderer 源码来自 `git show HEAD:<path>`，新旧 Markdown 完全一致。
- docs/lint/build 在最终收口时补入 summary。
