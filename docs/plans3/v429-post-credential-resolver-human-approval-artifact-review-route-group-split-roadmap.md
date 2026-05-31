# v429 credential resolver human approval artifact review route group split roadmap

## Scope

Node v429 extracts the credential-resolver human approval artifact review audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverHumanApprovalArtifactReviewRoutes.ts`.

The extracted group contains the review packet, upstream echo verification, post-echo decision gate, post-echo decision upstream echo verification, and governance-stop prerequisite closure decision routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v428, the central route table still owned the first human approval artifact review chain directly.
- Later consumer: signed-human-approval and credential-handle approval route groups can now be split without mixing two prerequisite phases in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v429 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v429 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused credential-resolver human approval artifact review route-group regression test passed: 1 file / 1 test.
- Adjacent human approval artifact review tests passed: 6 files / 21 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 362 files / 1188 tests.
- Browser screenshot is not required because v429 does not add or change a renderable UI page.
