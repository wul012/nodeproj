# v2186 renderer parity 证据元数据可移植性修复

replacement CI 运行 29075301137 已通过 typecheck、lint 以及 543 个测试文件/
1656 项测试，只在 v2183 parity 的 readiness gate sha256 失败。长度相同，说明
差异来自固定宽度字段。

Windows 与 LF worktree 的逐行比较确认仅两行不同：同一 mini-kv v101 evidence
文件的 `sizeBytes` 为 7256/7255，digest 也随 CRLF/LF 改变。本版把缩进
`sizeBytes` 与 64 位 `digest` 归一为 `<bytes>`、`<sha256>`，并新增成对负例。

v2183 parity 改为 soft assertions，一次运行可报告全部报告差异。通用规则仅影响
blocked rehearsal 与 readiness gate 两份规范化指纹；其余九份不变。首次全量
回归又准确发现 v2179 的六份报告中只有 minimal read-only handoff 命中新规则，
于是该批也采用同样的软聚合诊断，并在逐案证据下更新唯一一份规范化指纹。

三文件/六测试已在 Windows 与独立 LF worktree 全部通过，十七份报告均走到尾部；
聚焦 coverage 模式也通过。未分片全量命令只因 3600 秒外层预算退出，未产生失败
文件且没有残留进程；随后 8 个确定性分片覆盖 544 个文件、1658 项测试并全部
通过。typecheck、0 error/263 warning lint、build 与讲解质量门也全绿。产品
`src/` 和 fixtures 均未修改，N5 仍等待外部 N1-close review。
