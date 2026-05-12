# 75. Node v71：Execution contract evidence

## 模块角色

v71 把 Java v42 与 mini-kv v51 的只读执行契约接入 Node 证据链：

```text
Java v42: GET /api/v1/failed-events/:id/replay-execution-contract
mini-kv v51: CHECKJSON <command>
```

Node 仍然不执行真实动作，只把这些契约作为执行前证据。

## Client 层接入

Java client 新增：

```ts
failedEventReplayExecutionContract(failedEventId: string): Promise<UpstreamJsonResponse<OrderPlatformFailedEventReplayExecutionContract>> {
  return this.request(`/api/v1/failed-events/${encodeURIComponent(failedEventId)}/replay-execution-contract`);
}
```

mini-kv client 新增：

```ts
async checkJson(command: string): Promise<MiniKvCheckJsonResult> {
  const normalizedCommand = normalizeCheckCommand(command);
  const result = await this.execute(`CHECKJSON ${normalizedCommand}`);
  return {
    ...result,
    contract: parseMiniKvCheckJson(result.response),
  };
}
```

这里的 `CHECKJSON` 只是只读 contract，不会把 `SET/DEL/EXPIRE` 变成真实执行。

## Evidence 层采集

`OperationApprovalEvidenceService` 现在会额外采集：

```ts
javaExecutionContract: await this.collectJavaExecutionContract(request),
miniKvExecutionContract: await this.collectMiniKvExecutionContract(request),
```

Java 只在 `failed-event-replay-simulation` 上采集，mini-kv 只在 `target === "mini-kv"` 时采集。

## Verification 检查

Java execution-contract 校验：

```ts
return contractVersion === "failed-event-replay-execution-contract.v1"
  && isSha256Digest(contractDigest)
  && digestVerificationMode === "CLIENT_PRECHECK_ONLY";
```

mini-kv CHECKJSON 校验：

```ts
return Number.isInteger(schemaVersion)
  && schemaVersion !== undefined
  && schemaVersion > 0
  && isFnv1a64Digest(commandDigest)
  && readOnly === true
  && executionAllowed === false
  && Number.isInteger(sideEffectCount)
  && sideEffectCount === sideEffects.length;
```

这两个检查分别证明：Java contract 有稳定 digest，mini-kv contract 明确只读且不能执行。

## Gate preview 接入

v71 还把 contract 纳入 execution gate：

```ts
requiredUpstreamEvidenceAvailable:
  javaApprovalStatus === "available" && javaExecutionContractStatus === "available"
```

mini-kv 侧也要求：

```ts
miniKvExplainCoverage === "available" && miniKvExecutionContractStatus === "available"
```

同时新增 gate checks：

```ts
javaExecutionContractEvidenceValid
javaReplayPreconditionsSatisfiedOk
miniKvExecutionContractEvidenceValid
miniKvCheckReadOnlyOk
miniKvCheckExecutionAllowedOk
```

这让 v71 的 gate preview 不只是看 approval/explain，还会看执行契约本身。

## 一句话总结

v71 把“三项目融合”往前推进了一层：Node 能读 Java 和 mini-kv 的真实执行前契约证据，但仍坚持只读、可验证、不真实执行。
