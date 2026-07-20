# Node v2213 代码讲解：受控只读分片预览的三层编排

## 一、版本目标与非目标

v2213 的目标是把一个 320 行异步 loader 拆成来源获取、策略评估和 profile 装配三种责任，让每个阶段可以独立理解与验证。非目标是新增分片执行能力、缩短现有审查链、修改历史 artifact、改变路由或替兄弟项目启动服务。重构必须保留两种主要状态下的完整 JSON、Markdown、digest、字段顺序和失败关闭判定。

## 二、为什么这个热点值得现在处理

旧函数从 `Promise.all` 开始，随后连续创建六十余个 source matrix、handoff、window、approval、text package 和 candidate document artifact，最后再写出完整 profile。任何新增字段都要在三百多行局部变量中寻找正确位置，网络异常、政策判断与序列化顺序混在同一审查视野。维护性扫描将它精确记录为 320 行长函数，这是一笔真实而非风格化的债务。

## 三、入口与公共导出保持什么

公共入口仍是 `loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview`，文件路径、函数签名和 Promise 返回类型不变。原 route 常量、Markdown renderer 与 `ControlledReadOnlyShardPreviewProfile` type 仍从同一 facade 重导出。调用路由和五十多份下游测试无需知道内部出现 `shardPreview/` 目录，兼容边界因此仍由原长文件承担。

## 四、输入与响应模型怎样理解

loader 输入包含 `AppConfig`、`OrderPlatformClient` 和 `MiniKvClient`。输出 profile 先给出固定只读边界，再包含 `reads`、巨大 `preview` 图、checks、summary、三类消息、evidence endpoints 与 next actions。preview 图的键序本身属于合同：Java/mini-kv observation 在前，组合计数与安全布尔值随后，matrix 到 candidate document 的 artifact 严格顺序展开，`previewDigest` 最后出现。

## 五、改造前的服务流

旧入口先并发调用 Java `GET /api/v1/ops/shard-readiness` 与 mini-kv `SHARDJSON`，随后从 observation 创建 matrix 和 consumption plan。checks 决定 ready 后，代码生成 execution gap，再把前一 artifact 逐级喂给下一个 artifact，直到 material submission precheck。最后一个巨大对象既计算组合计数，又复制固定安全值，还装配所有中间结果，I/O、行为与输出所有权没有清晰分界。

## 六、为何没有使用通用流水线执行器

这条链的每个节点类型不同、名称不同、审查语义也不同。若把函数塞进无类型数组并循环执行，行数会更短，但 TypeScript 无法表达相邻节点契约，评审者也看不到 artifact 的业务顺序。v2213 保留显式函数调用，只把它们按真实阶段分组；减少的是一个函数承担的责任，不是把可读代码压进反射、字符串键或 `unknown` 容器。

## 七、内部域目录怎样兼顾增长门

仓库机械限制顶层 `src/services/*.ts` 不得超过 1125，顶层 route 不得超过 80。若直接新增三个顶层 service 文件，即使拆分合理也会触发治理增长失败。因此内部实现进入 `src/services/shardPreview/`，原 facade 仍是唯一顶层服务表面。该目录不是绕开质量检查：source-size 与 maintainability 递归扫描它，测试也直接导入 sources 验证故障边界。

## 八、sources 模块只拥有 I/O

`shardPreview/sources.ts` 接收与旧 loader 相同的 config 和两个 client，通过 `Promise.all` 同时取得 Java 与 mini-kv observation。两个私有 reader 保留旧常量、transport、endpoint、command 和调用方法。该模块不创建 checks，不知道 handoff artifact，也不装配 profile；它只回答“本次读到了什么，或为何没有读到”，使网络边界在代码中一眼可见。

## 九、probes-disabled 怎样继续零调用

当 `upstreamProbesEnabled` 为 false 时，两个 reader 在触碰 client 前返回 `skippedObservation`。Java 的 endpoint 仍是固定 GET 描述，mini-kv 的 command 仍是 `SHARDJSON`，attempted 为 false，readiness 必须失败关闭。旧主测试继续用计数器证明两个 client 调用数均为零；完整 parity 又冻结该状态下 176 万字节 profile，防止跳过路径在拆分时悄悄丢字段。

## 十、并发异常为何增加直接测试

ready 与 disabled oracle 分别覆盖成功和不调用，但没有直接锁住两个 client 同时抛错的 catch 行为。新 `shardPreviewSources.test.ts` 让 Java 和 mini-kv Promise 都抛出不同错误，断言两条 observation 均为 attempted=true、status=failed-read、errorCode=`SHARD_PREVIEW_READ_FAILED`，并保留各自 endpoint、command 和消息。这样 I/O 模块的失败语义不只靠最终大对象间接证明。

## 十一、assessment 模块负责什么

`shardPreview/assessment.ts` 接收已经类型化的 `reads` 和 config。它创建 preview digest 与 matrix artifact，计算 checks、ready、blockers、warnings、recommendations 和 preview state，再推进 window、approval、text package 与 candidate document 阶段。返回的 `ShardPreviewAssessment` 不含固定 profile 元数据或组合计数，只包含决策结果和派生 preview 图，避免装配层重新做政策判断。

## 十二、matrix 阶段为何独立成函数

`createMatrixArtifacts` 从两条 observation 创建 source matrix，然后依次生成 consumer、drift summary、consumption plan、review checklist、digest、archive snapshot、handoff summary 及 route coverage archive verification。二十三个键仍按旧顺序返回，但函数只有 72 行、复杂度 1。它表达“来源事实怎样变成可审查的只读交接链”，不再与后续 operator window 混在一起。

## 十三、window 阶段如何保持执行间隙

`createWindowArtifacts` 以 preview state、ready 和 source matrix 创建 execution gap matrix，显式传入 executionAllowed=false、writeRoutingAllowed=false、loadRestoreCompactAllowed=false。随后生成 candidate、verification、stage ledger、runbook、rehearsal、command worksheet、evidence packet、intake ledger、review package、manual worksheet 与 import preflight。每一步仍调用原 builder，没有删减任何关卡。

## 十四、approval 阶段为什么不是批准执行

approval artifact 描述值提供、评审和签名模板的文档准备状态，不等同于运行时授权。`createApprovalArtifacts` 从 import preflight 继续到 value draft、fresh sibling intake、supply envelope、approval packet draft/review、signed template，以及 artifact draft 的 preflight、readiness、review、authoring 和 instruction。固定 profile 仍写明 executionAllowed=false，链中任何“approval”名称都不能越过这个边界。

## 十五、text-package 阶段怎样保留比较顺序

`createTextPackageArtifacts` 从 instruction preflight 创建文本包 intake、review、submission、comparison、acceptance precheck、compared package evidence intake、evaluation preflight、candidate 与 candidate intake。顺序不能交换，因为每个 builder 的输入类型就是上一节点输出。拆成独立函数后，评审者可连续阅读这一段，而无需跨越 matrix 与 window 的一百多个局部变量。

## 十六、candidate document 阶段为何单独收尾

最后五个节点把 compared evidence candidate 转成 document request、submission precheck、intake packet、material request 和 material submission precheck。它们关注候选材料是否完整，不再产生新的网络读取或执行权限。`createCandidateArtifacts` 只有 31 行、复杂度 1，并把最终五个属性按旧键名返回，便于 profile renderer 和既有专门测试继续消费。

## 十七、profile 装配层怎样保证键序

`shardPreview/profile.ts` 是唯一创建最终顶层对象的模块。它先写固定元数据和安全布尔值，再放入 reads；preview 内先写两端 preview、组合 slot/shard 数、双方 read-only 与 execution-blocked 状态，最后 spread assessment 的有序派生图。assessment 在 matrix、window、approval、text、candidate、digest 的旧顺序中构造对象，所以 spread 不改变 JSON 插入序。

## 十八、完整输出 oracle 为什么必要

该 profile 的 ready JSON 已达到 1,752,385 字节，内部 artifact 常常嵌套前一节点，单靠 `toMatchObject` 无法发现深层键序或 digest 漂移。新 parity 测试固定系统时间，对完整 profile 做便携化后计算 JSON 与 Markdown 的字节数和 SHA-256。测试在生产源码未改时先用零值精确红出四组旧结果，再冻结它们，避免重构后“根据新输出更新快照”的自证循环。

## 十九、ready 表面具体冻结了什么

成功用例使用真实测试 fixture：Java v289 返回只读预览，mini-kv v262 返回单分片 readiness，两端都禁止执行。固定后的 JSON 为 1,752,385 字节，SHA-256 为 `e9b142...ba8d7`；Markdown 为 81,829 字节，SHA-256 为 `a87109...3be8d`。重构后完全一致，说明组合计数、31 项 checks、artifact digest 和所有 renderer 段落均未漂移。

## 二十、disabled 表面为何同样重要

失败关闭路径往往比成功路径更容易在抽取时被简化。probes-disabled JSON 为 1,760,303 字节、SHA-256 `19360c...ff0a2`，Markdown 为 80,224 字节、SHA-256 `afb9f1...63a4`。它比 ready JSON 更大，因为包含 blocked reasons、修复建议和不同 artifact 状态；四个值保持不变，证明拆分没有只保护乐观流程。

## 二十一、类型系统如何连接三层

sources 返回既有 `ControlledReadOnlyShardPreviewReads`，assessment 的派生图使用既有 preview graph 去掉六个基础键后的 `Omit`，profile 最终仍声明返回原公开类型。阶段 helper 的参数直接索引 preview graph 中对应节点类型，因此上游 builder 一旦换输出，下一阶段会在 typecheck 中失败。新抽象没有引入宽泛 `Record<string, unknown>`，也没有复制六十余个既有 interface。

## 二十二、命名为何反而变短

公开函数必须保留历史长名以维持合同，内部新标识符则使用 `readShardPreviewSources`、`assessShardPreview`、`buildShardPreviewProfile` 和五个 `create...Artifacts`。目录已经提供 shard preview 语境，函数名无需重复 credential resolver 与 controlled read-only 全链。所有新增标识符处于四十字符预算内，语义由模块、类型和阶段共同表达，而不是继续堆叠前缀。

## 二十三、维护性数字如何证明没有搬家

改造前账本为 85 个近上限文件、112 个长函数、228 个复杂函数、0 个环。实现后第一次扫描只报告旧 loader 一条 stale，没有 unknown 或 grown；新 assessment 虽有 437 行，但最大函数 72 行，其他阶段为 71、58、56、53、46、31 行，最高复杂度 4。删除唯一 stale 后账本变为 85/111/228/0，收益来自职责拆开而非阈值调整。

## 二十四、测试覆盖怎样分层

第一层是四个完整字节 oracle；第二层是主服务的 ready 与 probes-disabled 合同；第三层是 sources 的双异常 fail-closed 测试；第四层是所有文件名包含 controlledReadOnlyShardPreview 的下游矩阵。最终这组下游覆盖 58 个文件、259 项测试，包含 renderer、source matrix、handoff、window、approval、text package 和 candidate document。governance ratchet 另证实 1125/80 未增长。

## 二十五、安全与上游证据边界

Java 与 mini-kv 只通过既有只读方法被观察，sources 不创建 client，也不自动启动或停止服务。profile 继续固定 activeShardRouterAllowed、writeRoutingAllowed、loadRestoreCompactAllowed、connectsManagedAudit、credentialValueRead 和 rawEndpointUrlParsed 为 false。重构不修改 config 默认值、fixture、endpoint、command 或 access guard，也不把 approval artifact 解释为生产授权。

## 二十六、跨项目并行关系

本版只重组 Node 内部编排并使用测试 fixture，不要求新鲜 Java 或 mini-kv 输出。两个兄弟项目可继续独立维护 renderer engine 和 source manifest，Node 既不读写它们的 dirty worktree，也不启动其进程。当前工作不触发 live capstone；未来真的消费新分片合同，必须另立功能版本并明确服务端口、owner、清理和 no-write 证明。

## 二十七、评审者应重点质疑什么

最强质疑是“是否用对象 spread 偷换了键序”。回答来自四个完整哈希和显式阶段返回顺序。第二个质疑是“437 行 assessment 仍是大文件”；它低于近上限，且内部五个阶段函数分别对应真实 artifact 边界，最大 72 行，没有巨型控制流。第三个质疑是“子目录是否绕过 ratchet”；递归 maintainability/source-size 仍扫描它，顶层服务表面则确实没有增长。

## 二十八、后续维护者的修改路径

新增来源读取只应进入 sources，并补成功、跳过、异常 observation 测试；新增政策条件进入 checks 或 assessment，不应让 profile assembler 做判断；新增 artifact 应放入其真实阶段并维持返回键序；新增顶层字段只在 profile 中装配，并由完整 oracle 显式审查兼容性。若某阶段未来超过 120 行，应按新的业务边界继续提取，不要恢复万能主函数。

## 二十九、阶段之间如何交接数据

三层之间没有共享可变上下文。sources 一次性返回 `{ java, miniKv }`；assessment 读取它们并返回 ready、previewState、派生 preview、checks、summary 和消息；profile 只消费这两个不可变结果。阶段 helper 也遵循单向传递：matrix 的末端供 window 的起点使用，window 的 import preflight 供 approval 使用，instruction 供 text package 使用，candidate intake 再供 document 阶段使用。没有 helper 回写前一节点，也没有全局缓存，因此测试并发运行时不会交叉污染。

## 三十、失败时应按什么顺序排查

若 parity 先失败，先比较 JSON 与 Markdown 哪一侧变化，再检查 generatedAt 是否固定、profile 键序是否移动；若主服务测试失败，查看 reads 的 attempted/status 与 checks 的首个 false；若只有某个 artifact 测试失败，从五个阶段边界定位它的直接输入，不必从 loader 顶部逐行追踪。若 growth ratchet 失败，检查是否误把内部模块放回顶层 services。这个顺序把序列化、I/O、政策、artifact 和仓库治理五类问题分开，避免用改 expected 掩盖真实原因。

## 三十一、assessment 文件为何暂时保持四百余行

assessment 的 437 行主要来自六十余个强类型 builder 的显式 import、调用与有序返回，而不是一个巨型分支算法。把每五个调用再拆成独立文件会增加导航成本和文件家族，却不会形成新的业务所有权；把它压成循环又会失去类型相邻性。当前衡量结果是最大函数 72 行、复杂度 2 以下的阶段函数居多、整文件低于 600 行近上限，因此“一文件容纳同一派生图，函数按阶段拆开”比继续碎片化更合适。

## 三十二、继续拆分的机械停止条件

本轮在 loader 退出长函数账本、所有 helper 低于 120 行和复杂度 20、顶层文件数不增长、四个完整表面不变时停止。未来只有当 assessment 超过 600 行、某一阶段函数超过 120 行、第三类独立 I/O 来源出现，或一个阶段形成可单独复用的公共合同，才有理由继续提取。单纯为了让文件更短、版本数字更大或 census 再少一项，不足以制造新模块；任何后续拆分仍要先冻结完整表面。

## 三十三、一句话结论

v2213 在四个 8 万至 176 万字节完整表面逐字不变的前提下，把受控分片预览从 320 行混合编排收敛为可独立验证的来源、评估与装配三层，使公共入口只剩九行、最长新函数仅七十二行，并保持所有读写和执行边界关闭。
