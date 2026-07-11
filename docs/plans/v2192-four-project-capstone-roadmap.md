# v2192 Four-project Capstone Roadmap

状态：本地实现与完整验证已完成；等待 commit/tag/push/green CI 后提交外部评审。
所有权：Node 会话。父简报：
`docs/plans/production-excellence-node-final-push.md` 的 v2192 评审修正。

## Step-0 对账

- Node 基线为 `v2191` / `2a97ba9c`，远端 CI 绿色。工作树只存在 Claude
  留下的 Java、Node 两份简报追加，本版本保留并一并提交。
- Java 固定输入为干净提交 `a7237a85b50fed2de62eb71113739439812bc043`；
  Node 只在隔离 worktree 构建 jar，不修改 Java 活跃工作树。
- mini-kv 固定输入为提交 `12b08563b2ac7a40c4874e4c2864f8deb3a32eef`，
  只执行既有 `minikv_cli.exe` 的三条只读命令。其工作树已有外部文档修改，
  Node 不触碰。
- aiproj 固定输入为提交 `5d6c288bff244ce5568c032ca7ab4bc6303dbc57`。
  其工作树已有外部简报修改；C4 只读取提交内已有注册表和一份已登记 JSON，
  不启动 Python、训练、服务或任何 aiproj 进程。

## 必要性证明

- **解决的阻塞**：v2191 实际只生成 C1-C3，无法达到评审要求的四项目阈值；
  aiproj 既未进入 requirement，也未留下 artifact digest 与 commit provenance。
- **后续消费者**：外部 program-end review 只消费 v2192 的单一 JSON、Markdown、
  transcript 和机械测试；Stage 2 仍由该评审决定，不由 Node 自行开启。
- **为什么不能复用旧报告**：v2191 报告 schema 没有 C4/aiproj provenance，且
  `mini_kv_commit` 为 `null`。冻结 fixture 也不能证明当前真实文件与真实 CLI。
- **停止条件**：一个真实 v2192 运行同时通过 C1-C4，固定 Java、mini-kv、
  aiproj 三个提交，归档并通过本地门禁后停止。不得新增第五个 requirement、
  新路由、新 receipt 或 promotion 链。

## 需求-证据矩阵

| 要求 | 实现 | 机械证据 | 完成条件 |
|---|---|---|---|
| C4 注册表真实性 | 读取 `docs/artifact-schema-guard-registry.json`，选择唯一 `publication_receipt_v1` | 注册表结构、schema 唯一性、路径归属、注册表 SHA-256 单测 | UTF-8 JSON 可解析；schema 与 artifact path 唯一且均位于 aiproj 根目录内 |
| C4 产物契约 | 读取注册表登记的 publication receipt，逐项检查 `required_fields`、`expected_values`、`type_checks` | 缺字段、值漂移、类型漂移、路径逃逸与真实产物测试 | 所有登记规则通过；artifact path、bytes、SHA-256 写入 evidence |
| C4 权限边界 | 文件读取器不公开进程或写入能力；报告记录只读、无进程执行、无 promotion authority | 边界字段断言与真实报告 | `read_only=true`、`process_executed=false`、`promotion_allowed=false` |
| 四项目 provenance | 报告 schema 升为 v2，新增 `aiproj_commit`，真实运行补齐 `mini_kv_commit` | 聚合测试与 v2192 归档测试 | Java、mini-kv、aiproj commit 均非空并与 Step-0 固定值一致 |
| 单命令闭环 | `npm run readiness:cross` 仍是唯一入口，聚合 C1-C4 并原子写 JSON/Markdown | 默认 skip、缺配置 fail-closed、完整 fake pass、真实运行 transcript | 默认不读取外部项目；live 缺任一 C4 输入即失败；真实 overall=pass |

原计划把“单命令报告”命名为 C4。v2192 按外部评审把 C4 明确改为
“aiproj artifact validation”；单命令报告仍是整个 C1-C4 的承载机制和验收条件，
但不再伪装成第四个项目 requirement。

## 实现边界

1. 新增的 aiproj probe 只使用 `readFile`、`realpath`、`stat` 和 SHA-256；不允许
   `spawn`、`exec`、网络请求、写文件或导入 aiproj 代码。
2. registry 固定为 aiproj 根目录下的提交文件；artifact 必须使用注册表中的相对
   路径，`realpath` 后仍在根目录内。绝对路径、`..` 逃逸、symlink 逃逸均失败。
3. 默认选择 `publication_receipt_v1`，因为它同时具有 schema 守卫和明确的
   `downstream_governance_lookup_only` / no-promotion 证据。不得回写或修复上游产物。
4. live 模式缺少 `AIPROJ_ROOT` 或 `AIPROJ_CAPSTONE_COMMIT` 时 C4 失败闭合；
   非 live 模式不访问 aiproj 文件，C4 明确 skipped。
5. JSON schema 从 `orderops.cross-project-readiness.v1` 升为 `v2`，保留 v2191
   历史归档原样；v2192 新增独立归档测试，不改旧证据来让新测试通过。
6. 成熟度继续保持 `single-project validation + cross-project contract alignment`。
   v2192 只能写“本地候选，等待外部 program-end review”，不能自封最终 PASS。

## 失败条件

- 修改 Java、mini-kv、aiproj 的源码、测试、产物或工作树状态。
- 为通过 C4 而放松注册表的 required/expected/type 规则，或接受未登记产物。
- 仅做字符串路径前缀判断，导致目录穿越或 symlink 逃逸可能绕过根目录边界。
- live 报告中任一上游 commit 为 `null`，或 artifact SHA-256/路径未固化。
- C4 触发 aiproj 进程、网络、promotion、训练或写入行为。
- 修改成熟度标签、进入 Stage 2，或把本地 candidate 描述为外部最终 PASS。

## 验证与收口顺序

1. focused C4/aggregation tests、typecheck、lint；默认 gate 必须保持零外部读取。
2. 中文 walkthrough 与解释先写，再执行最终 verify。
3. 在固定 Java commit 的隔离 worktree 构建 jar；以真实 mini-kv CLI、真实 aiproj
   registry/artifact 运行一次 `INTEGRATION_LIVE=1 npm run readiness:cross`。
4. 固化 JSON、Markdown、UTF-8 transcript、输入提交与 digest；验证 Java PID/端口
   已释放，且三个上游工作树没有被 Node 改写。
5. 执行 full tests/coverage、build、lint、security/census/doc gates；清理 `.tmp`、
   `dist`、`coverage`、测试 blob、隔离 worktree 与本次进程。
6. commit/tag/push，确认最终 CI 绿色后停止，等待外部 program-end review。

## 并行说明

- Java：推荐按自己的简报继续批次；Node 只在 `a7237a85` 的隔离副本构建，不是
  Java 的预批准阻塞项。
- mini-kv：无需推进；只读执行现有 CLI。其外部文档改动不纳入 Node 版本。
- aiproj：无需推进；只读当前提交的 registry 和 receipt，不执行任何代码。

## 本地执行结果

- 真实 `npm run readiness:cross`：schema v2，C1/C2/C3/C4 全部 pass；三个
  upstream commit 非空；`read_only=true`、`execution_allowed=false`。
- 清理：Java launcher/application PID 与 mini-kv PID 均退出，Java 端口释放，
  `fallback_kill_used=false`；aiproj 没有进程执行或文件写入。
- 完整门禁：557 个测试文件、1,696 个测试通过；coverage
  95.56/87.29/98.45/95.53，高于未改变的 94/86/97/94 floors；typecheck、build、
  lint 0/261、security 18/18、renderer/source-size/archive census 全部通过。
- 剩余动作只允许版本收口与外部 review；Stage 2 仍阻塞。
