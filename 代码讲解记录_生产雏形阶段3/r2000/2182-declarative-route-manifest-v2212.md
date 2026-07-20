# Node v2212 代码讲解：声明式路由清单与零环依赖

## 一、版本目标与非目标

v2212 的目标是处理两个运行时 import cycle。第一个环由 `auditJsonMarkdownRouteGroups`、质量路由注册模块、可读性报告服务和讲解收口服务组成；第二个环由 cleanup handoff 路由、兄弟项目可用性收口、归档验证链和 verifier support 组成。旧代码的业务结果长期正确，但“报告为了知道自己是否被注册，反向导入注册自己的模块”让所有权方向倒置。非目标是新增路由、改变报告字段或开放任何执行能力；本版只纠正依赖所有权。只看文件列表时这像静态图上的审美问题，换一个模块入口后却会成为可执行故障。

## 二、旧版故障怎样被直接复现

在 v2211 上不启动 Fastify，也不调用任何路由，只用 `tsx` 直接导入 `auditManagedAuditRouteQualityRoutes.ts`，模块求值会进入 `auditJsonMarkdownRouteGroups.ts`。该文件准备组合质量路由数组时，绑定尚未完成初始化，Node 抛出 `ReferenceError: Cannot access 'managedAuditRouteQualityAuditJsonMarkdownRoutes' before initialization`，位置是第 68 行。这一证据说明环已经穿透到 ESM temporal dead zone，不是 census 工具凭命名猜出的假阳性。

## 三、为什么常规测试过去还能通过

ESM 环是否立刻失败与入口和求值顺序有关。应用通常从 `app.ts` 或总路由表进入，某些绑定可能在被读取前恰好完成初始化，所以全量测试可以长期绿；从质量路由模块直接进入时，顺序改变，未初始化绑定暴露出来。依赖正确性若依靠“大家总从同一个入口启动”，模块就不能独立复用，测试分片、脚本探查和未来拆包都可能重新触发异常。v2212 要消除这种偶然性，而不是给直接导入脚本换入口。

## 四、依赖环背后的所有权错误

路由注册模块拥有 handler 与 URL 的装配，报告服务拥有事实计算和输出。旧服务为了取得组内路由数量或确认某路径存在，直接读取注册数组；注册数组又必须导入服务 loader 才能装配 handler。于是“行为实现依赖注册事实”和“注册实现依赖行为实现”同时成立。真正稳定的事实其实只有路径标识和组的基数，它们既不是 handler 行为，也不是报告算法，适合进入一个双方都可消费的中立契约层。

## 五、新依赖图如何单向流动

`src/contracts/auditRouteManifest.ts` 位于 routes 与 services 之外。质量路由模块从清单读取六个路径，两个可读性服务从清单读取路径或数量；cleanup closeout 与 verifier support 从同一清单读取三十这个注册基数。清单不导入 route、service、config、文件系统或运行时依赖，因此图只剩 `route -> contract` 和 `service -> contract`。route 仍可导入 service 装配 handler，但 service 不再反向导入 route，闭环由结构上消失。

## 六、为什么清单只有十一行

中立层只容纳稳定声明，不应该演化成新的治理服务。`ROUTE_QUALITY_PATHS` 是一个冻结对象，六个键表达六种质量表面的语义身份；`ROUTE_QUALITY_ROUTE_COUNT` 从对象键数推导，避免同一组内再手写数字；`CLEANUP_HANDOFF_ROUTE_COUNT` 保存另一张三十项注册表的当前契约基数。清单没有 loader、renderer、检查链或归档回声，因而不会把“消除环”变成“新增一条报告家族”。

## 七、六条路径为何用带名字的对象

若只导出字符串数组，调用者会依赖下标或重复查找字符串，代码审查时难以判断第三项究竟代表哪条路由。带名字的对象让 `codeWalkthrough`、`fFolderExplanation`、`explanationCloseout`、`routeHelper`、`registrationTable` 和 `readabilityMaintenance` 成为稳定概念。对象字面量顺序同时保留旧注册顺序，键名承担意图，值承担外部 URL 合同；新增调用者不需要复制任何长路径。

## 八、质量路由注册模块改了什么

`auditManagedAuditRouteQualityRoutes.ts` 仍声明同一个六项数组，仍调用相同的 `auditJsonMarkdownRoute`，仍传入原 loader 和 renderer。唯一改变是每个字符串字面量替换为 `ROUTE_QUALITY_PATHS` 的对应成员。handler 闭包、依赖参数、Markdown 协商和访问控制没有移动。这样的改动让 URL 的外部值保持不变，同时让服务能够引用同一身份而不触碰注册实现。

## 九、readability profile 如何去掉反向导入

旧 `loadReadabilityMaintenanceProfile` 先从总路由组中按 id 查找 `managed-audit-route-quality`，再读取 `routes.length`。这让一个文档质量报告加载完整路由图，只为得到数字六。新实现直接使用 `ROUTE_QUALITY_ROUTE_COUNT`，其余 route catalog、文档扫描、检查、消息和 digest 逻辑不变。报告仍输出 expected group 51、expected route 254、managed-audit 56 和 quality route 6，且 readiness 判定仍要求这四项对齐。

## 十、explanation closeout 如何确认自身注册

讲解收口服务过去在完整路由数组中搜索自己的长路径，并以找到与否生成 `closeoutRouteRegistered`。新实现把自己的路径绑定为 `ROUTE_QUALITY_PATHS.explanationCloseout`，再在清单值中检查该绑定。表面上看这仍是一次 includes，但边界不同：它验证的是声明式契约是否包含该身份，不再加载包含自身 handler 的注册数组。真实数组是否遵守清单由独立 parity 测试负责，因此服务判定和注册完整性各有单一职责。

## 十一、cleanup 链为什么只需要数量

cleanup closeout 和 route archive verifier support 并不调用三十条路由，也不检查各自 handler；它们只把当前组数量写入 catalog 快照，与历史归档数量比较。旧实现为 `.length` 导入整个 `auditJavaMiniKvRouteCatalogCleanupHandoffRoutes`，把长归档链重新接回路由层。改为 `CLEANUP_HANDOFF_ROUTE_COUNT` 后，报告仍看到三十，但加载报告不再迫使所有 cleanup 路由及其服务参与模块初始化。

## 十二、手写三十是否会产生第二真相

单独写常量而无人核验确实危险，所以 v2212 没把它当成可信终点。`auditRouteManifest.test.ts` 同时导入清单和真实注册数组，断言数组长度必须等于三十，并检查所有注册 path 去重。未来增加或删除 cleanup 路由却忘记修改常量时测试立即失败；只修改常量而真实数组未变也同样失败。常量提供无环消费面，注册数组提供实现事实，测试把两者机械锁在一起。

## 十三、路径顺序为什么也是合同

质量路由组不仅检查集合相等，而是把注册数组的 path 顺序与 `Object.values(ROUTE_QUALITY_PATHS)` 逐项比较。虽然 HTTP 路由通常不依赖列表顺序，但目录摘要、审查输出和未来生成逻辑可能按声明顺序遍历。只检查 Set 会放过无意重排，因此测试同时保护顺序和唯一性。六个 literal 值本身也被源码清单固定，路径拼写变化会在现有路由测试和新 parity 门中双重暴露。

## 十四、报告投影门具体冻结什么

第三项测试真实调用 readability 与 cleanup 两个 loader，然后只抽取本次重构可能影响的 `routeCatalog` 和 `currentRouteCatalog`。预期值来自 v2211 字段级对比：前者是 51/254/56/6，后者是 51/254/85/30。这里不重新实现 loader 算法，也不只比较清单和自己，而是确认声明通过生产 loader 进入最终 profile 后仍得到旧语义。任一接线错误都会让投影失败。

## 十五、为何没有冻结两份完整报告哈希

最初验证尝试用固定时间冻结完整 JSON 和 Markdown，但红点没有被草率改成新 expected。字段级调查发现 readability profile 会读取五份架构文档的原始字节数，cleanup profile 会递归验证历史归档文件；这些是报告的合法动态输入，却不是本次路由依赖倒置的输出。冻结整包会要求仓库文档和归档环境永久不变，反而把无关维护误判为路由回归，因此最终测试选择最小而完整的契约投影。

## 十六、临时 worktree 揭示了什么平台陷阱

为了比较 v2211，验证创建了 detached 临时 worktree。Git 在该 worktree 按 Windows 设置检出 CRLF，五份文档的 `stat.size` 分别比主工作树多出约一个换行字节；归档校验也因此从 16/16 变成 14/16。readability 的核心 digest 并未变化，因为 digest 不包含原始 byteLength，但完整序列化哈希变化；cleanup 的 readiness 则随归档字节变化。调查完成后 worktree 已删除，错误哈希没有进入测试。

## 十七、为什么这不是降低测试强度

旧代码原本没有针对两个环的输出 oracle，也没有直接导入门。v2212 新增了四层更贴近风险的保护：真实注册数组与路径清单逐项相等、两组路径无重复、cleanup 数量与三十项数组一致、两个生产 loader 的 catalog 投影保持旧值。再加 import graph 必须为零和直接模块导入必须成功，保护面比整包环境哈希更精确。测试少冻结无关噪声，多冻结本次承诺，并非放宽期望。

## 十八、维护性账本怎样按证据收紧

实现完成但未修改 baseline 时先运行 census，实际结果已是 85 个近上限文件、112 个长函数、228 个复杂函数和 0 个环；报告只把原有两条 cycle key 标为 stale，没有 unknown 或 grown 条目。随后才从 `maintainability-baseline.json` 删除这两条记录，再次运行得到 Ready true。前三项数字没有下降也没有上升，说明本版精准消除环，而没有通过搬函数或拆空文件伪造额外收益。

## 十九、输入与输出可以怎样理解

以质量路由为例，输入一是六个 loader/renderer 配对，输入二是六个稳定路径；注册模块把两者组合成 Fastify 可注册描述。readability loader 的输入仍是配置与项目根目录，输出仍包含 routeCatalog，其中 quality 数量由中立清单提供。cleanup loader 的输入仍是配置和历史归档，输出仍包含当前 catalog，其中 handoff 数量为三十。没有任何输入字段、环境开关或输出键因重构新增、删除或重排。

## 二十、零环为何提高真实可维护性

零环最直接的收益是模块可独立加载，脚本、测试和未来拆包不再依赖隐含入口顺序。更长期的收益是审查者能从 import 方向判断责任：contract 提供稳定事实，service 计算报告，route 装配 transport。要新增质量路由时先登记身份，再注册 handler，parity 门提醒两边同步；要修改报告时无需加载整个路由图。初始化范围变小，也减少测试 transform 和调试堆栈中无关模块。

## 二十一、安全与执行边界是否变化

本版没有触碰配置默认值、身份头、角色、审批 correlation、upstream probe、upstream action、凭据解析或任何写路径。六条质量路由和三十条 cleanup handoff 路由保持原 handler 与 schema，报告仍明确 execution 不被开放。清单仅保存公开 URL 和数量，不保存 endpoint secret、兄弟仓库路径或可执行命令。去环不会绕过 access guard，也不会把 archived-fixture-only 解释为 live integration。

## 二十二、Java 与 mini-kv 如何并行

本版不需要新鲜 Java 或 mini-kv 证据，不读取、构建、测试、启动、停止或修改两个兄弟工作树。Java 可继续自己的 renderer engine 收口，mini-kv 可继续产品源 manifest；Node 借鉴的是它们“机制集中、差异数据化、清单必须有完整性门”的原则。双方没有共享写文件，也没有合同版本变化，因此推荐并行，Node 不成为批准前置，v2212 也不触发 C1-C4 live capstone。

## 二十三、后续维护者怎样安全扩展

新增质量路由时，先在 `ROUTE_QUALITY_PATHS` 选择短而清楚的语义键并写路径，再在质量注册数组对应位置绑定 loader 与 renderer；测试会要求顺序一致和路径唯一。cleanup handoff 若真实增加或删除路由，要同步修改数量，parity 测试会验证。报告服务不得重新导入 route registration 来查询事实；如果现有清单不足，应扩展中立声明并增加真实注册对照，而不是复制第三份 route count。

## 二十四、评审时最值得追问什么

第一，常量会不会漂移；答案是注册数组 parity 会双向失败。第二，直接导入故障是否真的消失；同一 `tsx` 入口现在稳定输出 `{"quality":6,"cleanup":30}`。第三，输出是否偷改；两个 loader 的 v2211 catalog 投影逐字段一致，原路由测试继续通过。第四，是否只是让扫描器看不到环；服务已不再 import 两个注册模块，manifest 本身无反向依赖，AST import graph 从两条真实路径降为零。

## 二十五、一句话结论

v2212 把“服务反查注册自己的路由”改成“路由与服务共同消费中立声明”，用十一行清单和六十余行机械门消除两个真实运行时环，并修复可复现的 ESM TDZ。路径、顺序、数量、报告投影和安全边界均由针对性测试保护；错误的整包哈希方案在调查后被舍弃，没有把 CRLF 噪声包装成合同。维护性账本因此从两个环收紧到零，而其余债务、路由规模和执行权限保持不变。
