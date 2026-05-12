# 79. Node v75：Fixture drift diagnostics

## 模块角色

v75 新增 `upstreamContractFixtureDrift.ts`，作用是检查 fixture 是否还能支撑 Node 的 diagnostics。

v74 的 fixture report 回答：

```text
fixture 是否可读、是否大体有效
```

v75 的 drift diagnostics 回答：

```text
fixture 哪个字段漂了，是否还映射得到 Node diagnostics 需要的字段
```

## 入口函数

核心入口：

```ts
export async function loadUpstreamContractFixtureDriftDiagnostics(
  config: Pick<AppConfig, "javaExecutionContractFixturePath" | "miniKvCheckJsonFixturePath">,
): Promise<UpstreamContractFixtureDriftDiagnostics> {
  return createUpstreamContractFixtureDriftDiagnostics(
    await loadUpstreamContractFixtureReport(config),
  );
}
```

它先复用 v74 的 fixture report，再生成 drift diagnostics，没有重新实现文件读取逻辑。

## 字段映射

v75 明确列出 fixture 字段如何进入 Node diagnostics：

```ts
map("java", "contractDigest", "javaContractDigest", "javaContractDigest", report.sources.java.details),
map("java", "replayPreconditionsSatisfied", "javaReplayPreconditionsSatisfied", "javaReplayPreconditionsSatisfied", report.sources.java.details),
map("java", "digestVerificationMode", "javaDigestVerificationMode", "javaDigestVerificationMode", report.sources.java.details),
map("mini-kv", "command_digest", "miniKvCommandDigest", "miniKvCommandDigest", report.sources.miniKv.details),
map("mini-kv", "read_only", "miniKvCheckReadOnly", "miniKvCheckReadOnly", report.sources.miniKv.details),
map("mini-kv", "execution_allowed", "miniKvCheckExecutionAllowed", "miniKvCheckExecutionAllowed", report.sources.miniKv.details),
map("mini-kv", "wal.durability", "miniKvCheckDurability", "miniKvCheckDurability", report.sources.miniKv.details),
```

如果某个 fixture 字段缺失，会输出：

```text
FIXTURE_DIAGNOSTICS_FIELD_MAPPING_MISSING
```

## Java drift 检查

Java 侧检查包括：

```ts
JAVA_FIXTURE_CONTRACT_VERSION_DRIFT
JAVA_FIXTURE_CONTRACT_DIGEST_DRIFT
JAVA_FIXTURE_APPROVAL_DIGEST_DRIFT
JAVA_FIXTURE_REPLAY_ELIGIBILITY_DIGEST_DRIFT
JAVA_FIXTURE_REPLAY_PRECONDITION_DRIFT
JAVA_FIXTURE_DIGEST_MODE_DRIFT
JAVA_FIXTURE_EXPECTED_SIDE_EFFECTS_DRIFT
```

例如 contract digest 校验：

```ts
issueUnless(isSha256Digest(readString(details, "contractDigest")), {
  code: "JAVA_FIXTURE_CONTRACT_DIGEST_DRIFT",
  field: "contractDigest",
  expected: "sha256:<64 hex chars>",
  actual: readField(details, "contractDigest"),
});
```

这能防止 Java 样本格式变化后，Node 仍然误以为 smoke 是可信的。

## mini-kv drift 检查

mini-kv 侧检查包括：

```ts
MINIKV_FIXTURE_SCHEMA_VERSION_DRIFT
MINIKV_FIXTURE_COMMAND_DIGEST_DRIFT
MINIKV_FIXTURE_READ_ONLY_DRIFT
MINIKV_FIXTURE_EXECUTION_ALLOWED_DRIFT
MINIKV_FIXTURE_SIDE_EFFECTS_DRIFT
MINIKV_FIXTURE_SIDE_EFFECT_COUNT_DRIFT
MINIKV_FIXTURE_WAL_DURABILITY_DRIFT
```

其中最关键的是：

```ts
readBoolean(details, "read_only") === true
readBoolean(details, "execution_allowed") === false
```

也就是 CHECKJSON fixture 必须继续证明“只读、不可执行”。

## 路由层

新增路由：

```ts
GET /api/v1/upstream-contract-fixtures/drift-diagnostics
```

Markdown 也同步支持：

```ts
return renderUpstreamContractFixtureDriftDiagnosticsMarkdown(diagnostics);
```

这让 drift report 可以直接归档进 `a/<版本>/解释`，也方便人工检查。

## 一句话总结

v75 让 Node 在使用上游 fixture 之前先检查样本是否漂移，避免稳定样本变成“看似稳定但已经失配”的烟雾测试输入。
