# v2225 declared operator lifecycle 边界收敛说明

## 为什么要做

v2224 已经证明 operator service lifecycle 可以在不改变 HTTP、JSON、Markdown 和安全边界的情况下迁入 bounded context，但 declared lifecycle 仍以完整业务句子命名七个生产文件、十余个导出，并把证据读取、45 项判定、公共 profile 装配和归档复验塞在两个大入口中。继续沿旧结构维护字段，会迫使修改者同时理解 Java v161、mini-kv v152、冻结 v151、Node v387/v388 归档与 runtime gate 禁止项。v2225 的目的不是增加一层治理，而是让目录承担上下文，让文件和符号只承担局部职责。

## 实际改造

`src/services/operatorLifecycle/` 现在包含 `service/` 与 `declared/` 两个对称但独立的子域。declared 子域由 `intake.ts` 编排，`sources.ts` 收窄上游数据，`intakeChecks.ts` 按 source、Java、mini-kv、runtime boundary 组织判定，`profile.ts` 独占公共对象键序，renderer 只格式化。archive 同样把 38 项检查拆到 `archiveChecks.ts`，按 JSON、归档资产、冻结 replay 与禁止执行边界分组。旧超长导出全部替换为 `loadDeclaredIntake`、`loadDeclaredArchive`、`renderDeclaredIntakeMarkdown` 和 `renderDeclaredArchiveMarkdown`，未保留长 alias。

两套子域共同使用 `checkAssembly.ts`。该函数不懂 Node 版本、route 或领域字段，只做四件事：确认 readiness 键存在；排除该键后至少存在一项证据；要求每项值严格等于 `true`；返回保持原键序的新对象而不修改输入。这样第三次出现的 aggregate-ready 模式不再复制，同时具体业务判断仍留在自己的 checks 文件中。

## 行为与失败关闭

固定时间 `2026-07-21T00:00:00.000Z` 下，service intake/archive 与 declared intake/archive 共八份完整输出在改造前后逐字节相同。declared intake 仍为 15,237/13,047 字节，declared archive 仍为 12,938/11,272 字节，四个 SHA-256 均未变化。checks 仍分别为 45/45 与 38/38，blocker、warning、recommendation、evidence endpoint、对象键序和 digest 输入都保持原合同。

共享聚合器新增四类负向证明：任一证据为 false 时关闭；只有 readiness 键时关闭；运行时混入数字 `1` 时关闭；输入对象不被修改且中间位置的 readiness 键不发生重排。原有两份 declared 测试继续覆盖归档缺失、历史 fallback 与受保护 route。没有修改测试期望、fixture 或 historical evidence 来适配实现。

## 维护结果

全仓超过 40 字符的命名债由 4,505 收紧到 4,475，其中文件债 977 降到 970、导出债 3,528 降到 3,505；目标家族的 30 条违规归零。维护性账本由 83/96/215/0 收紧到 83/94/213/0，旧 intake loader、旧 intake checks 和旧 archive checks 的账本项消失，替代函数没有重新进入长函数或复杂函数名单。受管结构 family 仍为 52，导入环仍为零，baseline 只按实际结果向下刷新。

## 边界与并行

本版没有新 route、网络、写路径、凭据读取、raw endpoint 解析、managed-audit 连接或执行权限；Node 不启动、不停止也不修改 Java 与 mini-kv。两项目可以继续并行，Node 仅消费仓内已有 frozen historical fixtures，不要求新鲜上游版本，也不是它们的审批阻塞方。本版没有 HTML/UI 变化，截图不能证明 TypeScript 责任边界或字节等价，因此不创建图片目录；完整输出摘要与机械门是更直接的证据。
