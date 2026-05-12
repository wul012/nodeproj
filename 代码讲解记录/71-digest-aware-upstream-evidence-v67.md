# 第六十七版代码讲解：Digest-aware upstream evidence verification

## 模块角色

Node v67 接入两个上游新版本的只读证据字段：

```text
Java v41：evidenceVersion / approvalDigest / replayEligibilityDigest
mini-kv v50：schema_version / command_digest / side_effect_count
```

本版仍然只做 evidence verification，不新增真实 replay，也不执行 mini-kv 写命令。

## Java client 字段

`src/clients/orderPlatformClient.ts` 的 approval-status 响应类型新增：

```ts
export interface OrderPlatformFailedEventApprovalStatus {
  evidenceVersion?: string;
  approvalDigest?: string;
  replayEligibilityDigest?: string;
  sampledAt?: string;
  failedEventId?: number;
}
```

这些字段来自 Java v41，Node 只读取并归档，不重新计算 Java 内部 digest。

## mini-kv parser 字段

`src/clients/miniKvClient.ts` 的 `MiniKvExplainJson` 新增：

```ts
export interface MiniKvExplainJson {
  schema_version?: number;
  command_digest?: string;
  side_effects?: string[];
  side_effect_count?: number;
}
```

parser 会校验字段类型：

```ts
if ("schema_version" in explanation && (typeof explanation.schema_version !== "number" || !Number.isFinite(explanation.schema_version))) {
  throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", "mini-kv EXPLAINJSON schema_version field must be a finite number");
}
```

这保证 Node 不会把形状错误的上游 JSON 当成有效证据。

## Evidence summary

`src/services/operationApprovalEvidence.ts` 的 summary 新增 Java digest 摘要：

```ts
javaEvidenceVersion?: string;
javaApprovalDigest?: string;
javaReplayEligibilityDigest?: string;
```

也新增 mini-kv schema/digest 摘要：

```ts
miniKvSchemaVersion?: number;
miniKvCommandDigest?: string;
miniKvSideEffectCount?: number;
```

生成 summary 时从上游 evidence 读取：

```ts
const javaEvidenceVersion = readJavaEvidenceVersion(upstreamEvidence.javaApprovalStatus.details);
const javaApprovalDigest = readJavaApprovalDigest(upstreamEvidence.javaApprovalStatus.details);
const javaReplayEligibilityDigest = readJavaReplayEligibilityDigest(upstreamEvidence.javaApprovalStatus.details);
```

mini-kv 侧同理：

```ts
const miniKvSchemaVersion = readMiniKvSchemaVersion(upstreamEvidence.miniKvExplainCoverage.details);
const miniKvCommandDigest = readMiniKvCommandDigest(upstreamEvidence.miniKvExplainCoverage.details);
const miniKvSideEffectCount = readMiniKvSideEffectCount(upstreamEvidence.miniKvExplainCoverage.details);
```

## Verification checks

v67 新增三项 verification：

```ts
javaApprovalDigestEvidenceValid: boolean;
miniKvCommandDigestEvidenceValid: boolean;
miniKvSideEffectCountMatches: boolean;
```

Java 检查要求：

```ts
return evidenceVersion === "failed-event-approval-status.v1"
  && isSha256Digest(approvalDigest)
  && isSha256Digest(replayEligibilityDigest);
```

mini-kv 检查要求：

```ts
return Number.isInteger(schemaVersion)
  && schemaVersion !== undefined
  && schemaVersion > 0
  && isFnv1a64Digest(commandDigest);
```

`side_effect_count` 必须和 `side_effects.length` 一致：

```ts
return Number.isInteger(count) && count === readMiniKvSideEffects(evidence.details).length;
```

这些检查只在对应上游 evidence 为 `available` 时生效；如果某个 request 不属于 Java 或 mini-kv，对应检查保持通过，避免错误阻断另一侧证据。

## Markdown 输出

approval evidence Markdown 新增 Java 字段：

```ts
`- Java evidence version: ${report.summary.javaEvidenceVersion ?? "unknown"}`,
`- Java approval digest: ${report.summary.javaApprovalDigest ?? "unknown"}`,
`- Java replay eligibility digest: ${report.summary.javaReplayEligibilityDigest ?? "unknown"}`,
```

mini-kv 字段：

```ts
`- mini-kv schema version: ${report.summary.miniKvSchemaVersion ?? "unknown"}`,
`- mini-kv command digest: ${report.summary.miniKvCommandDigest ?? "unknown"}`,
`- mini-kv side_effect_count: ${report.summary.miniKvSideEffectCount ?? "unknown"}`,
```

verification Markdown 也会展示新增检查：

```ts
`- Java approval digest evidence valid: ${verification.checks.javaApprovalDigestEvidenceValid}`,
`- mini-kv command digest evidence valid: ${verification.checks.miniKvCommandDigestEvidenceValid}`,
`- mini-kv side_effect_count matches: ${verification.checks.miniKvSideEffectCountMatches}`,
```

## Handoff bundle 继承

`src/services/operationApprovalHandoffBundle.ts` 会把 v67 的新 summary 字段继续带入 handoff bundle：

```ts
...(report.summary.javaApprovalDigest === undefined ? {} : { javaApprovalDigest: report.summary.javaApprovalDigest }),
...(report.summary.miniKvCommandDigest === undefined ? {} : { miniKvCommandDigest: report.summary.miniKvCommandDigest }),
```

所以 v66 的 handoff bundle 不需要换接口，就能显示 v67 的上游 digest/schema 证据。

## 一句话总结

Node v67 把 Java v41 和 mini-kv v50 的证据摘要接入 verification：上游证据不仅“可读”，还要满足版本、digest 格式和 side_effect_count 一致性。
