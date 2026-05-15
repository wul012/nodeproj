# Node v194 衍生全局计划：真实只读 adapter archive 后续验证

来源版本：Node v194 `real-read adapter evidence archive`。

计划状态：当前唯一有效全局计划。`docs/plans/v191-post-real-read-adapter-roadmap.md` 已覆盖并收口 Node v192-v194、Java v68、mini-kv v77；后续不再向旧计划追加重合版本。

## 阶段原则

```text
v194 已经把 v191-v193 固化成 archive bundle。下一阶段不继续重复新增 archive，而是做 archive verification、真实窗口结果导入，以及必要的上游只读证据增强。
```

本阶段仍只覆盖三项目：

```text
Java = 订单交易核心
Node = 运维控制面 / 证据链 / 受控操作入口
mini-kv = 自研 KV 基础设施实验位
```

不纳入 aiproj。

## 推荐执行顺序

```text
1. Node v195：real-read adapter evidence archive verification。（已完成）
   验证 v194 archive digest、v191 adapter digest、v192 operator window digest、v193 taxonomy digest、classification 覆盖率和 production operation 仍关闭。
   产物：
   - `GET /api/v1/production/real-read-adapter-evidence-archive-verification`
   - `GET /api/v1/production/real-read-adapter-evidence-archive-verification?format=markdown`
   - `代码讲解记录_生产雏形阶段/199-real-read-adapter-evidence-archive-verification-v195.md`
   - `c/195/图片/real-read-adapter-evidence-archive-verification-v195.png`
   - `c/195/解释/real-read-adapter-evidence-archive-verification-v195.md`
2. 推荐并行：Java v69 + mini-kv v78。
   Java v69 补 release approval rehearsal 的只读 archive verification hint，例如 response schema version / warning digest / no-ledger-write proof；mini-kv v78 补 SMOKEJSON taxonomy digest 或 runtime smoke verification sample。两者都不新增写操作。
3. Node v196：real-read adapter imported window result packet。（已完成）
   消费一个人工窗口导入样本，把 closed-window baseline 和 operator-window result 区分开；默认仍不启动 Java / mini-kv。
   产物：
   - `GET /api/v1/production/real-read-adapter-imported-window-result-packet`
   - `GET /api/v1/production/real-read-adapter-imported-window-result-packet?format=markdown`
   - `代码讲解记录_生产雏形阶段/200-real-read-adapter-imported-window-result-packet-v196.md`
   - `c/196/图片/real-read-adapter-imported-window-result-packet-v196.png`
   - `c/196/解释/real-read-adapter-imported-window-result-packet-v196.md`
4. Node v197：real-read adapter production readiness checkpoint。
   汇总 v191-v196，说明距离真正生产窗口还缺哪些硬门槛：真实 operator identity、managed audit store、CI archive artifact、人工审批记录。
```

## 推荐并行：Java v69 + mini-kv v78

Java v69 目标：

```text
增强 release approval rehearsal 的只读验证 hint，给 Node v196/v197 提供更稳定的上游结果校验字段；不认证、不持久化、不写 ledger。
```

mini-kv v78 目标：

```text
增强 SMOKEJSON / runtime-smoke taxonomy 的 digest 或 verification sample，让 Node 能判断导入结果是否来自预期版本；不执行 LOAD/COMPACT/SETNXEX/RESTORE。
```

## 暂停条件

- 需要生产密钥、生产数据库、生产 IdP。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java deployment、rollback SQL、mini-kv LOAD/COMPACT/SETNXEX/RESTORE。
- 需要把 closed-window 或 rehearsal pass 当作生产操作授权。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v196 已完成 imported window result packet；下一步 Node v197 做 production readiness checkpoint，汇总 v191-v196 以及真正生产窗口仍缺的硬门槛。
```
