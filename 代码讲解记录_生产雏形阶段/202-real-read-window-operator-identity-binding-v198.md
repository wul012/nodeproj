# Node v198 real-read window operator identity binding

## 模块角色

v198 专门承接 v197 的 `real-operator-identity` 硬门槛，把它拆成一个可单独验证的 rehearsal binding。

它不是 production IdP，也不是新的写认证；它只是把真实只读窗口在进入生产窗口之前必须具备的身份形状固定下来：operator id、roles、verified claim、approval correlation id。

## 关键代码

### 1. v198 服务入口

文件：[realReadWindowOperatorIdentityBinding.ts](D:/nodeproj/orderops-node/src/services/realReadWindowOperatorIdentityBinding.ts)

```ts
export async function loadRealReadWindowOperatorIdentityBinding(input: {
```

入口先复用 v197 的：

```ts
loadRealReadAdapterProductionReadinessCheckpoint(input)
```

这样 v198 的身份绑定不是空白起步，而是接着已经收口的 readiness checkpoint 继续往前推。

### 2. operator identity 与 approval correlation id

文件：[realReadWindowOperatorIdentityBinding.ts](D:/nodeproj/orderops-node/src/services/realReadWindowOperatorIdentityBinding.ts)

```ts
const identity = createBoundOperatorIdentity(input.headers ?? {});
const approvalBinding = createApprovalCorrelationBinding(input.headers ?? {});
```

这里把身份拆成两部分：

- `operatorIdentity`
- `approvalBinding`

这样能明确表达：只读窗口不仅要知道“谁在发起”，还要知道“关联哪一个审批/回合”。

### 3. binding rules

文件：[realReadWindowOperatorIdentityBinding.ts](D:/nodeproj/orderops-node/src/services/realReadWindowOperatorIdentityBinding.ts)

```ts
function createBindingRules(
  identity: BoundOperatorIdentity,
  approvalBinding: ApprovalCorrelationBinding,
): IdentityBindingRule[] {
```

这组规则把 v198 的安全边界定死：

- operator id 必须存在
- roles 必须存在且合法
- verified claim 必须为 true
- approval correlation id 必须有效
- 绑定完成也不能解锁上游动作

### 4. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```ts
/api/v1/production/real-read-window-operator-identity-binding
```

JSON 和 Markdown 都走同一套 profile，和前面的 readiness checkpoint 形式一致。

### 5. 测试覆盖

文件：[realReadWindowOperatorIdentityBinding.test.ts](D:/nodeproj/orderops-node/test/realReadWindowOperatorIdentityBinding.test.ts)

测试分三层：

- 缺头时 blocked
- 完整 rehearsal 绑定时 ready，但 production window 仍 false
- 路由 JSON/Markdown 输出正常

## 本版结论

v198 已经把 `real-operator-identity` 从一句硬门槛说明，变成一个可验证、可归档、可解释的 Node profile。

但它仍然只是 rehearsal binding，不是 production auth。真正的生产窗口仍然被 real IdP 和 persisted manual approval record 卡住。

## 下一步

按计划，下一个推荐并行版本是：

```text
Java v70 + mini-kv v79
```
