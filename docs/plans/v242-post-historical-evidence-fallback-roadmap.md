# Node v242 衍生计划：CI-stable sandbox command verification 后续阶段

来源版本：Node v242 `historical evidence fallback for GitHub CI`。

计划状态：当前唯一有效全局计划。上一份 `docs/plans/v237-post-readiness-gate-roadmap.md` 已覆盖 Node v238-v242、Java v93-v97、mini-kv v102-v106，并已收口；后续不再向旧计划追加重合版本。v242 已把 v223/v224 历史链路所需 Java v81 / mini-kv v90 证据固化到 Node 仓库内 fixtures，GitHub CI 不再依赖开发机 `D:/javaproj` 或 `D:/C/mini-kv` 路径。Node v243 已完成 command package verification report。Java v98 + mini-kv v107 已完成只读 echo / non-participation receipt，Node v244 已完成 upstream echo verification。当前下一步是 Node v245 sandbox connection precheck packet，仍不打开真实 managed audit connection。

## 当前对齐状态

```text
Node v241：
- manual sandbox connection dry-run command package 已完成
- commandCount=6
- dryRunOnly=true
- disabledByDefault=true
- opensConnection=false
- mutatesState=false
- credentialValueIncluded=false

Node v242：
- historical evidence fallback 已完成
- v223/v224 旧链路使用 Node 仓库内 fixtures
- GitHub CI 不再依赖 Java / mini-kv sibling 工作区历史路径
- v224 planState 保持 sandbox-adapter-dry-run-plan-ready

Java v97：
- builder chain refactor 已完成
- 作为 Node v241 的质量上下文，不是连接授权

mini-kv v106：
- command dispatch table 已完成
- 作为 Node v241 的质量上下文，不是 audit storage 授权

Node v243：
- manual sandbox dry-run command package verification report 已完成
- 消费 Node v241 command package 与 Node v242 historical fixture fallback
- 验证 command shape、disabled-by-default、no credential value、no connection、no mutation、route registration 与 archive evidence
- 不修改 Java / mini-kv，不打开 managed audit connection

Java v98 + mini-kv v107：
- 已推荐并行完成
- Java v98 只读回显 Node v241 command package 字段与 no-ledger/no-SQL/no-credential/no-connection 边界
- mini-kv v107 只读证明 no-start/no-write/no-credential/non-storage-backend 边界

Node v244：
- manual sandbox dry-run command upstream echo verification 已完成
- 只读消费 Node v243 + Java v98 + mini-kv v107
- 验证 commandCount=6、disabledByDefault、dryRunOnly、credential/connection/write/auto-start 边界三方一致
- 不打开 managed audit connection，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv
```

## 推荐执行顺序

```text
1. Node v243：manual sandbox dry-run command package verification report。已完成。
   消费 Node v241 command package 与 Node v242 CI-stable historical fixture fallback，验证 command shape、disabled-by-default、no credential value、no connection、no mutation、route registration 与 archive evidence。
   这是 Node 自检版本，不要求 Java / mini-kv 新版本完成。

2. 推荐并行：Java v98 + mini-kv v107。已完成。
   - Java v98：manual sandbox dry-run command echo receipt，只读回显 Node v241 command package 的 commandCount、credential handle、schema rehearsal id、rollback path、timeout / abort marker；不写 ledger、不执行 SQL、不打开 managed audit connection。
   - mini-kv v107：manual sandbox dry-run command non-participation receipt，只读证明 dry-run command package 不会让 mini-kv 自动启动、写 storage、读 credential、执行 restore 或成为 audit storage backend。
   - 这两个版本可以并行推进，因为它们只读消费 Node command package，不互相依赖，也不做真实连接。

3. Node v244：manual sandbox dry-run command upstream echo verification。已完成。
   只读消费 Java v98 + mini-kv v107 回执，验证三方对 command package 的字段、digest、禁用状态和 no-write / no-start 边界一致。
   如果两边未完成或证据不匹配，Node v244 必须停止，不得降级为“部分 ready”。

4. Node v245：sandbox connection precheck packet。当前下一步。
   在 v244 三方 echo 通过后，生成下一步真实 sandbox connection 前的 precheck packet：owner approval artifact、credential handle review、schema migration rehearsal id、operator window、rollback path、abort marker、timeout policy。
   仍不连接 managed audit，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv。
```

## 显式质量优化项

```text
Node：
- v243 不新增 summary 流水账；它必须形成 command package verification report 小闭环。
- v243 继续使用 `registerAuditJsonMarkdownRoute` 路由注册表，不把 JSON/Markdown 注册样板塞回 auditRoutes.ts。
- v243 必须验证 v242 historical fixtures 在 CI 中可复现；不允许重新引入 `D:/javaproj` 或 `D:/C/mini-kv` 作为测试必需路径。
- v244 消费 Java / mini-kv 时，只读核对 tag、归档、sample/fixture、关键字段，不构建、不启动、不测试、不修改上游项目。

Java：
- v98 优先做只读 echo receipt，不继续膨胀 OpsEvidenceService；如字段增多，继续用 builder/helper 拆分。
- v98 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- v107 优先做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- v107 不执行 LOAD / COMPACT / RESTORE / 写命令，不成为 managed audit storage backend。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v98 / mini-kv v107 未完成时，Node v244 必须停止。当前已完成。
- Node v244 未完成或 upstream echo verification 不一致时，Node v245 必须停止。

## 一句话结论

```text
v237 计划已收口；Node v243-v244 已完成 command package 自检与 upstream echo verification；当前下一步是 Node v245 sandbox connection precheck packet，仍不打开真实 managed audit connection。
```
