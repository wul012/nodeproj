# v451 managed audit sandbox adapter route group split roadmap

## Scope

Node v451 extracts the managed audit sandbox adapter dry-run plan, sandbox adapter dry-run package, and manual sandbox adapter connection runbook audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditSandboxAdapterRoutes.ts`.

The extracted group contains the existing sandbox adapter plan/package and manual runbook routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v450, the central route table still owned the sandbox adapter plan/package/runbook route registrations directly.
- Later consumer: future manual sandbox connection route-table work can continue without carrying the adapter bootstrap group inside the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v451 stops at route registration extraction, focused route regression coverage, and updating one old structural assertion to the new route-group shape. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v451 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit sandbox adapter route-group regression test passed: 1 file / 1 test.
- Adjacent sandbox plan/package/manual runbook tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 384 files / 1210 tests.
- Browser screenshot is not required because v451 does not add or change a renderable UI page.
