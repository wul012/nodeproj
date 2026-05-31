# Node v429 credential resolver human approval artifact review route group split

## Summary

Node v429 is a maintainability refactor. It extracts the credential-resolver human approval artifact review route registrations into `src/routes/auditCredentialResolverHumanApprovalArtifactReviewRoutes.ts`.

## What Changed

- Added `credentialResolverHumanApprovalArtifactReviewAuditJsonMarkdownRoutes`.
- Moved 5 human approval artifact review routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverHumanApprovalArtifactReviewRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 830 lines before, 793 lines after.
- `src/routes/auditCredentialResolverHumanApprovalArtifactReviewRoutes.ts`: 46 lines.
- Extracted route count: 5.

## Validation

- Focused v429 route-group test: 1 file / 1 test passed.
- Adjacent human approval artifact review tests: 6 files / 21 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 362 files / 1188 tests passed.

## Boundary

v429 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
