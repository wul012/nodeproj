# Node v2210：历史证据规范字节大小修复讲解

## 一、目标与非目标

v2210 的目标是让 `HistoricalEvidenceFile` 中的 `sizeBytes` 与 `digest` 描述同一份字节流，并且这份字节流不随 Windows、Linux、Git checkout 换行策略或 UTF-8 BOM 改变。非目标包括修改历史 fixture 内容、重新定义 snippet 命中规则、调整 resolver fallback mapping、改变任何审批或执行边界，也不把 Windows 与 Linux 两套 hash 同时列为合法答案。这个版本只有一行核心行为变化，但它位于 223 个 CodeGraph 影响符号之前；若不把输入、规范化和验证讲清楚，这一行就会看成“为了让 CI 绿而改大小”，而不是恢复证据模型内部一致性。

## 二、问题最初怎样从 CI 暴露

v2209 本地固定时间、强制 fallback 的 JSON 与 Markdown 预言机都通过，推送后 GitHub run 29731349784 也依次通过 typecheck、零告警 lint、安全/config、归档、优雅、文件族和维护性门，最终只在 Test 中失败两个 SHA-256 断言。JSON 的 38,431 字节和 Markdown 的 37,992 字节断言没有失败，说明对象结构、字段数量与字符串长度都没漂移；只有若干等长数字或摘要内容不同。这种“长度相同但 hash 不同”的形态把排查范围从整个 766 行重构迅速收窄到机器派生元数据，而不是业务布尔值或对象键顺序。

## 三、入口与调用链在哪里

入口函数是 `historicalEvidenceReportUtils.ts` 中的 `evidenceFile(id, filePath)`。调用者给它证据 ID 和历史路径；resolver 根据本地兄弟仓库、已提交 fallback 与强制环境变量选择 `resolvedPath`。文件存在时，utility 读取 UTF-8 文本，去除首字符 BOM，把 CRLF 与单独 CR 改成 LF，然后返回原始路径、解析路径、存在状态、大小和 SHA-256。67 个源码文件直接调用它，向上扩散到多代 credential-resolver 回显、审核包和跨项目只读报告。v2210 不改变 resolver 的路径选择，只修复返回对象内部两个元数据字段所依据的内容不一致。

## 四、修复前的响应模型为什么自相矛盾

修复前代码先得到 `content = normalizeHistoricalEvidenceText(readHistoricalEvidenceFile(...))`，digest 使用 `createHash(...).update(content)`，所以 digest 对 CRLF/LF 和 BOM 是稳定的；但 `sizeBytes` 使用 `statHistoricalEvidence(filePath).size`，量的是磁盘原始文件。于是一个 Windows CRLF 文件可以报告 13 字节，却拥有对应 11 字节 LF 文本的 digest。调用者看到这对值时，会自然理解为“下面的摘要校验上面的 13 字节”，实际却不是。只读报告再把 `sizeBytes` 纳入 JSON 与 Markdown，导致 profile digest 和字节冻结随 checkout 改变。错误不在 hash 算法，而在响应模型把两个不同输入流包装成一组元数据。

## 五、三种字节流怎样精确证明根因

排查比较了 Windows 工作树、Git blob 和规范文本三层。Java v115 的 `OpsEvidenceService.java` 在 Windows 工作树是 55,853 字节，Git blob 与规范 LF 文本都是 55,243 字节，差 610 个回车。mini-kv v121 runbook 在工作树是 1,284 字节，Git blob 是 1,283 字节，去 BOM 并统一混合换行后是 1,280 字节。把本地 profile 仅替换为两个 Git blob raw size，就逐字得到 CI 收到的 JSON `f52e...5293` 与 Markdown `f250...0e6`，证明 runner 没有随机漂移。再替换为规范大小，则得到最终 `fe18...fade` 与 `6f29...a1c8`，证明修复方向可在实现前计算和复现。

## 六、为什么最终不直接采用 Git blob 大小

Git blob 55,243 可以解决 Java 文件，但 mini-kv blob 仍有 BOM 或混合换行，大小 1,283，而 digest 实际处理的是 1,280 字节。若 v2210 改成“在 Git 仓库里查询 blob size”，报告仍会让 size 与 digest 描述不同输入，而且生产运行环境未必带 `.git`。正确的不变量不是“都按 Linux checkout”，而是“同一对象中的大小和摘要必须来自同一份已经定义好的规范内容”。因此最终大小来自 `Buffer.byteLength(content, "utf8")`，其中 content 就是 digest 已经使用的去 BOM、LF 化字符串，不依赖 Git 命令或平台分支。

## 七、服务流程在修复后怎样运行

调用者仍提交 id 和 filePath。resolver 仍先决定 resolvedPath，缺失时仍立即返回 `exists=false`、`sizeBytes=0`、`digest=null`。存在时，读取函数仍只在 UTF-8 模式剥离开头 BOM，文本规范函数仍统一 CRLF 与 CR。变化发生在最后装配：`Buffer.byteLength(content, "utf8")` 和 `createHash("sha256").update(content)` 共同消费同一个 content。随后各报告照旧把这组元数据投影进 reference、checks、summary、JSON 和 Markdown。没有新增缓存、文件写入、网络请求或 Git 子进程，运行时复杂度与原来相同。

## 八、为什么使用 UTF-8 字节数而不是字符串长度

Java 与 mini-kv 的证据路径和说明包含中文。JavaScript `string.length` 计算 UTF-16 code unit，不等于落盘或 hash 输入的 UTF-8 字节数；一个中文字符通常会贡献三个 UTF-8 字节，却只占一个 UTF-16 code unit。digest 的 `update(string)` 默认按 UTF-8 编码，因此与它配对的大小必须显式使用 `Buffer.byteLength(content, "utf8")`。直接测试虽然用短英文让换行差异容易读懂，但真实 v2209 fixture 中有中文路径与说明，最终 oracle 同时证明 UTF-8 计数在完整报告上稳定。

## 九、红色测试怎样证明不是事后迎合

新测试在 untouched utility 上先创建内容相同的 LF 与 CRLF 文件。LF 报 11 字节，CRLF 报 13 字节，digest 相同，因此第一项失败；第二项用 BOM 和混合 CRLF/CR/LF，规范文本应为 19 字节，旧实现却报 23，因此失败；第三项缺失文件仍通过。结果精确为 2 failed / 1 passed。这个顺序证明测试约束的是预先声明的语义，而不是看到 CI hash 后修改期望。实现改为规范字节数后，三个用例全部通过，临时目录由 `afterEach` 删除，不触碰仓库 fixture。

## 十、上游证据和旧版预言机如何被保护

v2210 同时运行 v2207 implementation-readiness、v2208 sandbox endpoint 与 v2209 approval boundary 三代预言机。v2207 和 v2208 使用的历史文件在当前规范下没有影响其冻结输出，旧摘要原样通过；v2209 恰好引用两个暴露问题的文本，只改变 `sizeBytes` 对应内容，JSON/Markdown 长度不变，摘要变为唯一规范值。联合批次包含 utility、resolver 与三代报告，共 5 个文件、21 项测试。任何字段顺序、消息、路径、ready 决策或 renderer 漂移都会让其中的完整字节断言失败。

## 十一、为什么不能接受两套平台 hash

最省事的做法是根据 `process.platform` 选择预期 hash，或允许 Windows 与 Linux 两个值。那只能把不一致写进测试，无法解释同一个 `digest` 为何对应两个 `sizeBytes`。另一种做法是只在测试中把所有 size 替换成 `<bytes>`，会失去完整输出冻结对元数据漂移的保护。v2210 把差异消除在共享模型入口，测试仍只接受一个 hash。以后新增 macOS、不同 autocrlf 配置或带 BOM 的 fixture，也会自然落到同一规范字节流，而不需要扩充平台白名单。

## 十二、CodeGraph 影响面怎样决定验证规模

CodeGraph depth 3 显示 `evidenceFile` 影响 223 个符号，源码检索确认 67 个文件直接调用。它们包括多个 Java/mini-kv 上游回显、archive verification、审核包与只读 intake。直接硬编码或判断 `sizeBytes` 的测试较少，但共享值会进入许多报告 digest，因此只跑 v2209 不够。本版先执行 13 个 size/archive/renderer parity 合同文件共 48 项，再执行完整 suite。维护性、优雅、52 个文件族、renderer 242+3、source-size 与 service/route ceiling 也必须保持不变，防止用新抽象或新报告链修一个元数据问题。

## 十三、为何没有顺手改所有 raw stat 使用者

仓库里仍有少量业务模块直接调用 `statHistoricalEvidence`。它们不一定与规范化文本 digest 配对：有的确实要描述传输文件的原始落盘大小，有的处理二进制或包级证据。把它们全部机械替换会混淆“原始工件大小”和“规范文本大小”两种合法语义。v2210 只修 `HistoricalEvidenceFile` 这个明确合同，因为它已经把 digest 定义为规范文本摘要。未来若其他模块也把 raw size 与 normalized digest 组合，应先为各自合同建立同样的红色测试，而不是借本版进行无证据的全局替换。

## 十四、失败如何沿报告链透明传播

修复前，文件内容本身、snippet 命中和 ready 判断都可以完全相同，但 size 的个位数变化会进入 reference；reference 被序列化后改变 JSON SHA，renderer 又把它写入 Markdown，最终 CI 只看到最外层摘要不同。因为长度相同，普通长度断言也无法指出来源。v2210 的直接 utility 测试把失败前移到 11 对 13、19 对 23，维护者以后会在最短入口看到“规范大小不一致”，不必从四万字节报告反推。完整 oracle 仍保留，负责证明修复没有遗漏外层装配。

## 十五、安全边界为何不受这次行为修复影响

本版确实改变可见 `sizeBytes`，所以不能谎称绝对零行为变化；但变化只校正只读证据元数据。`exists`、path、resolvedPath、digest、snippet、JSON 字段、审批边界和 blocker 逻辑均未放宽。Node 不连接 Java 或 mini-kv，不启动兄弟服务，不读取凭据，不解析真实端点，不写审批账本，也不执行 SQL、restore 或 SETNXEX。Java 已推送 v1875 并独立推进 v1876，mini-kv 已推送 v1673 并独立推进 v1674；Node 只读核对版本状态且只使用仓库内既有 frozen evidence。全量测试 8/8 分片通过，合计 569 个文件、1,737 个用例，独立 discovery 得到相同清单。强制历史回退的受控 HTTP smoke 得到 health 200/93 字节、JSON 200/40,003 字节和 Markdown 200/39,564 字节；目标 profile 为 ready、26/26 检查通过，同时 `executionAllowed=false`、`connectsManagedAudit=false`。精确 PID 20428 已停止，31210 端口已释放。

## 十六、测试覆盖分别回答什么问题

直接 3 项测试回答规范化语义；resolver 3 项测试回答 fallback 路径没有变化；三代 15 项预言机回答完整输出和旧版本稳定性；13 文件 48 项重点合同回答 archive、非零大小、缺失默认与 renderer parity；typecheck 和 lint 回答类型与代码质量；静态 census 回答结构债务；完整 suite 与独立 list 回答远距离消费者和库存；build 回答真实产物；带 access guard 的 HTTP smoke 回答编译后路由。最后的 GitHub runner 再用 LF checkout 重做所有门，才是这次平台缺陷真正闭环的外部证据。

## 十七、维护者以后应遵守的元数据原则

当一个证据对象同时暴露 size 与 digest，先明确它描述的是原始工件还是规范内容，两者必须来自同一输入。原始二进制合同可同时使用 raw Buffer 长度和 raw hash；文本可移植合同应先定义 BOM、编码与换行规范，再由同一规范 Buffer 计算长度和 hash。不要把 `stat.size` 与经过字符串变换的 digest 拼在一起，也不要在 renderer 或测试末端抹掉差异。若确实需要同时展示原始大小和规范大小，应使用两个语义明确的字段，并让各自摘要来源可验证。

## 十八、这次可见值变化怎样处理兼容性

`sizeBytes` 是报告中的公开字段，因此 v2210 不能把它描述成纯内部重构。兼容性判断要区分字段形状与字段语义：字段名、类型、位置和缺失默认都不变，但 CRLF 或 BOM 文本的数值会收敛到规范 UTF-8 大小。依赖该字段做“证据非空”或展示的调用者继续工作；若外部消费者把 raw 文件大小当成精确合同，它会观察到有意修正。仓库没有发现对具体非零大小的硬编码业务判断，13 个相关测试也全部通过。版本说明明确记录这一点，避免使用者误以为文件被截断；需要原始传输大小的未来合同应新增 `rawSizeBytes`，而不是恢复当前矛盾。

## 十九、评审者怎样独立复现结论

最短复现不需要 Windows 与 Linux 两台机器。先用 `git show HEAD:<path>` 读取 blob Buffer，再与工作树 `readFileSync` 比较 raw 长度和 SHA；随后把两者解码为 UTF-8，去 BOM 并统一换行，规范 Buffer 应完全相等。把 Git blob raw size 注入 v2209 profile，会命中 CI 的 `f52e...` 与 `f250...`；使用规范 size 则命中 `fe18...` 与 `6f29...`。最后运行 direct test，旧实现应稳定红在 13 对 11、23 对 19，新实现应三项全绿。这条路径把“来源、推导、修复、验收”串成闭环，不依赖进度表自述。

## 二十、这个小修复带来的长期维护收益

过去新增历史文本时，开发者可能在 Windows 本地看到全绿，却在 Linux CI 等十多分钟后才发现外层报告 hash 漂移。现在换行和 BOM 差异在 500 毫秒级 utility 测试中被直接拒绝，错误位置从四万字节 profile 收缩到一个元数据对象。更重要的是，`HistoricalEvidenceFile` 获得可一句话说明的不变量：size 和 digest 同源。审查者不再需要记住“摘要是规范的、大小却是原始的”这种隐含例外；后续重构 67 个直接消费者时，也可以把这对字段当成可信原子，而不必逐个建立平台分支。

## 二十一、一句话总结

v2210 用红色 LF/CRLF/BOM 对抗测试证明并修复了历史证据“规范 digest 配原始 size”的模型矛盾，让 223 个受影响符号共享唯一 UTF-8 元数据语义，同时保持 fixture、解析、路由和所有执行边界不变。
