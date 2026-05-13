# Node v159 衍生全局计划：从证据链转入纵向生产硬化

来源版本：Node v159 `read-only window capture release evidence review`。

计划状态：当前有效全局计划；上一份 `docs/plans/v156-post-read-only-window-capture-roadmap.md` 已完成，本文件从 Java v52 / mini-kv v61 / Node v160 开始。

## 计划接力规则

- 每次推进前先读取最新 plan，并判断当前步骤属于哪个项目。
- Codex 默认负责 Node；当下一步是 Java / mini-kv 时，先做只读状态核对，用户明确要求推进时再交叉开发。
- 推荐执行顺序中不使用“或/任选”这类容易误解的表达。
- 能并行的 Java / mini-kv 同阶段版本必须明确写成“推荐并行”，Node 汇总版必须写清依赖前置版本全部完成。
- 三项目计划必须围绕同一个纵向能力，不再只做零散 summary / evidence 小字段。
- 做完一个阶段后另起新 plan，不在同一份文档里长期追加已完成版本。
- 写入 Java / mini-kv 版本号前必须只读核对对应仓库最新 tag。

## 当前状态

已完成：

```text
Java v51：ops evidence field guide
mini-kv v60：runtime read field guide
Node v157：read-only window capture archive
Node v158：read-only window capture archive verification
Node v159：read-only capture release evidence review
```

Node v159 已经把 Node capture archive、Java v51 字段说明、mini-kv v60 字段说明合成 release evidence review。

## 纵向深推进判断

真正纵向深推进从下一阶段开始，但不应该一上来让 Java 强依赖 mini-kv。

更稳的做法是先选一个生产硬化切片：

```text
订单幂等 / 短 TTL token / 控制面审计
```

这个切片能同时锻炼：

```text
Java：订单核心幂等边界
mini-kv：TTL / 原子占位 / 过期清理
Node：只读观察与受控开关
```

## 当前推荐执行顺序

```text
1. 推荐并行：Java v52 + mini-kv v61。
   Java v52 做 order idempotency boundary，先在 Java 内部补订单创建幂等边界和只读 evidence，不接 mini-kv，不改支付/库存事务。
   mini-kv v61 做 ttl token primitive，补 SETEX/TTL/过期清理测试或等价 TTL token 能力，明确不是订单权威存储。
2. Node v160：idempotency vertical readiness review，必须等待 Java v52 和 mini-kv v61 都完成后再做；读取两边版本证据，生成纵向切片 readiness review，默认不执行写操作。
3. 推荐并行：Java v53 + mini-kv v62。
   Java v53 做 idempotency store abstraction，抽象 IdempotencyStore，默认仍用 Java 本地/DB 实现，mini-kv adapter 只作为 disabled candidate。
   mini-kv v62 做 ttl recovery evidence，补 TTL 与 WAL/Snapshot/重启恢复之间的证据，不进入 Java 交易一致性链路。
4. Node v161：controlled idempotency drill runbook，必须等待 Java v53 和 mini-kv v62 都完成后再做；生成人工演练 runbook，只读或 dry-run，不自动启动 Java / mini-kv。
```

## 并行依赖说明

```text
Java v52 与 mini-kv v61 推荐并行，因为两者都在各自项目内部落能力，不互相调用。
Node v160 不能并行提前做，因为它要消费 Java v52 和 mini-kv v61 的完成证据。
Java v53 与 mini-kv v62 推荐并行，因为 Java 只抽象 disabled candidate，mini-kv 只补 TTL recovery evidence。
Node v161 不能并行提前做，因为它要消费 Java v53 和 mini-kv v62 的完成证据。
```

## Java v52：order idempotency boundary

并行关系：推荐与 mini-kv v61 并行推进。

目标：

```text
让订单创建具备可解释的幂等边界。
```

本版本要落地：

- 明确 idempotency key 的请求边界。
- 对重复请求给出稳定响应或稳定拒绝语义。
- 增加只读 evidence endpoint 或 sample 说明幂等状态。
- 不接 mini-kv。
- 不改变支付/库存核心事务。

## mini-kv v61：ttl token primitive

并行关系：推荐与 Java v52 并行推进。

目标：

```text
让 mini-kv 具备短 TTL token 的基础能力。
```

本版本要落地：

- 新增或补强 TTL token primitive。
- 覆盖过期清理测试。
- 明确 `order_authoritative=false`。
- 不进入 Java 订单权威链路。

## Node v160：idempotency vertical readiness review

依赖关系：必须等待 Java v52 和 mini-kv v61 都完成后推进。

目标：

```text
把 Java v52 和 mini-kv v61 汇总成一个纵向切片 readiness review。
```

本版本要落地：

- 引用 Java v52 tag 和 evidence。
- 引用 mini-kv v61 tag 和 evidence。
- 明确 Java 仍是订单真相源。
- 明确 mini-kv 只是 token/TTL candidate。
- 默认不执行任何上游写操作。

## Java v53：idempotency store abstraction

并行关系：推荐与 mini-kv v62 并行推进。

目标：

```text
把 Java 幂等存储边界抽象出来，但不把 mini-kv 接入交易主链路。
```

本版本要落地：

- 新增或整理 `IdempotencyStore` 抽象。
- 默认实现仍然使用 Java 本地/DB 路径。
- mini-kv adapter 只作为 disabled candidate 或说明性边界。
- 不改变订单权威存储。
- 不让 Node 直接触发真实写操作。

## mini-kv v62：ttl recovery evidence

并行关系：推荐与 Java v53 并行推进。

目标：

```text
证明 TTL token primitive 与 WAL/Snapshot/重启恢复之间的边界。
```

本版本要落地：

- 补 TTL 与恢复相关 evidence。
- 补 WAL/Snapshot/restart 场景说明或测试。
- 明确过期 token 不能恢复成有效订单幂等状态。
- 保持 `order_authoritative=false`。
- 不进入 Java 交易一致性链路。

## Node v161：controlled idempotency drill runbook

依赖关系：必须等待 Java v53 和 mini-kv v62 都完成后推进。

目标：

```text
把 Java 幂等抽象和 mini-kv TTL recovery evidence 合成一次人工演练 runbook。
```

本版本要落地：

- 引用 Java v53 tag 和 evidence。
- 引用 mini-kv v62 tag 和 evidence。
- 生成 controlled idempotency drill runbook。
- 默认只读或 dry-run。
- 不自动启动 Java / mini-kv。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要 Java 直接依赖 mini-kv 承担订单权威存储。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要把 mini-kv 写入订单核心一致性链路。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
下一阶段可以真正纵向深推进，但要先从“订单幂等 + TTL token + Node readiness review”这个小切片开始，不要直接把 mini-kv 接进 Java 交易主链路。
```
