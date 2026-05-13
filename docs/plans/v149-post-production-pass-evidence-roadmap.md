# Node v149 衍生全局计划：production evidence 到真实联调准备

来源版本：Node v149 `production live probe real-read smoke production pass evidence verification`。

计划状态：当前有效全局计划，从 Node v150 / Java v49 / mini-kv v50 开始。

上一阶段历史计划：

```text
docs/plans/v146-production-pass-evidence-roadmap.md
```

## 计划接力规则

- 本文件覆盖 Node v150-v152，并明确插入 Java v49、mini-kv v50，不重新安排 v147-v149。
- 新 plan 必须从上一阶段完成后的下一个版本开始。
- 不允许多个 plan 同时声明同一个未完成版本为“下一步”。
- 推荐执行顺序中不使用“或/任选”这类容易误解的表达。
- 如果 Java / mini-kv 需要一起推进，明确写“可以一起推进”。
- 每次推进前先读取最新 plan，并判断当前步骤是否轮到 Node。
- Codex 默认只负责 Node；当下一步是 Java / mini-kv 时，只做只读状态核对并说明该轮应由对应项目推进，除非用户明确授权交叉开发。
- 全局计划不能只为了 Node 自己方便而连续安排多版 Node；连续 Node 版本只允许用于同一阶段的必要收口，并且必须说明为什么暂不需要上游新增 evidence。

## 当前状态

v147-v149 已完成：

```text
dry-run command package
evidence capture
production pass evidence verification
```

默认未启动上游时，Node 已能稳定输出：

```text
verificationState=not-production-pass-evidence
readyForProductionPassEvidenceVerification=false
readyForProductionOperations=false
```

这说明 skipped/mixed evidence 不会被冒充成 production pass。

## 推荐执行顺序

```text
1. Node v150：production pass evidence archive，先把 v149 verification + v148 capture + v146 gate 的 digest 链归档成稳定输入
2. Java v49 + mini-kv v50：可以一起推进，只补只读 evidence 供给能力，不做写操作；Java 补 ops/read-only evidence sample，mini-kv 补 CHECKJSON/INFOJSON/STATSJSON 只读样本与说明
3. Node v151：production pass evidence archive verification，消费 Node v150 archive，并预留 Java v49 / mini-kv v50 evidence 引用位；若上游尚未完成，明确标记 upstreamEvidenceReady=false
4. Node v152：real-read smoke operator runbook，基于 Node v150-v151 和 Java v49 / mini-kv v50 的只读证据，生成真实只读联调前操作清单
```

## Node v150：production pass evidence archive

状态：已由 Node v150 完成。

目标：

```text
把 v149 verification、v148 capture、v146 release gate 固化成一个可归档 evidence archive。
```

本版本要落地：

- 引用 v149 verification digest。
- 引用 v148 capture digest。
- 引用 v146 gate digest。
- 输出 archiveDigest。
- 默认状态必须是 `not-production-pass-evidence`。
- `readyForProductionOperations` 仍为 `false`。
- 不启动 Java / mini-kv。

## Node v151：production pass evidence archive verification

目标：

```text
验证 v150 archive 的 digest、版本引用、状态边界和 no-write 约束。
```

本版本要落地：

- 校验 archiveDigest。
- 校验 verification / capture / gate profileVersion。
- 校验 skipped/mixed 不进入 production pass archive。
- 校验 `UPSTREAM_ACTIONS_ENABLED=false`。
- 预留 Java v49 / mini-kv v50 只读 evidence 引用位；上游未完成时必须输出 `upstreamEvidenceReady=false`。
- 输出 JSON / Markdown verification endpoint。

## Node v152：real-read smoke operator runbook

目标：

```text
生成真实只读联调前的 operator runbook，把“何时启动 Java / mini-kv”变成明确人工步骤。
```

本版本要落地：

- 列出 Java 只读端点。
- 列出 mini-kv 只读命令。
- 明确禁止 Java replay POST、订单写操作、mini-kv 写命令。
- 明确 `UPSTREAM_PROBES_ENABLED=true` 和 `UPSTREAM_ACTIONS_ENABLED=false` 的组合。
- 明确 Node 不自动启动 Java / mini-kv。

## 何时启动 Java / mini-kv

v150-v152 默认仍不启动 Java / mini-kv。

只有当用户明确进入真实只读联调窗口时，才按以下顺序：

```text
1. operator 手动启动 Java
2. operator 手动启动 mini-kv
3. Node 使用 UPSTREAM_PROBES_ENABLED=true、UPSTREAM_ACTIONS_ENABLED=false 读取只读证据
4. Node 归档 pass/mixed/skipped 结果
```

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Java replay POST 或 mini-kv 写命令。
- 需要 Node 自动启动 Java / mini-kv。
- 任何 skipped/mixed evidence 被要求当作 production pass。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v150-v152 继续由 Node 完成 production pass evidence 的 archive、verification 和 operator runbook。真实上游联调仍由用户明确开启，Node 默认不启动、不修改 Java / mini-kv。
```
