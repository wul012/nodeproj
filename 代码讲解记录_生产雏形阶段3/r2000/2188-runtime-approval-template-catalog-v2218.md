# Node v2218 代码讲解：把批准模板的数据、完整性与目标校验分成三层

## 一、Goal 与 Non-goal

本版目标是把 216 行模板构造函数中的稳定数据提取为可审计定义，并让 catalog 自己拒绝数量、顺序、
路径和字段语义漂移。非目标是生成真实批准输入、填充操作者身份、开启 runtime gate、启动 Java 或
mini-kv、执行 loopback smoke 或改变任何模板文本。结构优化不能被解释为新增授权。

## 二、公开 Entry point 没有迁移

消费者仍从原超长文件名导入 `createRuntimeExecutionApprovalInputTemplates`、三个 target 常量和目标
validation 函数。validator、canonical value validation 与 live-read gate 不需要改导入路径。
新子目录只是内部实现边界，公开 facade 继续承担兼容层，避免把重构成本扩散到长证据链。完整性校验
从内部 `validation.ts` 由 facade 调用，破坏测试直接测试内部边界，没有把测试 seam 暴露成新公共导出。

## 三、catalog 的输入与输出模型

创建函数没有参数，输出仍是三项 `RuntimeExecutionApprovalInputTemplateDefinition[]`。每项按既有顺序
包含 key、owner、targetPath、templateArchivePath、schemaVersion、inputKind、requiredFields、
expectedConstants、semanticRules、template 与 templateDigest，字段顺序和类型都未变化。

## 四、旧函数为什么成为热点

旧实现连续三次调用 `createTemplate`，每次都内联几十个 required field、expected constant、规则和
模板正文。修改目标验证行为时必须越过 200 多行数据，修改一个路径时又容易误碰摘要逻辑。数据与
算法共享编辑区域，是维护成本的根因，而不是单纯的行数过多。

## 五、为何不建立三个复制模板文件

三个 case 结构完全相同，若每个文件各写一套 factory，就会违反三次规则。v2218 用单个
`definitions.ts` 保存有序 case 数据，共享的摘要、深拷贝与验证行为留在 catalog。维护者能连续比较
三类模板差异，同时不会出现三个近似函数以后各自漂移。

## 六、constants 模块只拥有稳定路径

`constants.ts` 只有 node window target、operator approval target、cross-project packet target 和
template root 四项。definitions 与 catalog 布局契约都消费同一常量，原公开文件再 re-export，
所以内部没有第二份路径字符串，外部也不感知所有权移动。

## 七、definitions 模块为何没有运行时分支

定义文件只声明 `TemplateInput[]`，没有读取配置、环境变量、时钟、文件系统或兄弟项目。三个对象
按 node window、operator record、cross-project packet 固定排列，模块末尾仅冻结数组和顶层条目。
它回答“模板是什么”，不回答“目标是否存在”或“是否允许执行”。

## 八、TemplateInput 类型如何避免双份接口

`RuntimeApprovalTemplateInput` 直接由公开 definition 类型去掉 `templateDigest` 得到。数据文件不手写
第二份字段接口，catalog 也复用同一类型。未来公开模型新增必填属性时，definitions 会立即在
typecheck 报错，不能静默让数据定义落后于响应模型。

## 九、顺序为什么是协议的一部分

validator 按数组顺序生成 target validations、bundle 摘要和 blockers，调用方也展示模板列表。
因此 node window 必须先于 operator record，cross-project packet 必须最后。独立
`EXPECTED_TEMPLATE_LAYOUT` 与数据定义逐索引比较，交换两项即使键集合没变也会失败。

## 十、旧行为 oracle 如何取得

源码修改前直接调用公开创建函数，对完整数组执行 `JSON.stringify`。结果精确为 7,304 字节，
SHA-256 为 `ead27560546b4dda1a640ec3141378573f5fd9cb395a6b617f7096cfcd85b08b`。
测试先写入这些值并因 definitions 模块不存在而红，之后没有改动期望。

## 十一、三个 templateDigest 的独立证据

node window 摘要是 `258c81...dfec8`，operator record 是 `94fe91...ae03`，cross-project packet 是
`5d244a...0ad7`。完整 catalog 摘要能发现字段或顺序漂移，三个正文摘要能定位漂移属于哪类模板。
双层 oracle 比只断言摘要格式为 64 位十六进制更有辨别力。

## 十二、node window 模板负责什么

第一项定义批准窗口 id、共享 correlation id、有效时间、Java 与 mini-kv loopback host/port、GET-only
方法和 cleanup 要求。它绑定 Node v402、来源 Node v401、Java v165 与 mini-kv v156，但正文仍使用
`REQUIRED-*` 占位符，不包含真实批准窗口或操作者提供的时间。

## 十三、node window 的常量边界

expectedConstants 固定 schema、input kind、四项目版本、`upstreamActionsEnabled=false` 与
`cleanupRequired=true`。这些值必须在模板正文中逐项相等；运行校验不接受“定义声称 false、正文却
写 true”的自相矛盾。动态 id、时间和端口语义则由 required fields 与 semantic rules 表达。

## 十四、node window 的语义规则

三条规则分别要求 HTTP 方法仅 GET、notBefore/notAfter 使用批准者给出的明确 ISO 时间，以及两个
loopback 端口属于同一 runtime window。目标 validation 仍用原 `countPassedSemanticRules` 实现，
本版没有把自然语言规则变成新的执行器，也没有改变通过数量算法。

## 十五、operator record 模板负责什么

第二项把 correlation id、approved window id、operator id、verified 标志、绑定版本、approval scope、
GET-only 方法、issuedAt 与 cleanup acknowledgement 收在一份记录中。它连接人类批准与窗口，却
明确不批准 credential value read 或 raw endpoint URL parsing。

## 十六、operator record 的安全常量

`operatorVerified` 与 `cleanupAcknowledged` 必须为 true，而两个敏感批准项必须为 false。catalog
同时验证 expectedConstants 与模板正文一致，目标 validation 仍要求真实输入中的 correlation id
不是 `REQUIRED-*`。模板发布本身不会伪造一个已验证操作者。

## 十七、cross-project packet 模板负责什么

第三项引用前两份 canonical input、Node v401 archive、Java approval evidence 与 mini-kv final
evidence，并声明三项目版本、packet 状态、GET-only 方法和 cleanup proof。它是完整包的形状，
不是包实例；packetId 与 correlation id 仍是显式占位符。

## 十八、serviceOwners 与 loopback 怎样表达

模板正文保留 java、miniKv、node 三个 owner，以及 Java `127.0.0.1:8080` 和 mini-kv
`127.0.0.1:6424`。结构化对象让后续 live gate 能读取 owner、host 与 port，但本版不会解析新的
外部 URL，也不会据此启动进程。端点数据仍停留在审批输入模板层。

## 十九、smokeCommands 与 cleanupRules 的边界

packet 只列出 Java `/actuator/health` 与 mini-kv `/health` 两条 GET 命令，并规定仅停止本次拥有的
进程、停止两个服务和归档 cleanup proof。它没有 shell 命令字符串、PID 或启动动作。live smoke
必须另有批准和拥有者记录，不能因模板中出现 path 就绕过 gate。

## 二十、create 函数为何只剩三行

入口先调用 `validateRuntimeApprovalTemplates`，再把有序 definitions 映射到 `createTemplate`。三行
分别表达完整性、实例化和返回，不隐藏额外分支。原 216 行函数退出长函数账本，数据主体仍完整可见，
只是移动到真正拥有稳定模板内容的模块。

## 二十一、为何每次读取必须 structuredClone

旧函数每次执行对象字面量，天然返回新的数组与嵌套对象。若新 catalog 直接 spread 顶层定义，
requiredFields、template.serviceOwners 等嵌套值会被多个调用共享。`structuredClone` 恢复旧隔离语义，
调用者修改一次读取不会污染后续 validator 或 live gate。

## 二十二、隔离测试如何主动证明

测试先读取两份 catalog，再向第一份 requiredFields 加入探针，并替换 cross-project template 的
serviceOwners。第二份仍保留原数组与三个 owner，第三次读取又与第二份深度相等。该断言能抓住
浅拷贝实现，即使完整字节 oracle 在未发生修改时暂时看不出共享问题。

## 二十三、摘要生成语义保持什么

`createTemplate` 对 clone 后的 template 调用原 `sha256StableJson`，再把 digest 放在对象最后。
stable JSON 算法、摘要覆盖范围与调用时机都没变。摘要不包含 owner、targetPath 或 semanticRules，
因此完整 catalog SHA 继续补充这些外围字段的等价证据。

## 二十四、对象属性顺序为什么仍一致

definitions 中每个对象按旧 `createTemplate` 输入顺序书写，structuredClone 保持对象枚举顺序，返回时
先展开 input、最后追加 templateDigest。完整 JSON 的 7,304 字节 oracle 已经验证属性顺序没有漂移，
不是只比较排序后的 stable digest 后推测响应相同。

## 二十五、冻结 definitions 解决什么

数组和每个顶层 definition 在模块初始化时冻结，catalog 不能 push、重排或替换 key/path。嵌套值
不会直接交给公共消费者，而是在每次读取时深拷贝。冻结保护内部基准，clone 保护外部调用隔离，
两者职责不同，不能用一个浅 spread 同时冒充。

## 二十六、数量校验为何必须先执行

空数组可能满足某些 `every` 条件，但绝不表示三类批准输入齐全。校验器第一步要求精确三项，缺失或
多余都抛出 `exactly 3` 错误。这个门在每次公开读取前运行，使定义文件被误编辑时不会发布残缺
catalog，也不会等到更深的 validator 才以模糊计数失败。

## 二十七、布局校验覆盖哪些字段

每个索引独立比较 key、owner 与 canonical targetPath。三者任一漂移都报告具体 index 的 layout
mismatch。目标路径使用 constants，布局契约与定义数据彼此独立；测试交换前两项并修改第一项目标，
两种情况都在摘要生成前失败。

## 二十八、archive path 校验的意义

templateArchivePath 必须位于 `e/402/input-templates/`，且不能等于 concrete targetPath。这样模板
归档与真实批准输入位置保持分离，避免模板占位符被误当成实际批准文件。该检查不写文件，只验证
定义字符串；目标文件读取仍由显式 `readCurrentTarget` 选项控制。

## 二十九、requiredFields 如何 fail-closed

校验器要求字段列表非空、无重复，并且每个字段在模板正文中具有非 null、非空值。占位符在模板层
属于存在，真实输入层仍由目标 validation 判断其是否 concrete。测试把 node window requiredFields
清空后立即失败，不能用空集合逃过完整性检查。

## 三十、expectedConstants 怎样校验语义一致

每个 expected constant 必须在模板同路径上严格相等，布尔 false 不会被 truthy 判断误伤。测试把
operatorVerified 的期望从 true 改成 false，而正文仍为 true，catalog 报 expected constants 错误。
这保证说明层与可复制模板正文不会产生两份互相矛盾的安全事实。

## 三十一、schemaVersion 与 inputKind 为何优先检查

这两个字段同时存在于 definition 元数据和 template 正文，是模板身份。校验顺序先报告 identity，
再检查一般 constants，使 schema 漂移得到准确诊断。主动破坏测试最初暴露了分类顺序不够精确，
实现随后前移 identity 检查，而不是放宽测试或接受模糊错误。

## 三十二、semanticRules 如何防空与重复

规则数组必须至少一项、每项 trim 后非空且集合大小与数组长度一致。catalog 不解释自然语言规则，
但确保说明没有缺失、空白或复制两遍。测试清空 cross-project rules 后失败；具体三条规则如何计数，
仍由既有 key 分支完成，保持 validator 响应不变。

## 三十三、target validation 的默认行为

`createRuntimeExecutionApprovalInputTargetValidation` 默认不读取当前 target，使用 exists=false 的
合成文件记录，并返回 present/valid false。只有调用方显式传 `readCurrentTarget:true` 才读 canonical
路径。本版没有改默认值，也没有在 catalog 创建阶段偷偷访问磁盘。

## 三十四、真实输入检查如何保持

目标校验继续统计缺失 required fields、匹配 expected constants 和通过 semantic rules 的数量，只有
文件存在且三组计数全部满足才 valid。`canUnlockRuntimeAlone` 仍固定 false。数据提取没有把模板自身
视为目标输入，更没有用 definitions 的完整性替代 concrete approval validation。

## 三十五、templateDefinitionComplete 仍做什么

该 helper 仍按 key 查找模板，要求 requiredFields、expectedConstants、semanticRules 非空且 digest
格式正确。它没有复制模板正文，也没有新增路径规则。更严格的 catalog 校验发生在创建之前，原 helper
继续服务现有 validator 的检查项，因此下游 profile 的 check count 与语义保持。

## 三十六、consumer service flow

template validator 读取 catalog 并构建三份 target validation；canonical value validation 再检查实际
值与交叉 correlation；live-read gate 只 re-export 后的三个 canonical target 常量并消费前一步结果。
公开入口不变使整条链继续单向依赖，definitions 不反向导入 validator 或 live gate。

## 三十七、forced historical fallback 证据

validator 测试直接设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，确认 Java v165 与 mini-kv
v156 历史证据仍能组成 3 模板、22/22 检查通过且 runtime packet 仍未就绪。数据拆分没有把 sibling
绝对路径解析或 fallback 选择搬进 definitions，也没有新增新鲜 evidence 前置条件。

## 三十八、canonical 与 live gate 测试覆盖

focused consumer 矩阵穿过 compatibility intake、canonical precheck、canonical value validation、
live-read gate 和 approved local loopback smoke。它们验证模板完整时仍不会自动启动服务，目标输入
缺失时仍保持 gate closed，批准与执行之间的既有分层没有被 catalog 重构穿透。

## 三十九、为什么本版没有生成批准数据

三个 canonical target 位于 `e/398/input/`，但本版只保留路径字符串，没有创建这些文件。测试使用
缺失状态与历史 fixture 验证，不伪造 window id、operator id、correlation id 或 packet id。用户给予
自动推进权限不等于可以替用户签署真实批准，安全边界继续由实际输入文件和 gate 判断。

## 四十、维护性结果说明什么

公开 catalog 从 373 行降为 150 行，definitions 233 行、内部 validation 104 行、constants 4 行。
216 行 create 函数降为 3 行，新增完整性校验均可一屏阅读。账本从 85/104/226/0 收紧到
85/103/226/0，没有新增近限文件、
复杂函数或导入环，也没有把数据文件排除在源码扫描之外。

## 四十一、测试、typecheck 与批次节奏

catalog 与 validator 通过 2 文件、6 项测试，最终 consumer 矩阵通过 10 文件、25 项测试，覆盖强制
历史回退、compatibility、canonical precheck/value validation、live-read gate 与 approved local
loopback smoke。typecheck、仓库级零警告 lint、七项静态门和讲解质量门全部通过；安全扫描覆盖
8,322 个文件并通过 18/18，renderer 保持 242 个标准化、3 个豁免、0 个非豁免遗留，源码没有超过
800 行的文件，维护性账本收紧为 85/103/226/0。

批末只执行一次完整验证：八个分片限制最多 4 个 worker，共覆盖 578 个唯一文件、1,758 项测试，
零失败且跨片零重复。独立 `vitest list` 也收集到 578 个文件、1,758 项测试；把两边统一为“文件路径
+ suite 层级 + case 标题”后做双向集合比较，遗漏和额外项均为 0。TypeScript build 随后通过。
受保护 smoke 显式开启 rehearsal enforcement 并携带 operator/role/approval headers，health 200，三份
Java/mini-kv 证据都解析到仓库内 historical fixtures，30/30 检查通过；受控预览仍为 blocked、
execution=false、connectsManagedAudit=false。ops summary/readiness 在既有非 enforcement 模式返回
200，仍未打开生产执行。所有 smoke 进程均按 PID 停止，31218 端口释放；远端 CI 只在批次推送后跑一次。

## 四十二、Java 与 mini-kv 并行关系

本版使用已有字符串和冻结历史证据，不要求 Java 或 mini-kv 产出新版本，也不写它们的工作树。
两项目可以继续各自的维护计划，Node 不是前置批准者。批末 smoke 仍只验证 Node 的历史 fallback；
不会借本次模板重构启动兄弟服务或进入新的 live integration。

## 四十三、后续修改应走哪条路径

修改 canonical 路径只进入 constants 并同步布局 oracle；修改模板字段进入 definitions，并同时考虑
requiredFields、expectedConstants 与正文；修改文件读取或语义计数进入公开 catalog。新增第四类模板
必须先明确消费者和安全必要性，再扩展精确数量、顺序测试与运行校验，不能只向数组尾部塞对象。

## 四十四、明确失败条件

完整 JSON 字节或三个 digest 漂移、调用间共享嵌套对象、坏定义未抛错、目标路径改变、fallback 失败、
live gate 意外打开、真实批准文件被生成、账本放宽或兄弟进程被启动，均判定 v2218 失败。不能通过
改 oracle、删除破坏测试或把 validation 绕开来得到绿灯。

## 四十五、One-sentence summary

v2218 在三份模板的 7,304 字节响应、摘要、顺序、路径和 gate 行为全部不变的前提下，把 216 行构造
热点改造成无分支 case 数据、稳定常量与 fail-closed catalog，并以深拷贝隔离、主动破坏测试和完整
消费者链证明这次优雅度提升没有制造任何真实批准或执行权限。
