# v2193 Capstone 成熟度维护版说明

## 本版解决的问题

v2192 的 C1-C4 联合验收已经被外部 reviewer 以真实 Java jar、真实 mini-kv
CLI 和真实 aiproj registry/receipt 独立复跑并判定 PASS。仓库原有入口仍写着
“local candidate / external review pending”，因此事实、入口文档、代理规则和
测试期望之间出现了冲突。v2193 只处理这项维护债务，不新增运行时能力。

本版把外部唯一授权的标签逐字应用到 README、START_HERE、生产边界与 Node
最终证据：`single-project validation + verified read-only cross-project integration (env-gated, single machine, no execution authority)`。
标签明确承认真实只读联合消费已经验证，同时保留显式环境门、单机范围和无执行
授权三项限制。生产执行仍未授权；Java Stage-1 未完成，因此 Stage 2 与整个
program closeout 继续阻塞。

## 回归面

`docs/PRODUCTION_BOUNDARIES.md` 现在登记唯一 live 回归命令：

```powershell
INTEGRATION_LIVE=1 npm run readiness:cross
```

Java 最终 track close 时必须复跑；以后修改 integration 实现、npm 命令、聚合
schema、上游 probe 契约或 aiproj schema 选择时也必须安排复跑。通过标准包括
schema v2、C1-C4 pass、三个 upstream commit 固定、`read_only=true`、
`execution_allowed=false`、owned process 全部退出和 Java 端口释放。

默认 CI 仍不运行 live capstone，因为普通 runner 没有兄弟仓库路径与启动权限。
文档契约测试同时检查 package script 仍注册、boundary 仍有触发规则、bootstrap
仍显示入口、默认 workflow 仍未误接 live 命令。这样不会用 skipped 结果冒充
联合回归通过。

## 验证与证据

首轮 focused 测试发现 START_HERE 将关键“not authorized for production
execution”句子拆成两行，机械契约按真实字节正确失败；修正为完整句后，四个
focused 文件共 17 项测试通过，typecheck 通过。完整 suite 的单命令低并发运行
在 1204 秒到达预算，未输出 assertion 失败，但也没有最终汇总，因此不计作通过；
本次精确停止其 Vitest 主进程与两个 worker，确认残留为零后，改用 8 个顺序
shard、每片最多 2 worker。最终 557 个测试文件、1,697 项测试全部通过。

新增讲解首次进入全量 shard 时触发了既有可读性门：中文字符数与段落质量合格，
但缺少显式“响应模型”和“一句话总结”。本版没有修改测试期望，而是补齐真实
解释；扫描结果变为 3,432 个中文字符、合规分 100、缺失章节 0，失败文件单跑
与 shard 2 重跑均通过。

其余门禁结果为：build 通过；lint 0 error / 261 warning，等于既有 ceiling；
security 扫描 8,176 个文本文件，6/6 credential signals 被精确 waiver，18/18
配置检查通过；renderer census 为 242/245 标准化、3 个既有组合型 waiver、
0 个非 waiver；source-size 超 800 行文件为 0；archive retention 为 7,035 个
文件、62.66 MiB / 80 MiB。机器明细见
`d/2193/evidence/capstone-maturity-maintenance-v2193-summary.json`。

本版没有 UI、页面或需要视觉判断的状态，因此不创建图片目录。Markdown 截图
不能比测试、diff、命令输出和 CI 提供更强证据。Node 未启动 Java、mini-kv、
aiproj 或本地服务，也未修改三个兄弟仓库；它们仅在 Step-0 中被只读查看。
