# Node v220 managed audit adapter disabled shell 代码讲解

## 模块角色

v220 是真实 managed audit adapter 实现前的接口骨架版本：

```text
Node v219：implementation precheck packet
Node v220：ManagedAuditAdapter interface + disabled shell
Java v80 + mini-kv v89：下一步推荐并行 guard receipt
Node v221：之后再做本地 dry-run candidate
```

它的核心语义是：接口可以先稳定下来，但默认实现必须拒绝写入。

## 1. 新接口定义

文件：[managedAuditAdapterDisabledShell.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterDisabledShell.ts)

```ts
export interface ManagedAuditAdapter {
  append(record: ManagedAuditAppendRecord): Promise<ManagedAuditAdapterAppendResult>;
  query(filter: ManagedAuditQueryFilter): Promise<ManagedAuditAdapterQueryResult>;
  digest(): Promise<ManagedAuditAdapterDigestResult>;
  health(): Promise<ManagedAuditAdapterHealthResult>;
  describe(): Promise<ManagedAuditAdapterDescription>;
}
```

v220 的接口只保留五个最小能力：写入、查询、摘要、健康、描述。这里没有 Java client、mini-kv client，也没有外部数据库连接参数。

## 2. Disabled 实现

文件：[managedAuditAdapterDisabledShell.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterDisabledShell.ts)

```ts
export class DisabledManagedAuditAdapter implements ManagedAuditAdapter {
  async append(_record: ManagedAuditAppendRecord): Promise<ManagedAuditAdapterAppendResult> {
    return {
      status: "disabled",
      accepted: false,
      written: false,
      code: "MANAGED_AUDIT_ADAPTER_DISABLED",
      message: "Managed audit adapter shell is disabled by default; no audit record was written.",
    };
  }
}
```

`append` 明确返回 `accepted=false` 和 `written=false`，这是本版最重要的生产边界：接口存在，不代表可以写真实审计。

## 3. 查询和健康

文件：[managedAuditAdapterDisabledShell.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterDisabledShell.ts)

```ts
async query(_filter: ManagedAuditQueryFilter): Promise<ManagedAuditAdapterQueryResult> {
  return {
    status: "disabled",
    records: [],
    recordCount: 0,
    code: "MANAGED_AUDIT_ADAPTER_DISABLED",
  };
}
```

`query` 永远返回空数组；`health` 报告 `writable=false`、`externalConnectionAttempted=false`。这说明 v220 没有连接任何外部 managed audit 系统。

## 4. 选择器骨架

文件：[managedAuditAdapterDisabledShell.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterDisabledShell.ts)

```ts
export function selectManagedAuditAdapterShell(input: {
  config: Pick<AppConfig, "auditStoreKind" | "auditStoreUrl" | "upstreamActionsEnabled">;
})
```

选择器只声明：

```text
acceptedCandidateKinds=["disabled","local-dry-run"]
selectedAdapterKind="disabled"
productionExternalUrlAccepted=false
localDryRunSelected=false
```

也就是说，即使 `AUDIT_STORE_URL` 配了 postgres 这类真实 URL，v220 也不会接受它作为真实外部 adapter。

## 5. Profile 入口

文件：[managedAuditAdapterDisabledShell.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterDisabledShell.ts)

```ts
const sourcePrecheck = loadManagedAuditAdapterImplementationPrecheckPacket({ config: input.config });
const { adapter, selection } = selectManagedAuditAdapterShell({ config: input.config });
```

v220 消费 v219 precheck，但不会绕过 v219 的生产门槛。它只在 Node 内部构造 disabled adapter 并执行拒写 probe。

## 6. Probe 证据

文件：[managedAuditAdapterDisabledShell.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterDisabledShell.ts)

```ts
const [description, health, appendResult, queryResult, digestResult, digestRepeat] = await Promise.all([
  adapter.describe(),
  adapter.health(),
  adapter.append(sampleRecord),
  adapter.query({ requestId: sampleRecord.requestId, limit: 1 }),
  adapter.digest(),
  adapter.digest(),
]);
```

这里的 probe 用真实方法调用证明：

```text
append 不写
query 返回 0
digest 稳定
health 不尝试外部连接
describe 表示 disabled
```

## 7. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-adapter-disabled-shell",
```

v220 继续使用 v218 抽出来的 JSON/Markdown route registrar，避免 auditRoutes 继续膨胀。

## 8. 测试覆盖

文件：[managedAuditAdapterDisabledShell.test.ts](D:/nodeproj/orderops-node/test/managedAuditAdapterDisabledShell.test.ts)

```ts
expect(profile).toMatchObject({
  shellState: "disabled-shell-ready",
  readyForProductionAudit: false,
  connectsManagedAudit: false,
  adapterSelection: {
    selectedAdapterKind: "disabled",
    productionExternalUrlAccepted: false,
  },
});
```

测试还覆盖：

```text
DisabledManagedAuditAdapter 直接拒写
UPSTREAM_ACTIONS_ENABLED=true 会 blocked
生产外部 URL 不会被 selector 接受
JSON / Markdown 路由可用
```

## 本版项目进度

v220 把 managed audit adapter 从“计划中的真实连接”推进为“可测试接口 + 默认禁用实现”。下一步不该 Node 抢跑 v221，而应先让 Java v80 + mini-kv v89 推荐并行补只读 guard receipt。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditAdapterDisabledShell.test.ts + test/managedAuditAdapterImplementationPrecheckPacket.test.ts，9 tests 已通过
全量测试：npx vitest run --pool=threads --maxWorkers=4，162 files / 552 tests 已通过
npm run build：已通过
Chrome screenshot：已生成 c/220/图片/managed-audit-adapter-disabled-shell-v220.png
HTTP smoke：端口 4329 已通过，shellState=disabled-shell-ready，selectedAdapterKind=disabled，appendWritten=false，服务已停止
```
