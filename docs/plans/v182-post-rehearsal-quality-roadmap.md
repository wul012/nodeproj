# Node v182 衍生全局计划：从 decision rehearsal 进入质量优化与纵深运行

来源版本：Node v182 `release approval decision rehearsal packet`。

计划状态：当前计划在 v182 完成后接棒；上一份 `docs/plans/v179-post-pre-approval-roadmap.md` 覆盖 Node v180-v182、Java v64-v65、mini-kv v73-v74，完成后收口，不继续追加重合版本。

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
1. Node v183：opsPromotionArchiveBundle split phase 1，直接推进。
   只做低风险实际拆分：先抽类型、常量、digest/summary helper 或 markdown renderer 中最稳的一块；保持 endpoint、返回字段、测试契约不变。
2. Node v184：opsPromotionArchiveBundle boundary tests。
   给拆分后的 archive bundle 增加边界测试：缺字段、digest mismatch、actions enabled、identity missing，避免重构只看 typecheck。
3. 推荐并行：Java v66 + mini-kv v75。
   Java v66 只做真实运行纵深准备，例如 release approval rehearsal 的只读 endpoint 聚合，不执行审批/回滚/SQL。
   mini-kv v75 只做真实运行纵深准备，例如 restore approval boundary 的只读 smoke manifest，不执行 LOAD/COMPACT/SETNXEX。
4. Node v185：real-read rehearsal intake。
   等 Java v66 + mini-kv v75 完成后，Node 只读消费两边更接近真实运行的 evidence，生成 intake，不执行写操作。
```

## Node v183：opsPromotionArchiveBundle split phase 1

依赖关系：可直接推进。

目标：

```text
把 src/services/opsPromotionArchiveBundle.ts 从单文件巨块中拆出一块低风险模块。
```

本版本要落地：

- 不改公开 endpoint。
- 不改 profileVersion。
- 不改 JSON/Markdown 字段语义。
- 不改测试预期行为。
- 优先抽出纯类型、frozen constants、digest helper、summary helper 或 markdown renderer 中最稳的一块。
- 运行 typecheck、目标测试、全量测试和 build。

## Node v184：opsPromotionArchiveBundle boundary tests

依赖关系：等待 Node v183 完成。

目标：

```text
用边界测试保护 v183 拆分后的 archive bundle 行为。
```

本版本要落地：

- 增加缺字段测试。
- 增加 digest mismatch 测试。
- 增加 actions enabled 阻断测试。
- 增加 identity missing 或等价安全上下文测试。
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

目标：

```text
Node 读取更接近真实运行的 Java / mini-kv 只读 evidence，形成 real-read rehearsal intake。
```

本版本要落地：

- 只读消费 Java v66。
- 只读消费 mini-kv v75。
- 保持 `UPSTREAM_ACTIONS_ENABLED=false`。
- 不启动 Java / mini-kv，除非用户明确要求真实联调。
- 不执行 approval decision、ledger write、release、rollback、restore。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java deployment、rollback SQL、mini-kv LOAD/COMPACT/SETNXEX、restore。
- 拆分 `opsPromotionArchiveBundle.ts` 时发现需要改公开契约。
- 对推进版本有疑惑时就暂停。

## 一句话结论

```text
v182 之后不继续横向堆证据面；先用 Node v183-v184 处理真实技术债，再让 Java v66 + mini-kv v75 补更接近真实运行的只读 evidence，最后由 Node v185 做 real-read rehearsal intake。
```
