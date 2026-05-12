# v93 代码讲解：Workflow evidence verification

## 1. 入口：读取真实 workflow 文件

`src/services/workflowEvidenceVerification.ts` 的入口是：

```ts
export async function loadWorkflowEvidenceVerification(): Promise<WorkflowEvidenceVerification> {
  const workflowPath = path.join(process.cwd(), ".github", "workflows", "node-evidence.yml");
```

这里直接读取当前仓库里的 `.github/workflows/node-evidence.yml`，不是写死一个模拟样本。因此 endpoint 暴露的是当前真实 CI 文件的静态验证结果。

## 2. 核心检查：安全命令和危险命令分开验证

本版最重要的逻辑集中在 `createWorkflowEvidenceVerification()`：

```ts
const checks = {
  npmCiPresent: workflowContent.includes("npm ci"),
  typecheckPresent: workflowContent.includes("npm run typecheck"),
  testPresent: workflowContent.includes("npm test"),
  buildPresent: workflowContent.includes("npm run build"),
  probesDisabled: workflowContent.includes("UPSTREAM_PROBES_ENABLED: \"false\""),
  actionsDisabled: workflowContent.includes("UPSTREAM_ACTIONS_ENABLED: \"false\""),
  noSecretsReference: !workflowContent.includes("secrets."),
  noKubectl: !/\bkubectl\b/i.test(workflowContent),
  noDockerPush: !/\bdocker\s+push\b/i.test(workflowContent),
  noScp: !/\bscp\b/i.test(workflowContent),
};
```

这段代码的含义是：允许 Node 做 typecheck/test/build/smoke，但禁止 evidence workflow 触碰 secret、Kubernetes 部署、Docker 推送、服务器复制等真实运维动作。

## 3. release evidence smoke 必须保持执行关闭

workflow 里不仅要调用 release evidence readiness endpoint，还要断言真实执行仍关闭：

```ts
readinessSmokeKeepsExecutionBlocked: workflowContent
  .includes("json.readyForReleaseEvidenceArchive !== true || json.executionAllowed !== false"),
```

这和现有 Node 控制面边界一致：证据可以生成，真实上游动作不能在 CI evidence job 里发生。

## 4. 路由：JSON / Markdown 双格式

`src/routes/statusRoutes.ts` 新增：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/ci/workflow-evidence-verification", {
```

当 `format=markdown` 时返回可归档文本，否则返回 JSON：

```ts
const verification = await loadWorkflowEvidenceVerification();

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderWorkflowEvidenceVerificationMarkdown(verification);
}
```

这延续了 v87-v92 的证据接口风格，方便 smoke、截图、归档和后续 summary index 汇总。

## 5. 测试：真实 workflow 和危险样本都覆盖

`test/workflowEvidenceVerification.test.ts` 覆盖三类行为：

```ts
expect(verification.summary).toMatchObject({
  requiredCheckCount: 19,
  passingCheckCount: 19,
  failingCheckCount: 0,
  blockerCount: 0,
});
```

危险样本则主动追加：

```ts
`... secrets.PROD_TOKEN ... kubectl ... docker push ... scp ... UPSTREAM_ACTIONS_ENABLED: \"true\"`
```

并验证这些内容会变成 blockers。这样后续 workflow 如果被改偏，测试和 endpoint 都会第一时间暴露。
