# v2207：审批就绪回显服务的三层职责拆分

## 一、目标与非目标

v2207 的目标不是继续延长凭据解析器治理链，而是偿还一个已经由机械 census 精确定位的维护性热点。目标文件同时承担公共入口、Node v281 读取、Java v116 历史材料解析、mini-kv v122 回执解析、二十三项检查、阻断项、警告、建议、摘要和最终 profile 组装，共 788 行。更关键的是，其中 `createChecks` 单个函数有 187 行、复杂度 137，所以同一处代码在近线文件、长函数和复杂函数三个基线中各占一条债务。本版的成功输出应当是三条债务同时消失，而不是只把行数挪到另一个同样难读的文件。

非目标同样明确：不改公共模块路径，不改任何 profile 字段或字段顺序，不改 JSON、Markdown、route、fixture、Java/mini-kv 材料，不打开上游探测或动作，不增加服务和路由文件，也不顺便重命名历史长类型。这个范围使“代码更容易读”与“系统行为不变”可以分别用 census 和字节 oracle 验证。

## 二、入口、路由与响应模型

对外入口仍是长文件名模块导出的 `loadManagedAudit...UpstreamEchoVerification`。路由注册器仍从原路径导入 loader 和 Markdown renderer，所以调用者不需要知道内部发生过拆分。请求进入后先取得 Node v281 的审批边界审查，再读取 Java v116 与 mini-kv v122 的只读证据，生成 checks、verification digest、echo verification、消息列表和 summary，最后返回原有 profile。可以把服务 flow 简化为：

```text
audit route
  -> public service facade
       -> Node v281 review service
       -> approvalReadinessEchoSources (Java/mini-kv data)
       -> approvalReadinessEchoChecks (pure policy assessment)
       -> stable profile
  -> existing JSON or Markdown renderer
```

响应模型没有重新定义。`profileVersion`、`verificationState`、`upstreamEchoes`、`checks`、`summary`、`evidenceEndpoints` 和 `nextActions` 仍按原顺序进入对象。Java 与 mini-kv 引用仍使用既有超长类型，因为这些类型属于历史契约；为了追求短名字而改动它们，会扩大影响面，却不会改善本次入口的职责边界。

这里的“顺序不变”不只是排版要求。JavaScript 对普通字符串键按插入顺序序列化，renderer 也按 checks 的枚举顺序输出表格。顶层 checks 最后还会重新赋值总 readiness；给已经存在的属性赋值不会把它移动到对象末尾的新位置。因此拆分后的组合函数必须先按旧顺序创建二十三个键，再由 facade 覆盖最后一个值。新 oracle 同时冻结 JSON 和 Markdown，恰好能验证这一层语言机理。

## 三、为什么不能直接新增两个 service 文件

拆大文件最容易犯的错误，是只看单文件行数，不看仓库总量门。本次开始时 `src/services` 已经正好 1125 个 TypeScript 文件，`src/routes` 正好 80 个；`governanceGrowthRatchet` 把这两个数字设为不可上调的上限。如果在 services 下直接加入 references 和 checks，代码局部会更短，但全仓门会立即失败。v2205 已经用一次 82/80 的失败证明，这种“拆分即增长”不是可接受方案。

仓库已有 `src/evidence` 领域，负责历史文件、fixture 和证据解析。Java/mini-kv 资料读取天然属于这里；检查逻辑也只对这些证据做只读判断，不拥有 Fastify 路由或运行时连接。因此两个新模块放入 evidence，公共 service 数保持 1125，路由仍为 80。依赖方向是 service 调 evidence；evidence 只以 `import type` 引用 service 契约，运行时不会反向加载 service，也没有新增导入循环。最终 maintainability census 的循环数仍为 2。

TypeScript 的 `import type` 会在编译产物中被完全擦除，所以 checks 与 sources 虽然借用原 profile contract 做静态校验，生成的 JavaScript 不会因此反向 `import` 公共 service。真正的运行时边只有 facade 指向两个 evidence 模块，以及 facade 指向原 Node v281 review service。这样既复用既有类型，又避免为了“分层”制造一个隐藏循环；循环数由导入图 census 直接复核，而不是依靠开发者目测。

## 四、Sources 模块怎样把数据边界收拢

`approvalReadinessEchoSources.ts` 有 256 行，只负责数据获取。它集中保存七个上游路径、六个审批边界 code、十八个 required artifact id，并导出 Java v116 与 mini-kv v122 两个引用构造器。Java 构造器通过 `evidenceFile` 与 `snippet` 检查运行说明、中文讲解、support 和 builder；mini-kv 构造器通过 `readJsonObject`、`objectField`、`booleanField` 等结构化工具读取回执。没有用正则拼 JSON，也没有把原始凭据或 endpoint 值带入 profile。

这些常量原来散在公共 service 顶部，既被数据读取使用，也被检查函数使用。移动后 checks 模块直接导入同一组 boundary/artifact catalog，避免复制第二份数组。主入口只需要 `APPROVAL_ECHO_PATHS` 来构造原有 `evidenceEndpoints`。输入仍是提交内 fixture 或兄弟工作区的同一文件，输出仍是同一 Java/mini-kv typed reference；变化只发生在代码所有权上。

Java 侧不是简单判断文件存在：十个 snippet 分别确认标题、Node v281 消费关系、运行模式、边界数、材料数、检查数和 Node v282 标记，再由这些结果决定 receipt version 与 readiness。mini-kv 侧先逐层取得 receipt、boundary readiness、checks 和 summary；字段缺失时既有解析器返回约定的空值或 false，最终 readiness 自然关闭，而不是抛出后继续伪装成功。迁移完整保留了这种失败关闭语义，所以路径写错时旧测试会立刻从 ready 变成 blocked。

## 五、Checks 模块怎样降低复杂度

原 `createChecks` 把二十三个布尔字段放进一个 187 行对象，其中不少字段由十几到三十个 `&&` 连接。人阅读时必须在同一函数里来回区分 Node 自身阻断、Java 回显、mini-kv 非参与、三方数组对齐和运行时开关。新模块把键按原顺序分成 `createNodeChecks`、`createJavaChecks`、`createMiniKvChecks`、`createAlignmentChecks`、`createBoundaryChecks` 和 `createRuntimeChecks`。顶层 `createChecks` 只按这六组顺序展开对象，因而 JSON 键顺序不变。

每组内部使用 `all([条件一, 条件二, ...])` 表达“全部为真”。这里不是为了缩短字符而发明抽象，而是把复杂控制流转成可扫描的数据列表。所有元素都只是布尔值、字段读取、长度比较或纯 `every`，没有函数调用副作用；即使数组会先求值，也不会改变原 `&&` 的业务结果。`all` 自身只是 `values.every`。这种写法让维护者能逐项核对边界，同时使任一函数都不再超过长函数或复杂度门。

六个分组并不是任意切块。前两组分别回答“Node 的前置审查是否就绪”和“Java 是否按约定回显”，第三组验证 mini-kv 明确不参与执行，第四组比较三方 code 与 artifact 的位置一致性，第五组关闭凭据、端点、连接、写入和自动启动，第六组才读取当前 config。这个顺序与旧对象完全一致，也符合排障顺序：先看来源是否存在，再看内容是否一致，最后看运行开关是否误开。

## 六、输出 oracle 为什么要做路径归一化

这类服务的 profile 含有 `resolvedPath`。同一历史 fallback 在 Windows 会出现反斜杠和盘符工作区，在 GitHub Linux runner 会出现正斜杠和不同绝对根。如果直接冻结原始 JSON 哈希，本地能过、CI 必然红；如果完全删掉路径再哈希，又会漏掉证据文件顺序和路径内容漂移。新增 oracle 采用中间方案：强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，把 `generatedAt` 固定为一个时间，递归遍历 profile 中的字符串，将分隔符统一为 `/`，再把当前仓库绝对根替换为 `<repo>`。

归一化后，JSON 固定为 27742 个 UTF-8 字节，SHA-256 为 `b0946c5593e697b2278f8cba3efb6a365cc59627a55c26f8eaa174d1cd8da957`；Markdown 固定为 13925 个字节，SHA-256 为 `6b3349cad1adcaee9b0dd6bbcf6996a5f505e6c40405bc9d46b06409c0107377`。测试使用四个 soft assertion，一次失败能同时展示两种长度和两种哈希，便于判断漂移来自结构还是文本，而不是先修一个再重复运行三次。

归一化只处理环境差异，不抹掉业务差异。它不会排序对象、删除 evidence file、忽略数组顺序或替换任意外部路径；只把当前仓库根变成稳定占位符，并把反斜杠改成正斜杠。若有人改变字段顺序、漏掉一个 snippet、修改 warning 文本或换了 fallback 文件，长度或哈希仍会变化。这样既避免 Windows/Linux 假红，又没有把 oracle 弱化成几个宽松的局部断言。

## 七、先红后绿以及一次真实迁移错误

oracle 加入时故意把长度设为零、哈希设为占位字符串。第一次执行得到 1 个新用例失败、4 个旧用例通过，并打印四个当前值；把这些值写入后，迁移前 5/5 全绿，说明安全网确实冻结了旧输出。随后第一次搬运并没有直接成功：Java v116 的讲解路径原本位于“代码讲解记录_生产雏形阶段_续”，搬运时错误猜成了另一个目录名。

这个单字符级路径错误使 Java evidence file 不存在，`readyForNodeV282Verification`、两个 Java checks 和总 readiness 变 false。既有语义测试报告 4 个用例失败；新 oracle 同时报告 JSON 从 27742 变为 27827 字节、Markdown 从 13925 变为 13957 字节，两个哈希也改变。处理方式不是更新期望，而是用 `git show v2206:<path>` 从已提交对象读取原始常量，恢复准确目录。随后同一 5 个用例和四值 oracle 全部回绿。这段失败证明 oracle 能抓到真实证据路径漂移，而不是只验证重构者希望看到的字段。

诊断时也没有从兄弟项目“找一个看起来像的文件”来迎合测试。v2206 Git 对象是本次迁移的权威输入，`git show` 给出的原字符串可以与迁移前哈希形成闭环；恢复后本机路径与强制 fallback 两种测试同时通过。如果只修成本机现有目录，GitHub runner 会因没有兄弟工作区再次失败，这正是计划要求两种证据模式都存在的原因。

## 八、基线如何做到只减不增

代码转绿后先运行旧 maintainability baseline，而不是先删账。census 报告实际结果已经是 88 个近线文件、120 个长函数、237 个复杂函数和 2 个循环，但 `Ready: false`；失败原因恰好只有原 788 行文件、原 187 行 `createChecks` 和原复杂度 137 的 `createChecks` 三条 stale。报告没有 added 或 grown 条目，新建文件也没有进入任何阈值。

在这个证据成立后，基线只删除三条已偿还记录，再运行得到 `Ready: true`。最终公共 facade 158 行，sources 256 行，checks 482 行；服务和路由文件数保持 1125/80。优雅 census 仍是 4537 条存量命名债务，说明没有新增超预算标识符；tracked family 仍为 52，两个新模块没有触发“三次规则”。这比简单宣称“文件变短了”更严格，因为全仓每一类可能的债务转移都由门检查。

维护性脚本并非按文件名猜测，它解析 TypeScript AST，分别统计文件总行数、函数源码跨度、条件与逻辑分支分数，并构造相对 import 图。旧基线给每个已知热点一个只能下降的最大值；重构后若新函数达到阈值，会出现 added，若旧热点更差会出现 grown，债务消失但账未删则出现 stale。此次只出现三条 stale，因而能证明债务被偿还而非转移。

## 九、上游证据与安全边界

Java v116 和 mini-kv v122 仍是只读输入。测试一条路径读取本机兄弟工作区，另一条显式强制读取 `fixtures/historical/sibling-workspaces`，两种情况下都不启动 Java、mini-kv 或外部审计服务。`UPSTREAM_PROBES_ENABLED` 和 `UPSTREAM_ACTIONS_ENABLED` 继续为 false；credential value read、raw endpoint parse、external request、resolver client、schema migration、approval ledger write 和 automatic start 仍全部为 false。

当前 Java 已提交到 v1871 并在独立处理 v1872 immutable DTO，mini-kv 已到 v1667，只修改展示简报。v2207 不消费这些新脏树，所以它们可以并行。没有 fresh sibling contract、没有 live capstone、没有执行授权。本版的安全输出不是“更接近连接外部系统”，而是同一份阻断 profile 更容易维护。

历史 fallback 开关还有一个容易误解的细节：resolver 直接读取 `process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK`，仅把同名值放进 `loadConfig` 参数并不能证明 fallback 真被执行。专门测试先保存进程环境、设为 true、验证 resolved path 落入提交内 fixtures，最后在 `finally` 恢复原值。这保证测试不会污染后续用例，也让本地与 CI 的证据来源可明确区分。

## 十、测试覆盖、构建与 smoke 计划

迁移后首先通过目标文件 5/5，再把 v283 plan draft、v284 upstream echo、maintainability adversarial test 和 governance growth ratchet 合并运行，得到 5 个文件、24 个用例通过。typecheck 与零警告 lint 通过；maintainability、elegance、family logic、source size、renderer 和 security/config 门均通过。v2206 的累计远端 run `29693804255` 也已经完成全部测试、build 与 safe smoke，排除了前一版本遗留红灯。

最终批次还会运行完整 Vitest、独立测试清单、build，并用受跟踪的安全配置服务请求目标 JSON 与 Markdown route。因为源码没有触碰 HTML、Dashboard 或任何可渲染页面，本版不制作截图；强行截一张无关页面不会证明这次拆分正确。可复现证据应集中在 profile 字节、双证据模式、下游调用、ratchet 和实际 HTTP 响应。

HTTP smoke 会使用独立端口、关闭 probes/actions 和访问强制，只请求 health、目标 JSON 与同一路由 Markdown。响应码和字节数用于证明构建产物而非测试注入路径也能工作；随后必须终止受跟踪进程并复核端口监听为零。完整套件仍使用最多两个 worker 的顺序分片，避免过去高并发 Vitest 产生大量 Node 子进程和内存压力。

## 十一、一句话总结

v2207 在保持公共入口、三方只读证据和 JSON/Markdown 字节完全不变的前提下，把一个同时占三条维护性债务的 788 行服务重构为清晰的数据、判断与装配三层，并用可跨平台 oracle 证明没有把复杂度或行为偷偷转移到别处。
