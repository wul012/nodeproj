# Node v182 衍生全局计划：从 decision rehearsal 进入质量优化与纵深运行

来源版本：Node v182 `release approval decision rehearsal packet`。

计划状态：已完成并收口。上一份 `docs/plans/v179-post-pre-approval-roadmap.md` 覆盖 Node v180-v182、Java v64-v65、mini-kv v73-v74，完成后收口，不继续追加重合版本。本计划覆盖 Node v183-v185、Java v66、mini-kv v75：Node v183-v184 已完成第一轮实际优化与边界测试，Java v66 + mini-kv v75 已推荐并行完成，Node v185 已消费两边证据形成 real-read rehearsal intake。后续不继续写回本文件，改由 `docs/plans/v185-post-real-read-rehearsal-roadmap.md` 接续。

## 阶段原则

```text
三项目体量已可观，下一阶段优先纵深真实运行与可维护性优化，减少单纯横向 contract/fixture 扩张。
```

本阶段仍保持三项目边界：

```text
Java = 订单交易核心
Node = 运维控制面 / 证据链 / 受控操作入口
mini-kv = 自研 KV 基础设施实验位
```

不纳入 aiproj。

## 当前质量判断

Node 当前质量大约是 B+：

- 类型安全和安全边界较好。
- readOnly / executionAllowed / mutation boundary 基本硬编码保护。
- 跨项目集成方向清晰。
- 但文件膨胀和命名膨胀已经明显。
- `src/services/opsPromotionArchiveBundle.ts` 约 8389 行，是严重技术债。
- summary / fixture / contract 版本粒度需要收紧。

## 推荐执行顺序

```text
1. Node v183：opsPromotionArchiveBundle split phase 1，已完成。
   已抽出 `src/services/stableDigest.ts`，把稳定 JSON 序列化和 sha256 digest 从 `opsPromotionArchiveBundle.ts` 移出；endpoint、返回字段、测试契约不变。
2. Node v184：opsPromotionArchiveBundle boundary tests，已完成。
   已给拆分后的 archive bundle 增加真实边界测试：manifest digest corruption、artifact digest mismatch、missing artifact、summary/nextActions drift。该模块本身不负责 actions enabled / identity missing，所以不做伪测试。
3. 推荐并行：Java v66 + mini-kv v75。
   Java v66 只做真实运行纵深准备，例如 release approval rehearsal 的只读 endpoint 聚合，不执行审批/回滚/SQL。
   mini-kv v75 只做真实运行纵深准备，例如 restore approval boundary 的只读 smoke manifest，不执行 LOAD/COMPACT/SETNXEX。
4. Node v185：real-read rehearsal intake。
   已完成。Node 只读消费 Java v66 与 mini-kv v75 的真实运行纵深 evidence，生成 intake，不执行写操作。
```

## Node v183：opsPromotionArchiveBundle split phase 1

依赖关系：可直接推进。

完成状态：已完成。

目标：

```text
把 src/services/opsPromotionArchiveBundle.ts 从单文件巨块中拆出一块低风险模块。
```

本版本要落地：

- 不改公开 endpoint。
- 不改 profileVersion。
- 不改 JSON/Markdown 字段语义。
- 不改测试预期行为。
- 已抽出 `digestStable()` / `stableJson()` 到 `src/services/stableDigest.ts`。
- 已新增 `test/stableDigest.test.ts` 锁住排序序列化和 `undefined -> null` 的既有 archive digest 语义。
- 已运行 typecheck、目标测试、全量测试和 build。

## Node v184：opsPromotionArchiveBundle boundary tests

依赖关系：等待 Node v183 完成。

完成状态：已完成。

目标：

```text
用边界测试保护 v183 拆分后的 archive bundle 行为。
```

本版本要落地：

- 已增加缺 artifact 测试。
- 已增加 manifest digest corruption 测试。
- 已增加 artifact digest mismatch 测试。
- 已增加 summary / nextActions drift 测试。
- 说明：`opsPromotionArchiveBundle` 是纯 archive/verification 模块，不负责 actions enabled 或 identity missing；这两类边界由 access/production gate 类模块覆盖，v184 不把它们硬塞进 archive bundle。
- 不新增业务 surface。

## 推荐并行：Java v66 + mini-kv v75

依赖关系：等待 Node v184 完成后再并行推进更顺。

Java v66 目标：

```text
补 release approval rehearsal 的只读运行聚合入口，不执行审批、不写 ledger、不回滚、不执行 SQL。
```

mini-kv v75 目标：

```text
补 restore approval boundary 的只读 smoke manifest，不执行 LOAD/COMPACT/SETNXEX，不接入 Java 交易链路。
```

## Node v185：real-read rehearsal intake

依赖关系：等待 Java v66 + mini-kv v75 完成。

完成状态：已完成。

目标：

```text
Node 读取更接近真实运行的 Java / mini-kv 只读 evidence，形成 real-read rehearsal intake。
```

本版本要落地：

- 已只读消费 Java v66。
- 已只读消费 mini-kv v75。
- 已保持 `UPSTREAM_ACTIONS_ENABLED=false`。
- 已明确不启动 Java / mini-kv。
- 已明确不执行 approval decision、ledger write、release、rollback、restore。

## v185 后续优化规则

用户重点关注项已纳入下一阶段计划：

```text
1. Node P0：opsPromotionArchiveBundle.ts 必须继续加速拆分。v183 只抽出 stableDigest.ts 是正确方向，但拆分比例仍很低，后续应按职责域拆为 archive、digest、boundary、gate、report、step、validation、types 等 5-8 个模块。
2. 全局方向：三项目已完成证据/契约/治理层建设，下一阶段必须转向真实能力落地，包括数据库持久化、认证中间件、真实 HTTP 调用和可控真实运行窗口，而不是继续横向增加 fixture/contract。
3. Java 节奏：Java v66 的 release approval rehearsal endpoint 是好方向，它是真实功能型只读 endpoint，不只是 fixture。后续 Node 和 mini-kv 的设计也应学习这个节奏：优先真实只读能力，再封装证据。
```

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java deployment、rollback SQL、mini-kv LOAD/COMPACT/SETNXEX、restore。
- 拆分 `opsPromotionArchiveBundle.ts` 时发现需要改公开契约。
- 对推进版本有疑惑时就暂停。

## 一句话结论

```text
v182 之后不继续横向堆证据面；Node v183-v184 已处理第一轮真实技术债，Java v66 + mini-kv v75 已补更接近真实运行的只读 evidence，Node v185 已完成 real-read rehearsal intake。下一阶段由 v185 新计划接续：继续拆分 Node 巨型文件，并推动真实能力落地。
```
