# Node v169 衍生全局计划：从生产环境前置 checklist 转入真实部署证据收敛

来源版本：Node v169 `post-v166 readiness summary`。

计划状态：当前唯一有效全局计划；上一份 `docs/plans/v166-post-rollback-window-roadmap.md` 已完成 Node v169 并收口，不再继续追加新版本。

## 计划接力规则

- 每次推进前先读取最新 plan，并判断当前步骤属于哪个项目。
- Codex 默认负责 Node；当下一步是 Java / mini-kv 时，先做只读状态核对，用户明确要求推进时再交叉开发。
- 能并行的 Java / mini-kv 同阶段版本必须明确写成“推荐并行”。
- Node 汇总版必须写清依赖前置版本全部完成。
- 推荐执行顺序中不使用“或/任选”。
- 每个版本必须形成一个合理小闭环，不只做零散字段或单纯流水账 summary。
- 新版本运行截图和解释默认写入 `c/<版本>/`。
- 写入 Java / mini-kv 版本号前必须只读核对对应仓库最新 tag。
- 需要真实生产密钥、生产数据库、生产 IdP、真实回滚执行权限时暂停。

## 当前状态

已完成：

```text
Node v167：rollback execution preflight contract
Node v168：production environment preflight checklist
Node v169：post-v166 readiness summary
Node v170：report shared helpers hardening，作为维护重构版插入，消化 v165-v169 报告重复度，不消费 Java v60 / mini-kv v69
Java v60 + mini-kv v69：已推荐并行完成，Node v171 可以消费两边部署/摘要证据
Node v171：deployment evidence intake gate
Node v172：deployment evidence verification
```

当前仍不授权生产回滚：

```text
UPSTREAM_ACTIONS_ENABLED=false
Node 只做 readiness / dry-run / evidence aggregation / checklist rendering
Java rollback SQL 仍需要人工审批
mini-kv restore 仍不是 Java order authority
```

## 下一阶段方向

下一阶段不要直接做真实生产执行，先把“真实部署证据”继续前移：

```text
deployment runbook / artifact release digest / production window evidence packet
```

这个方向能同时锻炼：

```text
Java：生产部署 runbook 只读 contract、回滚审批记录字段、数据库迁移方向证据
mini-kv：release artifact digest package、WAL/Snapshot restore drill evidence、fixture digest 对齐
Node：deployment evidence intake、release window readiness、post-runbook verification
```

## 当前推荐执行顺序

```text
1. 已完成推荐并行：Java v60 + mini-kv v69。
   Java v60 做 production deployment runbook contract，记录部署窗口 owner、rollback approver、database migration direction、secret source confirmation；不执行 SQL，不连生产库。
   mini-kv v69 做 release artifact digest package，记录 binary/WAL/Snapshot/fixture digest、restore drill command profile、operator confirmation；不执行 LOAD/COMPACT/SETNXEX。
2. Node v170：report shared helpers hardening，维护重构版，已插入完成；只抽取报告共享 check summary / digest 校验工具，不改变任何上游依赖，也不替代 deployment intake。
3. Node v171：deployment evidence intake gate，已完成；消费两边部署/摘要证据，输出 JSON/Markdown intake gate，不授权真实动作。
4. Node v172：deployment evidence verification，已完成；验证 intake gate digest、Java runbook 字段、mini-kv digest package 字段和 no-execution 边界。
5. 推荐并行：Java v61 + mini-kv v70。
   Java v61 做 rollback approval record fixture，补人工审批记录样本，不执行 rollback。
   mini-kv v70 做 restore drill evidence fixture，补恢复演练证据样本，不执行 restore。
6. Node v173：release window readiness packet，等待 Java v61 + mini-kv v70 和 Node v172 完成后再做；形成发布窗口人工 review 包。
```

## 并行依赖说明

```text
Java v60 与 mini-kv v69 推荐并行，因为两者都只补部署证据和 artifact digest，不互相调用。
Node v170 是插入的维护重构版，只收敛 Node 报告重复代码，不消费 Java v60 / mini-kv v69。
Node v171 不能提前做，因为它要消费 Java v60 和 mini-kv v69 的完成证据。
Node v172 必须在 Node v171 后做，承担 verification，不做零散 summary。
Java v61 与 mini-kv v70 推荐并行，因为两者都只补人工审批/恢复演练样本。
Node v173 必须等待 Java v61 + mini-kv v70 + Node v172 完成后再做。
```

## Node v170：report shared helpers hardening

依赖关系：维护重构版；不依赖 Java v60 / mini-kv v69，也不改变下一阶段纵向开发前置条件。

目标：

```text
把 v165-v169 报告链里重复的 check summary 与 digest 校验逻辑收敛到共享 helper，降低后续 production evidence intake 继续复制大文件骨架的风险。
```

本版本要落地：

- 在 `releaseReportShared.ts` 中提供共享 check summary helper。
- 在 `releaseReportShared.ts` 中提供 SHA-256 report digest 字符串校验 helper。
- 将 v165-v169 报告链中最近几处重复 check summary / digest 校验迁移到共享 helper。
- 保持现有 JSON/Markdown endpoint、字段名、digest 输出语义不变。
- 补共享 helper 单测、运行截图和解释归档。

## Java v60：production deployment runbook contract

并行关系：推荐与 mini-kv v69 并行推进。

目标：

```text
把部署窗口 owner、rollback approver、database migration direction、secret source confirmation 固化成只读 runbook contract。
```

本版本要落地：

- 记录 deployment window owner。
- 记录 rollback approver。
- 记录 database migration direction。
- 记录 secret source confirmation，不读取 secret value。
- 明确 Node 只能消费 runbook contract，不触发 Java rollback。

## mini-kv v69：release artifact digest package

并行关系：推荐与 Java v60 并行推进。

目标：

```text
把 binary/WAL/Snapshot/fixture digest 与 restore drill command profile 固化成只读 release artifact package。
```

本版本要落地：

- 记录 binary digest。
- 记录 WAL/Snapshot digest 或 checksum evidence。
- 记录 fixture digest。
- 记录 CHECKJSON restore drill command profile。
- 明确 LOAD/COMPACT/SETNXEX 不执行。
- 明确 mini-kv 仍不是 Java order authority。

## Node v171：deployment evidence intake gate

依赖关系：必须等待 Java v60 和 mini-kv v69 都完成后推进。

目标：

```text
合成 deployment evidence intake gate，覆盖 Java deployment runbook 与 mini-kv release artifact digest package。
```

本版本要落地：

- 引用 Java v60 deployment runbook contract。
- 引用 mini-kv v69 release artifact digest package。
- 引用 Node v169 summary。
- 输出 JSON/Markdown intake gate。
- 默认只读或 dry-run。
- 不读取 production secret，不连接 production database，不执行 restore。

## Node v172：deployment evidence verification

依赖关系：必须等待 Node v171 完成后推进。

目标：

```text
验证 deployment evidence intake gate 的 digest、字段完整性和 no-execution 边界。
```

本版本要落地：

- 复核 Node v171 intake digest。
- 复核 Java v60 runbook 字段完整性。
- 复核 mini-kv v69 digest package 字段完整性。
- 明确仍不授权 production operations。

## Java v61：rollback approval record fixture

并行关系：推荐与 mini-kv v70 并行推进。

目标：

```text
补人工 rollback approval record fixture，让 Node 后续 release window packet 可以引用审批记录。
```

本版本要落地：

- 记录 reviewer / approval timestamp placeholder。
- 记录 rollback target / migration direction。
- 记录 no-secret-value boundary。
- 明确 fixture 不能执行 rollback。

## mini-kv v70：restore drill evidence fixture

并行关系：推荐与 Java v61 并行推进。

目标：

```text
补 restore drill evidence fixture，让 Node 后续 release window packet 可以引用恢复演练证据。
```

本版本要落地：

- 记录 restore drill target。
- 记录 CHECKJSON LOAD/COMPACT/SETNXEX 风险解释。
- 记录 digest comparison placeholder。
- 明确 fixture 不执行 restore。

## Node v173：release window readiness packet

依赖关系：必须等待 Java v61、mini-kv v70、Node v172 都完成后推进。

目标：

```text
形成 release window readiness packet，供人工发布窗口 review。
```

本版本要落地：

- 汇总 Node v171/v172。
- 引用 Java v61 rollback approval record。
- 引用 mini-kv v70 restore drill evidence。
- 输出 JSON/Markdown packet。
- 不授权真实发布、回滚或恢复。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java rollback SQL、mini-kv LOAD/COMPACT、或任何真实回滚/恢复命令。
- 需要读取 secret value，而不是只记录 secret source。
- 需要把 mini-kv 写入订单核心一致性链路。
- 需要修改已有已完成版本 tag 或重写历史归档。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v169 已完成 post-v166 阶段总结；下一阶段继续靠近生产级，但先补 deployment runbook、artifact digest package、evidence intake 和 verification，不直接打开真实生产执行。
```
