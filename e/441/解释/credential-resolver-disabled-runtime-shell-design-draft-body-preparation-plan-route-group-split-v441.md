# Node v441 credential resolver disabled runtime shell design draft body preparation plan route group split

## Summary

Node v441 is a maintainability refactor. It extracts the credential-resolver disabled runtime shell design draft body preparation plan route registrations into `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanRoutes.ts`.

## What Changed

- Added `credentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanAuditJsonMarkdownRoutes`.
- Moved 2 disabled runtime shell design draft body preparation plan routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 610 lines before, 597 lines after.
- `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanRoutes.ts`: 22 lines.
- Extracted route count: 2.

## Validation

- Focused v441 route-group test: 1 file / 1 test passed.
- Adjacent disabled runtime shell design draft body preparation plan tests: 3 files / 9 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 374 files / 1200 tests passed.
- Shard 3 timeout-only rerun: 6 affected files passed individually, and shard 3 passed on rerun.

## Boundary

v441 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, or runtime execution behavior.
