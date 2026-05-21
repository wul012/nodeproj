# Node v295 衍生计划：disabled runtime shell design review 之后

来源版本：Node v295 `credential resolver disabled runtime shell design review`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md` 已完成 Node v293、Node v294、Node v295，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v293：fake harness readiness blocked decision upstream echo verification 已完成；三方 blocked decision 已对齐。
Node v294：disabled runtime shell pre-plan intake 已完成；只定义十条边界，不实现 runtime。
Node v295：disabled runtime shell design review 已完成；结论是先推荐并行 Java v132 + mini-kv v130，再由 Node v296 消费。
Java v132：实际是质量优化，不是 disabled runtime shell handoff echo。
Java v133：disabled runtime shell handoff echo 已完成，作为 Node v296 的实际 Java 上游证据。
mini-kv v130：disabled runtime shell non-participation receipt 已完成。
Node v296：disabled runtime shell upstream echo verification 已完成；已显式记录 Java v132/v133 版本修正。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. 推荐并行：Java v133 + mini-kv v130。已完成。
   - Java v133：read-only disabled runtime shell handoff echo。
     只回显 Node v295 的 design-review decision，不创建 resolver runtime、不写 ledger、不执行 SQL、不调用上游。
   - mini-kv v130：disabled runtime shell non-participation receipt。
     只确认 mini-kv 不参与 runtime shell、不执行 LOAD/COMPACT/RESTORE/SETNXEX、不承载 audit/order 权威状态。
   - 修正：原计划写 Java v132，但 Java v132 实际是质量优化；真实 echo 版本为 Java v133。

2. Node v296：disabled runtime shell upstream echo verification。已完成。
   - 只能在 Java v133 + mini-kv v130 都完成后推进。
   - 消费两边 echo，验证三方对 disabled runtime shell 的边界一致。
   - 不实现 runtime shell，不实例化 provider/client，不读取 credential，不解析 raw endpoint，不发 HTTP/TCP。

3. Node v297：disabled runtime shell implementation candidate gate。
   - 只能在 Node v296 通过后考虑。
   - 仍默认 blocked；如果要进入实现候选，必须先证明 dedicated disabled-by-default flag、operator approval、abort semantics、no-network test 都存在。
```

## 显式质量优化项

```text
Node：
- 后续 Node v296 继续使用 types / renderer / service / test 四件套。
- 不再复制 v293-v295 的整段 evidence 逻辑；优先消费上游 profile 的 digest、state、boundary 和 summary 字段。
- 新增 echo/governance 链必须继续写必要性证明：blocker、consumer、不能复用原因、停止条件。
- 单版/单提交目标小于 3000 changed lines；超过时拆版本或拆提交。
- 复杂证据生成不要在 PowerShell 里用长 `node -e` / `tsx --eval` 字符串；优先用 stdin 管道或已有脚本，避免引号被改写。

Java：
- Java v133 可以和 mini-kv v130 并行；原计划 Java v132 已修正为 Java v133。
- Java v133 只做 read-only echo，不做 resolver runtime，不写 approval ledger，不执行 SQL，不调用外部 managed audit。

mini-kv：
- mini-kv v130 可以和 Java v132 并行。
- mini-kv v130 只做 non-participation receipt，不新增写命令、不做恢复/compact、不成为 audit/order 权威存储。

并行规则：
- 同一项目内部版本必须串行。
- Java v133 与 mini-kv v130 互不依赖，推荐并行。
- Node v296 依赖 Java v133 + mini-kv v130，不能与二者并行抢跑。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider、真实 resolver client、fake secret provider 或 fake resolver client。
- 需要 Node 实现或调用 fake harness runtime / disabled runtime shell。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v133 或 mini-kv v130 未完成时，Node v296 必须停止。

## 一句话结论

```text
v295 已完成 design review，v296 已完成 upstream echo verification；原 Java v132 计划偏差已修正为 Java v133，下一步进入 docs/plans2/v296-post-disabled-runtime-shell-upstream-echo-roadmap.md。
```
