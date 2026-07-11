# Start Here: OrderOps Node

## What this project does

This repository is a Node.js / TypeScript control plane for local practice systems:

```text
Node dashboard/control plane -> Java order platform -> C++ mini-kv
```

It uses Node as the gateway, dashboard, operations shell, evidence collector, and safety boundary around upstream systems.

The project focuses on local operational workflows such as health checks, upstream overview, dry-run actions, approval evidence, audit trails, release readiness, deployment approval records, and sandbox/production-readiness rehearsal.

## Why it matters

This is the architecture and orchestration layer of the multi-repo system.

The important idea is not only that Node can call Java or mini-kv. The important idea is that Node controls *when* and *how* actions are allowed:

- Probes and upstream actions are disabled by default.
- Dangerous actions are rehearsed through dry-run packages first.
- Approval, evidence, digest, archive, and verification records are kept before moving toward real execution.
- Java and mini-kv are treated as separate systems with explicit boundaries.

For outside readers, this repo shows full-stack backend thinking: APIs, dashboard, safety gates, audit evidence, release planning, and cross-service integration.

## How to run it

Install dependencies and start the local service:

```powershell
npm install
npm run dev
```

Open the dashboard:

```text
http://127.0.0.1:4100
```

Optional upstream services can be started separately:

```powershell
# Java order platform
cd D:\javaproj\advanced-order-platform
mvn spring-boot:run

# mini-kv server
cd D:\C\mini-kv
.\cmake-build-debug\minikv_server.exe 6379
```

By default, upstream probes and upstream actions are disabled. This is intentional.

## Top technical highlights

1. **Fastify + TypeScript control plane**
   - API routes, dashboard, event stream, health checks, and upstream overview.

2. **Safety-first operation flow**
   - Intent creation, confirmation, dry-run dispatch, preflight evidence, execution preview, approval requests, and archive verification.

3. **Cross-repo release governance**
   - Node consumes or references Java and mini-kv evidence while keeping production, credential, database, restore, and managed-audit boundaries explicit.

## Latest version summary

Current roadmap state: **Node v2190 production-excellence track closeout**.

Milestones N0-N5 are complete and externally reviewed through the N5 checkpoint.
The closeout version mechanically audits E1-E10, raises coverage floors, caps
lint warnings, scans committed configuration for credential signals, and
places the versioned archives under a reproducible retention budget. It does
not add product behavior or open an upstream window.

**Maturity: single-project validation + cross-project contract alignment.**
The C1-C4 live integration capstone has not been executed. Node is still a
read-only rehearsal/control-plane prototype and is not authorized for production execution.
After v2190 receives external closeout PASS, the capstone becomes a separate
reviewed series.

## Where to look next

- `README.md` — full feature list and setup instructions.
- `docs/plans/` — current and historical roadmap documents.
- `src/` — service implementation and route logic.
- `test/` or project test folders — route, evidence, and safety-boundary tests.
- Versioned archive folders — screenshots, explanations, and evidence records.

## Curated tour (read these ~15 files, skip the rest)

Most of `src/services` is versioned governance evidence produced by the incremental version loop. The living core of the system is:

- `src/server.ts`, `src/app.ts`, `src/config.ts` — Fastify bootstrap and configuration gates.
- `src/routes/statusRoutes.ts`, `src/routes/dashboardRoutes.ts` — health, status, and dashboard surface.
- `src/routes/operationIntentRoutes.ts` -> `src/routes/operationPreflightRoutes.ts` -> `src/routes/operationDispatchRoutes.ts` — the intent / preflight / dry-run dispatch flow.
- `src/routes/operationApprovalRequestRoutes.ts`, `src/routes/operationApprovalDecisionRoutes.ts` — approval evidence flow.
- `src/routes/orderPlatformRoutes.ts`, `src/routes/miniKvRoutes.ts` — upstream boundaries (disabled by default).
- `src/clients/` — the only code that would ever talk to upstreams.
- `src/services/verificationReportBuilder.ts` + `src/services/liveProbeReportUtils.ts` — the shared report template all verification renderers use.
