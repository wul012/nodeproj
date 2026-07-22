# v2233-v2237 九分终局收敛计划

## 状态与所有权

状态：active。所有权：Node 会话。起点：`f1cd6ead` / `v2232`。范围只包括内部 Markdown ownership、
verification bounded context、复杂函数职责分离、私有 type barrel 暴露面收缩、机械门和维护文档；不新增
route、schema、fixture、权限、网络、写路径或执行能力。若 v2237 后终局门仍有红项，立即按新真实值写
successor 并继续，不请求主观评分。

Java 与 mini-kv 为 **recommended parallel**。本批不读取新鲜兄弟证据，不启动或修改兄弟服务，Node 不是
它们的批准前置。所有行为验证使用 Node 既有 typed profile、冻结 historical fixture 或内存 ledger。

## Step-0 现实

- v2232 本地通过 586 个测试文件、1,805 项测试、typecheck、lint、build、全部静态门、默认安全 smoke 与
  强制 access-guard/historical-fallback smoke；远端 Node Evidence run `29830382059` 正在执行。
- 九分门当前通过 6 项、失败 6 项：近限 73/70、长函数 72/70、复杂函数 193/170、最大函数 163/160、
  name debt 4,444/4,200、verification logic 1,320/1,000。最大复杂度 59/60 已通过。
- verification logic 的前四个 formatter owner 分别为 production connection archive 91 行、manual packet
  83 行、manual preflight 83 行、live probe archive 83 行，合计 340 行；迁出后理论值 980。
- packet/preflight/operator-window 三个 owner 分别为 733/778/754 行，属于近限账本；renderer 迁出可让
  三者真实退出近限，而不是压行。
- 私有包 `private: true`，无 npm exports/main/types。controlled-shard mega type barrel 有 345 条 name debt，
  但全仓实际仅消费其中约四十个唯一类型名。只允许删除经 AST 证明无人 import 的 re-export；已消费类型和
  现有 type-barrel test 不得修改，禁止改成 `export *` 隐藏债务。

## 必要性证明与停止条件

唯一 blocker 是九分终局门的六个绝对红项。现有 report builder、maintainability/elegance/family census 与
typecheck 可以复用，因此不建新 route/report/governance 链。formatter 迁移由既有
`renderVerificationReportMarkdown` 消费；复杂度迁移只提取具名 predicate/domain assembly；type barrel
只裁无人消费暴露面。`npm run elegance:nine` 全绿且最终本地/远端回归通过后，本链停止，不增加 9.1/9.2。

## 需求-证据矩阵

| 要求 | 实现边界 | 机械证据 | 状态 |
| --- | --- | --- | --- |
| verification logic <=1,000 | 四个 formatter 迁入短 renderer/spec，使用既有 report builder | 迁移前冻结完整字节 hash；迁移后 exact match；family census | passed: 1320→898 |
| 近限文件 <=70 | packet、preflight、operator-window 移出 Markdown ownership | maintainability 三个 stale file key，物理行数核对 | passed: 73→70 |
| 长函数 <=70、最大 <=160 | 拆 163 行 loader 与至少一个相邻 long builder | focused profile parity + maintainability | passed: 72→69，max 163→158 |
| 复杂函数 <=170 | 从实时排名选择至少 23 个复杂函数，按完整 predicate/domain group 提取 | 每批 focused + complex stale keys；无 replacement growth | passed: 193→165 |
| name debt <=4,200 | 私有 mega type barrel 仅保留全仓真实 import 集合 | AST import/export 差集 test、typecheck、原 type barrel test、elegance | passed: 4444→4130 |
| 终局真实通过 | 十二项绝对阈值与底层 ready 同时为真 | `npm run elegance:nine` + full shard/coverage/build/smoke/CI | local passed；remote Linux parity failed，转 v2238 修复 |

## 防刷分规则

1. 不改现有测试期望、snapshot、fixture、normalizer 或十二项阈值；新 parity oracle 必须在改生产源码前冻结。
2. 不把 formatter 仅改名留在 verification 文件，也不靠目录后缀规避 family；它必须变成 report-builder spec，
   原服务只保留 loader/check/message ownership。
3. 不用 `export *`、ignore、scanner 特判或批量重命名公共类型降低 name debt。只删除 AST 证明全仓无人消费的
   私有 barrel re-export；任何真实 import 名必须保留原名与原入口。
4. 复杂函数提取必须对应完整 source/check/boundary/domain mapping，不允许一行转发、压行或隐藏 AST。
5. 每个 commit 约 3,000 changed lines 以内；每版中文讲解至少 3,000 汉字，写不够则增加真实工程与验证深度。

## v2233：production archive renderer ownership

先为 production connection archive 和 live probe archive 建立固定 profile 的完整 Markdown byte/hash oracle。
随后把两个手写 renderer 迁到 `verificationReports/` 的短领域文件，使用
`renderVerificationReportMarkdown` 与显式 section specs。原模块 re-export 原函数名，route/import 无变化；
latest approval、messages、entries/list 空态、字段顺序、末尾换行必须完全一致。目标 verification logic
`1320 -> <=1146`，不新增 renderer waiver、name/family/maintainability 债务。

## v2234：manual packet 与 preflight renderer ownership

固定 historical fallback 与生成时间，冻结 READY/BLOCKED profile Markdown。将 packet 与 preflight 的
renderEvidenceFile/renderSnippet 和主 renderer 迁入同一 bounded context 下两个短 renderer；共用的 evidence
block 只在第三次结构出现前建立一份 typed helper。目标 verification logic `<=980`，packet 733 行与 preflight
778 行均退出近限账本，近限 `<=71`。来源读取、snippet 真假和 no-start/no-write checks 不动。

## v2235：operator-window 与最大函数

迁移 operator-window formatter，使第三个近限 owner 退出账本，近限 `<=70`，verification logic 继续低于
终局阈值。把当前 163 行 runtime-shell-post-decision quality loader 按 source catalog、quality findings、summary
与 response assembly 分离，使全仓最大函数 `<=160`；同版处理至少四个相邻 high-complexity predicate builder，
不得让最大复杂度重新超过 60。

## v2236：复杂函数组合收敛

重新读取实时 top list，选择同一领域调用链内至少十九个剩余 complex 函数；优先 disabled precheck/test-only
echo references、latest sibling archive checks、active shard boundary checks 与 controlled-shard validators。相似的
reference mapping 在第三次前建立数据 spec 或 typed evaluator。版本结束 complex `<=170`、long `<=70`，
replacement long/complex 为零；若 v2235 已多消除，可按真实剩余数缩小但不得少于终局阈值所需净值。

## v2237：私有 type barrel 暴露面收缩与终局验收

用 TypeScript AST 枚举 `src` 与 `test` 对稳定 barrel 的 named imports，再与 mega barrel named re-exports做差。
保留所有被消费名字及现有六项 stable-barrel 类型测试要求；删除无人消费 re-export 块，不动原始类型声明，
不改成 wildcard，不重命名 schema/type。新增机械 test 证明保留集覆盖所有真实 imports、barrel 不再暴露无人
消费项。目标 name debt `<=4,200`，typecheck 与所有 controlled-shard tests 通过。

终局随后运行：独立 test discovery、最多四 worker 的四个顺序 shard、coverage、typecheck、全仓零告警 lint、
build、security/archive/elegance/family/maintainability/renderer/source-size、`npm run elegance:nine`、默认安全与
access-guard historical-fallback smoke、远端 Node Evidence。只停止本会话 PID，删除 `dist` 与临时产物。

## 提交与 CI 节奏

- 每版：oracle -> 源码 -> focused -> typecheck/lint/static -> baseline 只收紧 -> 中文讲解 -> 两个以内审查提交 -> tag。
- v2233-v2236 只做本地 focused/static；v2237 一次 push 全批标签并运行完整 CI，避免每版重复昂贵验证。
- v2232 的远端 run 在 v2233 开始时只读复核；失败必须先归因，若与当前改动相关则成为本批阻塞。

## 失败条件

- 任一 Markdown 字节、JSON、route、schema、权限、网络、write/no-write 或 fail-closed 行为漂移；
- 删除仍被任一源码/测试 import 的 type export，或修改 type test 以适配删减；
- formatter 只是换后缀、复杂函数只是压行、name debt 只是 scanner 漏计；
- baseline/阈值放宽、新 family 增长、新 >800 行文件、导入环、非豁免 renderer 或新增 long/complex；
- 讲解少于 3,000 汉字，或终局有红项时声称九分。

## v2234 执行结果（2026-07-21）

packet/preflight 两份完整 Markdown 已在生产源码修改前冻结，并在强制 historical fallback 下完成迁移后 exact-byte 复验。renderer 进入 `verificationReports/manualConnection.ts`；重复的历史证据 I/O 与固定 advisory 分别进入 `manualConnectionSources.ts` 和 `manualConnectionAdvisories.ts`。verification logic `1146 -> 980`，两个原服务 `733/778 -> 535/576` 行，近限 `73 -> 71`，其余账本 `72/193/0`、name debt `4444`、tracked family `52` 不增长。v2234 状态：passed；下一检查点仍是 v2235，不提前执行终局 CI。

## v2235 执行结果（2026-07-21）

operator-window Markdown 在 forced fallback 下以 17,955 字节完整 oracle 完成迁移；原服务 `754 -> 582` 行并退出近限。163 行 catalog-quality loader 按 scope/source/checks/summary/assembly 拆成最大 73 行以内的阶段，主 loader 27 行。v97/v102 receipt 改用 typed field specs，五个相邻复杂热点无替代增长地退出账本。最终 verification logic `980 -> 898`，维护指标 `71/72/193/0 -> 70/71/188/0`，最大函数 `163 -> 158`，name debt `4444` 与 tracked family `52` 不变。v2235 状态：passed；v2236 只需消除至少 18 个 complex 与 1 个 long 才能触达终局阈值。

## v2236 执行结果（2026-07-21）

十九个 controlled-shard blocked-reason validator 的 744 个三元分支迁入一份有序规则 kernel，领域条件、失败码与声明顺序仍留在原 owner；AST 复核目标函数残留条件表达式为零，二十个直接测试文件九十三项通过。Java v106/v107 reference 使用 typed snippet field specs，并按 contract/boundary 分组；四个热点分别降至 `67/1`、`71/1`、`64/1`、`80/1`（行数/复杂度），两份完整 profile 在 forced fallback 下保持 38,343/43,068 字节及原 SHA-256。维护指标 `70/71/188/0 -> 70/69/165/0`，超过终局 `70/70/170/0` 要求；name debt `4444`、tracked family `52` 不变。v2236 状态：passed；v2237 只处理私有 type barrel 暴露面与终局验收。

## v2237 本地执行结果（2026-07-22，远端 CI 失败）

AST census 对 private barrel 的 352 个 named re-export 与主 facade 的 4 个直出类型逐项对账，并扫描 `src`/`test` 的 named import、named re-export 与 import type。真实消费面为 41 个名字，其中 private barrel 保留 37 个、删除 315 个无人消费 export，文件 `498 -> 75` 行；永久 ratchet 断言 unused/missing/duplicate/wildcard/unsupported namespace 均为零。name debt `4444 -> 4130`，九分门十五项全绿。

最终 shard 首次发现 v2236 的完整 preview parity 漂移。逐标签与递归字段差异证明，业务字段未变，唯一原始差异是 Node v961 历史证据仍读取可变当前源码；一个物理 `sizeBytes/digest` 变化级联污染 236 个派生摘要。没有修改旧期望或放宽 baseline，而是提交与真实 v961 Git blob 完全一致的冻结快照，并让读取层只对该精确历史路径取冻结内容、保留原声明路径。快照与 v961 blob 同为 `260776b4...`，当前源码与 v2236 优雅实现同为 `89b94e39...`；parity 和 maintainability 同时恢复通过。

最终代码的四个顺序 shard 在最多四个 worker 下通过 592 个文件、1,817 项测试；coverage 通过同一 592/1,817，语句/分支/函数/行为 `95.77/90.06/98.54/95.75%`。typecheck、全仓零警告 lint、build、security 18/18、archive 64.74/80 MiB、全部静态门通过，维护指标为 `70/69/165/0`、最大函数 158、最大复杂度 58、name debt 4,130。默认安全 smoke 与强制 access-guard/historical-fallback smoke 均通过：零上游请求、JSON/Markdown 200、无身份 401、所有执行/启动/写边界为 false。两个服务已按 PID 停止。

远端 Node Evidence run `29881584343` 在 Linux runner 上通过前十一项门，但两个新 profile parity 与 operator-window Markdown parity 失败。失败不是业务字段变化：共享 report utility 把宿主机绝对 fallback 根写入 profile，另一个旧 utility 又按工作树原始换行计算文本证据；本地 oracle 因标准目录与一份不可由 Git blob 重现的混合 CRLF/LF 工作树而偶然通过。v2237 因此保持“未授予最终九分”，唯一后继 v2238 负责把读取路径与报告路径分离、统一文本元数据算法并重新取得远端绿色结论。
