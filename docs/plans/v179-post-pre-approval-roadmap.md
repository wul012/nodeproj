# Node v179 衍生全局计划：从生产发布 pre-approval 进入审批决定前的证据补齐

来源版本：Node v179 `production release pre-approval packet`。

计划状态：已完成并收口；上一份 `docs/plans/v176-post-ci-evidence-hardening-roadmap.md` 已完成 Node v177-v179、Java v63、mini-kv v72 并收口。本计划覆盖到 Node v182，不再继续追加重合版本，由 `docs/plans/v182-post-rehearsal-quality-roadmap.md` 接续。

## 计划接力规则

- 每次推进前先读取最新 plan，并判断当前步骤属于哪个项目。
- Codex 默认负责 Node；当下一步是 Java / mini-kv 时，只读核对状态，用户明确要求推进时再交叉开发。
- 能并行的 Java / mini-kv 同阶段版本必须明确写成“推荐并行”。
- 推荐执行顺序不使用“或/任选”。
- 每个版本必须形成一个合理小闭环，不只做零散字段或单纯流水账 summary。
- 下一次另起新 plan 时必须加入实际优化版本，优先拆分 `src/services/opsPromotionArchiveBundle.ts`；该文件当前约 8389 行，属于严重技术债，优化必须落到代码结构，不只写说明文档。
- 新版本运行截图和解释默认写入 `c/<版本>/`。
- 代码讲解写入 `代码讲解记录_生产雏形阶段/`。
- 需要真实生产密钥、生产数据库、生产 IdP、真实发布、真实回滚、真实恢复权限时暂停。

## 当前状态

已完成：

```text
Node v177：CI operator identity evidence packet
Java v63：release audit retention fixture
mini-kv v72：restore evidence retention fixture
Node v178：cross-project evidence retention gate
Node v179：production release pre-approval packet
Java v64：release operator signoff fixture
mini-kv v73：retained restore artifact digest fixture
Node v180：approval decision prerequisite gate
Node v181：approval ledger dry-run envelope
Java v65：rollback approver evidence fixture
mini-kv v74：restore approval boundary fixture
Node v182：release approval decision rehearsal packet
```

当前仍不授权生产发布或回滚：

```text
UPSTREAM_ACTIONS_ENABLED=false
Node v179 只生成 pre-approval packet
Node 不创建 approval decision
Node 不写 approval ledger
Node 不启动 Java / mini-kv
Java rollback SQL 仍需要人工审批
mini-kv restore 仍不是 Java order authority
```

## 下一阶段方向

下一阶段目标不是直接发布，而是把 v179 暴露出的 missing evidence 拆给三个项目补齐：

```text
pre-approval packet -> approval decision prerequisites -> release decision rehearsal
```

重点回答三个问题：

```text
真实审批决定前还缺哪些人工确认？
Java 侧能否给出更稳定的 release operator signoff evidence？
mini-kv 侧能否给出更稳定的 retained artifact digest evidence？
```

## 当前推荐执行顺序

```text
1. 推荐并行：Java v64 + mini-kv v73，已完成。
   Java v64 做 release operator signoff fixture，只读记录 release operator、rollback approver、release window、artifact target，不执行 deployment / rollback / SQL。
   mini-kv v73 做 retained restore artifact digest fixture，只读记录 restore artifact digest、Snapshot/WAL review digest、retention owner，不执行 LOAD / COMPACT / SETNXEX / restore。
2. Node v180：approval decision prerequisite gate，已完成；等待 Java v64 + mini-kv v73 完成后推进；消费 v179 + 两边新 fixture，判断是否满足“可以进入审批决定 dry-run envelope”的前置条件，但仍不创建 approval decision。
3. Node v181：approval ledger dry-run envelope，已完成；等待 Node v180 完成后推进；只设计 approval ledger 写入前的 dry-run envelope，不写真实 ledger，不发布。
4. 推荐并行：Java v65 + mini-kv v74，下一步推进。
   Java v65 做 rollback approver evidence fixture，补 rollback approver、migration direction、SQL/no-SQL boundary 的只读证据。
   mini-kv v74 做 restore approval boundary fixture，补 restore approver、restore target、order-authority=false 的只读证据。
5. Node v182：release approval decision rehearsal packet，等待 Node v181、Java v65、mini-kv v74 完成后再做；只生成 rehearsal packet，不创建真实 approval decision。
```

## 并行依赖说明

```text
Java v64 与 mini-kv v73 推荐并行，因为两者都只补 v179 missing evidence 的只读 fixture，不互相调用。
Node v180 必须等待 Java v64 + mini-kv v73 + Node v179 完成后再做。
Node v181 只依赖 Node v180，不依赖新的上游版本，已完成。
Java v65 与 mini-kv v74 推荐并行，因为两者都只补 rollback/restore approval boundary fixture。
Node v182 必须等待 Node v181 + Java v65 + mini-kv v74 完成后再做。
```

## Java v64：release operator signoff fixture

并行关系：推荐与 mini-kv v73 并行推进。

完成状态：已完成，并由 Java v64 tag 固化。

目标：

```text
补 release operator signoff 的只读 fixture，供 Node v180 判断审批决定前置条件。
```

本版本要落地：

- 记录 release operator、rollback approver、release window、artifact target。
- 记录 operator signoff placeholder，不记录 secret value。
- 明确 fixture 不执行 deployment、rollback 或 SQL。

## mini-kv v73：retained restore artifact digest fixture

并行关系：推荐与 Java v64 并行推进。

完成状态：已完成，并由 mini-kv v73 tag 固化。

目标：

```text
补 retained restore artifact digest 的只读 fixture，供 Node v180 判断保留证据是否更接近真实审批输入。
```

本版本要落地：

- 记录 restore artifact digest placeholder、Snapshot review digest、WAL review digest、retention owner。
- 记录 restore target placeholder 和 order_authoritative=false。
- 明确 fixture 不执行 LOAD、COMPACT、SETNXEX 或 restore。

## Node v180：approval decision prerequisite gate

依赖关系：必须等待 Java v64、mini-kv v73、Node v179 都完成后推进。

完成状态：已完成并由 Node v180 tag 固化。

目标：

```text
判断是否满足进入 approval decision 版本的前置条件，但不创建 approval decision。
```

本版本要落地：

- 已引用 Node v179 pre-approval packet。
- 已引用 Java v64 release operator signoff fixture。
- 已引用 mini-kv v73 retained restore artifact digest fixture。
- 已输出 JSON/Markdown gate。
- 已明确不创建 approval decision、不写 approval ledger、不发布。

## Node v181：approval ledger dry-run envelope

依赖关系：必须等待 Node v180 完成后推进。

完成状态：已完成并由 Node v181 tag 固化。

目标：

```text
形成 approval ledger 写入前的 dry-run envelope。
```

本版本要落地：

- 已引用 Node v180 prerequisite gate。
- 已设计 approval ledger candidate fields、idempotency key、audit context、rollback boundary。
- 已输出 dry-run JSON/Markdown。
- 已明确不写真实 ledger，不调用上游，不发布。

## Java v65：rollback approver evidence fixture

并行关系：推荐与 mini-kv v74 并行推进。

目标：

```text
补 rollback approver 和 SQL/no-SQL boundary 的只读证据。
```

本版本要落地：

- 记录 rollback approver placeholder。
- 记录 migration direction 和 SQL execution allowed=false。
- 记录 production database boundary，不连接数据库。

## mini-kv v74：restore approval boundary fixture

并行关系：推荐与 Java v65 并行推进。

目标：

```text
补 restore approval boundary，只读说明 restore 不属于 Java 订单权威存储。
```

本版本要落地：

- 记录 restore approver placeholder。
- 记录 restore target placeholder。
- 记录 order_authoritative=false 和 Java transaction chain disconnected。
- 明确不执行 restore。

## Node v182：release approval decision rehearsal packet

依赖关系：必须等待 Node v181、Java v65、mini-kv v74 都完成后推进。

完成状态：已完成并由 Node v182 tag 固化。

目标：

```text
生成 release approval decision rehearsal packet，但不创建真实 approval decision。
```

本版本要落地：

- 已引用 Node v181 dry-run envelope。
- 已引用 Java v65 rollback approver evidence fixture。
- 已引用 mini-kv v74 restore approval boundary fixture。
- 已输出 rehearsal packet。
- 已明确不写 approval ledger，不执行 release/deployment/rollback/restore。

## 下一次计划必须加入的实际优化

下一次另起新 plan 时，除业务版本外，必须安排 Node 实际优化版本，并把质量修复写成可执行任务：

```text
Node 优化版：拆分 src/services/opsPromotionArchiveBundle.ts
```

原因：

```text
该文件当前约 8389 行，已经属于严重技术债。
```

优化要求：

- 先做低风险纵向拆分，不做大重构。
- 优先抽出纯类型、fixture/contract 常量、digest/summary helper、markdown render helper。
- 保持现有公开 endpoint 和测试契约不变。
- 本优化必须落到代码结构和测试验证，不能只写文档。
- 如果业务推进和拆分冲突，先做最小可验证拆分，再继续业务版本。

下一次 plan 还必须纳入这些可执行质量优化项：

- 文件膨胀治理：优先拆 `opsPromotionArchiveBundle.ts`；后续 top 大文件超过约 800 行的，按风险分批抽 helper / constants / renderer / fixtures。
- 命名膨胀治理：新模块和新 endpoint 命名必须更短，避免继续出现 70-90 字符级别的类型名、路径名和文件名。
- 版本粒度治理：减少一天内连续堆 10+ 个横向 contract/fixture 版本；每个版本必须有独立工程收益，summary 类版本优先合并。
- 测试覆盖治理：在保持现有 128 个测试文件稳定的前提下，为关键 gate 增加边界测试，例如缺字段、digest mismatch、actions enabled、identity missing。
- 纵深优先原则：三项目体量已可观，下一阶段优先真实运行、可维护性、持久化/真实 HTTP 调用/端到端演练，不再只横向扩展 contract/fixture。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java deployment、Java rollback SQL、mini-kv LOAD/COMPACT/SETNXEX、或任何真实发布/回滚/恢复命令。
- 需要读取 secret value，而不是只记录 secret source。
- 需要把 mini-kv 写入订单核心一致性链路。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v179 已经把 release pre-approval packet 做成只读审查输入；Node v181 已完成 approval ledger dry-run envelope；下一步推荐并行 Java v65 + mini-kv v74，补 rollback/restore approval boundary 后再让 Node v182 生成 decision rehearsal packet。
```
