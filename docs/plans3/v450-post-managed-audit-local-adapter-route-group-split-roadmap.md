# v450 managed audit local adapter route group split roadmap

## Scope

Node v450 extracts the managed audit local adapter dry-run, local adapter verification report, and external adapter connection readiness review audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditLocalAdapterRoutes.ts`.

The extracted group contains the existing local dry-run, local verification report, and external readiness review routes.

This is primarily a maintainability refactor. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v449, the central route table still owned the local/external adapter readiness route registrations directly.
- Later consumer: future sandbox adapter route-table work can continue without carrying the local adapter transition group inside the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v450 stops at route registration extraction, focused route regression coverage, and one timeout-budget stabilization for an existing long route-table test. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v450 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit local adapter route-group regression test passed: 1 file / 1 test.
- Adjacent local dry-run, local verification report, and external readiness review tests passed: 4 files / 11 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 383 files / 1209 tests.
- Timeout-only triage: `managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.test.ts` timed out only in shard 2/4 at its old 45s per-test budget, passed focused, then passed shard 2/4 after raising that explicit budget to 90s. This is test-budget stabilization, not a business behavior fix.
- Browser screenshot is not required because v450 does not add or change a renderable UI page.
