# Node v2225：声明式 operator lifecycle 的边界收敛

## 一、版本目标与非目标

v2225 处理的是一组已经稳定运行、但内部表达过于沉重的 evidence intake。它读取 Node v387 归档、Java v161 声明式生命周期证据、mini-kv v152 声明式生命周期证据以及 mini-kv v151 冻结模板，组合成 Node v388 intake；随后 archive verifier 读取 v388 的 JSON、Markdown、摘要、截图索引和计划索引，再从冻结证据重放一次 intake，形成 Node v389 的归档验证报告。外部合同早已稳定，问题集中在内部：文件名把整句业务历史重复十几次，主入口同时读取数据、执行四十多项判断、拼装 profile，归档入口又复制一套 aggregate-ready 算法。

本版目标是让目录表达领域，让短文件表达职责，让共享代码只拥有真正相同的机制。非目标同样明确：不新增 route，不增加报告字段，不改 blocker 文案，不改 fixture，不刷新历史归档，不启动 Java 或 mini-kv，不运行真实 probe，不连接 managed audit，也不把“声明了生命周期”误当成“批准了运行”。这是维护性重构，不是功能授权版本。

## 二、改造前为什么难以维护

旧 intake 文件有五百余行。一个维护者从 `loadManagedAudit...DeclaredOperatorLifecycleEvidenceIntake` 进入后，会连续看到路径常量、历史文件选择、四份 JSON 解析、三个 reference builder、两次 intake 构造、159 行 `createChecks`、summary、blocker、warning、recommendation，最后再看到近百行顶层 profile。任何一个字段漂移都可能来自读取、收窄、判断、装配或 renderer，定位成本很高。

更明显的问题是命名。旧文件名和导出名把 `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake` 当作前缀重复。长名字没有提供更多局部信息，反而掩盖 `sources`、`checks`、`profile` 这些真正有用的概念。七个文件和二十三个相关导出合计形成三十条超过四十字符的命名债。若继续复制同一模式到下一组 intake，目录检索、代码评审和 import diff 都会越来越难读。

## 三、最终目录如何表达边界

最终结构以 `src/services/operatorLifecycle/` 为领域根，下面分为 `service/` 和 `declared/`。前者承接 v2224 的 operator service lifecycle，后者承接本版的 declared lifecycle。每个子域内部使用同一套局部语汇：`intake.ts` 是编排入口，`sources.ts` 负责证据到类型的映射，`intakeChecks.ts` 负责 readiness 行为，`profile.ts` 负责公共对象键序，`intakeTypes.ts` 负责稳定数据形状，renderer 只负责 Markdown。archive 使用 `archive.ts`、`archiveChecks.ts`、`archiveTypes.ts` 和 `archiveRenderer.ts`。

这里特意又加了一层 `service/`，没有把所有文件平铺在 `operatorLifecycle/`。原因不是追求目录整齐，而是三次规则：如果 service 与 declared 的 `Types`、`Checks`、`Renderer` 全部堆在一个目录，结构 census 会看到第三个同类成员，维护者也会面对不清楚的局部前缀竞争。子域目录让每个目录最多只有两项同类职责，同时公共机制放在父目录的 `checkAssembly.ts`，数据和行为所有权一眼可见。

## 四、入口路由与调用链没有改变

声明式 intake 的 HTTP 路径仍是原来的长业务路径，archive verification 路径也保持不变。变化只发生在 TypeScript import：路由模块现在导入 `loadDeclaredIntake`、`renderDeclaredIntakeMarkdown`、`loadDeclaredArchive` 和 `renderDeclaredArchiveMarkdown`。请求进入后，access guard、operator headers、JSON/Markdown 格式选择和状态码仍由既有 route helper 处理，本版没有触碰这些行为。

intake 的内部调用链现在是：路由调用 `loadDeclaredIntake`；入口解析证据并调用 sources builder；入口构造 ready=false 的 draft intake；`createDeclaredChecks` 按四个边界生成有序检查；`completeChecks` 计算 aggregate readiness；入口用最终 readiness 重建 intake digest；summary 与消息完成后，`createDeclaredProfile` 按旧键序返回公共对象。renderer 接收已经完成的 profile，不读取文件也不重新判断 readiness。

archive 的链路相似：入口先读取 v388 archive，建立 source reference，再调用 `loadDeclaredIntake` 从冻结 evidence 重放；draft verification 生成后，`createDeclaredArchiveChecks` 进行 JSON、资产、replay 和运行边界验证；共享聚合器决定 archive readiness；最终 verification digest、summary 和消息进入公共 archive profile。两条链都保留了“先 draft、再 checks、再 final record”的历史顺序，因此 digest 输入没有变化。

## 五、共享 checkAssembly 到底解决什么

四条 lifecycle 路径原来都用相同的三行逻辑：遍历 checks，排除 readiness 自身，确认其余值全部为真，然后原地修改 readiness。代码很短，却有三个隐患。第一，空对象调用 `every` 会得到 true，若某个 builder 意外只留下 readiness 键，报告可能错误放行。第二，普通 truthy 判断会把运行时混入的数字一、非空字符串或对象当作通过。第三，原地修改使 draft checks 与完成后 checks 共用身份，后续排查键序或阶段状态时不够清晰。

`completeChecks` 把这段机制收成纯函数。它先确认指定 readiness 键确实存在，再排除该键并要求 evidence 列表非空，最后用 `value === true` 做严格判断。返回值包含新 checks 对象和独立的 ready 布尔值。对象通过 `{ ...draft, [readyKey]: ready }` 生成；JavaScript 对已存在属性赋值不会把它移动到末尾，所以 readiness 原来位于何处，完成后仍位于何处。函数不理解 v160、v161、v151、v152，也不知道 route 和 blocker，因此它是机制抽象，不是吞噬领域规则的大配置表。

## 六、为什么键序也是合同

这些 profile 会直接 `JSON.stringify`，部分 digest 还会序列化嵌套 record。JavaScript 对象属性插入顺序因此不只是代码风格，它会影响完整 JSON 字节和 SHA-256。Markdown renderer 也按显式 section 顺序读取 profile。如果重构者把 checks 按字母排序、把 readiness 移到最后、先写 archive boundary 再写 replay，字段值即使完全相同，完整字节仍会变化。

本版的 `createDeclaredChecks` 使用四段 object spread，但 spread 顺序严格对应旧 `createChecks`：source 四项先出现，Java 判断随后，mini-kv 判断再后，runtime boundary 最后，readiness 仍为最后一项。archive checks 同样保持 JSON、资产、replay、禁止执行、readiness 的顺序。`profile.ts` 则逐项复刻旧顶层对象顺序，不让 loader 在取数过程中顺手插入字段。字节 oracle 在每次结构调整后立即执行，任何键序漂移都会表现为相同长度但不同摘要，不能靠更新期望绕过。

## 七、sources 层怎样处理上游证据

`declared/sources.ts` 拥有“上游字段怎样变成 Node 内部 reference”这一责任。文件元数据仍通过 historical evidence resolver 选择本地 sibling 路径或仓内 fallback，计算存在性、实际解析路径、字节数和摘要。JSON 值收窄则复用 v2223 的 `valueAt`、`stringValue` 和 `stringValues`，删除 declared 文件里第三份深路径读取、字符串数组过滤和字符串默认值函数。只有“空字符串应该转成 null”这一领域选择保留为局部 `stringOrNull`。

Java reference 保留 operator owner、启动命令、端口、GET-only smoke、cleanup、fail-closed 和 stop conditions。mini-kv reference 保留历史 fallback、归档兼容、v151 模板冻结、v152 声明式 lifecycle、runtime gate 前置条件以及所有禁止写入字段。sources 只收窄和映射，不决定证据是否足够，也不根据缺失字段自行放宽条件。缺失、错误类型或非法 JSON 会收窄为空字符串、空数组、null 或 false，随后由 checks 明确失败关闭。

## 八、intake checks 如何按所有者拆分

`intakeChecks.ts` 不是把旧函数平均切成几个文件，而是按证据所有者拆成四组。`sourceChecks` 验证 Node v387 archive 是否完成、source/replay checks 是否全过以及 start、stop、connect、execute 等边界是否关闭。`javaChecks` 验证 Java v161 版本、只读状态、operator owner、工作目录、8080 端口、GET-only targets、fail-closed rules、cleanup responsibilities 和 runtime gate prerequisites。每个多条件概念由具名谓词表达，例如 `javaRuntimeHandlesPresent`，调用者看到名称就能理解判定目的。

`miniKvChecks` 验证 v152 只读声明、v151 fallback 链、旧 Node v387 归档保持、模板冻结、operator lifecycle 字段完整以及 runtime gate 仍未获批。它没有把几十个字段做成动态字符串 schema，因为这些字段的语义并不相同：有些必须为 true，有些必须为 false，有些要求固定版本，有些要求列表包含具体条目。具名谓词虽然比万能循环多几行，却能在评审时直接显示错误条件，也能避免 `false`、零和空字符串被统一真值逻辑吞掉。

最后的 `boundaryChecks` 只关心跨项目安全：三份证据都必须来自 historical fallback，intake digest 必须是 SHA-256，不能自动启动或停止服务，不能写 sibling state，不能连接 managed audit，不能读取凭据值或解析 raw endpoint，production audit/window 必须关闭。它与 Java、mini-kv 的业务字段分开，因此以后新增一个 upstream 字段不会误触公共执行边界。

## 九、profile 层为什么值得独立存在

旧 loader 的长函数账本项并不完全来自复杂分支，而是因为它在完成数据处理后又写了一整份公共响应。`profile.ts` 把这份响应当成稳定协议装配。输入接口使用短字段名 `source`、`javaFile`、`miniKvFile`、`frozenFile`、`checks` 和 `ready`，输出仍使用旧 JSON 字段名，例如 `javaDeclaredOperatorLifecycleFile`、`readyForNodeV389ArchiveVerification` 和 `runtimeGateRequiresSeparateApproval`。

这种分层有两个收益。第一，loader 只需要回答“数据从哪里来、按什么顺序调用”，不需要在一百行返回对象中寻找流程。第二，公共键序集中在一个文件，未来若真有合同变化，评审者可以只检查 profile 与 renderer，而不是担心 sources 或 checks 偷偷改变输出。profile 仍显式写出 `readyForRuntimeLiveReadGate: false`、`executionAllowed: false` 和所有生产边界；它不会因为 declared evidence 完整就推导 runtime authorization。

## 十、archive checks 与 frozen replay 的机理

archive verifier 的职责不是再次访问 Java 或 mini-kv，而是验证 v388 已保存的证据以及用仓内冻结副本重放时是否得到同样的关闭结论。`archiveChecks.ts` 的 JSON 组验证 profileVersion、版本组合、check counts、digest、fallback 标志、declared evidence counts 和 runtime gate。资产组验证 JSON、Markdown、summary、browser snapshot、HTML、截图、解释、代码讲解、计划索引和归档索引是否互相指向正确版本。

replay 组调用当前 `loadDeclaredIntake`，但 archiveRoot 指向待验证仓库，historical resolver 在强制 fallback 模式下读取 Java v161、mini-kv v152 和 v151 固定文件。通过条件不仅要求 intake ready，还要求三份 evidence 都明确使用 fallback、版本精确匹配、declared source count 为二、ready source count 为三、runtime gate prerequisite count 为四，并继续禁止 probe、live read 和 active shard prototype。也就是说，replay 证明“冻结输入仍能解释历史结果”，不证明“现在可以运行服务”。

最后的 archive boundary 组验证 archive verification 本身没有 rerun live read、没有 start/stop、没有 mutation、没有 managed-audit connection，也没有 credential/raw endpoint 行为。aggregate ready 只在三十七项证据检查都严格为真时成为第三十八项通过；缺失 archiveRoot 的原有负向测试会让文件、JSON、source 与 replay 同时失败，并产生可定位的 blocker codes。

## 十一、短 API 迁移为何不保留兼容 alias

仓内消费者只有声明式 route、后续 runtime live-read gate plan、两份领域测试和 renderer parity 测试。它们都在同一提交中迁移到新路径和短符号，因此不存在需要长期兼容的外部 TypeScript package consumer。保留旧长 re-export 看似保险，实际上会让 elegance census 继续记录二十三条导出债，也会让新代码不知道应该选择新入口还是旧入口。

本版因此删除旧文件，不创建 facade。HTTP route、profileVersion 和 JSON 字段才是真正外部合同，它们全部保持。TypeScript 内部路径属于仓内实现，可以在完整调用面已知、typecheck 与测试覆盖充分时直接迁移。目标家族由七条文件名债和二十三条导出债降为零，全仓 name debt 从四千五百零五收紧到四千四百七十五。

## 十二、local 与 historical fallback 怎样验证

同一固定时间下，oracle 分别使用正常解析优先级和 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`。正常模式会在 sibling 工作区存在时读取固定版本文件，强制模式则必须解析到 `fixtures/historical/sibling-workspaces/...`。两种模式的领域内容相同，所以完整 profile 与 Markdown 应相等；如果 sibling 固定证据被意外修改，local 与 fallback 对比会立即指出来源分歧。

本版没有通过 `loadConfig` 假装设置 fallback，因为 resolver 直接读取环境变量。验证脚本明确修改 `process.env`，完成后恢复原值。两份 declared 领域测试继续覆盖 fallback 标志为 true，archive replay 也验证三份冻结版本。Java 和 mini-kv 当前其他会话可以继续推进，Node 不读取它们未提交的 rolling current，也不要求它们为本版生成新证据。

## 十三、完整字节 oracle 证明了什么

固定 `generatedAt` 为 `2026-07-21T00:00:00.000Z` 后，service intake JSON 是 15,922 字节，SHA-256 为 `979c9b8feefed725ffc36a71f7c9ca848ebc3fe610bde75fb589c8361ef168ff`；Markdown 是 13,748 字节，摘要为 `ff34aaa902ccca2a470db1ebc47d8b2035921d48afdac8e95da34d4328b480c9`。service archive 为 12,850/11,147 字节，摘要分别为 `33f4b2f9ebdccd588488d8feba9d295273bcf4ca0b2e09e093e62d483b678016` 与 `7098c601672cde98889930557c5300eeef360894fee00e8d2dd791c43079e7e1`。

declared intake JSON 是 15,237 字节，摘要为 `23009992c1707ae5c572a877a26bde583081e3e8b2ea7402f5d063c5423164ff`；Markdown 是 13,047 字节，摘要为 `7155bae78bdb6a2b8e39111179591367a8fcbfe4ba4d08445e5e21f8f6174100`。declared archive 为 12,938/11,272 字节，摘要为 `27b7cde68e40aac016632f9de9aed186603842cbeeb495ba7c257e46891c33c0` 与 `b781b7c4003239d515db00d6b319ecb986562fb3c0a72ce242bce3577ecbfe93`。八个结果在路径迁移后、checks 拆分后和 profile 提取后各复验一次，全部不变。

完整 oracle 覆盖的不只是测试里列出的几个字段。它同时覆盖对象键序、数组顺序、路径文本、fallback 标志、所有 checks、summary、messages、nextActions、evidenceEndpoints、空行、Markdown 标题以及末尾换行。若本版只跑 `toMatchObject`，某个未断言字段漂移仍可能漏过；完整摘要把这类静默变化变成机械失败。

## 十四、负向测试为什么比新增 happy path 更重要

共享聚合器的单测先验证输入不可变和键序不动，再验证三种关闭情况：一项 evidence 为 false；对象只有 readiness 而没有任何证据；TypeScript 边界外传入数字一。最后一种测试故意通过 `unknown` 转型模拟运行时污染，确认算法使用严格布尔判断而不是 truthy。这样即使未来有 JSON 动态映射错误，也不会因为值“看起来有内容”而放行。

原 intake 测试会在空临时目录中加载证据，预期 state 为 blocked、ready 为 false，并检查 source、Java、mini-kv 等 blocker。archive 测试同样用空 archiveRoot，要求 `ARCHIVE_FILES_MISSING`、`ARCHIVE_JSON_UNREADABLE`、`SOURCE_V388_NOT_READY` 和 `REPLAY_FAILED` 出现。受保护 route 测试继续携带 operator、roles、verified 和 approval correlation headers，说明二百响应来自合法访问上下文，不是绕过 access guard。

## 十五、机械账本怎样证明没有平移热点

重构后 declared intake 入口降到二百八十五行，其中 loader 已离开长函数名单；checks 虽然有二百六十余行，但由二十多个短谓词构成，没有新的长函数或复杂函数。archive 入口降到四百三十余行，原九十九行复杂 `createChecks` 被一百七十余行、职责分组清晰的 checks 文件替代。单文件总行数不是唯一指标，函数边界、复杂度和导入环共同决定维护成本。

维护性 census 从 83 个近限文件、96 个长函数、215 个复杂函数、0 个导入环，收紧为 83/94/213/0。name census 从 4,505 收紧为 4,475，文件债 977 降为 970，导出债 3,528 降为 3,505。受管 family 仍是 52，没有新达到三项阈值的复制家族。两份 baseline 在确认实际下降后刷新到精确值，不能保留宽松余量，也没有通过提高阈值掩盖新增代码。

## 十六、验证节奏与资源边界

本版 focused 验证使用最多四个 Vitest workers，覆盖 `checkAssembly`、service intake/archive、declared intake/archive、project JSON、renderer parity 和 renderer census，共八个文件三十二项。TypeScript 无输出通过，定向 ESLint 为零错误零告警。最终静态门在本文写入后执行，以便 walkthrough 质量门验证真实交付物；全量测试、build、HTTP smoke 和远端 CI 按批次计划留到 v2227，避免每个纯重构版本重复消耗同一验证成本。

本版没有启动 dev server、浏览器、Java 或 mini-kv，也没有留下 Vitest worker。没有 HTML 或 UI 行为变化，因此截图不适用；截图只能显示渲染外观，不能证明 TypeScript 所有权、严格布尔关闭或 JSON 键序。更合适的证据是八份完整字节 oracle、负向测试、导入环 census 与下收的机械账本。

## 十七、后续维护者怎样扩展这组代码

若以后增加 Java 或 mini-kv 字段，先判断它属于数据映射还是业务判断。原始 JSON 到 typed reference 的收窄进入 `sources.ts`；版本、列表、禁止项和 readiness 进入对应 checks 具名谓词；公共字段和键序只在 `profile.ts` 调整；Markdown 文案只在 renderer 调整。不要把 route、版本和 blocker 塞进 `checkAssembly`，也不要用一张无类型大 schema 同时描述必须为真、必须为假、固定字符串和列表包含关系。

若增加新的 aggregate-ready 消费者，复用 `completeChecks`，并保持 readiness 键在 draft 中显式存在。若 evidence 数量可能为零，应接受共享函数的失败关闭结果，而不是在调用方特殊放行。若新子域出现第三套 `sources/checks/profile/renderer`，先确认它是否真的属于 operator lifecycle；属于则建立独立子目录，不属于则放在自己的 bounded context，避免目录名和共享机制反向吞并业务边界。

## 十八、版本结论

v2225 在八份完整输出逐字节不变、四类 aggregate-ready 负向条件可机械失败、route 与运行安全字段不变的前提下，把 declared operator lifecycle 从长文件和长符号集合收敛为可定位的 sources、checks、profile、archive 与 renderer 边界，并让 service/declared 四条路径共享一个严格、纯净、失败关闭的 readiness 完成机制；这次改造减少了三十条命名债、两条长函数债和两条复杂函数债，却没有把任何声明式证据升级为真实执行授权。
