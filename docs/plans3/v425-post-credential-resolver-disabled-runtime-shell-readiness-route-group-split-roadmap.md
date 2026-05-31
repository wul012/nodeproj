# v425 credential resolver disabled runtime shell readiness route group split roadmap

## Scope

Node v425 extracts the credential-resolver disabled runtime shell pre-plan intake, design review, upstream echo verification, and implementation candidate gate audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverDisabledRuntimeShellReadinessRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v424, the central route table still owned the adjacent disabled runtime shell readiness chain.
- Later consumer: future runtime shell candidate gate and post-decision route groups can be split without re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v425 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v425 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused credential-resolver disabled runtime shell readiness route-group regression test with forced historical fixture fallback.
- Adjacent fake-harness readiness, disabled runtime shell readiness, and runtime shell candidate gate entry tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
