# Node v2237：把“可以导入”收缩为“确实有人使用”

## 目标、非目标与边界

v2237 的目标是收缩 controlled read-only shard preview 的私有类型出口，并完成九分终局审核。它不删除原始类型声明，不重命名 schema，不改变运行时对象，也不修改 route、renderer、fixture 或测试期望。唯一被改动的生产文件是 private type barrel：它原来把几十个历史阶段的三百五十二个类型统一转出，而真实代码只通过稳定 facade 消费其中很小一部分。收缩之后，调用者仍从同一个 facade、用同一个名字导入；差别只是没人使用的类型不再被意外公开。

## 一、为什么大量类型声明本身不是问题

这个仓库保存了长期演进的只读治理模型，许多阶段类型仍被各自 owner 文件直接使用。删除声明本体会扩大影响面，也可能破坏历史解释和局部模块，因此本版不碰它们。问题在于 mega barrel 把所有声明再次集中暴露：任何新代码都能绕过领域 owner，从一个五百行入口挑选历史类型，IDE 自动补全也把已结束阶段与当前稳定表面混在一起。治理目标不是让类型消失，而是让公共可见性与真实消费一致。

## 二、两个入口与服务流程分别承担什么职责

稳定 facade 是 `managedAudit...ControlledReadOnlyShardPreviewTypes.ts`。它直接导出四个核心 profile 类型，然后通过 private barrel 转出兼容类型。调用方只认识 facade，不直接依赖 private 文件。private barrel 则按来源模块分组执行 named type re-export。保持这两层不变很重要：facade 路径是调用合同，private 文件是可收缩的实现细节。本版没有把调用者改成散落的深层路径，也没有让 facade 改名。

## 三、Step-0 如何建立集合

临时 census 使用 TypeScript 编译器 API 解析两个入口与 `src`、`test` 下所有 TypeScript 文件。对 private barrel，它读取每个 `ExportDeclaration` 的 named specifier 和来源模块；对 facade，它单独记录四个直出类型；对消费者，它解析指向 facade 或 private barrel 的 named import，并按“导入前的原始名字”记录，即使本地使用 alias 也不会误判。分析结果是 private 三百五十二项、facade 四项、消费名四十一项。

## 四、为什么不是用全文搜索

类型名可能出现在注释、字符串、测试描述、另一个模块的声明或 Markdown 中。全文搜索无法区分这些文本与真实 import，也不能正确处理 `import type { A as B }`。AST 能区分 module specifier、import clause、propertyName 与 local name，因此集合差是语法事实，而不是字符命中。模块路径还会从 `.js` 解析回当前 `.ts` 文件的绝对路径，避免同名文件或相对层级造成误配。

## 五、三组集合如何决定删除

第一组是 private barrel 的全部 named export；第二组是 facade 直接导出的核心类型；第三组是所有真实消费者请求的原始名字。消费名若属于核心四项，不需要 private barrel 再导出；若属于 private 集合，必须保留；若两边都不属于，就是缺失 surface import，census 必须失败。private 集合减去消费集合得到三百一十五个无人消费项。缺失 import 和重复 private export 都是零，所以集合具备安全裁剪前提。

## 六、为什么不确定项默认保留

初次分析只执行 named import，因为计划明确以 named consumer 为准；永久测试又补充 named re-export 与 `import("module").Type` 形式。namespace import 无法静态知道属性集合，因此永久门直接把它列为 unsupported，而不是假设安全后删除。当前 namespace 数量为零。若未来出现，提交必须先把它改成显式 named import，或经过评审扩展分析器；不会静默把潜在消费者当成未使用。

## 七、精简文件怎样生成

生成器再次解析原 barrel，保持 export group 的原始顺序和每组名字顺序，只过滤不在消费集合中的 specifier。某个来源模块若没有任何保留名，整个 export block 才删除；仍有消费时继续使用显式 `export type { ... } from "..."`。生成后文件从四百九十八行降到七十五行，保留十三个来源分组与三十七个名字。没有手工复制类型字符串，也没有将 named export 改成 private wildcard。

## 八、为何删除三百一十五项只降低三百一十四 name debt

优雅门只统计长度超过四十字符的文件名和 export 名。被删除的三百一十五项中，`PreviewStatus` 等至少有一个名字本来低于预算，不属于 name debt；其余长 export 才减少债务。因此总 export 数从三百五十二降到三十七，过长 export 计数从三千四百八十五降到三千一百七十一，name debt 从四千四百四十四降到四千一百三十，净减少三百一十四。这种差异证明 census 在按规则计数，而不是把删除行数直接伪装成得分。

## 九、稳定 type test 为什么仍然重要

`controlledReadOnlyShardPreviewTypeBarrelSplit.test.ts` 从 facade 导入核心 profile、preview graph、reads、source matrix 与 value supply envelope 等代表类型。它验证主入口仍可编译并保持预期结构。两个 handoff 测试与一个稳定性测试又消费 source matrix、handoff notes 和 archive 类型。四个文件十一项 focused 测试全部通过，说明精简没有只满足 AST 集合，却破坏真实类型用法。

## 十、永久 ratchet 检查哪些失败

`typeBarrelSurfaceRatchet.test.ts` 每次测试都重新扫描仓库。它要求 private export 数为三十七、facade 直出数为四、消费名为四十一；unused private export、missing surface import、duplicate private export 和 missing source module 必须为空。它还要求 private barrel 不含 wildcard，并拒绝 default 或 namespace import。这样新增消费需要显式 export，新增 export 必须立刻有真实消费者，删除消费者后旧 export 会变成 unused 并使测试失败。

## 十一、为什么 facade 仍保留现有 `export *`

facade 原先通过 wildcard 转发 private barrel，这条路径是既有稳定入口。本版没有新增 wildcard，也没有用 wildcard 隐藏三百多个名字；被转发的 private 集合已经机械收缩为三十七项。若把 facade 同时改成另一份 named 清单，会出现两处必须同步的重复数据，并额外增加过长 export 计数。当前设计让 private barrel 成为唯一兼容清单，facade 只负责稳定路径，永久测试则禁止 private 清单自身使用 wildcard。

## 十二、类型系统怎样提供第二层证据

AST 测试证明集合关系，`tsc --noEmit` 证明所有引用解析、泛型约束、接口字段与 re-export 链仍然有效。若分析器漏掉一个真实 named import，精简后 typecheck 会直接报告缺少导出；若保留名来自错误模块，来源文件存在检查可能通过，但 TypeScript 会报告该模块未导出此名。两层检查覆盖集合错误与类型绑定错误，不能用其中一层替代另一层。

## 十三、为什么没有运行时行为 oracle

private barrel 使用 `export type`，TypeScript 编译后不会生成对应 JavaScript值。删掉无人消费 type re-export 不会改变 profile JSON、Markdown、路由注册、digest 或安全开关，因此为它制造运行时 byte oracle没有信息增益。合适证据是 AST surface census、typecheck、直接 type tests 和最终全量测试。若本版动了值导出或运行时 import，当前策略就不够，必须另加构建产物与行为 oracle。

## 十四、九分绝对门第一次全绿

`npm run elegance:nine` 报告十五项全部通过：近限文件七十不超过七十，长函数六十九不超过七十，复杂函数一百六十五不超过一百七十，最大函数一百五十八不超过一百六十，最大复杂度五十八不超过六十，name debt 四千一百三十不超过四千二百。verification logic 为八百九十八，tracked family 为五十二，导入环、超八百行文件和非豁免 renderer 都为零。

## 十五、为什么全绿后还不能立即宣布九分

静态门只证明结构指标与局部合同，没有证明五百多份测试在同一最终树上全部通过，也没有证明 coverage、build、security、archive 与 HTTP smoke。终局审核必须在文档写完后执行四个顺序 Vitest shard，每个最多四个 worker；随后执行 coverage、build、默认安全 smoke 和 access-guard 强制历史回退 smoke。最后还要 push commit/tag 并等待远端 Node Evidence。任一失败都把状态退回 blocked，而不是保留“静态九分”结论。

## 十六、测试分片为何顺序执行

仓库全量测试曾产生大量 Vitest worker 和数 GB 内存占用，因此本轮不一次拉起高并发全量。测试发现先给出文件总数；四个 shard 按一到四顺序运行，每次 `maxWorkers=4`，上一片退出后再启动下一片。这样仍覆盖完整集合，又把峰值进程数控制住。coverage 也限制四 worker。所有本轮启动的测试进程必须自然退出或在异常后按父 PID 清理，禁止结束机器上的全部 Node 进程，以免误伤 MCP。

## 十七、跨项目边界

v2237 不读取新鲜 Java 或 mini-kv 输出，不需要它们停止推进，也不要求启动 sibling 服务。它只处理 Node 私有编译期表面，Java 与 mini-kv 推荐并行。终局 forced historical fallback smoke 仍会验证 Node 能脱离 sibling 工作区读取仓库 fixture，但不会修改这些 fixture。若 smoke 发现历史路径缺失，修复对象是 Node resolver/fixture 映射，不应要求 sibling 项目临时生成文件掩盖问题。

## 十八、未来新增类型的正确路径

新领域类型首先留在所属 `...Types.ts`，由直接 owner 使用。只有当第二个稳定 facade 消费者确实需要它时，才把名字加入 private barrel，并在同一提交增加显式 named import。ratchet 会看到 export 与消费同时出现；elegance 门仍会判断 name debt 是否增长。若名字超过四十字符，优先判断是否缺少短领域概念，而不是默认把每个历史阶段全名重新暴露。

## 十九、审查者最短路径

先看 private barrel 的十三个 export block，确认只有三十七项；再读 ratchet 的集合计算与 namespace 禁令；然后运行 ratchet、原 type barrel test 和两个 handoff 测试。接着运行 typecheck、lint 和 `elegance:nine`。最后查看四片完整测试、coverage、build、security/archive、两种 smoke 与远端 CI 的版本证据。这个顺序从最小变更面逐步扩大，不需要先阅读三百多个被删类型的声明本体。

## 二十、当前状态与停止条件

本地实现、静态九分门、完整测试、coverage、build、静态门和两种 HTTP smoke 均已通过，证据 JSON 已从 pending 更新为 `local-verification-passed-awaiting-remote-ci`。此状态仍不等于最终九分：必须先清理 `dist`、`coverage` 与临时日志，再提交 v2237、创建 tag、推送，并等待远端 Node Evidence 对同一 commit SHA 成功。远端失败时只能修复可复现根因，不能保留“本地已经够好”的结论。成功后本计划停止，不创建 v2238 追逐更低数字，后续工作回到真实功能或外部评审发现的问题。

## 二十一、四类错误怎样被机械发现

如果误删一个仍被导入的类型，surface census 会把它列入 missing，typecheck 还会在具体消费者处报告不存在的导出；如果误留一个无人消费类型，unused 集合立即非空。若开发者试图用 namespace import 绕过 named 集合，unsupported 计数会变为一，测试明确拒绝这种不可枚举消费；若 export block 指向已经移动或删除的来源模块，missing source module 会给出相对路径。重复导出则进入 duplicate 集合。五类失败各自保留不同诊断，审查者不必从一个笼统布尔值反推原因，也不能通过修改固定数量断言掩盖集合不一致，因为空集合断言仍会失败。

## 二十二、终局回归失败时的归因顺序

若某个测试 shard 失败，先单独重跑失败文件，再跑所属 shard，只有断言稳定通过而大批次超时才讨论预算；不得修改期望适配精简。若 coverage 失败，先区分覆盖率阈值与测试异常，type-only 文件本身不会生成运行时代码。build 失败优先查看缺失导出与声明生成，smoke 失败则先打印 verification state、false checks 与历史证据路径，不能把四百零一误判为服务未启动。远端 CI 若失败，先核对 commit SHA 与本地命令是否一致，再判断 Windows/Linux 路径或缓存差异。这个顺序保证每次修复针对真实层级，也避免为了一个环境问题重新扩大 type surface。

## 二十三、完整 parity 为什么在类型版本里仍然发现问题

v2237 自己的核心改动是 type-only，但终局回归覆盖的是从 v2233 到 v2237 的整个批次。第一个 shard 中的 `controlledReadOnlyShardPreviewParity.test.ts` 报告 JSON 与 Markdown 字节数不变、SHA-256 改变。单文件重跑得到相同结果，说明不是 worker 竞争；隔离 worktree 从 v2232 逐标签执行后，v2232、v2233、v2234、v2235 均通过，v2236 首次失败。这个过程证明终局测试的价值不在于重复 focused，而在于捕捉前一版局部 oracle 没有覆盖到的全链派生输出。

诊断没有停在“哈希不同”。分别导出 v2235 与 v2236 的归一化完整对象后递归比较，共有 238 个叶子差异；排除字段名以 digest 结尾的派生值后，只剩 ready 与 probes-disabled 两份 profile 中同一个 `sizeBytes` 差异。源头是 `node-v961-value-supply-envelope-artifacts` 从 11,741 变为 11,590 字节，另外 236 个差异只是摘要链继续传播。领域布尔、失败码、数组顺序与路由输出结构没有变化，因此不能通过更新 parity 期望把物理证据漂移当成等价。

## 二十四、为什么冻结 v961 快照优于加回 baseline

最直接但错误的处理是把 v2236 改过的承重函数恢复成旧实现，再把它重新加入 maintainability baseline。这样 parity 会通过，却违反 ratchet 只收紧原则，也让当前维护代码永远为一条历史证据停在复杂实现。Git 对账提供了更强事实：该文件在 tag v961 与 v2235 的 blob 都是 `260776b475fd113203b79c1e753be2254e275052`，说明它本来就是一份从 v961 保持至今、但从未物理冻结的历史输入。

最终方案把这个真实 blob 原样复制到 `fixtures/historical/node/v961/value-supply-envelope-artifacts.ts.snapshot`。resolver 新增的是精确路径到内容快照的映射，不是宽前缀和 scanner ignore；`resolveHistoricalEvidencePath` 仍报告原声明路径，文件存在性、读取和 stat 则使用不可变内容路径。测试同时断言 11,741 字节、SHA-256 和快照位置。当前源码重新使用 v2236 的 `collectBlockedReasons`，其 blob 与 v2236 都是 `89b94e396557218a01833fdbdd3de9ed9d461dc3`。因此历史证据、输出契约和当前维护性各自有独立且真实的所有者。

## 二十五、本地终局证据怎样组成九分结论

最终代码按顺序通过四个 shard：148/416、148/507、148/429、148/465，合计 592 个测试文件、1,817 项测试，每次最多四个 worker。coverage 再次执行同一集合，语句 95.77%、分支 90.06%、函数 98.54%、行 95.75%。typecheck、零警告 lint、build、security 18/18、archive 64.74/80 MiB、elegance、family、maintainability、renderer、source-size 与九分总门全部通过；维护指标为 70 个近限文件、69 个长函数、165 个复杂函数、零导入环，最大函数 158、最大复杂度 58、name debt 4,130。

默认安全 smoke 在 4191 验证 health、两上游请求数均为零、release archive ready=true 且 executionAllowed=false。强制 access guard 与 historical fallback smoke 在 4192 验证带完整身份头的 health、主 preview JSON 和 Markdown 均为 200；preview 保持 blocked，Java/mini-kv 服务启动、执行和写路由均为 false，冻结 v961 元数据与 parity 一致，无身份请求返回 401。PID 3744 与 20524 均被精确停止，未结束其他 Node 或 MCP 进程。远端 CI 是最后一个外部证据，所以本节只能授予“本地九分门及终局审计通过”，最终九分仍等待 push 后同 SHA 的 Node Evidence。

## 一句话总结

v2237 用 TypeScript AST 把三百五十二项私有类型出口收缩为三十七项真实消费表面，并在终局回归中把可变的 Node v961 历史输入改成真实冻结快照；永久 ratchet、完整测试、coverage、两种 smoke 与九分门已经锁住本地结果，最终结论只等待同一提交的远端 Node Evidence。
