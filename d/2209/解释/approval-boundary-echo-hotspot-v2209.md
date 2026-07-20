# Node v2209 归档说明

本版本是一次严格保持外部行为的维护性重构。原来的审批必需边界上游回显服务共有 766 行，同时承担 Node v274 投影、Java v115 文本证据解析、mini-kv v121 回执解析、跨项目边界判断、消息生成和最终响应装配。v2209 保留公共模块路径、loader、renderer、路由、字段顺序、失败默认值和所有只读边界，把内部实现改为 131 行 facade、419 行 `approvalBoundaryReference` 与 395 行 `approvalBoundaryAssessment`。

这也是第三个同类回显热点。版本没有复制第三套通用骨架，也没有把三种不同证据协议硬塞进无类型配置引擎，而是提取两项真正重复的机制：从 checks 中排除最终 ready 字段后计算总就绪，以及把失败规则按原顺序映射成 blocker。两项机制有直接单元测试，v2207、v2208、v2209 三代消费者全部迁移。最初的 `Sources` / `Checks` 命名会形成新的第三文件族，优雅门正确拒绝；最终按真实职责改名为 `Reference` / `Assessment`，已有 52 个受控家族没有增长。

强制历史 fallback、固定时间并在渲染前递归规范化路径后，v2209 的完整 JSON 固定为 38,431 字节、SHA-256 `120a8e1bcdb290673052a3b33dcce21fd8a71b4033ce9350bce1c489e223abac`；Markdown 固定为 37,992 字节、SHA-256 `c86bf5b70675efe48d778ff2c037da24be470cafc760804bdb6cce42e8530db8`。同一轮测试也证明 v2207 不变，并修复 v2208 在 Linux CI 暴露的 Windows 路径转义型测试缺陷；业务 renderer、fixture 和 HTTP 原始响应均未被修改。

维护性基线先暴露五个预期 stale 条目和一个新 mini-kv 长函数。继续按证据、详情、回执/来源/审查、边界字段拆分后，新债务归零；只删除五个已消失的旧条目，指标由 `87 / 119 / 233 / 2` 收紧到 `86 / 116 / 232 / 2`。服务与路由文件上限仍是 `1125 / 80`。本版本不读取实时兄弟项目、不启动联合执行、不授予写入或连接权限，也没有 HTML/UI 变化，因此不生成没有证明力的截图。

最终 16 个低并发 shard 全部通过，独立 discovery 确认 568 个文件、1,734 项测试；typecheck、零告警 lint、build、文档门和全部静态 ratchet 均通过。编译服务在端口 31209 以强制 fallback 和 access guard 启动，health、目标 JSON、目标 Markdown 均返回 200，JSON profile 为 ready 且 `executionAllowed=false`、`connectsManagedAudit=false`；记录的 PID 27808 已停止，端口监听归零。
