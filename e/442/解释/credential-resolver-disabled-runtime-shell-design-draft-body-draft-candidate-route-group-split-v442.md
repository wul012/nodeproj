# Node v442 credential resolver disabled runtime shell design draft body draft candidate route group split

## Summary

Node v442 is a maintainability refactor. It extracts the credential-resolver disabled runtime shell design draft body draft candidate route registrations into `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRoutes.ts`.

## What Changed

- Added `credentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateAuditJsonMarkdownRoutes`.
- Moved 2 disabled runtime shell design draft body draft candidate routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 597 lines before, 584 lines after.
- `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRoutes.ts`: 22 lines.
- Extracted route count: 2.

## Validation

- Focused v442 route-group test: 1 file / 1 test passed.
- Adjacent disabled runtime shell design draft body draft candidate tests: 3 files / 9 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 375 files / 1201 tests passed.

## Boundary

v442 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, or runtime execution behavior.
