# v424 credential resolver fake-harness execution readiness route group split roadmap

## Scope

Node v424 extracts the credential-resolver disabled fake-harness execution-denied route preflight, execution-denied upstream echo, fake-harness readiness decision record, and fake-harness readiness blocked decision upstream echo audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverFakeHarnessExecutionReadinessRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v423, the central route table still owned the adjacent fake-harness execution-denied and readiness decision chain.
- Later consumer: future disabled runtime shell route groups can be split without re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v424 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v424 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused credential-resolver fake-harness execution readiness route-group regression test with forced historical fixture fallback.
- Adjacent fake-harness contract, execution-denied, readiness decision, blocked decision upstream echo, and disabled runtime shell pre-plan tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
