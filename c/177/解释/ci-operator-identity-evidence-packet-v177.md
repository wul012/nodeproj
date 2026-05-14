# Node v177 运行调试说明：CI operator identity evidence packet

## 本版目标

Node v177 接在 v176 后面，把 CI / local smoke 的“谁触发了验证”固化成只读证据包。

本版不做真实认证，也不接生产 IdP：

- 不读取 production secret。
- 不启动 Java 或 mini-kv。
- 不打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 不创建 approval decision。
- 不执行 release、deployment、rollback、restore。

## 新增入口

```text
GET /api/v1/ci/operator-identity-evidence-packet
GET /api/v1/ci/operator-identity-evidence-packet?format=markdown
```

本地 smoke 需要带安全身份头：

```text
x-orderops-operator-id: smoke-operator-1
x-orderops-roles: viewer,operator
```

返回核心字段：

```text
profileVersion=ci-operator-identity-evidence-packet.v1
packetState=ready-for-operator-identity-evidence
readyForCiOperatorIdentityEvidencePacket=true
executionAllowed=false
readyForProductionAuth=false
readyForProductionRelease=false
```

## 证据来源

本版消费 Node v176：

```text
sourceCiEvidenceHardeningProfileVersion=ci-evidence-hardening-packet.v1
sourceCiEvidenceHardeningPacketState=ready-for-ci-evidence-hardening
```

同时记录 local smoke header identity：

```text
operatorId=smoke-operator-1
roles=["viewer","operator"]
authSource=headers
authenticated=true
```

GitHub Actions 侧只记录非 secret 元数据字段预期：

```text
GITHUB_ACTOR
GITHUB_TRIGGERING_ACTOR
GITHUB_WORKFLOW
GITHUB_RUN_ID
GITHUB_RUN_ATTEMPT
GITHUB_SHA
```

这些字段只作为 CI evidence 绑定信息，不是生产授权。

## 验证结果

本版需要通过：

```text
npm run typecheck
npx vitest run test/ciOperatorIdentityEvidencePacket.test.ts test/ciEvidenceHardeningPacket.test.ts test/accessGuard.test.ts test/accessPolicyProfile.test.ts
npm test
npm run build
safe HTTP smoke
Chrome screenshot
```

截图归档：

```text
c/177/图片/ci-operator-identity-evidence-packet-v177.png
```

## 下一步

按最新计划，Node v177 完成后不继续抢跑 Node v178。下一步是：

```text
推荐并行 Java v63 + mini-kv v72
```

Java v63 补 release audit retention fixture；mini-kv v72 补 restore evidence retention fixture。等两边完成后，Node v178 再消费三方 retention evidence。
