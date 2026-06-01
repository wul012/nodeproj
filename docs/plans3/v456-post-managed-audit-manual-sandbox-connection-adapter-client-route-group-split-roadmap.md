# v456 managed audit manual sandbox connection adapter client route group split roadmap

## Scope

Node v456 extracts the managed audit manual sandbox connection decision record, disabled adapter client precheck, test-only adapter shell contract, and disabled adapter client upstream echo verification audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditManualSandboxConnectionAdapterClientRoutes.ts`.

The extracted group contains the existing decision-to-disabled-client route chain for the manual sandbox connection flow.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v455, the central route table still owned the decision/disabled-adapter-client route registrations directly.
- Later consumer: future fake-transport route-table work can continue without carrying the adapter-client precheck chain inside the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v456 stops at route registration extraction and focused route regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v456 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit manual sandbox connection adapter client route-group regression test passed: 1 file / 1 test.
- Adjacent decision, disabled-client, shell-contract, and upstream echo tests passed: 5 files / 14 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 389 files / 1215 tests.
- Browser screenshot is not required because v456 does not add or change a renderable UI page.
