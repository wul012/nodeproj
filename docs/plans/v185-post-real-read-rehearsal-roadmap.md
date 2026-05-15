# Node v185 衍生全局计划：真实能力落地与 Node 技术债拆分

来源版本：Node v185 `real-read rehearsal intake`。

计划状态：当前唯一有效全局计划。上一份 `docs/plans/v182-post-rehearsal-quality-roadmap.md` 已覆盖 Node v183-v185、Java v66、mini-kv v75，并已收口；后续不再向旧计划追加重合版本。

## 阶段原则

```text
三项目已经完成证据/契约/治理层面的全面建设，下一阶段优先真实能力落地和可维护性优化，减少继续横向增加 fixture/contract。
```

本阶段仍只覆盖三项目：

```text
Java = 订单交易核心
Node = 运维控制面 / 证据链 / 受控操作入口
mini-kv = 自研 KV 基础设施实验位
```

不纳入 aiproj。

## 必须吸收的质量建议

1. **Node P0：继续加速拆分 `opsPromotionArchiveBundle.ts`。**
   v183 提取 `stableDigest.ts` 方向正确，但只完成了很小一部分。后续要按职责域拆成 5-8 个文件，例如：

```text
archive
digest
boundary
gate
report
step
validation
types
```

2. **全局方向：转向真实能力落地。**
   下一阶段不能继续主要堆 fixture/contract，应逐步进入：

```text
数据库持久化
认证中间件
真实 HTTP 调用
可控真实运行窗口
```

3. **学习 Java v66 的节奏。**
   Java v66 的 `release approval rehearsal endpoint` 是真实功能型只读 endpoint，不只是 fixture。后续 Node 和 mini-kv 也应优先做真实只读能力，再封装证据。

## 推荐执行顺序

```text
1. Node v186：opsPromotionArchiveBundle type split phase 2，已完成。
   已从巨型文件中抽出 68 个 archive bundle 相关类型到独立 types 模块；不改 endpoint、不改 profileVersion、不改 JSON/Markdown 契约。
2. Node v187：opsPromotionArchiveBundle digest payload split phase 3，已完成。
   已在 v184 边界测试保护下，把 manifest/archive/attestation digest payload helper 从巨型文件拆出；不改 digest 算法。
3. 推荐并行：Java v67 + mini-kv v76，下一步执行。
   Java v67 做 release approval rehearsal 的持久化/认证前置只读证据增强，不执行审批或 ledger 写入。
   mini-kv v76 做真实只读 HTTP/TCP smoke evidence 的结构化输出增强，不执行 LOAD/COMPACT/SETNXEX/restore。
4. Node v188：real HTTP read adapter rehearsal。
   在 Java v67 + mini-kv v76 完成后，Node 增加可关闭的真实 HTTP/TCP read adapter rehearsal；默认关闭，不自动启动上游。
```

## Node v186：opsPromotionArchiveBundle type split phase 2

状态：已完成。

目标：

```text
继续消化 Node 最大技术债，把 opsPromotionArchiveBundle 的类型定义拆到独立模块。
```

本版本要落地：

- 已新增 archive bundle types 模块：`src/services/opsPromotionArchiveBundleTypes.ts`。
- `opsPromotionArchiveBundle.ts` 已从独立 types 模块导入类型，并 re-export 原公开类型。
- 不改公开 endpoint。
- 不改 profileVersion。
- 不改 JSON/Markdown 字段。
- 不改 digest 算法。
- 已运行 typecheck、目标测试、全量测试、build，全部通过。

完成证据：

```text
c/186/图片/ops-promotion-archive-bundle-type-split-phase-2-v186.png
c/186/解释/ops-promotion-archive-bundle-type-split-phase-2-v186.md
代码讲解记录_生产雏形阶段/190-ops-promotion-archive-bundle-type-split-phase-2-v186.md
```

## Node v187：opsPromotionArchiveBundle digest payload split phase 3

状态：已完成。

目标：

```text
把 digest payload 构造从巨型文件中继续拆出，降低 archive/verification 后续维护风险。
```

本版本要落地：

- 已新增 `src/services/opsPromotionArchiveDigestPayloads.ts`，抽出 manifest/archive/attestation digest payload helper。
- 已保持 `stableDigest.ts` 的算法不变。
- 已使用 v184 新增边界测试保护 manifest digest、artifact digest、summary 和 nextActions。
- 不新增业务 surface。

完成证据：

```text
c/187/图片/ops-promotion-archive-digest-payload-split-v187.png
c/187/解释/ops-promotion-archive-digest-payload-split-v187.md
代码讲解记录_生产雏形阶段/191-ops-promotion-archive-digest-payload-split-v187.md
```

## 推荐并行：Java v67 + mini-kv v76

依赖关系：Node v187 已完成；下一步推荐并行推进 Java v67 + mini-kv v76。

Java v67 目标：

```text
在 Java v66 的真实只读 endpoint 基础上，补持久化/认证前置只读证据，例如 rehearsal request id、operator identity source、read-only audit correlation；不创建 approval decision，不写 ledger。
```

mini-kv v76 目标：

```text
在 mini-kv v75 的 restore boundary smoke manifest 基础上，补更真实的只读运行输出，例如 INFOJSON/STORAGEJSON/HEALTH 的统一 smoke result sample；不执行 LOAD/COMPACT/SETNXEX/restore。
```

## Node v188：real HTTP read adapter rehearsal

依赖关系：等待 Java v67 + mini-kv v76 完成。

目标：

```text
Node 增加可关闭的真实读取 adapter rehearsal，把 Java/mini-kv 只读能力从静态 reference 推向真实 HTTP/TCP 读取，但默认关闭。
```

本版本要落地：

- 默认 `UPSTREAM_PROBES_ENABLED=false`，不自动读上游。
- 若用户明确启动上游并开启安全环境变量，只做 GET/INFOJSON/STORAGEJSON/HEALTH 类只读读取。
- 不自动启动 Java / mini-kv。
- 不执行写操作、审批、ledger、deployment、rollback、restore。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java deployment、rollback SQL、mini-kv LOAD/COMPACT/SETNXEX、restore。
- 拆分 `opsPromotionArchiveBundle.ts` 时发现需要改公开契约。
- 真实 HTTP/TCP 读取需要用户启动另外两个项目但用户未确认。
- 对推进版本有疑惑时就暂停。

## 一句话结论

```text
v185 之后不要继续堆横向证据；先用 Node v186-v187 加速拆分最大技术债，再让 Java v67 + mini-kv v76 学习 Java v66 的真实只读能力节奏，最后由 Node v188 进入可关闭的真实读取 adapter rehearsal。
```
