# Node v547 explanation: latest sibling live smoke archive verification route

v547 exposes the v546 archive verifier as JSON and Markdown.

New route:

- `/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification`
- `/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification?format=markdown`

The route returns a ready verifier for the v545 live smoke archive:

- 9/9 v545 records passed;
- 14/14 source checks passed;
- 24/24 archive verification checks passed;
- local HTTP proxy bypass is recorded;
- cleanup proof shows zero before/after listeners and `distRemoved=true`.

Route catalog counts now move to 226 total routes, 62 Java / mini-kv routes, and 28 cleanup handoff routes.

Validation completed:

- v546 verifier focused test;
- cleanup route group focused test;
- route catalog focused test;
- managed route quality focused test.

Next step: archive this route output in v548.
