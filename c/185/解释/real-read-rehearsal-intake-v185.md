# Node v185 运行调试说明：real-read rehearsal intake

## 本版本目标

Node v185 等 Java v66 和 mini-kv v75 都完成后推进。

本版本生成：

```text
GET /api/v1/production/real-read-rehearsal-intake
GET /api/v1/production/real-read-rehearsal-intake?format=markdown
```

它只做 real-read rehearsal intake：

- 只读消费 Java v66 的 release approval rehearsal 证据形状。
- 只读消费 mini-kv v75 的 restore boundary smoke manifest 证据形状。
- 不启动 Java。
- 不启动 mini-kv。
- 不创建 approval decision。
- 不写 approval ledger。
- 不执行 deployment / rollback / rollback SQL / restore。
- 不读取生产密钥、生产数据库或生产 IdP。

## 关键输入

Java v66：

```text
rehearsalVersion=java-release-approval-rehearsal.v1
endpoint=/api/v1/ops/release-approval-rehearsal
rehearsalMode=READ_ONLY_RELEASE_APPROVAL_REHEARSAL
readOnly=true
executionAllowed=false
```

mini-kv v75：

```text
smokeManifestVersion=mini-kv-restore-boundary-smoke-manifest.v1
projectVersion=0.75.0
releaseVersion=v75
path=fixtures/release/restore-boundary-smoke-manifest.json
writeCommandsExecuted=false
adminCommandsExecuted=false
runtimeWriteObserved=false
```

## 验证结果

本版本已运行：

```text
npm run typecheck
npx vitest run test/realReadRehearsalIntake.test.ts
npx vitest run test/realReadRehearsalIntake.test.ts test/releaseApprovalDecisionRehearsalPacket.test.ts
npm test
npm run build
Chrome screenshot
```

全量测试结果：

```text
Test Files  132 passed (132)
Tests       453 passed (453)
```

截图归档：

```text
c/185/图片/real-read-rehearsal-intake-v185.png
```

## 计划更新

v182 衍生计划已收口。

新计划：

```text
docs/plans/v185-post-real-read-rehearsal-roadmap.md
```

新计划吸收了用户关注的 1、3、4：

- Node P0 继续加速拆分 `opsPromotionArchiveBundle.ts`。
- 全局方向转向真实能力落地：数据库持久化、认证中间件、真实 HTTP 调用。
- 学习 Java v66 的真实只读 endpoint 节奏，不再只堆 fixture/contract。
