# v2191 联合验收版本说明

## 版本目标

本版执行 `production-excellence-final-acceptance.md` 中已经授权的 C1-C4，解决此前“各仓库分别绿色，但没有一次真实联合读取”的最后缺口。Node 作为消费者和控制面，在显式 `INTEGRATION_LIVE=1` 门下读取真实 Java jar 与真实 mini-kv CLI；默认测试和默认命令不启动外部依赖，状态明确为 skipped。

## 实际输入

- Java：从远端对齐提交 `894deeb01837647af6dc125159ba5bc354f2cbb5` 创建临时 detached worktree，以 `mvnw.cmd -DskipTests package` 生成 Spring Boot jar。正在进行的 Java v1848 工作树未被读取或修改。
- mini-kv：执行保留的真实 `D:\C\mini-kv\cmake-build-v1621\minikv_cli.exe`，MinGW runtime 仅注入子进程 PATH。该二进制以 SHA-256 标识，不把当前 mini-kv 仓库 HEAD 冒充为它的构建 commit。
- 命令门：`INTEGRATION_LIVE=1`、jar/CLI 路径、Java commit 和输出目录。未开门时不启动依赖；开门但缺路径时失败闭合。

## 实际处理

1. Java 以 `prod` profile、独立 H2 内存库、关闭业务调度器和随机 loopback 端口启动。
2. Node 轮询 `/actuator/health` 至 UP，再读取 `/api/v1/ops/evidence`，校验 schema、profile、`readOnly=true` 与 `executionAllowed=false`。
3. Node 对 `/api/v1/failed-events/0/replay` 发出不带身份头和请求体的负向 POST，确认返回 4xx。
4. Node 通过 loopback Actuator shutdown 关闭 Spring context，并验证启动器 PID 退出、JVM application PID 不存活、端口关闭；使用强杀兜底将使 C1 失败。
5. mini-kv 子进程只接收 `SMOKEJSON`、`CHECKJSON GET capstone:probe`、`QUIT`。Node 从本次 stdout 解析两份 JSON，验证无写、无 admin、无 restore、无 WAL 写入。
6. route census、command census、Java 拒写和 mini-kv CHECKJSON 合成 C3；C1-C3 再由 `npm run readiness:cross` 写出 JSON 与 Markdown。

## 输出与结论

归档报告位于 `d/2191/evidence/cross-project-readiness/`，完整命令输出位于 `d/2191/evidence/readiness-cross-live-transcript.txt`。机器报告顶层应为：

- `live_requested=true`
- `overall_status=pass`
- `read_only=true`
- `execution_allowed=false`
- C1、C2、C3 以及十个子检查全部 pass

Java jar 与 mini-kv executable 的 SHA-256、fresh stdout SHA-256、时间、状态码、schema 字段和清理结果都在 JSON companion 中；Markdown 保留易读总表，不复制 mini-kv 四十多万字节 stdout。

## 验证策略

本版先通过 4 个 focused 文件、9 个测试，覆盖只读 client census、Java 子进程生命周期、mini-kv stdin/stdout、默认 skip、配置 fail 和完整聚合 pass。最终收口还必须运行 typecheck、完整 Vitest、coverage、build、lint、安全扫描、renderer/source-size/archive census。真实联合运行不进入默认 CI，避免 CI 因没有兄弟仓库而出现假失败或伪绿色。

## 边界与停点

本版没有修改 Java、mini-kv 或 aiproj 源码，没有启动 mini-kv server，没有授予生产写、部署、回滚、凭据或 managed-audit 权限。H2 只存在于本次 JVM 内存中，Flyway 启动迁移不接触生产数据库。由于外部 program-end review 尚未给出 PASS，成熟度仍保持 `single-project validation + cross-project contract alignment`，不得进入 Stage 2。

本版没有 HTML、Dashboard 或新的可视页面；C4 明确要求的最终载体是 JSON 与 Markdown。因此不制造无信息量截图，`图片/` 不创建，理由记录在此说明中。
