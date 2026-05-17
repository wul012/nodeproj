# 236 - Node v232 managed audit sandbox guard type aggregation

## 一、本版定位

Node v232 是一个收口型质量优化版本。它不新增 endpoint，不改变 JSON 输出，也不推进真实连接能力。

本版只做一件事：把 v225-v231 沙箱链 profile 中反复出现的安全边界字段抽成共享类型，减少后续维护时漏改、错改的风险。

## 二、新增共享类型

新增文件：

```text
src/services/managedAuditSandboxGuards.ts
```

核心代码：

```ts
export interface ReadOnlyDryRunGuards {
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
}

export interface SandboxDryRunGuards extends ReadOnlyDryRunGuards {
  readyForManagedAuditSandboxAdapterConnection: false;
  connectsManagedAudit: false;
}
```

这两个类型把“只读、不可执行、不连接、不读凭据、不跑 schema、不自动启动”的硬边界集中到了一个地方。

另外新增：

```ts
export interface LocalDryRunWriteGuard {
  localDryRunWritePerformed: false;
}
```

这个字段只适合 v225 / v226 这类 dry-run package / runbook，不强塞给后面的 checklist / packet / verification。

## 三、profile 怎么改

以 v231 为例，原来 profile 接口直接写一整组字段：

```ts
readyForManagedAuditSandboxAdapterConnection: false;
readyForProductionAudit: false;
readyForProductionWindow: false;
readyForProductionOperations: false;
executionAllowed: false;
restoreExecutionAllowed: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
storesManagedAuditCredential: false;
schemaMigrationExecuted: false;
automaticUpstreamStart: false;
```

现在变成：

```ts
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionPreflightVerificationProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-preflight-verification.v1";
  verificationState: "manual-sandbox-connection-preflight-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionPreflightVerification: boolean;
  readOnlyVerification: true;
  // ...
}
```

注意：`readOnlyVerification: true` 没有抽走。因为不同版本叫法不同：

```text
readOnlyPackage
readOnlyRunbook
readOnlyChecklist
readOnlyPacket
readOnlyGate
readOnlyVerification
```

这些字段本身是版本语义，保留在各自 profile 里更清楚。

## 四、为什么这版有价值

这个项目当前沙箱链已经有多个连续版本：

```text
v225 package
v226 runbook
v227 checklist
v228 operator packet
v229 packet verification
v230 preflight gate
v231 preflight verification
```

它们都必须维持同一批安全边界。共享类型后，如果下一版要新增类似：

```ts
connectsToOnpremNetwork: false
```

就可以优先加在 `SandboxDryRunGuards`，而不是在 7 个 profile 里手动散改。

## 五、运行时契约不变

本版没有改 return 对象。比如 v231 的返回对象里仍然显式包含：

```ts
readyForManagedAuditSandboxAdapterConnection: false,
readyForProductionAudit: false,
executionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

所以外部 JSON contract 不变，测试也继续断言这些字段存在。

## 六、验证记录

```text
npm run typecheck
npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionPacketVerification.test.ts test/managedAuditManualSandboxConnectionPreflightVerification.test.ts test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts test/managedAuditManualSandboxConnectionOperatorPacket.test.ts test/managedAuditManualSandboxConnectionPreflightGate.test.ts
npm test
npm run build
node dist/server.js + GET /health smoke
```

验证结果：

```text
typecheck 通过
聚焦测试 8 个文件 / 24 个用例通过
全量测试 173 个文件 / 586 个用例通过
build 通过
本机 HTTP smoke /health 返回 200
```

## 七、并行上游证据漂移处理

本轮验证时发现 mini-kv 已经在另一个窗口推进到当前 runtime smoke fixture `v98`，而 Node 旧链路仍有若干断言写死 `v97` 的当前版本号或 digest。

处理方式不是修改 mini-kv，也不是把历史 receipt 名称全部改成 v98，而是区分两层：

```text
历史来源：mini-kv v90 / v95 / v96 / v97 receipt 语义保留
当前运行时：runtime-smoke-evidence.json 的 project_version / release_version / current_artifact_path_hint / receipt_digest 使用当前 v98
```

例如 `managedAuditManualSandboxConnectionPreflightVerification.ts` 仍保留 `miniKvV97` 这个历史 no-start guard 语义，但 readiness 检查消费当前 runtime smoke：

```ts
reference.projectVersion === "0.98.0"
  && reference.releaseVersion === "v98"
  && reference.consumedReleaseVersion === "v96"
  && reference.consumedMarkerDigest === "fnv1a64:b9fc556875ea625b"
  && reference.receiptDigest === "fnv1a64:431780d3772a52a5"
```

这样 Java / mini-kv 可以并行推进质量优化，Node 也不会因为上游 current fixture 升版而把历史只读证据链误判为失败。
