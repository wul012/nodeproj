# Node v2218 归档说明

## 改造目标

公开 approval template catalog 原来同时拥有三份大段模板正文、摘要生成和目标文件验证，导致
`createRuntimeExecutionApprovalInputTemplates` 达到 216 行。v2218 把稳定路径放入 4 行 constants
模块，把 node window、operator record、cross-project packet 三类 case 数据集中放入 definitions，
内部 validation 负责校验布局与字段，公开 catalog 只组合、深拷贝、生成摘要和验证目标文件。既有导入
路径与常量 re-export 保持，破坏测试也不需要向 facade 增加测试专用导出。

## 等价与失败证据

源码修改前，完整 catalog 序列化结果为 7,304 字节，SHA-256 为
`ead27560546b4dda1a640ec3141378573f5fd9cb395a6b617f7096cfcd85b08b`。
重构后该值及三个 templateDigest 原样通过。新测试还修改第一次读取的 requiredFields 与嵌套
serviceOwners，第二次读取保持完整，证明 definitions 没有把可变对象泄漏给消费者。

catalog 每次创建前验证精确数量、有序 key/owner/targetPath、独立 archive path、requiredFields
完整且唯一、expectedConstants 与正文一致、semanticRules 非空且唯一，以及 schemaVersion/inputKind
身份一致。交换顺序、漂移路径、清空字段、修改常量、清空规则和修改身份均会抛出具体错误。

## 可维护性与安全

公开文件由 373 行降为 150 行，定义文件 233 行且没有运行时分支，内部 validation 104 行，常量文件
4 行；216 行构造函数降为 3 行，账本由 85/104/226/0 收紧为 85/103/226/0。没有创建三份批准输入文件，没有启动
Java/mini-kv，没有打开 live-read gate，也没有修改 fixture、模板字节、目标路径或执行权限。
兄弟项目可继续独立并行；本版没有 HTML/UI 变化，因此不创建截图目录。

## 最终验证

定向消费者矩阵最终通过 10 个文件、25 项测试，覆盖模板 validator、强制历史 fixture 回退、
compatibility intake、canonical precheck、canonical value validation、live-read gate 与 approved
local loopback smoke。仓库级 lint 为零错误零警告，安全扫描覆盖 8,322 个文件并通过 18/18 项检查；
归档占用 64.26/80 MiB，renderer 为 242 个标准化、3 个豁免、0 个非豁免遗留，源码没有超过
800 行的文件，维护性账本为 85/103/226/0。

批末八个分片在最多 4 个 worker 下覆盖 578 个唯一测试文件、1,758 项测试，零失败、零重复。
独立 `vitest list` 得到相同的 578 个文件和 1,758 个测试，以文件路径和完整测试名做双向集合比较后，
遗漏与额外项均为 0；TypeScript build 通过。受保护 HTTP smoke 显式开启 rehearsal enforcement，
health 返回 200，Java v154/v153 与 mini-kv v145 三份证据全部解析到仓库内 historical fixtures，
报告 30/30 检查通过；受控预览 JSON/Markdown 返回 200，仍为 blocked、execution=false、
connectsManagedAudit=false。普通 ops summary/readiness 在 enforcement=false 的既有模式下分别返回
200，状态仍 blocked。两个最终 smoke PID 16832、25124 均已停止，31218 端口已释放。

批次统一推送后，GitHub Node Evidence run `29794003784` 在 head `f5fa295a` 上用 Linux runner
通过 typecheck、lint、security、archive、elegance、family、maintainability、全量测试、build、
health、metrics、release evidence readiness smoke 与 server cleanup。远端全量为 578 个文件、
1,758 项测试，测试阶段 795.89 秒，job 总耗时 14 分 19 秒；本批没有触发第二次 CI。
