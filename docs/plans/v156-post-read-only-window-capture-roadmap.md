# Node v156 衍生全局计划：只读 capture 后证据固化

来源版本：Node v156 `production live probe real-read smoke read-only window live capture`。

计划状态：当前有效全局计划；上一份 `docs/plans/v153-post-operator-runbook-roadmap.md` 已完成，本文件从 Node v157 开始，不重复安排 v154-v156。

## 计划接力规则

- 每次推进前先读取最新 plan，并判断当前步骤是否轮到 Node。
- Codex 默认负责 Node；当下一步是 Java / mini-kv 时，先做只读状态核对，除非用户明确授权交叉开发。
- 全局计划必须覆盖三个项目的配合关系，不能只为了 Node 自己方便连续安排版本。
- 推荐执行顺序中不使用“或/任选”这类容易误解的表达。
- 做完一个阶段后另起新 plan，不在同一份文档里长期追加已完成版本。
- 写入 Java / mini-kv 版本号前必须只读核对对应仓库最新 tag。

## 当前状态

已完成：

```text
Java v50：ops read-only window self description
mini-kv v59：runtime read self description
Node v154：operator runbook verification
Node v155：read-only window readiness packet
Node v156：read-only window live capture
Node v157：read-only window capture archive
Node v158：read-only window capture archive verification
```

Node v156 已经能在不启动上游的情况下记录 skipped evidence，也能在 operator 手动启动 Java / mini-kv 后用 `UPSTREAM_PROBES_ENABLED=true` 做只读 capture。

## 当前推荐执行顺序

```text
1. Node v157：已完成 read-only window capture archive，把 v156 live capture、v155 readiness packet、Java v50 / mini-kv v59 版本证据固化成 archive；未启动 Java / mini-kv。
2. Node v158：已完成 read-only window capture archive verification，复算 v157 archive digest，确认 skipped/mixed 不进入 production pass；未启动 Java / mini-kv。
3. Java v51 + mini-kv v60：下一步可以一起推进，只补只读 capture 后的证据解释增强；Java 补 ops evidence 字段说明，mini-kv 补 INFOJSON/STATSJSON 字段说明。
4. Node v159：read-only capture release evidence review，把 v157/v158 和上游 v51/v60 说明合成一次 release evidence review；仍保持 production operations=false。
```

## Node v157：read-only window capture archive

状态：已由 Node v157 完成。

目标：

```text
把 v156 live capture 固化成可归档证据。
```

本版本要落地：

- 引用 v156 liveCaptureDigest。
- 引用 v155 readinessPacketDigest。
- 引用 Java v50 / mini-kv v59 版本 tag。
- 输出 captureArchiveDigest。
- 明确 skipped capture 不是 production pass。
- 不启动 Java / mini-kv。

## Node v158：read-only window capture archive verification

状态：已由 Node v158 完成。

目标：

```text
复核 v157 archive，确认 capture 归档没有漂移。
```

本版本要落地：

- 复算 captureArchiveDigest。
- 校验 v156 / v155 profileVersion。
- 校验 Java v50 / mini-kv v59 版本引用。
- 校验 `UPSTREAM_ACTIONS_ENABLED=false`。
- 校验 `readyForProductionOperations=false`。

## Java v51 + mini-kv v60：只读证据解释增强

目标：

```text
让上游只读证据更容易被 Node release evidence review 解释。
```

Java v51 建议：

- 补 `ops/evidence` 字段说明。
- 补健康/自描述字段的稳定性说明。
- 不新增写操作。

mini-kv v60 建议：

- 补 INFOJSON / STATSJSON 字段说明。
- 补 read-only smoke 字段解释。
- 不新增 SET / DEL / EXPIRE 入口。

这两个版本可以一起推进，因为都只增强只读证据解释，不改交易或存储状态。

## Node v159：read-only capture release evidence review

目标：

```text
把 Node capture archive 与上游只读说明合成 release evidence review。
```

本版本要落地：

- 引用 v157 / v158 digest。
- 引用 Java v51 / mini-kv v60 说明。
- 明确 pass/skipped/mixed 的 release 语义。
- 仍保持 `readyForProductionOperations=false`。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Java replay POST 或 mini-kv 写命令。
- 需要 Node 自动启动 Java / mini-kv。
- 任何 skipped/mixed evidence 被要求当作 production pass。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
下一步先做 Node v157，把 v156 live capture 固化成 archive；随后 v158 验证 archive，再让 Java v51 + mini-kv v60 补只读证据解释。
```
