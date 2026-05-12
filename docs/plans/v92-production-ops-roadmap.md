# Node v92 衍生计划：生产运维闭环深化

## 来源版本

```text
本计划由 Node v92 衍生。
Node v90-v92 已完成 CI evidence workflow draft、audit store adapter、rollback evidence runbook。
当前 Node 已从“生产级检查报告”推进到“CI 可执行、审计可替换、回滚可归档”的阶段。
```

## 关于 Java / mini-kv 节奏

最近连续推进 Node 是合理的，因为当前瓶颈在控制面生产化。

但不能长期只做 Node。完成 v93-v95 或更早遇到需要上游支撑时，应回头推进：

```text
Java：只读运维健康、失败事件审计、回放状态解释增强
mini-kv：INFO/诊断稳定性、只读观测字段、崩溃恢复/快照证据
```

## 下一组版本

### Node v93：Workflow evidence verification endpoint

目标：

```text
读取并验证 .github/workflows/node-evidence.yml，
把 workflow 是否仍满足安全边界变成 JSON / Markdown evidence。
```

本版要落地：

- 新增 workflow evidence verification service。
- 检查 npm ci/typecheck/test/build/safe smoke 是否存在。
- 检查 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`。
- 检查没有 `secrets.`、kubectl、docker push、scp。
- 补 endpoint、测试、safe HTTP smoke、归档、代码讲解。

实施收口：

```text
已完成。
endpoint: /api/v1/ci/workflow-evidence-verification
archive: a/93/
code notes: 代码讲解记录/97-workflow-evidence-verification-v93.md
tag: v93
```

### Node v94：Audit store runtime profile

目标：

```text
新增 audit store runtime profile endpoint，
说明当前运行时使用 in-memory store，file-backed store 仍是 prototype。
```

本版要落地：

- 新增 audit store profile service。
- 输出默认 store、可替换 store、持久化限制、迁移建议。
- 补 endpoint、测试、safe HTTP smoke、归档、代码讲解。

实施收口：

```text
已完成。
endpoint: /api/v1/audit/store-profile
archive: a/94/
code notes: 代码讲解记录/98-audit-store-runtime-profile-v94.md
tag: v94
```

### Node v95：Production readiness summary index

目标：

```text
新增生产化 readiness summary index，
统一汇总 release evidence、CI workflow、audit store、deployment safety、rollback runbook。
```

本版要落地：

- 新增 production readiness summary service。
- 汇总 v87-v94 的关键 endpoint、ready 状态、blockers/warnings。
- 输出 JSON / Markdown。
- 补测试、safe HTTP smoke、归档、代码讲解。

## 推荐执行顺序

```text
1. Node v93：Workflow evidence verification endpoint
2. Node v94：Audit store runtime profile
3. Node v95：Production readiness summary index
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要写入真实 secret 或部署凭据。
- 需要真实部署、真实回滚或修改服务器环境。
- 需要 Node 调用 Java replay POST。
- 需要 Node 执行 mini-kv `SET` / `DEL` / `EXPIRE`。
- 需要修改 Java / mini-kv 才能完成 Node 版本。
- Node 连续生产化版本已经明显依赖 Java / mini-kv 新能力。
- 对推进版本有疑惑。

## 一句话结论

```text
v93-v95 可以继续 Node，但要开始为回到 Java / mini-kv 做铺垫：Node 负责验证与索引，上游项目随后补可观测和稳定性证据。
```
