# 10 - V6 操作意图和确认状态机

V6 在 V5 的 action plan 基础上加了一层“操作意图”：用户不直接点危险按钮，而是先创建一个 intent，Node 本地判断它是否被上游开关挡住、角色是否够权限、是否需要确认短语。

这版仍然不访问 Java / mini-kv。它只是把“准备做什么”记录成一个可审计对象。

## 1. operator role 和状态

文件：`src/services/operationIntent.ts`

角色先做成本地枚举：

```ts
export const operatorRoles = ["viewer", "operator", "admin"] as const;
```

状态也很明确：

```ts
export type OperationIntentStatus = "blocked" | "pending-confirmation" | "confirmed" | "expired";
```

这其实已经是一个小型后台审批流的雏形：

```text
create intent
 -> blocked
 -> pending-confirmation
 -> confirmed
 -> expired
```

## 2. 风险等级映射角色

文件：`src/services/operationIntent.ts`

V5 的 `ActionPlan` 里已经有 `risk`：

```ts
export type ActionRisk = "diagnostic" | "read" | "write";
```

V6 把风险映射成最小角色：

```ts
const requiredRoleByRisk: Record<ActionRisk, OperatorRole> = {
  diagnostic: "viewer",
  read: "operator",
  write: "admin",
};
```

含义是：

- `viewer` 可以确认诊断动作，例如 `kv-status`。
- `operator` 可以确认读动作，例如 `order-products`。
- `admin` 才能确认写动作，例如 `order-create`、`kv-set`。

角色大小用数字表达：

```ts
const roleRank: Record<OperatorRole, number> = {
  viewer: 0,
  operator: 1,
  admin: 2,
};
```

这样判断权限时不用写很多 if。

## 3. 策略判断仍然先看上游动作闸门

文件：`src/services/operationIntent.ts`

核心策略函数：

```ts
export function evaluatePolicy(plan: ActionPlan, role: OperatorRole): PolicyDecision {
  const requiredRole = requiredRoleByRisk[plan.risk];
  if (!plan.allowed) {
    return {
      allowed: false,
      requiredRole,
      actualRole: role,
      blockedBy: "UPSTREAM_ACTIONS_ENABLED=false",
      message: "The upstream action gate is closed; this intent cannot become confirmable yet.",
    };
  }
```

这里复用了 V4/V5 的安全设计：只要 `UPSTREAM_ACTIONS_ENABLED=false`，即使你是 `admin`，intent 也只能是 `blocked`。

然后再判断角色：

```ts
if (roleRank[role] < roleRank[requiredRole]) {
  return {
    allowed: false,
    requiredRole,
    actualRole: role,
    blockedBy: "ROLE_NOT_ALLOWED",
    message: `Role ${role} cannot confirm ${plan.risk} actions; required role is ${requiredRole}.`,
  };
}
```

这就是 V6 的本地 RBAC 雏形。

## 4. 创建 intent

文件：`src/services/operationIntent.ts`

创建时先复用 V5 的 `createActionPlan`：

```ts
const plan = createActionPlan(this.config, input);
const policy = evaluatePolicy(plan, input.role);
const status: OperationIntentStatus = policy.allowed ? "pending-confirmation" : "blocked";
```

这几行很关键：

- action plan 负责回答“这个动作会做什么”。
- policy 负责回答“当前是否允许进入确认”。
- status 负责表达 intent 当前生命周期。

intent 里面保存了 plan、policy、operator 和确认短语：

```ts
const intent: OperationIntent = {
  id: crypto.randomUUID(),
  status,
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
  expiresAt: new Date(now.getTime() + this.ttlMs).toISOString(),
  operator: {
    id: operatorId,
    role: input.role,
  },
  reason: normalizeReason(input.reason),
  plan,
  policy,
  confirmation: {
    requiredText: `CONFIRM ${plan.action}`,
  },
};
```

这里仍然没有调用上游 client。

## 5. 确认 intent

文件：`src/services/operationIntent.ts`

确认时先看状态：

```ts
if (current.status !== "pending-confirmation") {
  throw new AppHttpError(409, "INTENT_NOT_CONFIRMABLE", "Operation intent is not waiting for confirmation", {
    intentId,
    status: current.status,
  });
}
```

再要求必须是创建人本人确认：

```ts
if (input.operatorId.trim() !== current.operator.id) {
  throw new AppHttpError(403, "INTENT_OPERATOR_MISMATCH", "Only the operator who created the intent can confirm it", {
    intentId,
  });
}
```

最后检查确认短语：

```ts
if (input.confirmText.trim() !== current.confirmation.requiredText) {
  throw new AppHttpError(400, "INTENT_CONFIRM_TEXT_MISMATCH", "Confirmation text does not match the required phrase", {
    requiredText: current.confirmation.requiredText,
  });
}
```

确认成功只改变本地状态：

```ts
current.status = "confirmed";
current.updatedAt = now.toISOString();
current.confirmation.confirmedAt = now.toISOString();
current.confirmation.confirmedBy = current.operator.id;
```

V6 到这里为止仍然不执行真实上游动作。后续如果要做“confirmed 后执行”，需要你明确给窗口，我再接真实 Java / mini-kv 联调。

## 6. 路由层

文件：`src/routes/operationIntentRoutes.ts`

V6 暴露四个接口：

```ts
app.get<{ Querystring: ListIntentQuery }>("/api/v1/operation-intents", ...)
app.get<{ Params: IntentParams }>("/api/v1/operation-intents/:intentId", ...)
app.post<{ Body: CreateIntentBody }>("/api/v1/operation-intents", ...)
app.post<{ Params: IntentParams; Body: ConfirmOperationIntentInput }>("/api/v1/operation-intents/:intentId/confirm", ...)
```

创建接口里用 schema 限制 body：

```ts
required: ["action", "operatorId", "role"],
properties: {
  action: { type: "string", enum: actionKeys },
  target: { type: "string", enum: targetKeys },
  operatorId: { type: "string", minLength: 1, maxLength: 80 },
  role: { type: "string", enum: operatorRoles },
  reason: { type: "string", maxLength: 400 },
},
```

这让非法 role、非法 action 在路由层就被挡住。

## 7. Dashboard 入口

文件：`src/ui/dashboard.ts`

V6 页面加了 operator、role、reason：

```html
<input id="operatorId" placeholder="Operator ID" value="local-dev">
<select id="operatorRole" aria-label="Operator role">
  <option value="admin">admin</option>
  <option value="operator">operator</option>
  <option value="viewer">viewer</option>
</select>
<input id="intentReason" placeholder="Reason" value="local V6 check">
```

点击创建 intent：

```js
if (action === "createIntent") {
  const intent = await api("/api/v1/operation-intents", {
    method: "POST",
    body: JSON.stringify({
      action: $("planAction").value,
      operatorId: $("operatorId").value,
      role: $("operatorRole").value,
      reason: $("intentReason").value,
    }),
  });
  $("intentId").value = intent.id;
  $("confirmText").value = intent.confirmation.requiredText;
  write(intent);
}
```

确认 intent：

```js
if (action === "confirmIntent") {
  write(await api("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/confirm", {
    method: "POST",
    body: JSON.stringify({
      operatorId: $("operatorId").value,
      confirmText: $("confirmText").value,
    }),
  }));
}
```

## 8. 测试覆盖

文件：`test/operationIntent.test.ts`

默认动作闸门关闭时，intent 被 blocked：

```ts
const store = new OperationIntentStore(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "false" }));

const intent = store.create({
  action: "kv-set",
  operatorId: "dev-admin",
  role: "admin",
  reason: "safe dry-run",
});

expect(intent).toMatchObject({
  status: "blocked",
  policy: {
    allowed: false,
    blockedBy: "UPSTREAM_ACTIONS_ENABLED=false",
  },
});
```

打开动作闸门后，写动作要求 admin：

```ts
expect(evaluatePolicy(plan, "operator")).toMatchObject({
  allowed: false,
  blockedBy: "ROLE_NOT_ALLOWED",
  requiredRole: "admin",
});
```

确认短语匹配时，状态进入 `confirmed`：

```ts
const confirmed = store.confirm(intent.id, {
  operatorId: "dev-viewer",
  confirmText: intent.confirmation.requiredText,
});

expect(confirmed).toMatchObject({
  id: intent.id,
  status: "confirmed",
});
```

## 一句话总结

V6 把“点按钮”升级成了“创建操作意图 -> 本地策略判断 -> 明确短语确认”的后台控制面流程；它还没执行真实上游动作，但已经具备真实系统里权限和审批流的形状。
