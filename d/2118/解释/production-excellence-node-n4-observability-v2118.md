# v2118 production excellence N4 archive note

本版本完成 N4: observability。核心产物是只读 `/api/v1/metrics`，用于观察 Node 对 Java order-platform 和 mini-kv 的 upstream client 调用情况。

## 产物

- `src/clients/upstreamMetrics.ts`: 新增共享 metrics registry，记录每个 upstream client 的 request、error、timeout 计数和 p50/p95/p99 延迟窗口；它放在 client 边界内，避免突破 services 文件数 ratchet。
- `src/app.ts`: 新增 `GET /api/v1/metrics` inline registration，返回 JSON snapshot，并设置 `cache-control: no-store`；没有新增 routes 文件。
- `src/clients/orderPlatformClient.ts` 与 `src/clients/miniKvClient.ts`: 在底层 HTTP/TCP I/O 方法统一埋点，不让 route 层重复统计。
- `src/app.ts`: 创建同一个 `UpstreamMetricsRegistry`，传给两个 client；同时让错误响应和响应头都携带 `requestId`。
- `src/services/accessPolicyProfile.ts`: 将 `/api/v1/metrics` 纳入 readiness/viewer 只读策略，不新增权限分组。
- `.github/workflows/node-evidence.yml`: CI safe smoke 增加 metrics endpoint 检查。
- `test/upstreamMetrics.test.ts`、`test/metricsRoutes.test.ts`: 覆盖延迟聚合数学、真实 client 调用后的 metrics snapshot、错误 request id 与 audit correlation。

## 边界

本版本不会默认启动 Java 或 mini-kv，也不会打开 `UPSTREAM_PROBES_ENABLED` 或 `UPSTREAM_ACTIONS_ENABLED`。在安全 smoke 默认配置下，`/api/v1/metrics` 只返回空窗口和零计数。只有当已有 route 因显式配置实际调用 upstream client 时，metrics registry 才记录该调用。

## 验证

- Focused metrics tests: 2 files / 4 tests passed.
- Focused N4 batch: 4 files / 11 tests passed.
- Typecheck: passed.
- Lint: passed, 0 errors / 263 existing warnings.
- Build: passed.
- Local HTTP smoke: health passed, metrics version `upstream-metrics.v1`, order-platform requests 0, mini-kv requests 0, release readiness gate ready=true / executionAllowed=false.
- Full coverage: first run failed on governance growth ratchet because 初版新增了 services/routes 文件；已将 registry 折回 `src/clients` 并将 route 注册折回 `src/app.ts`。最终 rerun passed: 527 files / 1620 tests, statements 95.8%, branches 87.38%, functions 98.38%, lines 95.76%.
