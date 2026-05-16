# Node v197 衍生全局计划：真实只读窗口硬门槛落地

来源版本：Node v197 `real-read adapter production readiness checkpoint`。

计划状态：已完成并收口。`docs/plans/v194-post-real-read-archive-roadmap.md` 已完成 Node v195-v197、Java v69、mini-kv v78 并收口；本文件已完成 Node v198-v200、Java v70、mini-kv v79。后续由 `docs/plans/v200-post-ci-artifact-manifest-roadmap.md` 接续，不再向本文件追加重合版本。

## 阶段原则

```text
v191-v197 已经完成真实只读 adapter 的 rehearsal、runbook、taxonomy、archive、verification、imported sample 和 readiness checkpoint。下一阶段不继续横向增加 archive / packet，而是开始补真正生产窗口前必须有的硬门槛。
```

本阶段仍只覆盖三项目：

```text
Java = 订单交易核心
Node = 运维控制面 / 证据链 / 受控操作入口
mini-kv = 自研 KV 基础设施实验位
```

不纳入 aiproj。

## 推荐执行顺序

```text
1. Node v198：real-read window operator identity binding。已完成。
   把 v197 的 real-operator-identity hard gate 拆成可验证 profile：要求真实只读窗口请求必须带 verified operator identity、roles、approval correlation id；默认仍不接生产 IdP，不打开上游写操作。
2. 推荐并行：Java v70 + mini-kv v79。已完成。
   Java v70 补 release approval rehearsal 的 operator identity echo / schema hint，mini-kv v79 补 SMOKEJSON operator-window consumer field 或 identity-neutral runtime proof。两者都只读，不认证、不持久化、不执行写操作。
3. Node v199：real-read window audit store handoff contract。已完成。
   定义 managed audit store 写入窗口 open/import/checkpoint 记录的 contract 和 fake adapter 测试；不连接真实数据库，不写生产审计。
4. Node v200：real-read window CI archive artifact manifest。已完成。
   生成 CI artifact manifest schema，列出 v191-v199 JSON/Markdown/screenshot/digest 产物；不要求真实 GitHub artifact 立即存在，但要给后续 CI 落地明确路径。
```

## Node v198 收口记录

```text
完成内容：real-read window operator identity binding
新增入口：/api/v1/production/real-read-window-operator-identity-binding
核心边界：请求头必须带 operator id、roles、verified claim、approval correlation id
安全结论：binding ready 只代表 rehearsal 绑定形状完整；真实生产窗口仍因 real IdP 和 persisted manual approval record 缺失而 blocked
验证：typecheck、聚焦测试、全量 test、build
```

## Java v70 + mini-kv v79 只读核对记录

```text
Java v70：已完成，HEAD/tag 为 v70订单平台release-approval-operator-window-hint。
mini-kv v79：已完成，HEAD/tag 为 第七十九版运行时身份中性窗口证明。
核对方式：只读 git status/tag/log，不启动、不测试、不构建、不修改两个项目。
```

## Node v199 收口记录

```text
完成内容：real-read window audit store handoff contract
新增入口：/api/v1/production/real-read-window-audit-store-handoff-contract
核心边界：定义 window-open / imported-result / checkpoint 三类未来 managed audit record
安全结论：handoff ready 只代表托管审计交接契约完整；真实 managed audit store 仍未连接，不写数据库、不迁移 file audit
验证：typecheck、聚焦测试、全量 test、build
```

## Node v200 收口记录

```text
完成内容：real-read window CI archive artifact manifest
新增入口：/api/v1/production/real-read-window-ci-archive-artifact-manifest
核心边界：声明 Node v191-v199 的 JSON/endpoint、Markdown、screenshot、explanation artifact 产物清单
安全结论：manifest ready 只代表后续 CI artifact publication schema 完整；真实 GitHub artifact store 仍未连接，不上传、不读取 secret、不打开生产窗口
验证：typecheck、聚焦测试、全量 test、build
接续计划：docs/plans/v200-post-ci-artifact-manifest-roadmap.md
```

## 推荐并行：Java v70 + mini-kv v79

Java v70 目标：

```text
增强 release approval rehearsal 的 operator identity echo / approval correlation hint，让 Node v198 能判断真实窗口请求身份字段是否被 Java 只读响应看见；不认证、不写 ledger、不持久化。
```

mini-kv v79 目标：

```text
增强 SMOKEJSON 的 operator-window consumer / identity-neutral proof 字段，让 Node v198/v200 能确认 mini-kv 只提供 runtime evidence，不接收或伪造业务身份；不执行 LOAD/COMPACT/SETNXEX/RESTORE。
```

## 暂停条件

- 需要生产密钥、生产数据库、生产 IdP。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要 Java 创建 approval decision、写 ledger、执行 deployment / rollback / SQL。
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE。
- 需要把 rehearsal/imported sample/checkpoint 当作生产窗口授权。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
下一阶段从“证据链齐全”转向“生产窗口硬门槛落地”：Node v198 operator identity binding、Java v70 + mini-kv v79 只读提示、Node v199 audit store handoff contract、Node v200 CI archive artifact manifest 已完成；下一步由 `v200-post-ci-artifact-manifest-roadmap.md` 接续。
```
