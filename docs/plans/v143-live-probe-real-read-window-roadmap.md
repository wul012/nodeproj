# Node v143 衍生计划：real-read smoke 执行窗口与生产证据提升

来源版本：Node v143 `production live probe real-read smoke archive adapter`。

v141-v143 已完成：

```text
operator handoff checklist
real-read smoke readiness switch
real-read smoke archive adapter
```

也就是说，Node 侧已经能把“默认 skipped 证据”整理成可交接、可开关、可归档的证据链。下一阶段重点不是继续堆 summary，而是向真实只读 smoke 和生产级 release evidence 靠近。

## 执行规则

- Codex 默认继续只负责 Node 项目 `D:\nodeproj\orderops-node`。
- 每次推进 Node 前先读取最新 plan，并判断是否轮到 Node。
- 如果计划要求 Java / mini-kv 提供真实运行证据，先只读检查它们是否已完成对应版本；缺证据时暂停说明。
- Node 可以启动自己的 HTTP smoke 和本机 Chrome 截图。
- Java / mini-kv 的启动由当前任务需要决定；如果要真实 live smoke，只允许启动读接口窗口，不做写动作。
- `UPSTREAM_ACTIONS_ENABLED=false` 必须保持为默认保护。
- 运行调试截图和解释继续写入 `b/<版本>/图片` 与 `b/<版本>/解释`。
- 代码讲解继续写入 `代码讲解记录_生产雏形阶段/`，讲解模式不变。
- 小 check 不再单独做 summary 版本；只有阶段收口才做阶段总汇总。

## 推荐执行顺序

```text
1. Node v144：real-read smoke execution request + operator command profile
2. Node v145：real-read smoke result importer，把真实 pass/skipped 输出和 v143 adapter 对齐
3. Node v146：real-read smoke release evidence gate，判断是否可作为生产通过证据
4. Java / mini-kv：仅当 v145/v146 需要真实 pass 证据时，再启动读接口并补各自证据版本
```

这四步的意思不是三个项目一起乱改。Node 先把真实执行请求和导入格式做好；如果需要 pass 证据，再让 Java / mini-kv 配合启动并补 evidence。

## Node v144：real-read smoke execution request + operator command profile

状态：已由 Node v144 完成。

目标：

```text
把“如何运行真实只读 smoke”固化成可审阅的执行请求和命令 profile。
```

本版要落地：

- 新增只读 endpoint，输出真实 smoke 执行请求。
- 明确需要的环境变量：
  - `UPSTREAM_PROBES_ENABLED=true`
  - `UPSTREAM_ACTIONS_ENABLED=false`
  - Java / mini-kv 均由用户显式启动
- 输出 operator command profile，但不自动启动 Java / mini-kv。
- 继续引用 v143 adapter digest。

## Node v145：real-read smoke result importer

状态：已由 Node v145 完成。

目标：

```text
允许把一次真实只读 smoke 的结果导入为标准 evidence input。
```

本版要落地：

- 定义 pass/skipped smoke result import schema。
- 对齐 v143 archive adapter 的 record 结构。
- 默认仍可导入 skipped 样本。
- 不做 Java replay，不做 mini-kv 写命令。

## Node v146：real-read smoke release evidence gate

状态：已由 Node v146 完成。

目标：

```text
判断导入或现场生成的 smoke evidence 是否能成为 production pass evidence。
```

本版要落地：

- 检查所有 probe 是否 pass。
- 检查 `UPSTREAM_PROBES_ENABLED=true` 是否与证据一致。
- 检查 `UPSTREAM_ACTIONS_ENABLED=false` 是否贯穿全程。
- 如果任何 skipped/mixed，输出不可作为 production pass。
- 这是阶段 gate，不是新的 summary 流水账。

## Java / mini-kv 何时介入

只有当 Node v145/v146 需要真实 pass evidence 时，才建议启动另外两个项目。

允许：

```text
Java GET /actuator/health
Java GET /api/v1/ops/overview
mini-kv HEALTH
mini-kv INFOJSON
mini-kv STATSJSON
```

禁止：

```text
Java replay POST
Java order mutation POST
mini-kv SET / DEL / EXPIRE / FLUSH
UPSTREAM_ACTIONS_ENABLED=true
```

如果 Java / mini-kv 缺少只读证据字段，再分别开它们自己的小版本补齐，不在 Node 版本里混改。

## 暂停条件

- 需要真实数据库账号、连接串、生产 audit service 凭据。
- 需要真实 IdP、JWKS URL、client secret 或生产登录配置。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v144-v146 继续由 Node 把真实只读 smoke 的执行请求、结果导入和 release gate 做扎实；Java / mini-kv 只在需要真实 pass evidence 时介入。
```
