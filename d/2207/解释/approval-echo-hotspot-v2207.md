# v2207 审批就绪回显热点拆分说明

本版只做维护性重构，不增加治理功能。目标文件原有 788 行，同时以 `createChecks` 占用 187 行和复杂度 137，在维护性基线中形成三条独立债务。仓库的 `src/services` 与 `src/routes` 已分别达到 1125 和 80 的硬上限，因此没有用“再加两个 service 文件”的方式换取表面整洁，而是把历史证据数据边界放入既有 `src/evidence`：`approvalReadinessEchoSources.ts` 负责 Java v116、mini-kv v122 的路径、片段和结构化读取；`approvalReadinessEchoChecks.ts` 负责有序检查、阻断项、建议和摘要；原公共文件只保留 Node v281 服务调用、profile 装配、digest 与路由链接。

迁移前先在既有测试中加入可跨平台 oracle。它强制使用提交内历史 fallback，固定 `generatedAt`，递归把仓库绝对根和 Windows/Linux 路径分隔符归一化，再冻结 JSON `27742` 字节、SHA-256 `b0946c...da957`，以及 Markdown `13925` 字节、SHA-256 `6b3349...07377`。四个占位断言先按预期失败，写入当前值后迁移前 5/5 通过。第一次搬运误把 Java 讲解目录“续”写成了猜测值，oracle 与既有业务断言立即把 Java readiness、JSON 和 Markdown 漂移全部拦下；从 v2206 Git 对象恢复原路径后 5/5 重回原四值，没有修改测试期望。

原 `createChecks` 的键顺序被六个有序分组保留。长 `&&` 链改为 `all([...])` 数据列表，不改变布尔表达式的值，却把单函数分支复杂度拆散；纯属性读取没有副作用，因此数组预求值不会改变行为。拆分后公共入口为 158 行，sources 为 256 行，checks 为 482 行，所有文件低于 600 行；census 在基线更新前只报告计划中的三条 stale，没有新增或增长，删除这三条后以 `88 / 120 / 237 / 2` ready。service/route 仍为 `1125/80`，优雅已知债务保持 4537，tracked family 保持 52。

目标、本地兄弟证据、强制历史 fallback、v283/v284 下游消费者、路由和增长门已完成 5 文件/24 用例；typecheck、零警告 lint、维护性、优雅、family、源码体积、renderer 和安全配置门均通过。完整套件、最终 build、目标 HTTP JSON/Markdown smoke、文档门和远端 CI 在最终批次补入。本版没有 HTML、UI 或可渲染输出变化，因此不制作截图；这不是缺少验证，而是避免用与改动无关的图片制造归档噪声。Java v1872 与 mini-kv v1667 展示文档均可并行，Node 不读取它们的未提交内容，也未触发 live capstone。
