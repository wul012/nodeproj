# Node v2239：让展示路径、选定来源和真实内容各守自己的边界

## 目标、非目标与问题背景

v2239 延续 v2238 的跨平台收口，但不扩大功能面。第二次 Node Evidence 已证明 v106/v107 profile 与 operator-window 三项原始 Linux parity 失败消失，说明生产层“稳定报告路径”和“规范文本元数据”方向成立。新的阻塞来自 downstream 测试：一个 helper 把展示别名当文件句柄，两个 renderer migration 用例发现相对路径被提升为绝对路径。本版目标是纠正这些消费者分层，同时保留所有既有完整 golden。非目标是增加 route、fixture、schema、平台专用 hash、网络行为或执行能力。

## 一、三个路径概念不能再混称 resolved

历史模型里常见 `path` 与 `resolvedPath` 两个字段。`path` 是领域声明，例如 sibling 工作区中的 Java 说明或 Node 自己的 `e/408` 文件；`resolvedPath` 表示报告生成时选择的来源，过去恰好也能在本机打开。v2238 又引入实际 content path，用来读取 fallback 或 pinned snapshot。三者分别代表声明身份、报告解释和 I/O 位置。名称相近不等于合同相同，消费者必须先明确自己需要展示、比较还是读取，不能继续拿任意一个字符串兼做三种用途。

## 二、第二次远端失败为何是好证据

run `29883103416` 没有再次报告 v106/v107 字节数或 operator hash，说明第一层补丁在干净 Linux checkout 上生效。它随后在 `test/support/portableProfileParity.ts` 报告无法打开 `D:\nodeproj\...`，又在 v2168/v2169 报告 Markdown 分别多 156 与 182 个字符。这些错误比笼统“CI 红了”更有信息：生产输出稳定了，但测试工具仍认为稳定文本必须是主机路径；同时生产投影对相对值做了过度处理。两处都能局部修复，不需要推翻设计。

## 三、为什么不能让 Linux 创建一个伪 D 盘路径

Linux 文件名理论上可以包含冒号或反斜杠，但在工作目录里人为创建一棵名为 `D:\nodeproj...` 的树，只会让测试偶然通过，并把展示层错误传播到运行环境。CI setup 也不应为一个报告字段制造兼容文件系统。稳定别名的价值正是脱离物理根；如果为了让它可读又复制文件，展示与 I/O 会再次耦合。正确修复应让读取者调用 resolver，而不是让操作系统迁就报告文本。

## 四、相对路径被提升的具体机理

v2238 的 `resolveHistoricalEvidenceReportPath` 先调用普通 resolver。对于 `e/398/input/node-approved-runtime-window-v398.json`，forced fallback 没有匹配绝对前缀，所以普通 resolver 原样返回相对字符串。随后 `path.relative(REPO_ROOT, resolvedPath)` 会在内部把第二个参数按当前工作目录解析，结果看起来位于仓库根，于是函数又通过 `path.win32.join` 生成绝对 canonical 别名。逻辑每一步都合法，但组合后改变了“相对输入保持相对”的旧合同。

## 五、为何一个早返回比更多映射更优雅

解决相对路径不需要新增 `e/398`、`e/408` 规则，也不需要 renderer 特判。`if (!path.isAbsolute(resolvedPath)) return resolvedPath` 直接表达边界：canonical alias 只解决绝对 checkout 根差异，相对值没有宿主机根，本来就可移植。这个 guard 同时覆盖所有未来仓库相对证据，不依赖版本目录或文件名。它还恢复 v2168/v2169 原 golden，证明不是通过更新期望接受新输出。

## 六、portable helper 的旧算法做了什么

`normalizeHistoricalReportForParity` 会递归遍历 profile，找到同时具有 `id/path/resolvedPath/exists/sizeBytes/digest` 的 evidence 对象，再从文件内容重算规范 LF 元数据。这样 Windows CRLF 与 Linux LF 不会污染 renderer 迁移比较。旧实现直接 `readFileSync(value.resolvedPath)`，因为过去 resolved path 总是当前主机的真实路径。v2238 把它升级为稳定展示别名后，这个隐含条件不再成立，Linux ENOENT 正好把假设显式化。

## 七、为什么不能无条件改读声明 path

第一次修正尝试直接把 helper 改成通过 `value.path` 读取，确实解决了 Linux 别名，但扩展回归马上发现四项失败。合成单元测试的声明 path 只是 `fixture.md`，真实文件位于临时目录的 resolved path；另一些测试先用一种环境创建 profile，随后切换 fallback 环境再比较，如果此时重新解析声明 path，会读到与 profile 当时不同的来源。字节长度可能相同，摘要却变化。这个失败说明 helper 必须尊重“profile 已选择来源”的时序语义。

## 八、最终读取优先级如何确定

算法现在先用 `existsSync(resolvedPath)` 判断 profile 选定来源在当前主机是否可读。若可读，就保持旧行为：临时 fixture、相对 `e/...`、Windows fallback 和真实 sibling 路径都不重新选择。若不可读，说明它可能是另一平台的稳定报告别名，再将声明 `path` 交给 `resolveHistoricalEvidenceContentPath`，由当前 runner 找到 fixture 或 pinned snapshot。这个优先级兼顾了来源忠实性与跨主机可读性，没有依赖 `process.platform`。

把状态展开后共有四类。第一类是系统临时文件：声明 path 可能只是占位文本，但 resolved path 可读，必须使用已选来源。第二类是仓库相对文件：两个字段通常都相对且可读，继续使用 resolved path 能保持 profile 创建时语义。第三类是本机绝对 fallback：resolved path 可读，不能因为声明 path 指向 sibling 就重新挑选。第四类是从另一平台带来的 canonical alias：resolved path 不可读，声明 path 却能由当前 resolver 映射到同一冻结内容，此时才进入兜底。四类输入由同一个能力判断自然分流，无需四份业务分支。

`existsSync` 在这里不证明文件就是正确证据，它只回答当前字符串能否作为本机 I/O 入口。证据身份仍由 profile 的 path、id、digest 与 resolver mapping 共同决定；兜底读取后还要由完整 parity 比较元数据和输出。如果有人在错误位置创建同名文件，现有 selected-path 语义本来也会读取它，安全责任属于 profile 构造阶段而不是测试 normalization。helper 不借能力探测重新定义信任模型。

## 九、为什么兜底使用 content resolver 而不是普通 resolver

普通 resolver 负责大多数 fallback，但 v2237 已证明某些历史证据需要精确 pinned content。Node v961 的声明路径必须继续显示原来源，实际摘要却应读取不可变 snapshot。如果 portable helper 只调用普通路径函数，它会重新打开当前源码，使 236 个派生 digest 再次漂移。content resolver 包含 pinned mapping 和普通 fallback，是所有“我要字节”消费者的正确入口；v2239 复用它，不复制任何映射表。

## 十、为什么 helper 仍用 readFileSync

共享 `readHistoricalEvidenceFile` 在 UTF-8 模式会去除 BOM，这是生产报告期望的行为，但 portable helper 的历史 oracle 只是规范换行，不曾删除 BOM。第一次直接复用该读取函数会让若干旧 report hash 改变，即使字节长度没变。最终 helper 只用 content resolver 选路径，再保持原 `readFileSync(..., "utf8")` 与换行替换。这样修的是路径选择，不顺便重定义测试 normalization 合同。职责分离也意味着路径解析和内容归一化可以独立演进、独立审查。

## 十一、合成临时文件测试如何继续成立

`portableProfileParity.test.ts` 创建两个系统临时文件，分别写 LF 与 CRLF；对象里的声明 path 故意只是 `fixture.md`，resolved path 才是实际临时文件。新优先级首先发现 resolved path 可读，所以不会错误进入历史 resolver。随后原算法把两种换行都转成 LF，断言 size 为 11、digest 相同。这个用例不是边角，它机械锁住“选定来源优先”原则，防止未来为了 Linux 再次破坏合成证据。

## 十二、环境变量切换测试在防什么

`resolverEchoParity.test.ts` 会先关闭 forced fallback 创建 local profile，再打开 fallback 创建另一份 profile，然后比较二者的 portable identity。profile 中的 resolved path 记录了创建时来源。若 helper 在比较阶段根据当前环境重新解析所有声明 path，先创建的对象也会被迫改读 fallback，测试就失去区分来源的能力。现在只要原 selected path 可读，它就保持不变；只有跨平台别名不可读时才兜底。环境变量不再悄悄改写已创建对象的证据身份。

## 十三、v2168 与 v2169 为什么不需要改 golden

两个失败用例分别渲染 canonical approval value validation 与 pass evidence closeout。其 evidence `resolvedPath` 原来就是 `e/398/...`、`e/408/...` 相对值，renderer migration normalization 只需清理 size、digest 与真实绝对路径噪声。v2238 把这些值变成长绝对别名，导致 normalized Markdown 仍多出 156/182 字符。早返回恢复原 profile 字段后，原长度 9,342 与 8,458、原 SHA-256 全部通过，证明生产合同回到既有行为，而不是测试跟着实现移动。

## 十四、为什么不把 renderer normalization 继续加宽

另一种做法是在 `normalizePathValue` 中识别所有 `D:/nodeproj/orderops-node/e/...` 并裁成相对路径。这样两个测试也会绿，但真实 profile 已经发生不必要变化，测试只是把它抹掉。parity helper 应过滤不可控环境差异，不应掩盖产品层可避免的 schema 值变化。v2239 修复生产 guard，让 normalization 保持原职责，也避免不同 migration test 各自复制新正则。

## 十五、服务流程与完整消费面怎样被枚举

通过 `rg` 找到 `normalizeHistoricalReportForParity` 与 `normalizeForParity` 的九个测试消费者，包括 controlled preview、approval-required boundary、implementation readiness、disabled fake harness、implementation plan、sandbox endpoint、三个 resolver parity 组。扩展批次再加入 v2168、v2169、v106/v107 profile 与 manual connection renderer，共 13 个文件、42 项测试。全部通过后，typecheck 和零警告 lint 也通过。这个集合来自符号消费，而不是只重跑 CI 报出的三个文件。

这九个消费者可再分为三种风险。第一种只比较规范化 profile，最容易暴露路径根和文本元数据差异；第二种先生成 local 与 fallback profile 再切换环境，能发现 helper 是否在比较时偷偷换源；第三种 controlled preview 会经过 pinned Node v961 内容与多层派生 digest，能发现普通 resolver 是否绕开精确快照。v2168/v2169 则补上相对 Node archive 路径。把这些风险组合起来，比新增一个只断言“Linux 不抛异常”的窄测试更能防回归。

## 十六、响应模型与运行时边界

生产接口没有增加字段。绝对 sibling fallback 的 `resolvedPath` 继续使用 canonical `D:\nodeproj\orderops-node\fixtures/...`；相对 Node archive 继续使用 `e/...`；`path`、exists、sizeBytes、digest 的意义不变。测试 helper 的选择逻辑只在 Vitest 进程中运行，不进入 build 后服务代码。Node 仍不启动 Java/mini-kv、不发送 upstream 请求、不读取凭据值、不写 managed audit 或 mini-kv，也不打开任何执行授权。

## 十七、为什么这次推送前要跑完整 coverage

v2238 focused 清单覆盖直接根因，却漏掉了 portable helper 的其他消费者和旧 migration golden；远端全量测试才暴露问题。v2239 已扩大 targeted 集合，但最终收口不再假设影响分析绝对完整。文档写完后执行 `npx vitest run --coverage --maxWorkers=4`，让全部测试在同一最终树上运行，同时限制 worker 防止本机进程膨胀。coverage 成功后才运行 build 与静态门，再推送远端独立复验。

完整 coverage 还有一个次要但重要的作用：test helper 位于 `test/support`，它的调用边界不会被生产 typecheck 或普通 service focused 自动覆盖。只有让所有测试文件重新导入最终 helper，才能发现某个少见 profile 仍依赖 resolved path 的可读性、某个旧 renderer 仍冻结相对路径，或某份历史证据使用 raw/BOM 语义。这里的全量不是为了提高一个百分比，而是重新验证共享测试基础设施本身。

## 十八、故障查找顺序

若 portable helper 再出现 ENOENT，先打印 path、resolvedPath、`existsSync(resolvedPath)` 与 content path，不改 hash。若 local/fallback identity 摘要变而长度不变，检查是否改了 BOM 或来源选择语义。若 migration 长度增加，查 normalized 输出中残留的 `D:/nodeproj`，再判断产品字段是否本应相对。若 controlled preview digest 漂移，优先核对 v961 pinned snapshot。若 CI 只有 timeout，单跑失败文件与分片，不能把超时当业务断言失败。

## 十九、维护权衡与抽象数量

生产层只增加一条相对路径 guard；测试层没有新 helper family，只修正已有 portable kernel 的输入选择。`existsSync` 是必要的能力探测，比平台判断更贴近真实需求：同一平台也可能在不同 checkout 或容器中可读/不可读。fallback 仍由唯一 content resolver 拥有，renderer normalizer、profile loader 与领域 service 都不新增路径知识。修复减少隐含假设，没有制造新的治理链。

## 二十、证据、清理与停止条件

`d/2239/evidence/report-path-consumer-separation-v2239.json` 记录两次 CI 的关系、focused 消费面、完整 coverage、静态指标与最终 run；本 walkthrough 在最终 verify 前完成。构建和 coverage 产生的 `dist/`、`coverage/` 必须按绝对路径精确清理，不能结束所有 Node 进程。v2239 只有在本地全量与同 SHA 远端 Node Evidence 都成功、branch/tag 对齐、工作树干净后才授予九分点；成功后维护轨立即停止。

## 一句话总结

v2239 让相对报告继续相对，让可读的已选来源保持原来源，让跨平台不可读别名通过声明 path 找到真实 content，从而修复测试消费者而不撤销生产 parity、不移动任何 golden，也不扩大运行权限。
