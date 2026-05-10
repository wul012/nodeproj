# OrderOps Node

Node.js control plane for two local practice systems:

- Java order platform: `D:\javaproj\advanced-order-platform`
- C++ mini-kv: `D:\C\mini-kv`

This V1 is intentionally small. Node owns the gateway, live operations view, and integration shell. The Java service keeps order consistency logic, and mini-kv keeps storage/network internals.

## Features

- Fastify + TypeScript service
- Browser dashboard at `/`
- Health endpoint at `/health`
- Java order platform proxy endpoints
- mini-kv TCP command client for `PING`, `GET`, `SET`, `DEL`, `TTL`, `SIZE`, and `EXPIRE`
- Live SSE status stream at `/api/v1/events/ops`

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
npm run dev
```

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

## Code Walkthrough

The Chinese code walkthrough lives in:

```text
代码讲解记录/
```

It follows the same style as `mini-kv`: module role, core flow, real code excerpts, then a short summary.

## Next V2 Ideas

- Persist audit logs in PostgreSQL
- Add login, RBAC, and per-route policies
- Add rate limits and request signing for gateway calls
- Store load-test runs and render comparison charts
- Pull Prometheus/OpenTelemetry data from the Java service
