# Node v146 衍生计划：production pass evidence 与真实只读联调

来源版本：Node v146 `production live probe real-read smoke release evidence gate`。

计划状态：当前有效计划，从 v147 开始。

上一阶段历史计划：

```text
docs/plans/v143-live-probe-real-read-window-roadmap.md
```

## 计划接力规则

- 本文件只覆盖 v147-v149，不重新安排 v144-v146。
- 新 plan 必须从上一阶段完成后的下一个版本开始。
- 不允许多个 plan 同时声明同一个未完成版本为“下一步”。
- 如果后续再新建 plan，必须在本文件顶部标记“已完成/已接续到新 plan”。
- 推荐执行顺序中不要使用容易误解的“或/任选”，需要并行时明确写“可以一起推进”。

v144-v146 已完成：

```text
real-read smoke execution request
real-read smoke result importer
real-read smoke release evidence gate
```

当前 Node 侧已经具备：

```text
执行前请求 -> 结果导入 -> release evidence gate
```

默认状态仍然是 skipped evidence，因此 gate 输出：

```text
not-production-pass-evidence
```

## 执行规则

- Codex 默认继续负责 Node 项目。
- 每次推进 Node 前先读取最新 plan，并判断是否轮到 Node。
- 不再为了小字段继续堆 summary；阶段性总汇总要等真实只读 smoke 或 CI/deploy gate 有实质变化。
- Java / mini-kv 只在需要真实 pass evidence 时介入。
- 真实联调只允许读操作：
  - Java `GET /actuator/health`
  - Java `GET /api/v1/ops/overview`
  - mini-kv `HEALTH`
  - mini-kv `INFOJSON`
  - mini-kv `STATSJSON`
- 禁止：
  - Java replay POST
  - Java order mutation POST
  - mini-kv 写命令
  - `UPSTREAM_ACTIONS_ENABLED=true`

## 推荐执行顺序

```text
1. Node v147：real-read smoke dry-run command package，把 v144-v146 的执行请求、导入、gate 串成单一 operator package
2. Java / mini-kv：如果用户准备真实联调，则启动两个项目并只读确认 health/info 能力
3. Node v148：real-read smoke pass evidence capture，只在 Java / mini-kv 已启动且只读窗口打开时运行
4. Node v149：production pass evidence verification，校验 v148 pass evidence 是否能通过 v146 gate
```

## Node v147：real-read smoke dry-run command package

目标：

```text
把 v144-v146 的结果打包成一个操作员 dry-run command package。
```

本版要落地：

- 引用 execution request digest。
- 引用 result importer digest。
- 引用 release evidence gate digest。
- 输出一份真实联调前的 dry-run package。
- 仍不启动 Java / mini-kv。

## Java / mini-kv 何时启动

只有当用户明确要做真实 pass evidence capture 时再启动。

如果启动，顺序建议：

```text
1. 启动 Java
2. 启动 mini-kv
3. Node 使用 UPSTREAM_PROBES_ENABLED=true、UPSTREAM_ACTIONS_ENABLED=false 运行只读 smoke
4. Node 归档 pass/skipped 结果
```

## Node v148：real-read smoke pass evidence capture

目标：

```text
在两个上游已显式启动时，捕获真实只读 smoke evidence。
```

本版必须满足：

- `UPSTREAM_PROBES_ENABLED=true`
- `UPSTREAM_ACTIONS_ENABLED=false`
- 不执行任何写命令
- 如果任一上游不可用，仍输出 skipped/mixed，不伪装 pass

## Node v149：production pass evidence verification

目标：

```text
校验 v148 capture 是否真的能通过 v146 release evidence gate。
```

本版要落地：

- all-pass 才允许 production pass evidence。
- skipped/mixed 继续阻断。
- 即使 pass，也只代表 connection evidence pass，不代表 production operations 可执行。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Java replay POST 或 mini-kv 写命令。
- Java / mini-kv 未启动但版本要求必须真实 pass。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v147 先做 dry-run package；真实 pass evidence 从 v148 开始才需要 Java / mini-kv 介入。
```
