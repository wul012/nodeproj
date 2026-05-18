# 第二百四十九版代码讲解：Dependabot security maintenance

本版目标是采纳三项目通用建议里的低风险高收益项：为 Node 仓库启用 Dependabot 自动依赖维护。它不升级依赖，不改业务逻辑，也不推进 managed audit rehearsal guard。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v245-post-sandbox-precheck-roadmap.md
```

当前节奏从：

```text
Node v248 + Java v100 + mini-kv v109 质量优化
```

继续扩展为：

```text
Node v249 + Java v101 + mini-kv v110 Dependabot/security maintenance
```

这三项可以并行做，因为它们只是仓库安全维护配置，不互相依赖，不打开真实 managed audit connection。

## dependabot.yml

新增：

```text
.github/dependabot.yml
```

文件使用 GitHub Dependabot v2 配置：

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "Asia/Shanghai"
```

Node 仓库当前依赖来自：

```text
package.json
package-lock.json
```

所以 npm ecosystem 是必须项。

## 依赖分组

npm 依赖被分成两组：

```yaml
groups:
  node-production-dependencies:
    dependency-type: "production"
    update-types:
      - "minor"
      - "patch"
  node-development-dependencies:
    dependency-type: "development"
    update-types:
      - "minor"
      - "patch"
```

这样 Fastify 这类 production dependency 和 TypeScript / Vitest / tsx 这类 development dependency 不会混在同一个 PR 里。

## major 升级策略

本版明确忽略自动 semver-major：

```yaml
ignore:
  - dependency-name: "*"
    update-types:
      - "version-update:semver-major"
```

原因是 Node 当前控制面已经有大量证据链和归档测试，major 升级应该单独开版本做验证，不适合 Dependabot 自动混入普通安全维护 PR。

## GitHub Actions 维护

同一个文件也覆盖 GitHub Actions：

```yaml
- package-ecosystem: "github-actions"
  directory: "/"
  schedule:
    interval: "weekly"
```

当前仓库有：

```text
.github/workflows/node-evidence.yml
```

所以需要让 Dependabot 也能提醒 `actions/checkout`、`actions/setup-node` 等 Actions 版本更新。

## CI workflow path

`node-evidence.yml` 的 push / pull_request paths 都新增：

```yaml
- ".github/dependabot.yml"
```

这样 Dependabot 配置变更也会触发 Node Evidence CI，不会出现“改了依赖维护配置但 CI 不跑”的盲点。

## 测试

新增：

```text
test/dependabotConfig.test.ts
```

它验证：

```ts
expect(config).toContain('package-ecosystem: "npm"');
expect(config).toContain('package-ecosystem: "github-actions"');
expect(config).toContain('interval: "weekly"');
expect(config).toContain('timezone: "Asia/Shanghai"');
expect(config).toContain("version-update:semver-major");
```

同时验证 workflow 监听了 dependabot 配置：

```ts
expect(workflow).toContain(".github/dependabot.yml");
expect(workflow).toContain("npm ci");
expect(workflow).toContain("npm run typecheck");
expect(workflow).toContain("npm test");
expect(workflow).toContain("npm run build");
```

聚焦验证：

```text
npm run typecheck -> passed
vitest run dependabotConfig.test.ts -> 2 tests passed
npm test -> 189 files / 633 tests passed
npm run build -> passed
safe HTTP smoke -> /health ok
```

HTTP smoke 使用安全环境变量：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
```

## 本版边界

- 不升级任何依赖版本。
- 不修改业务代码。
- 不启动 Java。
- 不启动 mini-kv。
- 不构建、不测试、不修改 Java / mini-kv。
- 不读取 credential value。
- 不打开 managed audit connection。
- 不执行 schema migration。

## 下一步

```text
Java v101 + mini-kv v110 可以并行补 Dependabot
Node v250：three-project alignment / manual sandbox connection rehearsal guard
```

如果 Java v101 或 mini-kv v110 的安全维护配置改变了 CI 行为，Node v250 需要先只读核对它们的证据，再决定是否继续 rehearsal guard。
