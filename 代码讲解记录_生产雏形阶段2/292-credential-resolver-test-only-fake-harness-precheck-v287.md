# 292 - credential resolver test-only fake harness precheck (Node v287)

## 版本定位

Node v287 接在 v286 的 upstream echo verification 后面，只做 test-only fake harness precheck。
这版不是执行版，也不是真实 resolver 版，而是把 fake harness 的边界、默认关闭状态和后续并行建议写清楚。

## 核心入口

新服务入口位于：
```text
src/services/managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck.ts
```

它消费 Node v286 的 verification 结果，特别是：

```ts
sourceNodeV286.readyForNodeV287TestOnlyFakeHarnessPrecheck === true
```

## 关键结构

### 1. types

`...TestOnlyFakeHarnessPrecheckTypes.ts` 里把 profile 拆成：
- precheck 状态
- sourceNodeV286 引用
- fakeHarnessPrecheck 边界
- upstreamEchoDecision
- checks / summary / messages

### 2. service

service 做三件事：
- 读取 Node v286 的只读验证结果
- 生成 test-only fake harness precheck 报告
- 明确写出 Java / mini-kv 是否需要立即回显

### 3. renderer

renderer 继续沿用 JSON/Markdown 双输出，只把 profile 组织成审计报告样式。

### 4. route

路由挂到 auditJsonMarkdownRoutes，保留同一套 JSON/Markdown 行为。

## 验证

本版测试覆盖：
- 正常 ready
- UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 打开时 blocked
- forced historical fixture fallback 仍可读 v286 证据
- JSON / Markdown 路由输出一致

## 后续版本

v288 再做 disabled fake harness contract；如果那一版真的引入跨项目证据，再按计划推荐并行 Java v122 + mini-kv v127。
