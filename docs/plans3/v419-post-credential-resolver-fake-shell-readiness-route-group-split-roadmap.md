# v419 credential resolver fake-shell readiness route group split roadmap

## Scope

Node v419 extracts the credential-resolver fake-shell archive verification, fake-shell archive upstream echo verification, and production-readiness decision gate audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverFakeShellReadinessRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv. One legacy live-probe route smoke timeout budget is stabilized after proving the same JSON/Markdown assertions pass.

## Necessity Proof

- Blocker resolved: after v418, the central route table still owned a 3-route fake-shell readiness cluster immediately after the sandbox endpoint credential-resolver group.
- Later consumer: future fake-shell archive and readiness gate maintenance can stay in one domain route group instead of re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v419 stops at route registration extraction, focused regression coverage, and test-budget stabilization. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v419 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused credential-resolver fake-shell readiness route-group regression test with forced historical fixture fallback.
- Adjacent extracted route-group and fake-shell readiness service tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Treat timeout-only failures separately: rerun the failing file alone, prove route assertions still pass, then rerun the affected shard before changing product logic.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
