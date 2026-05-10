# OrderOps Node

Node.js control plane for two local practice systems:

- Java order platform: `D:\javaproj\advanced-order-platform`
- C++ mini-kv: `D:\C\mini-kv`

This project keeps Node as the gateway, live operations view, and integration shell. The Java service keeps order consistency logic, and mini-kv keeps storage/network internals.

## Features

- Fastify + TypeScript service
- Browser dashboard at `/`
- Health endpoint at `/health`
- Java order platform proxy endpoints
- mini-kv TCP command client for `PING`, `GET`, `SET`, `DEL`, `TTL`, `SIZE`, and `EXPIRE`
- Live SSE status stream at `/api/v1/events/ops`
- In-memory audit log and request summary endpoints
- Safe default upstream probe mode with `UPSTREAM_PROBES_ENABLED=false`
- Safe default upstream action mode with `UPSTREAM_ACTIONS_ENABLED=false`
- Local action-plan dry-run endpoint for checking what a real operation would do before touching upstreams
- In-memory operation intent flow with role policy and explicit confirmation text
- In-memory operation intent event feed and per-intent timeline
- Idempotency-Key support for operation intent creation and duplicate-submit replay
- In-memory dry-run dispatch ledger for confirmed intents without touching upstreams
- In-memory mutation rate limiter for intent and dispatch POST operations
- Local ops summary for audit, intents, dispatches, events, rate limits, and safety flags
- Local readiness gate for deciding whether the control plane is safe to promote toward real upstream execution
- Local ops handoff report in JSON or Markdown for debugging, review, and version archives
- Local ops runbook checklist for turning readiness signals into operator-facing preflight steps
- In-memory ops checkpoint ledger with SHA-256 digests for capturing local readiness evidence
- Local ops checkpoint diff for comparing readiness, runbook totals, signals, and step status changes

## Setup

```powershell
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:4100
```

The service reads configuration from environment variables. Use `.env.example` as a reference when your shell or runner loads environment files, or set variables directly in PowerShell:

```powershell
$env:ORDER_PLATFORM_URL = "http://localhost:8080"
$env:MINIKV_PORT = "6379"
$env:UPSTREAM_PROBES_ENABLED = "true"
$env:UPSTREAM_ACTIONS_ENABLED = "true"
$env:MUTATION_RATE_LIMIT_MAX = "30"
$env:MUTATION_RATE_LIMIT_WINDOW_MS = "60000"
npm run dev
```

By default, upstream probes are disabled so the dashboard does not automatically touch the Java or mini-kv processes while they are being debugged.
Upstream proxy actions are also disabled by default, so dashboard buttons that would call Java or mini-kv return a Node-side 403 until `UPSTREAM_ACTIONS_ENABLED=true`.

Optional upstream services:

```powershell
# Java order platform
cd D:\javaproj\advanced-order-platform
mvn spring-boot:run

# mini-kv server
cd D:\C\mini-kv
.\cmake-build-debug\minikv_server.exe 6379
```

## API

```text
GET    /health
GET    /api/v1/sources/status
GET    /api/v1/events/ops
GET    /api/v1/runtime/config
GET    /api/v1/ops/summary
GET    /api/v1/ops/readiness
GET    /api/v1/ops/runbook
GET    /api/v1/ops/checkpoints
GET    /api/v1/ops/checkpoints/diff
GET    /api/v1/ops/checkpoints/:checkpointId
POST   /api/v1/ops/checkpoints
GET    /api/v1/ops/handoff-report
GET    /api/v1/action-plans/catalog
POST   /api/v1/action-plans
GET    /api/v1/operation-intents
GET    /api/v1/operation-intents/:intentId
GET    /api/v1/operation-intents/:intentId/timeline
GET    /api/v1/operation-intents/:intentId/dispatches
GET    /api/v1/operation-intent-events
POST   /api/v1/operation-intents
POST   /api/v1/operation-intents/:intentId/confirm
POST   /api/v1/operation-intents/:intentId/dispatch
GET    /api/v1/operation-dispatches
GET    /api/v1/operation-dispatches/:dispatchId
POST   /api/v1/operation-dispatches
GET    /api/v1/audit/events
GET    /api/v1/audit/summary

GET    /api/v1/order-platform/products
GET    /api/v1/order-platform/outbox/events
GET    /api/v1/order-platform/orders/:orderId
POST   /api/v1/order-platform/orders
POST   /api/v1/order-platform/orders/:orderId/pay
POST   /api/v1/order-platform/orders/:orderId/cancel

GET    /api/v1/mini-kv/status
GET    /api/v1/mini-kv/:key
PUT    /api/v1/mini-kv/:key
DELETE /api/v1/mini-kv/:key
POST   /api/v1/mini-kv/commands
```

`POST /api/v1/operation-intents` accepts an optional `Idempotency-Key` header. Repeating the same request with the same key returns the original intent with HTTP 200 and `idempotency.reused=true`.
Mutation POST routes return `429 MUTATION_RATE_LIMITED` when the same actor exceeds `MUTATION_RATE_LIMIT_MAX` within `MUTATION_RATE_LIMIT_WINDOW_MS`.

## Code Walkthrough

The Chinese code walkthrough lives in:

```text
代码讲解记录/
```

It follows the same style as `mini-kv`: module role, core flow, real code excerpts, then a short summary.

## Next Ideas

- Persist audit logs in PostgreSQL
- Persist operation intents and audit logs in PostgreSQL
- Add login and bind roles to real users
- Add rate limits and request signing for gateway calls
- Store load-test runs and render comparison charts
- Pull Prometheus/OpenTelemetry data from the Java service
