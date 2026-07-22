# Node v2239：报告路径消费者分层修复计划

## Step-0 对账

`v2238` 提交 `2dc5c8e1` 与标签已推送。Node Evidence run `29883103416` 通过 typecheck、lint、安全、归档、优雅、family 与 maintainability；v2237 的三项 Linux parity 失败不再出现，证明稳定报告路径和规范文本元数据方向正确。新的失败来自两个旧测试消费者：`test/support/portableProfileParity.ts` 直接打开只用于展示的 `D:\nodeproj` 别名；`rendererMigrationV2168Parity` 与 `rendererMigrationV2169Parity` 发现 `e/398`、`e/408` 相对路径被不必要地提升成绝对别名。v2238 未完成，最终九分仍未授予。

## 必要性与停止证明

- **阻塞项**：Linux coverage 无法完成，build/smoke 未执行。
- **实现边界**：报告函数保留相对路径；portable helper 将“显示字段”和“实际内容来源”分开。
- **复用理由**：继续复用 `resolveHistoricalEvidenceContentPath`，不增加第三套 fallback mapping；旧 renderer golden 保持不变。
- **增长停止**：一个生产 guard、一个测试 helper 修复、一个 resolver 回归测试；不新增 route、schema、fixture、baseline、waiver 或平台分支。远端全绿即停止。

## 需求—证据矩阵

| 要求 | 实现 | 机械证据 | 状态 |
| --- | --- | --- | --- |
| 绝对 fallback 报告跨 host 稳定 | 绝对且仓库内的 resolved path 投影 canonical root | v106/v107 profile parity、Linux CI | focused passed |
| 原有相对报告保持相对 | `!path.isAbsolute(resolvedPath)` 立即返回 | resolver unit、v2168/v2169 完整 golden | focused passed |
| portable helper 不打开展示别名 | 可读 `resolvedPath` 优先，否则声明 `path` 经 content resolver | synthetic temp、全部 9 个 helper consumer | focused passed |
| profile 创建后环境变化不换证据源 | 当前主机可读的 selected path 仍优先 | resolver echo local/fallback identity | focused passed |
| v961 pinned content 不回退 | 不可读别名由 declared path 进入 pinned content mapping | controlled preview parity | focused passed |
| 九分门与全量行为不回退 | full coverage、build、所有静态门、远端 CI | 本地与远端最终 verify | local passed; remote pending |

## 并行与安全边界

Java、mini-kv **推荐继续并行**；v2239 不需要新鲜 sibling 版本，不启动 sibling 服务，不修改 sibling 工作区。Node 仍保持 `executionAllowed=false`、无凭据值读取、无外部连接、无 managed audit/mini-kv 写入、无 schema migration。测试 helper 的文件读取只发生在测试进程，且通过现有历史 resolver 访问已声明证据。

## 本地最终验证（2026-07-22）

- 13 个受影响测试文件、42 项 focused 测试通过；全量覆盖率以四个 worker 运行，`592/592` 个测试文件、`1820/1820` 项测试通过，耗时 `1008.88s`。
- 覆盖率为 statements `95.78% (27895/29124)`、branches `90.06% (25912/28769)`、functions `98.54% (12190/12370)`、lines `95.75% (27077/28277)`。
- `typecheck`、零警告 `lint`、`build`、安全扫描全部通过；安全扫描为 `18/18` 项配置检查通过，`6/6` 个凭据字面量信号均由窄范围既有豁免解释。
- 归档为 `7203` 个文件、`64.79/80.00 MiB`；family census 为 `52/52`；renderer 为 `245/245`，其中 3 个 composition-only 豁免、0 个非豁免；800 行以上源码为 0。
- maintainability 为 `70/69/165/0`（near-limit files / long functions / complex functions / import cycles），最大函数 158 行、最大复杂度 58；九分机械门返回 `Nine-point readiness: true`。
- 本节只授予本地候选状态。最终状态仍取决于 v2239 同 SHA 的 Linux Node Evidence，包括 coverage、build 与 safe smoke；不得用此前失败 run 或本机结果替代。

## 最终验证顺序

1. [x] 13 个受影响测试文件、42 项 focused 已通过，最多四个 worker；typecheck 与零警告 lint 已通过。
2. [x] 写完 v2239 计划、解释、证据与中文 walkthrough，再运行文档质量门；最终证据刷新后以六个真实存在的质量门文件运行，`6/6` 个测试文件、`19/19` 项测试通过。
3. [x] 本机执行 `npx vitest run --coverage --maxWorkers=4`，覆盖完整测试集合；随后 build、安全、归档、family、maintainability、renderer、source-size 与 `elegance:nine`。
4. [ ] 清理 `coverage`、`dist` 与临时进程，提交/标签/推送 v2239，等待同 SHA Node Evidence。成功后做 branch/tag/clean/process 终审并停止；失败则按新证据继续修复，不提前评分。
