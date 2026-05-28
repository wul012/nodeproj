# Node v360 衍生计划：sandbox handle review packet/gate decision record 之后

来源版本：Node v360 `sandbox handle review packet/gate decision record`。

计划状态：v359 衍生计划中的 Node v360 已完成后另起续写；不回填旧计划，不写重复版本。

## 当前对齐状态

```text
Node v351：managed-audit-disabled read-only integration intake 已完成；20/20 checks passed。
Node v352：managed-audit-disabled read-only integration intake archive verification 已完成；27/27 checks passed，10/10 archive files present。
Node v353：managed-audit-disabled read-only integration decision record 已完成；19/19 checks passed。
Node v354：sandbox handle review prerequisite intake 已完成；24/24 checks passed。
Node v355：sandbox handle review prerequisite intake archive verification 已完成；29/29 checks passed，11/11 archive files present。
Node v356：sandbox handle review contract decision 已完成；25/25 checks passed。
Node v357：sandbox handle review contract decision archive verification 已完成；30/30 checks passed，11/11 archive files present。
Node v358：sandbox handle review packet/gate non-secret intake 已完成；27/27 checks passed，6 个 packet inputs + 5 个 gate outputs + 7 个 fail-closed stop conditions 已固化。
Node v359：sandbox handle review packet/gate non-secret intake archive verification 已完成；34/34 checks passed，11/11 archive files present。
Node v360：sandbox handle review packet/gate decision record 已完成；20/20 checks passed，decision=advance-to-sandbox-handle-review-prerequisite-closure-review。

Java v153 + mini-kv v144：继续跳过。v349-v360 都没有 invalid-read-contract，因此不要求两边补字段。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v361：sandbox handle review packet/gate decision record archive verification。当前下一步。
   - 消费 Node v360 decision record。
   - 验证 route、Markdown、stable digest、HTTP evidence、summary、HTML、截图、解释、代码讲解和计划索引。
   - 验证 v360 只允许 prerequisite closure review，不允许 credential value、raw endpoint、provider/client、runtime shell 或 managed audit HTTP/TCP。
   - 不启动 Java / mini-kv，不请求两边新版本。

2. Node v362 或后续：
   - 如果 v361 证明 v360 归档完整，可以再做 sandbox handle review prerequisite closure review。
   - 如果 v361 发现缺截图、解释、讲解、route、Markdown、digest 或 summary，先修 archive verification，不推进功能。
   - 如果后续需要真实 sandbox credential handle 值、raw endpoint URL、secret provider、resolver client、runtime shell 或 managed audit HTTP/TCP，必须暂停并让用户确认授权与输入范围。

3. Java / mini-kv：
   - 当前不要求新版本。
   - 只有 Node 后续发现 invalid-read-contract、缺必要只读字段，或用户明确要求两边补只读 evidence 时，才推荐并行 Java + mini-kv。
```

## 显式质量优化项

```text
Node：
- v361 只验证 v360 archive，不复制 v360 decision builder。
- v361 archive manifest 要覆盖 d/360/evidence、d/360/解释、d/360/图片、代码讲解记录_生产雏形阶段2、docs/plans2 和 route。
- 新增文件继续分层 types/service/renderer/test；单 service 接近 700 行时先拆 helper/catalog。
- 测试继续分批：focused -> 小组 -> build -> smoke，不一次性跑大批量测试。

Java：
- 当前不要求 Java 新版本。

mini-kv：
- 当前不要求 mini-kv 新版本。
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
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
Node v360 已记录 v359 归档完整后的安全决策：下一步只能进入 prerequisite closure review 的归档验证路径，不能把 decision record 变成真实 credential、endpoint、provider/client、runtime shell 或 managed audit 连接实现。
```
