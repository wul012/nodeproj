# v445 managed audit identity approval route group split roadmap

## Scope

Node v445 extracts the managed audit identity approval binding contract, provenance dry-run packet, and provenance packet verification report audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditIdentityApprovalRoutes.ts`.

The extracted group contains the existing binding contract and provenance packet routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v444, the central route table still owned the identity approval binding and provenance packet route registrations directly.
- Later consumer: future route-table work can now move into packet restore and adapter hardening routes without carrying the identity approval packet chain in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v445 stops at route registration extraction and focused regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v445 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit identity approval route-group regression test passed: 1 file / 1 test.
- Adjacent managed audit identity approval tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed after one timeout-only rerun: 378 files / 1204 tests.
- `test/productionLiveProbeRealReadSmokeProductionPassEvidenceVerification.test.ts` timed out once inside shard 1, then passed alone and shard 1 passed on rerun.
- The focused route-group test sets `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` directly and verifies Java/mini-kv historical paths resolve under `fixtures/historical/sibling-workspaces/...`.
- Browser screenshot is not required because v445 does not add or change a renderable UI page.
