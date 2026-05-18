# 第一百零一版代码讲解：Dependabot/security maintenance

本版目标是给 Java 仓库补 Dependabot 自动依赖维护入口。它接在 v100 的 GitHub Actions Maven CI 之后，让 Maven 依赖和 GitHub Actions action 版本有稳定的安全提醒和 PR 审查路径。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v245-post-sandbox-precheck-roadmap.md
```

计划要求 Java v101：

```text
Dependabot/security maintenance
覆盖 Maven 与 GitHub Actions
不改 release approval 业务语义
```

这说明 v101 是安全维护配置版，不是业务功能推进版。

## Dependabot 配置

新增文件：

```text
D:\javaproj\.github\dependabot.yml
```

仓库根目录是 `D:\javaproj`，所以 Dependabot 配置放在根目录 `.github` 下。

## Maven 维护入口

Maven 配置扫描：

```yaml
package-ecosystem: "maven"
directory: "/advanced-order-platform"
```

原因是 `pom.xml` 位于：

```text
D:\javaproj\advanced-order-platform\pom.xml
```

调度策略：

```text
weekly
monday
09:00 Asia/Shanghai
```

更新策略：

```text
minor/patch grouped PR
ignore semver-major automatic version updates
```

## GitHub Actions 维护入口

GitHub Actions 配置扫描：

```yaml
package-ecosystem: "github-actions"
directory: "/"
```

当前 workflow 是：

```text
D:\javaproj\.github\workflows\maven-ci.yml
```

调度策略：

```text
weekly
monday
09:30 Asia/Shanghai
```

同样只把 minor/patch 归组，major 自动升级忽略，major 后续应作为单独版本审查。

## 为什么不直接升级依赖

本轮计划是 security maintenance，不是 dependency upgrade。直接改 Spring Boot、Testcontainers 或 GitHub Actions 主版本，会把风险从“维护入口”扩大成“运行时行为变化”，不符合 v101 的边界。

后续 Dependabot PR 会由 v100 的 Maven CI 基线校验，再人工决定是否合并。

## 本版不变项

本版没有改变：

```text
pom.xml dependency versions
Java source code
/api/v1/ops/release-approval-rehearsal response shape
managed-audit receipt digest
read-only/no-ledger/no-SQL/no-connection 边界
HTTP header 名称和 normalize 行为
```

也没有新增：

```text
真实 managed audit connection
credential value 读取
approval ledger 写入
schema migration SQL
Java / mini-kv / external audit service auto-start
```

## 验证

执行：

```text
mvn -q -DskipTests compile
git diff --check
```

## 一句话总结

v101 给 Java 仓库补 Maven + GitHub Actions Dependabot 安全维护配置，让后续依赖更新进入可审查、可被 CI 验证的 PR 流程；业务契约和 managed-audit 安全边界不变。
