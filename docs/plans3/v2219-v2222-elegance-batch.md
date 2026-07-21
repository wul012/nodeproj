# v2219-v2222 判定与证据读取收敛批次

## 目标与必要性

本批次是纯维护重构，不增加功能、路由、报告、fixture、批准输入或执行权限。机械基线已经把
三个安全判定组合根列为全仓最高复杂度热点（117、114、100），并把两份历史证据消费者列为
600 行以上大文件；后两者还各自复制了 JSON 读取、字段默认值和 readiness 长链。继续绕开它们
会让任何字段增删都同时修改类型、读取、默认值、对齐判断和服务组合根，审查者无法快速回答
“缺字段是否仍然失败关闭”。因此本批直接处理根因，而不是再增加一层报告或验证链。

起始维护性基线为：大文件 85、长函数 103、复杂函数 226、导入环 0。四版完成后至少应删除
2 条大文件债务、5 条长函数债务和 9 条复杂函数债务，保守目标为 83 / 98 / 217 / 0。
基线只能收紧；若实际拆分产生新的超限项、复杂函数或导入环，本批失败。

## Step 0 对账

- Node：`caedc542`，工作树干净且与 `nodeproj/master` 同步；最新版本 tag 为 v2218
  (`f5fa295a`)。唯一批次 CI `29794003784` 已通过 578 文件、1,758 测试、build 与 smoke。
- Java：`d9fc4c84` / v1880 已提交并同步；工作树存在另一会话的 v1881 renderer 收敛改动，
  本批只读且不触碰。可借鉴其“具名 renderer + 共享 MarkdownSections”的组合方式。
- mini-kv：`10b392a0` / v1674 已提交并同步；仅有用户维护的
  `治理计划/readme-exhibition-brief.md` 改动，本批只读且不触碰。可借鉴 v1672-v1674 的
  声明式命令表和 manifest ownership。
- Java 与 mini-kv 均推荐并行推进。Node 只消费已提交的 frozen historical fixtures，
  不要求新鲜上游版本，也不是两项目的前置批准方；本批不启动或停止兄弟项目服务。

## 需求-证据矩阵

| 要求 | 实现边界 | 机械证据 | 状态 |
| --- | --- | --- | --- |
| 两套 resolver echo 检查可按语义阅读 | 复用 `allBooleanFieldsAre`，字段清单受 `keyof` 约束，非布尔规则保留具名谓词 | 固定时间 JSON/Markdown oracle、focused tests、complexity ratchet | v2219 passed |
| disabled candidate 不再是一条 149 行判定链 | review/count/interface/boundary 分组，blocker 复用通用规则收集器 | 完整 profile oracle、负向配置测试、基线收紧 | v2220 passed |
| v111 证据读取只有一个字段真相源 | 复用 `historicalEvidenceReportUtils` 和 `mapReceiptFields`，references 独立拥有解析与 readiness | 本地与强制 fallback 完整字节、缺失值 fail-closed、focused tests | pending v2221 |
| v112 证据读取复用相同范式 | 声明式字段规格、具名 readiness、服务组合根不再拥有底层 JSON helper | 本地与强制 fallback 完整字节、缺失值 fail-closed、focused tests | pending v2222 |
| 文档先于最终验证 | 每版解释、evidence、中文代码讲解 | 每篇至少 3000 中文字符且通过讲解质量门 | 每版阻塞项 |
| CI 不按版本重复运行 | 每版 focused/typecheck/static；v2222 后一次 full/build/smoke/remote CI | 唯一批次 CI run | 批次阻塞项 |

## 数据与行为边界设计

1. `resolverChecks`：字段清单只拥有“哪些布尔字段应为 true/false”；具名谓词拥有计数、
   集合、版本与文本语义；`createChecks` 只按既有键顺序组装结果。
2. `disabledAdapterEvidence`：字段规格拥有 JSON key、目标 key、类型与 fail-closed 默认值；
   reference builder 拥有 evidence/snippet/readiness；顶层服务只组合 profile。
3. `fakeTransportEvidence`：沿用同一读取范式但保留 v112 独有 request/response/cleanup 语义；
   不为追求复用而把两个不同 receipt 合成无类型大配置。
4. 已有 `liveProbeReportUtils` 与 `historicalEvidenceReportUtils` 是共享 engine；本批不得新建
   同义 helper，也不得用 `every(Boolean)` 掩盖没有领域名称的超长匿名布尔数组。

## v2219：resolver echo 判定组合

处理以下两个当前并列最高热点：

- disabled precheck `createChecks`：156 行、复杂度 117；
- test-only shell `createChecks`：156 行、复杂度 114。

实现要求：

- credential、endpoint、connection、write、auto-start 等边界使用类型化字段清单；
- count/list/mode/probe 等跨对象关系使用短小具名谓词，函数名和新文件名不超过 40 字符；
- checks 键、键顺序、blocker 顺序与文字、summary、digest 和 Markdown 字节必须不变；
- 先固化固定时间且强制 historical fallback 的 JSON/Markdown SHA-256，再改源码；
- `allBooleanFieldsAre` 的空/重复/nullable fail-closed 语义不得被绕过。

预期基线最多为 85 / 101 / 224 / 0。

### v2219 收口证据

两套 156 行 `createChecks` 已变为保持旧键序的一屏组合根；字段清单由对象类型约束，
计数、数组、模式、版本和跨对象关系由 12 个短小语义谓词表达。两个改动文件内均无长函数或
复杂函数，账本按预期收紧为 85 / 101 / 224 / 0。固定时间且强制历史回退的 4 份完整
JSON/Markdown 字节与 SHA-256 在源码改动前后完全一致；原业务、fallback、负向开关和 route
测试连同 oracle 共 3 文件 12 项通过。typecheck、定向零警告 lint、七项静态门和讲解质量门
均通过；讲解含 3,470 个中文字符、25 个二级章节。未修改 fixture、路由、执行权限或兄弟项目，
没有创建图片目录或启动后台服务。

## v2220：disabled candidate 策略分层

处理 disabled candidate `createChecks`（149 行、复杂度 100），并把手写 blocker filter/map
迁入已有 `collectFailedReportRules`。review readiness、三方 count 对齐、interface/fake wiring、
五类 side-effect boundary 分别成为具名谓词；纯布尔字段用类型化清单，数组与计数保持显式。

必须保持 25 个 checks 的既有顺序（以实际 oracle 为准）、所有 blocker code/source/message、
默认 blocked 语义与两项 runtime 开关行为。预期基线最多为 85 / 100 / 223 / 0。

### v2220 收口证据

149 行、复杂度 100 的 `createChecks` 已变为 25 个稳定键的组合根；source review、三方计数、
三组 boundary code、interface、fake wiring 与六类副作用边界均有具名谓词，纯布尔字段复用
类型安全 helper。blocker 规则定义不变，收集过程复用通用 engine。固定时间、强制历史回退的
ready profile（25 checks）与 probes/actions 双开 blocked profile（4 个有序 blocker）共四份
JSON/Markdown 字节和摘要在源码改动前后完全一致。focused 与文档门共 4 文件 15 项测试通过，
typecheck、定向 lint、七项静态门均通过；nullable receipt 字段保持严格 true 语义。维护性账本
收紧为 85 / 100 / 223 / 0，策略文件内无替代热点。讲解含 3,370 个中文字符、31 个二级章节；
未修改 fixture、路由、执行权限或兄弟项目，也未启动后台服务。

## v2221：v111 disabled-adapter 证据所有权

拆分 691 行 disabled-adapter upstream echo 服务：

- Java v102 与 mini-kv v111 reference、evidence/snippet/readiness 移入职责明确的 references 模块；
- JSON/object/scalar 读取全部复用 `historicalEvidenceReportUtils`；
- v111 标量字段按 text/flag/count 规格声明并由 `mapReceiptFields` 解析；root 优先于 nested 的
  少数字段保持显式优先级，缺失时仍使用原来的安全默认值；
- readiness 拆成 receipt identity、source precheck、shell shape、side-effect closure 等谓词。

不得改变 absolute-to-historical fallback 解析、evidence 文件顺序、snippet 顺序、digest、
完整 JSON/Markdown 或 stable facade。预期至少移除 1 个大文件、1 个长函数和 3 个复杂函数。

## v2222：v112 fake-transport 证据所有权

按 v2221 已验证的范式拆分 740 行 fake-transport upstream echo 服务，同时保留 v112 独有的
packet/archive、request/response、timeout、cleanup 和 no-write 语义。字段规格必须显式记录
安全默认值；cleanup count 的 `-1` 与所有“允许/执行”字段的 true 默认值不得被普通 falsy
处理破坏。readiness 需要按 packet identity、archive、shape、cleanup 与 side effects 分组。

本版完成后运行批次级 repo lint、全部静态门、最多 4 workers 的有界全量分片、独立 test
discovery、build、受保护 HTTP smoke、清理、四版 push/tags 和一次远端 Node Evidence CI。

## 每版交付物

- `d/<version>/evidence/`：oracle、前后 maintainability 摘要、focused/typecheck/static 结果；
- `d/<version>/解释/`：必要性、数据/行为边界、失败条件、验证与三项目并行说明；
- `代码讲解记录_生产雏形阶段3/r2000/2189..2192-*.md`：中文、每篇至少 3000 中文字符，
  以调用链、字段所有权、失败关闭机理和验证证据为主，不写巨型 Detailed Walkthrough；
- 本批无 HTML/UI 变化，截图不适用；每版解释必须写明省略原因；
- 每版独立 commit 与 lightweight tag，批次末统一 push。

## 验证节奏

每版在源码变更前运行并记录冻结 oracle；变更后执行相同 oracle、相关 focused tests、
typecheck、定向零警告 lint、security/archive/elegance/family/renderer/source-size/maintainability
以及讲解质量门。完整 test/build/smoke/remote CI 只在 v2222 执行一次。长验证期间只做下一版
只读准备，不并行改写同一文件；Vitest workers 上限为 4。

## 失败条件

- 修改测试期望、fixture 或历史证据字节来适配重构后的错误输出；
- checks、对象键、evidence/snippet、blocker 或 Markdown 顺序发生漂移；
- 缺字段、错类型、空字段清单或重复字段被判为通过；
- `??` 被 `||` 取代，导致 false、0 或空字符串的合法值改变；
- 新模块只是转发旧长函数，或创建第二套 JSON/布尔检查 helper；
- 新增功能、路由、网络、写路径、执行权限，或修改 Java/mini-kv 工作树；
- ratchet 放宽、任一债务计数增长、出现导入环，或批次出现多次远端 CI。
