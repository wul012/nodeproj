# Node v99 衍生计划：生产硬缺口落地阶段

## 来源版本

```text
本计划由 Node v99 衍生。
v99 已新增 /api/v1/production/readiness-summary-v2，
并把生产阻塞项收敛为 upstream-observability、audit、access-control、execution-safety 四类。
```

v99 判断：

```text
upstream-observability: ready=true
audit: ready=false
access-control: ready=false
execution-safety: ready=true
readyForProductionOperations=false
```

## 执行规则

- 目标继续靠近生产级，不满足于只读报告堆叠。
- Node 版本推进前必须先读取本计划。
- 我负责 Node；Java / mini-kv 只做只读完成度核对和方向提示，除非用户明确授权交叉开发。
- 每次推进 Node 前仍要只读检查 Java / mini-kv 当前是否干净、是否已有计划依赖的样本或 tag。
- 每个版本保持一个合理小闭环：要有工程行为、测试、运行调试、截图、归档和代码讲解。
- 运行调试截图默认使用本机 Chrome / Chromium；不默认触发 Playwright 浏览器下载。

## 推荐执行顺序

```text
1. Node v100：access policy map + request identity contract
2. Node v101：access guard dry-run middleware + protected-route readiness test
3. Node v102：audit store factory wiring for file mode，不接数据库
4. Java v47 + mini-kv v56：可以一起推进，补生产证据解释增强
5. Node v103：production readiness summary v3，复查 access / audit 进度
```

这里不写“或”。如果只推进 Node，则按 v100 -> v101 -> v102 顺序做；Java / mini-kv 是后续可并行批次，不阻塞前三个 Node 版本。

## 具体版本说明

### Node v100：access policy map + request identity contract

目标：

```text
先定义访问控制契约，不直接引入完整登录系统。
```

本版要落地：

- 新增 route policy map，覆盖 readiness、audit、intent、approval、archive 等 route group。
- 新增 request identity contract，定义 operatorId、roles、authSource、authenticated。
- 新增只读 endpoint 输出当前 policy 和 identity contract。
- 不真正拦截请求，不要求登录，不读取 secret。

实施收口：

```text
已完成。
endpoint: /api/v1/security/access-policy
archive: a/100/
code notes: 代码讲解记录/104-access-policy-profile-v100.md
tag: v100
```

### Node v101：access guard dry-run middleware + protected-route readiness test

目标：

```text
把访问控制从“报告”推进到“可验证的中间件 dry-run”。
```

本版要落地：

- 新增 access guard middleware，但默认只 dry-run 标记，不阻断现有请求。
- 在 response 或 audit context 中记录 route group、requiredRole、matchedRoles、wouldDeny。
- 增加 protected-route readiness 测试，确认 audit/mutation 路由都有 policy 覆盖。
- 不启用真实登录，不把 production-ready 改成 true。

实施收口：

```text
已完成。
endpoint: /api/v1/security/access-guard-readiness
runtime evidence: x-orderops-access-* dry-run headers
archive: a/101/
code notes: 代码讲解记录/105-access-guard-dry-run-v101.md
tag: v101
```

### Node v102：audit store factory wiring for file mode

目标：

```text
把 audit store 从“有原型”推进到“可由配置选择 file 模式”，但仍不接生产数据库。
```

本版要落地：

- 新增 audit store factory，根据 `AUDIT_STORE_KIND=memory|file` 选择 store。
- `AUDIT_STORE_KIND=file` 时要求 `AUDIT_STORE_PATH`。
- 补 file store restart/reload 测试。
- `/api/v1/audit/store-profile` 能反映运行时是否使用 file-backed store。
- 不接 PostgreSQL，不处理加密/备份/轮转，仍不声明 production-ready。

实施收口：

```text
已完成。
runtime: AUDIT_STORE_KIND=memory|file
file mode: AUDIT_STORE_PATH required
archive: a/102/
code notes: 代码讲解记录/106-audit-store-factory-file-runtime-v102.md
tag: v102
```

### Java v47 + mini-kv v56：生产证据解释增强

目标：

```text
给 Node v103 提供更稳定的上游说明证据。
```

可以一起推进：

- Java v47：补 replay audit evidence 的说明 endpoint 或 README sample index。
- mini-kv v56：补 recovery evidence 的说明 endpoint / fixture index。

本批次不要求 Node 直接修改 Java 或 mini-kv；如果用户只推进 Node，可先跳过。

### Node v103：production readiness summary v3

目标：

```text
复查 v100-v102 之后 access-control 与 audit 两类阻塞是否减少。
```

本版要落地：

- 汇总 v100-v102 新证据。
- 输出 access-control policy coverage、guard dry-run coverage、audit store runtime kind。
- 继续保持 `UPSTREAM_ACTIONS_ENABLED=false`。
- 若 audit 或 access-control 仍有阻塞，保持 `readyForProductionOperations=false`。

实施收口：

```text
已完成。
endpoint: /api/v1/production/readiness-summary-v3
evidence: Java v47 replay evidence index + mini-kv v56 recovery fixture index
access: policy coverage ready, guard still dry-run
audit: runtime kind visible, file mode selectable, production audit still blocked
archive: a/103/
code notes: 代码讲解记录/107-production-readiness-summary-v3-v103.md
tag: v103
```

## 后续计划

v103 已完成本计划的最后一个 Node 版本。后续不在本文件继续叠加，另起：

```text
docs/plans/v103-production-auth-audit-roadmap.md
```

## 暂停条件

- 需要真实登录密钥、JWT secret、数据库凭据或生产服务器。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要把 mini-kv 作为订单权威存储。
- 需要一次性跨三个仓库做强耦合改造。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v99 之后不要继续只增加 readiness 报告。
下一阶段优先把 access-control 从报告推进到 policy/guard，把 audit 从原型推进到可配置 file runtime；
完成这两块后，再用 Node v103 做新的生产就绪度复查。
```
