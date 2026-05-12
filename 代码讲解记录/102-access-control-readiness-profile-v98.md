# v98 代码讲解：Access-control readiness profile

## 本版目标与系统定位

v98 继续按 `docs/plans/v95-production-gap-roadmap.md` 靠近生产级。v96 解决了上游只读证据接入，v97 解释了 audit store 配置迁移边界，v98 聚焦另一个硬缺口：访问控制。

当前 Node 控制面已经有 intent、approval、audit、readiness、archive 等能力，但还没有真正的登录、RBAC、操作人身份和审计访问保护。因此本版不直接实现完整权限系统，而是先做一个只读 readiness profile，把生产阻塞项明确列出来。

系统定位是：

```text
Node 控制面 access-control evidence
 -> 说明当前无认证 / 无 RBAC / 无 operator identity
 -> 定义最小角色模型
 -> 标记哪些 route group 需要保护
 -> 不改变真实运行权限
```

## 入口路由

入口在 `src/routes/statusRoutes.ts`：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/access-control-readiness", {
```

路由只读取当前配置：

```ts
const profile = createAccessControlReadinessProfile(deps.config);
```

它不接收请求体，不登录用户，不签发 token，不修改角色，也不启用真实上游动作。`format=markdown` 仍用于归档：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderAccessControlReadinessProfileMarkdown(profile);
}
```

## 响应模型与核心字段

模型在 `src/services/accessControlReadinessProfile.ts`：

```ts
export interface AccessControlReadinessProfile {
  readyForProductionAccessControl: false;
  readOnly: true;
  executionAllowed: false;
  currentState: {
    authenticationConfigured: false;
    rbacConfigured: false;
    operatorIdentityCaptured: false;
```

关键字段含义：

```text
readyForProductionAccessControl=false
```

说明当前不能对外暴露为生产控制面。

```text
readOnly=true
executionAllowed=false
```

说明这个 endpoint 只解释权限差距，不执行权限变更。

```text
upstreamActionsEnabled=false
```

这是补偿性安全控制：真实上游动作默认关闭，能降低当前无权限系统的风险，但不能替代登录和 RBAC。

## 服务层核心逻辑

当前状态是硬编码的真实现状：

```ts
currentState: {
  authenticationConfigured: false,
  rbacConfigured: false,
  operatorIdentityCaptured: false,
  auditReadProtected: false,
  mutationRoutesProtected: false,
  corsPolicy: "wildcard",
  upstreamActionsEnabled: config.upstreamActionsEnabled,
},
```

这里没有美化当前项目。Node 现在确实没有身份认证，也没有把 operator id 写进审计事件，所以 readiness profile 必须如实返回 false。

最小角色模型由 `createRequiredRoles()` 定义：

```ts
role: "viewer" | "operator" | "approver" | "auditor" | "admin";
```

角色语义是：

```text
viewer   -> 只读看 dashboard/readiness
operator -> 创建 intent / preflight
approver -> 审批或拒绝请求
auditor  -> 读取审计和归档证据
admin    -> 管理访问策略与紧急开关
```

route group 则把现有 API 粗分成生产权限面：

```ts
{
  id: "audit",
  routes: ["/api/v1/audit/events", "/api/v1/audit/summary"],
  currentProtection: "none",
  requiredMinimumRole: "auditor",
  productionReady: false,
}
```

这给后续真正实现 middleware 提供了清晰输入。

## 阻断、预警与安全边界

生产阻断项在 `collectProductionBlockers()`：

```ts
addMessage(blockers, checks.authenticationConfigured, "AUTHENTICATION_MISSING", ...);
addMessage(blockers, checks.rbacConfigured, "RBAC_MISSING", ...);
addMessage(blockers, checks.operatorIdentityCaptured, "OPERATOR_IDENTITY_MISSING", ...);
addMessage(blockers, checks.auditReadProtected, "AUDIT_READ_UNPROTECTED", ...);
addMessage(blockers, checks.mutationRoutesProtected, "MUTATION_ROUTES_UNPROTECTED", ...);
addMessage(blockers, checks.corsPolicyProductionReady, "CORS_POLICY_WILDCARD", ...);
```

这些 blocker 防的是生产控制面最核心的风险：不知道是谁操作、谁能审批、谁能看审计、哪些 mutation route 应该被保护。

预警部分保留当前补偿控制：

```ts
if (!config.upstreamActionsEnabled) {
  warnings.push({
    code: "ACTIONS_DISABLED_AS_COMPENSATING_CONTROL",
```

这说明上游动作关闭能降低风险，但不代表 access control 已经完成。

## 测试覆盖

测试文件是 `test/accessControlReadinessProfile.test.ts`。

默认场景断言当前阻塞项：

```ts
expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "AUTHENTICATION_MISSING",
  "RBAC_MISSING",
  "OPERATOR_IDENTITY_MISSING",
  "AUDIT_READ_UNPROTECTED",
  "MUTATION_ROUTES_UNPROTECTED",
  "CORS_POLICY_WILDCARD",
]);
```

危险场景打开上游动作：

```ts
const profile = createAccessControlReadinessProfile({
  upstreamActionsEnabled: true,
});
```

测试会要求额外出现：

```text
UPSTREAM_ACTIONS_ENABLED
```

这防止未来有人在没有权限系统时打开真实上游动作。

HTTP 测试覆盖 JSON / Markdown：

```ts
url: "/api/v1/security/access-control-readiness?format=markdown",
```

并检查 `AUTHENTICATION_MISSING`、`auditor` 角色和 endpoint 名称都出现在 Markdown 里，保证报告可归档、可审阅。

## 一句话总结

v98 把 Node 控制面的访问控制缺口从“隐含风险”变成明确的 readiness evidence，定义了最小角色模型和 route group 保护目标，但不改变真实权限行为，为后续实现认证、RBAC 和 operator audit context 铺路。
