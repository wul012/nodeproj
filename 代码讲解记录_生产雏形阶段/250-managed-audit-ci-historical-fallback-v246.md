# 第二百四十六版代码讲解：GitHub CI historical sibling evidence fallback

本版目标是修复 GitHub Actions 上的 Node 测试红灯。v245 已经完成 sandbox connection precheck packet；v246 不继续推进 managed audit 业务能力，而是把旧 managed-audit sandbox 链路的历史证据读取变成 CI 可复现。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v245-post-sandbox-precheck-roadmap.md
```

计划原本要求下一步是：

```text
推荐并行 Java v99 + mini-kv v108
```

但 GitHub CI 在 v245 后出现红灯。失败原因不是业务逻辑，而是 Node 旧测试链依赖本机路径：

```text
D:/javaproj/advanced-order-platform/...
D:/C/mini-kv/...
```

这些路径在本机存在，在 GitHub runner 上不存在。v246 因此作为 CI 稳定性修复插入，原来的 Node receipt verification 顺延为 v247。

## historicalEvidenceResolver

新增文件：

```text
src/services/historicalEvidenceResolver.ts
```

核心映射是：

```ts
const FALLBACK_MAPPINGS = Object.freeze([
  {
    prefix: "D:/nodeproj/orderops-node/",
    fallbackRoot: "",
  },
  {
    prefix: "D:/javaproj/advanced-order-platform/",
    fallbackRoot: "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/",
  },
  {
    prefix: "D:/C/mini-kv/",
    fallbackRoot: "fixtures/historical/sibling-workspaces/mini-kv/",
  },
]);
```

意思是：如果历史证据文件在本机真实路径存在，就继续读真实路径；如果不存在，就落到 Node 仓库内的 `fixtures/historical/sibling-workspaces/`。

## 强制 fallback 调试开关

本版加了一个调试开关：

```ts
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
```

路径解析入口是：

```ts
export function resolveHistoricalEvidencePath(inputPath: string): string {
  if (process.env[FORCE_FALLBACK_ENV] !== "true" && existsSync(inputPath)) {
    return inputPath;
  }

  const normalizedPath = inputPath.replace(/\\/g, "/");
  for (const mapping of FALLBACK_MAPPINGS) {
    if (normalizedPath.startsWith(mapping.prefix)) {
      return path.resolve(REPO_ROOT, mapping.fallbackRoot, normalizedPath.slice(mapping.prefix.length));
    }
  }

  return inputPath;
}
```

这段代码让本机也能模拟 GitHub runner：

```text
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
```

开启后即使本机有 `D:\javaproj` 和 `D:\C\mini-kv`，Node 也会优先走仓库内 fixture。

## service 接入方式

旧 service 原本直接导入 `node:fs`：

```ts
import { existsSync, readFileSync, statSync } from "node:fs";
```

v246 改成同名别名导入：

```ts
import {
  historicalEvidenceExists as existsSync,
  readHistoricalEvidenceFile as readFileSync,
  statHistoricalEvidence as statSync,
} from "./historicalEvidenceResolver.js";
```

这样业务代码里的 `existsSync(filePath)`、`readFileSync(filePath, "utf8")`、`statSync(filePath).size` 不需要大面积重写，但路径解析已经具备 CI fallback。

## 为什么没有全量复制上游项目

本版只归档 Node 实际读取的历史 evidence 文件：

```text
fixtures/historical/sibling-workspaces/
```

统计结果：

```text
60 files
804.5 KB
```

没有把 Java 或 mini-kv 的整个仓库搬进 Node。这样能解决 CI 复现问题，也不会让 Node 仓库因为历史归档膨胀失控。

## mini-kv 滚动 fixture 白名单

mini-kv 的 `runtime-smoke-evidence.json` 是滚动证据。它现在可以被后续版本更新为：

```text
Node v246 manual sandbox connection precheck upstream receipt verification
```

旧 Node 链路仍然需要验证它的只读边界。因此 v246 只扩大可接受的 consumer hint，不放松核心边界：

```ts
{
  projectVersion: "0.102.0",
  releaseVersion: "v102",
  consumerHint: "Node v246 manual sandbox connection precheck upstream receipt verification",
}
```

保留的硬边界仍包括：

```text
readOnly=true
executionAllowed=false
restoreExecutionAllowed=false
orderAuthoritative=false
runtimeWriteObserved=false
writeCommandsExecuted=false
```

所以这不是“降低测试要求”，而是承认 mini-kv 当前 runtime fixture 会滚动，同时继续锁住安全字段。

## 测试

新增测试：

```text
test/historicalEvidenceResolver.test.ts
```

它直接验证 Java 和 mini-kv 的 sibling path 可以落到仓库内 fixture。

聚焦测试命令使用 forced fallback：

```text
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
vitest run managed-audit sandbox chain
```

结果：

```text
19 test files passed
56 tests passed
```

这说明 GitHub runner 即使没有 `D:/javaproj` 和 `D:/C/mini-kv`，也能跑通旧 managed-audit sandbox 证据链。

完整验证：

```text
npm run typecheck -> passed
npm test -> 186 files / 624 tests passed
npm run build -> passed
HTTP smoke -> /health ok，precheck packet JSON ready，Markdown 200
```

## 本版边界

- 不启动 Java。
- 不启动 mini-kv。
- 不构建、不测试、不修改 Java / mini-kv。
- 不打开 managed audit connection。
- 不读取 credential value。
- 不执行 schema migration。
- 不写 approval ledger。

## 下一步

按修正后的计划：

```text
推荐并行 Java v99 + mini-kv v108
Node v247：manual sandbox connection precheck upstream receipt verification
Node v248：manual sandbox connection rehearsal guard
```

v246 只解决 CI 复现稳定性，业务主线继续等待 Java v99 和 mini-kv v108 的只读回显 / 非参与证据。
