# v2192 四项目联合验收修正版说明

## 为什么需要这一版

v2191 的真实运行已经证明 Java、mini-kv 与 Node 可以在同一条只读链路中协作，外部评审也独立重跑并确认 C1、C2、C3 成立。不过，评审指出报告中的“C4”当时只是“生成单一报告”的动作，并没有第四个项目参与。若仍把它称为四项目验收，结论会比证据多走一步。v2192 不回避这个差额，而是把 C4 明确定义为 aiproj 产物验证，同时保留 `npm run readiness:cross` 作为承载全部要求的单命令入口。

本版没有要求 aiproj 启动训练、服务或脚本。Node 只读取 `D:\aiproj\docs\artifact-schema-guard-registry.json`，从中选择 `publication_receipt_v1` 登记的一份真实 JSON，再按注册表逐项检查必填字段、期望值和类型。这样既让第四个项目真正进入报告，又把风险限制在文件读取层，不把联合验收变成跨项目执行平台。

## 输入与输出

真实运行固定了三个上游提交：Java 为 `a7237a85b50fed2de62eb71113739439812bc043`，mini-kv 为 `12b08563b2ac7a40c4874e4c2864f8deb3a32eef`，aiproj 为 `5d6c288bff244ce5568c032ca7ab4bc6303dbc57`。Java jar 从隔离 detached worktree 构建；mini-kv 使用既有 `minikv_cli.exe`；aiproj 只提供注册表与 receipt 文件。三个 commit 都写入 `cross-project-readiness.json` 的 provenance，不再出现 v2191 中 `mini_kv_commit=null` 的缺口。

输出仍由一条命令原子写成 JSON 与 Markdown。JSON 使用 `orderops.cross-project-readiness.v2`，requirements 依次为 C1、C2、C3、C4。Markdown 便于人读，完整字段、路径、digest、PID 和失败细节保留在 JSON 中。命令转录以 UTF-8 保存到 `d/2192/evidence/readiness-cross-live-transcript.txt`；关键输入、清理结果和证据路径另汇总在 `integration-capstone-v2192-summary.json`。

## C4 实际检查了什么

注册表本身必须是 schema version 1，scope 必须是 `cards_and_publication_receipts`，schema id 必须唯一。选中的 schema 必须提供 artifact kind、非空相对路径、非空且不重复的 required fields、受支持的 type rules。登记路径经过两次根目录约束：先检查词法解析结果，再对 `realpath` 结果复查，因此 `..` 与 symlink 都不能把读取目标带出 aiproj 根目录。

真实 receipt 共 17,996 字节，SHA-256 为 `f03a30064a9bbbc49d057d6d9435e5ed4295104a0ef34be0d7ee8d3a36043845`。本次检查了 9 个必填字段、8 个期望值和 4 个类型规则，缺失项与漂移项均为空。除此之外，C4 还要求注册表和产物同时保持 `downstream_governance_lookup_only`，并明确看到 `promotion_ready=false`、`approved_for_promotion=false`。报告记录 `process_executed=false` 与 `promotion_allowed=false`，说明 Node 获得的是读取证据的能力，不是运行 aiproj 或晋升模型的权限。

## 联合运行与清理

C1 使用固定 Java jar 启动本地 Spring Boot，读取 health 与 ops evidence，发送无身份信息的负向 POST 证明写路由被拒绝，再通过 loopback Actuator shutdown 优雅关闭。C2 启动真实 mini-kv CLI，仅输入 `SMOKEJSON`、`CHECKJSON GET capstone:probe` 和 `QUIT`；新鲜输出证明 GET 不写数据且不触碰 WAL。C3 继续组合 Node 静态零写表面、Java 拒写和 mini-kv no-execution。C4 在这三项之后完成 aiproj 文件契约验证。

最终报告为 `overall_status=pass`，四项 requirement 全部 pass，顶层 `read_only=true`、`execution_allowed=false`。Java launcher PID 27964、应用 PID 29976、mini-kv PID 29172 在检查后均不存在；Java 使用的 58683 端口没有监听，且 `fallback_kill_used=false`。这说明通过不是靠遗留后台进程换来的，优雅关闭和资源释放也是验收的一部分。

## 当前结论与停止条件

v2192 已经形成可提交外部评审的四项目本地候选证据，但它仍不是 program-end 的自授 PASS。README、START_HERE 和生产边界继续使用 `single-project validation + cross-project contract alignment`，生产执行和 Stage 2 都保持未授权。下一步只做版本收口、确认 v2192 CI 绿色并请求外部 program-end review。除非评审提出可复现缺口，否则不再延长 readiness requirement 链。

全量门禁现已完成：8 个顺序 coverage shard 在每片最多 2 个 worker 的条件下覆盖 557 个测试文件和 1,696 个测试，合并结果全部通过；statements、branches、functions、lines 分别为 95.56%、87.29%、98.45%、95.53%，没有降低 94/86/97/94 floor。typecheck、build、lint 0 错误/261 警告、security 18/18、renderer census、source-size census 与 archive retention 也全部通过。因此本地剩余动作只剩提交、tag、push、确认 CI 绿色和请求外部评审。

本版没有可视化页面，也没有需要人工判断的 UI 状态，因此没有创建图片目录。对本版本最有证明力的是机器可读 JSON、UTF-8 transcript、digest、PID/端口清理结果以及负向测试；制造一张只展示 PASS 文本的截图不会增加证据强度。
