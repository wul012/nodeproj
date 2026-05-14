# Node v166 衍生全局计划：从回滚窗口 readiness 转入真实生产化缺口收敛

来源版本：Node v166 `rollback window readiness checklist`。

计划状态：当前有效全局计划；上一份 `docs/plans/v163-post-rollback-readiness-roadmap.md` 已完成 Node v166 并收口，不再继续追加新版本。

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
Java v57：rollback approval handoff sample
mini-kv v66：restore compatibility handoff sample
Node v166：rollback window readiness checklist
Java v58：production rollback SQL review gate sample
mini-kv v67：restore dry-run operator package
Node v167：rollback execution preflight contract
```

当前仍不授权生产回滚：

```text
UPSTREAM_ACTIONS_ENABLED=false
Node 只做 readiness / dry-run / evidence aggregation / checklist rendering
Java rollback SQL 仍需要人工审批
mini-kv restore 不能伪造 Java order authority
```

## 下一阶段方向

下一阶段不要直接做真实回滚执行，先补“真实生产化缺口”的可验证入口：

```text
CI enforcement / environment checklist / secret-source contract / deployment runbook review
```

这个方向能同时锻炼：

```text
Java：生产环境只读检查、rollback SQL review gate、secret source contract
mini-kv：restore dry-run operator package、version compatibility matrix、artifact digest evidence
Node：跨项目 CI gate、production preflight checklist、post-window evidence pack
```

## 当前推荐执行顺序

```text
1. 已完成推荐并行：Java v58 + mini-kv v67。
   Java v58 做 production rollback SQL review gate sample，只说明 SQL review、migration direction、operator approval 字段；不执行 SQL，不连生产库。
   mini-kv v67 做 restore dry-run operator package，只说明 restore target、artifact digest、WAL/Snapshot compatibility 字段；不执行 LOAD/COMPACT/SETNXEX。
2. 已完成：Node v167。
   Node v167 做 rollback execution preflight contract，消费 Java v58 和 mini-kv v67 的 preflight/review 证据；只读，不启动上游，不授权生产回滚。
3. 下一步推荐并行：Java v59 + mini-kv v68。
   Java v59 做 production secret source contract，确认 secret manager/source/rotation owner 字段；不读取 secret value。
   mini-kv v68 做 artifact digest compatibility matrix，确认 binary/WAL/Snapshot/fixture digest 与版本矩阵；不执行 restore。
4. Node v168：production environment preflight checklist，必须等待 Java v59 和 mini-kv v68 都完成后再做；合成生产环境前置检查，仍然不授权真实动作。
5. Node v169：post-v166 readiness summary，汇总 v167-v168 的缺口收敛结果；这是阶段总结版，不要只加一两个 check。
```

## 并行依赖说明

```text
Java v58 与 mini-kv v67 已推荐并行完成，因为两者都只补人工执行前 review/dry-run package，不互相调用。
Node v167 已在 Java v58 和 mini-kv v67 完成后推进完成，消费两边 preflight/review evidence 但不执行上游动作。
Java v59 与 mini-kv v68 推荐并行，因为两者都只补生产环境元数据和 digest matrix，不执行真实动作。
Node v168 不能提前做，因为它要消费 Java v59 和 mini-kv v68 的完成证据。
Node v169 必须在 Node v167/v168 完成后再做，承担阶段总结，不做零散 summary。
```

## Java v58：production rollback SQL review gate sample

并行关系：推荐与 mini-kv v67 并行推进。

目标：

```text
把 rollback SQL review、migration direction、operator approval 字段固化成只读 gate sample。
```

本版本要落地：

- 记录 rollback SQL review owner。
- 记录 migration direction。
- 记录 operator approval placeholder。
- 明确 SQL 不从 sample 执行。
- 明确 Node 只能消费 review gate，不触发 Java rollback。

## mini-kv v67：restore dry-run operator package

并行关系：推荐与 Java v58 并行推进。

目标：

```text
把 restore target、artifact digest、WAL/Snapshot compatibility 字段固化成只读 operator package。
```

本版本要落地：

- 记录 target release / binary digest / fixture digest。
- 记录 WAL/Snapshot compatibility confirmation。
- 记录 CHECKJSON dry-run 命令。
- 明确 LOAD/COMPACT/SETNXEX 不执行。
- 明确 restore package 不能产生 Java order authority。

## Node v167：rollback execution preflight contract

依赖关系：必须等待 Java v58 和 mini-kv v67 都完成后推进。

完成状态：Node v167 已完成。

目标：

```text
合成跨项目 rollback execution preflight contract，但仍不执行回滚。
```

本版本要落地：

- 引用 Java v58 review gate。
- 引用 mini-kv v67 operator package。
- 引用 Node v166 checklist。
- 输出 JSON/Markdown preflight contract。
- 默认只读，不自动启动 Java / mini-kv，不授权生产回滚。

## Java v59：production secret source contract

并行关系：推荐与 mini-kv v68 并行推进。

目标：

```text
确认生产 secret source、rotation owner、access boundary 的只读 contract。
```

本版本要落地：

- 记录 secret manager/source 类型。
- 记录 rotation owner / review cadence。
- 明确不读取 secret value。
- 明确 Node 只能消费 secret source contract。

## mini-kv v68：artifact digest compatibility matrix

并行关系：推荐与 Java v59 并行推进。

目标：

```text
记录 binary/WAL/Snapshot/fixture digest 与版本兼容矩阵。
```

本版本要落地：

- 记录 binary digest。
- 记录 WAL/Snapshot digest 或 checksum evidence。
- 记录 fixture digest。
- 明确 digest matrix 不执行 restore。
- 明确 mini-kv 仍不是 Java order authority。

## Node v168：production environment preflight checklist

依赖关系：必须等待 Java v59 和 mini-kv v68 都完成后推进。

目标：

```text
合成生产环境前置 checklist，覆盖 secret source、artifact digest、rollback preflight。
```

本版本要落地：

- 引用 Java v59 secret source contract。
- 引用 mini-kv v68 artifact digest matrix。
- 引用 Node v167 preflight contract。
- 输出 JSON/Markdown checklist。
- 默认只读或 dry-run。
- 不读取生产 secret，不连接生产数据库。

## Node v169：post-v166 readiness summary

依赖关系：必须等待 Node v167 和 Node v168 都完成后推进。

目标：

```text
做一次阶段总结，说明 post-v166 生产化缺口收敛到了哪里。
```

本版本要落地：

- 汇总 v167 rollback execution preflight contract。
- 汇总 v168 production environment preflight checklist。
- 明确仍阻塞生产级的事项。
- 这是阶段总结版，不要只新增一两个 check。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java rollback SQL、mini-kv LOAD/COMPACT、或任何真实回滚命令。
- 需要读取 secret value，而不是只记录 secret source。
- 需要把 mini-kv 写入订单核心一致性链路。
- 需要修改已有已完成版本 tag 或重写历史归档。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v166 已完成回滚窗口 readiness；下一阶段继续靠近生产级，但先补执行前 preflight、secret source、artifact digest 和环境 checklist，不直接打开真实回滚执行。
```
