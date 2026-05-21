# Node v295 运行解释：credential resolver disabled runtime shell design review

## 本版定位

Node v295 消费 Node v294 的 disabled runtime shell pre-plan intake，做一次只读 design review。它的结论不是“可以实现 runtime”，而是：

```text
可以归档设计审查；
下一步推荐并行 Java v132 + mini-kv v130；
Node v296 只有在消费两边 echo 后才能继续判断 runtime shell candidate。
```

## 运行结果

证据文件：

```text
d/295/evidence/credential-resolver-disabled-runtime-shell-design-review-v295.json
d/295/evidence/credential-resolver-disabled-runtime-shell-design-review-v295.md
```

核心结果：

```text
designReviewState = disabled-runtime-shell-design-review-ready
readyForParallelUpstreamEchoRequest = true
readyForNodeV296RuntimeShellImplementation = false
checkCount = 27
passedCheckCount = 27
recommendedParallelWorkCount = 2
productionBlockerCount = 0
```

这里的 `readyForParallelUpstreamEchoRequest=true` 只表示可以让 Java v132 和 mini-kv v130 并行补只读 echo，不表示 Node 可以实现 runtime。

## 安全边界

本版仍保持这些字段为 `false`：

```text
runtimeShellImplemented
runtimeShellEnabled
runtimeShellInvocationAllowed
testOnlyFakeHarnessAllowed
testOnlyFakeHarnessExecutionAllowed
executionAllowed
connectsManagedAudit
credentialValueRead
rawEndpointUrlParsed
externalRequestSent
secretProviderInstantiated
resolverClientInstantiated
schemaMigrationExecuted
approvalLedgerWritten
automaticUpstreamStart
```

## 推荐并行

v295 明确给出下一步并行建议：

```text
Java v132：只读 echo disabled runtime shell handoff，不创建 resolver runtime、不写 ledger、不执行 SQL、不调用上游。
mini-kv v130：只读 non-participation receipt，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不承载 audit/order 权威状态。
```

这两个项目互不依赖，可以并行推进；Node 不应抢跑 v296 runtime shell candidate。

## 本轮小弯路

生成 evidence 时，PowerShell 对 `node -e` / `tsx --eval` 中的双引号做了不符合预期的参数处理，导致 `import ... from "node:fs"` 被传成了 `from node:fs`。最终改为：

```text
$script | node --input-type=module
```

这个方式避免脚本作为命令参数被 PowerShell 改写。后续复杂生成脚本优先用 stdin 管道，或者使用已存在的项目脚本。
