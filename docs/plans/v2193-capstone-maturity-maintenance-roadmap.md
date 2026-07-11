# v2193 Capstone Maturity Maintenance Roadmap

状态：本地实现与完整验证完成；等待 commit/tag/push/final CI 后停止。所有权：Node 会话。父简报：
`docs/plans/production-excellence-node-final-push.md` 的 v2192 外部评审后维护授权。

## Step-0 对账

- Node 基线为 `v2192` / `2966f1eaba97fd8e72412361deaef2bb48f610f9`；
  远端 Node Evidence run `29149682262` 绿色。工作树只包含 Claude 对
  `production-excellence-final-acceptance.md` 与
  `production-excellence-node-final-push.md` 追加的评审结论，本版本保留并提交。
- 外部 program-end review 已独立复跑真实 Java jar、mini-kv CLI 与 aiproj
  registry/receipt，给出 **CAPSTONE C1-C4 PASS**。唯一获准的新标签是
  `single-project validation + verified read-only cross-project integration (env-gated, single machine, no execution authority)`。
- Java 活跃工作树干净，提交 `a7237a85b50fed2de62eb71113739439812bc043`，
  最新标签 `v1852`；其 Stage-1 提取与最终评审仍未关闭。
- mini-kv 提交 `12b08563b2ac7a40c4874e4c2864f8deb3a32eef`，最新标签
  `v1658`，正在修改自身 README、能力快照、最终证据与文档诚实性检查；Node
  不读取这些未提交内容，也不修改该仓库。
- aiproj 提交 `5d6c288bff244ce5568c032ca7ab4bc6303dbc57`，最新标签
  `v1272.0.0`，仅有自身评审简报未提交；Node 不修改该仓库。

## 必要性证明

- **解决的阻塞**：外部评审已经授权标签升级，但 Node 的 README、START_HERE、
  生产边界、最终证据和文档测试仍把 v2192 描述为“本地候选/等待评审”，形成
  可见事实与权威 verdict 的冲突；此外，一命令 capstone 尚未被登记为 Java
  最终收口时必须执行的回归项。
- **后续消费者**：维护者、外部评审、Java 最终评审后的系统收口会读取这些入口
  文档，并使用 `INTEGRATION_LIVE=1 npm run readiness:cross` 重新证明 C1-C4、
  三个上游提交 pin、只读边界和进程清理。
- **为什么复用现有表面**：继续复用 `readiness:cross`、
  `docs/PRODUCTION_BOUNDARIES.md` 和既有文档契约测试；不新增 route、service、
  receipt、report schema 或第二个命令别名。
- **停止条件**：授权标签逐字一致，过期候选状态从活跃文档移除，回归触发条件
  受机械测试保护，完整 Node 门禁与最终 CI 绿色后停止。不得进入 Stage 2。

## 需求-证据矩阵

| 要求 | 实现位置 | 机械证据 | 完成条件 |
|---|---|---|---|
| 应用授权标签 | README、START_HERE、PRODUCTION_BOUNDARIES、最终证据、AGENTS | 文档契约测试共享固定常量并逐文件断言 | 标签逐字一致；不出现更强的 production 声明 |
| 记录外部 PASS | 活跃入口文档、最终证据、playbook 进度表、v2192 历史路线后记 | focused docs tests | 活跃文档不再写“local candidate/pending” |
| 纳入回归面 | PRODUCTION_BOUNDARIES 的 Capstone Regression Surface + bootstrap 指针 | package/workflow/boundary/bootstrap 契约测试 | 唯一命令保持注册；默认 CI 不误跑 live 集成；Java 最终收口触发规则明确 |
| 保持权限边界 | README、START_HERE、PRODUCTION_BOUNDARIES、最终证据 | 文档契约测试 + 既有 v2192 报告测试 | `read_only=true`、`execution_allowed=false` 语义不变，生产执行与 Stage 2 仍阻塞 |
| 一版收口 | v2193 归档、讲解、CHANGELOG、commit/tag/push/CI | git/tag/CI 与完整门禁 | 完成后停止，不开启后继功能版本 |

## Capstone 回归契约

1. 唯一入口仍为 `INTEGRATION_LIVE=1 npm run readiness:cross`；运行所需 Java
   jar、mini-kv CLI、aiproj 根目录和三个固定提交继续由既有环境变量提供。
2. Java Stage-1 最终评审收口时必须复跑。以后若修改 `src/integration/**`、
   `readiness:cross` 命令、聚合报告 schema、上游 probe 契约或 aiproj schema
   选择，也必须在合并前安排同等 live 复跑。
3. 成功条件不是“命令退出 0”这一句话，而是 schema v2、C1-C4 全 pass、三个
   upstream commit 非空、`read_only=true`、`execution_allowed=false`，且 Node
   自己启动的进程退出、Java 端口释放。
4. 默认 CI 继续不执行 live capstone，因为 CI 没有获准启动兄弟系统或读取本机
   路径。文档测试只保护命令、触发规则和默认 CI 排除，不伪造 live 绿色结果。

## 并行与暂停

- Java：**推荐并行**继续自己的提取与 Phase-2 收口；Node v2193 不是其预批准
  阻塞项。Java 最终评审 PASS 前，Stage 2 仍阻塞。
- mini-kv：其维护文档可独立继续；Node 不依赖其当前未提交改动。
- aiproj：Stage-1 已关闭，无需为本版推进；Node 不依赖其当前未提交简报。
- v2193 完成提交、标签、推送与绿色最终 CI 后立即停止，等待 Java 最终收口和
  届时的 capstone live 回归，不创建下一功能版本。

## 本地执行结果

- 精确授权标签已贯穿 README、START_HERE、PRODUCTION_BOUNDARIES、最终证据
  与 AGENTS；活跃入口不再保留 local candidate / review pending 状态。
- `INTEGRATION_LIVE=1 npm run readiness:cross` 已登记为 Java 最终 track close
  的强制回归，默认 CI 排除、触发条件、六项输入与成功标准均受测试保护。
- focused 文档/capstone 测试 4 文件 17 项通过；讲解质量修复后单文件 2 项通过，
  讲解为 3,432 个中文字符、合规分 100。
- 完整 Vitest 以 8 个顺序 shard、每片最多 2 worker 执行：557 文件、1,697 项
  测试全部通过。首轮 20 分钟单命令 timeout 未计作 PASS，三个本次进程已精确
  停止，残留为 0。
- typecheck、build 通过；lint 0/261；security 18/18；renderer 242/3/0；
  source-size 0 oversized；archive retention 7,035 文件 / 62.66 MiB，全部绿色。
- 本版没有运行 live capstone、没有修改兄弟仓库、没有创建截图或图片目录，
  没有授予 production execution 或 Stage 2。
