# v454 managed audit manual sandbox connection command route group split roadmap

## Scope

Node v454 extracts the managed audit manual sandbox connection operator-window checklist, operator-window evidence verification, dry-run command package, dry-run command package verification report, and dry-run command upstream echo verification audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditManualSandboxConnectionCommandRoutes.ts`.

The extracted group contains the existing operator-window-to-command route chain for the manual sandbox connection flow.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v453, the central route table still owned the manual sandbox connection operator-window and dry-run command route registrations directly.
- Later consumer: future precheck/code-health/manual sandbox route-table work can continue without carrying the command preparation chain inside the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v454 stops at route registration extraction and focused route regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v454 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit manual sandbox connection command route-group regression test passed: 1 file / 1 test.
- Adjacent operator-window and dry-run command tests passed: 6 files / 16 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 387 files / 1213 tests.
- Browser screenshot is not required because v454 does not add or change a renderable UI page.
