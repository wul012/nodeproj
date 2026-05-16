# Node v203 衍生全局计划：CI artifact retention gate 后的真实只读联调

来源版本：Node v203 `cross-project CI artifact retention gate`。

计划状态：当前唯一有效全局计划。Node v204、推荐并行 Java v73 + mini-kv v82、Node v205 均已完成；下一步是 Node v206 archive verification。

## 阶段原则

v203 已经证明 Node v202、Java v72、mini-kv v81 的 artifact retention 证据可以统一核对。下一阶段不继续堆 summary/checklist，而是进入更接近真实生产前置的只读联调：

```text
真实 HTTP/TCP 读取
明确启动/停止进程
明确端口和安全环境变量
只读命令白名单
失败分类和证据归档
```

三项目边界保持不变：

```text
Java = 订单交易核心，只提供只读 ops/rehearsal evidence
Node = 运维控制面 / 证据链 / 受控操作入口
mini-kv = 自研 KV 基础设施实验位，只提供只读 runtime smoke evidence
```

## 推荐执行顺序

```text
1. Node v204：three-project real-read runtime smoke preflight。已完成。
   先做真实联调前的运行计划和预检 profile：列出 Java health/release rehearsal、mini-kv SMOKEJSON/INFOJSON/STORAGEJSON/HEALTH、Node gate endpoint 的只读目标、端口、环境变量、启动/停止责任和失败分类。若 Java/mini-kv 未运行，本版可以记录为 closed-window，不自动强行启动；若需要启动，由本版明确启动命令、PID、端口和收尾。

2. 推荐并行：Java v73 + mini-kv v82。已完成。
   Java v73 补真实只读联调友好字段，例如 release rehearsal 的 live-read readiness echo、server timestamp、read-only endpoint version；mini-kv v82 补 SMOKEJSON live-read session hint，例如 session id echo、server uptime bucket、read command list digest。两者都不做写操作，不进入订单一致性链路。

3. Node v205：three-project real-read runtime smoke execution packet。已完成。
   在 v204 预检基础上执行一次真实只读联调：Node 服务必须启动；Java/mini-kv 是否由 Node 本轮启动，取决于 v204 预检和用户当前授权。只允许 GET/health/rehearsal 和 mini-kv SMOKEJSON/INFOJSON/STORAGEJSON/HEALTH，不执行 Java 写操作，不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE。

4. Node v206：real-read runtime smoke archive verification。下一步。
   消费 v205 的真实联调结果，验证截图、HTTP status、digest、失败分类和 cleanup 记录。若联调未跑通，本版应明确 blocker，而不是假装生产窗口 ready。
```

## 可并行说明

```text
Java v73 + mini-kv v82 已推荐并行完成。
Node v204 可以先做，因为它是联调预检和运行计划，不依赖 Java v73 / mini-kv v82。
Node v205 已读取 v204 结果，并消费 Java v73 + mini-kv v82 新字段完成真实只读联调；下一步 Node v206 只验证 v205 归档，不再重复规划联调目标。
```

## 暂停条件

- 需要生产密钥、生产数据库、生产 IdP。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要真实 GitHub artifact upload、读取 GitHub secret 或修改 CI 权限。
- 需要 Java 创建 approval decision、写 ledger、执行 deployment / rollback / SQL。
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE。
- 需要把 runtime smoke 结果当作生产窗口授权。
- 无法明确本轮启动的进程、端口或停止清理责任。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v204-v206 是从“证据契约成熟”转向“真实只读联调”的阶段；目标是让三项目真的在安全窗口里读起来，而不是继续只增加 fixture/summary。
```
