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
- mini-kv TCP command client for `PING`, `GET`, `SET`, `DEL`, `TTL`, `SIZE`, `EXPIRE`, `HEALTH`, `STATSJSON`, `INFOJSON`, `COMMANDSJSON`, `KEYS`, `KEYSJSON`, `EXPLAINJSON`, and `CHECKJSON`
- Live SSE status stream at `/api/v1/events/ops`
- In-memory audit log and request summary endpoints
- Safe default upstream probe mode with `UPSTREAM_PROBES_ENABLED=false`
- Safe default upstream action mode with `UPSTREAM_ACTIONS_ENABLED=false`
- Read-only upstream overview at `/api/v1/upstreams/overview` for Java health, Java ops overview, Java failed-event summary, and mini-kv operational, identity, and command risk signals
- Dashboard upstream overview detail panel for Java governance and mini-kv command risk signals
- Read-only Java failed-event replay readiness proxy and Dashboard lookup guarded by `UPSTREAM_PROBES_ENABLED`
- Read-only mini-kv `KEYSJSON` key inventory proxy and Dashboard panel guarded by `UPSTREAM_PROBES_ENABLED`
- Local action-plan dry-run endpoint for checking what a real operation would do before touching upstreams
- In-memory operation intent flow with role policy and explicit confirmation text
- In-memory operation intent event feed and per-intent timeline
- Idempotency-Key support for operation intent creation and duplicate-submit replay
- In-memory dry-run dispatch ledger for confirmed intents without touching upstreams
- Local operation preflight evidence bundle that combines intent policy, confirmation, dispatch history, Java replay readiness evidence, and mini-kv command/key inventory evidence before any real upstream execution
- Local operation preflight Markdown report, SHA-256 digest, and verification endpoint for archiving operation evidence
- Local operation execution preview that combines preflight digest, Java replay simulation, mini-kv EXPLAINJSON, would-call summary, and expected side effects
- In-memory operation approval request ledger that binds preflight and execution-preview digests before any real upstream execution
- In-memory operation approval decision ledger for recording reviewer approve/reject decisions with SHA-256 digests and no upstream execution
- Local operation approval evidence report, verification, handoff bundle, execution gate preview, archive record, archive verification, execution-contract archive bundle, and mismatch diagnostics for archiving request, decision, digest chain, Java approval-status and execution-contract evidence, mini-kv `command_digest` / `side_effect_count` / `CHECKJSON` contract evidence, and upstream untouched proof before any real execution
- Local upstream execution-contract fixture report for reading Java v43 and mini-kv v52 stable samples before fixture-driven smoke
- Local upstream execution-contract fixture drift diagnostics for catching fixture field, type, digest, and diagnostics-mapping drift
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
- Production readiness summary v2 for categorizing upstream observability, audit durability, access control, and execution safety blockers while keeping upstream execution disabled
- Access policy profile for defining route groups, minimum roles, and request identity contract before enabling enforcement
- Access guard dry-run headers and readiness profile for evaluating route group, required role, matched roles, and would-deny evidence without rejecting requests
- Access guard dry-run audit context on request audit events, so `/api/v1/audit/events` records route group, required role, matched roles, would-deny, and reason
- Operator identity contract profile and audit context for rehearsing `x-orderops-operator-id` / `x-orderops-roles` parsing, invalid-role filtering, and audit evidence without trusting headers as production auth
- Auth enforcement rehearsal profile and middleware switch for explicitly testing 401/403/200 access guard behavior while default runtime remains observe-only
- Signed auth token contract rehearsal for HMAC-based local token samples covering missing token, bad signature, expiry, insufficient role, and allowed role without exposing secrets
- Verified identity audit binding for writing signed-token subject, roles, issuer, and verification result into audit context while real IdP integration remains blocked
- IdP verifier boundary for checking future OIDC/JWT issuer, audience, JWKS URL, and clock skew configuration without fetching keys or authorizing requests
- JWKS verifier fixture rehearsal for locally checking RS256 issuer, audience, expiry, role, and kid rejection behavior without fetching external IdP keys
- JWKS cache contract rehearsal for local cache hit, unknown kid, expired entry, and rotation-marker behavior without fetching external IdP keys
- Audit store factory wiring for `AUDIT_STORE_KIND=memory|file`, including file-backed restart rehearsal while database storage remains future work
- File audit restart evidence report for proving file-backed audit reload behavior with digest checks while keeping managed production audit storage as a blocker
- Audit retention integrity evidence for checking local retention knobs, file digest stability, and managed-store blockers without deleting or rotating audit files
- Managed audit store contract profile for append-only write, requestId query, digest verification, retention metadata, and backup/restore marker coverage through a fake adapter while real managed storage remains blocked
- Managed audit readiness summary for combining fake adapter capability coverage, file audit integrity evidence, retention/backup knobs, managed store URL, and real adapter blockers
- Managed audit adapter boundary for documenting `memory`, `file`, and `managed-unimplemented` audit runtime states before any real database adapter is connected
- Managed audit adapter compliance harness for exercising append-only write, requestId query, digest stability, and backup marker behavior against a local adapter before real storage is connected
- Managed audit adapter harness runner for exercising the same adapter checks against memory and temporary file-candidate targets before real storage is connected
- Production readiness summary v3 for rechecking Java v47, mini-kv v56, access policy coverage, access guard dry-run coverage, and audit runtime kind while keeping production operations blocked
- Production readiness summary v4 for combining Java v48 operator auth boundary, mini-kv v57 recovery retention boundary, Node access guard audit context, operator identity contract, and file audit restart evidence while keeping production operations blocked
- Production readiness summary v5 for rechecking auth enforcement rehearsal and audit retention integrity evidence while signed auth and managed audit storage remain production blockers
- Deployment environment readiness gate for checking auth token config, audit retention and backup config, managed audit URL, upstream action safety, and remaining real IdP / managed adapter blockers
- Production readiness summary v6 for combining verified identity audit binding, managed audit readiness, deployment environment gate, and upstream action safety into the next production-hardening gate
- Production readiness summary v7 for distinguishing adapter and IdP boundary existence from real production connections while keeping upstream execution disabled
- Production readiness summary v8 for combining managed audit compliance and JWKS fixture rehearsal while separating local rehearsal success from missing production connections

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
GET    /api/v1/upstreams/overview
GET    /api/v1/upstream-contract-fixtures
GET    /api/v1/upstream-contract-fixtures?format=markdown
GET    /api/v1/upstream-contract-fixtures/drift-diagnostics
GET    /api/v1/upstream-contract-fixtures/drift-diagnostics?format=markdown
GET    /api/v1/upstreams/production-evidence-intake
GET    /api/v1/upstreams/production-evidence-intake?format=markdown
GET    /api/v1/production/readiness-summary
GET    /api/v1/production/readiness-summary?format=markdown
GET    /api/v1/production/readiness-summary-v2
GET    /api/v1/production/readiness-summary-v2?format=markdown
GET    /api/v1/production/readiness-summary-v3
GET    /api/v1/production/readiness-summary-v3?format=markdown
GET    /api/v1/production/readiness-summary-v4
GET    /api/v1/production/readiness-summary-v4?format=markdown
GET    /api/v1/production/readiness-summary-v5
GET    /api/v1/production/readiness-summary-v5?format=markdown
GET    /api/v1/production/readiness-summary-v6
GET    /api/v1/production/readiness-summary-v6?format=markdown
GET    /api/v1/production/readiness-summary-v7
GET    /api/v1/production/readiness-summary-v7?format=markdown
GET    /api/v1/production/readiness-summary-v8
GET    /api/v1/production/readiness-summary-v8?format=markdown
GET    /api/v1/audit/store-profile
GET    /api/v1/audit/store-profile?format=markdown
GET    /api/v1/audit/store-config-profile
GET    /api/v1/audit/store-config-profile?format=markdown
GET    /api/v1/audit/file-restart-evidence
GET    /api/v1/audit/file-restart-evidence?format=markdown
GET    /api/v1/audit/retention-integrity-evidence
GET    /api/v1/audit/retention-integrity-evidence?format=markdown
GET    /api/v1/audit/managed-store-contract
GET    /api/v1/audit/managed-store-contract?format=markdown
GET    /api/v1/audit/managed-readiness-summary
GET    /api/v1/audit/managed-readiness-summary?format=markdown
GET    /api/v1/audit/managed-adapter-boundary
GET    /api/v1/audit/managed-adapter-boundary?format=markdown
GET    /api/v1/audit/managed-adapter-compliance
GET    /api/v1/audit/managed-adapter-compliance?format=markdown
GET    /api/v1/audit/managed-adapter-runner
GET    /api/v1/audit/managed-adapter-runner?format=markdown
GET    /api/v1/security/access-control-readiness
GET    /api/v1/security/access-control-readiness?format=markdown
GET    /api/v1/security/access-policy
GET    /api/v1/security/access-policy?format=markdown
GET    /api/v1/security/access-guard-readiness
GET    /api/v1/security/access-guard-readiness?format=markdown
GET    /api/v1/security/auth-enforcement-rehearsal
GET    /api/v1/security/auth-enforcement-rehearsal?format=markdown
GET    /api/v1/security/operator-identity-contract
GET    /api/v1/security/operator-identity-contract?format=markdown
GET    /api/v1/security/signed-auth-token-contract
GET    /api/v1/security/signed-auth-token-contract?format=markdown
GET    /api/v1/security/verified-identity-audit-binding
GET    /api/v1/security/verified-identity-audit-binding?format=markdown
GET    /api/v1/security/idp-verifier-boundary
GET    /api/v1/security/idp-verifier-boundary?format=markdown
GET    /api/v1/security/jwks-verifier-fixture-rehearsal
GET    /api/v1/security/jwks-verifier-fixture-rehearsal?format=markdown
GET    /api/v1/security/jwks-cache-contract
GET    /api/v1/security/jwks-cache-contract?format=markdown
GET    /api/v1/deployment/environment-readiness
GET    /api/v1/deployment/environment-readiness?format=markdown
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
GET    /api/v1/operation-intents/:intentId/preflight
GET    /api/v1/operation-intents/:intentId/preflight/report
GET    /api/v1/operation-intents/:intentId/preflight/verification
GET    /api/v1/operation-intents/:intentId/execution-preview
GET    /api/v1/operation-intents/:intentId/timeline
GET    /api/v1/operation-intents/:intentId/dispatches
GET    /api/v1/operation-intent-events
GET    /api/v1/operation-approval-requests
GET    /api/v1/operation-approval-requests/:requestId
GET    /api/v1/operation-approval-requests/:requestId?format=markdown
GET    /api/v1/operation-approval-requests/:requestId/evidence
GET    /api/v1/operation-approval-requests/:requestId/evidence?format=markdown
GET    /api/v1/operation-approval-requests/:requestId/verification
GET    /api/v1/operation-approval-requests/:requestId/verification?format=markdown
GET    /api/v1/operation-approval-requests/:requestId/evidence-bundle
GET    /api/v1/operation-approval-requests/:requestId/evidence-bundle?format=markdown
GET    /api/v1/operation-approval-requests/:requestId/execution-gate-preview
GET    /api/v1/operation-approval-requests/:requestId/execution-gate-preview?format=markdown
GET    /api/v1/operation-approval-execution-gate-archives
GET    /api/v1/operation-approval-execution-gate-archives/:archiveId
GET    /api/v1/operation-approval-execution-gate-archives/:archiveId?format=markdown
GET    /api/v1/operation-approval-execution-gate-archives/:archiveId/verification
GET    /api/v1/operation-approval-execution-gate-archives/:archiveId/verification?format=markdown
GET    /api/v1/operation-approval-execution-gate-archives/:archiveId/execution-contract-bundle
GET    /api/v1/operation-approval-execution-gate-archives/:archiveId/execution-contract-bundle?format=markdown
GET    /api/v1/operation-approval-execution-gate-archives/:archiveId/execution-contract-diagnostics
GET    /api/v1/operation-approval-execution-gate-archives/:archiveId/execution-contract-diagnostics?format=markdown
GET    /api/v1/operation-approval-decisions
GET    /api/v1/operation-approval-decisions/:decisionId
GET    /api/v1/operation-approval-decisions/:decisionId?format=markdown
POST   /api/v1/operation-intents
POST   /api/v1/operation-intents/:intentId/confirm
POST   /api/v1/operation-intents/:intentId/dispatch
POST   /api/v1/operation-approval-requests
POST   /api/v1/operation-approval-requests/:requestId/decision
POST   /api/v1/operation-approval-requests/:requestId/execution-gate-archive
GET    /api/v1/operation-dispatches
GET    /api/v1/operation-dispatches/:dispatchId
POST   /api/v1/operation-dispatches
GET    /api/v1/audit/events
GET    /api/v1/audit/summary

GET    /api/v1/order-platform/products
GET    /api/v1/order-platform/failed-events/:failedEventId/approval-status
GET    /api/v1/order-platform/failed-events/:failedEventId/replay-simulation
GET    /api/v1/order-platform/outbox/events
GET    /api/v1/order-platform/orders/:orderId
POST   /api/v1/order-platform/orders
POST   /api/v1/order-platform/orders/:orderId/pay
POST   /api/v1/order-platform/orders/:orderId/cancel

GET    /api/v1/mini-kv/status
GET    /api/v1/mini-kv/explain
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
