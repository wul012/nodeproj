# Node v296 衍生计划：disabled runtime shell upstream echo verification 之后

来源版本：Node v296 `credential resolver disabled runtime shell upstream echo verification`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v295-post-disabled-runtime-shell-design-review-roadmap.md` 已完成 Node v296，并修正 Java v132/v133 的版本对齐偏差；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v295：disabled runtime shell design review 已完成；原计划写 Java v132 + mini-kv v130。
Java v132：实际是质量优化，不是 disabled runtime shell handoff echo。
Java v133：disabled runtime shell handoff echo 已完成，才是 Node v296 的 Java 上游证据。
mini-kv v130：disabled runtime shell non-participation receipt 已完成。
Node v296：已消费 Node v295 + Java v133 + mini-kv v130，完成 disabled runtime shell upstream echo verification。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v297：disabled runtime shell implementation candidate gate。
   - 消费 Node v296 的 echo verification。
   - 只判断候选门槛：专用 disabled-by-default flag、operator approval、abort semantics、no-network tests、historical fallback evidence 是否齐全。
   - 仍默认 blocked；不能实现 runtime shell，不能实例化 provider/client，不能读取 credential，不能解析 raw endpoint，不发 HTTP/TCP。

2. 推荐并行：Java v134 + mini-kv v131。
   - Java v134：runtime shell candidate gate echo。
     只回显 Node v297 的候选门槛和 blocked decision，不写 ledger、不执行 SQL、不调用上游。
   - mini-kv v131：runtime shell candidate gate non-participation receipt。
     只确认 mini-kv 不参与 runtime shell candidate，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不承载 audit/order 权威状态。

3. Node v298：runtime shell candidate gate upstream echo verification。
   - 等 Java v134 + mini-kv v131 完成后再推进。
   - 消费两边 echo，验证三方对候选门槛的 blocked decision 一致。
   - 仍不做 runtime implementation。
```

## 显式质量优化项

```text
Node：
- v297 继续使用 types / renderer / service / test 四件套。
- 继续避免单版新增 3000+ changed lines；若候选门槛字段过多，拆成 gate profile 与 route/render/test 两段。
- 新增 candidate gate 必须写必要性证明：blocker、consumer、为什么不能复用 v296、停止条件。
- 继续优先消费 v296 profile 的 digest/state/summary，不复制 Java/mini-kv 长文本。
- 证据生成继续使用 stdin 管道或已有脚本，不使用长 `node -e` / `tsx --eval`。

Java：
- Java v134 与 mini-kv v131 可并行，但必须等待 Node v297。
- Java v134 只做 read-only echo，不做 runtime shell、不写 ledger、不执行 SQL、不调用外部 managed audit。

mini-kv：
- mini-kv v131 与 Java v134 可并行，但必须等待 Node v297。
- mini-kv v131 只做 non-participation receipt，不新增写命令、不做恢复/compact、不成为 audit/order 权威存储。

并行规则：
- 同一项目内部版本必须串行。
- Java v134 与 mini-kv v131 互不依赖，推荐并行。
- Node v297 在 Java v134/mini-kv v131 之前，Node v298 必须等待 Java v134 + mini-kv v131 完成。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider、真实 resolver client、fake secret provider 或 fake resolver client。
- 需要 Node 实现、启用或调用 disabled runtime shell。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Node v296 未完成时，Node v297 必须停止。
- Java v134 或 mini-kv v131 未完成时，Node v298 必须停止。

## 一句话结论

```text
v296 已完成三方 upstream echo verification：下一步 Node v297 只能做 runtime shell implementation candidate gate，仍默认 blocked；随后推荐并行 Java v134 + mini-kv v131，再由 Node v298 消费。
```
