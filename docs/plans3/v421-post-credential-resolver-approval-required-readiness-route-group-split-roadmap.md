# v421 credential resolver approval-required readiness route group split roadmap

## Scope

Node v421 extracts the credential-resolver disabled candidate upstream echo, approval-required boundary upstream echo, approval-required implementation readiness review, and approval-required implementation readiness upstream echo audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverApprovalRequiredReadinessRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v420, the central route table still owned the adjacent transition from disabled candidate echo to approval-required implementation readiness echo.
- Later consumer: future implementation plan draft and fake-harness route groups can be split without re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v421 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v421 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused credential-resolver approval-required readiness route-group regression test with forced historical fixture fallback.
- Adjacent pre-implementation readiness, disabled candidate upstream echo, approval-required boundary echo, implementation readiness review, and implementation readiness upstream echo tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Treat timeout-only failures separately: rerun the failing file alone, then rerun the affected shard before changing product logic.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
