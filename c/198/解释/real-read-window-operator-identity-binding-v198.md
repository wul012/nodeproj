# Node v198 real-read window operator identity binding

## 本版判断

v197 已经把真实只读窗口的生产 readiness checkpoint 固定下来，但 `real-operator-identity` 仍然只是一个硬门槛名字，没有单独的可验证 profile。v198 把这个门槛拆成一层独立的 rehearsal binding：请求头必须同时提供 operator id、roles、verified claim 和 approval correlation id，才能形成“身份绑定形状完整”的只读证据。

这不是 production IdP，也不会打开生产窗口。它只是把“谁在发起真实只读窗口、关联哪个审批、是否已经完成本地 rehearsal 绑定”变成一个单独可追踪的 Node profile。

## 本版范围

新增：
```text
GET /api/v1/production/real-read-window-operator-identity-binding
GET /api/v1/production/real-read-window-operator-identity-binding?format=markdown
```

本版验证的是：

```text
- operator id 必须存在
- roles 必须存在且不能含拒绝角色
- verified claim 必须存在且为 true
- approval correlation id 必须存在且格式有效
- 生产 IdP 仍未连接
- 生产窗口和生产操作仍然保持 false
```

## 代码讲解要点

1. `src/services/realReadWindowOperatorIdentityBinding.ts`
   - 先复用 v197 的 `loadRealReadAdapterProductionReadinessCheckpoint`。
   - 再从请求头读取 `x-orderops-operator-id`、`x-orderops-roles`、`x-orderops-operator-verified`、`x-orderops-approval-correlation-id`。
   - 输出 `bindingState`、`bindingDigest`、`productionBlockers`，并把 production window 仍然锁死。

2. `src/routes/statusRoutes.ts`
   - 把新 profile 暴露到 production 路由。
   - JSON/Markdown 共用同一路由模式，和前面的 readiness checkpoint 保持一致。

3. `test/realReadWindowOperatorIdentityBinding.test.ts`
   - 先验证缺少身份头时是 blocked。
   - 再验证完整 rehearsal 绑定时可以 ready，但生产窗口仍然 false。
   - 路由测试确认 JSON 和 Markdown 都能正常输出。

## 验证结果

```text
npm run typecheck：通过
聚焦测试：4 files / 11 tests 通过
npm test：通过
npm run build：通过
```

## 下一步

本版已经收口。下一步按计划应转到推荐并行：

```text
Java v70 + mini-kv v79
```

然后再回到 Node v199 的 managed audit store handoff contract。
