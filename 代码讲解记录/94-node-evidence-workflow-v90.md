# 94. Node v90 GitHub Actions evidence workflow 代码讲解

## 1. workflow 的定位

`.github/workflows/node-evidence.yml` 是 evidence workflow 草案，不是部署流水线。

它只做 Node 自身验证：

```yaml
npm ci
npm run typecheck
npm test
npm run build
```

这符合 v90 边界：不写 secret、不部署、不调用 Java / mini-kv。

## 2. 安全环境变量写死为 false

workflow job 级别 env 明确禁用上游探测和动作：

```yaml
UPSTREAM_PROBES_ENABLED: "false"
UPSTREAM_ACTIONS_ENABLED: "false"
```

这意味着 CI smoke 可以启动 Node，但不会主动探测 Java / mini-kv，也不会放开真实上游写动作。

## 3. safe smoke 只验证 Node 自己

workflow 先启动构建后的 Node：

```yaml
node dist/server.js > node-evidence-smoke.log 2>&1 &
```

然后检查：

```yaml
curl --fail --silent "http://${HOST}:${PORT}/health"
```

最后检查 release evidence readiness gate：

```yaml
/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate
```

并要求：

```js
readyForReleaseEvidenceArchive === true
executionAllowed === false
```

## 4. 权限最小化

workflow 权限只有：

```yaml
permissions:
  contents: read
```

没有 `secrets.*`，没有部署命令，没有 docker push、kubectl、scp 等外部发布动作。

## 5. 测试锁住安全边界

`test/nodeEvidenceWorkflow.test.ts` 直接读取 workflow 文件并断言：

```ts
expect(workflow).toContain("npm run typecheck");
expect(workflow).toContain("UPSTREAM_ACTIONS_ENABLED: \"false\"");
expect(workflow).not.toContain("secrets.");
expect(workflow).not.toContain("kubectl");
```

这保证后续修改 workflow 时，不会悄悄把 evidence workflow 变成部署 workflow。
