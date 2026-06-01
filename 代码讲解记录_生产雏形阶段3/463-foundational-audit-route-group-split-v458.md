# Node v458 Code Walkthrough: foundational audit route group split

## Goal

v458 moves the last direct audit JSON/Markdown route registrations out of `src/routes/auditJsonMarkdownRoutes.ts`. The central file now acts as a pure composition list of route groups.

## Split Shape

- Added `src/routes/auditFoundationalRoutes.ts`.
- Exported `foundationalAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only route-group spreads.
- Removed direct central imports for foundational audit service loaders and renderers.

## Route Coverage

The extracted group contains 6 JSON/Markdown routes:

- audit store runtime profile
- audit store env config profile
- file audit restart evidence
- audit retention integrity evidence
- managed audit store contract
- managed audit readiness summary

## Cross-Project Check

Before planning v458, Node checked Java and mini-kv read-only. Java had in-progress v187 contract alignment work; mini-kv had in-progress v176 route split window work through Node v457. Both can continue in parallel because v458 is local Node route-table maintenance only.

## Verification

`test/auditFoundationalRoutes.test.ts` verifies the route group has all 6 paths, the central route table registers the group through the shared spread, the central route table no longer contains `auditJsonMarkdownRoute(`, and representative JSON/Markdown routes still return `200`.

Full validation passed with 391 test files and 1217 tests.

The extracted routes are foundational read-only audit reports; Java and mini-kv can continue in parallel while Node keeps the route table maintainable.
