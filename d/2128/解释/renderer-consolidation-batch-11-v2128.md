# v2128 renderer consolidation batch 11

v2128 继续 N1 renderer consolidation，把 Java / mini-kv route catalog cleanup 剩余相邻报告面中的 6 个 renderer 迁移到 `renderVerificationReportMarkdown`：consumer readiness evidence report、consumer readiness batch closeout、current evidence report、fresh baseline batch closeout、latest sibling live smoke preflight、sibling workspace availability closeout。

本版没有修改 loader、route、schema、fixture、access guard 或任何真实执行开关。所有 Java / mini-kv 内容仍来自 Node 已有冻结证据、历史 fixture 或当前只读报告模型；Java 和 mini-kv 可以继续按各自 playbook 并行推进，Node v2128 不是它们的前置审批门。

维护收益：
- 6 个 renderer 从重复手写 Markdown 骨架改为共享 builder。
- 文件总差异为 225 insertions / 369 deletions，净减少 144 行。
- 迁移后 6 个 renderer 分别为 55、37、42、38、60、35 行，职责更集中。
- 复用 v2127 的 evidence-file helper；batch closeout 的 `path / sizeBytes / sha256`、live smoke 的 process plan / read targets、availability closeout 的 historical fixture roots 仍保留本地 lines，避免把业务语义硬塞进通用 helper。

已完成验证：
- `npm run typecheck` 通过。
- focused renderer batch 通过：8 个测试文件、14 个断言。
- 临时 Vitest exact compare 通过：6/6 个 renderer 与 `git show HEAD` 中迁移前实现逐字节一致。

待最终收尾验证：
- walkthrough 中文质量 gate。
- lint。
- build。
- 删除 `.tmp` 和 `dist` 后提交、tag、push、观察 CI。

本版不需要截图归档，因为没有新增 HTML/UI/HTTP smoke 页面；验证价值集中在 Markdown 输出的字节级一致性和 renderer 结构压缩。
