# Node v249 运行调试说明：Dependabot security maintenance

本版采纳三项目通用优化建议中的低风险高收益项：补 Dependabot 自动依赖维护。它不是业务版本，不推进 rehearsal guard，不打开 managed audit connection。

## 本版新增

新增文件：

```text
.github/dependabot.yml
```

覆盖两个生态：

```text
npm
github-actions
```

策略：

```text
weekly
Asia/Shanghai
minor / patch 分组
semver-major 不自动升级
open PR limit 控制噪音
```

## CI 触发修正

`node-evidence.yml` 的 push / pull_request paths 新增：

```text
.github/dependabot.yml
```

这样 Dependabot 配置变化也会触发 Node Evidence CI。

## 测试

新增：

```text
test/dependabotConfig.test.ts
```

覆盖：

```text
dependabot.yml 包含 npm
dependabot.yml 包含 github-actions
weekly schedule
Asia/Shanghai timezone
minor / patch groups
semver-major ignore
Node Evidence workflow 监听 .github/dependabot.yml
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

## 三项目节奏

这类优化可以三项目并行：

```text
Node v249：npm + GitHub Actions Dependabot
Java v101：Maven + GitHub Actions Dependabot
mini-kv v110：GitHub Actions Dependabot
```

完成后再进入 Node v250 三项目对齐 / rehearsal guard。

## 边界

- 未启动 Java / mini-kv。
- 未构建或测试 Java / mini-kv。
- 未修改 Java / mini-kv。
- 未升级任何依赖版本。
- 未读取 credential value。
- 未打开 managed audit connection。
- 未执行 schema migration。
