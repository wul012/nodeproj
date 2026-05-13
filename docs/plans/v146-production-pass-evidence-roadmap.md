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
- Java / mini-kv 未明确授权时，只做只读状态核对，不构建、不启动、不测试、不修改。
- Node 版本先完成 capture / verification 能力；如果 Java / mini-kv 未启动，必须输出 skipped/mixed evidence，不能伪装 pass，也不能把上游启动写成 Node 版本的默认前置阻塞。
- Java / mini-kv 只在用户明确要求真实 pass evidence capture 时进入真实只读窗口。
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
2. Node v148：real-read smoke evidence capture mechanism，默认未启动上游时记录 skipped/mixed；若用户已明确打开只读窗口，则记录真实 pass/mixed
3. Node v149：production pass evidence verification，校验 v148 evidence 是否能通过 v146 gate；skipped/mixed 必须继续阻断
```

## Node v147：real-read smoke dry-run command package

状态：已由 Node v147 完成。

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

这不是单独的版本顺序项，也不是 Node v148 的默认阻塞条件。Node v148 应先把 capture 机制做完整；没有真实上游时，结果必须是 skipped/mixed evidence。用户明确进入真实只读窗口后，Node 再使用同一套 capture 机制记录 pass/mixed evidence。

如果启动，顺序建议：

```text
1. 启动 Java
2. 启动 mini-kv
3. Node 使用 UPSTREAM_PROBES_ENABLED=true、UPSTREAM_ACTIONS_ENABLED=false 运行只读 smoke
4. Node 归档 pass/skipped 结果
```

## Node v148：real-read smoke pass evidence capture

状态：已由 Node v148 完成。

目标：

```text
固化真实只读 smoke 的 evidence capture 机制，并正确区分 skipped、mixed、pass。
```

本版必须满足：

- `UPSTREAM_PROBES_ENABLED=true`
- `UPSTREAM_ACTIONS_ENABLED=false`
- 不执行任何写命令
- 默认不自动启动 Java / mini-kv
- 如果任一上游不可用，仍输出 skipped/mixed，不伪装 pass
- 如果用户已经明确打开真实只读窗口，则记录真实 pass/mixed 证据

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
- 用户明确要求真实 pass evidence，但 Java / mini-kv 只读窗口无法打开。
- 任何 skipped/mixed evidence 被要求当作 production pass。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v147 先做 dry-run package；v148-v149 继续由 Node 完成 capture / verification 能力。真实 pass 只在用户明确打开 Java / mini-kv 只读窗口后产生，默认不能把 skipped/mixed 冒充 pass。
```
