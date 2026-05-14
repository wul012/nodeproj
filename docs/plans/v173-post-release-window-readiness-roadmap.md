# Node v173 衍生全局计划：从发布窗口 readiness packet 进入生产发布 dry-run 收口

来源版本：Node v173 `release window readiness packet`。

计划状态：当前唯一有效全局计划；上一份 `docs/plans/v169-post-production-environment-preflight-roadmap.md` 已完成 Node v173 并收口，不再继续追加新版本。

## 计划接力规则

- 每次推进前先读取最新 plan，并判断当前步骤属于哪个项目。
- Codex 默认负责 Node；当下一步是 Java / mini-kv 时，只读核对状态，用户明确要求推进时再交叉开发。
- 能并行的 Java / mini-kv 同阶段版本必须明确写成“推荐并行”。
- Node 汇总版必须写清依赖前置版本全部完成。
- 推荐执行顺序不使用“或/任选”。
- 每个版本必须形成一个合理小闭环，不只做零散字段或单纯流水账 summary。
- 新版本运行截图和解释默认写入 `c/<版本>/`。
- 代码讲解写入 `代码讲解记录_生产雏形阶段/`。
- 写入 Java / mini-kv 版本号前必须只读核对对应仓库最新 tag。
- 需要真实生产密钥、生产数据库、生产 IdP、真实发布、真实回滚、真实恢复权限时暂停。

## 当前状态

已完成：

```text
Node v171：deployment evidence intake gate
Node v172：deployment evidence verification
Java v61 + mini-kv v70：已推荐并行完成，分别提供 rollback approval record fixture 与 restore drill evidence fixture
Node v173：release window readiness packet
Node v174：production release dry-run envelope
Java v62 + mini-kv v71：已推荐并行完成，分别提供 release handoff checklist fixture 与 restore handoff checklist fixture
Node v175：release handoff readiness review
Node v176：CI evidence hardening packet
```

当前仍不授权生产发布或回滚：

```text
UPSTREAM_ACTIONS_ENABLED=false
Node 只做 readiness / dry-run / evidence aggregation / checklist rendering
Java rollback SQL 仍需要人工审批
mini-kv restore 仍不是 Java order authority
```

## 下一阶段方向

下一阶段目标是把“人工发布窗口 review 包”继续推进到“生产发布前 dry-run envelope”：

```text
release window packet -> dry-run release envelope -> handoff checklist -> CI evidence hardening
```

这个阶段仍然不做真实发布，而是补齐生产级项目前必须有的 envelope、handoff、CI evidence。

## 当前推荐执行顺序

```text
1. Node v174：production release dry-run envelope，已完成；消费 Node v173 packet，形成发布前 dry-run envelope，不执行 release、deployment、rollback、restore。
2. 推荐并行：Java v62 + mini-kv v71。
   Java v62 做 release handoff checklist fixture，记录发布执行前人工 checklist，不执行部署或回滚。
   mini-kv v71 做 restore handoff checklist fixture，记录恢复执行前人工 checklist，不执行 LOAD/COMPACT/SETNXEX。
3. Node v175：release handoff readiness review，已完成；消费 Java v62、mini-kv v71 和 Node v174，形成 handoff review，不授权真实操作。
4. Node v176：CI evidence hardening packet，已完成；消费 Node v175 和 CI command profile，收敛 typecheck/test/build/smoke/screenshot 的 CI evidence 指引。
```

## 并行依赖说明

```text
Node v174 只消费 Node v173，不依赖 Java v62 / mini-kv v71，当前已完成。
Java v62 与 mini-kv v71 推荐并行，因为两者都只补人工 handoff checklist fixture，不互相调用。
Node v175 已等待并消费 Java v62 + mini-kv v71 + Node v174。
Node v176 已等待并消费 Node v175；本计划到 v176 收口，后续另起新计划，不在本文件继续叠重合版本。
```

## Node v174：production release dry-run envelope

依赖关系：必须等待 Node v173 完成后推进。

目标：

```text
把 v173 release window readiness packet 包装成生产发布前 dry-run envelope，明确所有真实执行仍然关闭。
```

本版本要落地：

- 引用 Node v173 packet digest。
- 输出 JSON/Markdown dry-run envelope。
- 明确 release / deployment / rollback / restore / SQL / secret / production database 全部不执行。
- 写入 envelope steps、operator confirmations、pause conditions。
- 轻量复用现有 release report shared helper，不做大重构。

## Java v62：release handoff checklist fixture

并行关系：推荐与 mini-kv v71 并行推进。

目标：

```text
补 Java 发布前人工 handoff checklist fixture，供 Node v175 消费。
```

本版本要落地：

- 记录 release operator、rollback approver、artifact target、migration direction。
- 记录 secret source confirmation，不记录 secret value。
- 明确 fixture 不执行部署、回滚或 SQL。

## mini-kv v71：restore handoff checklist fixture

并行关系：推荐与 Java v62 并行推进。

目标：

```text
补 mini-kv 恢复前人工 handoff checklist fixture，供 Node v175 消费。
```

本版本要落地：

- 记录 restore operator、artifact digest target、snapshot/WAL review placeholder。
- 记录 CHECKJSON 风险确认。
- 明确 fixture 不执行 LOAD、COMPACT、SETNXEX 或 restore。

## Node v175：release handoff readiness review

依赖关系：必须等待 Java v62、mini-kv v71、Node v174 都完成后推进。

目标：

```text
形成 release handoff readiness review，供人工确认 handoff checklist。
```

本版本要落地：

- 引用 Node v174 dry-run envelope。
- 引用 Java v62 release handoff checklist fixture。
- 引用 mini-kv v71 restore handoff checklist fixture。
- 输出 JSON/Markdown review。
- 不授权真实发布、回滚或恢复。

## Node v176：CI evidence hardening packet

依赖关系：必须等待 Node v175 完成后推进。当前已完成。

目标：

```text
把当前 typecheck/test/build/smoke/screenshot evidence 流程收敛成 CI evidence hardening packet。
```

本版本要落地：

- 记录 typecheck、target test、full test、build、HTTP smoke、Chrome screenshot 的 expected evidence。
- 记录 GitHub Actions / local run 的差异和失败处理边界。
- 明确不替代真实 CI runner，不执行上游项目。

## 本计划收口

```text
Node v174-v176、Java v62、mini-kv v71 均已完成。
本计划到 CI evidence hardening packet 收口。
后续从 docs/plans/v176-post-ci-evidence-hardening-roadmap.md 接续，不继续在本文件追加重合版本。
```

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
v173 已完成发布窗口人工 review 包；下一阶段继续靠近生产级，但先补 dry-run envelope、handoff checklist 和 CI evidence hardening，不直接打开真实生产执行。
```
