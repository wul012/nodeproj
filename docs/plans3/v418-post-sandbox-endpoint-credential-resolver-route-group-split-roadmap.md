# v418 sandbox endpoint credential resolver route group split roadmap

## Scope

Node v418 extracts the sandbox endpoint handle, credential-resolver decision, disabled precheck, and test-only shell audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditSandboxEndpointCredentialResolverRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v417, the central route table still owned an 8-route sandbox endpoint credential-resolver cluster between fake transport verification and fake-shell archive verification.
- Later consumer: future sandbox endpoint credential-resolver maintenance can stay in one domain route group instead of re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v418 stops at route registration extraction and regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v418 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused sandbox endpoint credential-resolver route-group regression test with forced historical fixture fallback.
- Adjacent extracted route-group and sandbox endpoint credential-resolver service tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Treat timeout-only failures separately: rerun the failing file alone, then rerun the affected shard before changing product logic.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
