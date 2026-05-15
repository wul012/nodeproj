# Node v199 real-read window audit store handoff contract

## 模块角色

v199 是 v198 之后的 managed audit store 硬门槛前置版本。它不连接数据库、不写托管审计、不迁移 file audit，只定义真实只读窗口将来要交给 managed audit store 的记录形状。

核心目标是把真实窗口从：

```text
有 operator identity binding
```

推进到：

```text
知道未来 managed audit store 必须保存哪些窗口记录
```

## 关键代码

### 1. 服务入口

文件：[realReadWindowAuditStoreHandoffContract.ts](D:/nodeproj/orderops-node/src/services/realReadWindowAuditStoreHandoffContract.ts)

```ts
export async function loadRealReadWindowAuditStoreHandoffContract(input: {
```

入口先消费 v198：

```ts
loadRealReadWindowOperatorIdentityBinding(input)
```

这确保 v199 不是独立凭空生成 audit contract，而是依赖已完成的 operator identity binding。

### 2. 三类 required records

文件：[realReadWindowAuditStoreHandoffContract.ts](D:/nodeproj/orderops-node/src/services/realReadWindowAuditStoreHandoffContract.ts)

```ts
function createRequiredRecords(
  identityBinding: RealReadWindowOperatorIdentityBindingProfile,
): AuditHandoffRecord[] {
```

v199 固定三类记录：

```text
real-read-window-open
real-read-window-imported-result
real-read-window-checkpoint
```

每条记录都有 digest、appendOnly、readOnly、writesNow=false，用来说明它们现在只是 handoff contract，不会写真实 managed audit store。

### 3. 安全检查

文件：[realReadWindowAuditStoreHandoffContract.ts](D:/nodeproj/orderops-node/src/services/realReadWindowAuditStoreHandoffContract.ts)

```ts
function createChecks(
```

重点检查包括：

```text
sourceIdentityBindingReady
requiredRecordsComplete
requiredRecordsReadOnly
managedAuditStoreNotConnected
managedAuditWritesStillDisabled
productionDatabaseNotTouched
upstreamActionsStillDisabled
```

这确保 v199 只是 contract，不是生产审计开关。

### 4. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```text
/api/v1/production/real-read-window-audit-store-handoff-contract
```

路由接收和 v198 一样的身份请求头，这样能够验证 v199 确实依赖 v198 的 identity binding。

### 5. 测试覆盖

文件：[realReadWindowAuditStoreHandoffContract.test.ts](D:/nodeproj/orderops-node/test/realReadWindowAuditStoreHandoffContract.test.ts)

测试覆盖：

- 缺少 v198 身份头时，handoff blocked。
- 完整身份头时，handoff ready，但 production audit/window/operations 仍为 false。
- JSON/Markdown 路由都正常输出。

## 本版结论

v199 把真实只读窗口的托管审计交接契约做出来了。现在系统知道未来 managed audit store 至少要接收 window-open、imported-result、checkpoint 三类记录。

但真实 managed audit store 仍未连接，生产窗口仍不能打开。

## 下一步

```text
Node v200：real-read window CI archive artifact manifest
```
