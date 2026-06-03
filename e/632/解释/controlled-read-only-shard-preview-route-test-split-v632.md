# v632 Controlled read-only shard preview route test split

## Purpose

v632 is maintenance version 14 of the 20-version run after v618 closeout.

The main controlled read-only shard preview test still mixed profile behavior tests with HTTP route exposure and mock upstream server setup. v632 moves the route coverage into a dedicated route test and extracts shared service fixtures.

## Change

Added:

- `test/support/controlledReadOnlyShardPreviewServiceFixtures.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`.

The support fixture now owns:

- Java shard readiness evidence;
- mini-kv shard readiness evidence;
- fake Java and mini-kv clients;
- access guard headers;
- test config helper.

The route test owns:

- mock Java HTTP server;
- mock mini-kv TCP server;
- JSON route assertion;
- Markdown route assertion.

Line-count impact:

- main preview test: 1129 lines down to 858 lines;
- new route test: 196 lines;
- new support fixture: 98 lines.

## Growth control

This version does not add a new route, approval rule, report chain, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: profile behavior and HTTP route coverage were mixed in one oversized test file;
- later consumer: route-only changes can touch the dedicated route test and shared fixtures;
- reuse decision: production route behavior is unchanged;
- stop condition: only the route exposure test and fixture data moved.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v632 is Node-only test refactoring. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

Ran the v632 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused profile/route tests passed: 2 files, 3 tests.
- Build passed.

CI note:

- v632 closes the local v628-v632 batch for push/CI verification.
