# Node v2238：把“能读到文件”和“报告怎样描述文件”拆成两个合同

## 目标、非目标与版本边界

v2238 的目标不是继续压低某个优雅数字，而是修复 v2237 在远端 Linux runner 上暴露的可重现性缺口。上一版已经通过本机四片完整测试、coverage、两种 smoke 与九分静态门，但远端 Node Evidence run `29881584343` 在全量 coverage 阶段发现三项 parity 失败。一个严格工程不能把“我的机器通过”当作结束，因此本版只处理这次外部复核指出的两个根因：报告字段泄露宿主机绝对路径，以及文本证据摘要依赖工作树物理换行。非目标包括新增治理报告、扩大路由、重命名 profile、更新 sibling fixture、启动 Java/mini-kv、打开连接、读取凭据值或赋予执行权限。

## 一、读者索引与最短审查路线

审查者先看 `src/services/historicalEvidenceResolver.ts`，确认真实读取路径与稳定报告路径的职责已经分开；再看 `src/services/historicalEvidenceReportUtils.ts`，确认 `resolvedPath` 只改变展示来源，文件存在、读取和摘要仍走真实内容路径。第三步看 `src/services/manualConnectionSources.ts`，确认它不再维护第二套 size/digest 算法。最后运行 `test/historicalEvidenceResolver.test.ts`、`test/historicalEvidenceReportUtils.test.ts`、`test/resolverEchoProfileParity.test.ts` 与 `test/manualConnectionVerificationRendererParity.test.ts`。这条路线能同时覆盖根因、实现与 oracle，不需要先阅读几十个 downstream profile。

## 二、远端失败到底证明了什么

Java v106 profile 在 Windows 本地序列化为 38,343 字节，Linux 收到 38,242；Java v107 从 43,068 变为 42,958。两个对象的业务布尔、evidence digest、snippet matched、数组顺序与版本字段并没有证据表明发生变化，差值来自重复出现的 `resolvedPath`。operator-window Markdown 则仍是 17,955 字节，但摘要从 `093bb3...` 变为 `7f6576...`。长度相同而 hash 不同说明字段形状没有增删，某些等长值发生替换；继续追踪后落到一份 Java 集成测试的 size/digest 元数据。这两种失败都属于“表示不稳定”，而不是“业务规则不一致”。

## 三、为什么绝对路径既必要又危险

resolver 需要一个真实绝对路径，才能让 `existsSync`、`readFileSync` 和 `statSync` 在当前机器上工作。Windows 本地 fallback 位于 `D:\nodeproj\orderops-node\fixtures\historical\...`，GitHub runner 则位于 `/home/runner/work/nodeproj/nodeproj/fixtures/historical/...`。对 I/O 来说它们都是正确答案；对需要 byte parity 的 JSON profile 来说，它们却是环境噪声。更隐蔽的是 JSON 会把 Windows 反斜杠编码成双反斜杠，因此差异不只是根目录字符数，还包含每个目录分隔符的转义成本。把一个字段同时当成 I/O 句柄与公共报告文本，正是这次失败的设计根因。

## 四、三个路径函数各自负责什么

`resolveHistoricalEvidencePath` 继续选择真实文件：强制 fallback 时转到仓库 fixture，普通模式优先可用 fallback，再尝试声明路径。`resolveHistoricalEvidenceContentPath` 在此基础上处理精确的冻结内容映射，例如 v2237 新增的 Node v961 快照；它决定读取哪一份字节。v2238 新增的 `resolveHistoricalEvidenceReportPath` 不参与读取，只把已经解析出的仓库内路径投影为稳定的 `D:\nodeproj\orderops-node` 别名。三个函数分别回答“通常在哪里”“历史内容究竟读哪份”“报告对外怎样描述”，不再让一个字符串承担相互冲突的职责。

## 五、稳定别名不是伪造文件位置吗

报告里的 `resolvedPath` 从来不是要求消费者再次打开文件的授权句柄，它是解释证据来自 fallback 的诊断字段。真正读文件的函数仍持有 runner 本地绝对路径，因此没有把 Linux 进程指向一个不存在的 `D:` 盘。稳定别名保留 `fixtures/historical/sibling-workspaces`、项目名与相对文件路径，审查者仍能定位仓库内容；它只去掉 checkout 根这一段不可控环境信息。若解析结果位于仓库之外，新函数会识别 `..` 或绝对逃逸并原样返回，不会把任意外部文件伪装成仓库 fixture。

## 六、为什么兼容别名选择现有 Windows 根

理论上可以把报告全部改成 `repo://fixtures/...` 或纯相对路径，但那会修改大量已经冻结的 JSON 与 Markdown 字节，扩大本次修复的合同面。当前 Windows 本地 oracle 已经使用 `D:\nodeproj\orderops-node`，只要 Linux 将仓库内 fallback 投影为同一个别名，v106/v107 的既有完整 hash 就无需变化。这里选择的是最小合同修复：保持已经公开的表示，消除 runner 差异。未来若要引入 URI，应由独立版本定义 schema 迁移与消费者兼容，不应借一次 CI 修复暗中完成。

## 七、路径逃逸判断为何必须在投影前完成

`path.relative(REPO_ROOT, resolvedPath)` 给出目标相对仓库根的位置。结果为 `..`、以 `..${path.sep}` 开头，或自身仍是绝对路径时，说明目标不受仓库根拥有。只有其余情况才按当前平台分隔符切段，并交给 `path.win32.join` 生成兼容表示。先判断再拼接可以防止把 sibling 工作区、临时测试文件或其他磁盘路径错误挂到 canonical root 下。测试中的临时 LF/CRLF 文件位于系统 temp，所以仍保留真实路径，现有工具测试不会失去读写对象。

## 八、第二个根因是怎样藏在干净工作树里的

本机 `OpsOverviewIntegrationTests.java` 物理上包含 3,865 个 CRLF 和 113 个单独 LF，其中 109 个 LF 集中在一次局部编辑形成的连续区间。由于 Git 的 `core.autocrlf=true` clean filter 会在写入对象数据库时统一为 LF，`git status` 看起来仍然干净，blob 也只有规范 LF。Linux checkout 直接得到 blob 的 LF；Windows 工作树却保留了历史 CRLF 与后来局部 LF 的混合状态。旧 `manualConnectionSources.evidenceFile` 读取原始 Buffer 并对物理 stat 计数，于是 hash 实际绑定了一个版本库无法表达、其他机器无法重建的状态。

## 九、为什么不能冻结那份混合换行

可以把本机物理文件复制成 `-text` binary snapshot，再让 Linux 读取它，但那会把偶然编辑痕迹升格为历史合同。它既没有领域意义，也无法解释为什么第 1029、1836、2661、2887 行和 2987 至 3095 行应该保留 LF，而其他行必须 CRLF。这样的“修复”只会让测试绿色，却把不可维护规则永久写进仓库。正确的证据合同应描述文本内容，而不是某次 checkout 的换行副作用，所以本版没有修改或新增 sibling fixture 字节。

## 十、复用已有规范化 kernel 的价值

`historicalEvidenceReportUtils.evidenceFile` 已经完成三件事：UTF-8 读取时去除 BOM，将 CRLF 与孤立 CR 统一为 LF，再用规范文本计算 byte length 与 SHA-256。它还有独立测试证明 LF、CRLF、mixed 与 BOM 输入得到同一元数据。`manualConnectionSources.ts` 过去重复实现了另一份原始 Buffer 逻辑，本版删除 `createHash` 与 `statHistoricalEvidence` 依赖，调用共享 evidenceFile 后只投影 `id/path/exists/sizeBytes/digest` 五个原字段。这样既购买了现有验证，也避免把共享对象额外的 `resolvedPath` 泄露进旧 profile。

## 十一、为什么显式投影不能省略

TypeScript 结构类型允许一个含六个字段的对象赋给只要求五个字段的接口；如果直接 `return historicalEvidenceFile(...)`，编译器会通过，但运行时 JSON 会多出 `resolvedPath`。这会改变 packet、preflight 与 operator 的公共 profile 字节，造成比当前问题更大的回归。因此代码显式复制五个允许字段。这里的几行看似冗余，实际承担运行时 schema 防火墙：共享工具可以继续拥有报告路径，manual connection 的历史模型仍保持原形。

## 十二、响应模型与公开合同有什么变化

`HistoricalEvidenceFile` 的字段名没有变化，仍为 `id/path/resolvedPath/exists/sizeBytes/digest`；变化只在仓库内 fallback 的 `resolvedPath` 值改为跨主机稳定表示。`ManualConnectionEvidenceFile` 仍只有 `id/path/exists/sizeBytes/digest`，没有新增字段。Java v106/v107 profile 的 byte length 与 SHA-256 继续使用原 oracle；packet 与 preflight Markdown 继续保持原长度与摘要。operator-window 的字段结构和 17,955 字节长度不变，只有由不可复现混合换行产生的摘要改为 Git 规范 LF 内容对应的 `7f657609...`。

## 十三、为何允许纠正一个测试摘要

仓库规则禁止为了让迁移通过而修改测试期望，因为那会把行为变化伪装成成功。本次不是 renderer 迁移，也不是接受未知输出：远端先给出了 Linux 摘要，随后通过原文件物理换行计数、Git blob 大小和 clean filter 行为证明旧摘要无法从任何干净 clone 重现。生产代码同时改为已有规范化 kernel，并新增 LF/CRLF/BOM 等价断言。新摘要代表可提交文本语义，旧摘要代表一台机器的未版本化 checkout 状态。把 oracle 从后者纠正到前者是在修复测试合同，并且约束比原来更强。

## 十四、上游证据与配置怎样参与

失败场景显式设置 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，确保测试不依赖 `D:/javaproj` 或 `D:/C/mini-kv` 的真实 sibling 工作区。Java v93、v106、v107、v109 与 mini-kv v102、v115、v116 的内容全部来自 Node 仓库 `fixtures/historical/sibling-workspaces/`。v2238 不请求新的 sibling 输出，也不改变 MANIFEST 中的版本范围。Java 与 mini-kv 可以继续各自计划；Node 的修复完全由本仓库拥有，远端 runner 正是目标消费环境。

## 十五、服务流从输入到输出怎样走

以 Java v106 profile 为例，领域 service 声明原始 `D:/javaproj/...` 路径，`historicalEvidenceExists` 通过 content path 检查 fixture，`readHistoricalEvidenceFile` 从 runner 真实路径读取并规范文本，`historicalEvidenceReportUtils.evidenceFile` 计算稳定 size/digest，同时调用 report path 函数生成兼容 `resolvedPath`。profile loader 聚合 evidence 与 snippet 结果，`JSON.stringify` 最终不再包含 runner 根。operator-window 流程少一个 `resolvedPath` 字段，但通过 `manualConnectionSources` 复用同一元数据计算，再由 `verificationReports/manualConnection.ts` 渲染 Markdown。

## 十六、安全边界为什么完全没有扩大

所有改动都位于同步只读文件解析与报告投影。没有新增网络客户端、子进程、数据库连接、文件写入或凭据读取；`UPSTREAM_PROBES_ENABLED=false` 与 `UPSTREAM_ACTIONS_ENABLED=false` 的行为不变。新函数不会启动 Java 或 mini-kv，也不会把稳定别名当成执行目标。operator-window profile 继续声明连接、schema migration、managed audit write、mini-kv execution 与 automatic service start 为 false。远端 smoke 仍必须证明 upstream requests 为零和 `executionAllowed=false`，否则本版不能收口。

## 十七、focused 测试分别防什么回归

`historicalEvidenceResolver.test.ts` 精确断言 mini-kv runtime smoke 在 forced fallback 下呈现稳定 canonical path，同时仍可读取。`historicalEvidenceReportUtils.test.ts` 新增 manual connection 分支，向两个临时文件写入 LF 与 BOM/mixed 换行，并要求 size/digest 相同。`resolverEchoProfileParity.test.ts` 冻结 v106/v107 完整 JSON，不允许只比较少数布尔。`manualConnectionVerificationRendererParity.test.ts` 同时覆盖 packet、preflight 与 operator 三份 Markdown。三个具体 service 测试再验证领域 checks、证据数量和安全状态没有被工具层修复改变。

## 十八、为什么本地 focused 通过仍不足够

Windows 本机位于 canonical 根，所以真实 fallback 路径与稳定别名恰好相同；这能证明兼容性，但不能独自证明 Linux 分支。最终证据必须来自 GitHub runner 对同一 commit 的 coverage 运行。它会从干净 LF blob checkout，仓库根也不同，正好同时覆盖两类根因。只有远端 Test、Build、safe health、metrics 和 release evidence readiness smoke 全绿，才能把 v2237 的本地九分升级为跨平台九分。

这里也不能在测试里先删除 `resolvedPath` 再比较，或根据 `process.platform` 选择两套 hash。前者会让公开 profile 的真实不稳定性被归一化工具遮住，后者等于承认同一合同在两种系统上有两个正确答案。稳定性必须由生产投影边界提供，测试仍比较完整原始输出；这样未来任何新增宿主机字段都会再次触发 parity，而不是被测试预处理静默吞掉。

## 十九、失败查找表

若 v106/v107 byte length 仍不同，先打印 profile 中不同的 `resolvedPath`，检查是否有某个 service 绕开共享 report utility；不要先改 hash。若 operator 长度相同但摘要不同，比较 `evidenceFiles` 的 size/digest 与 verification digest，确认是否还有 raw metadata owner。若 focused 通过而 CI 文件缺失，检查大小写与 fallback mapping 顺序。若 build 失败，检查新增 export 名与 `.js` import。若 smoke 返回 401，应先补身份头或确认当前 workflow 未启 access guard，不能把授权拒绝误判为服务未启动。

## 二十、维护权衡与停止条件

本版新增一个函数，却删除一套重复摘要算法，整体概念数只增加“报告路径”这一项必要边界。没有再建 renderer、catalog、route 或新 family；canonical root 只在 resolver 内拥有，其他 service 不复制。v2238 通过远端 Node Evidence 后立即停止九分追逐，不创建 v2239 为了把 4,130 name debt 再压低几十。后续只有真实功能、外部评审发现或机械 gate 回归才能重新打开维护轨道。

## 二十一、验证结果如何记录

版本执行过程中，`d/2238/evidence/cross-platform-evidence-parity-v2238.json` 记录 v2237 失败值、根因、实现 owner、focused 数量、静态门与最终 run；`d/2238/解释/cross-platform-evidence-parity-v2238.md` 提供较短的人类说明；本文件解释代码机理与审查路径。文档必须在最终 verify 前完成，之后运行讲解质量门、archive census、typecheck、lint、build 与 `elegance:nine`。提交、标签、远端 SHA 和清理状态会在最终成功后补入 evidence，不能预写绿色结论。

## 一句话总结

v2238 把历史证据的真实读取位置、冻结内容位置与稳定报告位置拆成独立职责，并让 manual connection 复用规范文本元数据，从而把 v2237 的本机九分结果变成可由干净 Linux clone 机械复现的九分结果，而不增加任何执行权限。
