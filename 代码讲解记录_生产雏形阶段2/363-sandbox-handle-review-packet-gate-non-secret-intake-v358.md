# 363 - Node v358 sandbox handle review packet/gate non-secret intake 代码讲解

## 版本定位

v358 接在 v357 `sandbox handle review contract decision archive verification` 之后。v357 证明 v356 的 contract decision 归档完整，本版把下一步 packet/gate intake 的非 secret 输入、输出和停止条件固化下来。

本版仍是治理链路中的安全收口，不是执行链路：不读 credential value，不解析 raw endpoint URL，不实例化 provider/client，不实现 runtime shell，不发 managed audit HTTP/TCP，不启动 Java / mini-kv。

## 入口与路由

路由注册在 `src/routes/auditJsonMarkdownRoutes.ts`：

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake",
  async () =>
    loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake({
      config,
    }),
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeMarkdown,
);
```

这里继续复用 `registerAuditJsonMarkdownRoute`，所以 JSON / Markdown 输出路径保持一致，不在 route 文件里散落重复格式化逻辑。

## 主服务结构

主服务文件是 `src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake.ts`。入口函数先消费 v357 archive verification：

```ts
const sourceNodeV357Profile =
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification({
    config: input.config,
    archiveRoot: input.sourceArchiveRoot,
  });
```

这点很关键：v358 不重新读取 v356 contract，也不复制 v357 archive reader，而是直接消费已验证过的 v357 profile。这样可以减少重复链路，也避免旧版本 digest 因重算而漂移。

随后服务依次构造五块内容：

```ts
const sourceNodeV357 = createSourceNodeV357(sourceNodeV357Profile);
const necessityProof = createNecessityProof(sourceNodeV357);
const packetInputs = createPacketInputs();
const gateOutputs = createGateOutputs();
const stopConditions = createStopConditions();
```

这对应 v358 的职责边界：

- `sourceNodeV357`：证明 v357 archive 已完整。
- `necessityProof`：解释为什么 v358 有必要存在。
- `packetInputs`：定义允许进入 packet 的非 secret 输入。
- `gateOutputs`：定义 gate 只输出 review / reject / archive 这类状态。
- `stopConditions`：定义一碰到 secret、raw endpoint、network、runtime、upstream write 就 fail closed。

## 非 secret packet inputs

`createPacketInputs()` 定义了 6 个输入：

```ts
{
  inputId: "sandbox-handle-reference",
  required: true,
  nonSecret: true,
  credentialValueAllowed: false,
  rawEndpointAllowed: false,
  networkConnectionRequired: false,
  runtimeShellRequired: false,
  upstreamMutationAllowed: false,
}
```

其他输入包括 allowlist review status、credential handle binding status、operator approval correlation、source archive verification digest、review request purpose。它们共同特点是只表达“状态、绑定、关联、用途”，不表达真实 secret 或真实 endpoint。

## gate outputs

`createGateOutputs()` 定义了 5 个输出：

```ts
packet-accepted-for-human-review
packet-rejected-missing-non-secret-input
packet-rejected-boundary-violation
packet-held-for-explicit-approval
packet-archive-required
```

这些输出不是执行动作，而是 gate decision。代码里对每个 output 都硬编码：

```ts
credentialValueExposed: false
rawEndpointExposed: false
networkConnectionOpened: false
runtimeShellInvoked: false
upstreamMutationAllowed: false
```

所以即使 packet 被接受，也只是进入人工 review，不会变成连接、执行或写入。

## fail-closed 停止条件

`createStopConditions()` 定义 7 个停止条件：

```ts
credential-value-requested
raw-endpoint-url-present
provider-client-required
runtime-shell-required
managed-audit-connection-required
upstream-write-required
missing-archive-verification
```

每个 stop condition 都有：

```ts
effect: "fail-closed"
credentialValueAccessed: false
rawEndpointParsed: false
networkConnectionOpened: false
runtimeShellInvoked: false
upstreamMutationAllowed: false
```

这让 v358 的安全语义非常直接：只要下一步需要真实 secret、raw URL、provider/client、runtime shell、HTTP/TCP 或上游写操作，本链路必须停住，而不是“先试一下”。

## checks 与 summary

`createChecks()` 把安全边界变成 27 个可测试 check：

```ts
check("sourceNodeV357Ready", sourceNodeV357.readyForNodeV358PacketGateIntake)
check("packetInputsNonSecret", packetInputs.every((packetInput) => packetInput.nonSecret))
check("noCredentialValueRequestedOrRead", !intakeRecord.credentialValueRequested && !intakeRecord.credentialValueRead)
check("noManagedAuditHttpTcp", !intakeRecord.managedAuditHttpTcpAllowed)
```

`createSummary()` 再把关键数字压成归档摘要：

```ts
checkCount: checks.length
passedCheckCount: countByStatus(checks, "passed")
packetInputCount: packetInputs.length
gateOutputCount: gateOutputs.length
stopConditionCount: stopConditions.length
```

这样测试和 HTTP smoke 不需要理解整个 profile，只要检查 summary 就能确认 v358 的核心边界是否成立。

## 测试覆盖

测试文件是 `test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake.test.ts`，覆盖三类场景：

1. 正常 profile：确认消费 v357，27/27 checks passed，6 个 input、5 个 output、7 个 stop condition 全部成立。
2. fail closed：构造损坏的 v357 archive root，确认 v358 会 blocked，不会伪造 ready。
3. route：通过 Fastify route 验证 JSON / Markdown 都能输出，且 Markdown 中包含本版关键字段。

核心断言示例：

```ts
expect(profile.summary.checkCount).toBe(27);
expect(profile.summary.passedCheckCount).toBe(27);
expect(profile.summary.packetInputCount).toBe(6);
expect(profile.summary.gateOutputCount).toBe(5);
expect(profile.summary.stopConditionCount).toBe(7);
expect(profile.executionAllowed).toBe(false);
expect(profile.connectsManagedAudit).toBe(false);
```

## 本版价值

v358 的价值不是“新增一个按钮/报告”，而是把下一步进入 sandbox handle review packet/gate 前必须满足的非 secret 契约写死：

- 哪些输入可以进入 packet。
- 哪些 gate 输出只是 review 状态。
- 哪些情况必须 fail closed。
- v359 应该验证哪些归档物。

这让后续版本可以继续向真实 sandbox handle review 靠近，同时不会突然越界到 secret、raw endpoint、runtime shell 或真实 managed audit connection。

## 验证记录

```text
npm.cmd run typecheck
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake.test.ts
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake.test.ts
npm.cmd run build
Node HTTP smoke JSON / Markdown passed
Playwright MCP screenshot captured
```
