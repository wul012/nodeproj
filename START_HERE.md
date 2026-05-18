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

Recent roadmap state: **Node v242 historical evidence fallback for GitHub CI**.

The latest docs update closes the old v237 plan and starts the next v242-derived roadmap. The next stage is centered on command package verification, upstream echo verification, and sandbox connection precheck while still keeping real managed-audit connections closed.

In simple terms: the project is moving from “we can prepare a safe disabled dry-run package” toward “we can verify that package across Node, Java, and mini-kv without opening real production connections.”

## Where to look next

- `README.md` — full feature list and setup instructions.
- `docs/plans/` — current and historical roadmap documents.
- `src/` — service implementation and route logic.
- `test/` or project test folders — route, evidence, and safety-boundary tests.
- Versioned archive folders — screenshots, explanations, and evidence records.
