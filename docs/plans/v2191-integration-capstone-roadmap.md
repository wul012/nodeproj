# v2191 Integration Capstone Roadmap

状态：执行中。所有权：Node 会话。父计划：
`docs/plans/production-excellence-final-acceptance.md` 的 C1-C4。

## Step-0 对账

- Node `v2190` 已提交、打 tag、推送，最终 CI 绿色；外部评审已明确给出
  Stage-1 PASS，并授权开始 C1-C4。
- Java 继续自己的文件拆分批次；Node 只在一个确定提交上构建并启动 jar，
  不修改 Java 源码、账本、tag 或分支。
- mini-kv 与 aiproj 不开展新工作。C2 只执行现有真实
  `minikv_cli.exe`，不修改 mini-kv 工作树，不启动 server，不执行写命令。
- Claude 留在 Node 工作树中的三处评审结论属于本版本批准纳入的输入，
  不回退、不改写其结论。

## 必要性证明

- **解决的阻塞**：三个项目此前只有单项目验证和冻结证据消费，没有一次由
  Node 在同一会话中读取真实 Java 进程及真实 mini-kv CLI 的联合证明。
- **后续消费者**：Stage 2 composed-runtime brief 的本地编排、部署和监控阶段
  以本 capstone 为入口门；外部评审以归档的 JSON/Markdown/运行转录授予最终
  capstone PASS。
- **为什么不能复用旧报告**：旧报告读取冻结 fixture 或已经写好的 receipt，
  无法证明当前机器上的 jar 能启动、HTTP schema 仍兼容、CLI 输出是本次新鲜
  产生，也无法证明进程被本次命令关闭。
- **停止条件**：C1-C4 同时通过并归档一次真实运行后停止新增 readiness 链；
  不新增路由、echo、receipt 或治理链，不进入 Stage 2，等待外部最终评审。

## 需求-证据矩阵

| 要求 | 实现 | 机械证据 | 完成条件 |
|---|---|---|---|
| C1 Java 实时只读 | env-gated runner 启动 prod+H2 jar，读取 health/evidence，再精确关闭子进程 | lifecycle 单测、默认 skip 测试、真实运行 JSON 与日志 | 两个 GET 均 200；health 为 UP；evidence 含版本、服务和只读边界；无遗留 Java PID |
| C2 mini-kv 实时只读 | 直接执行 env 指定的 `minikv_cli`，stdin 仅含 `SMOKEJSON`、`CHECKJSON GET capstone:probe`、`QUIT` | parser/timeout/命令计划测试及真实新鲜输出摘要 | 两份 JSON 来自同一新进程；均只读且禁止执行；CHECKJSON 不写 WAL |
| C3 无写证明 | capstone 专用上游 client 只公开 GET；路由 census 机械统计零写方法；独立负向探针对 Java replay POST 不带身份头 | prototype/route census 测试、实时 4xx、fresh CHECKJSON | client 写方法数为 0；Java 写路由非 2xx；mini-kv `write_command=false` |
| C4 单命令报告 | `npm run readiness:cross` 聚合 C1-C3 并写 JSON+Markdown | renderer/exit-code/原子写入测试、归档的完整本地运行转录 | 顶层明确 `read_only=true`、`execution_allowed=false`；每项 pass/fail/skipped；真实运行 overall=pass |

## 实现边界

1. `src/integration/` 只放 capstone 自有的类型、catalog、Java/mini-kv 探针、
   进程生命周期和报告渲染；共享通用逻辑才抽取，避免单文件超过维护阈值。
2. `INTEGRATION_LIVE` 未开启时，任何外部进程都不得启动，结果必须是
   `skipped`，不能伪装成 pass。开启后缺少路径、启动失败、schema 漂移或
   清理失败都属于 fail，并使命令非零退出。
3. Java 使用 `--spring.profiles.active=prod`、独立 H2 内存库和动态/显式空闲端口；
   禁用业务调度器。只允许 GET `/actuator/health`、GET
   `/api/v1/ops/evidence`，以及用于拒写证明的一次无身份 POST
   `/api/v1/failed-events/0/replay`。该 POST 必须在业务服务调用前返回 4xx。
   另在随机 loopback 端口临时开放 Actuator shutdown，仅用于关闭本次 Node
   自己启动的 Spring context；它不属于上游业务 client 表面，不能触发业务写入。
4. mini-kv 输入计划固定为三个命令；禁止 SET/DEL/EXPIRE/LOAD/COMPACT/
   RESTORE/SETNXEX 和任何 server 启动。报告记录可执行文件 SHA-256、版本字段、
   新进程开始/结束时间，但不把完整超长 SMOKEJSON 复制进 Markdown。
5. capstone client 与现有业务 `OrderPlatformClient`/`MiniKvClient` 隔离。
   C3 的“零写方法”约束的是这条新联合验证表面；现有业务 client 的写 API
   不是 capstone 权限，不能被 runner 导入或调用。

## 失败条件

- 修改 Java/mini-kv 源码、fixture 或测试期望来让联合运行通过。
- 默认测试在没有 env gate 时启动外部进程，或把 skipped 汇总为 pass。
- 真实运行使用冻结 JSON 替代进程 stdout，或 mini-kv 命令计划含写/admin 命令。
- Java 进程退出前未确认，按“报告已写”掩盖清理失败。
- 报告只给总布尔值、没有逐项状态和失败原因。
- 更改成熟度声明，或在外部 capstone review PASS 前进入 Stage 2。

## 验证与收口顺序

1. focused tests + typecheck + lint，确认默认模式只有 skip。
2. 在 Java 干净提交的隔离构建产物上运行一次 C1；记录 commit、jar SHA-256、
   PID、端口及停止结果。
3. 对现有真实 mini-kv CLI 运行 C2；记录 executable SHA-256 和 fresh 输出边界。
4. 以 `INTEGRATION_LIVE=1 npm run readiness:cross` 生成最终 JSON、Markdown 和
   transcript；随后确认端口与精确 PID 均已释放。
5. 在最终 verify 前完成中文代码讲解；执行 full tests、coverage、build、lint、
   security/census gates。清理 `.tmp`、`dist`、`coverage` 和本次所有进程。
6. commit/tag/push/CI 绿色后停止，提交 Claude program-end review；不启动 Stage 2。

## 并行说明

- Java：推荐继续原拆分批次；C1 只在批次边界读取一个确定 commit 的 jar，
  无需等待 Node 预批准。若 Node 发出打包窗口请求，Java 在当前批次收口后让出
  一个只读构建窗口即可。
- mini-kv/aiproj：无需推进，无需写入；mini-kv 仅作为已存在 CLI 的被测依赖。
