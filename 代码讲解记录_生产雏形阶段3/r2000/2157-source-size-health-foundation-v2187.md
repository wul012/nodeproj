# v2187：把“文件太大”从印象判断变成会失败的工程契约

## Goal and Non-goal / 目标与非目标

v2187 是 Node Production Excellence N5 的第一批，不增加任何业务能力。它解决的核心问题不是某一个文件看起来太长，而是仓库过去缺少统一、可复现、会失败的源文件体积定义。旧审计在项目较早阶段记录了五个超过八百行的文件，后来大量治理与只读证据模块继续演进，真实数量已经变成十六。若仍沿用旧表格，后续评审会得到一个看似完成、实际上漏掉十一项债务的结论。因此本版先让现实覆盖历史记录，再以机械门保存现实。

本版的工程目标有三层。第一层是扫描 `src/` 下所有普通文件，以逻辑行而不是物理换行字节计数，保证 Windows CRLF 与 Linux LF 得到相同结果。第二层是建立收缩 baseline，让剩余债务可以分三版治理，但不允许新增超限文件、既有文件继续增长、债务条目失真或总数反弹。第三层是完成六个职责最清楚的拆分，把公开类型和不可变证据数据移到相邻模块，同时保持 loader、renderer、route、schema 与 Markdown 字节不变。

非目标同样明确。v2187 不新增报告链、治理链或验证路由，不把旧的 `managedAuditSandboxCodeHealthPass` 改造成另一套新业务服务，不修改 Java 或 mini-kv 的新鲜证据，也不把超限文件写成永久 waiver。所谓 remediation baseline 只是三版迁移期间的收缩账本，每一项都写明当前上限、目标版本和真实拆分理由；到 v2189 它必须为空。若 baseline 仍有条目，N5 就没有完成。

## Entry Points / 入口

执行入口是 `npm run source:size:census -- --json`。package script 固定调用 `scripts/source-size-census.mjs`，脚本默认以当前仓库为 project root，递归读取 `src/`，同时加载 `docs/plans/source-size-remediation-baseline.json`。调用者不需要自己拼接 PowerShell 文件列表，也不需要记住哪些目录算 source。JSON 输出记录扫描文件总数、阈值、超限列表、baseline 数量和五类 violation，评审者可以在另一台机器复现同一口径。

机械测试入口是 `test/sourceSizeRatchet.test.ts`。第一项测试直接运行真实仓库 census，要求结果 ready、阈值为八百、超限数量与 remediation 数量一致，并要求所有 violation 为空。后两项测试创建独立临时小仓库：一项放入未登记的八百零一行文件，另一项让已登记文件从八百零一增长到八百零二。两次子进程都必须返回退出码一，并在 JSON 中指出准确失败类别。测试结束后临时目录在 `finally` 中删除，不把调试材料留在仓库。

拆分入口仍然是原来的六个公开模块。`productionReadinessSummaryV4.ts` 继续导出原有 profile、category 与 message 类型，只是通过 `export type` 从 `src/contracts/productionReadinessSummaryV4Types.ts` 转发。其余五个 gate/checklist/packet 模块继续导出原 loader 和 renderer；`src/evidence/*Fixtures.ts` 只提供已经存在的常量对象及它们的结构类型。调用者无需修改 import 路径，Fastify route table 也不知道内部所有权发生了变化。

路线图入口是 `docs/plans/v2187-v2189-n5-source-size-health-roadmap.md`。它记录了十六个文件的原始行数、三版归属、需求-证据矩阵、停止条件和跨项目并行规则。这里特意不修改外部评审正在维护的 `production-excellence-node-final-push.md`，而是在权威 playbook 的进度表中把 N1 更新为外部 PASS、把 N5 更新为 v2187 进行中。这样既接收评审结论，也避免把他人的未提交修改混进 Node 版本。

## Response Model / 响应模型

census 的响应不是只有一个数字。顶层 `threshold` 当前固定为 800，`sourceFileCount` 说明扫描覆盖面，`oversizedFileCount` 是当前真实债务，`remediationEntryCount` 是账本中的允许集合，`oversizedFiles` 按行数倒序列出路径和逻辑行数。只有真实集合与账本集合完全对齐，结果才可能 ready。v2187 的结果是扫描 1223 个源文件，超限数从拆分前 16 降到 10，账本也恰好 10 项。

`violations.baselineErrors` 处理账本自身无效，例如 schema 版本错误、阈值不是正整数、路径不在 `src/`、同一路径重复、缺少目标版本或理由。`unknownOversizedFiles` 处理新出现却未登记的超限文件。`grownRemediationFiles` 比较当前行数与每项 `maxLines`，阻止以“反正已经超限”为由继续堆代码。`staleRemediationEntries` 处理文件已经降到阈值内、已删除或改名但账本未清理的情况。`oversizedCountExceeded` 是最后一道总量闸门，阻止通过替换路径等方式让总数反弹。

这种模型区分了临时债务与永久 waiver。remediation 项的语义是“必须在指定版本消失，消失前不能增长”，不是“允许长期超过八百”。最终 baseline 的 `maxOversized` 与数组长度必须同时变成零。因为脚本还要求二者相等，不能只把最大数改成零却遗留条目，也不能删除条目却让对应大文件继续存在。最终同一测试自然升级为 E9 机械门，不需要在 v2189 临时换测试或放宽断言。

## Upstream Evidence / 上游证据

本版读取的上游状态只有冻结的项目内证据和 N1 外部评审结论。Step-0 确认基础提交为 `3d53f5a7`、tag 为 `v2186`、远端 master 一致，Node Evidence 运行 29086454703 全绿。renderer census 仍是 245 total、242 standardized、3 个 AST 验证的 composition-only waiver、0 个非豁免未标准化项。最终简报中新加入的 N1-close review 明确写出 PASS，并允许进入 N5，因此不存在跳过检查点的问题。

六组被移动的数据来自现有 Node 源文件中已经冻结的 Java/mini-kv 引用。retention gate 的 Java v63 与 mini-kv v72、release bundle gate 的 Java v56 与 mini-kv v65、environment preflight 的 Java v59 与 mini-kv v68、approval rehearsal 的 Java v65 与 mini-kv v74、rollback checklist 的 Java v57 与 mini-kv v66，都只是原对象原样换到相邻文件。没有读取 sibling 当前工作树，也没有把历史 fixture 冒充 live integration 结果。

Java 与 mini-kv 在本系列中属于 recommended parallel。Node 不要求它们先生成新版本，也不拥有需要它们等待的契约门。本次 session 没有在两个 sibling 仓库写文件、运行构建、启动服务或结束进程。LF parity 只在 Node 自己的临时 worktree 内读取已提交历史证据，验证 checkout 换行风格不会让 renderer 指纹漂移。

## Service Flow / 服务流向

`source-size-census.mjs` 首先解析 `--project-root`、`--baseline` 与 `--json`。生产调用使用默认值，测试则通过 `--project-root` 指向临时 fixture 项目，因此脚本逻辑只有一份。随后 `listFiles` 递归收集普通文件，`countLogicalLines` 同时识别 CRLF、LF 与 CR，并在文本以换行结束时扣除最后一个空分片。这个细节保证同一个 Git blob 在 Windows 和 Linux checkout 上具有相同行数。

账本读取完成后，脚本建立 remediation 与 source 两张按路径索引的 Map。真实超限集合先与 remediation 比较得到 unknown；每个 remediation 再与当前行数比较得到 grown；缺失或已经不超限的条目进入 stale。所有 schema 错误和集合差异共同决定 ready，CLI 在不 ready 时设置退出码一。人类模式打印简洁清单，JSON 模式输出完整结构，但二者使用同一个 report，不会出现“终端说通过而测试读到失败”的双重口径。

逻辑行的定义还处理了几个容易被忽略的边界。空文件计为零行；末尾有换行的文件不会因为 `split` 产生的最后一个空元素而多算一行；没有末尾换行的最后一段仍算有效行。扫描不限定 `.ts` 后缀，因为 E9 约束的是 `src/` 中承载产品行为的源文件，未来若加入内嵌脚本、模板或其他文本实现，也不能绕过门。目录项只递归普通目录并收集普通文件，不跟随任意外部路径；报告路径统一相对 project root 且使用正斜杠，使 Windows 和 Linux 证据可以直接比较。

remediation 的状态转换也被刻意设计成单向。一个条目从“超限且受控”只能走向“拆分完成并删除条目”，不能通过提高 `maxLines` 回到绿色。文件改名但内容仍超限时，旧条目会进入 stale，新路径同时进入 unknown，因此一次运行会把两侧问题都暴露出来；文件被意外删除时，stale 也会阻止账本静默失去对象。若拆分后主文件降到八百以内却忘记清账，仍然失败，这迫使版本证据中的数量、文件系统现实和 baseline 三者同步收缩。

代码拆分采用 AST 选中顶层声明，而不是复制粘贴函数内部片段。`src/contracts/productionReadinessSummaryV4Types.ts` 接收十个类型声明，并保留对 file audit 与 operator identity 类型的 type-only 依赖。原模块导入这些类型供内部函数使用，再转发九个原公开名称。运行时不会加载新的类型模块，公开 TypeScript 形状保持不变，主文件从 929 行降到 741 行，新类型文件为 213 行。

`src/evidence/` 下五个 fixture 模块接收各自的 reference interface 与两个不可变对象。主模块只导入真正使用的常量，仍需要结构类型的 release bundle 和 rollback checklist 保留 type-only import；三份未直接引用类型的主模块删除冗余 import，从而让 lint warning 回到 263。retention 主文件由 891 降到 594，release bundle 由 850 降到 640，environment preflight 由 847 降到 613，approval packet 由 829 降到 659，rollback checklist 由 829 降到 649。所有新模块均远低于八百行，没有把一个大文件简单换成另一个大文件。

## Safety Boundary / 安全边界

最重要的边界是行为零变化。六个原模块中的 loader、check 计算、blocker/warning/recommendation 聚合、Markdown renderer 与 digest 函数都留在原位；移动的是类型声明和常量初始化表达式。常量对象文本由 AST 精确提取，没有重排数组、改写字符串或重新序列化 JSON。公开类型通过原模块 re-export，外部调用者不需要转向新路径。新增文件只改善所有权，不扩大 API。

第二个边界是测试期望与 fixture 不动。本版没有修改任何既有测试断言，也没有更新 renderer hash、Markdown 长度或历史 sibling 文件。六个既有契约测试直接以原入口生成 JSON/Markdown 并检查安全标志，全部通过。若常量移动造成枚举顺序、对象字段或字符串变化，这些测试与完整 parity 会失败；本版不会用改 expected 的方式接受漂移。

第三个边界是 baseline 不可伪装成 waiver。每项 `maxLines` 固定为 v2187 后仍超限文件的当前行数，后续只能删除条目，不能提高数值。脚本拒绝账本长度与 `maxOversized` 不一致，也拒绝已修复文件继续留在账本。路线图明确目标为零 waiver；如果后续确实遇到生成文件，仍需另写机械理由与增长上限，但目前十六个文件都按真实拆分处理。

第四个边界是工作树隔离。外部修改的 `AGENTS.md`、Java final-push 与 Node final-push 简报不被暂存。LF 检查使用独立 worktree 和独立 `npm ci`，没有建立指向主仓的 node_modules junction。候选 patch 通过 Git 原始输出应用，临时 patch 随即删除。清理时只移除已验证位于 `D:\nodeproj` 下的 v2187 worktree，不会按进程名批量结束 Node，也不会影响 MCP。

拆分模块的命名和目录也属于安全边界。`src/contracts/*Types.ts` 只承载类型依赖，运行时不会产生新的初始化顺序；`src/evidence/*Fixtures.ts` 承载原本就在模块加载时创建的冻结对象，主模块仍在执行 loader 前同步取得同一对象。它们没有被塞进 `services` 子目录来绕过计数，而是按“契约形状”和“静态证据”建立独立所有权；service 根目录仍只包含会装配、判断或渲染的服务模块。没有把数据读取改成延迟异步，也没有引入全局缓存。明确命名让维护者从公开 facade 可以一次跳转到数据所有者，避免出现通用 `utils.ts` 或 `shared.ts` 吸收无关职责。若后续某组 fixture 开始包含解析或 I/O，它应再按行为拆分，而不是继续堆进静态数据模块。

## Test Coverage / 测试覆盖

第一层是 source size 自测。真实仓库案例证明 1223 个文件被扫描、10 个超限与10 个 remediation 对齐、五类 violation 为空。unknown 负例证明空 baseline 无法接受 801 行新文件；growth 负例证明已登记 801 行的文件增长到 802 时仍会失败。两个 fixture 都通过子进程真实执行 CLI，而不是直接调用私有函数，因此参数解析、JSON 输出和退出码同时被覆盖。

第二层是六个受影响模块的既有契约测试，加上 ratchet 共 7 个文件、23 项测试。它们覆盖 readiness v4 的上游摘要、retention gate、release bundle、environment preflight、approval rehearsal 与 rollback checklist。typecheck 证明 type re-export 与内部 type-only import 没有破坏调用者；lint 最初指出六个新增 unused type warning，清理后恢复为 0 error、263 个既有 warning，没有把拆分噪声带入 N5 基线。

第三层是 N5 特殊 LF 入口门。临时 worktree 用 `core.autocrlf=false` 从 v2186 签出，探针文件统计为 0 个 CR、201 个 LF，随后应用同一候选差异并独立安装 198 个包。完整 renderer migration parity 包括十个版本 parity 文件和 normalizer 单测，共 11 文件、15 测试，全部通过。它覆盖 Windows 上曾遗漏的路径、digest、sizeBytes 与换行噪声类别，证明本次模块拆分没有让 CI 再充当跨平台问题发现器。

最终验证在文档写完后执行，避免“代码已验证但讲解后来改坏质量门”。它包括 typecheck、固定两 worker 的完整测试集合、lint warning 基线、build、renderer census、source size census 与代码讲解质量门。完整测试若再次超过单命令预算，将使用 Vitest 原生确定性 shard 覆盖全部文件并汇总文件数与测试数，不把 timeout 误报成断言失败，也不通过抬高并发压垮机器。提交后 Node Evidence 必须通过正式 coverage、build 与 safe smoke，下一版才能写入。

## One-sentence Summary / 一句话总结

v2187 用一套跨平台、可复现、带负向失败证明的收缩 ratchet 接管 N5，并以六个职责真实拆分把超限文件从 16 降到 10，同时保持所有公开入口、报告字节和跨项目安全边界不变。
