# Node v328 衍生计划：final prerequisite closure 之后

来源版本：Node v328 `final prerequisite closure review`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md` 已完成 Node v326、Java v150、mini-kv v142、Node v327、Node v328 的最终 prerequisite closure 闭环；本计划另起续写，不回填旧版本，不写重复版本。

## 当前对齐状态

```text
Node v326：abort/rollback semantics contract intake 已完成；定义最后一个 prerequisite 的非执行合同。
Java v150：abort/rollback semantics contract echo 已完成；只读回显，不执行 SQL/deployment/rollback、不写 ledger、不发外部请求。
mini-kv v142：abort/rollback semantics contract non-participation receipt 已完成；不执行 LOAD/COMPACT/RESTORE/SETNXEX、不承担 abort/rollback authority。
Node v327：read-only cross-project readiness runner 已完成；读取 Java v150 与 mini-kv v142 的真实本地产物或 historical fallback，22/22 checks 通过。
Node v328：final prerequisite closure review 已完成；6/6 prerequisite 已关闭，remaining=0，但 runtime shell、provider/client、HTTP/TCP、ledger/schema、真实 managed audit connection 仍未打开。
Node v329：implementation candidate gate / input-hardening decision 已完成；消费 Node v328，要求 Java v151 + mini-kv v143 并行只读 input-hardening echo / receipt，仍不允许 runtime shell design draft 或真实执行。
Java v151：release approval evidence export hint 已完成；补稳定只读 evidence export hint。
Java v152：input-hardening decision echo 已完成；消费 Node v329，并确认 Java v151 已满足 java-stable-evidence-export。
mini-kv v143：input-hardening candidate gate non-participation receipt 已完成；补 stable current receipt export。
Node v330：candidate gate upstream alignment / hardening review 已完成；消费 Node v329 + Java v151/v152 + mini-kv v143。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v329：implementation candidate gate / input-hardening decision。已完成。
   - 消费 Node v328 final prerequisite closure review。
   - 只判断是否可以进入 implementation candidate 阶段，不实现 runtime shell。
   - 必须写 necessity proof：为什么 6/6 prerequisite closure 之后仍需要 candidate gate，解决哪个真实 blocker，谁消费，何时停止。
   - 必须把 input export hardening 纳入候选门槛：v327 仍读取 Java Markdown archive 和 mini-kv receipt 文件，后续要评估是否需要稳定 JSON/current receipt export。
   - 禁止 provider/client、HTTP/TCP、credential value、raw endpoint URL、Java SQL、rollback、ledger/schema、mini-kv write/admin command。

2. 推荐并行：Java v151 + mini-kv v143。已完成；Java 又追加 v152 echo，不视为阻塞。
   - 只能在 Node v329 完成后执行。
   - Java v151：只读 echo Node v329 candidate gate / input-hardening decision；如需要优化，优先补 stable evidence export，不做 SQL/deployment/rollback。
   - Java v152：在 v151 的 stable evidence export hint 之后，补 input-hardening decision echo；Node v330 应同时消费 v151/v152。
   - mini-kv v143：只读 non-participation receipt；如需要优化，优先补 stable current receipt export，不做 LOAD/COMPACT/RESTORE/SETNXEX。
   - 两边互不依赖，可以并行推进；同一项目内部仍保持原子串行。

3. Node v330：candidate gate upstream alignment / hardening review。已完成。
   - 消费 Node v329 + Java v151/v152 + mini-kv v143。
   - 判断 input export hardening 是否已对齐；如果对齐，只允许下一版进入 disabled implementation design draft candidate review。
   - 不得直接实现 runtime shell，也不得打开真实 network/credential/write side effect。

4. 后续计划已另起：
   - `docs/plans2/v330-post-candidate-gate-upstream-hardening-roadmap.md`
   - 下一步是 Node v331：disabled runtime shell design draft candidate review。
```

## 显式质量优化项

```text
Node：
- 后续继续使用 types / service / renderer / test 拆分，禁止新增难维护巨型文件。
- 不再用“another closure review”堆层数；v329 必须是 candidate gate / input-hardening decision，不是 v328 的重复总结。
- v327/v328 之后优先关注真实可消费性：stable export、historical fallback、fail-closed diagnostics、route evidence 可读性。
- 单个 Node commit 目标低于 3000 changed lines；如果超出，拆成质量优化、功能、归档/截图多个提交。

Java：
- 如果需要配合 Node v329/v330，优先输出稳定只读 evidence export，而不是继续膨胀 echo builder。
- 任何 Java 优化仍与业务 echo 串行；同一 Java 原子版本不要混入大拆分与新 echo。

mini-kv：
- 如果需要配合 Node v329/v330，优先输出 stable current receipt / release receipt export。
- 不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 audit/order authority，不提前进入集群分片。
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
- 如果 Node v329 无法说明 implementation candidate gate 的真实 blocker 和停止条件，必须暂停，不得继续堆治理文档。

## 一句话结论

```text
6/6 prerequisite 已在 Node v328 闭合；Node v329 已完成 implementation candidate gate / input-hardening decision；Java v151/v152 + mini-kv v143 已完成 input-hardening 上游证据；Node v330 已完成 upstream hardening review。下一步切换到 v330 衍生计划，只允许 Node v331 做 disabled design draft candidate review。
```
