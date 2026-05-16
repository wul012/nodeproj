# Node v200 衍生全局计划：CI artifact manifest 后续验证

来源版本：Node v200 `real-read window CI archive artifact manifest`。

计划状态：当前唯一有效全局计划。`docs/plans/v197-post-readiness-checkpoint-roadmap.md` 已完成 Node v198-v200、Java v70、mini-kv v79 并收口；后续不再向旧计划追加重合版本。

## 阶段原则

```text
v200 已经把 Node v191-v199 的真实只读窗口证据整理成 CI artifact manifest。下一阶段不继续堆新的 archive summary，而是验证 manifest、补上游只读 CI/evidence hint，并准备真实 CI artifact upload 前的边界。
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
1. 推荐并行：Java v71 + mini-kv v80。
   Java v71 补 release approval / operator window 的只读 CI evidence hint，例如 artifact manifest echo、no-ledger-write proof、approval correlation field；mini-kv v80 补 SMOKEJSON / INFOJSON 的 CI evidence hint，例如 runtime artifact path hint、identity-neutral proof、no-restore proof。两者都只读，不做写操作。
2. Node v201：real-read window CI artifact manifest verification。已完成。
   消费 Node v200 manifest，并只读引用 Java v71 / mini-kv v80 的 evidence hint，复核 manifest digest、record count、required file kinds、production window blocked。
3. Node v202：CI artifact upload dry-run contract。下一步。
   定义未来 GitHub Actions artifact upload 的 dry-run contract，不真实上传，不要求 secret；只描述 artifact name、retention days、path allowlist、forbidden paths。
4. 推荐并行：Java v72 + mini-kv v81。
   Java v72 和 mini-kv v81 分别补只读 artifact retention / release evidence 字段，让 Node v203 能检查三项目 artifact retention 一致性。
5. Node v203：cross-project CI artifact retention gate。
   汇总 Node v202、Java v72、mini-kv v81，形成三项目 artifact retention gate；仍不打开生产窗口。
```

## 暂停条件

- 需要生产密钥、生产数据库、生产 IdP。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要真实上传 GitHub artifact、读取 GitHub secret、修改 CI 权限。
- 需要 Java 创建 approval decision、写 ledger、执行 deployment / rollback / SQL。
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE。
- 需要把 manifest / dry-run / imported sample 当作生产窗口授权。
- 对推进版本有疑惑时暂停。

## Java v71 + mini-kv v80 只读核对记录

```text
Java v71：已完成，HEAD/tag 为 v71订单平台release-approval-ci-evidence-hint。
mini-kv v80：已完成，HEAD/tag 为 第八十版CI证据提示。
核对方式：只读 git status/tag/log 与归档/fixture 内容，不启动、不测试、不构建、不修改两个项目。
```

## Node v201 收口记录

```text
完成内容：real-read window CI artifact manifest verification
新增入口：/api/v1/production/real-read-window-ci-artifact-manifest-verification
核心边界：复算 Node v200 manifest digest，校验 9 条 artifact record、4 类 required file kind，并接收 Java v71 / mini-kv v80 只读 CI evidence hint
安全结论：manifest verification ready 只代表清单可复核；真实 CI artifact store 仍未连接，不上传、不读取 secret、不打开生产窗口
验证：typecheck、聚焦测试、全量 test、build
```

## 一句话结论

```text
v200 已完成 CI artifact manifest schema，Java v71 + mini-kv v80 已完成只读 CI/evidence hint，Node v201 已完成 manifest verification。下一步是 Node v202 CI artifact upload dry-run contract，不抢跑真实上传或生产开窗。
```
