# Node v176 衍生全局计划：从 CI evidence hardening 进入生产发布前身份与审计收束

来源版本：Node v176 `CI evidence hardening packet`。

计划状态：当前唯一有效全局计划；上一份 `docs/plans/v173-post-release-window-readiness-roadmap.md` 已完成 Node v174-v176、Java v62、mini-kv v71 并收口，不再继续追加重合版本。

## 计划接力规则

- 每次推进前先读取最新 plan，并判断当前步骤属于哪个项目。
- Codex 默认负责 Node；当下一步是 Java / mini-kv 时，只读核对状态，用户明确要求推进时再交叉开发。
- 能并行的 Java / mini-kv 同阶段版本必须明确写成“推荐并行”。
- 推荐执行顺序不使用“或/任选”。
- 每个版本必须形成一个合理小闭环，不只做零散字段或单纯流水账 summary。
- 新版本运行截图和解释默认写入 `c/<版本>/`。
- 代码讲解写入 `代码讲解记录_生产雏形阶段/`。
- 需要真实生产密钥、生产数据库、生产 IdP、真实发布、真实回滚、真实恢复权限时暂停。

## 当前状态

已完成：

```text
Node v175：release handoff readiness review
Node v176：CI evidence hardening packet
Node v177：CI operator identity evidence packet
```

当前仍不授权生产发布或回滚：

```text
UPSTREAM_ACTIONS_ENABLED=false
CI evidence hardening 只证明验证流程，不代表生产发布批准
Node 不启动 Java / mini-kv
Java rollback SQL 仍需要人工审批
mini-kv restore 仍不是 Java order authority
```

## 下一阶段方向

下一阶段目标是把生产发布前的“验证证据”推进到“身份、审计、证据保留”的最小闭环：

```text
CI evidence hardening -> operator identity evidence -> audit retention proof -> release evidence retention gate
```

这一阶段仍然不做真实发布。重点是让生产前证据能回答三个问题：

```text
谁触发了验证？
验证证据保存在哪里？
失败时怎么阻断下一步？
```

## 当前推荐执行顺序

```text
1. Node v177：CI operator identity evidence packet，已完成；消费 v176，固化 CI / local smoke 的 operator identity、role、auth-source 证据，不接真实 IdP。
2. 推荐并行：Java v63 + mini-kv v72，下一步优先推进。
   Java v63 做 release audit retention fixture，记录 release evidence 在 Java 侧的只读保留字段，不执行部署/回滚/SQL。
   mini-kv v72 做 restore evidence retention fixture，记录 restore checklist / artifact digest / WAL-Snapshot evidence 的只读保留字段，不执行 LOAD/COMPACT/SETNXEX。
3. Node v178：cross-project evidence retention gate，等待 Java v63 + mini-kv v72 + Node v177 完成后再做；汇总三方 retention evidence，不授权真实操作。
4. Node v179：production release pre-approval packet，等待 Node v178 完成后再做；只生成 pre-approval packet，不做 approval decision，不发布。
```

## 并行依赖说明

```text
Node v177 只消费 Node v176，不依赖 Java v63 / mini-kv v72。
Java v63 与 mini-kv v72 推荐并行，因为两者都只补证据保留 fixture，不互相调用。
Node v178 必须等待 Java v63 + mini-kv v72 + Node v177 完成后再做。
Node v179 必须等待 Node v178 完成后再做，避免提前做审批样式而缺少 retention 证据。
```

## Node v177：CI operator identity evidence packet

依赖关系：必须等待 Node v176 完成后推进。

完成状态：已完成并由 Node v177 tag 固化。

目标：

```text
把 CI / local smoke 的 operator identity、role、auth-source 证据固化成只读 packet。
```

本版本要落地：

- 已引用 Node v176 packet digest。
- 已记录 local smoke header identity：operator id、roles、auth source。
- 已记录 GitHub Actions 的 actor / workflow/run/sha identity 期望字段，但不读取生产 secret。
- 已输出 JSON/Markdown packet：`/api/v1/ci/operator-identity-evidence-packet`。
- 不接真实 IdP，不启用真实认证。

## Java v63：release audit retention fixture

并行关系：推荐与 mini-kv v72 并行推进。

目标：

```text
补 Java 发布证据保留 fixture，供 Node v178 消费。
```

本版本要落地：

- 记录 release evidence retention id、operator placeholder、artifact target、retention days。
- 记录 audit export / evidence endpoint 的只读字段。
- 明确不执行 deployment、rollback、SQL，不读取 secret value。

## mini-kv v72：restore evidence retention fixture

并行关系：推荐与 Java v63 并行推进。

目标：

```text
补 mini-kv 恢复证据保留 fixture，供 Node v178 消费。
```

本版本要落地：

- 记录 restore checklist retention id、artifact digest placeholder、snapshot/WAL review retention。
- 记录 CHECKJSON 风险证据保留字段。
- 明确不执行 LOAD、COMPACT、SETNXEX 或 restore。

## Node v178：cross-project evidence retention gate

依赖关系：必须等待 Java v63、mini-kv v72、Node v177 都完成后推进。

目标：

```text
形成三项目 release/restore evidence retention gate。
```

本版本要落地：

- 引用 Node v177 identity evidence。
- 引用 Java v63 release audit retention fixture。
- 引用 mini-kv v72 restore evidence retention fixture。
- 输出 JSON/Markdown gate。
- 不授权真实发布、回滚或恢复。

## Node v179：production release pre-approval packet

依赖关系：必须等待 Node v178 完成后推进。

目标：

```text
形成生产发布前 pre-approval packet，但不生成 approval decision。
```

本版本要落地：

- 引用 Node v178 retention gate。
- 输出 pre-approval checklist、missing evidence、pause conditions。
- 明确不创建真实 approval，不执行 release/deployment/rollback/restore。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java deployment、Java rollback SQL、mini-kv LOAD/COMPACT/SETNXEX、或任何真实发布/回滚/恢复命令。
- 需要读取 secret value，而不是只记录 secret source。
- 需要把 mini-kv 写入订单核心一致性链路。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v176 已把 CI evidence hardening 收口；下一阶段继续靠近生产级，但先补身份证据、审计保留和跨项目 retention gate，不直接打开真实生产执行。
```
