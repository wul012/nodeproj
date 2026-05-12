# 92. Node v88 CI evidence command profile 代码讲解

## 1. v88 的职责

`src/services/ciEvidenceCommandProfile.ts` 新增的是 CI 命令画像，不是真实 CI 工作流。

核心字段：

```ts
profileVersion: "ci-evidence-command-profile.v1";
valid: boolean;
readOnly: true;
executionAllowed: false;
safeEnvironment: Record<string, string>;
commands: CiEvidenceCommand[];
```

它的作用是把“应该在 CI 里跑什么、用什么安全环境变量、哪些动作必须人工授权”标准化。

## 2. 安全环境变量是固定默认

profile 生成的安全环境变量明确禁用上游探测和上游动作：

```ts
UPSTREAM_PROBES_ENABLED: "false"
UPSTREAM_ACTIONS_ENABLED: "false"
```

这保持了 Node 只读控制面的边界：CI evidence job 可以验证 Node 自己，但不能顺手打到 Java 或 mini-kv。

## 3. 命令分成 CI 可跑和人工授权

CI 可跑命令包括：

```ts
typecheck
test
build
start-safe-smoke-server
smoke-health
smoke-release-evidence-readiness-gate
```

人工授权项包括：

```ts
manual-upstream-probes
manual-upstream-actions
```

这两个命令都设置：

```ts
ciRunnable: false
requiresManualAuthorization: true
```

也就是说 profile 允许把人工边界写清楚，但不会让它们进入默认 CI 执行路径。

## 4. 检查项保证 profile 自身安全

`checks` 会验证：

```ts
safeEnvironmentDisablesProbes
safeEnvironmentDisablesActions
typecheckCommandPresent
testCommandPresent
buildCommandPresent
readinessGateSmokePresent
noManualAuthorizationCommandRunsByDefault
allCiRunnableCommandsAreReadOnly
```

这些检查让 v88 不只是列命令，而是能判断这份 profile 是否适合作为后续 CI workflow 的来源。

## 5. 路由只读输出 JSON / Markdown

`src/routes/statusRoutes.ts` 新增：

```ts
/api/v1/ci/evidence-command-profile
```

并支持：

```ts
?format=markdown
```

本版没有创建 `.github/workflows`，因为计划明确 v88 只做 profile，不实际创建 CI。

## 6. 测试锁住命令契约

`test/ciEvidenceCommandProfile.test.ts` 覆盖：

```ts
standardizes read-only CI evidence commands and safe smoke environment
warns when the current runtime has upstream probes or actions enabled
exposes CI evidence command profile routes in JSON and Markdown
```

这保证后续真正创建 CI workflow 时，有稳定的命令来源和安全边界可以引用。
