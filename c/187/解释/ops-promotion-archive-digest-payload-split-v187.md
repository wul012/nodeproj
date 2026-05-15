# Node v187：opsPromotionArchiveBundle digest payload split phase 3

## 本版目标

v187 继续按计划拆分 `src/services/opsPromotionArchiveBundle.ts`，把 archive/manifest/attestation 相关 digest payload helper 抽到独立模块：

```text
src/services/opsPromotionArchiveDigestPayloads.ts
```

本版只移动 digest payload 构造逻辑，不改 `stableDigest.ts` 算法，不改 endpoint、profileVersion、JSON/Markdown 字段，也不新增业务 surface。

## 拆分内容

新模块承接 5 个 helper：

```text
manifestDigestPayload
archiveBundleDigestPayload
archiveVerificationDigestPayload
archiveAttestationVerificationDigestPayload
archiveAttestationDigestPayload
```

`opsPromotionArchiveBundle.ts` 继续负责 create/render/verification 主流程，只从新模块 import helper。主文件从 v186 后的约 7076 行降到 6966 行，新 helper 模块约 128 行。

## 为什么这样做

这部分 helper 是 archive manifest、archive bundle、verification、attestation seal 的 digest 输入规范。把它们抽出后，后续继续拆 validation/report/step 时，不必在巨型文件里穿插修改 digest 构造，降低发布证据链维护风险。

## 本版边界

- 不改 digest 算法。
- 不改 manifest digest coveredFields。
- 不改 artifact digest 字段。
- 不改 summary / nextActions 校验逻辑。
- 不启动 Java / mini-kv。

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/stableDigest.test.ts test/realReadRehearsalIntake.test.ts：3 files / 9 tests 通过
npm test：132 files / 453 tests 通过
npm run build：通过
```

## 成熟度变化

v187 让 `opsPromotionArchiveBundle.ts` 的 digest 输入规范从主流程中分离出来。它仍然不是最终拆分，但已经形成：types 独立、stable digest 独立、core digest payload 独立的三层结构。
