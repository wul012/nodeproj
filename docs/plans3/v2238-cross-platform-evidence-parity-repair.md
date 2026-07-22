# Node v2238：跨平台历史证据 parity 修复计划

## Step-0 对账

`v2237` 提交 `10473f6b` 与标签已经推送。Node Evidence run `29881584343` 在 Linux runner 上通过依赖安装、typecheck、零警告 lint、安全配置、归档预算、优雅门、family census 与 maintainability census，随后在 coverage 内的三项 parity 断言失败：Java v106 profile 为 `38,242 != 38,343`，Java v107 profile 为 `42,958 != 43,068`，operator-window Markdown 长度仍为 17,955，但摘要从 `093bb3...` 变为 `7f6576...`。本地同四项测试通过，因此 v2237 只有本地结论，没有最终九分授权。

## 必要性证明

- **阻塞项**：同一 commit 在 Windows 与 Linux 产生不同只读报告字节，远端最终门失败。
- **后续消费者**：Node Evidence、forced historical fallback、renderer parity 与所有使用 `HistoricalEvidenceFile.resolvedPath` 的 profile。
- **不能复用的原因**：现有 resolver 只有真实读取路径；现有 `historicalEvidenceReportUtils` 已规范化文本，但 `manualConnectionSources` 仍复制了一份原始字节算法。
- **停止条件**：只新增一个稳定报告路径函数，并让 manual connection 复用既有元数据 kernel；不新增 route、report chain、schema、fixture 或 waiver。远端同 SHA Node Evidence 成功后停止。

## 需求—证据矩阵

| 要求 | 实现 | 机械证据 | 状态 |
| --- | --- | --- | --- |
| 读取路径仍指向当前 runner 的真实文件 | `resolveHistoricalEvidencePath` 与 `resolveHistoricalEvidenceContentPath` 保持 I/O 职责 | resolver focused tests、现有 fallback tests | passed |
| profile 不暴露 runner 根目录 | `resolveHistoricalEvidenceReportPath` 将仓库内 fallback 映射到稳定 Windows 兼容别名 | 精确路径测试、v106/v107 byte parity、Linux CI | local passed；CI pending |
| 文本证据不受 LF/CRLF/BOM 影响 | `manualConnectionSources.evidenceFile` 复用 `historicalEvidenceReportUtils.evidenceFile` | LF 与 mixed/BOM 同 size/digest test、operator parity | local passed；CI pending |
| 不用改 fixture 掩盖问题 | 不改任何历史 fixture 字节 | `git diff --name-status`、v961 blob test | passed |
| 不放宽优雅结果 | baseline 与九分阈值不变 | `npm run elegance:nine` | passed |
| 远端真实完成 | build/smoke/coverage 在 Linux runner 全绿 | Node Evidence 同 commit SHA | pending |

## Oracle 修正规则

operator-window 旧摘要来自本机 `OpsOverviewIntegrationTests.java` 的物理混合换行：3,865 个 CRLF、113 个 LF，其中 109 个 LF 连续集中在局部编辑区；Git blob 只保存规范 LF，Linux checkout 无法重现该工作树状态。因此旧摘要不是可提交、可复现的合同。v2238 允许只把这一项摘要改为对 Git 规范文本计算得到的 `7f6576...`，同时增加 LF/CRLF/BOM 等价测试。不得修改 profile 期望、业务字段、fixture 内容或安全布尔值。

## 并行与边界

Java 与 mini-kv **推荐继续并行**；本版只消费 Node 内冻结的 sibling fixtures，不要求新版本、不启动 sibling 服务，也不写 sibling 仓库。运行时边界保持：`executionAllowed=false`，不读凭据值、不建立外部连接、不自动启动 Java/mini-kv、不写 managed audit 或 mini-kv。

## 验证顺序

1. focused：resolver/report utility、v106/v107 profile、packet/preflight/operator renderer 与三个服务测试，最多四个 worker。
2. typecheck、零警告 lint、build、`elegance:nine`、文档/讲解质量门。
3. 提交 `v2238`、打标签并推送；等待同 commit 的 Node Evidence。CI coverage 是最终全量测试与覆盖率证据，不在本机重复启动高并发 coverage。
4. 远端失败则只处理可复现根因；成功后核对远端 branch/tag、干净工作树、无 `dist`/`coverage`/smoke/Vitest 进程，然后授予九分点结论并停止。

## 本地最终结果（2026-07-22）

最终文档写入后，10 个相关/文档测试文件共 41 项通过；其中 v106/v107 完整 profile、packet/preflight/operator Markdown、resolver、规范文本元数据与三个领域 service 全绿。typecheck、全仓零警告 lint、build、安全配置 18/18、归档预算 7,199 文件与 64.77/80 MiB 通过。family 52/52、maintainability `70/69/165/0`、renderer 245/245 且非 waiver 为零、超 800 行源码为零；`elegance:nine` 全项通过，最大函数 158、最大复杂度 58、name debt 4,130。中文 walkthrough 为 3,079 个汉字。当前状态只缺同 commit 的远端 Node Evidence。
