# Node v86 衍生计划：生产级发布门禁与运行治理

## 来源版本

```text
本计划由 Node v86 衍生。
Node v86 已新增 scenario release evidence index，
可汇总四类 scenario evidence 的 endpoint、digest、valid、readOnly、executionAllowed 边界，
并生成 releaseEvidenceDigest。
```

## 总规则

后续目标从“作品级成熟”上调为“逐步靠近生产级”。

```text
一版一个可验证小闭环。
不能只做文档、按钮、字段等过小改动。
优先补 CI / release gate / 权限安全 / 持久化审计 / 部署配置 / 观测告警 / 回滚证据。
仍然默认只读，真实上游执行必须显式授权、可审计、可回滚。
```

## 计划边界

本计划继续只推进 Node 项目，不修改 Java / mini-kv。

Java / mini-kv 只做只读完成度核对。若需要它们提供新能力，先暂停并说明具体版本建议。

## 下一组版本

### Node v87：Release evidence readiness gate

目标：

```text
基于 v86 release evidence index 新增只读 readiness gate，
把 evidence 是否完整、digest 是否存在、execution 是否仍被禁止转成 release gate 结果。
```

本版要落地：

- 新增 release evidence readiness gate service。
- 新增 JSON / Markdown endpoint。
- gate 输出 `readyForReleaseEvidenceArchive`、blockers、warnings、nextActions。
- gate 必须消费 v86 index，不重复手写 evidence 结论。
- 补测试、safe HTTP smoke、归档、代码讲解。

实施收口：

```text
Node v87 已完成。
- 已新增 release evidence readiness gate service。
- 已新增 JSON / Markdown endpoint。
- gate 已消费 v86 release evidence index。
- 已输出 readyForReleaseEvidenceArchive、blockers、warnings、nextActions。
- 当前 smoke 结果 blockerCount=0、warningCount=2、executionAllowed=false。
- 已归档 smoke 证据与 Markdown 截图到 a/87/。
- 未接真实 CI，未修改 Java / mini-kv，未新增真实 execution endpoint。
```

本版不做：

- 不接真实 CI。
- 不做数据库持久化。
- 不修改 Java / mini-kv。
- 不把 readiness gate 当成真实执行许可。

### Node v88：CI evidence command profile

目标：

```text
新增面向 CI 的只读 evidence command profile，
把 typecheck、test、build、safe smoke、release evidence gate 的推荐命令和环境变量标准化。
```

本版要落地：

- 新增 CI evidence profile service。
- 输出可机器读取的 JSON 和可人工阅读的 Markdown。
- 明确安全环境变量：`UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`。
- 标注哪些命令可在 CI 跑，哪些命令必须人工授权。
- 补测试、safe HTTP smoke、归档、代码讲解。

本版不做：

- 不创建 GitHub Actions 工作流。
- 不实际推送 CI secret。
- 不启动 Java / mini-kv。

### Node v89：Deployment safety profile

目标：

```text
新增部署安全画像，
检查当前 Node 运行配置是否适合进入生产级演示环境。
```

本版要落地：

- 新增 deployment safety profile service。
- 汇总 probes/actions 开关、host/port、日志级别、上游 URL、fixture 路径、rate limit。
- 输出 blockers / warnings / recommendations。
- 补 JSON / Markdown endpoint、测试、safe HTTP smoke、归档、代码讲解。

本版不做：

- 不真实部署。
- 不修改服务器环境。
- 不写入密钥。
- 不修改 Java / mini-kv。

## 推荐执行顺序

```text
1. Node v87：Release evidence readiness gate
2. Node v88：CI evidence command profile
3. Node v89：Deployment safety profile
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay POST。
- 需要 Node 执行 mini-kv `SET` / `DEL` / `EXPIRE`。
- 需要修改 Java / mini-kv 才能完成 Node 版本。
- 需要写入真实 CI secret、部署凭据或生产环境变量。
- 需要把 evidence / readiness 结果当成真实执行许可。
- 对推进版本有疑惑。

## 一句话结论

```text
v87-v89 开始从“证据链完整”转向“发布门禁、CI 标准化、部署安全画像”，这是靠近生产级的下一段主线。
```
