# v2223-v2227 证据 intake 边界与命名收敛批次

## 目标与必要性

本批次只做内部维护，不增加功能、路由、报告、fixture、审批输入、网络访问、写路径或执行权限。
当前维护性基线为 83 个近限文件、98 个长函数、217 个复杂函数、0 个导入环。四个相邻家族
已经形成一个可复现的集中热点：两组 Java/mini-kv 生命周期 evidence intake、预实现计划 intake
和预检 receipt references 合计占 1 个近限文件、9 个长函数、6 个复杂函数；相关 `src/`
文件还贡献 93 条超过 40 字符的文件名或导出名违规。

这些模块的外部契约是稳定的 HTTP 路由、JSON/Markdown 字节、摘要、checks/blocker 顺序和
失败关闭语义，内部实现却仍以“把整个业务句子塞进文件名和标识符”表达边界，并在多个文件
复制 JSON/BOM 读取、深层取值、字符串/数值收窄、集合包含和 digest 校验。继续在这种结构上
维护字段，会把一次契约变更扩散到 loader、checks、renderer、archive verifier 和测试。

本批采用 Java v1882 已证明的 bounded-context 做法：目录表达领域上下文，文件和导出只表达
局部职责；同时借鉴 mini-kv v1674 的 fail-closed ownership 思路，让一个短小共享内核拥有
项目内 JSON 证据读取和安全收窄。Node 不复制 mini-kv 的 manifest 机制，因为 TypeScript 的
模块发现、导入图和现有 elegance/family ratchet 已能机械约束所有权。

## Step 0 对账

- Node：`605560d5`，工作树干净且与 `nodeproj/master` 同步；最新里程碑 tag 为 v2222。
  Node Evidence 修复 run `29803696909` 已通过 579 个测试文件、1,765 项测试、coverage、build
  与安全 smoke。起始基线为 83 / 98 / 217 / 0，elegance name debt 为 4,537。
- 目标家族精确 census：25 个 `src/` 文件、93 条命名违规。筛选表达式为
  `OperatorServiceLifecycleEvidenceIntake|DeclaredOperatorLifecycleEvidenceIntake|`
  `PreImplementationPlanIntakeUpstreamEchoVerification|PrecheckUpstreamReceiptVerification`。
- Java：提交 `5ebe1c06` / tag `v1882-order-platform-sustainment-renderer` 已同步；另一会话正在
  编辑 v1883-v1887 route split，本批只读，不构建、不测试、不修改。
- mini-kv：提交/tag `10b392a0` / v1674 已同步；仅有用户维护的 README 展示简报改动，本批
  只读，不构建、不测试、不修改。
- Java 与 mini-kv 推荐并行推进。Node 只消费已有 frozen historical fixtures，不要求新鲜
  上游版本，也不是兄弟项目的前置批准方；本批不启动或停止兄弟项目服务。

## 需求-证据矩阵

| 要求 | 实现边界 | 机械证据 | 状态 |
| --- | --- | --- | --- |
| 项目 JSON 证据读取只有一个安全内核 | `src/evidence` 提供 BOM-safe、missing/invalid/null-safe 的读取与类型收窄 | helper 单测覆盖 BOM、非法 JSON、数组 root、缺文件、非有限数和深路径 | v2223 passed |
| CI action runtime 不依赖弃用的 Node 20 action runtime | checkout/setup-node 升至官方 v7，项目运行时仍固定 Node 22、npm cache 不变 | workflow diff、YAML 静态检查、批次末远端 CI | v2223 local passed; remote pending batch close |
| operator service lifecycle 成为可读 bounded context | 短目录/短文件/短导出，loader 与 checks 分层 | 完整 profile oracle、route/archive tests、name/maintainability ratchet | v2224 passed |
| declared lifecycle 复用同一内核和目录语汇 | 不创建第三套 reader/check engine | 完整 profile oracle、负向测试、导入环为 0 | v2225 passed |
| 758 行预实现 intake 不再承担读取、引用、检查和组合四责 | sources/checks/profile 分离并复用已有 historical helper | local/forced fallback、JSON/Markdown hash、维护性基线 | v2226 pending |
| v108 预检 receipt 使用声明式字段映射和具名安全谓词 | references 不再拥有 153 行复杂 builder | 缺失/错类型 fail-closed、完整输出 parity | v2227 pending |
| 文档先于最终验证 | 每版 explanation/evidence/中文 walkthrough | 每篇至少 3,000 中文字符且通过文档门 | 每版阻塞项 |
| CI 按批次执行 | 每版 focused/typecheck/lint/static；v2227 后一次 full/build/smoke/CI | 单次最终 run；失败只允许证据化根因修复 | pending |

## 数据与行为边界

新文件 family 实现前必须在源码顶部用不超过 10 行说明以下边界：

1. `src/evidence/projectJson.ts` 只负责“读取和安全收窄”，不理解 Node 版本、route、readiness
   或 blocker；缺失、非法 JSON、数组 root 和错类型必须返回失败关闭值。
2. `src/services/operatorLifecycle/` 的 sources 拥有上游字段映射，checks 拥有领域判定，profile
   只拥有组装顺序；renderer 与 archive verifier 不反向拥有读取逻辑。
3. `src/services/preImplementation/` 和 `src/services/precheckReceipt/` 沿用同样分界，但不得
   为追求通用性把不同版本的字段塞进无类型大配置。
4. 目录名承担上下文后，局部导出采用 `ServiceIntakeProfile`、`DeclaredIntakeChecks`、
   `renderServiceIntakeMarkdown` 等短名；HTTP 字段名和用户可见文本一律不改。
5. 兼容 facade 只有在真实外部 TypeScript 消费者存在时才保留；本仓私有内部 import 直接迁移，
   不用超长 alias 假装消除了命名债。

## v2223：共享证据读取内核与 CI runtime

新增短小的 project evidence access 模块，统一当前 lifecycle intake 重复的：文件存在判断、UTF-8
BOM 去除、JSON object root 守卫、深路径读取、string/finite-number/string-array 收窄、required
集合检查和 SHA-256 形状判断。优先复用 `jsonEvidenceUtils`，不得复制 JSON parser；API 名均不超过
40 字符。先迁移两组 lifecycle intake 的底层 reader helper，保持领域 reference/checks 暂不改名。

同时将 `.github/workflows/node-evidence.yml` 的 `actions/checkout` 和 `actions/setup-node` 从 v4
更新到官方 v7；项目 `node-version: "22"`、npm cache、权限、trigger 和 smoke 全部不变。该变更
消除 GitHub-hosted runner 的 Node 20 action runtime 弃用警告，不得借机改 CI 行为。

本版预期至少移除两组文件中重复的 reader/value/string/number/includes/digest/BOM helper；若
维护性计数尚未下降，至少不得增长。先冻结 lifecycle profile 的 JSON/Markdown hash，再改源码。

### v2223 收口证据

新增 56 行 `src/evidence/projectJson.ts`，以既有 `parseJsonEvidence` 统一 BOM-safe 解析，并明确
拒绝 missing、invalid、array/null/scalar root、非有限数值与错误 digest。两份 lifecycle intake
各删除七个重复 helper，从 589/554 行降为 551/516 行。固定时间下 local/forced fallback 的两份
完整 JSON/Markdown 共八组长度与 SHA-256 在改造前后完全一致，未修改期望或 fixture。新增单测、
既有领域测试与讲解门共 4 文件 16 项通过，3,230 个中文字符和 13 个可扫描章节达标；typecheck、
定向 lint 和七项静态门通过。elegance 仍为 4,537，
受管 family 仍为 52，维护性仍为 83/98/217/0，均无增长；实际热点在 v2224/v2225 拆除。
checkout/setup-node 已更新到 v7，同时保留 Node 22、npm cache、permissions、trigger 与 smoke。

## v2224：operator service lifecycle bounded context

把 operator service lifecycle 的 profile、types、sources、checks、renderer 与 archive verification
迁入 `src/services/operatorLifecycle/`。目录承担领域前缀，文件名和新导出名均不超过 40 字符；route
和测试改用短 API。将 178 行、复杂度 88 的 `createChecks` 拆为按 source/Java/mini-kv/boundary
分组的具名谓词或短 check builder，loader 降到 120 行以内。

JSON/Markdown 对象键、插入顺序、summary、digest、blocker、warning、recommendation、route 路径、
profileVersion 与 historical fallback 必须逐字不变。archive verifier 同步进入该上下文，但不做
与 profile 重构无关的行为变化。

### v2224 收口证据

7 个超长生产文件和 2 个测试迁入 `operatorLifecycle/`，由 10 个短职责文件承接 intake、sources、
checks、profile、renderer 与 archive；仓内消费者全部使用短 API，未保留兼容 alias。目标家族
32 条命名违规归零，全仓 name debt 从 4,537 收紧为 4,505。178 行/复杂度 88 的主 checks、146 行
loader 和复杂度 35 的 archive checks 均由具名分组与谓词替代，维护性从 83/98/217/0 收紧为
83/96/215/0。固定时间下 local/forced fallback 的 intake 45/45、archive 37/37，完整 JSON/Markdown
八组长度和 SHA-256 与改造前完全一致；fixture 与期望未修改。renderer census 的顶层扫描盲点同步
修复为递归 `**/*Renderer.ts`，结果恢复 242/245，嵌套路径由单测锁定。route 仍为 80，顶层 service
为 1,118/1,125；typecheck、lint、7 文件 21 项 focused、governance 和七项静态门通过，讲解含
3,050 个中文字符和 14 个可扫描章节。

## v2225：declared lifecycle 收敛

把 declared lifecycle 家族迁入同一 bounded context，以 `declared*` 局部词汇区分，不重复
`JavaMiniKv...EvidenceIntake` 整句。复用 v2223 reader 与 v2224 checks 组织方式，拆除 159 行、复杂度
85 的 `createChecks` 和 142 行 loader。相似结构第三次出现时必须先抽取共享 engine；不同版本的
业务规则继续由具名谓词表达，不做巨大动态 schema。

完整输出、frozen v151/v152/v161 语义、runtime gate blocked、no-start/no-stop/no-write 边界不变。

### v2225 收口证据

`operatorLifecycle/` 最终按 `service/` 与 `declared/` 两个子域组织，避免在同一目录制造第三份
`Types/Checks/Renderer` family。declared 的 7 个长生产文件与 2 个测试已迁移，公共入口缩为
`loadDeclaredIntake`、`loadDeclaredArchive` 及两个短 renderer；目标家族 30 条命名违规归零，全仓
name debt 从 4,505 收紧为 4,475。新 `checkAssembly.ts` 由四条 lifecycle 路径共同消费，严格要求
readiness 键存在、至少一个 evidence check 且所有值为布尔真，同时保持键序和输入不可变。

固定时间下四份 profile 与四份 Markdown 共八个完整 oracle 在重构前后全部逐字节一致；declared
intake 保持 15,237/13,047 字节，archive 保持 12,938/11,272 字节，45/45 与 38/38 checks、摘要、
blocker 顺序、route 和安全字段均未漂移。最终 17 文件 65 项 focused/static tests、typecheck 与定向
零告警 lint 通过；安全 18/18、归档 64.45 MiB、renderer 242/245 且 3 个均有 composition waiver、
源码 0 个超过 800 行。维护性从 83/96/215/0 收紧为 83/94/213/0，52 个受管 family 与 0 个导入环
不变；讲解含 3,930 个中文字符和 18 个章节。Java 与 mini-kv 继续 recommended parallel，Node 不要求
新鲜上游证据。

## v2226：预实现计划 intake 分责

把 758 行 pre-implementation intake 迁入 `src/services/preImplementation/`，拆为 sources、checks、
profile、types、renderer。上游历史 evidence 元数据复用 `historicalEvidenceReportUtils`；项目内 archive
JSON 复用 v2223 内核。Java/mini-kv reference builder 按 evidence identity、receipt shape、boundary
readiness 分组，`createChecks` 只按原键顺序组装。

本版必须删除该近限文件和其中 4 个长函数、2 个复杂函数，不得把热点平移到新文件。

## v2227：预检 receipt 声明式收敛与批次验收

把 precheck receipt 家族迁入 `src/services/precheckReceipt/`。Java v99 和 mini-kv v108 reference
复用 `evidenceFile`、`snippet`、`readJsonObject`、`mapReceiptFields` 与 `snippetMatched`；v108 字段
按 text/flag/count 规格声明，root-over-nested 的兼容字段保持显式 `??` 优先级。153 行、复杂度 95
的 mini-kv builder 以及复杂度 21 的 Java builder 必须消失，readiness 由 identity、fixture、CLI、
no-network/no-write 等具名谓词组成。

本版结束时精确重跑 93 条目标命名 debt census。目标是全部新/触及 API 均不超过 40 字符，并将
全仓 name debt 至少从 4,537 收紧到 4,470；未达到 67 条净减少视为批次未完成。维护性目标至少
为 82 / 89 / 211 / 0；实际下降更多时按实际值刷新 baseline，绝不保留宽松余量。

## 每版交付物

- `d/<version>/evidence/`：冻结 hash、focused/typecheck/lint/static 结果和前后 census；
- `d/<version>/解释/`：必要性、边界、失败条件、验证结论和三项目并行说明；
- `代码讲解记录_生产雏形阶段3/r2000/`：每版一篇中文讲解，至少 3,000 中文字符，重点解释
  调用链、数据/行为所有权、失败关闭和 byte parity，不写巨型逐行 walkthrough；
- 本批无 HTML/UI 变化，截图不适用；每版解释写明省略原因，不创建空图片目录；
- 每版独立 commit 与 lightweight tag，批次末统一 push。

## 验证节奏

每版在源码变更前后运行相同固定时间、local/forced historical fallback 的完整 profile oracle；
执行相关 focused tests、typecheck、定向零警告 lint、security/archive/elegance/family/renderer/
source-size/maintainability 和讲解质量门。完整 repo lint、最多 4 workers 的有界全量测试、独立 test
discovery、build、受保护 HTTP smoke、清理和远端 Node Evidence CI 只在 v2227 后执行一次。

长验证期间只做下一版只读准备，不并行改写同一文件。任何 timeout 先单文件、再相关组，不能用
提高 timeout 掩盖断言或资源泄漏。build 后删除 `dist`；只停止本批启动的 PID。

## 失败条件

- 修改测试期望、fixture 或 historical evidence 字节来迁就错误输出；
- route、profileVersion、JSON/Markdown 键序、digest、blocker 或用户可见文本漂移；
- missing/invalid/BOM/array-root/错类型证据被判为 ready；
- `??` 被 `||` 取代而改变 false、0、空字符串语义；
- 新 shared helper 理解具体版本或业务 route，或第三个模块复制同类 reader/check engine；
- 超长兼容 alias 留在 touched API、目标命名债净减少于 67、任一维护性计数增长；
- 新增结构 family 却没有先建立共享 engine，或刷新 baseline 时放宽任何现存 ceiling；
- CI action 更新改变 Node 22、cache、permissions、trigger 或 smoke 行为；
- 新增网络/写/执行权限，修改或启动 Java/mini-kv，或重复推送调试 CI。
