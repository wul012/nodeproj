# 93. Node v89 Deployment safety profile 代码讲解

## 1. v89 的职责

`src/services/deploymentSafetyProfile.ts` 新增部署安全画像。

它不是部署工具，而是把当前 Node 配置整理成可检查的部署前安全报告：

```ts
suitableForProductionDemo: boolean;
readOnly: true;
executionAllowed: false;
configSnapshot: {...}
blockers: DeploymentSafetyMessage[];
warnings: DeploymentSafetyMessage[];
recommendations: DeploymentSafetyMessage[];
```

## 2. configSnapshot 记录运行配置

profile 会记录关键运行配置：

```ts
host
port
logLevel
orderPlatformUrl
miniKv
upstreamProbesEnabled
upstreamActionsEnabled
mutationRateLimitWindowMs
mutationRateLimitMax
fixtures
```

这些字段对应真实部署前最容易出错的部分：监听地址、上游地址、动作开关、日志、限流、fixture 路径。

## 3. blockers 是必须修复的问题

`collectBlockers()` 会拦截真正不能进入生产级演示的配置，例如：

```ts
UPSTREAM_ACTIONS_ENABLED
INVALID_PORT
UNKNOWN_LOG_LEVEL
MUTATION_RATE_LIMIT_INVALID
FIXTURE_PATH_NOT_ABSOLUTE
```

最关键的是：

```ts
upstreamActionsDisabled: config.upstreamActionsEnabled === false
```

只要真实上游动作打开，deployment safety profile 就不适合生产级演示。

## 4. warnings 标出“还能跑，但不够生产化”

v89 smoke 里 warning=5，主要包括：

```ts
HOST_LOOPBACK
UPSTREAM_PROBES_DISABLED
ORDER_PLATFORM_LOCALHOST
MINIKV_LOCALHOST
LOGGING_SILENT
```

这些不是阻断项，因为本次是安全 smoke；但它们说明如果要接近生产级，后面要处理外部访问、环境化上游地址、可观测日志和协调 probe window。

## 5. recommendations 指向后续硬工程

recommendations 包括：

```ts
ADD_REAL_CI_WORKFLOW
PERSIST_AUDIT_LOGS
DEFINE_ROLLBACK_RUNBOOK
PLAN_PROBE_WINDOW
```

这正好承接“靠近生产级”的规则：后续版本不能只加展示面板，要补 CI、持久化、回滚和观测。

## 6. 路由只读输出

`src/routes/statusRoutes.ts` 新增：

```ts
/api/v1/deployment/safety-profile
```

并支持：

```ts
?format=markdown
```

本版没有真实部署，也没有写入任何服务器环境变量或密钥。

## 7. 测试覆盖

`test/deploymentSafetyProfile.test.ts` 覆盖：

```ts
summarizes production-demo deployment safety
blocks production-demo suitability when upstream actions are enabled
exposes deployment safety profile routes in JSON and Markdown
```

其中 upstream actions enabled 的测试保证了最关键的生产安全边界不会被误放开。
