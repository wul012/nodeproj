# 第一百零四版代码讲解：access guard audit context

本版目标是把 v101 的 access guard dry-run 结果从响应头推进到审计事件上下文。

它不是新的登录系统，不会读取 JWT secret，不会拒绝请求，也不会启用真实 RBAC enforcement。它的角色是让每条请求审计事件带上访问控制预演证据，后续再把 operator identity 和 durable audit 串起来。

## 项目进度说明

v104 处在 `v103-production-auth-audit-roadmap.md` 的第一步，也标志着项目进入“生产雏形阶段”的 access/audit 收敛小阶段。

v103 结束时，项目状态是：

```text
upstream-observability: ready=true
execution-safety: ready=true
access-control: ready=false
audit: ready=false
readyForProductionOperations=false
```

也就是说，Java v47 和 mini-kv v56 的上游只读证据已经能被 Node 汇总，Node 自己也保持 `UPSTREAM_ACTIONS_ENABLED=false`，执行安全边界比较稳。但生产级最硬的两个缺口仍然是：

```text
access-control 还只是 policy + dry-run guard
audit 还没有形成足够生产化的持久审计链
```

v104 推进的是这两个缺口之间的连接点：

```text
v100: 定义 access policy map
v101: 对请求做 dry-run guard，结果写到 response header
v102: audit store 可以选择 memory/file
v103: 汇总后判断 access-control 与 audit 仍未生产就绪
v104: 把 dry-run guard 证据写入 audit event
```

完成 v104 后，项目进度变化是：

```text
访问控制不再只是“请求头上能看到 wouldDeny”
而是进入了 audit evidence 链路
```

这还不能让项目生产可用，因为：

```text
没有真实认证
没有真正阻断请求
没有 RBAC enforcement
operator identity 还没有作为稳定审计契约沉淀
file audit 还只是原型，不是生产数据库或托管审计存储
```

因此 v104 后的合理承接是：

```text
v105: operator identity contract rehearsal
v106: file audit restart evidence report
v107: production readiness summary v4
```

一句话判断当前项目进度：v104 让 access-control 证据开始进入审计链，项目从“可观察的安全预演”往“可审计的安全预演”前进一步，但仍未进入真实生产执行阶段。

## 入口位置

本版没有新增 HTTP route，而是改造全局请求钩子：

```text
src/app.ts
```

访问控制评估仍然发生在 `onRequest`：

```ts
const evaluation = evaluateAccessGuard({
  method: request.method,
  path: request.url,
  headers: request.headers,
});
requestAccessGuards.set(request, toAuditAccessGuardContext(evaluation));
```

这段代码保持了 v101 的行为：请求会被评估，但不会被阻断。新增的是把评估结果放进 `WeakMap`，等待 `onResponse` 写入审计。

## 审计事件模型

审计事件新增字段在：

```text
src/services/auditLog.ts
```

核心模型是：

```ts
export interface AuditEvent {
  id: string;
  requestId: string;
  method: string;
  path: string;
  routeGroup: string;
  accessGuard?: AuditAccessGuardContext;
  statusCode: number;
  outcome: AuditOutcome;
  durationMs: number;
  occurredAt: string;
}
```

`accessGuard` 是可选字段，是为了兼容旧的 audit JSONL 和已有测试。旧事件没有这个字段也能继续解析。

## accessGuard 核心字段

新增上下文类型是：

```ts
export interface AuditAccessGuardContext {
  guardVersion: "access-guard-dry-run.v1";
  mode: "dry-run";
  rejectsRequests: false;
  policyMatched: boolean;
  policyId?: string;
  routeGroup: string;
  requiredRole?: string;
  matchedRoles: string[];
  wouldDeny: boolean;
  reason: "missing_policy" | "missing_identity" | "missing_required_role" | "allowed_by_role";
}
```

这些字段的控制面语义是：

```text
mode=dry-run
rejectsRequests=false
```

说明它只记录预演结果，不改变请求命运。

```text
routeGroup / requiredRole / matchedRoles / wouldDeny / reason
```

说明这个请求命中了哪个策略，需要什么角色，当前请求携带了哪些角色，如果未来启用 enforcement 是否会被拒绝，以及拒绝或放行的原因。

## 写入审计事件

请求完成时，`onResponse` 把上下文写入 `AuditLog.record`：

```ts
auditLog.record({
  requestId: request.id,
  method: request.method,
  path: request.url,
  accessGuard: requestAccessGuards.get(request),
  statusCode: reply.statusCode,
  durationMs: startedAt === undefined ? 0 : performance.now() - startedAt,
});
```

这里没有额外发起网络请求，也不会触碰 Java 或 mini-kv。它只是把 Node 本地已经算出来的 dry-run 证据，跟原来的 method、path、statusCode、durationMs 放在同一条审计事件里。

## 转换边界

`AccessGuardEvaluation` 里还有 `requestIdentity`，但 v104 只把访问控制判断字段写入 audit：

```ts
function toAuditAccessGuardContext(evaluation: AccessGuardEvaluation): AuditAccessGuardContext {
  return {
    guardVersion: evaluation.guardVersion,
    mode: evaluation.mode,
    rejectsRequests: evaluation.rejectsRequests,
    policyMatched: evaluation.policyMatched,
    policyId: evaluation.policyId,
    routeGroup: evaluation.routeGroup,
    requiredRole: evaluation.requiredRole,
    matchedRoles: evaluation.matchedRoles,
    wouldDeny: evaluation.wouldDeny,
    reason: evaluation.reason,
  };
}
```

这样拆是为了保持 v104 的工作量刚好：本版只做 guard audit context。operator identity 的稳定契约留给 v105。

## 文件型审计兼容

`FileBackedAuditStore` 会从 JSONL 恢复事件，所以解析器也要允许新字段：

```ts
&& isAuditAccessGuardContext(event.accessGuard)
```

如果 `accessGuard` 不存在，解析仍然通过：

```ts
if (value === undefined) {
  return true;
}
```

这保证旧归档不失效，新归档能带上访问控制证据。

## 测试覆盖

测试文件是：

```text
test/accessGuardAuditContext.test.ts
```

第一组测试通过真实 Fastify app 请求 `/api/v1/security/access-policy`，再读 `/api/v1/audit/events`：

```ts
expect(events.json().events[0]).toMatchObject({
  method: "GET",
  path: "/api/v1/security/access-policy",
  accessGuard: {
    guardVersion: "access-guard-dry-run.v1",
    mode: "dry-run",
    rejectsRequests: false,
    policyMatched: true,
    policyId: "readiness-and-status",
    routeGroup: "readiness",
    requiredRole: "viewer",
    matchedRoles: ["viewer"],
    wouldDeny: false,
    reason: "allowed_by_role",
  },
});
```

第二组测试用 `FileBackedAuditStore` 写入并重新加载，确认 `accessGuard` 不会在持久化恢复时丢失：

```ts
expect(restored.list()[0]).toMatchObject({
  requestId: "req-guard",
  accessGuard: {
    routeGroup: "intent",
    requiredRole: "operator",
    matchedRoles: ["auditor"],
    wouldDeny: true,
    reason: "missing_required_role",
  },
});
```

## 一句话总结

v104 把 access guard dry-run 从“只在响应头可见”推进到“每条 audit event 都能复查”，为 v105 的 operator identity 契约和 v106 的 file audit restart evidence 打下审计链路基础。
