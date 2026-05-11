# Node v59 衍生后受控执行预演推进计划

来源版本：

```text
Node v59：Operation preflight evidence bundle，把 intent、policy、confirmation、dispatch history、Java replay readiness 和 mini-kv evidence 汇总成统一预检证据包。
```

上一阶段已完成：

```text
Java v38：失败事件 replay readiness / dry-run plan
mini-kv v47：KEYSJSON key inventory
Node v57：Java failed-event replay readiness 接入
Node v58：mini-kv KEYSJSON key inventory 面板
Node v59：Operation preflight evidence bundle
```

下一阶段目标不是直接开启真实执行，而是把“预检证据”推进到“可复核报告 + 更细的上游 dry-run 依据”：

```text
Node 先把 preflight 固化成可读报告和摘要
Java 再补 replay simulation，让 Node 看见 replay 可能产生的影响
mini-kv 再补 command explain，让 Node 看见 raw command 风险
Node 最后把这些 evidence 合并成 operation execution preview
```

## 通用规则

每次推进 Node 自己版本前，先读取 `docs/plans/` 最新计划，并按当前计划执行。

每个版本继续保留：

```text
a/<版本>/解释/说明.md
a/<版本>/图片/
代码讲解记录/<编号>-<主题>.md
```

每版尽量至少一张能证明核心能力跑过的截图。没有截图时，必须在说明里写明原因。

跨项目计划写法规则：

```text
不要用二选一式的模糊表述，避免读起来像只能做一个项目。
如果多个项目可以同时推进，明确写成“可并行独立推进”。
如果 Node 后续需要统一接入，单独写下一版 Node 的集成目标。
```

## 第一批：Node v60 可直接推进

Node v60 不依赖 Java / mini-kv 新版本，可以直接基于 v59 继续做。

### Node v60：Preflight Markdown report + digest

目标：

```text
把 v59 的 JSON preflight bundle 渲染成 Markdown 报告，并生成 digest，方便人工审阅、归档和后续验证。
```

建议 endpoint：

```text
GET /api/v1/operation-intents/:intentId/preflight/report
GET /api/v1/operation-intents/:intentId/preflight/report?format=markdown
GET /api/v1/operation-intents/:intentId/preflight/verification
```

建议内容：

- intent summary
- policy / confirmation
- safety flags
- dispatch history summary
- Java readiness evidence summary
- mini-kv command / key inventory evidence summary
- hard blockers
- warnings
- recommended next actions
- `preflightDigest`

本版不做：

- 不执行真实上游动作
- 不把报告写入数据库
- 不改 Java / mini-kv
- 不做多 intent 批量报告

验证：

- Node typecheck/test/build
- 创建 intent + confirm + dry-run + report smoke
- 默认安全环境 smoke：`UPSTREAM_ACTIONS_ENABLED=false`
- Markdown 或 JSON 截图

完成标准：

```text
任意 intent 都能生成可读 preflight report，并能用 digest 复核报告来源 bundle。
```

## 第二批：Java v39 + mini-kv v48 可以一起推进

这两个版本互不依赖。它们都只提供更细的 dry-run / explain 依据，不做真实业务写入。

### Java v39：Failed-event replay simulation

目标：

```text
在 Java 侧新增 failed-event replay simulation，让 Node 在真实 replay 前能看见预计影响和阻断原因。
```

建议 endpoint：

```text
GET /api/v1/failed-events/{id}/replay-simulation
```

建议字段：

```text
sampledAt
failedEventId
exists
eligibleForReplay
wouldReplay
wouldPublishOutbox
wouldChangeManagementStatus
requiredApprovalStatus
idempotencyKeyHint
expectedAggregateId
expectedSideEffects[]
blockedBy[]
warnings[]
nextAllowedActions[]
```

本版不做：

- 不执行 replay
- 不创建 approval
- 不修改 failed-event 状态
- 不调用 Node
- 不依赖 mini-kv

验证：

- Java compile/test
- 不存在 ID smoke
- 有测试数据时，覆盖一个 failed event simulation
- 截图保存 JSON 或终端输出

### mini-kv v48：Command EXPLAINJSON

目标：

```text
新增 EXPLAINJSON <command>，让 Node 在执行 raw command 前得到结构化风险解释。
```

建议命令：

```text
EXPLAINJSON GET orderops:1
EXPLAINJSON SET orderops:1 value
EXPLAINJSON DEL orderops:1
```

建议响应：

```json
{
  "command": "SET",
  "category": "write",
  "mutates_store": true,
  "touches_wal": true,
  "key": "orderops:1",
  "requires_value": true,
  "ttl_sensitive": false,
  "allowed_by_parser": true,
  "warnings": []
}
```

本版不做：

- 不执行被 explain 的命令
- 不做 ACL
- 不做事务
- 不新增后台扫描
- 不让 mini-kv 承担订单权威存储

验证：

- CMake configure/build
- CTest
- TCP smoke：`EXPLAINJSON SET orderops:1 value`
- 截图保存终端输出

## 第三批：Node v61 等 Java v39 或 mini-kv v48 后推进

Node v61 可以分支执行：

```text
如果 Java v39 先完成 -> 先接 Java replay simulation
如果 mini-kv v48 先完成 -> 先接 mini-kv EXPLAINJSON
如果两者都完成 -> 同版合并，但只做 operation preview，不做真实执行
```

### Node v61：Operation execution preview

目标：

```text
在 v59 preflight 和 v60 report 基础上，新增 execution preview，把 Java simulation / mini-kv explain 合并成一次更接近真实操作前的预演。
```

建议 endpoint：

```text
GET /api/v1/operation-intents/:intentId/execution-preview
```

建议内容：

- preflight digest
- Java replay simulation evidence
- mini-kv command explain evidence
- would-call upstream summary
- expected side effects
- operator confirmation status
- final blockers / warnings

本版不做：

- 不真实执行 replay
- 不真实执行 mini-kv raw command
- 不批量处理多个 intent
- 不绕过 Java / mini-kv 自己的安全规则

验证：

- Node typecheck/test/build
- 默认安全 smoke
- mock Java / mock mini-kv preview smoke
- HTTP JSON 或 Dashboard 截图

## 第四批：Node v62 再考虑受控审批记录

Node v62 建议在 v60 和 v61 完成后再做。

### Node v62：Operation approval request ledger

目标：

```text
把 preflight report 和 execution preview 绑定成一个本地 approval request，但仍然不执行真实上游动作。
```

建议 endpoint：

```text
POST /api/v1/operation-approval-requests
GET  /api/v1/operation-approval-requests
GET  /api/v1/operation-approval-requests/:requestId
```

建议字段：

```text
requestId
intentId
preflightDigest
previewDigest
requestedBy
reviewer
status=pending|approved|rejected|expired
decisionReason
createdAt
updatedAt
```

本版不做：

- 不执行真实上游动作
- 不接登录系统
- 不做持久化数据库
- 不允许 approval 自动触发 dispatch

## 第五批：由 Node v62 衍生的后续小版本

Node v62 完成后，下一批继续沿着“审批证据链”推进。每版仍然只做一个小闭环，不把真实执行、登录系统、数据库持久化塞进同一版。

### Node v63：Approval decision record

目标：

```text
为 v62 的 approval request 增加本地 decision 记录，让 reviewer 能显式 approve / reject，但仍然不执行真实上游动作。
```

建议 endpoint：

```text
POST /api/v1/operation-approval-requests/:requestId/decision
GET  /api/v1/operation-approval-decisions
GET  /api/v1/operation-approval-decisions/:decisionId
```

建议字段：

```text
decisionId
requestId
intentId
previewDigest
decision=approved|rejected
reviewer
reason
createdAt
decisionDigest
```

本版不做：

- 不执行 Java replay
- 不执行 mini-kv 写命令
- 不做多人权限系统
- 不接数据库

Node v63 实施收口：

```text
已按本节实现本地 decision ledger、decision digest、request status 更新、Markdown 查询和 Dashboard approve/reject 入口。
仍然保持 upstreamTouched=false，不连接真实执行。
```

### Node v64：Approval evidence report + verification

目标：

```text
把 approval request 和 decision 合并成可归档 Markdown/JSON 证据报告，并提供 digest verification。
```

建议 endpoint：

```text
GET /api/v1/operation-approval-requests/:requestId/evidence
GET /api/v1/operation-approval-requests/:requestId/evidence?format=markdown
GET /api/v1/operation-approval-requests/:requestId/verification
```

本版不做：

- 不新增真实执行入口
- 不合并 promotion archive 主线
- 不修改 Java / mini-kv

Node v64 实施收口：

```text
已按本节实现 approval evidence report、Markdown 输出、digest verification 和 Dashboard evidence/verify 入口。
本版只使用 Node v62/v63 本地证据，不等待 Java v40 与 mini-kv v49，不新增真实执行入口。
```

### Java v40：Replay approval read model

目标：

```text
Java 侧只补只读 failed-event approval read model，让 Node 后续能确认 Java 自己看到的审批状态。
```

建议 endpoint：

```text
GET /api/v1/failed-events/{id}/approval-status
```

本版不做：

- 不让 Java 调用 Node
- 不执行 replay
- 不引入 mini-kv

### mini-kv v49：EXPLAINJSON coverage hardening

目标：

```text
mini-kv 侧补齐 EXPLAINJSON 对 TTL / EXPIRE / admin/meta 命令的解释覆盖，让 Node approval evidence 更完整。
```

本版不做：

- 不新增事务
- 不新增 ACL
- 不让 mini-kv 承担订单权威存储

## 推荐执行顺序

```text
1. Node v60：preflight report + digest，可直接推进
2. Java v39 + mini-kv v48：可并行独立推进；两者都完成后，Node v61 统一接 execution preview
   - 如果实际只先完成其中一个，Node v61 可以先接已完成部分，另一个完成后再补接
3. Node v61：接入 Java v39 与 mini-kv v48 的 execution preview 证据
4. Node v62：approval request ledger，仍不做真实执行
5. Node v63：approval decision record，先把本地审批决定闭环补齐
6. Node v64 + Java v40 + mini-kv v49：可并行独立推进
   - Node v64：只使用 Node v62/v63 本地证据，生成 approval evidence report + verification
   - Java v40：只做 failed-event approval-status 只读接口
   - mini-kv v49：只做 EXPLAINJSON 覆盖增强
7. Node v65：统一接入 Java v40 与 mini-kv v49 的新增上游证据
```

当前阶段最推荐的并行包：

```text
Node v64：由 Node 侧继续推进
Java v40：由 Java 项目侧推进
mini-kv v49：由 mini-kv 项目侧推进
```

三者互不阻塞。Node v64 不等待 Java v40 和 mini-kv v49；Java v40 与 mini-kv v49 完成后，由 Node v65 统一接入新增证据。

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 默认开启真实上游写动作
- 需要 Node 调用 Java replay / approval 的 POST 接口
- 需要 Node 直接执行 mini-kv 写命令
- 需要 mini-kv 变成订单、库存、支付的权威存储
- 需要单个版本同时大改 Java、Node、mini-kv 三个项目
- 对 replay simulation、EXPLAINJSON 或 approval request 的语义有疑惑

## 一句话结论

```text
v60-v62 继续只做“证据、预演、审批记录”，先把真实执行前的控制面闭环做扎实。
```
