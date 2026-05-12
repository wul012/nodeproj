# Node v89 衍生计划：CI 落地、持久化审计与回滚证据

## 来源版本

```text
本计划由 Node v89 衍生。
Node v87-v89 已完成 release evidence readiness gate、CI evidence command profile、deployment safety profile。
当前方向已从证据链展示推进到生产级发布门禁与运行治理。
```

## 总规则

```text
继续只推进 Node 项目。
一版一个可验证小闭环，不能只做按钮/文档/字段。
优先补真实工程能力：CI 工作流、持久化审计、回滚证据、配置治理、可观测性。
所有真实上游执行能力默认关闭，任何动作开关都必须显式授权、可审计、可回滚。
```

## 下一组版本

### Node v90：GitHub Actions evidence workflow draft

目标：

```text
基于 v88 CI evidence command profile 新增 GitHub Actions workflow 草案。
```

本版要落地：

- 新增 `.github/workflows/node-evidence.yml`。
- workflow 只运行 Node 的 install/typecheck/test/build。
- 明确 safe smoke 使用 `UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`。
- 不写 secret，不调用 Java / mini-kv。
- 补文档、归档、代码讲解。

实施收口：

```text
Node v90 已完成。
- 已新增 .github/workflows/node-evidence.yml。
- workflow 已包含 npm ci、typecheck、test、build。
- 已加入 safe smoke，环境变量固定 UPSTREAM_PROBES_ENABLED=false、UPSTREAM_ACTIONS_ENABLED=false。
- 已检查 health 和 release evidence readiness gate，要求 executionAllowed=false。
- 已补 workflow 安全边界测试。
- 已归档 smoke 证据与 workflow 截图到 a/90/。
- 未写 secret，未真实部署，未调用 Java / mini-kv。
```

本版不做：

- 不配置真实部署。
- 不写任何 secret。
- 不打开 upstream actions。

### Node v91：Persistent audit store adapter

目标：

```text
新增可替换的审计持久化适配层，为后续从内存审计迁移到文件/数据库做准备。
```

本版要落地：

- 新增 audit store interface。
- 保持默认 in-memory 行为不变。
- 新增 file-backed prototype 或 adapter skeleton。
- 补测试证明现有审计 API 不回退。

实施收口：

```text
Node v91 已完成。
- 已新增 AuditStore interface。
- 已新增 InMemoryAuditStore，默认运行时行为保持不变。
- 已新增 FileBackedAuditStore JSONL prototype。
- AuditLog 已改为通过 store adapter 读写。
- 已补测试验证默认内存行为和 file-backed 恢复事件。
- 已归档 smoke 证据与 audit summary 截图到 a/91/。
- 未接真实数据库，未迁移历史数据，未修改 Java / mini-kv。
```

本版不做：

- 不接真实数据库。
- 不迁移历史数据。
- 不改 Java / mini-kv。

### Node v92：Rollback evidence runbook endpoint

目标：

```text
新增只读 rollback evidence runbook endpoint，
把部署前检查、CI evidence、release gate、恢复步骤整理成可归档报告。
```

本版要落地：

- 新增 rollback runbook service。
- 新增 JSON / Markdown endpoint。
- 汇总 v87-v89 的 evidence endpoint。
- 输出 rollback steps、verification steps、stop conditions。
- 补测试、safe HTTP smoke、归档、代码讲解。

实施收口：

```text
Node v92 已完成。
- 已新增 rollback evidence runbook service。
- 已新增 JSON / Markdown endpoint。
- 已汇总 v87-v89 的 release gate、CI profile、deployment safety profile。
- 已输出 5 个 rollback steps、4 个 verification steps、5 个 stop conditions。
- 当前 smoke 结果 readyForRollbackEvidenceArchive=true、executionAllowed=false、blockerCount=0。
- 已归档 smoke 证据与 Markdown 截图到 a/92/。
- 未真实回滚，未操作服务器，未执行 Java / mini-kv 写操作。
```

本版不做：

- 不真实回滚。
- 不操作服务器。
- 不执行 Java / mini-kv 写操作。

## 推荐执行顺序

```text
1. Node v90：GitHub Actions evidence workflow draft
2. Node v91：Persistent audit store adapter
3. Node v92：Rollback evidence runbook endpoint
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要写入真实 secret 或部署凭据。
- 需要真实部署、真实回滚或修改服务器环境。
- 需要 Node 调用 Java replay POST。
- 需要 Node 执行 mini-kv `SET` / `DEL` / `EXPIRE`。
- 需要修改 Java / mini-kv 才能完成 Node 版本。
- 对推进版本有疑惑。

## 一句话结论

```text
v90-v92 应从“生产级检查报告”继续推进到“CI 可执行、审计可持久化、回滚可归档”的硬工程能力。
```
