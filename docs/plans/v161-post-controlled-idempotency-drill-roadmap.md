# Node v161 衍生全局计划：从幂等演练转入发布验证硬化

来源版本：Node v161 `controlled idempotency drill runbook`。

计划状态：当前有效全局计划；上一份 `docs/plans/v159-post-release-evidence-review-roadmap.md` 到 Node v161 收口，不再继续追加已完成版本。

## 计划接力规则

- 每次推进前先读取最新 plan，并判断当前步骤属于哪个项目。
- Codex 默认负责 Node；当下一步是 Java / mini-kv 时，先做只读状态核对，用户明确要求推进时再交叉开发。
- 能并行的 Java / mini-kv 同阶段版本必须明确写成“推荐并行”。
- Node 汇总版必须写清依赖前置版本全部完成。
- 推荐执行顺序中不使用“或/任选”。
- 每个版本必须形成一个合理小闭环，不只做零散字段或单纯流水账 summary。
- 新版本运行截图和解释默认写入 `c/<版本>/`。
- 写入 Java / mini-kv 版本号前必须只读核对对应仓库最新 tag。

## 当前状态

已完成：

```text
Java v52：order idempotency boundary
mini-kv v61：ttl token primitive
Node v160：idempotency vertical readiness review
Java v53：idempotency store abstraction
mini-kv v62：ttl recovery evidence
Node v161：controlled idempotency drill runbook
```

这一阶段已经完成“订单幂等 / 短 TTL token / Node 受控演练”的纵向切片。当前仍不授权生产写操作：

```text
UPSTREAM_ACTIONS_ENABLED=false
Java 仍是订单真相源
mini-kv 仍是 disabled TTL token candidate
Node 只做 review / dry-run / runbook
```

## 下一阶段方向

下一阶段不继续堆幂等 summary，而是转入更接近生产级的发布验证硬化：

```text
发布验证 / CI 可复现 / 三项目 release evidence gate
```

这个方向能同时锻炼：

```text
Java：Maven 测试、打包、静态契约样本、可复现 release manifest
mini-kv：CMake/CTest、真实命令 smoke、fixture/version manifest
Node：跨项目 release verification intake 和 gate
```

## 当前推荐执行顺序

```text
1. 推荐并行：Java v54 + mini-kv v63。
   Java v54 做 release verification manifest，固化 Maven 聚焦测试、非 Docker 回归、package、HTTP smoke、静态 contracts 清单；不改订单业务语义。
   mini-kv v63 做 release verification manifest，固化 CMake configure/build、CTest、命令 smoke、fixture/version 清单；不新增 runtime 命令。
2. Node v162：cross-project release verification intake gate，必须等待 Java v54 和 mini-kv v63 都完成后再做；读取两边 manifest，生成三项目 release gate，只读不执行上游构建。
3. 推荐并行：Java v55 + mini-kv v64。
   Java v55 做 deployment rollback evidence sample，说明 Java 包、配置、数据库迁移回滚边界；不接生产数据库。
   mini-kv v64 做 runtime artifact rollback evidence sample，说明二进制、WAL/Snapshot、fixture 版本回滚边界；不进入 Java 交易链路。
4. Node v163：release rollback readiness runbook，必须等待 Java v55 和 mini-kv v64 都完成后再做；合成跨项目回滚演练 runbook，默认 dry-run。
```

## 并行依赖说明

```text
Java v54 与 mini-kv v63 推荐并行，因为两者都只在各自项目内部固化 release verification manifest，不互相调用。
Node v162 不能提前做，因为它要消费 Java v54 和 mini-kv v63 的完成证据。
Java v55 与 mini-kv v64 推荐并行，因为两者都只补各自 rollback evidence sample，不改变运行主链路。
Node v163 不能提前做，因为它要消费 Java v55 和 mini-kv v64 的完成证据。
```

## Java v54：release verification manifest

并行关系：推荐与 mini-kv v63 并行推进。

目标：

```text
让 Java release 前的验证证据可复现、可被 Node 只读消费。
```

本版本要落地：

- 固化 release verification manifest。
- 记录 Maven 聚焦测试、非 Docker 回归、package、HTTP smoke 的预期命令和证据字段。
- 列出 contracts 样本清单和版本边界。
- 不改订单创建、支付、库存、Outbox 或失败事件 replay 业务语义。
- 不接生产数据库，不接 mini-kv。

## mini-kv v63：release verification manifest

并行关系：推荐与 Java v54 并行推进。

目标：

```text
让 mini-kv release 前的构建、测试、命令 smoke、fixture/version 证据可复现。
```

本版本要落地：

- 固化 release verification manifest。
- 记录 CMake configure/build、CTest、关键命令 smoke 的预期命令和证据字段。
- 列出 fixture/version manifest。
- 不新增 runtime 命令。
- 不进入 Java 订单权威链路。

## Node v162：cross-project release verification intake gate

依赖关系：必须等待 Java v54 和 mini-kv v63 都完成后推进。

目标：

```text
把 Java v54 和 mini-kv v63 汇总成三项目 release verification gate。
```

本版本要落地：

- 引用 Java v54 tag 和 release verification manifest。
- 引用 mini-kv v63 tag 和 release verification manifest。
- 引用 Node v161 runbook closeout。
- 明确 Node 不执行 Java Maven、不执行 mini-kv CMake，只消费已归档证据。
- 默认不执行任何上游写操作。

## Java v55：deployment rollback evidence sample

并行关系：推荐与 mini-kv v64 并行推进。

目标：

```text
补 Java 部署回滚边界的只读 evidence sample。
```

本版本要落地：

- 说明 Java 包、配置、数据库迁移、contracts 样本的回滚边界。
- 明确哪些内容可回滚，哪些需要人工确认。
- 不接生产数据库。
- 不改变订单交易语义。

## mini-kv v64：runtime artifact rollback evidence sample

并行关系：推荐与 Java v55 并行推进。

目标：

```text
补 mini-kv 二进制、WAL/Snapshot、fixture 版本回滚边界的只读 evidence sample。
```

本版本要落地：

- 说明 binary/version、WAL、Snapshot、fixture 的回滚边界。
- 明确 WAL/Snapshot 回滚不能伪造订单权威状态。
- 不进入 Java 交易一致性链路。

## Node v163：release rollback readiness runbook

依赖关系：必须等待 Java v55 和 mini-kv v64 都完成后推进。

目标：

```text
把 Java 与 mini-kv 的 rollback evidence 合成跨项目 release rollback readiness runbook。
```

本版本要落地：

- 引用 Java v55 tag 和 evidence。
- 引用 mini-kv v64 tag 和 evidence。
- 生成人工 rollback readiness runbook。
- 默认只读或 dry-run。
- 不自动启动 Java / mini-kv。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要把 mini-kv 写入订单核心一致性链路。
- 需要修改已有已完成版本 tag 或重写历史归档。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v161 已收口幂等纵向切片；下一阶段转入 release verification 和 rollback readiness，让三项目更接近生产级交付流程。
```
