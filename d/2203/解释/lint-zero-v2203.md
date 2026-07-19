# v2203 说明：把 lint 从容忍债务改成零警告边界

## 本版解决的问题

本版只处理可维护性债务，不新增路由、报告、证据字段或执行能力。修改前，仓库虽然保持零 lint 错误，但仍允许最多 261 条 warning，实际存在 180 条。其中 174 条是未使用的导入、局部变量或迁移后遗留 helper，另外 6 条是显式 `any`。这类问题不会立即破坏运行结果，却会持续降低审查信噪比：新增一条真正危险的未使用变量时，它会淹没在旧 warning 中；大型拆分完成后，残留导入也无法被机械判定为必须清理。

## 修改内容

清理优先采用删除而不是掩盖。promotion archive 的两个热点模块在此前拆分后仍保留整组旧类型与 helper 导入，本版只保留当前实现实际消费的符号，使 `opsPromotionArchiveBundle.ts` 降到 480 行、`opsPromotionArchiveReleaseBuilders.ts` 降到 553 行。其余单点 warning 同样删除未使用导入、常量、局部函数和中间变量，没有使用下划线改名、eslint-disable 或规则豁免。

部署证据链中的五个 `Record<string, any>` 被替换为 `DeploymentEvidenceSummary` 与 `DeploymentEvidenceArtifacts` 两个真实结构。共享报告渲染器剩余的一处 `any` 则收敛为一个明确的 `unknown` 类型擦除边界，随后在访问键值的位置集中转换为 `Record<string, unknown>`。这样既容纳不同报告的异构 item，又不把无约束类型扩散到业务模块。

最后，`package.json` 的 lint 命令由 `--max-warnings 261` 收紧为 `--max-warnings 0`，对应契约测试同步更新。以后第一条 warning 会直接让本地命令和 CI 非零退出，旧债不会重新长回来。

## 验证与边界

本地 typecheck 通过，lint 得到 0 errors / 0 warnings。受影响的 promotion archive、deployment evidence、release report 与 production live-smoke 共 16 个测试文件、53 项测试全部通过。安全扫描的 18 项配置检查、elegance、family、source-size 与 renderer census 均保持 ready。完整 Vitest 按三版本简报约定只在 v2205 最终树运行一次，避免每个内部维护版本重复占用大量 Node worker。

本版没有可渲染页面变化，因此没有制造无信息量截图。没有修改 sibling fixture、跨项目合同、HTTP 路由或生产权限，也没有触发 live capstone。Java 与 mini-kv 可继续独立推进。
