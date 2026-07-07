# v2170 说明：operator lifecycle renderer 标准化

v2170 继续执行 N1 renderer consolidation，把 Java/mini-kv operator lifecycle 与 declared runtime lifecycle 相关的四个同步完整报告迁移到 `renderVerificationReportMarkdown`。覆盖文件包括 operator service lifecycle evidence intake、declared operator lifecycle evidence intake、runtime execution packet stop record、runtime execution artifact intake preflight。本版不改变 route、schema、loader、历史证据读取、审批语义或真实执行权限，只把重复 Markdown 拼装收进统一 builder。

迁移前后使用真实 loader、`ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`、固定 `generatedAt`、归一化 JSON `path`/`resolvedPath` 字段后做字节级对账。四份报告的规范化 SHA-256 分别为 `532b01197d718d4b672fdc17e50560dca088c2c792963fdd261505b423ffd58f`、`6c49aa9894a1007cfbd91d4d941e07081470ba65705c82e713f547b4280d64b9`、`13ea4a204ad9fb25db162a05371d03438196d1e854ee183392991d6f944c642d`、`b21a2ad5e42cb76074554ee0c1a24dcd681e2bf00299225d46f9796999a2eb71`。断言覆盖长度、H1/H2/H3 数量和末尾换行。

收尾时同步修复 v2169 远端 CI 的 Linux runner 漂移：`passEvidenceCloseout` 报告会列出归档 file-reference 的 `sizeBytes` 和 `digest`，这些值来自 checkout 后文件字节；Windows 与 Linux 对历史文本归档的换行字节处理不同，导致同一业务输出在 CI 上 hash 不一致。v2170 没有改 renderer、loader、fixture 或测试业务期望，只把 parity 测试的归一化边界收窄到 JSON file-reference 元数据中的 `sizeBytes/digest`，让测试继续比较稳定的报告结构、字段顺序和正文内容。

验证已通过 v2169+v2170 focused gate、renderer census、typecheck、代码讲解质量门、readability closeout、lint 和 build。renderer census 从 205/245 标准化推进到 209/245，未标准化 renderer 从 40 降到 36，map signal 从 43 降到 37，flatMap signal 从 28 降到 27；lint 维持 0 error / 263 existing warnings。本地曾以 `npx vitest run --coverage --maxWorkers=2` 尝试完整 coverage，约 30 分钟仍无最终 Vitest 汇总后按超时预算停止，因此不计入通过或失败，推送后的 GitHub CI 继续作为完整 coverage 采信门。Java 与 mini-kv 仍可并行推进；本版只消费冻结证据，不要求新鲜 sibling output，也不授予 live read 或 runtime execution。
