# Node v266 衍生计划：credential resolver fake shell 归档后续阶段

来源版本：Node v266 `credential resolver fake-shell archive verification`。

计划状态：下一阶段当前唯一有效全局计划。上一份 `docs/plans/v263-post-disabled-resolver-echo-roadmap.md` 已完成 Node v264、推荐并行 Java v107 + mini-kv v116、Java v108/v109 优化上下文、Node v265、Node v266，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v264：
- credential resolver test-only shell contract 已完成
- 定义 fake in-memory resolver shell 的 handle-only request、fake-only response、failure mapping、guard conditions 和 no-side-effect probe
- 不读取 credential value，不解析 raw endpoint URL，不实例化真实 resolver client / secret provider，不发 external request

Java v107 + mini-kv v116：
- 已推荐并行完成
- Java v107 只读回显 Node v264 shell contract
- mini-kv v116 只读证明 non-participation，不成为 managed audit storage backend

Java v108 + v109：
- 已作为优化批完成
- v108 收敛 echo marker support 重复样板
- v109 拆分 release approval rehearsal response records
- 作为 Node 后续可读性 / 维护性上下文，不作为生产连接许可

Node v265：
- test-only resolver shell upstream echo verification 已完成
- 验证 Node v264、Java v107、mini-kv v116 的 request / response / failure mapping / guard / fake probe / no-side-effect 边界一致
- Java v109 仅作为 optimizationContext

Node v266：
- credential resolver fake-shell archive verification 已完成
- 归档验证 v264/v265 HTML、截图、解释、代码讲解、route response 和计划片段
- 本阶段没有打开真实 credential resolver、secret provider、raw endpoint、external request 或 managed audit connection
```

## 推荐执行顺序

```text
1. 推荐并行：Java v110 + mini-kv v117。
   - Java v110：credential resolver fake-shell archive echo receipt，只读引用 Node v266，证明 Java 侧仍不写 ledger、不执行 SQL、不读取 credential value、不打开 managed audit connection。
   - mini-kv v117：credential resolver fake-shell archive non-participation receipt，只读引用 Node v266，证明 mini-kv 仍不参与 resolver、secret provider、credential value、raw endpoint、external request、storage write、LOAD/COMPACT/RESTORE/SETNXEX。
   - 两者可以并行，因为都只读消费 Node v266，不互相依赖，也不做真实连接。

2. Node v267：credential resolver fake-shell archive upstream echo verification。
   - 仅在 Java v110 + mini-kv v117 完成后推进。
   - 消费两边对 Node v266 archive verification 的 echo / non-participation，验证归档证据链被上游一致理解。
   - 不重新执行 fake resolver shell，不打开真实 resolver client、secret provider 或 managed audit connection。

3. Node v268：credential resolver production readiness decision gate。
   - 消费 Node v267，做下一阶段决策门禁。
   - 输出是否允许进入“真实 sandbox credential resolver pre-implementation plan”的条件清单。
   - 默认结论仍应是 blocked，除非有新计划明确 credential handle、endpoint handle、secret provider stub、operator approval 和 rollback boundary。
```

## 显式质量优化项

```text
Node：
- 继续复用 `historicalEvidenceReportUtils.ts` 和现有 archive verification 模式，不复制文件读取 / digest / snippet helper。
- 新增 audit route 继续走 `auditJsonMarkdownRoutes` + `auditJsonMarkdownRoute`。
- v267 若新增 upstream echo verification，从一开始拆出 types / renderer / service。
- v268 是决策门禁，不应膨胀成真实 resolver 实现。

Java：
- v110 只做 echo receipt，不把字段堆回 `OpsEvidenceService`。
- 继续沿用 v108/v109 的拆分成果，新增 record 或 builder 时保持小文件边界。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- v117 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
- 继续复用 credential resolver receipt 模块，不扩大 command dispatch if-chain。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider 或真实 credential resolver client。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v110 / mini-kv v117 未完成时，Node v267 必须停止。
- 任一版本从 fake-shell archive evidence 变成真实 secret provider、credential value reader 或 external endpoint request，必须暂停并另起计划。

## 一句话结论

```text
v266 已把 credential resolver fake-shell 的 Node 归档证据收口；下一阶段应先让 Java v110 + mini-kv v117 并行只读回显这份归档，再由 Node v267 做三方归档 echo verification，仍不得进入真实 resolver 实现。
```
