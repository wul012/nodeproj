# v2185 renderer parity 路径可移植性修复

远端 `Node Evidence` 运行 29071738931 在 coverage 测试阶段只失败一项：
`candidateGateUpstreamHardeningReview` 的规范化长度在 Linux 为 6172，本地基线
为 6152。其余 542 个文件、1653 项测试以及 typecheck、lint 均通过。

独立 `core.autocrlf=false` worktree 的逐行比较把差异定位到两条带版本前缀的
`Java v151/v152 resolved path`。旧规则只能识别普通 `Resolved path`，因此没有
把 checkout 根替换为 `<repo>`。本版扩展同一规则以识别 Java/mini-kv 版本前缀，
并新增 Windows/Linux 路径矩阵和非路径保护测试。

Windows 与 LF checkout 修复后均得到长度 6114、sha256
`96457d87ec3af940e44b759fdcae7ac0d18ae2260ed84c8bb25f7331d5793ec6`。
本版未修改 `src/`、fixture 或公开 Markdown；N1 仍等待外部 close review，N5
尚未开始。
