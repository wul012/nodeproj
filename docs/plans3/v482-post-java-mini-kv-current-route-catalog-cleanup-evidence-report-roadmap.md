# v482 Java / mini-kv current route catalog cleanup evidence report roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is still based on tag `v214-order-platform-shard-readiness-v1-contract-consumer-handoff-bundle-integrity`, with local v215-like consumer verification checklist changes.
- mini-kv: `D:\C\mini-kv` is still based on tag `第二百版路由目录清理证据批次收口审计`, with local v201-like post-closeout source/test changes.
- Node dependency decision: recommended parallel. v482 exposes Node v481 frozen evidence only and must not consume the dirty Java v215-like or mini-kv v201-like work.

## Scope

Node v482 exposes the v481 current evidence intake through the existing route catalog cleanup handoff audit route group:

- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-current-evidence`
- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-current-evidence?format=markdown`

It adds the fourth route to the existing group, keeping group count stable at 50 and updating total audit JSON/Markdown routes to 202.

## Necessity Proof

- Blocker resolved: Java v211/v214 and mini-kv v199/v200 frozen evidence can now be inspected through the normal JSON/Markdown audit surface.
- Later consumer: v483 can archive this report before Node consumes any Java v215 or mini-kv v201 tag.
- Reuse check: v482 reuses the v474 route group, access policy, and v481 intake reader.
- Growth stop: one route is added under the existing group; no approval chain, runtime execution, service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v482 is a Node report/route version over frozen evidence and is not a pre-approval blocker for either project.

## Validation Plan

- Focused Vitest: `test/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts`, `test/javaMiniKvRouteCatalogCleanupCurrentEvidence.test.ts`, `test/auditJsonMarkdownRouteGroups.test.ts`, `test/managedAuditRouteRegistrationTableQualityPass.test.ts`.
- Typecheck.
- Build.
- HTTP-style Fastify inject smoke for the new JSON and Markdown route.
