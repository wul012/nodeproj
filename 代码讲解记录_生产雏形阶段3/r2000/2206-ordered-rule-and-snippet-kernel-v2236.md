# Node v2236：从七百四十四个分支到两种可审计内核

## 目标与非目标

本版解决的不是业务能力不足，而是两种已经妨碍维护的表达方式。第一种出现在十九个 controlled-shard validator 中：每个 gate 都写成“条件成立返回空值，否则返回错误码”的三元表达式，随后再过滤空值。第二种出现在 Java v106 与 v107 历史证据 reference 中：同一个 snippet 是否命中，被反复转换成字符串、数字或安全布尔值，再由几十项短路条件计算 ready。非目标是新增分片执行、连接 sibling 服务、改 route、改 schema、改 fixture 或扩大任何写权限。本版输入仍是冻结文件和内存对象，输出仍是原 profile 与原 blocked-reason 数组。

## 一、开始时真实问题有多大

v2235 结束后维护账本为七十个近限文件、七十一个长函数、一百八十八个复杂函数、零个导入环。终局要求分别不超过七十、七十、一百七十和零，因此至少要消除一个长函数与十八个复杂函数。实时排名显示，十九个 blocked-reason 函数都超过复杂度二十，其中最高为五十九；Java v106/v107 的两个 source reference 和两个 upstream reference 也同时处于复杂榜，后两者还是一百四十行以上的长函数。这说明按同一领域整批治理，能够同时解决两个硬门，而不必到处做零散小提取。

## 二、为什么 blocked reason 是一个真实家族

这些 validator 的业务字段不同：有的检查人工 worksheet，有的检查证据导入，有的检查签名模板、草稿、review package 或 text package。但它们的算法完全相同。输入是一组已经计算好的布尔 gate；每个 gate 绑定一个稳定失败码；输出只保留失败项，并严格维持声明顺序。领域文件必须继续拥有“哪个条件对应哪个错误码”，因为这是业务语义；重复的只是过滤算法。第三次规则在这里早已被十九份实现触发，因此共享点应当是执行内核，而不是再复制第二十个过滤器。

## 三、`blockedReasonKernel.ts` 的输入与输出

内核接收只读二元组数组，每项形如 `[passes, failureReason]`。`passes=true` 表示该规则通过，应从结果中丢弃；`passes=false` 表示失败，应输出第二项字符串。内核先过滤失败项，再映射错误码，不排序、不去重、不修改字符串。比如输入 `[[true, "A"], [false, "B"], [false, "B"]]`，输出必须是 `["B", "B"]`。重复原因仍保留，因为两个来源相同的失败也可能代表两条独立证据；擅自去重会改变诊断数量和顺序。

## 四、迁移前后的等价关系

旧表达式 `gate ? null : "FAIL"` 与新规则 `[gate, "FAIL"]` 使用同一个布尔值和同一个字符串。旧数组在尾部过滤 `null`；新内核过滤第一项为假的元组。两者都先按源码顺序求值所有 gate，再按声明顺序产生结果，因此没有短路差异。gate 已经是普通布尔字段，不会在读取时发网络请求、写文件或改变计数器。若未来有人传入有副作用的 getter，原实现和新实现都会访问它一次，但这种输入本身就违反 validator 只消费已计算事实的边界。

## 五、为什么不能只用 `Object.entries(gates)`

看起来可以遍历 gate 对象并自动生成错误码，但那会丢失领域映射。字段名不是公开失败码，许多错误码还保留历史措辞和上下文前缀；把字段名机械转成大写字符串会改变 API，也无法表达同一字段在不同阶段的不同诊断。显式元组让 reviewer 一眼看到条件与失败码的配对，同时共享内核只负责算法。数据和行为因此分开：领域数据留在 validator，通用行为留在 kernel，没有把业务知识藏进字符串拼接器。

## 六、十九个文件怎样安全迁移

迁移脚本没有在全仓做盲目替换，而是读取维护账本中函数 key，使用 TypeScript AST 找到指定 `FunctionDeclaration` 的 body 范围，只在该范围把单行三元项改成二元组。脚本逐函数统计旧三元数量与成功转换数量，两者不相等就立即失败。迁移后脚本被删除，不进入提交。随后又用 TypeScript AST 扫描这十九个目标函数，确认剩余 `ConditionalExpression` 数量为零。这样既避免漏项，也不会误改同文件中的其他条件表达式。

## 七、两条跨行规则暴露了什么

十九个函数中有两项因为原条件跨行，第一次机械转换没有形成完整元组。第一项在 artifact draft preflight 开头，第二项在 capture preflight 末尾。typecheck 分别以语法错误和元组类型错误阻止了继续提交。修复不是放宽脚本或给类型断言，而是把条件与错误码明确写成多行二元组；之后 AST 零残留检查再次通过。这件事说明机械迁移必须同时有语法门、类型门和结构门，单看替换计数并不足够。

## 八、规则内核的单元契约

`blockedReasonRules.test.ts` 单独验证两件事。第一，穿插通过与失败项时，只输出失败码且顺序不变；第二，两个失败项使用同一字符串时，结果保留两个元素。十九个领域测试则验证真实 profile：从 manual evidence worksheet 一直到 text package submission preflight，二十个测试文件共九十三项全部通过。单元测试证明算法，领域测试证明每条链的 gate 与错误码仍正确，两层证据互不替代。

## 九、为什么文件最终叫 kernel 而不是 rules

初版共享文件名是 `blockedReasonRules.ts`。优雅 census 立即拒绝，因为它使 `src/services:rules` 从两个文件增长到三个，触发新的受管 family。虽然代码已经共享，这个名字仍让仓库结构看起来像第三份平行规则集合。最终改名为 `blockedReasonKernel.ts`：它确实是执行内核，不拥有任何领域规则。改名后 name debt 仍为四千四百四十四，tracked family 仍为五十二，new family 回到零。这个门禁不是形式主义，它迫使文件名准确表达抽象层级。

## 十、Java reference 原先为什么复杂

`createJavaV106Reference` 和 `createJavaV107Reference` 都先读取四份历史文件，再建立二十多条 snippet，最后把每条命中结果逐个写成字段。字符串字段命中时返回稳定版本，缺失时返回 `missing`；计数字段命中时返回固定数量，缺失时返回零；危险能力字段的方向相反，证明 snippet 缺失时必须返回 `true`，从而让后续安全边界拒绝 ready。大量三元表达式不是不同算法，而是同一“命中值/缺失值”投影反复展开。

## 十一、`mapSnippetFields` 怎样工作

每个 spec 明确声明目标字段、snippet id、命中值与缺失值。例如 v106 的 `requiredEnvHandleCount` 绑定 `java-v106-required-env-count`，命中值为六，缺失值为零；`resolverClientMayBeInstantiated` 绑定 blocked snippet，命中值为 false，缺失值为 true。mapper 按 spec 顺序写入对象，并拒绝重复 target。它不猜类型、不根据字段名决定默认值，也不解释领域含义。返回类型由只读 tuple 推导，因此字符串字面量、数字和布尔值都保留在接口允许的联合类型中。

## 十二、缺失证据为什么仍然 fail-closed

fail-closed 不能简单理解为所有缺失值都填 false。对“已验证”“边界关闭”这类正向字段，缺失应为 false；对“客户端可能实例化”“外部请求可能发送”这类危险字段，缺失必须为 true，随后 `BoundaryClosed` 要求它为 false，ready 才能成立。spec 把这两个方向逐项写出来，比散落在对象右侧的逻辑非更容易审查。若有人误把危险字段缺失值改为 false，完整 profile hash 与 blocked case 都会失败，不能静默放行。

## 十三、组合 snippet 为什么单独处理

v107 的 `requestShapeEchoed` 需要三个 snippet 同时命中，`responseShapeEchoed` 需要四个。它们不是单字段投影，因此使用 `snippetsMatched` 接收有序 id 列表并执行全量匹配。其他一对一字段继续使用 map。这样没有把不同语义硬塞进一个万能 spec：mapper 负责一条证据到一个字段，组合 helper 负责多条证据共同证明一个结论。函数边界按语义区分，而不是按减少行数区分。

## 十四、JSON 属性顺序如何保持

完整 profile oracle 使用 `JSON.stringify` 后的字节长度和 SHA-256，因此属性顺序变化也会失败。迁移时 spec 被分成多个有意义的段，并在原对象的相同位置展开。身份字段先出现，随后仍是三个固定计数；实现状态字段、connection 字段和 runtime 字段也分别插回原位置。v107 的 request/response 组合字段继续显式位于 identity 与 echo flags 之间。mapper 内部按数组声明顺序赋值，所以对象键序与旧手写对象一致。

## 十五、ready 为什么拆成 contract 与 boundary

原来四个 reference 的 ready 都是一条四十项左右的 `&&` 链，把版本、计数、数组相等与 no-write 条件混在一起。现在每条链分成 `ContractReady` 与 `BoundaryClosed` 两组。前者回答“证据是否指向预期版本、字段和数量”，后者回答“凭据、endpoint、网络、写入、自动启动是否仍关闭”。顶层只要求两组都成立。数组仍逐项列出真实比较，没有把条件藏进动态反射，也没有把一行 wrapper 当成重构成果。

## 十六、四个热点的结果

Node v262 source reference 从复杂度四十九降到一，函数为六十七行；Java v106 reference 从一百四十六行、复杂度五十八降到七十一行、复杂度一。Node v264 source reference 从复杂度四十四降到一，函数为六十四行；Java v107 reference 从一百四十四行、复杂度五十七降到八十行、复杂度一。新建的 contract/boundary helper 都低于长函数与复杂度阈值，没有产生 replacement debt。

## 十七、完整 profile oracle 证明什么

修改生产源码前，在固定时间 `2026-07-21T16:00:00.000Z` 与强制历史回退下冻结两份结果。v106 profile 为三万八千三百四十三字节，哈希为 `774add4d75f8222cfa72d57efa1087972eeb7ba49b89aa1320d6d27c53609aa9`；v107 为四万三千零六十八字节，哈希为 `f338d2f3b78afc8e3130a80bfcad8c975bb5ad395f4acfb570c2c70b4b2c72cc`。迁移后永久测试逐字节复验，说明字段、键序、证据路径、summary、digest 和最终 ready 都未变化。

## 十八、历史回退边界如何验证

两个现有领域测试都直接设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，并断言 Java v106/v107 与 mini-kv v115/v116 的 resolved path 位于仓库 `fixtures/historical/sibling-workspaces`。因此本机即使存在真实 sibling 工作区，也不能替代冻结输入。v2236 没有启动 Java、mini-kv 或 HTTP server，也没有读取网络。Java 与 mini-kv 可以独立并行推进，Node 不是它们的批准前置。

## 十九、维护账本为何可以向下刷新

刷新前 census 报告二十三个 stale complex key 与两个 stale long key，没有 unknown、grown 或 import cycle。stale 的含义是旧债务已经消失，而不是扫描失败。刷新后实测为七十个近限、六十九个长函数、一百六十五个复杂函数、零导入环，优于终局七十、七十、一百七十、零。阈值仍是六百行、一百二十行和复杂度二十，没有任何放宽；baseline 只是删除已经不存在的 key。

## 二十、审查者最短复核路径

先读 `blockedReasonKernel.ts` 的五行实现和单测，确认过滤、顺序与重复项语义。再任选 submission preflight 与 worksheet 两个远端阶段，核对领域文件只保存元组数据。随后读 v106/v107 spec，特别检查危险字段的缺失值方向；再读四个 contract/boundary helper。最后运行二十个 validator 测试、三份 resolver echo 测试、typecheck、lint、maintainability、elegance 与 family census。若只想检测输出漂移，永久 profile parity 是最快入口。

## 二十一、失败时怎样定位

blocked reason 数组失败时，先比较第一个不同错误码的位置：缺项通常是 gate 布尔值或元组顺序，重复项变化则检查是否有人擅自去重。profile 字节失败但领域断言通过时，先看 spec 顺序和对象展开位置；ready 失败时再进入 contract/boundary 分组。forced fallback 失败应先检查 resolved path，不要先修改业务条件。elegance 报新 family 时先审查文件抽象名，禁止刷新 baseline 掩盖结构增长。

## 二十二、停止条件与下一版

本链在 long 与 complex 达到终局阈值、profile byte oracle 通过、family/name 不增长后停止。v2236 已满足这些条件，因此不继续把其他小函数迁入 kernel，也不为了更漂亮的数字扩大修改面。下一版只处理私有 mega type barrel 的无人消费 re-export，把 name debt 从四千四百四十四降到四千二百以内，然后执行完整九分门、分片测试、coverage、build、smoke 与远端 CI。功能、route 和执行边界继续冻结。

## 一句话总结

v2236 用一份有序失败规则 kernel 和一份 typed snippet 投影，把十九个 validator 与四个 reference 热点从复制分支改成“领域数据明确、通用行为集中、安全缺失显式”的结构，同时以完整字节 oracle、九十三项领域测试和只收紧账本证明行为没有变化。
