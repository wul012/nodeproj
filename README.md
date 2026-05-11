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
- Local ops baseline tracking for comparing the latest checkpoint against a selected checkpoint baseline
- Local ops promotion review for combining readiness, runbook, checkpoint, and baseline drift into a promotion decision
- In-memory ops promotion decision ledger for recording promotion reviews with reviewer notes and SHA-256 digests
- Local promotion decision digest verification for rechecking recorded evidence before handoff or promotion
- Local promotion decision evidence report in JSON or Markdown for operator review and archival
- Local promotion decision ledger integrity check with a rolling SHA-256 root digest
- Local promotion decision ledger integrity report in Markdown for human review and archival
- Local promotion archive bundle in JSON or Markdown for combining latest evidence and ledger integrity
- Local promotion archive manifest with SHA-256 artifact digests for final archive fingerprinting
- Local promotion archive verification for rechecking manifest and artifact digests
- Local promotion archive attestation with a sealed handoff digest
- Local promotion archive attestation verification for rechecking sealed handoff digests
- Local promotion handoff package with attachment digests and a package digest
- Local promotion handoff package verification for rechecking package and attachment digests
- Local promotion handoff certificate with a shareable certificate digest
- Local promotion handoff certificate verification for rechecking certificate digests and package references
- Local promotion handoff receipt with receipt digest and verified handoff milestones
- Local promotion handoff receipt verification for rechecking receipt digests and milestone references
- Local promotion handoff closure with closure digest for final handoff closeout
- Local promotion handoff closure verification for rechecking closure digests and closeout item references
- Local promotion handoff completion record for packaging verified closure evidence into final archive closeout
- Local promotion handoff completion verification for rechecking completion digests and final closeout steps
- Local promotion release evidence record for packaging verified completion evidence into a final release archive digest
- Local promotion release evidence verification for rechecking final evidence digests and release archive items
- Local promotion release archive manifest for sealing verified release evidence into the final deployment approval record
- Local promotion release archive verification for rechecking final archive digests and deployment approval references
- Local promotion deployment approval record for attaching verified release archive digests to deployment change records
- Local promotion deployment approval verification for rechecking approval digests and approval item references
- Local promotion deployment change record for carrying verified approval digests into release execution logs
- Local promotion deployment change record verification for rechecking change digests and change item references
- Local promotion deployment execution record for assigning a verified execution digest before release execution
- Local promotion deployment execution record verification for rechecking execution digests and execution item references
- Local promotion deployment execution receipt for carrying verified execution digests into release audit trails
- Local promotion deployment execution receipt verification for rechecking receipt digests and receipt item references
- Local promotion release audit trail record for carrying verified receipt digests into final release reporting

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
GET    /api/v1/ops/promotion-archive
GET    /api/v1/ops/promotion-archive?format=markdown
GET    /api/v1/ops/promotion-archive/manifest
GET    /api/v1/ops/promotion-archive/manifest?format=markdown
GET    /api/v1/ops/promotion-archive/verification
GET    /api/v1/ops/promotion-archive/verification?format=markdown
GET    /api/v1/ops/promotion-archive/attestation
GET    /api/v1/ops/promotion-archive/attestation?format=markdown
GET    /api/v1/ops/promotion-archive/attestation/verification
GET    /api/v1/ops/promotion-archive/attestation/verification?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-package
GET    /api/v1/ops/promotion-archive/handoff-package?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-package/verification
GET    /api/v1/ops/promotion-archive/handoff-package/verification?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-certificate
GET    /api/v1/ops/promotion-archive/handoff-certificate?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-certificate/verification
GET    /api/v1/ops/promotion-archive/handoff-certificate/verification?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-receipt
GET    /api/v1/ops/promotion-archive/handoff-receipt?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-receipt/verification
GET    /api/v1/ops/promotion-archive/handoff-receipt/verification?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-closure
GET    /api/v1/ops/promotion-archive/handoff-closure?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-closure/verification
GET    /api/v1/ops/promotion-archive/handoff-closure/verification?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-completion
GET    /api/v1/ops/promotion-archive/handoff-completion?format=markdown
GET    /api/v1/ops/promotion-archive/handoff-completion/verification
GET    /api/v1/ops/promotion-archive/handoff-completion/verification?format=markdown
GET    /api/v1/ops/promotion-archive/release-evidence
GET    /api/v1/ops/promotion-archive/release-evidence?format=markdown
GET    /api/v1/ops/promotion-archive/release-evidence/verification
GET    /api/v1/ops/promotion-archive/release-evidence/verification?format=markdown
GET    /api/v1/ops/promotion-archive/release-archive
GET    /api/v1/ops/promotion-archive/release-archive?format=markdown
GET    /api/v1/ops/promotion-archive/release-archive/verification
GET    /api/v1/ops/promotion-archive/release-archive/verification?format=markdown
GET    /api/v1/ops/promotion-archive/deployment-approval
GET    /api/v1/ops/promotion-archive/deployment-approval?format=markdown
GET    /api/v1/ops/promotion-archive/deployment-approval/verification
GET    /api/v1/ops/promotion-archive/deployment-approval/verification?format=markdown
GET    /api/v1/ops/promotion-archive/deployment-change-record
GET    /api/v1/ops/promotion-archive/deployment-change-record?format=markdown
GET    /api/v1/ops/promotion-archive/deployment-change-record/verification
GET    /api/v1/ops/promotion-archive/deployment-change-record/verification?format=markdown
GET    /api/v1/ops/promotion-archive/deployment-execution-record
GET    /api/v1/ops/promotion-archive/deployment-execution-record?format=markdown
GET    /api/v1/ops/promotion-archive/deployment-execution-record/verification
GET    /api/v1/ops/promotion-archive/deployment-execution-record/verification?format=markdown
GET    /api/v1/ops/promotion-archive/deployment-execution-receipt
GET    /api/v1/ops/promotion-archive/deployment-execution-receipt?format=markdown
GET    /api/v1/ops/promotion-archive/deployment-execution-receipt/verification
GET    /api/v1/ops/promotion-archive/deployment-execution-receipt/verification?format=markdown
GET    /api/v1/ops/promotion-archive/release-audit-trail-record
GET    /api/v1/ops/promotion-archive/release-audit-trail-record?format=markdown
GET    /api/v1/ops/promotion-review
GET    /api/v1/ops/promotion-decisions
GET    /api/v1/ops/promotion-decisions/integrity
GET    /api/v1/ops/promotion-decisions/integrity?format=markdown
GET    /api/v1/ops/promotion-decisions/:decisionId/verification
GET    /api/v1/ops/promotion-decisions/:decisionId/evidence
GET    /api/v1/ops/promotion-decisions/:decisionId
POST   /api/v1/ops/promotion-decisions
GET    /api/v1/ops/runbook
GET    /api/v1/ops/checkpoints
GET    /api/v1/ops/checkpoints/diff
GET    /api/v1/ops/checkpoints/:checkpointId
POST   /api/v1/ops/checkpoints
GET    /api/v1/ops/baseline
PUT    /api/v1/ops/baseline
DELETE /api/v1/ops/baseline
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
