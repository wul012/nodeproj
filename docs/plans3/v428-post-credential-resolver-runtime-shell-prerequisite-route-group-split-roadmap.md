# v428 credential resolver runtime shell prerequisite route group split roadmap

## Scope

Node v428 extracts the credential-resolver runtime shell chain-stop/prerequisite decision record, chain-stop prerequisite upstream echo, approval prerequisite artifact intake plan, and approval prerequisite artifact upstream echo audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverRuntimeShellPrerequisiteRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v427, the central route table still owned the adjacent chain-stop and approval-prerequisite artifact route chain.
- Later consumer: future human approval artifact review route groups can be split without re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v428 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v428 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused credential-resolver runtime shell prerequisite route-group regression test with forced historical fixture fallback.
- Adjacent runtime shell post-decision, chain-stop, approval prerequisite, and human approval packet entry tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
