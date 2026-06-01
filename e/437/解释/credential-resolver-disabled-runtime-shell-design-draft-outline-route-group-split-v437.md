# Node v437 credential resolver disabled runtime shell design draft outline route group split

## Summary

Node v437 is a maintainability refactor. It extracts the credential-resolver disabled runtime shell design draft outline route registrations into `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftOutlineRoutes.ts`.

## What Changed

- Added `credentialResolverDisabledRuntimeShellDesignDraftOutlineAuditJsonMarkdownRoutes`.
- Moved 2 disabled runtime shell design draft outline routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverDisabledRuntimeShellDesignDraftOutlineRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 662 lines before, 649 lines after.
- `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftOutlineRoutes.ts`: 22 lines.
- Extracted route count: 2.

## Validation

- Focused v437 route-group test: 1 file / 1 test passed.
- Adjacent disabled runtime shell design draft outline tests: 3 files / 9 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 370 files / 1196 tests passed.

## Boundary

v437 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, or runtime execution behavior.
