# Node v280 衍生计划：statusRoutes 质量线收口后的主流程回归

来源版本：Node v280 `statusRoutes live-probe split quality pass`。

计划状态：当前唯一有效全局计划。上一份 `docs/plans2/v274-post-disabled-candidate-echo-roadmap.md` 已完成 Java v115、mini-kv v121、Node v275-v280，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v275：approval-required boundary upstream echo verification 已完成；6 个 approval-required boundary 已在 Java v115 / mini-kv v121 上只读对齐。
Node v276-v280：statusRoutes 质量线已完成；security、deployment/connection、readiness summary、rollback、live-probe 路由已拆分。
Node v281：credential resolver approval-required implementation readiness review 已完成；已输出 6 个 boundary、18 个 required artifact、Java v116 / mini-kv v122 并行回显指引。
statusRoutes.ts：约 896 行，已低于 1200 行目标；不再继续拆 remaining real-read window route group。
```

## 推荐执行顺序

```text
1. Node v281：credential resolver approval-required implementation readiness review。已完成。
   - 回到主流程，不再做 route split。
   - 消费 Node v275 的 6 个 approval-required boundary 结论。
   - 输出每个 boundary 从“只读解释”进入“可实现前置”的缺口清单。
   - 仍不读取 credential value，不解析 raw endpoint URL，不实例化真实 resolver / secret provider，不打开 managed audit connection。
   - 仍不写 approval ledger，不执行 schema migration，不自动启动 Java / mini-kv。

2. 推荐并行：Java v116 + mini-kv v122。
   Java v116：approval-required implementation readiness echo。
   - 只读回显 Node v281 的 boundary readiness。
   - 重点说明 Java 侧哪些前置可由 operator approval / policy review / schema migration rehearsal 承担。
   - 不写 ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

   mini-kv v122：approval-required implementation non-participation readiness receipt。
   - 只读证明 mini-kv 对真实 resolver、credential value、raw endpoint、secret provider、storage backend 仍不参与。
   - 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令。

   并行理由：
   - Java v116 和 mini-kv v122 都只消费 Node v281 的只读 readiness review。
   - 两边写入不同仓库、不同职责域，不互相依赖。

3. Node v282：approval-required implementation readiness upstream echo verification。
   - 消费 Java v116 + mini-kv v122。
   - 验证三方对 6 个 approval-required boundary 的 readiness / blocked / non-participation 语义一致。
   - 仍不打开真实 resolver，不读取 credential value，不解析 raw endpoint URL。

4. Node v283：managed audit resolver implementation plan draft。
   - 只生成 implementation plan draft：接口边界、config handles、approval artifacts、failure taxonomy、rollback guard、test-only fake harness。
   - 不写真实 adapter，不发真实 HTTP/TCP，不读取 credential value。
```

## 显式质量优化项

```text
Node：
- statusRoutes 质量线已达标，后续不要继续为了版本号拆 route。
- 新增主流程 service 仍按 types / renderer / test 分层，避免 700+ 行单文件反向膨胀。
- 如果新版本需要路由，优先使用既有 JSON/Markdown route table/helper，不新增重复 format 分支。
- dashboard.ts 仍是后续质量候选，但不要和 v281-v283 主流程混成一版。

Java：
- 继续复用 echo workflow template，避免新增 600-800 行 echo support。
- Java v116 若执行，应只读回显 Node v281，不写 ledger、不执行 SQL。

mini-kv：
- mini-kv v122 若执行，应只读证明 non-participation，不进入 resolver / secret provider / credential / storage backend 链路。
- 不触碰 WAL/snapshot/restore 核心语义。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider 或真实 credential resolver client。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
v280 后 statusRoutes 拆分质量线收口；下一步回到 credential resolver / managed audit 主流程，先做 Node v281 的 approval-required implementation readiness review，再推荐并行 Java v116 + mini-kv v122，最后由 Node v282 做三方 echo verification。
```
