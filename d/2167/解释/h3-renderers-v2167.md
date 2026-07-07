# v2167 说明：剩余 H3 renderer 清零

v2167 继续推进 N1 renderer consolidation，把剩余带 H3 shape signal 的两个完整 Markdown renderer 文件迁移到 `renderVerificationReportMarkdown`：`operationApprovalEvidenceRenderer.ts` 和 `opsPromotionReleaseAuditTrailMarkdownRenderer.ts`。本版不改变 route、schema、业务计算、Java/mini-kv 证据读取或真实执行权限，只把手写 Markdown 外壳迁移为统一 builder spec。

本版覆盖三份输出：operation approval evidence report、operation approval evidence verification、promotion release audit trail record。三份输出都用固定 typed fixture 做 SHA-256、长度、H2/H3 和尾换行断言。operation report 的 hash 为 `19d864f7a32ef7b8a8a4f0c9b9c645eb3fdd8f5e409c4186ffc515cb4f28b199`，operation verification 为 `aa988caaa667c662c9a2ca5b1ee3a2fcfc39553f0f6d4a33582fe9932584185d`，promotion audit trail 为 `3d4f8b6becceb2aa7f3f81213aa3d13ab476e2d1551f26421aa377f0a608042c`。

验证已通过 v2167 focused gate、renderer census、typecheck、lint 和 build。renderer census 从 194/245 标准化推进到 196/245，未标准化 renderer 从 51 降到 49，剩余 H3 signal 从 2 降到 0。Java 和 mini-kv 在本版仍是 recommended parallel，因为本版只处理 Node 本地展示层。
## v2166 CI repair / 远端 CI 修复

本版同时收掉 v2166 的远端 CI 失败：v2165 historical-fallback Markdown hash 在 Windows 和 Linux 上长度、H2/H3 数量一致，但 fixture root 后半段路径分隔符不同。修复方式是先把绝对 fixture root 归一化为 `<repo>/fixtures/`，再把该 fixture 路径段内的反斜杠统一成正斜杠；新的稳定 hash 是 `1eb9902adbc0ff2dffe094aa1f2c07c45c6c585fec5b60e6906d0b6831934e84`，没有改变业务输出，只改变测试归一化输入面。
