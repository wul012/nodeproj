# 第一百九十一版：opsPromotionArchiveBundle digest payload split phase 3（v187）

## 模块角色

`opsPromotionArchiveBundle` 是 Node 发布证据链的核心模块。v186 已经把类型定义抽到 `opsPromotionArchiveBundleTypes.ts`，v187 继续处理第二块技术债：digest payload 构造。

Digest payload 不是 hash 算法本身，而是“哪些字段进入 hash、字段如何规整”的规范层。这个层如果散在巨型文件里，后续改 archive、verification、attestation 时很容易误伤发布证据链。

## 本版所处项目进度

项目当前已经进入生产雏形阶段的维护性优化期：不是继续堆更多 fixture，而是把现有关键链路拆到可维护结构。v187 紧接 v186，继续消化 `opsPromotionArchiveBundle.ts`。

## 核心流程

```text
create / verify 主流程
  -> 调用 digest payload helper 生成稳定输入
  -> digestStable(payload)
  -> 边界测试验证 manifest digest / artifact digest / summary / nextActions 没漂移

v187 后：
  opsPromotionArchiveDigestPayloads.ts 负责 payload 规范
  stableDigest.ts 负责稳定 JSON + sha256
  opsPromotionArchiveBundle.ts 负责编排 create/render/verification
```

## 关键代码讲解

### 1. 新模块集中 archive digest payload

文件：[opsPromotionArchiveDigestPayloads.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveDigestPayloads.ts:1)

```ts
import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationEvidenceSource,
  OpsPromotionArchiveAttestationState,
```

新模块只 import 类型，没有运行时副作用。它不是新业务服务，只是把 digest 输入规范从巨型实现文件里抽出来。

### 2. manifest payload 保持字段不变

文件：[opsPromotionArchiveDigestPayloads.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveDigestPayloads.ts:11)

```ts
export function manifestDigestPayload(input: {
  archiveName: string;
  state: OpsPromotionArchiveBundle["state"];
  summary: OpsPromotionArchiveBundle["summary"];
```

这里继续使用 archive bundle 的 state/summary 类型，说明 manifest digest 仍然绑定原 archive contract。字段没有增加或减少，所以 manifest digest 的 coveredFields 不变。

### 3. latestEvidence 的 absent/present 规范被保留

文件：[opsPromotionArchiveDigestPayloads.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveDigestPayloads.ts:33)

```ts
latestEvidence:
  bundle.latestEvidence === undefined
    ? { present: false }
    : {
```

这段逻辑很关键：没有 latest evidence 时，不是省略字段，而是固定成 `{ present: false }`。这保证 digest 输入稳定，不会因为 undefined 序列化细节产生漂移。

### 4. verification artifact payload 继续规整 digest value

文件：[opsPromotionArchiveDigestPayloads.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveDigestPayloads.ts:58)

```ts
artifacts: verification.artifacts.map((artifact) => ({
  name: artifact.name,
  type: artifact.type,
  valid: artifact.valid,
```

verification payload 只把 digest 对象规整成 `.value` 字符串，延续旧逻辑。v184 的边界测试会保护 artifact digest mismatch、summary drift、nextActions drift 等场景。

### 5. 主文件只 import helper，业务流程不变

文件：[opsPromotionArchiveBundle.ts](D:/nodeproj/orderops-node/src/services/opsPromotionArchiveBundle.ts:3)

```ts
import {
  archiveAttestationDigestPayload,
  archiveAttestationVerificationDigestPayload,
  archiveBundleDigestPayload,
```

`opsPromotionArchiveBundle.ts` 的调用点保持原名，说明 v187 是纯结构拆分。create/render/verification 主流程没有被重写。

## 验证

```text
npm run typecheck
npx vitest run test/opsPromotionArchiveBundleBoundary.test.ts test/stableDigest.test.ts test/realReadRehearsalIntake.test.ts
npm test
npm run build
```

结果：全部通过。

## 归档和成熟度变化

本版归档到：

```text
c/187/图片
c/187/解释
代码讲解记录_生产雏形阶段/191-ops-promotion-archive-digest-payload-split-v187.md
```

成熟度变化：Node 发布证据链从“类型独立”继续推进到“digest payload 独立”。当前仍不是生产发布系统，但核心证据链的可维护性明显变好。

## 一句话总结

v187 把 archive/manifest/attestation 的 digest 输入规范从巨型文件中拆出，保持 hash 算法和公开契约不变，为后续 validation/report/step 拆分继续降风险。
