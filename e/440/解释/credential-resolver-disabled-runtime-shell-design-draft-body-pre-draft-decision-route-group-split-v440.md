# Node v440 credential resolver disabled runtime shell design draft body pre-draft decision route group split

## Summary

Node v440 is a maintainability refactor. It extracts the credential-resolver disabled runtime shell design draft body pre-draft decision route registrations into `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionRoutes.ts`.

## What Changed

- Added `credentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionAuditJsonMarkdownRoutes`.
- Moved 2 disabled runtime shell design draft body pre-draft decision routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 623 lines before, 610 lines after.
- `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionRoutes.ts`: 22 lines.
- Extracted route count: 2.

## Validation

- Focused v440 route-group test: 1 file / 1 test passed.
- Adjacent disabled runtime shell design draft body pre-draft decision tests: 3 files / 9 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 373 files / 1199 tests passed.

## Boundary

v440 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, or runtime execution behavior.
