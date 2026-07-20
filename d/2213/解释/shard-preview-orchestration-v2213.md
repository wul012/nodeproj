# Node v2213 归档说明

v2213 深度整理 controlled read-only shard preview 的主 loader。旧实现把两路只读证据采集、六十余个有序审查 artifact、三十一项 checks、消息生成以及最终 profile 装配集中在一个 320 行函数中。行为虽然已有大量测试，却很难单独判断某次修改是在接触网络、改变决策，还是仅重排输出。随着后续 artifact 链增长，这个入口已经成为修改冲突和审查成本的集中点。

本版先在生产源码未动时冻结 ready 与 probes-disabled 两种完整输出。固定时间后，ready 为 1,752,385 字节 JSON 和 81,829 字节 Markdown；probes-disabled 为 1,760,303 字节 JSON 和 80,224 字节 Markdown，四个 SHA-256 均由 placeholder red 精确取得。重构后四个表面逐字节不变，因此不仅顶层字段，嵌套 artifact 顺序、digest、失败消息和 Markdown 段落也全部保持。

原公共文件现在只有 29 行，仍拥有原 loader、route、renderer 和 profile type 导出。`shardPreview/sources.ts` 只负责并发读取 Java 与 mini-kv，并保留 probes-disabled 跳过和异常转 fail-closed observation 的旧语义；新增直接测试让两端同时抛错，确认两条 observation 都是 attempted=true、failed-read。`assessment.ts` 把链按 matrix、window、approval、text-package、candidate 五个实际阶段展开，最长函数 72 行，不使用字符串驱动的万能执行器。`profile.ts` 只按原键顺序组装固定安全边界、reads、preview、checks、summary 和 endpoint。

维护账本只出现旧 320 行函数一条 stale，删除后从 85/112/228/0 收紧到 85/111/228/0，没有 replacement debt。三个内部模块放在域目录中，顶层 service/route 机械计数仍是 1125/80；公共 service 表面没有增长。全部 58 个 shard-preview 文件、259 项测试通过，typecheck、focused lint 和 growth ratchet 通过。

本版不改变 `UPSTREAM_PROBES_ENABLED` 或 `UPSTREAM_ACTIONS_ENABLED`，不启动或停止 Java/mini-kv，不读取凭据、不解析 managed-audit 原始端点，不开放 active shard router、write routing、load、restore 或 compact。Java 与 mini-kv 推荐独立并行，Node 没有读写其工作树，也没有运行 live capstone。无 HTML/UI 改动，因此不生成截图；完整 suite、build、HTTP smoke、push 与远端 Node Evidence 留到 v2214 批末统一执行。
