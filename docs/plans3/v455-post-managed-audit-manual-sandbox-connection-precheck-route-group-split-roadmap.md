# v455 managed audit manual sandbox connection precheck route group split roadmap

## Scope

Node v455 extracts the managed audit manual sandbox connection precheck packet, precheck upstream receipt verification, sandbox code health pass, and rehearsal guard audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditManualSandboxConnectionPrecheckRoutes.ts`.

The extracted group contains the existing precheck, code-health, and rehearsal-guard route chain for the manual sandbox connection flow.

This is primarily a maintainability refactor. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v454, the central route table still owned the precheck/code-health/rehearsal-guard route registrations directly.
- Later consumer: future manual sandbox decision/adapters route-table work can continue without carrying the precheck safety chain inside the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v455 stops at route registration extraction, focused route regression coverage, and updating the existing code-health self-check so it accepts the established route-group spread plus group-file registration shape. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v455 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit manual sandbox connection precheck route-group regression test passed: 1 file / 1 test.
- Adjacent precheck packet, upstream receipt, code health, and rehearsal guard tests passed: 5 files / 15 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 388 files / 1214 tests.
- Browser screenshot is not required because v455 does not add or change a renderable UI page.
