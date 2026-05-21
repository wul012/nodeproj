# 293 - credential resolver disabled fake harness contract (Node v288)

## 版本定位

Node v288 接在 v287 precheck 后面，第一次把 disabled fake harness contract 写成稳定 profile。
这版仍不是运行版：只定义 contract digest、输入输出、禁止输入、artifact、assertion 和 side-effect 边界。

## 核心入口

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract.ts
```

入口函数：
```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract({ config })
```

## 关键代码路径

### 1. 读取 v287

service 先通过 `createSourceNodeV287(...)` 读取 v287 precheck，确认：
```ts
sourceNodeV287.readyForDisabledFakeHarnessContract === true
sourceNodeV287.fakeHarnessRuntimeEnabled === false
sourceNodeV287.fakeHarnessInvocationAllowed === false
```

### 2. 合同形状

`createDisabledFakeHarnessContract(...)` 生成：
- requiredInputs
- allowedOutputs
- prohibitedInputs
- requiredArtifacts
- contractAssertions
- prohibitedActions
- contractDigest

其中 runtime 明确保持：
```ts
runtimeImplementationPresent: false
runtimeInvocationAllowed: false
```

### 3. 三项目对齐

`createUpstreamEchoRequirement()` 明确写出下一步不是单项目抢跑，而是：
```text
推荐并行：Java v122 + mini-kv v127
Node v289 再消费两侧证据
```

## 测试覆盖

新增测试文件：
```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract.test.ts
```

覆盖：
- 正常 ready
- upstream probes/actions 打开时 blocked
- forced historical fallback 仍可贯穿 v287/v286 证据链
- JSON/Markdown route 输出

## 项目进度影响

Node v288 让 fake harness 从 precheck 进入 contract 层，但仍没有运行时能力。下一步应该让 Java v122 和 mini-kv v127 分别只读回显/非参与，然后 Node v289 做三方 verification。
