# Node v246 运行调试说明：GitHub CI historical sibling evidence fallback

本版由 GitHub CI 红灯衍生，不是原计划里的业务推进版。

## 背景

v245 已完成 `sandbox connection precheck packet`，但 GitHub Actions 的 `Node Evidence / Typecheck, test, build, and safe smoke` 在测试阶段失败。失败根因是旧 managed-audit sandbox 链路仍会读取：

```text
D:/javaproj/advanced-order-platform/...
D:/C/mini-kv/...
```

这些路径在本机存在，在 GitHub runner 上不存在，所以 CI 会把旧证据链判成 `blocked`。

## 本版处理

新增 `historicalEvidenceResolver`，对历史 evidence 路径做仓库内 fallback：

```text
D:/javaproj/advanced-order-platform/
 -> fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/

D:/C/mini-kv/
 -> fixtures/historical/sibling-workspaces/mini-kv/
```

本版只归档 Node 实际读取的 60 个历史证据文件，约 804.5 KB，没有全量复制 Java 或 mini-kv 仓库。

## 调试重点

新增环境变量：

```text
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
```

它可以在本机强制绕过真实 `D:/javaproj` 和 `D:/C/mini-kv`，模拟 GitHub runner 只靠 Node 仓库 fixture 运行。

聚焦验证：

```text
19 test files passed
56 tests passed
forced fallback enabled
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 186 files / 624 tests passed
npm run build -> passed
HTTP smoke -> /health ok, precheck packet JSON ready, Markdown 200
```

## 边界

- 未启动 Java / mini-kv。
- 未构建或测试 Java / mini-kv。
- 未修改 Java / mini-kv。
- 未打开 managed audit connection。
- 未读取 credential value。

## 后续计划

原计划业务版顺延：

```text
当前下一步：推荐并行 Java v99 + mini-kv v108
随后：Node v247 做 precheck upstream receipt verification
再后：Node v248 做 rehearsal guard
```
