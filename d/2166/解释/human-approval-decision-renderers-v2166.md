# v2166 说明：human approval 决策 renderer 成组迁移

v2166 延续 N1 renderer consolidation，把 human approval artifact review 链条中的两份决策型 Markdown renderer 迁移到 `renderVerificationReportMarkdown`：`PostEchoDecisionGateRenderer` 和 `GovernanceStopPrerequisiteClosureDecisionRenderer`。本版不改变 loader、route、schema、historical fixture、Java/mini-kv 合同，也不启动任何 sibling service。

本版的核心价值是把 v2165 后剩下的 human-approval 决策外壳继续收敛：post-echo decision gate 负责记录 Node v310 选择“先请求 Java v144 + mini-kv v137 read-only echo，继续阻断 runtime shell”；governance-stop prerequisite closure decision 负责记录 Node v312 只关闭 `java-mini-kv-decision-echo` 这一项，其余五项人工/非秘密审批前置仍缺失。两者都是只读治理报告，适合统一 H1/meta/H2/messages/list 外壳，但仍保留本地 helper 展开 prerequisite/no-go 领域列表。

等价性证据采用固定 `generatedAt = "2026-07-07T00:00:00.000Z"` 的 normalized hash。post-echo decision gate 的 SHA-256 是 `8e12af44f0a03e8e4176a22ff82d0eb490a679ae16e0e8086f4b1a4ded8bec3c`，长度 12160，H2 12，H3 0，保留尾换行；governance-stop prerequisite closure decision 的 SHA-256 是 `4066f2f00da8224e23dac0c84b2ac6843f1b45d397214bef31dac3aaab4d128b`，长度 7255，H2 9，H3 2，保留尾换行。

验证已通过 focused tests、renderer census、typecheck、lint 和 build。renderer census 从 192/245 标准化推进到 194/245，未标准化 renderer 从 53 降到 51，剩余 H3 signal 从 4 降到 2，map signal 从 47 降到 44。Java 和 mini-kv 在本版仍是 recommended parallel；Node 没有等待或阻塞它们的真实执行。

推后检查发现 v2165 远端 CI 在 full coverage 中失败：post-echo upstream verification 的 Markdown hash 把 historical fixture 的绝对 `resolvedPath` 纳入了长度和 SHA-256，本地 Windows 路径与 GitHub runner 路径长度不同。v2166 把该测试改为在 hash 前把 fixture 绝对根路径规范化为 `<repo>/fixtures/`，保留 H2/H3/尾换行和完整文本 hash 的强度，同时消除环境路径差异。
