# Node v153 衍生全局计划：真实只读联调窗口前验证

来源版本：Node v153 `production live probe real-read smoke operator runbook`。

计划状态：已完成；Node v154-v156 已完成，Java v50 + mini-kv v59 已只读核对完成。后续从 `docs/plans/v156-post-read-only-window-capture-roadmap.md` 接力。

## 计划接力规则

- 每次推进前先读取最新 plan，并判断当前步骤是否轮到 Node。
- Codex 默认负责 Node；当下一步是 Java / mini-kv 时，先做只读状态核对，除非用户明确授权交叉开发。
- 全局计划必须覆盖三个项目的配合关系，不能只为了 Node 自己方便连续安排版本。
- 连续 Node 版本只允许用于同一阶段必要收口，并说明为什么暂不需要 Java / mini-kv 新增 evidence。
- 推荐执行顺序中不使用“或/任选”这类容易误解的表达。
- 做完一个阶段后另起新 plan，不在同一份文档里长期追加已完成版本。
- 写入 Java / mini-kv 版本号前必须只读核对对应仓库最新 tag。

## 当前状态

已完成：

```text
Java v49：ops read-only evidence sample
mini-kv v58：readonly evidence fixtures
Node v150：production pass evidence archive
Node v151：shared live-probe helper refactor
Node v152：production pass evidence archive verification
Node v153：real-read smoke operator runbook
Node v154：operator runbook verification
Node v155：read-only window readiness packet
Java v50：ops read-only window self description
mini-kv v59：runtime read self description
Node v156：read-only window live capture
```

Node v153 已经把真实只读联调窗口拆成明确人工步骤：

```text
operator 手动启动 Java / mini-kv
Node 使用 UPSTREAM_PROBES_ENABLED=true
Node 保持 UPSTREAM_ACTIONS_ENABLED=false
Node 只访问列出的 Java GET 端点和 mini-kv 只读命令
Java replay POST、订单写操作、mini-kv 写命令全部禁止
```

## 当前推荐执行顺序

```text
1. Node v154：operator runbook verification，已复核 v153 runbook digest、步骤数量、允许目标、禁止操作和 no-auto-start 边界；未启动 Java / mini-kv。
2. Node v155：read-only window readiness packet，已把 v154 verification、v153 runbook、v152 archive verification 打包成一次人工窗口前的审阅包；仍未启动 Java / mini-kv。
3. Java v50 + mini-kv v59：已一起完成，只补真实只读联调窗口需要的“启动后自描述/健康证据”增强；Java 补 ops health/evidence 字段稳定性，mini-kv 补 INFOJSON/STATSJSON smoke 输出稳定性。
4. Node v156：已完成真实只读 live probe capture；如果上游没有启动，则记录 skipped，不得当作 pass。
```

## Node v154：operator runbook verification

状态：已由 Node v154 完成。

目标：

```text
把 v153 runbook 从“可读清单”推进到“可复核清单”。
```

本版本要落地：

- 复算 v153 `runbookDigest`。
- 校验 operator steps 数量和顺序。
- 校验 Java 只读目标只包含 GET / contract sample。
- 校验 mini-kv 只读目标只包含 HEALTH / INFOJSON / STATSJSON / CHECKJSON GET / readonly fixture。
- 校验 forbidden operations 覆盖 Java replay POST、订单写操作、mini-kv 写命令、`UPSTREAM_ACTIONS_ENABLED=true`、Node 自动启动上游。
- 输出 JSON / Markdown verification endpoint。
- 不启动 Java / mini-kv。

## Node v155：read-only window readiness packet

状态：已由 Node v155 完成。

目标：

```text
把 v152 archive verification、v153 runbook、v154 runbook verification 合并成一次人工窗口前审阅包。
```

本版本要落地：

- 引用 v152 verification digest。
- 引用 v153 runbook digest。
- 引用 v154 verification digest。
- 输出 readiness packet digest。
- 明确真实只读联调仍需 operator 手动启动 Java / mini-kv。
- 明确未启动上游时只能进入 skipped 证据，不得进入 production pass。

## Java v50 + mini-kv v59：上游自描述增强

目标：

```text
让 Java / mini-kv 在真实只读窗口被启动后，能给 Node 更稳定的只读证据。
```

Java v50 建议：

- 补强 ops/evidence 返回字段稳定性。
- 保持只读 GET，不新增写操作。
- 说明 replay POST 仍不开放给 Node。

mini-kv v59 建议：

- 补强 INFOJSON / STATSJSON smoke 输出字段稳定性。
- 保持 CHECKJSON GET read sample。
- 说明 SET / DEL / EXPIRE 仍不进入 Node 真实只读窗口。

这两个版本可以一起推进，因为都只补上游只读证据供给，不互相依赖，也不改变交易或存储状态。

## Node v156：真实只读 live probe capture

状态：已由 Node v156 完成。

目标：

```text
在用户明确允许、operator 手动启动 Java / mini-kv 后，Node 执行一次真实只读 capture。
```

本版本要落地：

- 只在人工窗口明确开启后读取 Java / mini-kv。
- `UPSTREAM_PROBES_ENABLED=true`。
- `UPSTREAM_ACTIONS_ENABLED=false`。
- 不执行 Java replay POST、订单写操作、mini-kv 写命令。
- 如果上游没有启动，输出 skipped evidence。
- 如果上游启动且只读 probes 全部成功，输出 pass evidence，但仍保持 `readyForProductionOperations=false`。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Java replay POST 或 mini-kv 写命令。
- 需要 Node 自动启动 Java / mini-kv。
- 任何 skipped/mixed evidence 被要求当作 production pass。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
Node v154-v156 已验证、打包并执行真实只读窗口 capture；Java v50 + mini-kv v59 已提供上游只读自描述能力。下一阶段另起 plan，从 v157 开始。
```
