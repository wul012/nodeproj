# v420 credential resolver pre-implementation readiness route group split roadmap

## Scope

Node v420 extracts the credential-resolver production-readiness blocked decision upstream echo, pre-implementation plan intake, pre-implementation plan intake upstream echo, and disabled implementation candidate review audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverPreImplementationReadinessRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v419, the central route table still owned the adjacent 4-route transition from blocked production-readiness decision to disabled candidate review.
- Later consumer: future disabled candidate upstream echo and approval-required readiness route groups can be split without re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v420 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v420 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused credential-resolver pre-implementation readiness route-group regression test with forced historical fixture fallback.
- Adjacent fake-shell readiness, blocked decision, plan intake, plan intake upstream echo, and disabled implementation candidate tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
