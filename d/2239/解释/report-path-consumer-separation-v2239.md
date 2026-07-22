# v2239 说明：展示路径不能再被当作文件句柄

v2238 已经让生产 profile 的绝对 fallback 路径在 Windows 与 Linux 上保持一致，但第二次远端 coverage 揭示了两个旧消费者仍依赖“`resolvedPath` 一定能在当前机器直接打开”的历史假设。稳定别名的职责是让报告字节可比较，不是给 Linux 伪造一个 `D:` 盘。测试 helper 因而必须先判断 profile 当时选择的路径在当前主机是否真实可读；可读时沿用它，保证 local/fallback 与临时测试语义不变；不可读时才用对象里的声明 `path` 经过 `resolveHistoricalEvidenceContentPath` 找到当前 runner 的真实 fixture 或 pinned snapshot。

另一个问题来自相对输入。`e/398/input/...` 与 `e/408/evidence/...` 本来就是仓库内相对报告字段，v2238 使用 `path.relative` 前没有先区分目标是否绝对，Node 会基于当前工作目录解析相对目标，从而把它们提升成 canonical 绝对别名。v2239 在投影前增加 `path.isAbsolute` guard，相对值原样返回；绝对 sibling fallback 仍按 canonical root 表示。v2168/v2169 的原始完整 golden 因此恢复，无需改期望。

本版没有撤销 v2238 的生产修复，也没有引入 Windows/Linux 两套 hash。扩展 focused 覆盖 portable helper 的全部九个消费者、两个 renderer migration oracle、v106/v107 profile、controlled preview 与 operator parity，共 13 个文件、42 项测试，全部通过。最终还要在文档完成后执行本机完整 coverage 与远端 Node Evidence；两者成功前不授予九分结论。
