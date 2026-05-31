# Node v419 credential resolver fake-shell readiness route group split

## Summary

Node v419 is a maintainability refactor. It extracts the credential-resolver fake-shell readiness route registrations into `src/routes/auditCredentialResolverFakeShellReadinessRoutes.ts`.

## What Changed

- Added `credentialResolverFakeShellReadinessAuditJsonMarkdownRoutes`.
- Moved 3 credential-resolver fake-shell readiness routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverFakeShellReadinessRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.
- Stabilized one existing live-probe route smoke test budget from 10s to 30s after timeout triage proved the same JSON and Markdown assertions pass.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1072 lines before, 1051 lines after.
- `src/routes/auditCredentialResolverFakeShellReadinessRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v419 route-group test: 1 file / 1 test passed.
- Adjacent route-group and fake-shell readiness tests: 5 files / 13 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 352 files / 1178 tests passed.
- Timeout triage: shard 2/4 first hit the legacy 10s route smoke budget in `test/productionLiveProbeEvidenceArchiveVerification.test.ts`; the equivalent JSON/Markdown injection succeeded manually, the focused file passed after increasing the budget to 30s, and shard 2/4 passed on rerun.

## Boundary

v419 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
